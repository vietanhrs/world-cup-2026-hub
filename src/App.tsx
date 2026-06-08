import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  MantineProvider,
  Modal,
  NumberInput,
  Progress,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  createTheme,
} from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import {
  IconChartBar,
  IconCrown,
  IconFlag,
  IconMusic,
  IconPencil,
  IconShare3,
  IconShield,
  IconSparkles,
  IconTrash,
  IconTrophy,
  IconUsersGroup,
} from '@tabler/icons-react';
import { actualRosters } from './data/rosters';
import { allMatches, groupMatches, knockoutMatches, type ScheduleMatch } from './data/schedule';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

type Team = {
  id: string;
  name: string;
  code: string;
  group: string;
  seed: number;
  color: string;
  roster: Record<'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo', string[]>;
  xi: string[];
  rosterSource: string;
  rosterFetchedAt: string;
};

type BaseTeam = Omit<Team, 'roster' | 'xi' | 'rosterSource' | 'rosterFetchedAt'>;

type Match = ScheduleMatch;

type Prediction = Record<string, { home: number | null; away: number | null }>;
type Standing = { team: Team; played: number; won: number; drawn: number; lost: number; gf: number; ga: number; gd: number; points: number };

const groups: Record<string, BaseTeam[]> = {
  A: [
    { id: 'mexico', name: 'Mexico', code: 'MEX', group: 'A', seed: 1, color: '#006847' },
    { id: 'south-africa', name: 'South Africa', code: 'RSA', group: 'A', seed: 2, color: '#007a4d' },
    { id: 'korea-republic', name: 'Korea Republic', code: 'KOR', group: 'A', seed: 3, color: '#c60c30' },
    { id: 'czechia', name: 'Czechia', code: 'CZE', group: 'A', seed: 4, color: '#11457e' },
  ],
  B: [
    { id: 'canada', name: 'Canada', code: 'CAN', group: 'B', seed: 1, color: '#d80621' },
    { id: 'bosnia', name: 'Bosnia and Herzegovina', code: 'BIH', group: 'B', seed: 2, color: '#003fb6' },
    { id: 'qatar', name: 'Qatar', code: 'QAT', group: 'B', seed: 3, color: '#8a1538' },
    { id: 'switzerland', name: 'Switzerland', code: 'SUI', group: 'B', seed: 4, color: '#d52b1e' },
  ],
  C: [
    { id: 'brazil', name: 'Brazil', code: 'BRA', group: 'C', seed: 1, color: '#009b3a' },
    { id: 'morocco', name: 'Morocco', code: 'MAR', group: 'C', seed: 2, color: '#c1272d' },
    { id: 'haiti', name: 'Haiti', code: 'HAI', group: 'C', seed: 3, color: '#00209f' },
    { id: 'scotland', name: 'Scotland', code: 'SCO', group: 'C', seed: 4, color: '#005eb8' },
  ],
  D: [
    { id: 'usa', name: 'United States', code: 'USA', group: 'D', seed: 1, color: '#3b3b6d' },
    { id: 'paraguay', name: 'Paraguay', code: 'PAR', group: 'D', seed: 2, color: '#d52b1e' },
    { id: 'australia', name: 'Australia', code: 'AUS', group: 'D', seed: 3, color: '#ffcd00' },
    { id: 'turkiye', name: 'Türkiye', code: 'TUR', group: 'D', seed: 4, color: '#e30a17' },
  ],
  E: [
    { id: 'germany', name: 'Germany', code: 'GER', group: 'E', seed: 1, color: '#111111' },
    { id: 'curacao', name: 'Curaçao', code: 'CUW', group: 'E', seed: 2, color: '#21468b' },
    { id: 'cote-divoire', name: "Côte d'Ivoire", code: 'CIV', group: 'E', seed: 3, color: '#f77f00' },
    { id: 'ecuador', name: 'Ecuador', code: 'ECU', group: 'E', seed: 4, color: '#ffdd00' },
  ],
  F: [
    { id: 'netherlands', name: 'Netherlands', code: 'NED', group: 'F', seed: 1, color: '#ff7f00' },
    { id: 'japan', name: 'Japan', code: 'JPN', group: 'F', seed: 2, color: '#bc002d' },
    { id: 'sweden', name: 'Sweden', code: 'SWE', group: 'F', seed: 3, color: '#006aa7' },
    { id: 'tunisia', name: 'Tunisia', code: 'TUN', group: 'F', seed: 4, color: '#e70013' },
  ],
  G: [
    { id: 'belgium', name: 'Belgium', code: 'BEL', group: 'G', seed: 1, color: '#ffd90c' },
    { id: 'egypt', name: 'Egypt', code: 'EGY', group: 'G', seed: 2, color: '#ce1126' },
    { id: 'iran', name: 'IR Iran', code: 'IRN', group: 'G', seed: 3, color: '#239f40' },
    { id: 'new-zealand', name: 'New Zealand', code: 'NZL', group: 'G', seed: 4, color: '#111111' },
  ],
  H: [
    { id: 'spain', name: 'Spain', code: 'ESP', group: 'H', seed: 1, color: '#aa151b' },
    { id: 'cabo-verde', name: 'Cabo Verde', code: 'CPV', group: 'H', seed: 2, color: '#003893' },
    { id: 'saudi-arabia', name: 'Saudi Arabia', code: 'KSA', group: 'H', seed: 3, color: '#006c35' },
    { id: 'uruguay', name: 'Uruguay', code: 'URU', group: 'H', seed: 4, color: '#6bc6e8' },
  ],
  I: [
    { id: 'france', name: 'France', code: 'FRA', group: 'I', seed: 1, color: '#1d3557' },
    { id: 'senegal', name: 'Senegal', code: 'SEN', group: 'I', seed: 2, color: '#00853f' },
    { id: 'iraq', name: 'Iraq', code: 'IRQ', group: 'I', seed: 3, color: '#ce1126' },
    { id: 'norway', name: 'Norway', code: 'NOR', group: 'I', seed: 4, color: '#ba0c2f' },
  ],
  J: [
    { id: 'argentina', name: 'Argentina', code: 'ARG', group: 'J', seed: 1, color: '#74acdf' },
    { id: 'algeria', name: 'Algeria', code: 'ALG', group: 'J', seed: 2, color: '#006233' },
    { id: 'austria', name: 'Austria', code: 'AUT', group: 'J', seed: 3, color: '#ed2939' },
    { id: 'jordan', name: 'Jordan', code: 'JOR', group: 'J', seed: 4, color: '#007a3d' },
  ],
  K: [
    { id: 'portugal', name: 'Portugal', code: 'POR', group: 'K', seed: 1, color: '#006600' },
    { id: 'congo-dr', name: 'Congo DR', code: 'COD', group: 'K', seed: 2, color: '#007fff' },
    { id: 'uzbekistan', name: 'Uzbekistan', code: 'UZB', group: 'K', seed: 3, color: '#0099b5' },
    { id: 'colombia', name: 'Colombia', code: 'COL', group: 'K', seed: 4, color: '#fcd116' },
  ],
  L: [
    { id: 'england', name: 'England', code: 'ENG', group: 'L', seed: 1, color: '#cf142b' },
    { id: 'croatia', name: 'Croatia', code: 'CRO', group: 'L', seed: 2, color: '#171796' },
    { id: 'ghana', name: 'Ghana', code: 'GHA', group: 'L', seed: 3, color: '#fcd116' },
    { id: 'panama', name: 'Panama', code: 'PAN', group: 'L', seed: 4, color: '#005293' },
  ],
};

const teams: Team[] = Object.values(groups).flatMap((list) =>
  list.map((team) => {
    const actualRoster = actualRosters[team.id];
    if (!actualRoster) {
      throw new Error(`Missing roster data for ${team.id}`);
    }

    return {
      ...team,
      roster: actualRoster.roster,
      xi: actualRoster.xi,
      rosterSource: actualRoster.source,
      rosterFetchedAt: actualRoster.fetchedAt,
    };
  }),
);

const teamMap = Object.fromEntries(teams.map((team) => [team.id, team]));
const groupKeys = Object.keys(groups);
const teamStrengths: Record<string, number> = {
  spain: 99,
  france: 99,
  argentina: 98,
  england: 96,
  portugal: 95,
  brazil: 95,
  netherlands: 94,
  morocco: 93,
  germany: 92,
  belgium: 89,
  uruguay: 88,
  croatia: 87,
  japan: 86,
  colombia: 85,
  switzerland: 84,
  usa: 84,
  senegal: 83,
  austria: 82,
  norway: 82,
  turkiye: 82,
  ecuador: 81,
  algeria: 81,
  paraguay: 80,
  canada: 79,
  czechia: 79,
  scotland: 79,
  sweden: 79,
  australia: 78,
  'cote-divoire': 78,
  ghana: 78,
  'korea-republic': 78,
  egypt: 77,
  tunisia: 76,
  'saudi-arabia': 75,
  qatar: 74,
  iran: 73,
  panama: 73,
  'south-africa': 73,
  uzbekistan: 73,
  'cabo-verde': 72,
  'congo-dr': 72,
  iraq: 72,
  jordan: 71,
  bosnia: 70,
  curacao: 69,
  haiti: 69,
  'new-zealand': 68,
};

const hostBonus: Record<string, number> = {
  canada: 3,
  mexico: 3,
  usa: 3,
};

function scoreOf(prediction?: { home: number | null; away: number | null }): { home: number; away: number } | null {
  if (prediction?.home === null || prediction?.away === null || prediction?.home === undefined || prediction?.away === undefined) return null;
  return { home: prediction.home, away: prediction.away };
}

function winnerFromScore(match: Match, predictions: Prediction, resolver: (ref: string) => Team | string) {
  const score = scoreOf(predictions[match.id]);
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  if (!score || typeof home === 'string' || typeof away === 'string') return null;
  if (score.home === score.away) return score.home >= 0 ? home : null;
  return score.home > score.away ? home : away;
}

function loserFromScore(match: Match, predictions: Prediction, resolver: (ref: string) => Team | string) {
  const score = scoreOf(predictions[match.id]);
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  if (!score || typeof home === 'string' || typeof away === 'string') return null;
  if (score.home === score.away) return score.home >= 0 ? away : null;
  return score.home > score.away ? away : home;
}

function computeStandings(predictions: Prediction) {
  const standings: Record<string, Standing[]> = {};
  for (const group of groupKeys) {
    const rows = groups[group].map((rawTeam) => ({
      team: teamMap[rawTeam.id],
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
    }));
    const byTeam = Object.fromEntries(rows.map((row) => [row.team.id, row]));
    groupMatches.filter((match) => match.group === group).forEach((match) => {
      const score = scoreOf(predictions[match.id]);
      if (!score) return;
      const home = byTeam[match.homeRef];
      const away = byTeam[match.awayRef];
      home.played += 1;
      away.played += 1;
      home.gf += score.home;
      home.ga += score.away;
      away.gf += score.away;
      away.ga += score.home;
      if (score.home > score.away) {
        home.won += 1;
        away.lost += 1;
        home.points += 3;
      } else if (score.home < score.away) {
        away.won += 1;
        home.lost += 1;
        away.points += 3;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }
    });
    rows.forEach((row) => {
      row.gd = row.gf - row.ga;
    });
    standings[group] = rows.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.team.seed - b.team.seed);
  }
  return standings;
}

function groupComplete(group: string, predictions: Prediction) {
  return groupMatches.filter((match) => match.group === group).every((match) => scoreOf(predictions[match.id]));
}

function thirdPlaceRows(standings: Record<string, Standing[]>, candidateGroups: string[], usedTeamIds: Set<string>) {
  return candidateGroups
    .map((group) => standings[group]?.[2])
    .filter((row): row is Standing => Boolean(row) && !usedTeamIds.has(row.team.id))
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.team.seed - b.team.seed);
}

function buildResolver(predictions: Prediction, standings: Record<string, Standing[]>) {
  const winners: Record<string, Team> = {};
  const losers: Record<string, Team> = {};
  const thirdSlots: Record<string, Team> = {};
  const usedThirdPlaceTeamIds = new Set<string>();
  const resolver = (ref: string): Team | string => {
    if (teamMap[ref]) return teamMap[ref];
    if (ref.startsWith('W:')) return winners[ref.slice(2)] ?? `Thắng ${knockoutMatches.find((match) => match.id === ref.slice(2))?.label ?? ref.slice(2)}`;
    if (ref.startsWith('L:')) return losers[ref.slice(2)] ?? `Thua ${knockoutMatches.find((match) => match.id === ref.slice(2))?.label ?? ref.slice(2)}`;
    if (/^3[A-L]+$/.test(ref)) {
      if (thirdSlots[ref]) return thirdSlots[ref];
      const candidateGroups = ref.slice(1).split('');
      if (!candidateGroups.every((group) => groupComplete(group, predictions))) return `Đội hạng ba (${ref.slice(1)})`;
      const [bestThird] = thirdPlaceRows(standings, candidateGroups, usedThirdPlaceTeamIds);
      if (!bestThird) return `Đội hạng ba (${ref.slice(1)})`;
      thirdSlots[ref] = bestThird.team;
      usedThirdPlaceTeamIds.add(bestThird.team.id);
      return bestThird.team;
    }
    if (/^[12][A-L]$/.test(ref)) {
      const rank = Number(ref[0]) - 1;
      const group = ref[1];
      if (groupComplete(group, predictions)) return standings[group][rank].team;
      return rank === 0 ? `Nhất bảng ${group}` : `Nhì bảng ${group}`;
    }
    return ref;
  };
  knockoutMatches.forEach((match) => {
    const winner = winnerFromScore(match, predictions, resolver);
    const loser = loserFromScore(match, predictions, resolver);
    if (winner) winners[match.id] = winner;
    if (loser) losers[match.id] = loser;
  });
  return resolver;
}

function encodePrediction(predictions: Prediction) {
  const compact = Object.fromEntries(Object.entries(predictions).filter(([, score]) => score.home !== null && score.away !== null));
  return btoa(encodeURIComponent(JSON.stringify(compact))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodePrediction(hash: string): Prediction {
  try {
    const raw = hash.replace(/^#p=/, '').replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(raw)));
  } catch {
    return {};
  }
}

const kickoffFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
});

function formatKickoff(kickoff: string) {
  return kickoffFormatter.format(new Date(kickoff));
}

function adjustedStrength(team: Team) {
  return (teamStrengths[team.id] ?? 70) + (hostBonus[team.id] ?? 0);
}

function predictedScore(home: Team, away: Team, knockout = false) {
  const diff = adjustedStrength(home) - adjustedStrength(away);
  if (!knockout && Math.abs(diff) <= 2) return { home: 1, away: 1 };
  if (diff >= 16) return { home: 3, away: 0 };
  if (diff >= 9) return { home: 2, away: 0 };
  if (diff >= 3) return { home: 2, away: 1 };
  if (diff <= -16) return { home: 0, away: 3 };
  if (diff <= -9) return { home: 0, away: 2 };
  if (diff <= -3) return { home: 1, away: 2 };
  return knockout ? { home: 2, away: 1 } : { home: 1, away: 1 };
}

function buildDefaultPredictions(): Prediction {
  const predictions: Prediction = {};
  groupMatches.forEach((match) => {
    const home = teamMap[match.homeRef];
    const away = teamMap[match.awayRef];
    predictions[match.id] = predictedScore(home, away);
  });

  knockoutMatches.forEach((match) => {
    const standings = computeStandings(predictions);
    const resolver = buildResolver(predictions, standings);
    const home = resolver(match.homeRef);
    const away = resolver(match.awayRef);
    if (typeof home !== 'string' && typeof away !== 'string') {
      predictions[match.id] = predictedScore(home, away, true);
    }
  });

  return predictions;
}

const theme = createTheme({
  primaryColor: 'teal',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  defaultRadius: 8,
});

function TeamBadge({ value, onOpen }: { value: Team | string; onOpen?: (team: Team) => void }) {
  if (typeof value === 'string') {
    return <Badge color="gray" variant="outline">{value}</Badge>;
  }
  return (
    <Button className="team-button" variant="subtle" size="compact-sm" onClick={() => onOpen?.(value)} leftSection={<span className="team-dot" style={{ background: value.color }} />}>
      {value.code}
    </Button>
  );
}

function MatchCard({ match, prediction, resolver, onScore, onRoster }: {
  match: Match;
  prediction?: { home: number | null; away: number | null };
  resolver: (ref: string) => Team | string;
  onScore: (id: string, side: 'home' | 'away', value: number | string | null) => void;
  onRoster: (team: Team) => void;
}) {
  const home = resolver(match.homeRef);
  const away = resolver(match.awayRef);
  const score = scoreOf(prediction);
  const hasTeams = typeof home !== 'string' && typeof away !== 'string';
  return (
    <Card className="match-card" withBorder>
      <Group justify="space-between" align="start">
        <Stack gap={2}>
          <Text size="xs" c="dimmed">{match.label} · {formatKickoff(match.kickoff)}</Text>
          <Text size="xs" c="dimmed">{match.venue}</Text>
        </Stack>
        {score && <Badge color={score.home === score.away ? 'yellow' : 'green'}>{score.home}:{score.away}</Badge>}
      </Group>
      <div className="match-row">
        <div><TeamBadge value={home} onOpen={onRoster} /></div>
        <div>
          <NumberInput className="score-input" min={0} max={20} value={prediction?.home ?? ''} onChange={(value) => onScore(match.id, 'home', value)} disabled={!hasTeams} />
        </div>
        <div>
          <NumberInput className="score-input" min={0} max={20} value={prediction?.away ?? ''} onChange={(value) => onScore(match.id, 'away', value)} disabled={!hasTeams} />
        </div>
        <div><TeamBadge value={away} onOpen={onRoster} /></div>
      </div>
    </Card>
  );
}

function App() {
  const [predictions, setPredictions] = useState<Prediction>(() => (window.location.hash.startsWith('#p=') ? decodePrediction(window.location.hash) : buildDefaultPredictions()));
  const [activeGroup, setActiveGroup] = useState('A');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [musicReady, setMusicReady] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const standings = useMemo(() => computeStandings(predictions), [predictions]);
  const resolver = useMemo(() => buildResolver(predictions, standings), [predictions, standings]);
  const completed = allMatches.filter((match) => scoreOf(predictions[match.id])).length;
  const total = allMatches.length;
  const champion = resolver('W:final-1');

  useEffect(() => {
    audioRef.current = new Audio('/media/three-nations.mp3');
    audioRef.current.loop = true;
  }, []);

  const onStart = async () => {
    setMusicReady(true);
    try {
      await audioRef.current?.play();
      notifications.show({ color: 'green', title: 'Prediction mode on', message: 'Nhạc World Cup đã bật nếu file audio có sẵn.' });
    } catch {
      notifications.show({ color: 'yellow', title: 'Prediction mode on', message: 'Chưa có file /media/three-nations.mp3 nên app chạy không nhạc.' });
    }
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
    notifications.show({ color: 'green', title: 'Đã copy link share', message: 'Người khác mở link sẽ thấy prediction hiện tại.' });
  };

  const clearAll = () => {
    setPredictions({});
    setClearConfirmOpen(false);
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
    notifications.show({ color: 'yellow', title: 'Đã xóa prediction', message: 'Tất cả tỉ số đã được đưa về trống.' });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <AppShell className="app-shell" header={{ height: 74 }} padding="md">
        <AppShell.Header className="topbar">
          <Group h="100%" px="md" justify="space-between">
            <Group gap="sm">
              <ThemeIcon size={42} radius={8} color="green"><IconTrophy size={24} /></ThemeIcon>
              <Box>
                <Title order={2}>WC 2026 Predictor</Title>
                <Text size="sm" c="dimmed">Group table · knockout bracket · roster board</Text>
              </Box>
            </Group>
            <Group gap="xs">
              <Tooltip label="Share prediction">
                <ActionIcon variant="light" size="lg" onClick={share}><IconShare3 size={18} /></ActionIcon>
              </Tooltip>
              <Tooltip label="Clear all predictions">
                <ActionIcon variant="light" color="red" size="lg" onClick={() => setClearConfirmOpen(true)}><IconTrash size={18} /></ActionIcon>
              </Tooltip>
              <Button leftSection={<IconMusic size={18} />} onClick={onStart}>{musicReady ? 'Đang dự đoán' : 'Bắt đầu dự đoán'}</Button>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <section className="hero">
            <div>
              <Badge color="green" leftSection={<IconSparkles size={12} />}>World Cup 2026 · three-host edition</Badge>
              <Title className="hero-title">Dự đoán tỉ số, xem bảng điểm và tự dựng nhánh vô địch.</Title>
              <Text c="dimmed" maw={760}>Điền dần từng trận, chỉnh lại bất cứ lúc nào, xem kết quả group stage hoặc playoff ngay cả khi prediction còn dang dở.</Text>
            </div>
            <Card className="progress-card" withBorder>
              <Group justify="space-between">
                <Text fw={700}>Prediction progress</Text>
                <Badge color="green">{completed}/{total}</Badge>
              </Group>
              <Progress value={(completed / total) * 100} color="green" mt="md" />
              <Group mt="md" gap="xs">
                <ThemeIcon color="yellow" variant="light"><IconCrown size={18} /></ThemeIcon>
                <Text size="sm">Champion: {typeof champion === 'string' ? champion : champion.name}</Text>
              </Group>
            </Card>
          </section>

          <Tabs defaultValue="predict" className="main-tabs">
            <Tabs.List>
              <Tabs.Tab value="predict" leftSection={<IconPencil size={16} />}>Điền tỉ số</Tabs.Tab>
              <Tabs.Tab value="results" leftSection={<IconChartBar size={16} />}>Kết quả prediction</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="predict" pt="md">
              <SegmentedControl value={activeGroup} onChange={setActiveGroup} data={groupKeys.map((group) => ({ label: `Bảng ${group}`, value: group }))} className="group-switch" />
              <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="md">
                {groupMatches.filter((match) => match.group === activeGroup).map((match) => (
                  <MatchCard key={match.id} match={match} prediction={predictions[match.id]} resolver={resolver} onScore={onScore} onRoster={setSelectedTeam} />
                ))}
              </SimpleGrid>
              <Title order={3} mt="xl" mb="md">Playoff / Knockout</Title>
              <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
                {knockoutMatches.map((match) => (
                  <MatchCard key={match.id} match={match} prediction={predictions[match.id]} resolver={resolver} onScore={onScore} onRoster={setSelectedTeam} />
                ))}
              </SimpleGrid>
            </Tabs.Panel>

            <Tabs.Panel value="results" pt="md">
              <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
                {groupKeys.map((group) => (
                  <Card key={group} withBorder className="standings-card">
                    <Group justify="space-between" mb="sm">
                      <Title order={4}>Bảng {group}</Title>
                      <Badge color={groupComplete(group, predictions) ? 'green' : 'gray'}>{groupComplete(group, predictions) ? 'Đủ trận' : 'Đang dự đoán'}</Badge>
                    </Group>
                    <Table.ScrollContainer minWidth={520}>
                      <Table verticalSpacing="xs">
                        <Table.Thead>
                          <Table.Tr><Table.Th>Team</Table.Th><Table.Th>Pts</Table.Th><Table.Th>P</Table.Th><Table.Th>GD</Table.Th><Table.Th>GF</Table.Th></Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {standings[group].map((row, index) => (
                            <Table.Tr key={row.team.id} className={index < 2 ? 'qualified-row' : ''}>
                              <Table.Td><TeamBadge value={row.team} onOpen={setSelectedTeam} /></Table.Td>
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
              <Title order={3} mt="xl" mb="md">Nhánh playoff</Title>
              <ScrollArea>
                <div className="bracket">
                  {(['r32', 'r16', 'qf', 'sf', 'bronze', 'final'] as Match['stage'][]).map((stage) => (
                    <Stack key={stage} className="bracket-round">
                      <Badge color="green" variant="filled">{stage.toUpperCase()}</Badge>
                      {knockoutMatches.filter((match) => match.stage === stage).map((match) => {
                        const home = resolver(match.homeRef);
                        const away = resolver(match.awayRef);
                        const winner = resolver(`W:${match.id}`);
                        return (
                          <Card key={match.id} withBorder className="bracket-card">
                            <Text size="xs" c="dimmed">{match.label}</Text>
                            <Group justify="space-between"><TeamBadge value={home} onOpen={setSelectedTeam} /><Text>{predictions[match.id]?.home ?? '-'}</Text></Group>
                            <Group justify="space-between"><TeamBadge value={away} onOpen={setSelectedTeam} /><Text>{predictions[match.id]?.away ?? '-'}</Text></Group>
                            <Divider my="xs" />
                            <Text size="xs" c="dimmed">Winner</Text>
                            <TeamBadge value={winner} onOpen={setSelectedTeam} />
                          </Card>
                        );
                      })}
                    </Stack>
                  ))}
                </div>
              </ScrollArea>
            </Tabs.Panel>
          </Tabs>
        </AppShell.Main>
      </AppShell>


      <Modal opened={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)} title="Xóa toàn bộ prediction?" centered>
        <Stack>
          <Text size="sm">Tất cả tỉ số đang điền sẽ bị xóa khỏi màn hình hiện tại.</Text>
          <Group justify="end">
            <Button variant="default" onClick={() => setClearConfirmOpen(false)}>Hủy</Button>
            <Button color="red" leftSection={<IconTrash size={16} />} onClick={clearAll}>Clear all</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal opened={!!selectedTeam} onClose={() => setSelectedTeam(null)} title={selectedTeam ? `${selectedTeam.name} roster` : ''} size="lg">
        {selectedTeam && (
          <Stack>
            <Group>
              <ThemeIcon color="green"><IconFlag size={18} /></ThemeIcon>
              <Stack gap={0}>
                <Text fw={700}>Bảng {selectedTeam.group} · {selectedTeam.code}</Text>
                <Text size="xs" c="dimmed">Current squad · fetched {selectedTeam.rosterFetchedAt}</Text>
              </Stack>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              {Object.entries(selectedTeam.roster).map(([role, players]) => (
                <Card withBorder key={role} className="roster-card">
                  <Group mb="xs"><IconUsersGroup size={16} /><Text fw={700}>{role}</Text></Group>
                  <Stack gap={4}>{players.map((player) => <Text size="sm" key={player}>{player}</Text>)}</Stack>
                </Card>
              ))}
            </SimpleGrid>
            <Card withBorder className="xi-card">
              <Group mb="xs"><IconShield size={16} /><Text fw={700}>Đội hình mạnh nhất dự kiến</Text></Group>
              <Text size="sm">{selectedTeam.xi.join(' · ')}</Text>
              <Text component="a" href={selectedTeam.rosterSource} target="_blank" rel="noreferrer" size="xs" c="dimmed" mt="xs">
                Source: Wikipedia current squad
              </Text>
            </Card>
          </Stack>
        )}
      </Modal>
    </MantineProvider>
  );
}

export default App;
