import { ACTOR_TYPES, ITEM_TYPES } from '../config/constants';
import { CharacterData, NPCData } from './actor';
import { PowerData, RaceData, TraitData, WeaponData } from './item';

export function registerDataModels(): void {
  Object.assign(CONFIG.Actor.dataModels, {
    [ACTOR_TYPES.character]: CharacterData,
    [ACTOR_TYPES.npc]: NPCData,
  });

  Object.assign(CONFIG.Item.dataModels, {
    [ITEM_TYPES.weapon]: WeaponData,
    [ITEM_TYPES.trait]: TraitData,
    [ITEM_TYPES.race]: RaceData,
    [ITEM_TYPES.power]: PowerData,
  });
}
