import { SYSTEM_ID, SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseRuleItemSheet } from './BaseRuleItemSheet';

type CharacteristicField = {
  key: string;
  label: string;
  value: number;
};

export class RaceItemSheet extends BaseRuleItemSheet {
  static override DEFAULT_OPTIONS: any = foundry.utils.mergeObject(
    super.DEFAULT_OPTIONS,
    {
      classes: [SYSTEM_ID, 'sheet', 'item', 'item-race'],
    },
  );

  static override TABS = {
    primary: {
      initial: 'system',
      labelPrefix: 'UESRPG.Tabs',
      tabs: [{ id: 'details' }, { id: 'system' }, { id: 'prose' }],
    },
  };

  static override PARTS = {
    ...super.PARTS,
    sheet: {
      ...super.PARTS.sheet,
      templates: [
        ...super.PARTS.sheet.templates,
        `${SYSTEM_PATH}/templates/item/race-item-sheet-system.hbs`,
      ],
    },
    system: {
      template: `${SYSTEM_PATH}/templates/item/race-item-sheet-system.hbs`,
      id: 'system',
      classes: ['uesrpg-rebuilt-race-sheet__part'],
    },
  };

  override async _prepareContext(
    options: any,
  ): Promise<Record<string, unknown>> {
    const context = (await super._prepareContext(options)) as Record<
      string,
      unknown
    >;
    const system = this.item.system as Record<string, any>;

    return {
      ...context,
      characteristicFields: this.#prepareCharacteristics(system),
    };
  }

  protected override _getSheetTitleKey(): string {
    return 'UESRPG.Sheets.race';
  }

  protected override _getContentSectionOrder(): string[] {
    return ['details', 'system', 'prose'];
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

  #prepareCharacteristics(system: Record<string, any>): CharacteristicField[] {
    const characteristics = system.characteristics ?? {};

    return Object.entries(characteristics).map(([key, value]) => ({
      key,
      label: localize(`UESRPG.Attributes.${key}`),
      value: Number(value ?? 0),
    }));
  }
}
