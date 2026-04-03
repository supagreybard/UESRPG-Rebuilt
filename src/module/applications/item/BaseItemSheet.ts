import { LABELS, SYSTEM_ID } from '../../config/constants';
import { localize } from '../../utils/localization';

type ItemField = {
  key: string;
  label: string;
  inputType: 'checkbox' | 'number' | 'text';
  isCheckbox: boolean;
  value: boolean | number | string;
};

const { HandlebarsApplicationMixin } = foundry.applications.api;
const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2 as any;
const ItemHandlebarsSheet = HandlebarsApplicationMixin(ItemSheetV2) as any;

export class BaseItemSheet extends ItemHandlebarsSheet {
  static DEFAULT_OPTIONS = {
    classes: [SYSTEM_ID, 'sheet', 'item'],
    position: {
      width: 640,
      height: 560,
    },
    window: {
      resizable: true,
    },
    form: {
      submitOnChange: true,
      closeOnSubmit: false,
    },
  };

  async _prepareContext(options: any): Promise<Record<string, unknown>> {
    const context = (await super._prepareContext(options)) as Record<
      string,
      unknown
    >;
    const system = this.item.system as Record<string, any>;
    const prose = (system.prose ?? {}) as Record<string, any>;
    const itemType = String(this.item.type) as keyof typeof LABELS.itemTypes;
    const rawItemType = String(this.item.type);
    const isInventoryItem = rawItemType === 'weapon' || rawItemType === 'gear';
    const isTrait = rawItemType === 'trait';

    return {
      ...context,
      item: this.item,
      editable: this.isEditable,
      system,
      typeLabel: localize(LABELS.itemTypes[itemType]),
      inventoryFields: this.#prepareInventoryFields(system, isInventoryItem),
      ruleFields: this.#prepareRuleFields(system, isTrait),
      subtypeFields: this.#prepareSubtypeFields(system),
      isTrait,
      headerFlavorText: String(prose.flavorText ?? '').trim(),
      flavorTextField: this.#prepareFlavorTextField(prose, isTrait),
    };
  }

  #prepareInventoryFields(
    system: Record<string, any>,
    isInventoryItem: boolean,
  ): ItemField[] {
    if (!isInventoryItem) {
      return [];
    }

    return [
      {
        key: 'quantity',
        label: localize('UESRPG.Fields.quantity'),
        inputType: 'number',
        isCheckbox: false,
        value: Number(system.quantity ?? 1),
      },
      {
        key: 'encumbrance',
        label: localize('UESRPG.Fields.encumbrance'),
        inputType: 'number',
        isCheckbox: false,
        value: Number(system.encumbrance ?? 0),
      },
    ];
  }

  #prepareRuleFields(
    system: Record<string, any>,
    isTrait: boolean,
  ): ItemField[] {
    if (!isTrait) {
      return [];
    }

    return [];
  }

  #prepareFlavorTextField(
    prose: Record<string, any>,
    isTrait: boolean,
  ): ItemField | null {
    if (!isTrait) {
      return null;
    }

    return {
      key: 'prose.flavorText',
      label: localize('UESRPG.Fields.flavorText'),
      inputType: 'text',
      isCheckbox: false,
      value: String(prose.flavorText ?? ''),
    };
  }

  #prepareSubtypeFields(system: Record<string, any>): ItemField[] {
    const itemType = String(this.item.type);

    if (itemType === 'weapon') {
      return [
        {
          key: 'damage',
          label: localize('UESRPG.Fields.damage'),
          inputType: 'text',
          isCheckbox: false,
          value: String(system.damage ?? ''),
        },
        {
          key: 'range',
          label: localize('UESRPG.Fields.range'),
          inputType: 'text',
          isCheckbox: false,
          value: String(system.range ?? ''),
        },
      ];
    }

    if (itemType === 'gear') {
      return [
        {
          key: 'equipped',
          label: localize('UESRPG.Fields.equipped'),
          inputType: 'checkbox',
          isCheckbox: true,
          value: Boolean(system.equipped),
        },
      ];
    }

    return [];
  }
}
