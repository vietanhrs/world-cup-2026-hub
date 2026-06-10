import type { ScheduleMatch } from './data/schedule';

export type RosterRole = 'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo';

export type Team = {
  id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  seed: number;
  color: string;
  roster: Record<RosterRole, string[]>;
  xi: string[];
  rosterSource: string;
  rosterFetchedAt: string;
};

export type BaseTeam = Omit<Team, 'roster' | 'xi' | 'rosterSource' | 'rosterFetchedAt'>;
export type Match = ScheduleMatch;
export type PredictionScore = { home: number | null; away: number | null };
export type Prediction = Record<string, PredictionScore>;
export type Standing = {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
};
