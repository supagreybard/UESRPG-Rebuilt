import type {
  ACTOR_TYPES,
  ITEM_TYPES,
  SYSTEM_ID,
} from './module/config/constants';
import type { UesrpgActor } from './module/documents/UesrpgActor';
import type { UesrpgItem } from './module/documents/UesrpgItem';

declare global {
  interface Game {
    uesrpg: {
      actorTypes: typeof ACTOR_TYPES;
      itemTypes: typeof ITEM_TYPES;
      systemId: typeof SYSTEM_ID;
      documents: {
        Actor: typeof UesrpgActor;
        Item: typeof UesrpgItem;
      };
    };
  }
}

export {};
