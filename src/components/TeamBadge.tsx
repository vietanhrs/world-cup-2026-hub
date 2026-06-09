import { Badge, Button } from '@mantine/core';
import type { Team } from '../types';

type TeamBadgeProps = {
  value: Team | string;
  onOpen?: (team: Team) => void;
};

export function TeamBadge({ value, onOpen }: TeamBadgeProps) {
  if (typeof value === 'string') {
    return <Badge color="gray" variant="outline">{value}</Badge>;
  }

  return (
    <Button
      className="team-button"
      variant="subtle"
      size="compact-sm"
      onClick={() => onOpen?.(value)}
      leftSection={<span className="team-dot" style={{ background: value.color }} />}
    >
      {value.code}
    </Button>
  );
}
