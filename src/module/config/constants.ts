export const SYSTEM_ID = 'uesrpg-rebuilt';
export const SYSTEM_TITLE = 'UESRPG Rebuilt';
export const SYSTEM_PATH = 'systems/uesrpg-rebuilt';

export const ACTOR_TYPES = {
  character: 'character',
  npc: 'npc',
} as const;

export const ITEM_TYPES = {
  weapon: 'weapon',
  trait: 'trait',
  race: 'race',
  power: 'power',
} as const;

export const GRANT_TYPES = {
  trait: 'trait',
  power: 'power',
  skill_0: 'skill_0',
  talent: 'talent',
  equipment_training: 'equipment_training',
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
    [ITEM_TYPES.trait]: 'UESRPG.Item.trait',
    [ITEM_TYPES.race]: 'UESRPG.Item.race',
    [ITEM_TYPES.power]: 'UESRPG.Item.power',
  },
} as const;
