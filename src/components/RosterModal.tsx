import { Card, Group, Modal, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconFlag, IconShield, IconUsersGroup } from '@tabler/icons-react';
import { useI18n } from '../i18n';
import { PitchBoard } from './PitchBoard';
import type { RosterRole, Team } from '../types';

type RosterModalProps = {
  team: Team | null;
  onClose: () => void;
};

export function RosterModal({ team, onClose }: RosterModalProps) {
  const { t, rosterRoleLabel } = useI18n();

  return (
    <Modal opened={!!team} onClose={onClose} title={team ? t('roster.title', { team: team.name }) : ''} size="min(96vw, 1400px)">
      {team && (
        <Stack>
          <Group>
            <ThemeIcon color="green">
              <IconFlag size={18} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text fw={700}>
                {team.flag} {t('common.group', { group: team.group })} · {team.code}
              </Text>
              <Text size="xs" c="dimmed">
                {t('roster.currentSquad', { date: team.rosterFetchedAt })}
              </Text>
            </Stack>
          </Group>
          <div className="roster-modal-grid">
            <Stack gap="md" className="roster-list">
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {Object.entries(team.roster).map(([role, players]) => (
                  <Card withBorder key={role} className="roster-card">
                    <Group mb="xs">
                      <IconUsersGroup size={16} />
                      <Text fw={700}>{rosterRoleLabel(role as RosterRole)}</Text>
                    </Group>
                    <Stack gap={4}>
                      {players.map((player) => (
                        <Text size="sm" key={player}>
                          {player}
                        </Text>
                      ))}
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
              <Card withBorder className="xi-card">
                <Group mb="xs">
                  <IconShield size={16} />
                  <Text fw={700}>{t('roster.bestXi')}</Text>
                </Group>
                <Text size="sm">{team.xi.join(' · ')}</Text>
                <Text component="a" href={team.rosterSource} target="_blank" rel="noreferrer" size="xs" c="dimmed" mt="xs">
                  {t('common.source')}
                </Text>
              </Card>
            </Stack>
            <PitchBoard team={team} />
          </div>
        </Stack>
      )}
    </Modal>
  );
}
