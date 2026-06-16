import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core';
import { groupMatches } from '../data/schedule';
import { useI18n } from '../i18n';
import { actualResultOf, formatKickoff } from '../utils/predictions';
import { TeamBadge } from './TeamBadge';
import type { Team } from '../types';

type SchedulePanelProps = {
  resolver: (ref: string) => Team | string;
  onRoster: (team: Team) => void;
};

const sortedGroupMatches = [...groupMatches].sort((left, right) => new Date(left.kickoff).getTime() - new Date(right.kickoff).getTime());

export function SchedulePanel({ resolver, onRoster }: SchedulePanelProps) {
  const { language, t } = useI18n();

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
                  <Badge className="schedule-score" variant="filled" color="green">
                    {result.home}-{result.away} {result.status}
                  </Badge>
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
