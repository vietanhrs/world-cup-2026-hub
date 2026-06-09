import {
  Card,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconFlag, IconShield, IconUsersGroup } from "@tabler/icons-react";
import { PitchBoard } from "./PitchBoard";
import type { Team } from "../types";

type RosterModalProps = {
  team: Team | null;
  onClose: () => void;
};

export function RosterModal({ team, onClose }: RosterModalProps) {
  return (
    <Modal
      opened={!!team}
      onClose={onClose}
      title={team ? `${team.name} roster` : ""}
      size="xl"
    >
      {team && (
        <Stack>
          <Group>
            <ThemeIcon color="green">
              <IconFlag size={18} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text fw={700}>
                Bảng {team.group} · {team.code}
              </Text>
              <Text size="xs" c="dimmed">
                Current squad · fetched {team.rosterFetchedAt}
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
                      <Text fw={700}>{role}</Text>
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
                  <Text fw={700}>Đội hình mạnh nhất dự kiến</Text>
                </Group>
                <Text size="sm">{team.xi.join(" · ")}</Text>
                <Text
                  component="a"
                  href={team.rosterSource}
                  target="_blank"
                  rel="noreferrer"
                  size="xs"
                  c="dimmed"
                  mt="xs"
                >
                  Source: Wikipedia current squad
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
