import { Badge, Card, Divider, Group, ScrollArea, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
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

const bracketStages: Match['stage'][] = ['r32', 'r16', 'qf', 'sf'];

const finalStages: Match['stage'][] = ['final', 'bronze'];

function winnerDestination(matchId: string) {
  return knockoutMatches.find((match) => match.homeRef === `W:${matchId}` || match.awayRef === `W:${matchId}`);
}

export function ResultsPanel({ predictions, standings, resolver, onRoster }: ResultsPanelProps) {
  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="sm">
        {groupKeys.map((group) => (
          <Card key={group} withBorder className="standings-card">
            <Group justify="space-between" mb={6}>
              <Title order={5}>Bảng {group}</Title>
              <Badge size="xs" color={groupComplete(group, predictions) ? 'green' : 'gray'}>
                {groupComplete(group, predictions) ? 'Đủ trận' : 'Đang dự đoán'}
              </Badge>
            </Group>
            <Table.ScrollContainer minWidth={270}>
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
      </SimpleGrid>
      <Title order={3} mt="xl" mb="md">
        Nhánh playoff
      </Title>
      <ScrollArea type="auto">
        <div className="bracket">
          {bracketStages.map((stage) => (
            <Stack key={stage} className="bracket-round">
              <Badge color="green" variant="filled" size="sm">
                {stage.toUpperCase()}
              </Badge>
              {knockoutMatches
                .filter((match) => match.stage === stage)
                .map((match) => {
                  const home = resolver(match.homeRef);
                  const away = resolver(match.awayRef);
                  const winner = resolver(`W:${match.id}`);
                  const nextMatch = winnerDestination(match.id);
                  return (
                    <Card key={match.id} withBorder className="bracket-card">
                      <Text size="xs" c="dimmed">
                        {match.label}
                      </Text>
                      <Group justify="space-between">
                        <TeamBadge value={home} onOpen={onRoster} />
                        <Text>{predictions[match.id]?.home ?? '-'}</Text>
                      </Group>
                      <Group justify="space-between">
                        <TeamBadge value={away} onOpen={onRoster} />
                        <Text>{predictions[match.id]?.away ?? '-'}</Text>
                      </Group>
                      <Divider my="xs" />
                      <Text size="xs" c="dimmed">
                        Winner
                      </Text>
                      <TeamBadge value={winner} onOpen={onRoster} />
                      {nextMatch && (
                        <Text size="xs" className="bracket-next">
                          → {nextMatch.label}
                        </Text>
                      )}
                    </Card>
                  );
                })}
            </Stack>
          ))}
          <Stack className="bracket-round bracket-finals">
            <Badge color="yellow" variant="filled" size="sm">
              FINALS
            </Badge>
            {finalStages.map((stage) =>
              knockoutMatches
                .filter((match) => match.stage === stage)
                .map((match) => {
                  const home = resolver(match.homeRef);
                  const away = resolver(match.awayRef);
                  const winner = resolver(`W:${match.id}`);
                  return (
                    <Card key={match.id} withBorder className={`bracket-card bracket-card-${stage}`}>
                      <Text size="xs" c="dimmed">
                        {match.label}
                      </Text>
                      <Group justify="space-between">
                        <TeamBadge value={home} onOpen={onRoster} />
                        <Text>{predictions[match.id]?.home ?? '-'}</Text>
                      </Group>
                      <Group justify="space-between">
                        <TeamBadge value={away} onOpen={onRoster} />
                        <Text>{predictions[match.id]?.away ?? '-'}</Text>
                      </Group>
                      <Divider my="xs" />
                      <Text size="xs" c="dimmed">
                        Winner
                      </Text>
                      <TeamBadge value={winner} onOpen={onRoster} />
                    </Card>
                  );
                }),
            )}
          </Stack>
        </div>
      </ScrollArea>
    </>
  );
}
