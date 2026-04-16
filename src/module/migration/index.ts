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
  await migrateItemParameterIds();
  await migrateRaceGrants();

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

async function migrateItemParameterIds(): Promise<void> {
  const worldItems = game.items?.contents ?? [];

  for (const item of worldItems) {
    const update = buildItemParameterIdUpdate(item as DocumentWithSystem);

    if (update) {
      await item.update(update);
    }
  }

  for (const actor of game.actors?.contents ?? []) {
    for (const item of actor.items.contents) {
      const update = buildItemParameterIdUpdate(item as DocumentWithSystem);

      if (update) {
        await item.update(update);
      }
    }
  }
}

async function migrateRaceGrants(): Promise<void> {
  const worldItems = game.items?.contents ?? [];

  for (const item of worldItems) {
    const update = buildRaceGrantUpdate(item as DocumentWithSystem);

    if (update) {
      await item.update(update);
    }
  }

  for (const actor of game.actors?.contents ?? []) {
    for (const item of actor.items.contents) {
      const update = buildRaceGrantUpdate(item as DocumentWithSystem);

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

function buildItemParameterIdUpdate(
  item: DocumentWithSystem,
): Record<string, unknown> | null {
  const update: Record<string, unknown> = {};
  const parameters = normalizeParameterEntries(item.system.parameters);
  const grants = normalizeGrantEntries(item.system.grants);

  if (parameters !== null) {
    update['system.parameters'] = parameters;
  }

  if (grants !== null) {
    update['system.grants'] = grants;
  }

  return hasUpdate(update) ? update : null;
}

function buildRaceGrantUpdate(
  item: DocumentWithSystem,
): Record<string, unknown> | null {
  const grants = normalizeRaceGrantEntries(item.system.grants);

  if (grants === null) {
    return null;
  }

  return {
    'system.grants': grants,
  };
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

function normalizeGrantEntries(
  value: unknown,
): Record<string, unknown>[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  let changed = false;
  const grants = value.map((entry) => {
    const grant = readRecord(entry);
    const parameters = normalizeParameterEntries(grant.parameters);

    if (parameters === null) {
      return grant;
    }

    changed = true;
    return {
      ...grant,
      parameters,
    };
  });

  return changed ? grants : null;
}

function normalizeRaceGrantEntries(
  value: unknown,
): Record<string, unknown>[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  let changed = false;
  const grants = value.map((entry) => {
    const grant = readRecord(entry);
    const normalizedGrant = normalizeRaceGrantEntry(grant);

    if (!areRecordsEqual(grant, normalizedGrant)) {
      changed = true;
    }

    return normalizedGrant;
  });

  return changed ? grants : null;
}

function normalizeRaceGrantEntry(
  grant: Record<string, unknown>,
): Record<string, unknown> {
  const slug = normalizeOptionalString(grant.slug);

  return {
    type: readString(grant.type) ?? 'trait',
    slug,
    sourceUuid: normalizeOptionalString(grant.sourceUuid),
    sourceName:
      normalizeOptionalString(grant.sourceName) ??
      normalizeOptionalString(grant.name) ??
      slug,
    optionGroup: normalizeOptionalString(grant.optionGroup),
    parameters: normalizeGrantParameterOverrides(grant.parameters),
  };
}

function normalizeGrantParameterOverrides(
  value: unknown,
): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    const parameter = readRecord(entry);
    const id = normalizeOptionalString(parameter.id);

    if (id === null) {
      return [];
    }

    return [{ id, value: readString(parameter.value) ?? '' }];
  });
}

function normalizeParameterEntries(
  value: unknown,
): Record<string, unknown>[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  let changed = false;
  const parameters = value.map((entry) => {
    const parameter = readRecord(entry);
    const id = readString(parameter.id)?.trim();

    if (id) {
      return parameter;
    }

    changed = true;
    return {
      ...parameter,
      id: foundry.utils.randomID(),
    };
  });

  return changed ? parameters : null;
}

function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function areRecordsEqual(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}
