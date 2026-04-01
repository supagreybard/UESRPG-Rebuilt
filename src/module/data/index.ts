import { ACTOR_TYPES, ITEM_TYPES } from '../config/constants';
import { CharacterData, NPCData } from './actor';
import { AbilityData, GearData, WeaponData } from './item';

export function registerDataModels(): void {
  Object.assign(CONFIG.Actor.dataModels, {
    [ACTOR_TYPES.character]: CharacterData,
    [ACTOR_TYPES.npc]: NPCData,
  });

  Object.assign(CONFIG.Item.dataModels, {
    [ITEM_TYPES.weapon]: WeaponData,
    [ITEM_TYPES.gear]: GearData,
    [ITEM_TYPES.ability]: AbilityData,
  });
}
