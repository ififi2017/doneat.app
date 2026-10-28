// Package the Astro-generated domestic routes and shared assets. No second HTML renderer.
import { spawnSync } from 'node:child_process';
import { cp, rm, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const result = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', env: { ...process.env, SITE_REGION: 'cn', SITE_ORIGIN: 'https://doneat.com.cn' } });
if (result.status !== 0) process.exit(result.status || 1);
await rm(path.join(here, 'dist'), { recursive: true, force: true });
await mkdir(path.join(here, 'dist'), { recursive: true });
for (const name of ['android', '_astro', 'brand', 'icons', 'fonts', 'favicon.ico', 'favicon.svg']) {
  await cp(path.join(root, 'dist', name), path.join(here, 'dist', name), { recursive: true });
}
console.log('Packaged Astro Android routes and shared assets; no root HTML routes included.');
