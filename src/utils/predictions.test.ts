import { describe, expect, it } from 'vitest';
import { groupMatches } from '../data/schedule';
import { buildDefaultPredictions, computeStandings, withActualResults } from './predictions';

describe('prediction result helpers', () => {
  it('overrides user predictions with actual completed match scores', () => {
    const predictions = withActualResults({
      'g-A-1': { home: 0, away: 9 },
      'g-J-2': { home: 3, away: 2 },
    });

    expect(predictions['g-A-1']).toEqual({ home: 2, away: 0 });
    expect(predictions['g-J-2']).toEqual({ home: 3, away: 1 });
  });

  it('uses actual scores in the default prediction board', () => {
    const predictions = buildDefaultPredictions();

    expect(predictions['g-E-2']).toEqual({ home: 7, away: 1 });
    expect(predictions['g-F-4']).toEqual({ home: 0, away: 4 });
    expect(predictions['g-H-2']).toEqual({ home: 0, away: 0 });
  });

  it('computes standings from completed results even when no user prediction exists', () => {
    const standings = computeStandings(withActualResults({}));
    const groupA = standings.A;

    expect(groupA.find((row) => row.team.id === 'mexico')).toMatchObject({
      played: 1,
      won: 1,
      points: 3,
      gf: 2,
      ga: 0,
    });
    expect(groupA.find((row) => row.team.id === 'south-africa')).toMatchObject({
      played: 1,
      lost: 1,
      points: 0,
      gf: 0,
      ga: 2,
    });
  });

  it('keeps upcoming group matches editable by leaving them without result metadata', () => {
    expect(groupMatches.find((match) => match.id === 'g-B-3')?.result).toBeUndefined();
  });
});
