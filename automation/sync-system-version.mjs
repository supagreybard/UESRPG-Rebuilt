/* global console, process */

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const packageJsonPath = join(ROOT_DIR, 'package.json');
const systemJsonPath = join(ROOT_DIR, 'system.json');

const packageJsonText = await readFile(packageJsonPath, 'utf8');
const systemJsonText = await readFile(systemJsonPath, 'utf8');
const packageJson = JSON.parse(packageJsonText);
const systemJson = JSON.parse(systemJsonText);

const systemVersionPattern = /^(\s*"version"\s*:\s*)"[^"]*"/m;

if (typeof packageJson.version !== 'string' || packageJson.version.length === 0) {
  throw new Error('package.json version must be a non-empty string.');
}

if (typeof systemJson.version !== 'string' || systemJson.version.length === 0) {
  throw new Error('system.json version must be a non-empty string.');
}

if (!systemVersionPattern.test(systemJsonText)) {
  throw new Error('Unable to locate system.json version field.');
}

if (systemJson.version === packageJson.version) {
  console.log(`system.json version is already ${packageJson.version}.`);
  process.exit(0);
}

const updatedSystemJsonText = systemJsonText.replace(
  systemVersionPattern,
  `$1"${packageJson.version}"`,
);

await writeFile(systemJsonPath, updatedSystemJsonText);
console.log(`Synced system.json version to ${packageJson.version}.`);
