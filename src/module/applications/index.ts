import {
  ACTOR_DOCUMENT_TYPES,
  ITEM_DOCUMENT_TYPES,
} from '../config/document-types';
import { SYSTEM_ID } from '../config/constants';
import { CharacterSheet } from './actor/CharacterSheet';
import { NPCSheet } from './actor/NPCSheet';
import { PowerItemSheet } from './item/PowerItemSheet';
import { RaceItemSheet } from './item/RaceItemSheet';
import { TraitItemSheet } from './item/TraitItemSheet';
import { UesrpgItemSheet } from './item/UesrpgItemSheet';

export function registerApplicationClasses(): void {
  const { DocumentSheetConfig } = foundry.applications.apps;

  DocumentSheetConfig.unregisterSheet(
    Actor,
    'core',
    foundry.appv1.sheets.ActorSheet,
  );
  DocumentSheetConfig.unregisterSheet(
    Item,
    'core',
    foundry.appv1.sheets.ItemSheet,
  );

  DocumentSheetConfig.registerSheet(Actor, SYSTEM_ID, CharacterSheet as any, {
    types: [ACTOR_DOCUMENT_TYPES[0]],
    makeDefault: true,
    label: 'UESRPG.Sheets.character',
  });

  DocumentSheetConfig.registerSheet(Actor, SYSTEM_ID, NPCSheet as any, {
    types: [ACTOR_DOCUMENT_TYPES[1]],
    makeDefault: true,
    label: 'UESRPG.Sheets.npc',
  });

  DocumentSheetConfig.registerSheet(Item, SYSTEM_ID, UesrpgItemSheet as any, {
    types: ITEM_DOCUMENT_TYPES.filter(
      (type) => type !== 'trait' && type !== 'race' && type !== 'power',
    ),
    makeDefault: true,
    label: 'UESRPG.Sheets.item',
  });

  DocumentSheetConfig.registerSheet(Item, SYSTEM_ID, TraitItemSheet as any, {
    types: ['trait'],
    makeDefault: true,
    label: 'UESRPG.Sheets.trait',
  });

  DocumentSheetConfig.registerSheet(Item, SYSTEM_ID, PowerItemSheet as any, {
    types: ['power'],
    makeDefault: true,
    label: 'UESRPG.Sheets.power',
  });

  DocumentSheetConfig.registerSheet(Item, SYSTEM_ID, RaceItemSheet as any, {
    types: ['race'],
    makeDefault: true,
    label: 'UESRPG.Sheets.race',
  });
}
