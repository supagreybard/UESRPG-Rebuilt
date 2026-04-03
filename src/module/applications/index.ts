import {
  ACTOR_DOCUMENT_TYPES,
  ITEM_DOCUMENT_TYPES,
} from '../config/document-types';
import { SYSTEM_ID } from '../config/constants';
import { CharacterSheet } from './actor/CharacterSheet';
import { NPCSheet } from './actor/NPCSheet';
import { UesrpgItemSheet } from './item/UesrpgItemSheet';

export function registerApplicationClasses(): void {
  Actors.unregisterSheet('core', ActorSheet);
  Items.unregisterSheet('core', ItemSheet);

  Actors.registerSheet(SYSTEM_ID, CharacterSheet as any, {
    types: [ACTOR_DOCUMENT_TYPES[0]],
    makeDefault: true,
    label: 'UESRPG.Sheets.character',
  });

  Actors.registerSheet(SYSTEM_ID, NPCSheet as any, {
    types: [ACTOR_DOCUMENT_TYPES[1]],
    makeDefault: true,
    label: 'UESRPG.Sheets.npc',
  });

  Items.registerSheet(SYSTEM_ID, UesrpgItemSheet as any, {
    types: [...ITEM_DOCUMENT_TYPES],
    makeDefault: true,
    label: 'UESRPG.Sheets.item',
  });
}
