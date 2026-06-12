import { useState } from 'react';
import { Card, Group, NumberInput, Text } from '@mantine/core';
import { useI18n } from '../i18n';
import { formatKickoff } from '../utils/predictions';
import { TeamBadge } from './TeamBadge';
import type { Match, PredictionScore, Team } from '../types';

type ScoreValue = number | null;

type MatchCardProps = {
  match: Match;
  prediction?: PredictionScore;
  resolver: (ref: string) => Team | string;
  onScore: (id: string, side: 'home' | 'away', value: ScoreValue) => void;
  onRoster: (team: Team) => void;
  variant?: 'group' | 'knockout';
};

type ScoreInputProps = {
  value: ScoreValue | undefined;
  disabled: boolean;
  onChange: (value: ScoreValue) => void;
};

function parseScoreValue(value: number | string): ScoreValue {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (value.trim() === '') return null;

  const numericValue = Number(value);
  return Number.isInteger(numericValue) ? numericValue : null;
}

function ScoreInput({ value, disabled, onChange }: ScoreInputProps) {
  const [draftState, setDraftState] = useState({
    draftValue: value ?? '',
    value,
  });

  if (draftState.value !== value) {
    setDraftState({
      draftValue: value ?? '',
      value,
    });
  }

  const draftValue = draftState.value === value ? draftState.draftValue : (value ?? '');

  return (
    <NumberInput
      className="score-input"
      min={0}
      max={20}
      allowDecimal={false}
      allowNegative={false}
      clampBehavior="strict"
      rightSectionWidth={18}
      selectAllOnFocus
      value={draftValue}
      onChange={(nextValue) => {
        setDraftState({
          draftValue: nextValue,
          value,
        });
        onChange(parseScoreValue(nextValue));
      }}
      disabled={disabled}
    />
  );
}

export function MatchCard({ match, prediction, resolver, onScore, onRoster, variant = 'group' }: MatchCardProps) {
  const { language, matchLabel } = useI18n();
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  const hasTeams = typeof home !== 'string' && typeof away !== 'string';
  const meta =
    variant === 'knockout' ? `${matchLabel(match)} · ${formatKickoff(match.kickoff, language)}` : formatKickoff(match.kickoff, language);

  return (
    <Card className={`match-card match-card-${variant}`} withBorder>
      <Group justify="center" align="center">
        <Text size="xs" c="dimmed" ta="center" className="match-meta">
          {meta}
        </Text>
      </Group>
      <div className="match-row">
        <div className="match-team match-team-home">
          <TeamBadge value={home} onOpen={onRoster} />
        </div>
        <div>
          <ScoreInput value={prediction?.home} onChange={(value) => onScore(match.id, 'home', value)} disabled={!hasTeams} />
        </div>
        <div>
          <ScoreInput value={prediction?.away} onChange={(value) => onScore(match.id, 'away', value)} disabled={!hasTeams} />
        </div>
        <div className="match-team match-team-away">
          <TeamBadge value={away} onOpen={onRoster} />
        </div>
      </div>
    </Card>
  );
}
