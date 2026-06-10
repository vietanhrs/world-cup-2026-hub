import { Badge, Card, Group, Progress, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCrown, IconSparkles } from '@tabler/icons-react';
import { TeamBadge } from './TeamBadge';
import { useI18n } from '../i18n';
import type { Team } from '../types';

type HeroSectionProps = {
  completed: number;
  total: number;
  champion: Team | string;
};

export function HeroSection({ completed, total, champion }: HeroSectionProps) {
  const { t } = useI18n();

  return (
    <section className="hero">
      <div>
        <Badge color="green" leftSection={<IconSparkles size={12} />}>
          {t('hero.badge')}
        </Badge>
        <Title className="hero-title">{t('hero.title')}</Title>
        <Text c="dimmed" maw={760}>
          {t('hero.description')}
        </Text>
      </div>
      <Card className="progress-card" withBorder>
        <Group justify="space-between">
          <Text fw={700}>{t('hero.progress')}</Text>
          <Badge color="green">
            {completed}/{total}
          </Badge>
        </Group>
        <Progress value={(completed / total) * 100} color="green" mt="md" />
        <Group mt="md" gap="xs">
          <ThemeIcon color="yellow" variant="light">
            <IconCrown size={18} />
          </ThemeIcon>
          <Text size="sm">{t('hero.champion')}:</Text>
          <TeamBadge value={champion} />
        </Group>
      </Card>
    </section>
  );
}
