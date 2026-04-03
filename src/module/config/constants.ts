export const SYSTEM_ID = 'uesrpg-rebuilt';
export const SYSTEM_TITLE = 'UESRPG Rebuilt';
export const SYSTEM_PATH = 'systems/uesrpg-rebuilt';

export const ACTOR_TYPES = {
  character: 'character',
  npc: 'npc',
} as const;

export const ITEM_TYPES = {
  weapon: 'weapon',
  gear: 'gear',
  trait: 'trait',
} as const;

export const RESOURCE_PATHS = {
  health: 'system.resources.health',
  stamina: 'system.resources.stamina',
  magicka: 'system.resources.magicka',
} as const;

export const LABELS = {
  actorTypes: {
    [ACTOR_TYPES.character]: 'UESRPG.Actor.character',
    [ACTOR_TYPES.npc]: 'UESRPG.Actor.npc',
  },
  itemTypes: {
    [ITEM_TYPES.weapon]: 'UESRPG.Item.weapon',
    [ITEM_TYPES.gear]: 'UESRPG.Item.gear',
    [ITEM_TYPES.trait]: 'UESRPG.Item.trait',
  },
} as const;
