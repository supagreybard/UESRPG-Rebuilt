import type { ACTOR_TYPES, ITEM_TYPES, SYSTEM_ID } from './module/config/constants';
import type { UESRPGActor } from './module/documents/actor';
import type { UESRPGItem } from './module/documents/item';

declare global {
  interface Game {
    uesrpg: {
      actorTypes: typeof ACTOR_TYPES;
      itemTypes: typeof ITEM_TYPES;
      systemId: typeof SYSTEM_ID;
      documents: {
        Actor: typeof UESRPGActor;
        Item: typeof UESRPGItem;
      };
    };
  }
}

export {};
