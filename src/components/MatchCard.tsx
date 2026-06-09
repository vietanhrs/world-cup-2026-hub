import { Card, Group, NumberInput, Text } from '@mantine/core';
import { formatKickoff } from '../utils/predictions';
import { TeamBadge } from './TeamBadge';
import type { Match, PredictionScore, Team } from '../types';

type MatchCardProps = {
  match: Match;
  prediction?: PredictionScore;
  resolver: (ref: string) => Team | string;
  onScore: (id: string, side: 'home' | 'away', value: number | string | null) => void;
  onRoster: (team: Team) => void;
  variant?: 'group' | 'knockout';
};

export function MatchCard({ match, prediction, resolver, onScore, onRoster, variant = 'group' }: MatchCardProps) {
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  const hasTeams = typeof home !== 'string' && typeof away !== 'string';
  const meta = variant === 'knockout' ? `${match.label} · ${formatKickoff(match.kickoff)}` : formatKickoff(match.kickoff);

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
          <NumberInput
            className="score-input"
            min={0}
            max={20}
            hideControls
            value={prediction?.home ?? ''}
            onChange={(value) => onScore(match.id, 'home', value)}
            disabled={!hasTeams}
          />
        </div>
        <div>
          <NumberInput
            className="score-input"
            min={0}
            max={20}
            hideControls
            value={prediction?.away ?? ''}
            onChange={(value) => onScore(match.id, 'away', value)}
            disabled={!hasTeams}
          />
        </div>
        <div className="match-team match-team-away">
          <TeamBadge value={away} onOpen={onRoster} />
        </div>
      </div>
    </Card>
  );
}
