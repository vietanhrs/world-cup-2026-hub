import { Badge, Card, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { useI18n } from '../i18n';
import { actualResultOf, formatKickoff } from '../utils/predictions';
import { TeamBadge } from './TeamBadge';
import type { Match, Team } from '../types';

type SchedulePanelProps = {
  groupMatches: Match[];
  resolver: (ref: string) => Team | string;
  onRoster: (team: Team) => void;
  onDetails: (match: Match) => void;
};

export function SchedulePanel({ groupMatches, resolver, onRoster, onDetails }: SchedulePanelProps) {
  const { language, t } = useI18n();
  const sortedGroupMatches = [...groupMatches].sort((left, right) => new Date(left.kickoff).getTime() - new Date(right.kickoff).getTime());

  return (
    <Stack gap="md">
      <div>
        <Title order={3}>{t('schedule.title')}</Title>
        <Text c="dimmed" mt={4}>
          {t('schedule.description')}
        </Text>
      </div>
      <div className="schedule-list">
        {sortedGroupMatches.map((match) => {
          const home = resolver(match.homeRef);
          const away = resolver(match.awayRef);
          const result = actualResultOf(match);

          return (
            <Card key={match.id} className={`schedule-card ${result ? 'schedule-card-completed' : ''}`} withBorder>
              <div className="schedule-time">
                <Text size="sm" fw={800}>
                  {formatKickoff(match.kickoff, language)}
                </Text>
                <Text size="xs" c="dimmed">
                  {t('schedule.venue', { venue: match.venue })}
                </Text>
              </div>
              <Badge className="schedule-group-badge" variant="light" color="green">
                {t('schedule.group', { group: match.group ?? '' })}
              </Badge>
              <Group className="schedule-teams" justify="center" gap="xs" wrap="nowrap">
                <TeamBadge value={home} onOpen={onRoster} />
                {result ? (
                  <UnstyledButton
                    className="schedule-score-button"
                    onClick={() => onDetails(match)}
                    aria-label={`Open match details for ${typeof home === 'string' ? home : home.name} vs ${typeof away === 'string' ? away : away.name}`}
                  >
                    <Badge className="schedule-score" variant="filled" color="green">
                      {result.home}-{result.away} {result.status}
                    </Badge>
                  </UnstyledButton>
                ) : (
                  <Text size="xs" fw={900} c="dimmed">
                    {t('schedule.versus')}
                  </Text>
                )}
                <TeamBadge value={away} onOpen={onRoster} />
              </Group>
            </Card>
          );
        })}
      </div>
    </Stack>
  );
}
