import { SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseActorSheet } from './BaseActorSheet';

export class NPCSheet extends BaseActorSheet {
  static PARTS = {
    sheet: {
      template: `${SYSTEM_PATH}/templates/actor/npc-sheet.hbs`,
      root: true,
    },
  };

  override async _prepareContext(
    options: any,
  ): Promise<Record<string, unknown>> {
    const context = await super._prepareContext(options);

    return {
      ...context,
      sheetTitle: localize('UESRPG.Sheets.npc'),
    };
  }
}
