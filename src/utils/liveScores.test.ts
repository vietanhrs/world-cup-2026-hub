import { describe, expect, it } from 'vitest';
import { groupMatches } from '../data/schedule';
import { buildEspnScoresUrl, resultsFromEspnScoreboard } from './liveScores';

describe('live score helpers', () => {
  it('maps ESPN full-time and live statuses onto known fixture ids', () => {
    const results = resultsFromEspnScoreboard(
      {
        events: [
          {
            id: '760430',
            date: '2026-06-16T01:00Z',
            competitions: [
              {
                status: { type: { completed: true, name: 'STATUS_FULL_TIME' } },
                competitors: [
                  { homeAway: 'home', score: '2', team: { displayName: 'Iran' } },
                  { homeAway: 'away', score: '2', team: { displayName: 'New Zealand' } },
                ],
              },
            ],
          },
          {
            id: '760431',
            date: '2026-06-17T01:00Z',
            competitions: [
              {
                status: { type: { completed: false, name: 'STATUS_SECOND_HALF', shortDetail: "73'" } },
                competitors: [
                  { homeAway: 'home', score: '3', team: { displayName: 'Argentina' } },
                  { homeAway: 'away', score: '0', team: { displayName: 'Algeria' } },
                ],
              },
            ],
          },
          {
            id: '760449',
            date: '2026-06-21T04:00Z',
            competitions: [
              {
                status: { type: { completed: true, name: 'STATUS_FULL_TIME' } },
                competitors: [
                  { homeAway: 'home', score: '0', team: { displayName: 'Tunisia' } },
                  { homeAway: 'away', score: '4', team: { displayName: 'Japan' } },
                ],
              },
            ],
          },
        ],
      },
      groupMatches,
    );

    expect(results['g-G-1']).toEqual({ home: 2, away: 2, status: 'FT', eventId: '760430' });
    expect(results['g-J-1']).toEqual({ home: 3, away: 0, status: '2H', eventId: '760431' });
    expect(results['g-F-4']).toEqual({ home: 0, away: 4, status: 'FT', eventId: '760449' });
  });

  it('ignores scheduled score placeholders', () => {
    const results = resultsFromEspnScoreboard(
      {
        events: [
          {
            date: '2026-06-17T04:00Z',
            competitions: [
              {
                status: { type: { completed: false, name: 'STATUS_SCHEDULED' } },
                competitors: [
                  { homeAway: 'home', score: '0', team: { displayName: 'Austria' } },
                  { homeAway: 'away', score: '0', team: { displayName: 'Jordan' } },
                ],
              },
            ],
          },
        ],
      },
      groupMatches,
    );

    expect(results['g-J-2']).toBeUndefined();
  });

  it('builds an ESPN date range from tournament start through the next UTC day', () => {
    expect(buildEspnScoresUrl(groupMatches, new Date('2026-06-17T02:00:00Z'))).toContain('dates=20260611-20260618');
  });
});
