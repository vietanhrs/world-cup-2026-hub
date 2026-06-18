import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppShell, MantineProvider, Tabs } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { IconCalendarEvent, IconChartBar, IconPencil } from '@tabler/icons-react';
import { groupMatches as staticGroupMatches, knockoutMatches } from './data/schedule';
import { AppHeader } from './components/AppHeader';
import { ClearPredictionsModal } from './components/ClearPredictionsModal';
import { HeroSection } from './components/HeroSection';
import { MatchDetailsModal } from './components/MatchDetailsModal';
import { PredictPanel } from './components/PredictPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { RosterModal } from './components/RosterModal';
import { SchedulePanel } from './components/SchedulePanel';
import { useI18n, type Language } from './i18n';
import { theme } from './theme';
import {
  buildDefaultPredictions,
  buildResolver,
  computeStandingsForMatches,
  decodePrediction,
  encodePrediction,
  hasActualResult,
  predictionProgressForMatches,
  withActualResults,
} from './utils/predictions';
import { applyLiveResults, fetchEspnResults } from './utils/liveScores';
import type { Match, Prediction, Team } from './types';
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
  const { language, setLanguage, t, matchLabel } = useI18n();
  const [predictions, setPredictions] = useState<Prediction>(() =>
    window.location.hash.startsWith('#p=') ? decodePrediction(window.location.hash) : buildDefaultPredictions(),
  );
  const [liveResults, setLiveResults] = useState<Record<string, NonNullable<Match['result']>>>({});
  const [activeGroup, setActiveGroup] = useState('A');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
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

  const groupMatches = useMemo(() => applyLiveResults(staticGroupMatches, liveResults), [liveResults]);
  const allMatches = useMemo(() => [...groupMatches, ...knockoutMatches], [groupMatches]);
  const effectivePredictions = useMemo(() => withActualResults(predictions, allMatches), [allMatches, predictions]);
  const standings = useMemo(() => computeStandingsForMatches(effectivePredictions, groupMatches), [effectivePredictions, groupMatches]);
  const resolver = useMemo(
    () =>
      buildResolver(
        effectivePredictions,
        standings,
        {
          winner: (match) => t('resolver.winner', { match: typeof match === 'string' ? match : matchLabel(match) }),
          loser: (match) => t('resolver.loser', { match: typeof match === 'string' ? match : matchLabel(match) }),
          third: (groups) => t('resolver.third', { groups }),
          groupWinner: (group) => t('resolver.groupWinner', { group }),
          groupRunnerUp: (group) => t('resolver.groupRunnerUp', { group }),
        },
        {
          groupMatches,
          knockoutMatches,
        },
      ),
    [effectivePredictions, groupMatches, matchLabel, standings, t],
  );
  const completed = predictionProgressForMatches(effectivePredictions, allMatches);
  const total = allMatches.length;
  const champion = resolver('W:final-1');
  const currentTrack = musicTracks[currentTrackIndex] ?? musicTracks[0] ?? null;

  useEffect(() => {
    const loadLiveResults = async () => {
      try {
        setLiveResults(await fetchEspnResults(staticGroupMatches));
      } catch (error) {
        console.warn('Unable to refresh ESPN scoreboard', error);
      }
    };

    void loadLiveResults();
    const intervalId = window.setInterval(loadLiveResults, 120_000);

    return () => window.clearInterval(intervalId);
  }, []);

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

  const playTrack = useCallback(
    async (nextTrackIndex = currentTrackIndexRef.current) => {
      const tracks = musicTracksRef.current;
      const nextTrack = tracks[nextTrackIndex];
      if (!nextTrack || !audioRef.current) {
        notifications.show({
          color: 'yellow',
          title: t('notify.noMusicTitle'),
          message: t('notify.noMusicMessage'),
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
          title: t('notify.musicErrorTitle'),
          message: t('notify.musicErrorMessage', { src: nextTrack.src }),
        });
      }
    },
    [t],
  );

  const getNextTrackIndex = useCallback((direction: 1 | -1) => {
    const tracks = musicTracksRef.current;
    if (tracks.length === 0) return 0;
    if (shuffleEnabledRef.current && tracks.length > 1) {
      const nextIndexes = tracks.map((_, index) => index).filter((index) => index !== currentTrackIndexRef.current);
      return nextIndexes[Math.floor(Math.random() * nextIndexes.length)];
    }
    return (currentTrackIndexRef.current + direction + tracks.length) % tracks.length;
  }, []);

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
  }, [getNextTrackIndex, playTrack]);

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
    const match = allMatches.find((candidate) => candidate.id === id);
    if (match && hasActualResult(match)) return;

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
      title: t('notify.shareTitle'),
      message: t('notify.shareMessage'),
    });
  };

  const clearAll = () => {
    setPredictions({});
    setClearConfirmOpen(false);
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
    notifications.show({
      color: 'yellow',
      title: t('notify.clearTitle'),
      message: t('notify.clearMessage'),
    });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" />
      <AppShell className="app-shell" header={{ height: { base: 118, sm: 118, md: 74 } }} padding="md">
        <AppHeader
          language={language}
          onLanguageChange={(value) => setLanguage(value as Language)}
          currentTrackTitle={currentTrack?.title ?? t('music.noTracks')}
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
                {t('tabs.predict')}
              </Tabs.Tab>
              <Tabs.Tab value="schedule" leftSection={<IconCalendarEvent size={16} />}>
                {t('tabs.schedule')}
              </Tabs.Tab>
              <Tabs.Tab value="results" leftSection={<IconChartBar size={16} />}>
                {t('tabs.results')}
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="predict" pt="md">
              <PredictPanel
                activeGroup={activeGroup}
                groupMatches={groupMatches}
                knockoutMatches={knockoutMatches}
                predictions={effectivePredictions}
                resolver={resolver}
                onActiveGroupChange={setActiveGroup}
                onScore={onScore}
                onRoster={setSelectedTeam}
                onDetails={setSelectedMatch}
              />
            </Tabs.Panel>

            <Tabs.Panel value="schedule" pt="md">
              <SchedulePanel groupMatches={groupMatches} resolver={resolver} onRoster={setSelectedTeam} onDetails={setSelectedMatch} />
            </Tabs.Panel>

            <Tabs.Panel value="results" pt="md">
              <ResultsPanel
                groupMatches={groupMatches}
                knockoutMatches={knockoutMatches}
                predictions={effectivePredictions}
                standings={standings}
                resolver={resolver}
                onRoster={setSelectedTeam}
              />
            </Tabs.Panel>
          </Tabs>
        </AppShell.Main>
      </AppShell>

      <ClearPredictionsModal opened={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)} onConfirm={clearAll} />
      <MatchDetailsModal
        match={selectedMatch}
        groupMatches={groupMatches}
        resolver={resolver}
        onClose={() => setSelectedMatch(null)}
        onRoster={setSelectedTeam}
      />
      <RosterModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </MantineProvider>
  );
}

export default App;
