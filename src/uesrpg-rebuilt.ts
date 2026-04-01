import {
  ACTOR_TYPES,
  ITEM_TYPES,
  SYSTEM_ID,
  SYSTEM_TITLE,
} from './module/config/constants';
import { registerDocumentClasses } from './module/documents';
import { UESRPGActor } from './module/documents/actor';
import { UESRPGItem } from './module/documents/item';
import { registerDataModels } from './module/data';
import { registerTrackableAttributes } from './module/config/trackable-attributes';
import { registerApplicationClasses } from './module/applications';
import { registerMigrationSettings, runMigrations } from './module/migration';
import { logInfo } from './module/utils/log';

Hooks.once('init', () => {
  (game as Game).uesrpg = {
    actorTypes: ACTOR_TYPES,
    itemTypes: ITEM_TYPES,
    systemId: SYSTEM_ID,
    documents: {
      Actor: UESRPGActor,
      Item: UESRPGItem,
    },
  };

  registerDocumentClasses();
  registerDataModels();
  registerApplicationClasses();
  registerMigrationSettings();

  logInfo(`${SYSTEM_TITLE} | Initialized system boilerplate.`);
});

Hooks.once('setup', () => {
  registerTrackableAttributes();
});

Hooks.once('ready', () => {
  void runMigrations();
  logInfo(`${SYSTEM_TITLE} | Ready.`);
});
