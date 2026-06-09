import { Badge, Card, Group, ScrollArea, Table, Text, Title } from '@mantine/core';
import { knockoutMatches } from '../data/schedule';
import { groupKeys } from '../data/groups';
import { groupComplete } from '../utils/predictions';
import { TeamBadge } from './TeamBadge';
import type { Match, Prediction, Standing, Team } from '../types';

type ResultsPanelProps = {
  predictions: Prediction;
  standings: Record<string, Standing[]>;
  resolver: (ref: string) => Team | string;
  onRoster: (team: Team) => void;
};

type BracketSlot = {
  id: string;
  col: number;
  row: number;
};

const bracketSlots: BracketSlot[] = [
  { id: 'r32-2', col: 1, row: 2 },
  { id: 'r32-5', col: 1, row: 4 },
  { id: 'r32-1', col: 1, row: 6 },
  { id: 'r32-3', col: 1, row: 8 },
  { id: 'r32-11', col: 1, row: 10 },
  { id: 'r32-12', col: 1, row: 12 },
  { id: 'r32-9', col: 1, row: 14 },
  { id: 'r32-10', col: 1, row: 16 },
  { id: 'r16-1', col: 2, row: 3 },
  { id: 'r16-2', col: 2, row: 7 },
  { id: 'r16-5', col: 2, row: 11 },
  { id: 'r16-6', col: 2, row: 15 },
  { id: 'qf-1', col: 3, row: 5 },
  { id: 'qf-2', col: 3, row: 13 },
  { id: 'sf-1', col: 4, row: 9 },
  { id: 'final-1', col: 5, row: 9 },
  { id: 'bronze-1', col: 5, row: 13 },
  { id: 'sf-2', col: 6, row: 9 },
  { id: 'qf-3', col: 7, row: 5 },
  { id: 'qf-4', col: 7, row: 13 },
  { id: 'r16-3', col: 8, row: 3 },
  { id: 'r16-4', col: 8, row: 7 },
  { id: 'r16-7', col: 8, row: 11 },
  { id: 'r16-8', col: 8, row: 15 },
  { id: 'r32-4', col: 9, row: 2 },
  { id: 'r32-6', col: 9, row: 4 },
  { id: 'r32-7', col: 9, row: 6 },
  { id: 'r32-8', col: 9, row: 8 },
  { id: 'r32-14', col: 9, row: 10 },
  { id: 'r32-16', col: 9, row: 12 },
  { id: 'r32-13', col: 9, row: 14 },
  { id: 'r32-15', col: 9, row: 16 },
];

const roundLabels: { label: string; col: number; color?: 'green' | 'yellow' }[] = [
  { label: 'R32', col: 1 },
  { label: 'R16', col: 2 },
  { label: 'QF', col: 3 },
  { label: 'SF', col: 4 },
  { label: 'FINAL', col: 5, color: 'yellow' },
  { label: 'SF', col: 6 },
  { label: 'QF', col: 7 },
  { label: 'R16', col: 8 },
  { label: 'R32', col: 9 },
] as const;

const matchById = Object.fromEntries(knockoutMatches.map((match) => [match.id, match]));

export function ResultsPanel({ predictions, standings, resolver, onRoster }: ResultsPanelProps) {
  const renderMatchCard = (match: Match, slot: BracketSlot) => {
    const home = resolver(match.homeRef);
    const away = resolver(match.awayRef);
    const winner = resolver(`W:${match.id}`);
    const homeWon = typeof home !== 'string' && typeof winner !== 'string' && home.id === winner.id;
    const awayWon = typeof away !== 'string' && typeof winner !== 'string' && away.id === winner.id;

    return (
      <Card
        key={match.id}
        withBorder
        className={`bracket-card bracket-card-${match.stage} ${slot.col < 5 ? 'bracket-left' : slot.col > 5 ? 'bracket-right' : 'bracket-center-card'}`}
        style={{ gridColumn: slot.col, gridRow: `${slot.row} / span 2` }}
      >
        <Text size="xs" c="dimmed">
          {match.label}
        </Text>
        <Group justify="space-between" className={`bracket-team-row ${homeWon ? 'winner-row' : ''}`}>
          <TeamBadge value={home} onOpen={onRoster} />
          <Text fw={800}>{predictions[match.id]?.home ?? '-'}</Text>
        </Group>
        <Group justify="space-between" className={`bracket-team-row ${awayWon ? 'winner-row' : ''}`}>
          <TeamBadge value={away} onOpen={onRoster} />
          <Text fw={800}>{predictions[match.id]?.away ?? '-'}</Text>
        </Group>
      </Card>
    );
  };

  return (
    <>
      <div className="standings-grid">
        {groupKeys.map((group) => (
          <Card key={group} withBorder className="standings-card">
            <Group justify="space-between" mb={6}>
              <Title order={5}>Bảng {group}</Title>
              <Badge size="xs" color={groupComplete(group, predictions) ? 'green' : 'gray'}>
                {groupComplete(group, predictions) ? 'Đủ trận' : 'Đang dự đoán'}
              </Badge>
            </Group>
            <Table.ScrollContainer minWidth={210}>
              <Table verticalSpacing={3} horizontalSpacing={4} className="standings-table">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Team</Table.Th>
                    <Table.Th>Pts</Table.Th>
                    <Table.Th>P</Table.Th>
                    <Table.Th>GD</Table.Th>
                    <Table.Th>GF</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {standings[group].map((row, index) => (
                    <Table.Tr key={row.team.id} className={index < 2 ? 'qualified-row' : ''}>
                      <Table.Td>
                        <TeamBadge value={row.team} onOpen={onRoster} />
                      </Table.Td>
                      <Table.Td>{row.points}</Table.Td>
                      <Table.Td>{row.played}</Table.Td>
                      <Table.Td>{row.gd}</Table.Td>
                      <Table.Td>{row.gf}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>
        ))}
      </div>
      <Title order={3} mt="xl" mb="md">
        Nhánh playoff
      </Title>
      <ScrollArea type="auto">
        <div className="bracket">
          {roundLabels.map((round) => (
            <Badge
              key={`${round.label}-${round.col}`}
              className="bracket-round-label"
              color={round.color ?? 'green'}
              variant="filled"
              size="xs"
              style={{ gridColumn: round.col, gridRow: 1 }}
            >
              {round.label}
            </Badge>
          ))}
          {bracketSlots.map((slot) => renderMatchCard(matchById[slot.id], slot))}
        </div>
      </ScrollArea>
    </>
  );
}
