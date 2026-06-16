import { useState } from 'react';
import { Badge, Card, Group, NumberInput, Text } from '@mantine/core';
import { useI18n } from '../i18n';
import { actualResultOf, formatKickoff } from '../utils/predictions';
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
  const { language, matchLabel, t } = useI18n();
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  const hasTeams = typeof home !== 'string' && typeof away !== 'string';
  const actualResult = actualResultOf(match);
  const displayedScore = actualResult ?? prediction;
  const isCompleted = Boolean(actualResult);
  const meta =
    variant === 'knockout' ? `${matchLabel(match)} · ${formatKickoff(match.kickoff, language)}` : formatKickoff(match.kickoff, language);

  return (
    <Card className={`match-card match-card-${variant} ${isCompleted ? 'match-card-completed' : ''}`} withBorder>
      <Group justify="center" align="center" gap={6}>
        <Text size="xs" c="dimmed" ta="center" className="match-meta">
          {meta}
        </Text>
        {isCompleted ? (
          <Badge size="xs" color="green" variant="light" className="match-status-badge">
            {t('predict.completed')}
          </Badge>
        ) : null}
      </Group>
      <div className="match-row">
        <div className="match-team match-team-home">
          <TeamBadge value={home} onOpen={onRoster} />
        </div>
        <div>
          <ScoreInput
            value={displayedScore?.home}
            onChange={(value) => onScore(match.id, 'home', value)}
            disabled={!hasTeams || isCompleted}
          />
        </div>
        <div>
          <ScoreInput
            value={displayedScore?.away}
            onChange={(value) => onScore(match.id, 'away', value)}
            disabled={!hasTeams || isCompleted}
          />
        </div>
        <div className="match-team match-team-away">
          <TeamBadge value={away} onOpen={onRoster} />
        </div>
      </div>
    </Card>
  );
}
