import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell, MantineProvider, Tabs } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { IconChartBar, IconPencil } from '@tabler/icons-react';
import { allMatches } from './data/schedule';
import { AppHeader } from './components/AppHeader';
import { ClearPredictionsModal } from './components/ClearPredictionsModal';
import { HeroSection } from './components/HeroSection';
import { PredictPanel } from './components/PredictPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { RosterModal } from './components/RosterModal';
import { theme } from './theme';
import {
  buildDefaultPredictions,
  buildResolver,
  computeStandings,
  decodePrediction,
  encodePrediction,
  predictionProgress,
} from './utils/predictions';
import type { Prediction, Team } from './types';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

type MusicTrack = {
  src: string;
  title: string;
};

type RepeatMode = 'one' | 'all';

const audioFilePattern = /\.(mp3|wav|ogg|m4a|aac|flac)$/i;

function titleFromTrackPath(path: string) {
  return decodeURIComponent(path.split('/').pop() ?? 'World Cup track')
    .replace(audioFilePattern, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tracksFromDirectoryHtml(html: string): MusicTrack[] {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const tracks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
    .map((anchor) => anchor.getAttribute('href') ?? '')
    .filter((href) => audioFilePattern.test(href))
    .map((href) => {
      const src = href.startsWith('http') || href.startsWith('/media/') ? href : `/media/${href.replace(/^\.?\//, '')}`;
      return { src, title: titleFromTrackPath(src) };
    });

  return Array.from(new Map(tracks.map((track) => [track.src, track])).values());
}

function normalizeTracks(rawTracks: unknown): MusicTrack[] {
  if (!Array.isArray(rawTracks)) return [];
  return rawTracks
    .filter((track): track is MusicTrack => {
      if (!track || typeof track !== 'object') return false;
      return 'src' in track && 'title' in track && typeof track.src === 'string' && typeof track.title === 'string';
    })
    .filter((track) => audioFilePattern.test(track.src));
}

function App() {
  const [predictions, setPredictions] = useState<Prediction>(() =>
    window.location.hash.startsWith('#p=') ? decodePrediction(window.location.hash) : buildDefaultPredictions(),
  );
  const [activeGroup, setActiveGroup] = useState('A');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicTracksRef = useRef<MusicTrack[]>([]);
  const currentTrackIndexRef = useRef(0);
  const repeatModeRef = useRef<RepeatMode>('all');
  const shuffleEnabledRef = useRef(false);

  const standings = useMemo(() => computeStandings(predictions), [predictions]);
  const resolver = useMemo(() => buildResolver(predictions, standings), [predictions, standings]);
  const completed = predictionProgress(predictions);
  const total = allMatches.length;
  const champion = resolver('W:final-1');
  const currentTrack = musicTracks[currentTrackIndex] ?? musicTracks[0] ?? null;

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    musicTracksRef.current = musicTracks;
  }, [musicTracks]);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);

  useEffect(() => {
    shuffleEnabledRef.current = shuffleEnabled;
  }, [shuffleEnabled]);

  useEffect(() => {
    const loadTracks = async () => {
      const fallbackTrack = {
        src: '/media/three-nations.mp3',
        title: 'Three Nations',
      };

      try {
        const manifestResponse = await fetch('/media/tracks.json', {
          cache: 'no-store',
        });
        const manifestTracks = manifestResponse.ok ? normalizeTracks(await manifestResponse.json()) : [];
        if (manifestTracks.length > 0) {
          setMusicTracks(manifestTracks);
          return;
        }

        const response = await fetch('/media/');
        const html = response.ok ? await response.text() : '';
        const tracks = tracksFromDirectoryHtml(html);
        setMusicTracks(tracks.length > 0 ? tracks : [fallbackTrack]);
      } catch {
        setMusicTracks([fallbackTrack]);
      }
    };

    void loadTracks();
  }, []);

  const playTrack = async (nextTrackIndex = currentTrackIndexRef.current) => {
    const tracks = musicTracksRef.current;
    const nextTrack = tracks[nextTrackIndex];
    if (!nextTrack || !audioRef.current) {
      notifications.show({
        color: 'yellow',
        title: 'Không có track nhạc',
        message: 'Chưa tìm thấy file nhạc trong thư mục /media.',
      });
      return;
    }

    const audio = audioRef.current;
    const nextSrc = new URL(nextTrack.src, window.location.origin).href;
    if (audio.src !== nextSrc) {
      audio.src = nextTrack.src;
      audio.load();
    }

    try {
      await audio.play();
      setCurrentTrackIndex(nextTrackIndex);
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
      notifications.show({
        color: 'yellow',
        title: 'Không phát được nhạc',
        message: `Không mở được ${nextTrack.src}.`,
      });
    }
  };

  const getNextTrackIndex = (direction: 1 | -1) => {
    const tracks = musicTracksRef.current;
    if (tracks.length === 0) return 0;
    if (shuffleEnabledRef.current && tracks.length > 1) {
      const nextIndexes = tracks.map((_, index) => index).filter((index) => index !== currentTrackIndexRef.current);
      return nextIndexes[Math.floor(Math.random() * nextIndexes.length)];
    }
    return (currentTrackIndexRef.current + direction + tracks.length) % tracks.length;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      const tracks = musicTracksRef.current;
      if (repeatModeRef.current === 'one') {
        void playTrack(currentTrackIndexRef.current);
        return;
      }
      if (tracks.length <= 1) {
        if (repeatModeRef.current === 'all') {
          void playTrack(currentTrackIndexRef.current);
          return;
        }
        setIsMusicPlaying(false);
        return;
      }
      void playTrack(getNextTrackIndex(1));
    };

    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause();
      setIsMusicPlaying(false);
      return;
    }
    void playTrack();
  };

  const stopMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsMusicPlaying(false);
  };

  const previousTrack = () => {
    const tracks = musicTracksRef.current;
    if (tracks.length === 0) return;
    void playTrack(getNextTrackIndex(-1));
  };

  const nextTrack = () => {
    const tracks = musicTracksRef.current;
    if (tracks.length === 0) return;
    void playTrack(getNextTrackIndex(1));
  };

  const toggleRepeatMode = () => {
    setRepeatMode((current) => (current === 'all' ? 'one' : 'all'));
  };

  const toggleShuffle = () => {
    setShuffleEnabled((current) => !current);
  };

  const onScore = (id: string, side: 'home' | 'away', value: number | string | null) => {
    const numberValue = typeof value === 'number' ? value : null;
    setPredictions((current) => ({
      ...current,
      [id]: {
        home: current[id]?.home ?? null,
        away: current[id]?.away ?? null,
        [side]: numberValue,
      },
    }));
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#p=${encodePrediction(predictions)}`;
    await navigator.clipboard.writeText(url);
    notifications.show({
      color: 'green',
      title: 'Đã copy link share',
      message: 'Người khác mở link sẽ thấy prediction hiện tại.',
    });
  };

  const clearAll = () => {
    setPredictions({});
    setClearConfirmOpen(false);
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
    notifications.show({
      color: 'yellow',
      title: 'Đã xóa prediction',
      message: 'Tất cả tỉ số đã được đưa về trống.',
    });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" />
      <AppShell className="app-shell" header={{ height: { base: 118, sm: 118, md: 74 } }} padding="md">
        <AppHeader
          currentTrackTitle={currentTrack?.title ?? 'No media tracks'}
          isMusicPlaying={isMusicPlaying}
          hasMusicTracks={musicTracks.length > 0}
          repeatMode={repeatMode}
          shuffleEnabled={shuffleEnabled}
          onMusicToggle={toggleMusic}
          onMusicStop={stopMusic}
          onMusicNext={nextTrack}
          onMusicPrevious={previousTrack}
          onRepeatToggle={toggleRepeatMode}
          onShuffleToggle={toggleShuffle}
          onShare={share}
          onClear={() => setClearConfirmOpen(true)}
        />
        <AppShell.Main>
          <HeroSection completed={completed} total={total} champion={champion} />

          <Tabs defaultValue="predict" className="main-tabs">
            <Tabs.List>
              <Tabs.Tab value="predict" leftSection={<IconPencil size={16} />}>
                Điền tỉ số
              </Tabs.Tab>
              <Tabs.Tab value="results" leftSection={<IconChartBar size={16} />}>
                Kết quả prediction
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="predict" pt="md">
              <PredictPanel
                activeGroup={activeGroup}
                predictions={predictions}
                resolver={resolver}
                onActiveGroupChange={setActiveGroup}
                onScore={onScore}
                onRoster={setSelectedTeam}
              />
            </Tabs.Panel>

            <Tabs.Panel value="results" pt="md">
              <ResultsPanel predictions={predictions} standings={standings} resolver={resolver} onRoster={setSelectedTeam} />
            </Tabs.Panel>
          </Tabs>
        </AppShell.Main>
      </AppShell>

      <ClearPredictionsModal opened={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)} onConfirm={clearAll} />
      <RosterModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </MantineProvider>
  );
}

export default App;
