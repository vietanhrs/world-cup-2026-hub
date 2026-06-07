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
  IconTrophy,
  IconUsersGroup,
} from '@tabler/icons-react';
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
};

type Match = {
  id: string;
  stage: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'final';
  label: string;
  group?: string;
  date: string;
  venue: string;
  homeRef: string;
  awayRef: string;
};

type Prediction = Record<string, { home: number | null; away: number | null }>;
type Standing = { team: Team; played: number; won: number; drawn: number; lost: number; gf: number; ga: number; gd: number; points: number };

const groups: Record<string, Array<Omit<Team, 'roster' | 'xi'>>> = {
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

const rosterNames = {
  gk: ['No.1', 'No.2', 'No.3'],
  df: ['Right Back', 'Centre Back A', 'Centre Back B', 'Left Back', 'Defender Cover'],
  mf: ['Anchor Midfielder', 'Box Midfielder', 'Playmaker', 'Wide Midfielder', 'Pressing Midfielder'],
  fw: ['Right Winger', 'Centre Forward', 'Left Winger', 'Second Striker', 'Impact Forward'],
};

const starRoster: Record<string, Partial<Team['roster']> & { xi?: string[] }> = {
  brazil: {
    'Thủ môn': ['Alisson', 'Ederson', 'Bento'],
    'Hậu vệ': ['Marquinhos', 'Gabriel Magalhaes', 'Eder Militao', 'Guilherme Arana', 'Danilo'],
    'Tiền vệ': ['Bruno Guimaraes', 'Lucas Paqueta', 'Joao Gomes', 'Andreas Pereira', 'Douglas Luiz'],
    'Tiền đạo': ['Vinicius Junior', 'Rodrygo', 'Endrick', 'Raphinha', 'Richarlison'],
    xi: ['Alisson', 'Danilo', 'Marquinhos', 'Gabriel Magalhaes', 'Guilherme Arana', 'Bruno Guimaraes', 'Lucas Paqueta', 'Rodrygo', 'Raphinha', 'Vinicius Junior', 'Endrick'],
  },
  france: {
    'Thủ môn': ['Mike Maignan', 'Brice Samba', 'Alphonse Areola'],
    'Hậu vệ': ['William Saliba', 'Jules Kounde', 'Ibrahima Konate', 'Theo Hernandez', 'Dayot Upamecano'],
    'Tiền vệ': ['Aurelien Tchouameni', 'Eduardo Camavinga', 'Adrien Rabiot', 'Warren Zaire-Emery', 'N' + "'Golo Kante"],
    'Tiền đạo': ['Kylian Mbappe', 'Ousmane Dembele', 'Antoine Griezmann', 'Marcus Thuram', 'Randal Kolo Muani'],
    xi: ['Mike Maignan', 'Jules Kounde', 'William Saliba', 'Ibrahima Konate', 'Theo Hernandez', 'Aurelien Tchouameni', 'Eduardo Camavinga', 'Antoine Griezmann', 'Ousmane Dembele', 'Kylian Mbappe', 'Marcus Thuram'],
  },
  argentina: {
    'Thủ môn': ['Emiliano Martinez', 'Geronimo Rulli', 'Franco Armani'],
    'Hậu vệ': ['Cristian Romero', 'Lisandro Martinez', 'Nicolas Otamendi', 'Nahuel Molina', 'Nicolas Tagliafico'],
    'Tiền vệ': ['Rodrigo De Paul', 'Enzo Fernandez', 'Alexis Mac Allister', 'Leandro Paredes', 'Giovani Lo Celso'],
    'Tiền đạo': ['Lionel Messi', 'Julian Alvarez', 'Lautaro Martinez', 'Angel Di Maria', 'Nicolas Gonzalez'],
    xi: ['Emiliano Martinez', 'Nahuel Molina', 'Cristian Romero', 'Lisandro Martinez', 'Nicolas Tagliafico', 'Rodrigo De Paul', 'Enzo Fernandez', 'Alexis Mac Allister', 'Lionel Messi', 'Julian Alvarez', 'Lautaro Martinez'],
  },
  england: {
    'Thủ môn': ['Jordan Pickford', 'Aaron Ramsdale', 'Dean Henderson'],
    'Hậu vệ': ['John Stones', 'Marc Guehi', 'Kyle Walker', 'Luke Shaw', 'Trent Alexander-Arnold'],
    'Tiền vệ': ['Declan Rice', 'Jude Bellingham', 'Phil Foden', 'Kobbie Mainoo', 'Conor Gallagher'],
    'Tiền đạo': ['Harry Kane', 'Bukayo Saka', 'Cole Palmer', 'Anthony Gordon', 'Ollie Watkins'],
    xi: ['Jordan Pickford', 'Kyle Walker', 'John Stones', 'Marc Guehi', 'Luke Shaw', 'Declan Rice', 'Jude Bellingham', 'Phil Foden', 'Bukayo Saka', 'Harry Kane', 'Cole Palmer'],
  },
  portugal: {
    'Thủ môn': ['Diogo Costa', 'Rui Patricio', 'Jose Sa'],
    'Hậu vệ': ['Ruben Dias', 'Pepe', 'Joao Cancelo', 'Nuno Mendes', 'Diogo Dalot'],
    'Tiền vệ': ['Bruno Fernandes', 'Bernardo Silva', 'Vitinha', 'Joao Palhinha', 'Ruben Neves'],
    'Tiền đạo': ['Cristiano Ronaldo', 'Rafael Leao', 'Diogo Jota', 'Goncalo Ramos', 'Joao Felix'],
    xi: ['Diogo Costa', 'Joao Cancelo', 'Ruben Dias', 'Pepe', 'Nuno Mendes', 'Joao Palhinha', 'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leao', 'Cristiano Ronaldo'],
  },
  spain: {
    'Thủ môn': ['Unai Simon', 'David Raya', 'Alex Remiro'],
    'Hậu vệ': ['Dani Carvajal', 'Aymeric Laporte', 'Robin Le Normand', 'Alejandro Grimaldo', 'Marc Cucurella'],
    'Tiền vệ': ['Rodri', 'Pedri', 'Gavi', 'Fabian Ruiz', 'Mikel Merino'],
    'Tiền đạo': ['Lamine Yamal', 'Nico Williams', 'Alvaro Morata', 'Dani Olmo', 'Mikel Oyarzabal'],
    xi: ['Unai Simon', 'Dani Carvajal', 'Robin Le Normand', 'Aymeric Laporte', 'Alejandro Grimaldo', 'Rodri', 'Pedri', 'Fabian Ruiz', 'Lamine Yamal', 'Alvaro Morata', 'Nico Williams'],
  },
};

const teams: Team[] = Object.values(groups).flatMap((list) =>
  list.map((team) => {
    const roster = starRoster[team.id];
    const fallback = {
      'Thủ môn': rosterNames.gk.map((name) => `${team.name} ${name}`),
      'Hậu vệ': rosterNames.df.map((name) => `${team.name} ${name}`),
      'Tiền vệ': rosterNames.mf.map((name) => `${team.name} ${name}`),
      'Tiền đạo': rosterNames.fw.map((name) => `${team.name} ${name}`),
    };
    return {
      ...team,
      roster: { ...fallback, ...roster },
      xi: roster?.xi ?? [...fallback['Thủ môn'].slice(0, 1), ...fallback['Hậu vệ'].slice(0, 4), ...fallback['Tiền vệ'].slice(0, 3), ...fallback['Tiền đạo'].slice(0, 3)],
    };
  }),
);

const teamMap = Object.fromEntries(teams.map((team) => [team.id, team]));
const groupKeys = Object.keys(groups);
const pairings = [
  [0, 1],
  [2, 3],
  [0, 2],
  [1, 3],
  [0, 3],
  [1, 2],
];

const groupMatches: Match[] = groupKeys.flatMap((group, groupIndex) =>
  pairings.map(([home, away], index) => {
    const groupTeams = groups[group];
    const matchNumber = groupIndex * pairings.length + index + 1;
    return {
      id: `g-${group}-${index + 1}`,
      stage: 'group',
      label: `Trận ${matchNumber}`,
      group,
      date: `Jun ${11 + Math.floor(matchNumber / 4)}, 2026`,
      venue: ['Mexico City', 'Toronto', 'Los Angeles', 'Vancouver', 'Dallas', 'Miami'][index],
      homeRef: groupTeams[home].id,
      awayRef: groupTeams[away].id,
    };
  }),
);

const r32Slots = [
  ['1A', '3C/E/F'], ['2B', '2C'], ['1C', '3A/D/E'], ['1D', '2F'],
  ['1E', '3B/C/D'], ['1F', '2A'], ['1G', '3H/I/J'], ['1H', '2G'],
  ['1I', '3K/L/A'], ['1J', '2I'], ['1K', '3G/H/J'], ['1L', '2K'],
  ['2D', '2E'], ['2H', '2J'], ['2L', '3I/K/L'], ['2A', '3B/F/G'],
];

const knockoutMatches: Match[] = [
  ...r32Slots.map(([homeRef, awayRef], index) => ({
    id: `r32-${index + 1}`,
    stage: 'r32' as const,
    label: `Vòng 32 - ${index + 1}`,
    date: `Jun ${28 + Math.floor(index / 4)}, 2026`,
    venue: ['Miami', 'Dallas', 'Boston', 'New York/New Jersey'][index % 4],
    homeRef,
    awayRef,
  })),
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `r16-${index + 1}`,
    stage: 'r16' as const,
    label: `Vòng 16 - ${index + 1}`,
    date: `Jul ${5 + Math.floor(index / 2)}, 2026`,
    venue: ['Philadelphia', 'Houston', 'Seattle', 'Mexico City'][index % 4],
    homeRef: `W:r32-${index * 2 + 1}`,
    awayRef: `W:r32-${index * 2 + 2}`,
  })),
  ...Array.from({ length: 4 }, (_, index) => ({
    id: `qf-${index + 1}`,
    stage: 'qf' as const,
    label: `Tứ kết ${index + 1}`,
    date: `Jul ${10 + Math.floor(index / 2)}, 2026`,
    venue: ['Los Angeles', 'Kansas City', 'Miami', 'Boston'][index],
    homeRef: `W:r16-${index * 2 + 1}`,
    awayRef: `W:r16-${index * 2 + 2}`,
  })),
  ...Array.from({ length: 2 }, (_, index) => ({
    id: `sf-${index + 1}`,
    stage: 'sf' as const,
    label: `Bán kết ${index + 1}`,
    date: `Jul ${14 + index}, 2026`,
    venue: ['Dallas', 'Atlanta'][index],
    homeRef: `W:qf-${index * 2 + 1}`,
    awayRef: `W:qf-${index * 2 + 2}`,
  })),
  {
    id: 'final-1',
    stage: 'final',
    label: 'Chung kết',
    date: 'Jul 19, 2026',
    venue: 'New York/New Jersey',
    homeRef: 'W:sf-1',
    awayRef: 'W:sf-2',
  },
];

const allMatches = [...groupMatches, ...knockoutMatches];

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

function buildResolver(predictions: Prediction, standings: Record<string, Standing[]>) {
  const winners: Record<string, Team> = {};
  const resolver = (ref: string): Team | string => {
    if (teamMap[ref]) return teamMap[ref];
    if (ref.startsWith('W:')) return winners[ref.slice(2)] ?? `Thắng ${knockoutMatches.find((match) => match.id === ref.slice(2))?.label ?? ref.slice(2)}`;
    if (/^[123][A-L]/.test(ref)) {
      const rank = Number(ref[0]) - 1;
      const group = ref[1];
      if (rank < 2 && groupComplete(group, predictions)) return standings[group][rank].team;
      if (rank === 0) return `Nhất bảng ${group}`;
      if (rank === 1) return `Nhì bảng ${group}`;
      return `Đội hạng ba (${ref.slice(1)})`;
    }
    return ref;
  };
  knockoutMatches.forEach((match) => {
    const winner = winnerFromScore(match, predictions, resolver);
    if (winner) winners[match.id] = winner;
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
          <Text size="xs" c="dimmed">{match.label} · {match.date}</Text>
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
  const [predictions, setPredictions] = useState<Prediction>(() => (window.location.hash.startsWith('#p=') ? decodePrediction(window.location.hash) : {}));
  const [activeGroup, setActiveGroup] = useState('A');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [musicReady, setMusicReady] = useState(false);
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
                  {(['r32', 'r16', 'qf', 'sf', 'final'] as Match['stage'][]).map((stage) => (
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

      <Modal opened={!!selectedTeam} onClose={() => setSelectedTeam(null)} title={selectedTeam ? `${selectedTeam.name} roster` : ''} size="lg">
        {selectedTeam && (
          <Stack>
            <Group>
              <ThemeIcon color="green"><IconFlag size={18} /></ThemeIcon>
              <Text fw={700}>Bảng {selectedTeam.group} · {selectedTeam.code}</Text>
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
            </Card>
          </Stack>
        )}
      </Modal>
    </MantineProvider>
  );
}

export default App;
