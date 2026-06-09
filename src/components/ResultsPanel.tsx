import { Badge, Card, Divider, Group, ScrollArea, Stack, Table, Text, Title } from '@mantine/core';
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

const finalStages: Match['stage'][] = ['final', 'bronze'];

function matchesByStage(stage: Match['stage']) {
  return knockoutMatches.filter((match) => match.stage === stage);
}

export function ResultsPanel({ predictions, standings, resolver, onRoster }: ResultsPanelProps) {
  const r32Matches = matchesByStage('r32');
  const r16Matches = matchesByStage('r16');
  const qfMatches = matchesByStage('qf');
  const sfMatches = matchesByStage('sf');
  const leftRounds = [
    { label: 'R32', matches: r32Matches.slice(0, 8), className: 'bracket-r32' },
    { label: 'R16', matches: r16Matches.slice(0, 4), className: 'bracket-r16' },
    { label: 'QF', matches: qfMatches.slice(0, 2), className: 'bracket-qf' },
    { label: 'SF', matches: sfMatches.slice(0, 1), className: 'bracket-sf' },
  ];
  const rightRounds = [
    { label: 'SF', matches: sfMatches.slice(1, 2), className: 'bracket-sf' },
    { label: 'QF', matches: qfMatches.slice(2, 4), className: 'bracket-qf' },
    { label: 'R16', matches: r16Matches.slice(4, 8), className: 'bracket-r16' },
    { label: 'R32', matches: r32Matches.slice(8, 16), className: 'bracket-r32' },
  ];

  const renderMatchCard = (match: Match, isFinalCard = false) => {
    const home = resolver(match.homeRef);
    const away = resolver(match.awayRef);
    const winner = resolver(`W:${match.id}`);
    return (
      <Card key={match.id} withBorder className={`bracket-card ${isFinalCard ? `bracket-card-${match.stage}` : ''}`}>
        <Text size="xs" c="dimmed">
          {match.label}
        </Text>
        <Group justify="space-between" className="bracket-team-row">
          <TeamBadge value={home} onOpen={onRoster} />
          <Text fw={800}>{predictions[match.id]?.home ?? '-'}</Text>
        </Group>
        <Group justify="space-between" className="bracket-team-row">
          <TeamBadge value={away} onOpen={onRoster} />
          <Text fw={800}>{predictions[match.id]?.away ?? '-'}</Text>
        </Group>
        <Divider my={6} />
        <Group justify="space-between" gap="xs">
          <Text size="xs" c="dimmed">
            Winner
          </Text>
          <TeamBadge value={winner} onOpen={onRoster} />
        </Group>
      </Card>
    );
  };

  const renderRound = (round: { label: string; matches: Match[]; className: string }, side: 'left' | 'right') => (
    <Stack key={`${side}-${round.label}`} className={`bracket-round ${round.className} bracket-${side}`}>
      <Badge color="green" variant="filled" size="xs">
        {round.label}
      </Badge>
      {round.matches.map((match) => renderMatchCard(match))}
    </Stack>
  );

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
          {leftRounds.map((round) => renderRound(round, 'left'))}
          <Stack className="bracket-round bracket-finals bracket-center">
            <Badge color="yellow" variant="filled" size="sm">
              FINAL
            </Badge>
            {finalStages.map((stage) => matchesByStage(stage).map((match) => renderMatchCard(match, true)))}
          </Stack>
          {rightRounds.map((round) => renderRound(round, 'right'))}
        </div>
      </ScrollArea>
    </>
  );
}
