import { teamMap } from '../data/groups';
import type { Match } from '../types';

type EspnCompetitor = {
  homeAway?: string;
  score?: string;
  team?: {
    displayName?: string;
    name?: string;
    shortDisplayName?: string;
  };
};

type EspnEvent = {
  id?: string;
  date?: string;
  competitions?: Array<{
    competitors?: EspnCompetitor[];
    status?: {
      type?: {
        completed?: boolean;
        name?: string;
        shortDetail?: string;
      };
    };
  }>;
};

type EspnScoreboard = {
  events?: EspnEvent[];
};

export const espnScoreboardUrl = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';

const teamAliases: Record<string, string> = {
  'bosnia-herzegovina': 'bosnia',
  'bosnia-and-herzegovina': 'bosnia',
  'cape-verde': 'cabo-verde',
  'congo-dr': 'congo-dr',
  'cote-divoire': 'cote-divoire',
  curacao: 'curacao',
  'czech-republic': 'czechia',
  'ivory-coast': 'cote-divoire',
  'korea-republic': 'korea-republic',
  'new-zealand': 'new-zealand',
  'south-korea': 'korea-republic',
  'united-states': 'usa',
};

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatEspnDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll('-', '');
}

function normalizeTeamName(value?: string) {
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

function teamIdFromEspnName(value?: string) {
  const normalized = normalizeTeamName(value);
  return teamAliases[normalized] ?? Object.values(teamMap).find((team) => normalizeTeamName(team.name) === normalized)?.id ?? normalized;
}

function statusLabel(name?: string, shortDetail?: string, completed?: boolean) {
  if (completed || name === 'STATUS_FULL_TIME') return 'FT';
  if (name === 'STATUS_HALFTIME') return 'HT';
  if (name === 'STATUS_FIRST_HALF') return '1H';
  if (name === 'STATUS_SECOND_HALF') return '2H';
  return shortDetail?.replace(/\s+/g, ' ').trim() || 'LIVE';
}

function isPlayableStatus(name?: string, completed?: boolean) {
  if (completed || name === 'STATUS_FULL_TIME') return true;
  return name === 'STATUS_FIRST_HALF' || name === 'STATUS_HALFTIME' || name === 'STATUS_SECOND_HALF';
}

function eventMatchKey(event: EspnEvent) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors ?? [];
  const home = competitors.find((competitor) => competitor.homeAway === 'home');
  const away = competitors.find((competitor) => competitor.homeAway === 'away');
  const kickoff = event.date ? new Date(event.date).getTime() : NaN;

  if (!home || !away || Number.isNaN(kickoff)) return null;

  return {
    kickoff,
    homeRef: teamIdFromEspnName(home.team?.displayName ?? home.team?.name ?? home.team?.shortDisplayName),
    awayRef: teamIdFromEspnName(away.team?.displayName ?? away.team?.name ?? away.team?.shortDisplayName),
    homeScore: Number(home.score),
    awayScore: Number(away.score),
    status: competition?.status?.type,
  };
}

function matchKey(match: Match) {
  return `${new Date(match.kickoff).getTime()}|${match.homeRef}|${match.awayRef}`;
}

export function buildEspnScoresUrl(matches: Match[], now = new Date()) {
  const kickoffTimes = matches.map((match) => new Date(match.kickoff).getTime()).filter(Number.isFinite);
  const firstKickoff = new Date(Math.min(...kickoffTimes));
  const lastKickoff = new Date(Math.max(...kickoffTimes));
  const endDate = new Date(Math.min(addDays(now, 1).getTime(), addDays(lastKickoff, 1).getTime()));
  const dates = `${formatEspnDate(firstKickoff)}-${formatEspnDate(endDate)}`;

  return `${espnScoreboardUrl}?dates=${dates}&limit=200`;
}

export function resultsFromEspnScoreboard(scoreboard: EspnScoreboard, matches: Match[]) {
  const byKey = new Map(matches.map((match) => [matchKey(match), match]));

  return (scoreboard.events ?? []).reduce<Record<string, NonNullable<Match['result']>>>((results, event) => {
    const key = eventMatchKey(event);
    if (!key || !isPlayableStatus(key.status?.name, key.status?.completed)) return results;

    const match = byKey.get(`${key.kickoff}|${key.homeRef}|${key.awayRef}`);
    if (!match || Number.isNaN(key.homeScore) || Number.isNaN(key.awayScore)) return results;

    results[match.id] = {
      home: key.homeScore,
      away: key.awayScore,
      status: statusLabel(key.status?.name, key.status?.shortDetail, key.status?.completed),
      eventId: event.id,
    };
    return results;
  }, {});
}

export function applyLiveResults<T extends Match>(matches: T[], liveResults: Record<string, NonNullable<Match['result']>>) {
  return matches.map((match) => ({
    ...match,
    result: liveResults[match.id] ?? match.result,
  }));
}

export async function fetchEspnResults(matches: Match[], now = new Date()) {
  const response = await fetch(buildEspnScoresUrl(matches, now), { cache: 'no-store' });
  if (!response.ok) throw new Error(`ESPN scoreboard returned ${response.status}`);
  return resultsFromEspnScoreboard((await response.json()) as EspnScoreboard, matches);
}
