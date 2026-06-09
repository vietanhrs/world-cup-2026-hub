import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell, MantineProvider, Tabs } from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";
import { IconChartBar, IconPencil } from "@tabler/icons-react";
import { allMatches } from "./data/schedule";
import { AppHeader } from "./components/AppHeader";
import { ClearPredictionsModal } from "./components/ClearPredictionsModal";
import { HeroSection } from "./components/HeroSection";
import { PredictPanel } from "./components/PredictPanel";
import { ResultsPanel } from "./components/ResultsPanel";
import { RosterModal } from "./components/RosterModal";
import { theme } from "./theme";
import {
  buildDefaultPredictions,
  buildResolver,
  computeStandings,
  decodePrediction,
  encodePrediction,
  predictionProgress,
} from "./utils/predictions";
import type { Prediction, Team } from "./types";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";

function App() {
  const [predictions, setPredictions] = useState<Prediction>(() =>
    window.location.hash.startsWith("#p=")
      ? decodePrediction(window.location.hash)
      : buildDefaultPredictions(),
  );
  const [activeGroup, setActiveGroup] = useState("A");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [musicReady, setMusicReady] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const standings = useMemo(() => computeStandings(predictions), [predictions]);
  const resolver = useMemo(
    () => buildResolver(predictions, standings),
    [predictions, standings],
  );
  const completed = predictionProgress(predictions);
  const total = allMatches.length;
  const champion = resolver("W:final-1");

  useEffect(() => {
    audioRef.current = new Audio("/media/three-nations.mp3");
    audioRef.current.loop = true;
  }, []);

  const onStart = async () => {
    setMusicReady(true);
    try {
      await audioRef.current?.play();
      notifications.show({
        color: "green",
        title: "Prediction mode on",
        message: "Nhạc World Cup đã bật nếu file audio có sẵn.",
      });
    } catch {
      notifications.show({
        color: "yellow",
        title: "Prediction mode on",
        message:
          "Chưa có file /media/three-nations.mp3 nên app chạy không nhạc.",
      });
    }
  };

  const onScore = (
    id: string,
    side: "home" | "away",
    value: number | string | null,
  ) => {
    const numberValue = typeof value === "number" ? value : null;
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
      color: "green",
      title: "Đã copy link share",
      message: "Người khác mở link sẽ thấy prediction hiện tại.",
    });
  };

  const clearAll = () => {
    setPredictions({});
    setClearConfirmOpen(false);
    window.history.replaceState(
      null,
      "",
      `${window.location.origin}${window.location.pathname}`,
    );
    notifications.show({
      color: "yellow",
      title: "Đã xóa prediction",
      message: "Tất cả tỉ số đã được đưa về trống.",
    });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <AppShell className="app-shell" header={{ height: 74 }} padding="md">
        <AppHeader
          musicReady={musicReady}
          onStart={onStart}
          onShare={share}
          onClear={() => setClearConfirmOpen(true)}
        />
        <AppShell.Main>
          <HeroSection
            completed={completed}
            total={total}
            champion={champion}
          />

          <Tabs defaultValue="predict" className="main-tabs">
            <Tabs.List>
              <Tabs.Tab value="predict" leftSection={<IconPencil size={16} />}>
                Điền tỉ số
              </Tabs.Tab>
              <Tabs.Tab
                value="results"
                leftSection={<IconChartBar size={16} />}
              >
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
              <ResultsPanel
                predictions={predictions}
                standings={standings}
                resolver={resolver}
                onRoster={setSelectedTeam}
              />
            </Tabs.Panel>
          </Tabs>
        </AppShell.Main>
      </AppShell>

      <ClearPredictionsModal
        opened={clearConfirmOpen}
        onClose={() => setClearConfirmOpen(false)}
        onConfirm={clearAll}
      />
      <RosterModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </MantineProvider>
  );
}

export default App;
