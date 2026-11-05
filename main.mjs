import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function inventory(manifest) {
  if (!Array.isArray(manifest.clips)) throw new Error('clips doit être une liste');
  const names = new Set();
  const clips = manifest.clips.map(clip => {
    if (typeof clip.name !== 'string' || !clip.name.trim() || /[/\\\r\n]/.test(clip.name)) throw new Error('nom de rush invalide');
    if (names.has(clip.name)) throw new Error(`doublon : ${clip.name}`);
    if (!Number.isFinite(clip.durationSeconds) || clip.durationSeconds <= 0) throw new Error(`durée invalide : ${clip.name}`);
    names.add(clip.name);
    return { name: clip.name, durationSeconds: clip.durationSeconds };
  }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  return { clips, count: clips.length, totalSeconds: clips.reduce((sum, clip) => sum + clip.durationSeconds, 0) };
}

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) throw new Error('Usage : node main.mjs entree.json sortie.json');
  const result = inventory(JSON.parse(await readFile(input, 'utf8')));
  await writeFile(output, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(`${result.count} rushes, ${result.totalSeconds} secondes inventoriées.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(`Erreur : ${error.message}`); process.exitCode = 1; });
}
