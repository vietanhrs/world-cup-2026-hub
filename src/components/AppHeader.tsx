import { ActionIcon, AppShell, Box, Group, SegmentedControl, Text, ThemeIcon, Title, Tooltip, useMantineColorScheme } from '@mantine/core';
import {
  IconArrowsShuffle,
  IconDeviceDesktop,
  IconMoon,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconPlayerStop,
  IconRepeatOnce,
  IconRepeat,
  IconShare3,
  IconSun,
  IconTrash,
  IconTrophy,
} from '@tabler/icons-react';
import { useI18n, type Language } from '../i18n';

type RepeatMode = 'one' | 'all';

type AppHeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
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
  language,
  onLanguageChange,
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
  const { t } = useI18n();

  return (
    <AppShell.Header className="topbar">
      <Group h="100%" px="md" justify="space-between" className="topbar-content">
        <Group gap="sm">
          <ThemeIcon size={42} radius={8} color="green">
            <IconTrophy size={24} />
          </ThemeIcon>
          <Box>
            <Title order={2}>World Cup 2026 Hub</Title>
            <Text size="sm" c="dimmed" className="topbar-subtitle">
              {t('app.subtitle')}
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
                  <Tooltip label={t('header.theme.dark')}>
                    <IconMoon size={16} />
                  </Tooltip>
                ),
              },
              {
                value: 'light',
                label: (
                  <Tooltip label={t('header.theme.light')}>
                    <IconSun size={16} />
                  </Tooltip>
                ),
              },
              {
                value: 'auto',
                label: (
                  <Tooltip label={t('header.theme.system')}>
                    <IconDeviceDesktop size={16} />
                  </Tooltip>
                ),
              },
            ]}
          />
          <SegmentedControl
            className="language-switcher"
            size="xs"
            value={language}
            onChange={(value) => onLanguageChange(value as Language)}
            data={[
              { value: 'en-US', label: '🇺🇸 EN' },
              { value: 'vi-VN', label: '🇻🇳 VI' },
            ]}
          />
          <Tooltip label={t('header.share')}>
            <ActionIcon variant="light" size="lg" onClick={onShare} aria-label={t('header.share')}>
              <IconShare3 size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('header.clear')}>
            <ActionIcon variant="light" color="red" size="lg" onClick={onClear} aria-label={t('header.clear')}>
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
          <Group gap={4} className="music-player" wrap="nowrap">
            <Tooltip label={t('music.previous')}>
              <ActionIcon variant="light" size="lg" onClick={onMusicPrevious} disabled={!hasMusicTracks}>
                <IconPlayerSkipBack size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={isMusicPlaying ? t('music.pause') : t('music.play')}>
              <ActionIcon variant="filled" size="lg" color="green" onClick={onMusicToggle} disabled={!hasMusicTracks}>
                {isMusicPlaying ? <IconPlayerPause size={17} /> : <IconPlayerPlay size={17} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t('music.stop')}>
              <ActionIcon variant="light" size="lg" onClick={onMusicStop} disabled={!hasMusicTracks}>
                <IconPlayerStop size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t('music.next')}>
              <ActionIcon variant="light" size="lg" onClick={onMusicNext} disabled={!hasMusicTracks}>
                <IconPlayerSkipForward size={17} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={repeatMode === 'one' ? t('music.repeatOne') : t('music.repeatAll')}>
              <ActionIcon
                className="music-mode-button"
                variant={repeatMode === 'one' ? 'filled' : 'light'}
                color={repeatMode === 'one' ? 'yellow' : 'green'}
                size="lg"
                onClick={onRepeatToggle}
                disabled={!hasMusicTracks}
                aria-label={repeatMode === 'one' ? t('music.repeatOne') : t('music.repeatAll')}
              >
                {repeatMode === 'one' ? <IconRepeatOnce size={17} /> : <IconRepeat size={17} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label={shuffleEnabled ? t('music.shuffleOn') : t('music.shuffleOff')}>
              <ActionIcon
                className="music-mode-button"
                variant={shuffleEnabled ? 'filled' : 'light'}
                color={shuffleEnabled ? 'yellow' : 'green'}
                size="lg"
                onClick={onShuffleToggle}
                disabled={!hasMusicTracks}
                aria-label={shuffleEnabled ? t('music.shuffleOn') : t('music.shuffleOff')}
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
