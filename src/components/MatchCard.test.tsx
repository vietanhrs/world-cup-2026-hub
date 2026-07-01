import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { groupMatches } from '../data/schedule';
import { teamMap } from '../data/groups';
import type { Team } from '../types';
import { renderWithProviders } from '../test/render';
import { MatchCard } from './MatchCard';

const resolver = (ref: string) => teamMap[ref] ?? ref;

describe('MatchCard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows actual score as a details button for completed matches', async () => {
    const user = userEvent.setup();
    const onDetails = vi.fn();
    const match = groupMatches.find((candidate) => candidate.id === 'g-A-1');
    if (!match) throw new Error('Expected completed match fixture');

    renderWithProviders(
      <MatchCard
        match={match}
        prediction={{ home: 0, away: 9 }}
        resolver={resolver}
        onScore={vi.fn()}
        onRoster={vi.fn()}
        onDetails={onDetails}
      />,
    );

    expect(screen.getByText('FT')).toBeInTheDocument();
    const scoreButton = screen.getByRole('button', { name: /open match details for mexico vs south africa/i });
    expect(scoreButton).toHaveTextContent('2-0 FT');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    await user.click(scoreButton);

    expect(onDetails).toHaveBeenCalledWith(match);
  });

  it('allows score entry for upcoming matches', async () => {
    const user = userEvent.setup();
    const onScore = vi.fn();
    const completedMatch = groupMatches.find((candidate) => candidate.id === 'g-B-3');
    if (!completedMatch) throw new Error('Expected match fixture');
    const match = { ...completedMatch, result: undefined };

    renderWithProviders(
      <MatchCard match={match} prediction={{ home: null, away: null }} resolver={resolver} onScore={onScore} onRoster={vi.fn()} />,
    );

    const [homeInput] = screen.getAllByRole('textbox');
    expect(homeInput).toBeEnabled();

    await user.type(homeInput, '2');

    expect(onScore).toHaveBeenLastCalledWith(match.id, 'home', 2);
  });

  it('opens roster details when a resolved team badge is selected', async () => {
    const user = userEvent.setup();
    const onRoster = vi.fn<(team: Team) => void>();
    const match = groupMatches.find((candidate) => candidate.id === 'g-B-3');
    if (!match) throw new Error('Expected match fixture');

    renderWithProviders(
      <MatchCard match={match} prediction={{ home: null, away: null }} resolver={resolver} onScore={vi.fn()} onRoster={onRoster} />,
    );

    await user.click(screen.getByRole('button', { name: /SUI/i }));

    expect(onRoster).toHaveBeenCalledWith(teamMap.switzerland);
  });
});
