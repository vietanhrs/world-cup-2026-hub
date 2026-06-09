import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const mediaDir = path.resolve('public/media');
const manifestPath = path.join(mediaDir, 'tracks.json');
const audioFilePattern = /\.(mp3|wav|ogg|m4a|aac|flac)$/i;

function titleFromFileName(fileName) {
  return fileName.replace(audioFilePattern, '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

await mkdir(mediaDir, { recursive: true });

const files = await readdir(mediaDir);
const tracks = files
  .filter((file) => audioFilePattern.test(file))
  .sort((a, b) => a.localeCompare(b))
  .map((file) => ({
    src: `/media/${file}`,
    title: titleFromFileName(file),
  }));

await writeFile(`${manifestPath}`, `${JSON.stringify(tracks, null, 2)}\n`);
