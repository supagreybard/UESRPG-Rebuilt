import { SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseActorSheet } from './base-actor-sheet';

export class CharacterSheet extends BaseActorSheet {
  static PARTS = {
    sheet: {
      template: `${SYSTEM_PATH}/templates/actor/character-sheet.hbs`,
      root: true,
    },
  };

  override async _prepareContext(
    options: any,
  ): Promise<Record<string, unknown>> {
    const context = await super._prepareContext(options);
    const system = context.system as Record<string, any>;

    return {
      ...context,
      experience: Number(system.experience ?? 0),
      sheetTitle: localize('UESRPG.Sheets.character'),
    };
  }
}
