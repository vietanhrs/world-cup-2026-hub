import { Badge, Card, Group, Progress, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCrown, IconSparkles } from '@tabler/icons-react';
import type { Team } from '../types';

type HeroSectionProps = {
  completed: number;
  total: number;
  champion: Team | string;
};

export function HeroSection({ completed, total, champion }: HeroSectionProps) {
  return (
    <section className="hero">
      <div>
        <Badge color="green" leftSection={<IconSparkles size={12} />}>World Cup 2026 · three-host edition</Badge>
        <Title className="hero-title">Dự đoán tỉ số, xem bảng điểm và tự dựng nhánh vô địch.</Title>
        <Text c="dimmed" maw={760}>Điền dần từng trận, chỉnh lại bất cứ lúc nào, xem kết quả group stage hoặc playoff ngay cả khi prediction còn dang dở.</Text>
      </div>
      <Card className="progress-card" withBorder>
        <Group justify="space-between">
          <Text fw={700}>Prediction progress</Text>
          <Badge color="green">{completed}/{total}</Badge>
        </Group>
        <Progress value={(completed / total) * 100} color="green" mt="md" />
        <Group mt="md" gap="xs">
          <ThemeIcon color="yellow" variant="light"><IconCrown size={18} /></ThemeIcon>
          <Text size="sm">Champion: {typeof champion === 'string' ? champion : champion.name}</Text>
        </Group>
      </Card>
    </section>
  );
}
