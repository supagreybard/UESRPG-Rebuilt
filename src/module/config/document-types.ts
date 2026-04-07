import { ACTOR_TYPES, ITEM_TYPES } from './constants';

export const ACTOR_DOCUMENT_TYPES = [
  ACTOR_TYPES.character,
  ACTOR_TYPES.npc,
] as const;
export const ITEM_DOCUMENT_TYPES = [
  ITEM_TYPES.weapon,
  ITEM_TYPES.trait,
  ITEM_TYPES.race,
  ITEM_TYPES.power,
] as const;
