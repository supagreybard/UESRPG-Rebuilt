import { LABELS, SYSTEM_ID, SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseItemSheet } from './BaseItemSheet';

type RuleItemSelectOption = {
  value: string;
  label: string;
  selected: boolean;
};

type RuleItemField = {
  key: string;
  label: string;
  value?: string;
  options?: RuleItemSelectOption[];
  cssClass?: string;
  isTextInput?: boolean;
  isTextarea?: boolean;
  isSelect?: boolean;
};

type RuleItemSheetTab = {
  id: string;
  group: string;
  cssClass: string;
  active: boolean;
  label: string;
};

type RuleItemContentSection = {
  id: string;
  tab: string;
};

export abstract class BaseRuleItemSheet extends BaseItemSheet {
  static override DEFAULT_OPTIONS: any = foundry.utils.mergeObject(
    super.DEFAULT_OPTIONS,
    {
      classes: [SYSTEM_ID, 'sheet', 'item', 'rule-item'],
      actions: {
        activateTab: BaseRuleItemSheet.prototype._onActivateTab,
      },
    },
  );

  static TABS = {
    primary: {
      initial: 'prose',
      labelPrefix: 'UESRPG.Tabs',
      tabs: [{ id: 'prose' }, { id: 'details' }],
    },
  };

  static PARTS = {
    sheet: {
      template: `${SYSTEM_PATH}/templates/item/rule-item-sheet.hbs`,
      root: true,
      templates: [
        `${SYSTEM_PATH}/templates/item/rule-item-sheet-tabs.hbs`,
        `${SYSTEM_PATH}/templates/item/rule-item-sheet-details.hbs`,
        `${SYSTEM_PATH}/templates/item/rule-item-sheet-prose.hbs`,
      ],
    },
    tabs: {
      template: `${SYSTEM_PATH}/templates/item/rule-item-sheet-tabs.hbs`,
      id: 'tabs',
    },
    details: {
      template: `${SYSTEM_PATH}/templates/item/rule-item-sheet-details.hbs`,
      id: 'details',
      classes: ['uesrpg-rebuilt-rule-item-sheet__part'],
    },
    prose: {
      template: `${SYSTEM_PATH}/templates/item/rule-item-sheet-prose.hbs`,
      id: 'prose',
      classes: ['uesrpg-rebuilt-rule-item-sheet__part'],
    },
  };

  protected abstract _getSheetTitleKey(): string;

  protected abstract _getDetailsFields(
    system: Record<string, any>,
  ): RuleItemField[];

  protected _getContentSectionOrder(): string[] {
    return ['details', 'prose'];
  }

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
    const partIds = this.#preparePartIds();

    return {
      ...context,
      tabs,
      sheetTabs: this.#prepareSheetTabs(tabs),
      item: this.item,
      editable: this.isEditable,
      system,
      typeLabel: localize(
        LABELS.itemTypes[
          String(this.item.type) as keyof typeof LABELS.itemTypes
        ],
      ),
      sheetTitle: localize(this._getSheetTitleKey()),
      headerFlavorText: String(prose.flavorText ?? '').trim(),
      detailFields: this._getDetailsFields(system),
      flavorTextField: this._createTextareaField(
        'prose.flavorText',
        localize('UESRPG.Fields.flavorText'),
        String(prose.flavorText ?? ''),
      ),
      contentSections: this._getContentSectionOrder().map((part) => ({
        id: partIds[part],
        tab: part,
      })) as RuleItemContentSection[],
      partIds,
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

  protected _onActivateTab(event: PointerEvent, target: HTMLElement): void {
    event.preventDefault();

    const tab = target.dataset.tab;
    const group = target.dataset.group ?? 'primary';

    if (!tab) {
      return;
    }

    this.changeTab(tab, group);
  }

  protected _createTextField(
    key: string,
    label: string,
    value: string,
    cssClass?: string,
  ): RuleItemField {
    return {
      key,
      label,
      value,
      cssClass,
      isTextInput: true,
    };
  }

  protected _createTextareaField(
    key: string,
    label: string,
    value: string,
    cssClass?: string,
  ): RuleItemField {
    return {
      key,
      label,
      value,
      cssClass,
      isTextarea: true,
    };
  }

  protected _createSelectField(
    key: string,
    label: string,
    options: RuleItemSelectOption[],
    cssClass?: string,
  ): RuleItemField {
    return {
      key,
      label,
      options,
      cssClass,
      isSelect: true,
    };
  }

  #preparePartIds(): Record<string, string> {
    return ['tabs', ...this._getContentSectionOrder()].reduce(
      (parts, part) => ({
        ...parts,
        [part]: `${this.id}-${part}`,
      }),
      {} as Record<string, string>,
    );
  }

  #prepareSheetTabs(tabs: Record<string, any>): RuleItemSheetTab[] {
    const constructor = this.constructor as typeof BaseRuleItemSheet & {
      TABS?: {
        primary?: {
          tabs?: Array<Record<string, unknown>>;
        };
      };
    };
    const tabConfig = constructor.TABS?.primary?.tabs ?? [];

    return tabConfig.map((definition: Record<string, unknown>) => {
      const id = String(definition.id ?? '');
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
}
