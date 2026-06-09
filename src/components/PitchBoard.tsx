import { Text } from "@mantine/core";
import type { Team } from "../types";

type PlayerLine = "gk" | "df" | "mf" | "fw";

type PitchPlayer = {
  name: string;
  number: number;
  line: PlayerLine;
  x: number;
  y: number;
};

const roleToLine: Record<keyof Team["roster"], PlayerLine> = {
  "Thủ môn": "gk",
  "Hậu vệ": "df",
  "Tiền vệ": "mf",
  "Tiền đạo": "fw",
};

const lineY: Record<PlayerLine, number> = {
  fw: 18,
  mf: 43,
  df: 68,
  gk: 88,
};

function playerLine(team: Team, player: string): PlayerLine {
  for (const [role, players] of Object.entries(team.roster) as [
    keyof Team["roster"],
    string[],
  ][]) {
    if (players.includes(player)) return roleToLine[role];
  }
  return "mf";
}

function layoutPitchPlayers(team: Team): PitchPlayer[] {
  const byLine: Record<PlayerLine, string[]> = {
    gk: [],
    df: [],
    mf: [],
    fw: [],
  };
  team.xi.forEach((player) => {
    byLine[playerLine(team, player)].push(player);
  });

  return (Object.keys(byLine) as PlayerLine[]).flatMap((line) => {
    const players = byLine[line];
    return players.map((name, index) => ({
      name,
      number: team.xi.indexOf(name) + 1,
      line,
      x: ((index + 1) / (players.length + 1)) * 100,
      y: lineY[line],
    }));
  });
}

function jerseyTextColor(color: string) {
  const hex = color.replace("#", "");
  const value =
    hex.length === 3
      ? hex
          .split("")
          .map((part) => part + part)
          .join("")
      : hex;
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 150
    ? "#07120c"
    : "#ffffff";
}

function lastName(name: string) {
  const parts = name.split(" ");
  return parts.length > 1 ? parts.slice(-2).join(" ") : name;
}

export function PitchBoard({ team }: { team: Team }) {
  const players = layoutPitchPlayers(team);
  const shirtTextColor = jerseyTextColor(team.color);

  return (
    <div className="pitch-board" aria-label={`${team.name} expected lineup`}>
      <div className="pitch-line center-line" />
      <div className="pitch-circle" />
      <div className="pitch-box top-box" />
      <div className="pitch-box bottom-box" />
      {players.map((player) => (
        <div
          className="pitch-player"
          style={{ left: `${player.x}%`, top: `${player.y}%` }}
          key={`${player.name}-${player.number}`}
        >
          <div
            className="shirt"
            style={{ background: team.color, color: shirtTextColor }}
          >
            <span>{player.number}</span>
          </div>
          <Text className="pitch-player-name" size="xs" fw={700}>
            {lastName(player.name)}
          </Text>
        </div>
      ))}
    </div>
  );
}
