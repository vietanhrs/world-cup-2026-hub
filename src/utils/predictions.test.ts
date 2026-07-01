import { describe, expect, it } from 'vitest';
import { knockoutMatches } from '../data/schedule';
import { buildDefaultPredictions, buildResolver, computeStandings, resultLabel, withActualResults } from './predictions';

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

  it('computes final group standings from completed results even when no user prediction exists', () => {
    const standings = computeStandings(withActualResults({}));
    const groupA = standings.A;

    expect(groupA.find((row) => row.team.id === 'mexico')).toMatchObject({
      played: 3,
      won: 3,
      points: 9,
      gf: 6,
      ga: 0,
    });
    expect(groupA.find((row) => row.team.id === 'south-africa')).toMatchObject({
      played: 3,
      won: 1,
      drawn: 1,
      lost: 1,
      points: 4,
      gf: 2,
      ga: 3,
    });
  });

  it('uses the actual round-of-32 third-place pairings', () => {
    expect(knockoutMatches.find((match) => match.id === 'r32-2')).toMatchObject({ homeRef: '1E', awayRef: '3D' });
    expect(knockoutMatches.find((match) => match.id === 'r32-5')).toMatchObject({ homeRef: '1I', awayRef: '3F' });
    expect(knockoutMatches.find((match) => match.id === 'r32-8')).toMatchObject({ homeRef: '1L', awayRef: '3K' });
    expect(knockoutMatches.find((match) => match.id === 'r32-13')).toMatchObject({ homeRef: '1B', awayRef: '3J' });
  });

  it('uses penalty winners when completed knockout scores are tied', () => {
    const predictions = buildDefaultPredictions();
    const standings = computeStandings(predictions);
    const resolver = buildResolver(predictions, standings);

    expect(resolver('W:r32-2')).toMatchObject({ id: 'paraguay' });
    expect(resolver('W:r32-3')).toMatchObject({ id: 'morocco' });
    expect(resultLabel(knockoutMatches.find((match) => match.id === 'r32-2')!.result!)).toBe('1-1 FT (3-4 pens)');
  });
});
