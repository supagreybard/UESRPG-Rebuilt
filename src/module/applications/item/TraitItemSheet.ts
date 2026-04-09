import {
  PARAMETER_TYPES,
  SYSTEM_ID,
  SYSTEM_PATH,
  TRAIT_STACK_MODES,
} from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseRuleItemSheet } from './BaseRuleItemSheet';

type TraitParameterField = {
  index: number;
  type: string;
  value: string;
  typeOptions: TraitSelectOption[];
};

type TraitSelectOption = {
  value: string;
  label: string;
  selected: boolean;
};

export class TraitItemSheet extends BaseRuleItemSheet {
  static override DEFAULT_OPTIONS: any = foundry.utils.mergeObject(
    super.DEFAULT_OPTIONS,
    {
      classes: [SYSTEM_ID, 'sheet', 'item', 'item-trait'],
      actions: {
        activateTab: TraitItemSheet.prototype._onActivateTab,
        addParameter: TraitItemSheet.prototype._onAddParameter,
        removeParameter: TraitItemSheet.prototype._onRemoveParameter,
      },
    },
  );

  static TABS = {
    primary: {
      initial: 'prose',
      labelPrefix: 'UESRPG.Tabs',
      tabs: [{ id: 'prose' }, { id: 'details' }, { id: 'parameters' }],
    },
  };

  static PARTS = {
    ...super.PARTS,
    sheet: {
      ...super.PARTS.sheet,
      templates: [
        ...super.PARTS.sheet.templates,
        `${SYSTEM_PATH}/templates/item/trait-item-sheet-parameters.hbs`,
      ],
    },
    parameters: {
      template: `${SYSTEM_PATH}/templates/item/trait-item-sheet-parameters.hbs`,
      id: 'parameters',
      classes: ['uesrpg-rebuilt-trait-sheet__part'],
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
      parameterFields: this.#prepareParameterFields(system.parameters),
      hasParameters:
        Array.isArray(system.parameters) && system.parameters.length > 0,
    };
  }

  protected _processFormData(
    event: SubmitEvent | null,
    form: HTMLFormElement,
    formData: any,
  ): object {
    const data = super._processFormData(event, form, formData) as Record<
      string,
      any
    >;
    const system = (data.system ?? {}) as Record<string, any>;
    const rawParameters = system.parameters;
    const entries = Array.isArray(rawParameters)
      ? rawParameters
      : rawParameters && typeof rawParameters === 'object'
        ? Object.entries(rawParameters)
            .sort(([left], [right]) => Number(left) - Number(right))
            .map(([, value]) => value)
        : [];

    system.parameters = entries
      .map((entry) => this.#normalizeParameterEntry(entry))
      .filter(
        (entry): entry is { type: string; value: string } => entry !== null,
      );
    system.event = this.#normalizeOptionalText(system.event);
    system.logic = this.#normalizeOptionalText(system.logic);
    system.stackMode = this.#normalizeStackMode(system.stackMode);
    data.system = system;

    return data;
  }

  protected async _onAddParameter(): Promise<void> {
    await this.#preserveScrollPosition(async () => {
      await this.submit();

      const system = this.item.system as Record<string, any>;
      const parameters = Array.isArray(system.parameters)
        ? [...system.parameters]
        : [];

      parameters.push(this.#createDefaultParameter());

      await this.item.update({
        'system.parameters': parameters,
      });
      await this.render({ parts: ['parameters'] });
    });
  }

  protected override _getSheetTitleKey(): string {
    return 'UESRPG.Sheets.trait';
  }

  protected override _getContentSectionOrder(): string[] {
    return ['details', 'parameters', 'prose'];
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
        'event',
        localize('UESRPG.Fields.event'),
        String(system.event ?? ''),
      ),
      this._createSelectField(
        'stackMode',
        localize('UESRPG.Fields.stackMode'),
        this.#buildStackModeOptions(system.stackMode),
      ),
      this._createTextareaField(
        'logic',
        localize('UESRPG.Fields.logic'),
        String(system.logic ?? ''),
        'uesrpg-rebuilt-rule-item-sheet__field--logic uesrpg-rebuilt-rule-item-sheet__logic-field',
      ),
    ];
  }

  protected async _onRemoveParameter(
    event: PointerEvent,
    target: HTMLElement,
  ): Promise<void> {
    const index = Number(target.dataset.index ?? -1);

    if (index < 0) {
      return;
    }

    await this.#preserveScrollPosition(async () => {
      await this.submit();

      const system = this.item.system as Record<string, any>;
      const parameters = Array.isArray(system.parameters)
        ? [...system.parameters]
        : [];

      if (index >= parameters.length) {
        return;
      }

      parameters.splice(index, 1);

      await this.item.update({
        'system.parameters': parameters,
      });
      await this.render({ parts: ['parameters'] });
    });
  }

  #prepareParameterFields(parameters: unknown): TraitParameterField[] {
    if (!Array.isArray(parameters)) {
      return [];
    }

    return parameters.map((entry, index) => ({
      index,
      type: this.#readParameterType(entry),
      value: this.#readParameterValue(entry),
      typeOptions: this.#buildParameterTypeOptions(
        this.#readParameterType(entry),
      ),
    }));
  }

  #buildParameterTypeOptions(selectedType: unknown): TraitSelectOption[] {
    const normalizedType = this.#normalizeParameterType(selectedType);

    return Object.values(PARAMETER_TYPES).map((value) => ({
      value,
      label: localize(this.#getParameterTypeLabel(value)),
      selected: value === normalizedType,
    }));
  }

  #buildStackModeOptions(selectedMode: unknown): TraitSelectOption[] {
    const normalizedMode = this.#normalizeStackMode(selectedMode);

    return Object.values(TRAIT_STACK_MODES).map((value) => ({
      value,
      label: localize(this.#getStackModeLabel(value)),
      selected: value === normalizedMode,
    }));
  }

  #normalizeParameterEntry(
    entry: unknown,
  ): { type: string; value: string } | null {
    const type = this.#normalizeParameterType(this.#readParameterType(entry));
    const value = this.#readParameterValue(entry).trim();

    return { type, value };
  }

  #normalizeParameterType(value: unknown): string {
    return Object.values(PARAMETER_TYPES).includes(value as any)
      ? String(value)
      : PARAMETER_TYPES.text;
  }

  #normalizeStackMode(value: unknown): string {
    return Object.values(TRAIT_STACK_MODES).includes(value as any)
      ? String(value)
      : TRAIT_STACK_MODES.single;
  }

  #normalizeOptionalText(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const trimmedValue = value.trim();

    return trimmedValue.length > 0 ? trimmedValue : null;
  }

  #readParameterType(entry: unknown): string {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return PARAMETER_TYPES.text;
    }

    return this.#normalizeParameterType(
      (entry as Record<string, unknown>).type,
    );
  }

  #readParameterValue(entry: unknown): string {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return '';
    }

    return String((entry as Record<string, unknown>).value ?? '');
  }

  #createDefaultParameter(): { type: string; value: string } {
    return {
      type: PARAMETER_TYPES.text,
      value: '',
    };
  }

  async #preserveScrollPosition(operation: () => Promise<void>): Promise<void> {
    const previousScrollTop = this.#getScrollContainer()?.scrollTop ?? 0;

    await operation();

    window.requestAnimationFrame(() => {
      const scrollContainer = this.#getScrollContainer();

      if (scrollContainer) {
        scrollContainer.scrollTop = previousScrollTop;
      }
    });
  }

  #getScrollContainer(): HTMLElement | null {
    const element = this.element as HTMLElement | null | undefined;

    if (!element) {
      return null;
    }

    return element.querySelector('.window-content') ?? element;
  }

  #getParameterTypeLabel(value: string): string {
    switch (value) {
      case PARAMETER_TYPES.number:
        return 'UESRPG.ParameterTypes.number';
      case PARAMETER_TYPES.roll_formula:
        return 'UESRPG.ParameterTypes.rollFormula';
      case PARAMETER_TYPES.text:
      default:
        return 'UESRPG.ParameterTypes.text';
    }
  }

  #getStackModeLabel(value: string): string {
    switch (value) {
      case TRAIT_STACK_MODES.highest:
        return 'UESRPG.TraitStackModes.highest';
      case TRAIT_STACK_MODES.sum:
        return 'UESRPG.TraitStackModes.sum';
      case TRAIT_STACK_MODES.distinct:
        return 'UESRPG.TraitStackModes.distinct';
      case TRAIT_STACK_MODES.single:
      default:
        return 'UESRPG.TraitStackModes.single';
    }
  }
}
