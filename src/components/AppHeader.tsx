import { ActionIcon, AppShell, Box, Group, SegmentedControl, Text, ThemeIcon, Title, Tooltip, useMantineColorScheme } from '@mantine/core';
import {
  IconDeviceDesktop,
  IconMoon,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconPlayerStop,
  IconRepeat,
  IconRepeatOnce,
  IconShare3,
  IconArrowsShuffle,
  IconSun,
  IconTrash,
  IconTrophy,
} from '@tabler/icons-react';

type RepeatMode = 'one' | 'all';

type AppHeaderProps = {
  currentTrackTitle: string;
  isMusicPlaying: boolean;
  hasMusicTracks: boolean;
  repeatMode: RepeatMode;
  shuffleEnabled: boolean;
  onMusicToggle: () => void;
  onMusicStop: () => void;
  onMusicNext: () => void;
  onMusicPrevious: () => void;
  onRepeatToggle: () => void;
  onShuffleToggle: () => void;
  onShare: () => void;
  onClear: () => void;
};

export function AppHeader({
  currentTrackTitle,
  isMusicPlaying,
  hasMusicTracks,
  repeatMode,
  shuffleEnabled,
  onMusicToggle,
  onMusicStop,
  onMusicNext,
  onMusicPrevious,
  onRepeatToggle,
  onShuffleToggle,
  onShare,
  onClear,
}: AppHeaderProps) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <AppShell.Header className="topbar">
      <Group h="100%" px="md" justify="space-between">
        <Group gap="sm">
          <ThemeIcon size={42} radius={8} color="green">
            <IconTrophy size={24} />
          </ThemeIcon>
          <Box>
            <Title order={2}>World Cup 2026 Hub</Title>
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
          <Group gap={4} className="music-player" wrap="nowrap">
            <Tooltip label="Previous track">
              <ActionIcon variant="light" size="lg" onClick={onMusicPrevious} disabled={!hasMusicTracks}>
                <IconPlayerSkipBack size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={isMusicPlaying ? 'Pause' : 'Start / Resume'}>
              <ActionIcon variant="filled" size="lg" color="green" onClick={onMusicToggle} disabled={!hasMusicTracks}>
                {isMusicPlaying ? <IconPlayerPause size={17} /> : <IconPlayerPlay size={17} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Stop">
              <ActionIcon variant="light" size="lg" onClick={onMusicStop} disabled={!hasMusicTracks}>
                <IconPlayerStop size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Next track">
              <ActionIcon variant="light" size="lg" onClick={onMusicNext} disabled={!hasMusicTracks}>
                <IconPlayerSkipForward size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={repeatMode === 'one' ? 'Repeat one' : 'Repeat all'}>
              <ActionIcon
                className="music-mode-button"
                variant={repeatMode === 'one' ? 'filled' : 'light'}
                color={repeatMode === 'one' ? 'yellow' : 'green'}
                size="lg"
                onClick={onRepeatToggle}
                disabled={!hasMusicTracks}
                aria-label={repeatMode === 'one' ? 'Repeat one' : 'Repeat all'}
              >
                {repeatMode === 'one' ? <IconRepeatOnce size={17} /> : <IconRepeat size={17} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label={shuffleEnabled ? 'Shuffle on' : 'Shuffle off'}>
              <ActionIcon
                className="music-mode-button"
                variant={shuffleEnabled ? 'filled' : 'light'}
                color={shuffleEnabled ? 'yellow' : 'green'}
                size="lg"
                onClick={onShuffleToggle}
                disabled={!hasMusicTracks}
                aria-label={shuffleEnabled ? 'Shuffle on' : 'Shuffle off'}
              >
                <IconArrowsShuffle size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={currentTrackTitle}>
              <Text size="xs" fw={700} className="music-track-label">
                {currentTrackTitle}
              </Text>
            </Tooltip>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
