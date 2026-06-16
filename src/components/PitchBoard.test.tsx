import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { teamMap } from '../data/groups';
import { renderWithProviders } from '../test/render';
import { PitchBoard } from './PitchBoard';

describe('PitchBoard', () => {
  it('uses available player portrait cutouts instead of generated shirts', () => {
    renderWithProviders(<PitchBoard team={teamMap.mexico} />);

    expect(screen.getByAltText('Raúl Rangel portrait')).toBeInTheDocument();
  });

  it('keeps shirt fallback when no reliable portrait is available', () => {
    renderWithProviders(<PitchBoard team={teamMap.france} />);

    expect(screen.queryByAltText('Kylian Mbappé portrait')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
