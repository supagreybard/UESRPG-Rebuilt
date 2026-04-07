/* global console, process */

import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compilePack, extractPack } from '@foundryvtt/foundryvtt-cli';
import YAML from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const SOURCE_ROOT = join(ROOT_DIR, 'packs-src');
const OUTPUT_ROOT = join(ROOT_DIR, 'dist', 'packs');
const PACK_NAMES = ['traits', 'powers', 'races'];
const ITEM_PACK_TYPES = new Set(['trait', 'power', 'race']);

const command = process.argv[2] ?? 'compile';

function ensureOutputRoot() {
  mkdirSync(OUTPUT_ROOT, { recursive: true });
}

function cleanOutputRoot() {
  rmSync(OUTPUT_ROOT, { recursive: true, force: true });
}

async function compilePacks() {
  cleanOutputRoot();
  ensureOutputRoot();
  const stagingRoot = mkdtempSync(join(tmpdir(), 'uesrpg-packs-'));

  try {
    for (const packName of PACK_NAMES) {
      const sourceDirectory = join(SOURCE_ROOT, packName);
      const stagingDirectory = join(stagingRoot, packName);
      const outputDirectory = join(OUTPUT_ROOT, packName);

      stagePackSource(sourceDirectory, stagingDirectory);
      compileLog('Packing', sourceDirectory, outputDirectory);
      await compilePack(stagingDirectory, outputDirectory, {
        log: true,
        yaml: true,
      });
    }
  } finally {
    rmSync(stagingRoot, { recursive: true, force: true });
  }
}

async function extractPacks() {
  for (const packName of PACK_NAMES) {
    const sourceDirectory = join(OUTPUT_ROOT, packName);
    const outputDirectory = join(SOURCE_ROOT, packName);

    compileLog('Unpacking', sourceDirectory, outputDirectory);
    await extractPack(sourceDirectory, outputDirectory, {
      log: true,
      yaml: true,
    });
  }
}

function compileLog(action, sourceDirectory, outputDirectory) {
  console.log(
    `${action} ${relativeToRoot(sourceDirectory)} -> ${relativeToRoot(outputDirectory)}`,
  );
}

function relativeToRoot(path) {
  return path.replace(`${ROOT_DIR}/`, '');
}

function validateSourceTree() {
  const entries = new Set(
    readdirSync(SOURCE_ROOT, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  );

  for (const packName of PACK_NAMES) {
    if (!entries.has(packName)) {
      throw new Error(`Missing pack source directory: packs-src/${packName}`);
    }
  }
}

function stagePackSource(sourceDirectory, stagingDirectory) {
  mkdirSync(stagingDirectory, { recursive: true });

  for (const entry of readdirSync(sourceDirectory, { withFileTypes: true })) {
    if (!entry.isFile()) {
      continue;
    }

    const sourceFile = join(sourceDirectory, entry.name);
    const stagedFile = join(stagingDirectory, entry.name);
    const content = readFileSync(sourceFile, 'utf8');
    const document = YAML.load(content);

    preparePackEntry(document);
    writeFileSync(stagedFile, YAML.dump(document));
  }
}

function preparePackEntry(entry) {
  if (entry?._key || !ITEM_PACK_TYPES.has(entry?.type)) {
    return;
  }

  if (!entry._id) {
    throw new Error(
      `Unable to derive _key for ${entry.name ?? 'unnamed entry'} without an _id.`,
    );
  }

  entry._key = `!items!${entry._id}`;
}

async function main() {
  validateSourceTree();

  switch (command) {
    case 'clean': {
      cleanOutputRoot();
      break;
    }
    case 'compile': {
      await compilePacks();
      break;
    }
    case 'extract': {
      ensureOutputRoot();
      await extractPacks();
      break;
    }
    default: {
      throw new Error(`Unknown command: ${command}`);
    }
  }
}

await main();
