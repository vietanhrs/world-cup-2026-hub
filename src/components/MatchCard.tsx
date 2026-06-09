import { Badge, Card, Group, NumberInput, Stack, Text } from '@mantine/core';
import { formatKickoff, scoreOf } from '../utils/predictions';
import { TeamBadge } from './TeamBadge';
import type { Match, PredictionScore, Team } from '../types';

type MatchCardProps = {
  match: Match;
  prediction?: PredictionScore;
  resolver: (ref: string) => Team | string;
  onScore: (id: string, side: 'home' | 'away', value: number | string | null) => void;
  onRoster: (team: Team) => void;
};

export function MatchCard({ match, prediction, resolver, onScore, onRoster }: MatchCardProps) {
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  const score = scoreOf(prediction);
  const hasTeams = typeof home !== 'string' && typeof away !== 'string';

  return (
    <Card className="match-card" withBorder>
      <Group justify="space-between" align="start">
        <Stack gap={2}>
          <Text size="xs" c="dimmed">
            {match.label} · {formatKickoff(match.kickoff)}
          </Text>
          <Text size="xs" c="dimmed">
            {match.venue}
          </Text>
        </Stack>
        {score && (
          <Badge color={score.home === score.away ? 'yellow' : 'green'}>
            {score.home}:{score.away}
          </Badge>
        )}
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
