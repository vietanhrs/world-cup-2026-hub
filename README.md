# WC 2026 Prediction

World Cup 2026 prediction web app for demo deployment.

## Features

- Enter and edit score predictions for group-stage and knockout matches
- View computed group standings while predictions are still in progress
- Build the knockout bracket from predicted qualifiers and match winners
- Keep unresolved slots as readable placeholders such as `Nhất bảng A`, `Nhì bảng B`, or `Thắng Tứ kết 1`
- Share predictions through a URL hash
- Open each national team roster grouped by keeper, defender, midfielder, and forward
- Start prediction mode and play `/media/three-nations.mp3` when the audio file is available

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
docker build -f docker/Dockerfile -t wc2026-prediction .
docker run --rm -p 3000:3000 wc2026-prediction
```

## Data Notes

The app keeps tournament data in source for a static demo deployment. FIFA schedule, groups, bracket mapping, and official final squads can be refreshed later without changing the prediction engine.
