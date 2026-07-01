import { allMatches, groupMatches, knockoutMatches } from '../data/schedule';
import { groupKeys, groups, teamMap } from '../data/groups';
import { hostBonus, teamStrengths } from '../data/teamStrengths';
import type { Match, Prediction, PredictionScore, Standing, Team } from '../types';

type ResolverLabels = {
  winner: (match: Match | string) => string;
  loser: (match: Match | string) => string;
  third: (groups: string) => string;
  groupWinner: (group: string) => string;
  groupRunnerUp: (group: string) => string;
};

const defaultResolverLabels: ResolverLabels = {
  winner: (match) => `Winner of ${typeof match === 'string' ? match : match.label}`,
  loser: (match) => `Loser of ${typeof match === 'string' ? match : match.label}`,
  third: (groups) => `Third-place team (${groups})`,
  groupWinner: (group) => `Group ${group} winner`,
  groupRunnerUp: (group) => `Group ${group} runner-up`,
};

export function scoreOf(prediction?: PredictionScore): { home: number; away: number } | null {
  if (prediction?.home === null || prediction?.away === null || prediction?.home === undefined || prediction?.away === undefined)
    return null;
  return { home: prediction.home, away: prediction.away };
}

export function hasActualResult(match: Match) {
  return match.result?.status === 'FT';
}

export function actualResultOf(match: Match): Match['result'] {
  return match.result;
}

export function resultLabel(result: NonNullable<Match['result']>) {
  const penalties = result.penalties ? ` (${result.penalties.home}-${result.penalties.away} pens)` : '';
  return `${result.home}-${result.away} ${result.status}${penalties}`;
}

function actualScoreOf(match: Match): PredictionScore | undefined {
  const result = actualResultOf(match);
  return result ? { home: result.home, away: result.away } : undefined;
}

export function withActualResults(predictions: Prediction, matches: Match[] = allMatches): Prediction {
  return matches.reduce<Prediction>(
    (nextPredictions, match) => {
      const result = actualScoreOf(match);
      if (result) nextPredictions[match.id] = result;
      return nextPredictions;
    },
    { ...predictions },
  );
}

function winnerFromScore(match: Match, predictions: Prediction, resolver: (ref: string) => Team | string) {
  const score = scoreOf(predictions[match.id]);
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  if (!score || typeof home === 'string' || typeof away === 'string') return null;
  if (score.home === score.away && match.result?.winner) return match.result.winner === 'home' ? home : away;
  if (score.home === score.away) return score.home >= 0 ? home : null;
  return score.home > score.away ? home : away;
}

function loserFromScore(match: Match, predictions: Prediction, resolver: (ref: string) => Team | string) {
  const score = scoreOf(predictions[match.id]);
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  if (!score || typeof home === 'string' || typeof away === 'string') return null;
  if (score.home === score.away && match.result?.winner) return match.result.winner === 'home' ? away : home;
  if (score.home === score.away) return score.home >= 0 ? away : null;
  return score.home > score.away ? away : home;
}

export function computeStandings(predictions: Prediction) {
  return computeStandingsForMatches(predictions, groupMatches);
}

export function computeStandingsForMatches(predictions: Prediction, matches: Match[]) {
  const standings: Record<string, Standing[]> = {};
  for (const group of groupKeys) {
    const rows = groups[group].map((rawTeam) => ({
      team: teamMap[rawTeam.id],
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
    }));
    const byTeam = Object.fromEntries(rows.map((row) => [row.team.id, row]));
    matches
      .filter((match) => match.group === group)
      .forEach((match) => {
        const score = scoreOf(predictions[match.id]);
        if (!score) return;
        const home = byTeam[match.homeRef];
        const away = byTeam[match.awayRef];
        home.played += 1;
        away.played += 1;
        home.gf += score.home;
        home.ga += score.away;
        away.gf += score.away;
        away.ga += score.home;
        if (score.home > score.away) {
          home.won += 1;
          away.lost += 1;
          home.points += 3;
        } else if (score.home < score.away) {
          away.won += 1;
          home.lost += 1;
          away.points += 3;
        } else {
          home.drawn += 1;
          away.drawn += 1;
          home.points += 1;
          away.points += 1;
        }
      });
    rows.forEach((row) => {
      row.gd = row.gf - row.ga;
    });
    standings[group] = rows.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.team.seed - b.team.seed);
  }
  return standings;
}

export function groupComplete(group: string, predictions: Prediction) {
  return groupCompleteForMatches(group, predictions, groupMatches);
}

export function groupCompleteForMatches(group: string, predictions: Prediction, matches: Match[]) {
  return matches.filter((match) => match.group === group).every((match) => scoreOf(predictions[match.id]));
}

function thirdPlaceRows(standings: Record<string, Standing[]>, candidateGroups: string[], usedTeamIds: Set<string>) {
  return candidateGroups
    .map((group) => standings[group]?.[2])
    .filter((row): row is Standing => Boolean(row) && !usedTeamIds.has(row.team.id))
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.team.seed - b.team.seed);
}

export function buildResolver(
  predictions: Prediction,
  standings: Record<string, Standing[]>,
  labels = defaultResolverLabels,
  matches: { groupMatches?: Match[]; knockoutMatches?: Match[] } = {},
) {
  const resolverGroupMatches = matches.groupMatches ?? groupMatches;
  const resolverKnockoutMatches = matches.knockoutMatches ?? knockoutMatches;
  const winners: Record<string, Team> = {};
  const losers: Record<string, Team> = {};
  const thirdSlots: Record<string, Team> = {};
  const usedThirdPlaceTeamIds = new Set<string>();
  const resolver = (ref: string): Team | string => {
    if (teamMap[ref]) return teamMap[ref];
    if (ref.startsWith('W:'))
      return winners[ref.slice(2)] ?? labels.winner(resolverKnockoutMatches.find((match) => match.id === ref.slice(2)) ?? ref.slice(2));
    if (ref.startsWith('L:'))
      return losers[ref.slice(2)] ?? labels.loser(resolverKnockoutMatches.find((match) => match.id === ref.slice(2)) ?? ref.slice(2));
    if (/^3[A-L]+$/.test(ref)) {
      if (thirdSlots[ref]) return thirdSlots[ref];
      const candidateGroups = ref.slice(1).split('');
      if (!candidateGroups.every((group) => groupCompleteForMatches(group, predictions, resolverGroupMatches)))
        return labels.third(ref.slice(1));
      const [bestThird] = thirdPlaceRows(standings, candidateGroups, usedThirdPlaceTeamIds);
      if (!bestThird) return labels.third(ref.slice(1));
      thirdSlots[ref] = bestThird.team;
      usedThirdPlaceTeamIds.add(bestThird.team.id);
      return bestThird.team;
    }
    if (/^[12][A-L]$/.test(ref)) {
      const rank = Number(ref[0]) - 1;
      const group = ref[1];
      if (groupCompleteForMatches(group, predictions, resolverGroupMatches)) return standings[group][rank].team;
      return rank === 0 ? labels.groupWinner(group) : labels.groupRunnerUp(group);
    }
    return ref;
  };
  resolverKnockoutMatches.forEach((match) => {
    const winner = winnerFromScore(match, predictions, resolver);
    const loser = loserFromScore(match, predictions, resolver);
    if (winner) winners[match.id] = winner;
    if (loser) losers[match.id] = loser;
  });
  return resolver;
}

export function encodePrediction(predictions: Prediction) {
  const compact = Object.fromEntries(Object.entries(predictions).filter(([, score]) => score.home !== null && score.away !== null));
  return btoa(encodeURIComponent(JSON.stringify(compact)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function decodePrediction(hash: string): Prediction {
  try {
    const raw = hash.replace(/^#p=/, '').replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(raw)));
  } catch {
    return {};
  }
}

const kickoffFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export function formatKickoff(kickoff: string, locale?: string) {
  return new Intl.DateTimeFormat(locale, kickoffFormatOptions).format(new Date(kickoff));
}

function adjustedStrength(team: Team) {
  return (teamStrengths[team.id] ?? 70) + (hostBonus[team.id] ?? 0);
}

function predictedScore(home: Team, away: Team, knockout = false) {
  const diff = adjustedStrength(home) - adjustedStrength(away);
  if (!knockout && Math.abs(diff) <= 2) return { home: 1, away: 1 };
  if (diff >= 16) return { home: 3, away: 0 };
  if (diff >= 9) return { home: 2, away: 0 };
  if (diff >= 3) return { home: 2, away: 1 };
  if (diff <= -16) return { home: 0, away: 3 };
  if (diff <= -9) return { home: 0, away: 2 };
  if (diff <= -3) return { home: 1, away: 2 };
  return knockout ? { home: 2, away: 1 } : { home: 1, away: 1 };
}

export function buildDefaultPredictions(): Prediction {
  return buildDefaultPredictionsForMatches(groupMatches, knockoutMatches);
}

export function buildDefaultPredictionsForMatches(groupStageMatches: Match[], playoffMatches: Match[]): Prediction {
  const predictions: Prediction = {};
  groupStageMatches.forEach((match) => {
    const result = actualScoreOf(match);
    if (result) {
      predictions[match.id] = result;
      return;
    }
    const home = teamMap[match.homeRef];
    const away = teamMap[match.awayRef];
    predictions[match.id] = predictedScore(home, away);
  });

  playoffMatches.forEach((match) => {
    const result = actualScoreOf(match);
    if (result) {
      predictions[match.id] = result;
      return;
    }
    const standings = computeStandingsForMatches(predictions, groupStageMatches);
    const resolver = buildResolver(predictions, standings, defaultResolverLabels, {
      groupMatches: groupStageMatches,
      knockoutMatches: playoffMatches,
    });
    const home = resolver(match.homeRef);
    const away = resolver(match.awayRef);
    if (typeof home !== 'string' && typeof away !== 'string') {
      predictions[match.id] = predictedScore(home, away, true);
    }
  });

  return predictions;
}

export function predictionProgress(predictions: Prediction) {
  return predictionProgressForMatches(predictions, allMatches);
}

export function predictionProgressForMatches(predictions: Prediction, matches: Match[]) {
  return matches.filter((match) => scoreOf(predictions[match.id])).length;
}
