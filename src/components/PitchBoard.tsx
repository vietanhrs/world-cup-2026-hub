import { useState } from 'react';
import { Text } from '@mantine/core';
import { playerPortraits, type PlayerPortrait } from '../data/playerPortraits';
import type { Team } from '../types';

type PlayerLine = 'gk' | 'df' | 'mf' | 'fw';

type PitchPlayer = {
  name: string;
  number: number;
  line: PlayerLine;
  x: number;
  y: number;
};

type PlayerMarkerProps = {
  player: PitchPlayer;
  portrait?: PlayerPortrait;
  shirtTextColor: string;
  teamColor: string;
};

const roleToLine: Record<keyof Team['roster'], PlayerLine> = {
  'Thủ môn': 'gk',
  'Hậu vệ': 'df',
  'Tiền vệ': 'mf',
  'Tiền đạo': 'fw',
};

const lineY: Record<PlayerLine, number> = {
  fw: 18,
  mf: 43,
  df: 68,
  gk: 88,
};

function playerLine(team: Team, player: string): PlayerLine {
  for (const [role, players] of Object.entries(team.roster) as [keyof Team['roster'], string[]][]) {
    if (players.includes(player)) return roleToLine[role];
  }
  return 'mf';
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
  const hex = color.replace('#', '');
  const value =
    hex.length === 3
      ? hex
          .split('')
          .map((part) => part + part)
          .join('')
      : hex;
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 150 ? '#07120c' : '#ffffff';
}

function lastName(name: string) {
  const parts = name.split(' ');
  return parts.length > 1 ? parts.slice(-2).join(' ') : name;
}

function PlayerMarker({ player, portrait, shirtTextColor, teamColor }: PlayerMarkerProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPortrait = Boolean(portrait && !imageFailed);

  return (
    <div
      className={`pitch-player ${showPortrait ? 'pitch-player-with-portrait' : ''}`}
      style={{ left: `${player.x}%`, top: `${player.y}%` }}
    >
      {showPortrait && portrait ? (
        <div className="player-portrait-frame">
          <img
            className="player-portrait"
            src={portrait.src}
            alt={`${player.name} portrait`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
          <span className="player-number-badge" style={{ background: teamColor, color: shirtTextColor }}>
            {player.number}
          </span>
        </div>
      ) : (
        <div className="shirt" style={{ background: teamColor, color: shirtTextColor }}>
          <span>{player.number}</span>
        </div>
      )}
      <Text className="pitch-player-name" size="xs" fw={700}>
        {lastName(player.name)}
      </Text>
    </div>
  );
}

export function PitchBoard({ team }: { team: Team }) {
  const players = layoutPitchPlayers(team);
  const shirtTextColor = jerseyTextColor(team.color);
  const portraits = playerPortraits[team.id] ?? {};

  return (
    <div className="pitch-board" aria-label={`${team.name} expected lineup`}>
      <div className="pitch-line center-line" />
      <div className="pitch-circle" />
      <div className="pitch-box top-box" />
      <div className="pitch-box bottom-box" />
      {players.map((player) => (
        <PlayerMarker
          key={`${player.name}-${player.number}`}
          player={player}
          portrait={portraits[player.name]}
          shirtTextColor={shirtTextColor}
          teamColor={team.color}
        />
      ))}
    </div>
  );
}
