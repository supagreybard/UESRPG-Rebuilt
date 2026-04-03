import { SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseItemSheet } from './BaseItemSheet';

export class UesrpgItemSheet extends BaseItemSheet {
  static PARTS = {
    sheet: {
      template: `${SYSTEM_PATH}/templates/item/item-sheet.hbs`,
      root: true,
    },
  };

  override async _prepareContext(
    options: any,
  ): Promise<Record<string, unknown>> {
    const context = await super._prepareContext(options);

    return {
      ...context,
      sheetTitle: localize('UESRPG.Sheets.item'),
    };
  }
}
