import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Group,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconMusic,
  IconShare3,
  IconTrash,
  IconTrophy,
} from "@tabler/icons-react";

type AppHeaderProps = {
  musicReady: boolean;
  onStart: () => void;
  onShare: () => void;
  onClear: () => void;
};

export function AppHeader({
  musicReady,
  onStart,
  onShare,
  onClear,
}: AppHeaderProps) {
  return (
    <AppShell.Header className="topbar">
      <Group h="100%" px="md" justify="space-between">
        <Group gap="sm">
          <ThemeIcon size={42} radius={8} color="green">
            <IconTrophy size={24} />
          </ThemeIcon>
          <Box>
            <Title order={2}>WC 2026 Predictor</Title>
            <Text size="sm" c="dimmed">
              Group table · knockout bracket · roster board
            </Text>
          </Box>
        </Group>
        <Group gap="xs">
          <Tooltip label="Share prediction">
            <ActionIcon variant="light" size="lg" onClick={onShare}>
              <IconShare3 size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Clear all predictions">
            <ActionIcon variant="light" color="red" size="lg" onClick={onClear}>
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
          <Button leftSection={<IconMusic size={18} />} onClick={onStart}>
            {musicReady ? "Đang dự đoán" : "Bắt đầu dự đoán"}
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
