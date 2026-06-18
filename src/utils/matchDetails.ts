import { buildEspnScoresUrl } from './liveScores';
import { teamMap } from '../data/groups';
import type { Match } from '../types';

type EspnAthlete = {
  displayName?: string;
};

type EspnParticipant = {
  athlete?: EspnAthlete;
};

type EspnRosterEntry = {
  starter?: boolean;
  jersey?: string;
  athlete?: EspnAthlete;
  position?: {
    abbreviation?: string;
    name?: string;
  };
};

type EspnSummaryRoster = {
  homeAway?: string;
  team?: {
    displayName?: string;
  };
  roster?: EspnRosterEntry[];
};

type EspnPlay = {
  id?: string;
  type?: {
    text?: string;
    type?: string;
  };
  text?: string;
  shortText?: string;
  clock?: {
    value?: number;
    displayValue?: string;
  };
  time?: {
    value?: number;
    displayValue?: string;
  };
  team?: {
    displayName?: string;
  };
  participants?: EspnParticipant[];
  scoringPlay?: boolean;
};

type EspnStatistic = {
  name?: string;
  label?: string;
  displayName?: string;
  displayValue?: string;
};

type EspnBoxscoreTeam = {
  homeAway?: string;
  team?: {
    displayName?: string;
  };
  statistics?: EspnStatistic[];
};

type EspnSummary = {
  rosters?: EspnSummaryRoster[];
  keyEvents?: EspnPlay[];
  commentary?: Array<{ play?: EspnPlay; text?: string; time?: EspnPlay['time'] }>;
  boxscore?: {
    teams?: EspnBoxscoreTeam[];
  };
};

type EspnScoreboard = {
  events?: Array<{
    id?: string;
    date?: string;
    competitions?: Array<{
      competitors?: Array<{
        homeAway?: string;
        team?: {
          displayName?: string;
          name?: string;
          shortDisplayName?: string;
        };
      }>;
    }>;
  }>;
};

export type MatchLineupPlayer = {
  name: string;
  jersey?: string;
  position?: string;
};

export type MatchLineup = {
  side: 'home' | 'away';
  teamName: string;
  starters: MatchLineupPlayer[];
};

export type MatchEventKind = 'goal' | 'yellow-card' | 'red-card' | 'substitution';

export type MatchEvent = {
  id: string;
  minute: string;
  kind: MatchEventKind;
  label: string;
  teamName?: string;
  players: string[];
  description: string;
  sortValue: number;
};

export type MatchStatRow = {
  key: string;
  label: string;
  homeValue: string;
  awayValue: string;
};

export type MatchDetails = {
  eventId: string;
  lineups: MatchLineup[];
  events: MatchEvent[];
  stats: MatchStatRow[];
  sourceUrl: string;
  sourceName: string;
};

export const espnSummaryUrl = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary';

const statOrder = ['possessionPct', 'totalShots', 'shotsOnTarget', 'wonCorners', 'foulsCommitted', 'yellowCards', 'redCards', 'saves'];

const statLabels: Record<string, string> = {
  possessionPct: 'Possession',
  totalShots: 'Shots',
  shotsOnTarget: 'Shots on target',
  wonCorners: 'Corners',
  foulsCommitted: 'Fouls',
  yellowCards: 'Yellow cards',
  redCards: 'Red cards',
  saves: 'Saves',
};

function normalizeName(value?: string) {
  return (
    value
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') ?? ''
  );
}

function sideOf(value?: string): 'home' | 'away' | null {
  return value === 'home' || value === 'away' ? value : null;
}

function playerName(entry: EspnRosterEntry) {
  return entry.athlete?.displayName?.trim();
}

function parseLineups(summary: EspnSummary): MatchLineup[] {
  const lineups: MatchLineup[] = [];

  for (const roster of summary.rosters ?? []) {
    const side = sideOf(roster.homeAway);
    const teamName = roster.team?.displayName?.trim();
    if (!side || !teamName) continue;

    const starters: MatchLineupPlayer[] = [];
    for (const entry of roster.roster ?? []) {
      const name = playerName(entry);
      if (!entry.starter || !name) continue;
      starters.push({
        name,
        jersey: entry.jersey,
        position: entry.position?.abbreviation ?? entry.position?.name,
      });
    }

    lineups.push({ side, teamName, starters });
  }

  return lineups.sort((left, right) => (left.side === 'home' ? -1 : 1) - (right.side === 'home' ? -1 : 1));
}

function eventKind(play: EspnPlay): MatchEventKind | null {
  const type = `${play.type?.type ?? ''} ${play.type?.text ?? ''}`.toLowerCase();
  if (play.scoringPlay || type.includes('goal') || type.includes('penalty - scored') || type.includes('own goal')) return 'goal';
  if (type.includes('yellow')) return 'yellow-card';
  if (type.includes('red')) return 'red-card';
  if (type.includes('substitution')) return 'substitution';
  return null;
}

function fallbackPlayId(play: EspnPlay, index: number) {
  const minute = play.clock?.displayValue ?? play.time?.displayValue ?? index;
  return `${minute}-${play.type?.text ?? 'event'}-${index}`;
}

function parseEvents(summary: EspnSummary): MatchEvent[] {
  const rawEvents =
    summary.keyEvents && summary.keyEvents.length > 0
      ? summary.keyEvents
      : (summary.commentary ?? []).map((item) => ({
          ...item.play,
          text: item.play?.text ?? item.text,
          time: item.play?.time ?? item.time,
        }));

  const events: MatchEvent[] = [];

  rawEvents.forEach((play, index) => {
    const kind = eventKind(play);
    if (!kind) return;

    const minute = play.clock?.displayValue ?? play.time?.displayValue ?? '';
    const description = play.shortText ?? play.text;
    if (!minute || !description) return;

    events.push({
      id: play.id ?? fallbackPlayId(play, index),
      minute,
      kind,
      label: play.type?.text ?? description,
      teamName: play.team?.displayName,
      players: (play.participants ?? [])
        .map((participant) => participant.athlete?.displayName?.trim())
        .filter((name): name is string => Boolean(name)),
      description,
      sortValue: play.clock?.value ?? play.time?.value ?? index,
    });
  });

  return events.sort((left, right) => left.sortValue - right.sortValue);
}

function displayStatValue(stat: EspnStatistic) {
  const value = stat.displayValue ?? '-';
  return stat.name === 'possessionPct' && !value.includes('%') ? `${value}%` : value;
}

function parseStats(summary: EspnSummary): MatchStatRow[] {
  const home = summary.boxscore?.teams?.find((team) => team.homeAway === 'home');
  const away = summary.boxscore?.teams?.find((team) => team.homeAway === 'away');
  if (!home || !away) return [];

  const homeStats = new Map((home.statistics ?? []).map((stat) => [stat.name, stat]));
  const awayStats = new Map((away.statistics ?? []).map((stat) => [stat.name, stat]));

  return statOrder
    .map((key) => {
      const homeStat = homeStats.get(key);
      const awayStat = awayStats.get(key);
      if (!homeStat || !awayStat) return null;

      return {
        key,
        label: statLabels[key] ?? homeStat.label ?? homeStat.displayName ?? key,
        homeValue: displayStatValue(homeStat),
        awayValue: displayStatValue(awayStat),
      };
    })
    .filter((row): row is MatchStatRow => Boolean(row));
}

export function parseEspnMatchDetails(summary: EspnSummary, eventId: string): MatchDetails {
  return {
    eventId,
    lineups: parseLineups(summary),
    events: parseEvents(summary),
    stats: parseStats(summary),
    sourceName: 'ESPN',
    sourceUrl: `https://www.espn.com/soccer/match/_/gameId/${eventId}`,
  };
}

export function hasEnoughMatchDetails(details: MatchDetails) {
  return details.lineups.length > 0 || details.events.length > 0 || details.stats.length > 0;
}

function eventMatchesFixture(event: NonNullable<EspnScoreboard['events']>[number], match: Match) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors ?? [];
  const home = competitors.find((competitor) => competitor.homeAway === 'home');
  const away = competitors.find((competitor) => competitor.homeAway === 'away');
  const kickoff = event.date ? new Date(event.date).getTime() : NaN;

  const homeName = teamMap[match.homeRef]?.name ?? match.homeRef;
  const awayName = teamMap[match.awayRef]?.name ?? match.awayRef;

  return (
    !Number.isNaN(kickoff) &&
    kickoff === new Date(match.kickoff).getTime() &&
    normalizeName(home?.team?.displayName ?? home?.team?.name ?? home?.team?.shortDisplayName) === normalizeName(homeName) &&
    normalizeName(away?.team?.displayName ?? away?.team?.name ?? away?.team?.shortDisplayName) === normalizeName(awayName)
  );
}

async function fetchEspnEventId(match: Match, matches: Match[]) {
  const response = await fetch(buildEspnScoresUrl(matches), { cache: 'no-store' });
  if (!response.ok) throw new Error(`ESPN scoreboard returned ${response.status}`);

  const scoreboard = (await response.json()) as EspnScoreboard;
  return scoreboard.events?.find((event) => event.id && eventMatchesFixture(event, match))?.id;
}

export async function fetchEspnMatchDetails(match: Match, matches: Match[] = [match]) {
  const eventId = match.result?.eventId ?? (await fetchEspnEventId(match, matches));
  if (!eventId) throw new Error('ESPN event id is not available for this match yet');

  const response = await fetch(`${espnSummaryUrl}?event=${encodeURIComponent(eventId)}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`ESPN summary returned ${response.status}`);

  return parseEspnMatchDetails((await response.json()) as EspnSummary, eventId);
}
