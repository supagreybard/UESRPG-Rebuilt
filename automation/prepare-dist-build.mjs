/* global console */

import { existsSync, mkdirSync, renameSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const DIST_PACKS_DIR = join(ROOT_DIR, 'dist', 'packs');
const BUILD_CACHE_ROOT = join(ROOT_DIR, '.build-cache');

if (existsSync(DIST_PACKS_DIR)) {
  mkdirSync(BUILD_CACHE_ROOT, { recursive: true });
  const archivedPath = join(BUILD_CACHE_ROOT, `dist-packs-${Date.now()}`);

  renameSync(DIST_PACKS_DIR, archivedPath);
  console.log(
    `Stashed dist/packs -> ${archivedPath.replace(`${ROOT_DIR}/`, '')}`,
  );
}
