import { SYSTEM_ID, SYSTEM_TITLE } from '../config/constants';
import { logInfo } from '../utils/log';

const MIGRATION_VERSION_SETTING = 'migrationVersion';

type DocumentWithSystem = {
  name: string;
  system: Record<string, unknown>;
  update: (data: Record<string, unknown>) => Promise<unknown>;
};

type SystemSettings = {
  register: (namespace: string, key: string, data: object) => void;
  get: (namespace: string, key: string) => unknown;
  set: (namespace: string, key: string, value: string) => Promise<unknown>;
};

export function registerMigrationSettings(): void {
  const settings = game.settings as SystemSettings | undefined;

  settings?.register(SYSTEM_ID, MIGRATION_VERSION_SETTING, {
    name: `${SYSTEM_TITLE} Migration Version`,
    scope: 'world',
    config: false,
    type: String,
    default: '0.0.0',
  });
}

export async function runMigrations(): Promise<void> {
  const currentVersion = game.system?.version;
  const settings = game.settings as SystemSettings | undefined;
  const storedVersion = settings?.get(SYSTEM_ID, MIGRATION_VERSION_SETTING);

  if (typeof currentVersion !== 'string' || typeof storedVersion !== 'string') {
    logInfo('Skipping migration check because version data is unavailable.');
    return;
  }

  if (!foundry.utils.isNewerVersion(currentVersion, storedVersion)) {
    logInfo(`Migration check complete at version ${storedVersion}.`);
    return;
  }

  logInfo(
    `Running migration scaffold from ${storedVersion} to ${currentVersion}.`,
  );

  await migrateActorProse();
  await migrateItemProse();

  await settings?.set(SYSTEM_ID, MIGRATION_VERSION_SETTING, currentVersion);

  logInfo(`Migration scaffold complete at version ${currentVersion}.`);
}

async function migrateActorProse(): Promise<void> {
  const actors = game.actors?.contents ?? [];

  for (const actor of actors) {
    const update = buildActorProseUpdate(actor as DocumentWithSystem);

    if (update) {
      await actor.update(update);
    }
  }
}

async function migrateItemProse(): Promise<void> {
  const worldItems = game.items?.contents ?? [];

  for (const item of worldItems) {
    const update = buildItemProseUpdate(item as DocumentWithSystem);

    if (update) {
      await item.update(update);
    }
  }

  for (const actor of game.actors?.contents ?? []) {
    for (const item of actor.items.contents) {
      const update = buildItemProseUpdate(item as DocumentWithSystem);

      if (update) {
        await item.update(update);
      }
    }
  }
}

function buildActorProseUpdate(
  actor: DocumentWithSystem,
): Record<string, unknown> | null {
  const prose = readRecord(actor.system.prose);
  const details = readRecord(actor.system.details);
  const notes = readString(details.notes);
  const update: Record<string, unknown> = {};

  if (notes !== null && isEmptyString(prose.notes)) {
    update['system.prose.notes'] = notes;
  }

  if (actor.system.details !== undefined) {
    update['system.-=details'] = null;
  }

  return hasUpdate(update) ? update : null;
}

function buildItemProseUpdate(
  item: DocumentWithSystem,
): Record<string, unknown> | null {
  const prose = readRecord(item.system.prose);
  const description = readString(item.system.description);
  const flavorText = readString(item.system.flavortext);
  const update: Record<string, unknown> = {};

  if (description !== null && isEmptyString(prose.description)) {
    update['system.prose.description'] = description;
  }

  if (flavorText !== null && isEmptyString(prose.flavorText)) {
    update['system.prose.flavorText'] = flavorText;
  }

  if (item.system.description !== undefined) {
    update['system.-=description'] = null;
  }

  if (item.system.flavortext !== undefined) {
    update['system.-=flavortext'] = null;
  }

  return hasUpdate(update) ? update : null;
}

function hasUpdate(update: Record<string, unknown>): boolean {
  return Object.keys(update).length > 0;
}

function isEmptyString(value: unknown): boolean {
  return typeof value !== 'string' || value.length === 0;
}

function readRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function readString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}
