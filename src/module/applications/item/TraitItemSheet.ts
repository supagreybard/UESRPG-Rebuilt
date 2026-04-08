import {
  LABELS,
  PARAMETER_TYPES,
  SYSTEM_ID,
  SYSTEM_PATH,
  TRAIT_STACK_MODES,
} from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseItemSheet } from './BaseItemSheet';

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

type TraitSheetTab = {
  id: string;
  group: string;
  cssClass: string;
  active: boolean;
  label: string;
};

export class TraitItemSheet extends BaseItemSheet {
  static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
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
    sheet: {
      template: `${SYSTEM_PATH}/templates/item/trait-item-sheet.hbs`,
      root: true,
      templates: [
        `${SYSTEM_PATH}/templates/item/trait-item-sheet-tabs.hbs`,
        `${SYSTEM_PATH}/templates/item/trait-item-sheet-details.hbs`,
        `${SYSTEM_PATH}/templates/item/trait-item-sheet-parameters.hbs`,
        `${SYSTEM_PATH}/templates/item/trait-item-sheet-prose.hbs`,
      ],
    },
    tabs: {
      template: `${SYSTEM_PATH}/templates/item/trait-item-sheet-tabs.hbs`,
      id: 'tabs',
    },
    details: {
      template: `${SYSTEM_PATH}/templates/item/trait-item-sheet-details.hbs`,
      id: 'details',
      classes: ['uesrpg-rebuilt-trait-sheet__part'],
    },
    parameters: {
      template: `${SYSTEM_PATH}/templates/item/trait-item-sheet-parameters.hbs`,
      id: 'parameters',
      classes: ['uesrpg-rebuilt-trait-sheet__part'],
    },
    prose: {
      template: `${SYSTEM_PATH}/templates/item/trait-item-sheet-prose.hbs`,
      id: 'prose',
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
    const prose = (system.prose ?? {}) as Record<string, any>;
    const tabs = (context.tabs ?? this._prepareTabs('primary')) as Record<
      string,
      any
    >;

    return {
      ...context,
      tabs,
      sheetTabs: this.#prepareSheetTabs(tabs),
      item: this.item,
      editable: this.isEditable,
      system,
      typeLabel: localize(LABELS.itemTypes.trait),
      sheetTitle: localize('UESRPG.Sheets.trait'),
      headerFlavorText: String(prose.flavorText ?? '').trim(),
      textFields: this.#prepareTextFields(system),
      eventField: {
        key: 'event',
        label: localize('UESRPG.Fields.event'),
        value: String(system.event ?? ''),
      },
      stackModeField: {
        key: 'stackMode',
        label: localize('UESRPG.Fields.stackMode'),
        options: this.#buildStackModeOptions(system.stackMode),
      },
      logicField: {
        key: 'logic',
        label: localize('UESRPG.Fields.logic'),
        value: String(system.logic ?? ''),
      },
      parameterFields: this.#prepareParameterFields(system.parameters),
      hasParameters:
        Array.isArray(system.parameters) && system.parameters.length > 0,
      flavorTextField: {
        key: 'prose.flavorText',
        label: localize('UESRPG.Fields.flavorText'),
        value: String(prose.flavorText ?? ''),
      },
      partIds: {
        tabs: `${this.id}-tabs`,
        details: `${this.id}-details`,
        parameters: `${this.id}-parameters`,
        prose: `${this.id}-prose`,
      },
    };
  }

  async _onRender(context: any, options: any): Promise<void> {
    await super._onRender(context, options);
    this.#syncTabPanelVisibility();
  }

  changeTab(tab: string, group: string, options?: any): void {
    super.changeTab(tab, group, options);
    this.#syncTabPanelVisibility();
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

  protected _onActivateTab(event: PointerEvent, target: HTMLElement): void {
    event.preventDefault();

    const tab = target.dataset.tab;
    const group = target.dataset.group ?? 'primary';

    if (!tab) {
      return;
    }

    this.changeTab(tab, group);
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

  #prepareTextFields(system: Record<string, any>) {
    return [
      {
        key: 'slug',
        label: localize('UESRPG.Fields.slug'),
        value: String(system.slug ?? ''),
      },
    ];
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

  #prepareSheetTabs(tabs: Record<string, any>): TraitSheetTab[] {
    return ['prose', 'details', 'parameters'].map((id) => {
      const tab = (tabs[id] ?? {}) as Record<string, any>;

      return {
        id,
        group: String(tab.group ?? 'primary'),
        cssClass: String(tab.cssClass ?? ''),
        active: Boolean(tab.active),
        label: localize(`UESRPG.Tabs.${id}`),
      };
    });
  }

  #syncTabPanelVisibility(): void {
    const element = this.element;

    if (!element) {
      return;
    }

    const activeTab = this.tabGroups.primary ?? 'prose';
    const navTabs = element.querySelectorAll(
      '[data-action="activateTab"][data-tab]',
    );
    const panels = element.querySelectorAll(
      '.tab[data-group="primary"][data-tab]',
    );

    for (const navTab of navTabs) {
      if (!(navTab instanceof HTMLElement)) {
        continue;
      }

      const isActive = navTab.dataset.tab === activeTab;
      navTab.classList.toggle('active', isActive);
      navTab.setAttribute('aria-selected', String(isActive));
    }

    for (const panel of panels) {
      if (!(panel instanceof HTMLElement)) {
        continue;
      }

      const isActive = panel.dataset.tab === activeTab;
      panel.hidden = !isActive;
      panel.setAttribute('aria-hidden', String(!isActive));
      panel.classList.toggle('active', isActive);
    }
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
