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

## Testing

```sh
bun run test
bun run test:e2e
bun run test:all
```

Playwright runs against a Vite web server and uses Chromium. If the browser binary is missing on a fresh machine, install it once:

```sh
bunx playwright install chromium
```

## Media Tracks

Put World Cup audio files in `public/media`. The app generates `public/media/tracks.json` before development and production builds, then uses that manifest for the music player playlist.

## Deployment

The app is built as static assets and served by nginx on port `3000`.

```sh
docker build -f docker/Dockerfile -t world-cup-2026-hub .
docker run --rm -p 3000:3000 world-cup-2026-hub
```

## Data Notes

The app keeps World Cup 2026 tournament data in source for a static demo deployment. FIFA schedule, groups, bracket mapping, and official final squads can be refreshed later without changing the prediction engine.

Completed match results are stored on each match in `src/data/schedule.ts`. The current scores were refreshed on 2026-06-16 from ESPN's free FIFA World Cup scoreboard JSON endpoint:

```txt
https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260616&limit=100
```

FIFA's official scores and fixtures page is used as the source-of-truth cross-check:

```txt
https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures
```

Player portrait cutouts for the projected XI board are stored as remote image references in `src/data/playerPortraits.ts`. The first pass uses transparent PNG cutouts from TheSportsDB where a clean match exists; players without a reliable cutout keep the generated shirt marker instead of showing an uncertain portrait.
