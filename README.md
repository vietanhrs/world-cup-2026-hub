# World Cup 2026 Hub

World Cup 2026 Hub is a static web app for exploring the tournament and building a full prediction board. It combines match score entry, live computed group tables, knockout bracket progression, team rosters, player lists, and tournament reference data in one interface.

## Features

- Enter and edit World Cup 2026 score predictions for group-stage and knockout matches.
- View group standings while predictions are still in progress.
- Build the playoff bracket from predicted qualifiers and match winners.
- Browse national team roster information, including players grouped by goalkeeper, defender, midfielder, and forward.
- Review tournament groups, match schedule, standings, and knockout paths in the same app.
- Keep unresolved slots as readable placeholders such as `Nhất bảng A`, `Nhì bảng B`, or `Thắng Tứ kết 1`.
- Share predictions through a URL hash.
- Start prediction mode and play `/media/three-nations.mp3` when the audio file is available.

## Stack

- Bun
- React
- Vite
- TypeScript
- Mantine
- Tailwind CSS

## Development

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

## Deployment

The app is built as static assets and served by nginx on port `3000`.

```sh
docker build -f docker/Dockerfile -t world-cup-2026-hub .
docker run --rm -p 3000:3000 world-cup-2026-hub
```

## Data Notes

The app keeps World Cup 2026 tournament data in source for a static demo deployment. FIFA schedule, groups, bracket mapping, and official final squads can be refreshed later without changing the prediction engine.
