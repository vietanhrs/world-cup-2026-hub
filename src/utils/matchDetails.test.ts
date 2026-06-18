import { describe, expect, it } from 'vitest';
import { parseEspnMatchDetails } from './matchDetails';

describe('match detail helpers', () => {
  it('maps ESPN summary data into lineups, key events, and stats', () => {
    const details = parseEspnMatchDetails(
      {
        rosters: [
          {
            homeAway: 'home',
            team: { displayName: 'Mexico' },
            roster: [
              { starter: true, jersey: '1', athlete: { displayName: 'Raúl Rangel' }, position: { abbreviation: 'G' } },
              { starter: true, jersey: '16', athlete: { displayName: 'Julián Quiñones' }, position: { abbreviation: 'LM' } },
              { starter: false, jersey: '10', athlete: { displayName: 'Alexis Vega' }, position: { abbreviation: 'SUB' } },
            ],
          },
          {
            homeAway: 'away',
            team: { displayName: 'South Africa' },
            roster: [{ starter: true, jersey: '1', athlete: { displayName: 'Ronwen Williams' }, position: { abbreviation: 'G' } }],
          },
        ],
        keyEvents: [
          {
            id: 'goal-1',
            type: { text: 'Goal', type: 'goal' },
            shortText: 'Julián Quiñones Goal',
            text: 'Goal! Mexico 1, South Africa 0.',
            clock: { value: 513, displayValue: "9'" },
            scoringPlay: true,
            team: { displayName: 'Mexico' },
            participants: [{ athlete: { displayName: 'Julián Quiñones' } }, { athlete: { displayName: 'Érik Lira' } }],
          },
          {
            id: 'card-1',
            type: { text: 'Yellow Card', type: 'yellow-card' },
            shortText: 'Teboho Mokoena Yellow Card',
            clock: { value: 981, displayValue: "17'" },
            team: { displayName: 'South Africa' },
            participants: [{ athlete: { displayName: 'Teboho Mokoena' } }],
          },
          {
            id: 'sub-1',
            type: { text: 'Substitution', type: 'substitution' },
            text: 'Substitution, South Africa. Thalente Mbatha replaces Lyle Foster.',
            clock: { value: 3356, displayValue: "56'" },
            team: { displayName: 'South Africa' },
          },
        ],
        boxscore: {
          teams: [
            {
              homeAway: 'home',
              team: { displayName: 'Mexico' },
              statistics: [
                { name: 'possessionPct', displayValue: '60.5' },
                { name: 'totalShots', displayValue: '16' },
                { name: 'shotsOnTarget', displayValue: '4' },
              ],
            },
            {
              homeAway: 'away',
              team: { displayName: 'South Africa' },
              statistics: [
                { name: 'possessionPct', displayValue: '39.5' },
                { name: 'totalShots', displayValue: '3' },
                { name: 'shotsOnTarget', displayValue: '2' },
              ],
            },
          ],
        },
      },
      '760415',
    );

    expect(details.lineups[0]).toMatchObject({
      side: 'home',
      teamName: 'Mexico',
      starters: [
        { name: 'Raúl Rangel', jersey: '1', position: 'G' },
        { name: 'Julián Quiñones', jersey: '16', position: 'LM' },
      ],
    });
    expect(details.events.map((event) => [event.minute, event.kind, event.players[0]])).toEqual([
      ["9'", 'goal', 'Julián Quiñones'],
      ["17'", 'yellow-card', 'Teboho Mokoena'],
      ["56'", 'substitution', undefined],
    ]);
    expect(details.stats).toEqual([
      { key: 'possessionPct', label: 'Possession', homeValue: '60.5%', awayValue: '39.5%' },
      { key: 'totalShots', label: 'Shots', homeValue: '16', awayValue: '3' },
      { key: 'shotsOnTarget', label: 'Shots on target', homeValue: '4', awayValue: '2' },
    ]);
    expect(details.sourceUrl).toBe('https://www.espn.com/soccer/match/_/gameId/760415');
  });
});
