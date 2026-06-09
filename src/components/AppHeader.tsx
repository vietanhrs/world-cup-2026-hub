import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Group,
  SegmentedControl,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { IconDeviceDesktop, IconMoon, IconMusic, IconShare3, IconSun, IconTrash, IconTrophy } from '@tabler/icons-react';

type AppHeaderProps = {
  musicReady: boolean;
  onStart: () => void;
  onShare: () => void;
  onClear: () => void;
};

export function AppHeader({ musicReady, onStart, onShare, onClear }: AppHeaderProps) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

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
        <Group gap="xs" className="topbar-actions">
          <SegmentedControl
            className="theme-switcher"
            size="xs"
            value={colorScheme}
            onChange={(value) => setColorScheme(value as 'light' | 'dark' | 'auto')}
            data={[
              {
                value: 'dark',
                label: (
                  <Tooltip label="Dark">
                    <IconMoon size={16} />
                  </Tooltip>
                ),
              },
              {
                value: 'light',
                label: (
                  <Tooltip label="Light">
                    <IconSun size={16} />
                  </Tooltip>
                ),
              },
              {
                value: 'auto',
                label: (
                  <Tooltip label="System">
                    <IconDeviceDesktop size={16} />
                  </Tooltip>
                ),
              },
            ]}
          />
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
            {musicReady ? 'Đang dự đoán' : 'Bắt đầu dự đoán'}
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
