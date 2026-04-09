import { SYSTEM_ID } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseRuleItemSheet } from './BaseRuleItemSheet';

export class PowerItemSheet extends BaseRuleItemSheet {
  static override DEFAULT_OPTIONS: any = foundry.utils.mergeObject(
    super.DEFAULT_OPTIONS,
    {
      classes: [SYSTEM_ID, 'sheet', 'item', 'item-power'],
    },
  );

  protected override _getSheetTitleKey(): string {
    return 'UESRPG.Sheets.power';
  }

  protected override _getDetailsFields(
    system: Record<string, any>,
  ): ReturnType<BaseRuleItemSheet['_getDetailsFields']> {
    return [
      this._createTextField(
        'slug',
        localize('UESRPG.Fields.slug'),
        String(system.slug ?? ''),
      ),
      this._createTextField(
        'source',
        localize('UESRPG.Fields.source'),
        String(system.source ?? ''),
      ),
    ];
  }
}
