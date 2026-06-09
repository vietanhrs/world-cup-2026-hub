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
const slotById = Object.fromEntries(bracketSlots.map((slot) => [slot.id, slot]));

const bracketMetrics = {
  columnWidths: [112, 112, 112, 112, 136, 112, 112, 112, 112],
  columnGap: 9,
  rowLabelHeight: 20,
  rowHeight: 48,
  rowGap: 4,
  paddingTop: 2,
  paddingRight: 12,
  paddingBottom: 12,
  paddingLeft: 2,
};

const bracketViewBox = {
  width:
    bracketMetrics.paddingLeft +
    bracketMetrics.columnWidths.reduce((total, width) => total + width, 0) +
    bracketMetrics.columnGap * (bracketMetrics.columnWidths.length - 1) +
    bracketMetrics.paddingRight,
  height:
    bracketMetrics.paddingTop +
    bracketMetrics.rowLabelHeight +
    bracketMetrics.rowHeight * 17 +
    bracketMetrics.rowGap * 17 +
    bracketMetrics.paddingBottom,
};

function columnStart(col: number) {
  return (
    bracketMetrics.paddingLeft +
    bracketMetrics.columnWidths.slice(0, col - 1).reduce((total, width) => total + width, 0) +
    bracketMetrics.columnGap * (col - 1)
  );
}

function rowStart(row: number) {
  if (row === 1) return bracketMetrics.paddingTop;
  return (
    bracketMetrics.paddingTop +
    bracketMetrics.rowLabelHeight +
    bracketMetrics.rowGap +
    (row - 2) * (bracketMetrics.rowHeight + bracketMetrics.rowGap)
  );
}

function cardAnchor(slot: BracketSlot, side: 'left' | 'right') {
  const x = columnStart(slot.col);
  const width = bracketMetrics.columnWidths[slot.col - 1];
  return {
    x: side === 'left' ? x : x + width,
    y: rowStart(slot.row) + (bracketMetrics.rowHeight * 2 + bracketMetrics.rowGap) / 2,
  };
}

function dependencyIds(match: Match) {
  return [match.homeRef, match.awayRef].flatMap((ref) => {
    if (ref.startsWith('W:') || ref.startsWith('L:')) return [ref.slice(2)];
    return [];
  });
}

function connectionPaths(parent: Match) {
  const parentSlot = slotById[parent.id];
  const childSlots = dependencyIds(parent)
    .map((id) => slotById[id])
    .filter((slot): slot is BracketSlot => Boolean(slot));
  if (!parentSlot || childSlots.length === 0) return [];

  const leftChildren = childSlots.filter((slot) => slot.col < parentSlot.col);
  const rightChildren = childSlots.filter((slot) => slot.col > parentSlot.col);

  const drawSide = (sideChildren: BracketSlot[], side: 'left' | 'right') => {
    if (sideChildren.length === 0) return [];
    const parentAnchor = cardAnchor(parentSlot, side);
    const childSide = side === 'left' ? 'right' : 'left';
    const childAnchors = sideChildren.map((slot) => cardAnchor(slot, childSide));

    if (childAnchors.length === 1) {
      const child = childAnchors[0];
      return [`M ${child.x} ${child.y} H ${parentAnchor.x}`];
    }

    const sortedChildren = childAnchors.sort((a, b) => a.y - b.y);
    const joinX = side === 'left' ? parentAnchor.x - bracketMetrics.columnGap / 2 : parentAnchor.x + bracketMetrics.columnGap / 2;
    const first = sortedChildren[0];
    const last = sortedChildren[sortedChildren.length - 1];
    const branchPaths = sortedChildren.map((child) => `M ${child.x} ${child.y} H ${joinX}`);
    return [...branchPaths, `M ${joinX} ${first.y} V ${last.y}`, `M ${joinX} ${parentAnchor.y} H ${parentAnchor.x}`];
  };

  return [...drawSide(leftChildren, 'left'), ...drawSide(rightChildren, 'right')];
}

const bracketLinePaths = knockoutMatches.flatMap((match) =>
  connectionPaths(match).map((path, index) => ({ id: `${match.id}-${index}`, path })),
);

export function ResultsPanel({ predictions, standings, resolver, onRoster }: ResultsPanelProps) {
  const leftGroups = groupKeys.slice(0, 6);
  const rightGroups = groupKeys.slice(6);

  const renderStandingCard = (group: string) => (
    <Card key={group} withBorder className="standings-card">
      <Group justify="space-between" mb={6}>
        <Title order={5}>Bảng {group}</Title>
        <Badge size="xs" color={groupComplete(group, predictions) ? 'green' : 'gray'}>
          {groupComplete(group, predictions) ? 'Đủ trận' : 'Đang dự đoán'}
        </Badge>
      </Group>
      <Table.ScrollContainer minWidth={168}>
        <Table verticalSpacing={3} horizontalSpacing={4} className="standings-table">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Team</Table.Th>
              <Table.Th>Pts</Table.Th>
              <Table.Th>P</Table.Th>
              <Table.Th>GD</Table.Th>
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
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );

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
      <ScrollArea type="auto">
        <div className="results-board">
          <div className="standings-side standings-side-left">{leftGroups.map(renderStandingCard)}</div>
          <section className="playoff-center">
            <Title order={3} mb="md" ta="center">
              Nhánh playoff
            </Title>
            <div className="bracket">
              <svg className="bracket-lines" viewBox={`0 0 ${bracketViewBox.width} ${bracketViewBox.height}`} aria-hidden="true">
                {bracketLinePaths.map((line) => (
                  <path key={line.id} d={line.path} />
                ))}
              </svg>
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
          </section>
          <div className="standings-side standings-side-right">{rightGroups.map(renderStandingCard)}</div>
        </div>
      </ScrollArea>
    </>
  );
}
