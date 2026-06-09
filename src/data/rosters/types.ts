import type { RosterRole } from '../../types';

export type TeamRoster = {
  source: string;
  fetchedAt: string;
  roster: Record<RosterRole, string[]>;
  xi: string[];
};
