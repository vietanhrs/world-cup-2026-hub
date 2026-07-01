import { useEffect, useMemo, useState } from 'react';
import { Alert, Anchor, Badge, Group, Loader, Modal, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { IconAlertCircle, IconCards, IconExchange, IconSoccerField, IconTrophy } from '@tabler/icons-react';
import { teamMap } from '../data/groups';
import { useI18n } from '../i18n';
import { formatKickoff, resultLabel } from '../utils/predictions';
import { fetchEspnMatchDetails, hasEnoughMatchDetails, type MatchDetails, type MatchEventKind } from '../utils/matchDetails';
import { TeamBadge } from './TeamBadge';
import type { Match, Team } from '../types';

type MatchDetailsModalProps = {
  match: Match | null;
  groupMatches: Match[];
  resolver: (ref: string) => Team | string;
  onClose: () => void;
  onRoster: (team: Team) => void;
};

type DetailsLoadState = {
  matchId: string;
  details: MatchDetails | null;
  error: string | null;
};

const eventColors: Record<MatchEventKind, string> = {
  goal: 'green',
  'yellow-card': 'yellow',
  'red-card': 'red',
  substitution: 'blue',
};

const eventIcons: Record<MatchEventKind, typeof IconTrophy> = {
  goal: IconTrophy,
  'yellow-card': IconCards,
  'red-card': IconCards,
  substitution: IconExchange,
};

function teamValue(ref: string, resolver: (ref: string) => Team | string) {
  const resolved = resolver(ref);
  return typeof resolved === 'string' ? teamMap[ref] : resolved;
}

function eventLabel(kind: MatchEventKind) {
  if (kind === 'goal') return 'Goal';
  if (kind === 'yellow-card') return 'Yellow card';
  if (kind === 'red-card') return 'Red card';
  return 'Substitution';
}

export function MatchDetailsModal({ match, groupMatches, resolver, onClose, onRoster }: MatchDetailsModalProps) {
  const { language, matchLabel } = useI18n();
  const [loadState, setLoadState] = useState<DetailsLoadState | null>(null);
  const home = useMemo(() => (match ? teamValue(match.homeRef, resolver) : undefined), [match, resolver]);
  const away = useMemo(() => (match ? teamValue(match.awayRef, resolver) : undefined), [match, resolver]);
  const details = match && loadState?.matchId === match.id ? loadState.details : null;
  const error = match && loadState?.matchId === match.id ? loadState.error : null;
  const loading = Boolean(match && loadState?.matchId !== match.id);

  useEffect(() => {
    if (!match) return;

    const controller = new AbortController();

    fetchEspnMatchDetails(match, groupMatches)
      .then((nextDetails) => {
        if (controller.signal.aborted) return;
        setLoadState({
          matchId: match.id,
          details: nextDetails,
          error: hasEnoughMatchDetails(nextDetails) ? null : 'ESPN has not published detailed data for this match yet.',
        });
      })
      .catch((nextError: unknown) => {
        if (controller.signal.aborted) return;
        setLoadState({
          matchId: match.id,
          details: null,
          error: nextError instanceof Error ? nextError.message : 'Unable to load match details.',
        });
      });

    return () => controller.abort();
  }, [groupMatches, match]);

  return (
    <Modal opened={Boolean(match)} onClose={onClose} title={match ? `${matchLabel(match)} details` : undefined} size="xl" centered>
      {match ? (
        <Stack gap="lg">
          <div className="match-detail-header">
            <Group justify="space-between" gap="md" wrap="nowrap">
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  {formatKickoff(match.kickoff, language)} · {match.venue}
                </Text>
                <Group gap="xs" wrap="nowrap">
                  {home ? <TeamBadge value={home} onOpen={onRoster} /> : null}
                  <Badge size="lg" variant="filled" color="green" className="match-detail-score">
                    {match.result ? resultLabel(match.result) : null}
                  </Badge>
                  {away ? <TeamBadge value={away} onOpen={onRoster} /> : null}
                </Group>
              </Stack>
              {details ? (
                <Anchor href={details.sourceUrl} target="_blank" rel="noreferrer" size="sm">
                  Source: {details.sourceName}
                </Anchor>
              ) : null}
            </Group>
          </div>

          {loading ? (
            <Group justify="center" py="xl">
              <Loader size="sm" />
              <Text size="sm" c="dimmed">
                Loading ESPN match details...
              </Text>
            </Group>
          ) : null}

          {error ? (
            <Alert color="yellow" icon={<IconAlertCircle size={18} />}>
              {error}
            </Alert>
          ) : null}

          {details ? (
            <>
              <section>
                <Group gap="xs" mb="sm">
                  <IconSoccerField size={18} />
                  <Title order={4}>Starting lineups</Title>
                </Group>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {details.lineups.map((lineup) => (
                    <div key={lineup.side} className="match-detail-section">
                      <Text fw={800} mb="xs">
                        {lineup.teamName}
                      </Text>
                      <div className="lineup-list">
                        {lineup.starters.map((player) => (
                          <div key={`${lineup.side}-${player.name}`} className="lineup-player">
                            <Badge size="xs" variant="light" color="green">
                              {player.jersey ?? '-'}
                            </Badge>
                            <Text size="sm" fw={700}>
                              {player.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {player.position ?? ''}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </SimpleGrid>
              </section>

              <section>
                <Title order={4} mb="sm">
                  Match events
                </Title>
                <Stack gap="xs">
                  {details.events.map((event) => {
                    const Icon = eventIcons[event.kind];
                    return (
                      <div key={event.id} className="match-event-row">
                        <Badge color={eventColors[event.kind]} variant="filled" className="match-event-minute">
                          {event.minute}
                        </Badge>
                        <Icon size={18} />
                        <div>
                          <Group gap="xs">
                            <Text size="sm" fw={800}>
                              {eventLabel(event.kind)}
                            </Text>
                            {event.teamName ? (
                              <Text size="xs" c="dimmed">
                                {event.teamName}
                              </Text>
                            ) : null}
                          </Group>
                          <Text size="sm">{event.description}</Text>
                        </div>
                      </div>
                    );
                  })}
                </Stack>
              </section>

              <section>
                <Title order={4} mb="sm">
                  Match stats
                </Title>
                <Table striped withTableBorder className="match-stats-table">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>{home?.code ?? 'Home'}</Table.Th>
                      <Table.Th>Stat</Table.Th>
                      <Table.Th>{away?.code ?? 'Away'}</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {details.stats.map((row) => (
                      <Table.Tr key={row.key}>
                        <Table.Td>{row.homeValue}</Table.Td>
                        <Table.Td>{row.label}</Table.Td>
                        <Table.Td>{row.awayValue}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </section>
            </>
          ) : null}
        </Stack>
      ) : null}
    </Modal>
  );
}
