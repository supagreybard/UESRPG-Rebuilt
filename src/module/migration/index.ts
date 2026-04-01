import { SYSTEM_ID, SYSTEM_TITLE } from '../config/constants';
import { logInfo } from '../utils/log';

const MIGRATION_VERSION_SETTING = 'migrationVersion';

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

  await settings?.set(SYSTEM_ID, MIGRATION_VERSION_SETTING, currentVersion);

  logInfo(`Migration scaffold complete at version ${currentVersion}.`);
}
