import { ITEM_TYPES, SYSTEM_ID, SYSTEM_PATH } from '../../config/constants';
import { CHARACTER_CHARACTERISTIC_KEYS } from '../../data/shared/characteristics';
import { localize } from '../../utils/localization';
import { BaseActorSheet } from './BaseActorSheet';

const DEFAULT_PORTRAIT = 'icons/svg/mystery-man.svg';

type CharacterSkillEntry = {
  key?: string | null;
  name?: string | null;
  rank?: number | null;
  governingCharacteristic?: string | null;
  source?: string | null;
};

type CharacterRaceReference = {
  uuid?: string | null;
  name?: string | null;
};

type CharacterSkillRow = {
  index: number;
  key: string;
  name: string;
  namePlaceholder: string;
  rank: number;
  bonus: string;
  targetNumber: string;
  unavailableLabel: string;
  governingCharacteristic: string;
  governingCharacteristicLabel: string;
  source: string;
  governingCharacteristicOptions: SelectOption[];
  editable: boolean;
  warnings: string[];
};

type SelectOption = {
  value: string;
  label: string;
  selected: boolean;
};

type CharacterSheetTab = {
  id: string;
  group: string;
  cssClass: string;
  active: boolean;
  label: string;
};

type OverviewListGroup = {
  key: string;
  label: string;
  emptyLabel: string;
  entries: OverviewListEntry[];
};

type OverviewListEntry = {
  name: string;
  meta: string;
  warnings: string[];
};

type CharacterItemField = {
  label: string;
  value: string;
  isMissing: boolean;
};

type CharacterItemRow = {
  id: string;
  name: string;
  typeLabel: string;
  fields: CharacterItemField[];
  warnings: string[];
  equipped: boolean;
  equippedLabel: string;
  canOpen: boolean;
  canDelete: boolean;
  canToggleEquipped: boolean;
};

type CharacterItemGroup = {
  key: string;
  label: string;
  emptyLabel: string;
  manualFallbackLabel: string;
  createType: string;
  canCreate: boolean;
  entries: CharacterItemRow[];
};

type CharacterRaceDisplay = {
  uuid: string;
  name: string;
  placeholder: string;
  label: string;
  editable: boolean;
};

type NormalizedSkillEntry = {
  key: string | null;
  name: string;
  rank: number;
  governingCharacteristic: string | null;
  source: string;
};

type NormalizedRaceReference = {
  uuid: string | null;
  name: string;
};

export class CharacterSheet extends BaseActorSheet {
  static override DEFAULT_OPTIONS: any = foundry.utils.mergeObject(
    super.DEFAULT_OPTIONS,
    {
      classes: [SYSTEM_ID, 'sheet', 'actor', 'actor-character'],
      position: {
        width: 800,
        height: 700,
      },
      actions: {
        activateTab: CharacterSheet.prototype._onActivateTab,
        addSkill: CharacterSheet.prototype._onAddSkill,
        removeSkill: CharacterSheet.prototype._onRemoveSkill,
        createItem: CharacterSheet.prototype._onCreateItem,
        deleteItem: CharacterSheet.prototype._onDeleteItem,
        openItem: CharacterSheet.prototype._onOpenItem,
        toggleEquipped: CharacterSheet.prototype._onToggleEquipped,
      },
    },
  );

  static TABS = {
    primary: {
      initial: 'overview',
      labelPrefix: 'UESRPG.Tabs',
      tabs: [
        { id: 'overview' },
        { id: 'skills' },
        { id: 'inventory' },
        { id: 'magic' },
        { id: 'notes' },
      ],
    },
  };

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
    const prose = (system.prose ?? {}) as Record<string, any>;
    const name = String(this.actor.name ?? '').trim();
    const actorImage = String(this.actor.img ?? '').trim();
    const tabs = (context.tabs ?? this._prepareTabs('primary')) as Record<
      string,
      any
    >;

    return {
      ...context,
      tabs,
      sheetTabs: this.#prepareSheetTabs(tabs),
      experience: Number(system.experience ?? 0),
      sheetTitle: localize('UESRPG.Sheets.character'),
      race: this.#prepareRaceDisplay(system.race),
      identity: {
        displayName: name || localize('UESRPG.Empty.unnamedCharacter'),
        image: actorImage || DEFAULT_PORTRAIT,
        missingMessages: [
          ...(name ? [] : [localize('UESRPG.Messages.missingCharacterName')]),
          ...(actorImage
            ? []
            : [localize('UESRPG.Messages.missingCharacterImage')]),
        ],
      },
      notes: {
        value: String(prose.notes ?? ''),
      },
      skillRows: this.#prepareSkillRows(system.skills),
      hasSkillRows: Array.isArray(system.skills) && system.skills.length > 0,
      overviewListGroups: this.#prepareOverviewListGroups(),
      inventoryGroups: this.#prepareInventoryGroups(),
      magicGroups: this.#prepareMagicGroups(),
      unavailableWorkflowLabel: localize(
        'UESRPG.Placeholders.futureWorkflowUnavailable',
      ),
    };
  }

  protected _processFormData(
    event: SubmitEvent | null,
    form: HTMLFormElement,
    formData: any,
  ): object {
    const submitData = super._processFormData(event, form, formData) as Record<
      string,
      unknown
    >;

    if ('name' in submitData && !String(submitData.name ?? '').trim()) {
      submitData.name = localize('UESRPG.Empty.unnamedCharacter');
    }

    const system = (submitData.system ?? {}) as Record<string, any>;

    system.skills = this.#normalizeSkillEntries(system.skills);
    system.race = this.#normalizeRaceReference(system.race);
    submitData.system = system;

    return submitData;
  }

  async _onRender(context: any, options: any): Promise<void> {
    await super._onRender(context, options);
    this.#syncTabPanelVisibility();
  }

  changeTab(tab: string, group: string, options?: any): void {
    void options;
    (this.tabGroups as Record<string, string>)[group] = tab;
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

  protected async _onAddSkill(): Promise<void> {
    await this.#preserveScrollPosition(async () => {
      await this.submit();

      const system = this.actor.system as Record<string, any>;
      const skills = Array.isArray(system.skills) ? [...system.skills] : [];

      skills.push({
        name: '',
        rank: 0,
        governingCharacteristic: null,
        source: '',
      });

      await this.actor.update({ 'system.skills': skills });
      await this.render();
    });
  }

  protected async _onRemoveSkill(
    event: PointerEvent,
    target: HTMLElement,
  ): Promise<void> {
    const index = Number(target.dataset.index ?? -1);

    if (index < 0) {
      return;
    }

    await this.#preserveScrollPosition(async () => {
      await this.submit();

      const system = this.actor.system as Record<string, any>;
      const skills = Array.isArray(system.skills) ? [...system.skills] : [];

      if (index >= skills.length) {
        return;
      }

      skills.splice(index, 1);

      await this.actor.update({ 'system.skills': skills });
      await this.render();
    });
  }

  protected async _onCreateItem(
    event: PointerEvent,
    target: HTMLElement,
  ): Promise<void> {
    event.preventDefault();

    const type = target.dataset.itemType;

    if (
      !this.isEditable ||
      !type ||
      !Object.values(ITEM_TYPES).includes(type as any)
    ) {
      return;
    }

    await this.#preserveScrollPosition(async () => {
      await this.submit();
      await Item.create(
        {
          name: localize(`UESRPG.Placeholders.new${this.#capitalize(type)}`),
          type: type as any,
        },
        { parent: this.actor } as any,
      );
      await this.render();
    });
  }

  protected _onOpenItem(event: PointerEvent, target: HTMLElement): void {
    event.preventDefault();

    const item = this.#getOwnedItem(target);

    if (!item) {
      return;
    }

    const sheet = item.sheet as { render?: (force?: boolean) => unknown } | null;

    sheet?.render?.(true);
  }

  protected async _onDeleteItem(
    event: PointerEvent,
    target: HTMLElement,
  ): Promise<void> {
    event.preventDefault();

    const item = this.#getOwnedItem(target);

    if (!item || !this.isEditable) {
      return;
    }

    const confirmed = await (
      foundry.applications.api.DialogV2 as {
        confirm: (options: {
          window: { title: string };
          content: string;
        }) => Promise<boolean>;
      }
    ).confirm({
      window: { title: localize('UESRPG.Dialogs.deleteItemTitle') },
      content: `<p>${localize('UESRPG.Dialogs.deleteItemContent')}</p>`,
    });

    if (!confirmed) {
      return;
    }

    await this.#preserveScrollPosition(async () => {
      await this.submit();
      await item.delete();
      await this.render();
    });
  }

  protected async _onToggleEquipped(
    event: PointerEvent,
    target: HTMLElement,
  ): Promise<void> {
    event.preventDefault();

    const item = this.#getOwnedItem(target);

    if (!item || String(item.type) !== ITEM_TYPES.weapon || !this.isEditable) {
      return;
    }

    const system = item.system as Record<string, any>;

    await this.#preserveScrollPosition(async () => {
      await this.submit();
      await item.update({ 'system.equipped': !system.equipped } as any);
      await this.render();
    });
  }

  #prepareSkillRows(skills: unknown): CharacterSkillRow[] {
    if (!Array.isArray(skills)) {
      return [];
    }

    return skills.map((entry, index) => {
      const skill = this.#readSkillEntry(entry);
      const localizedKeyName = skill.key
        ? localize(`UESRPG.Skills.${skill.key}`)
        : '';
      const namePlaceholder =
        localizedKeyName || localize('UESRPG.Empty.unnamedSkill');
      const hasName =
        skill.name.trim().length > 0 || localizedKeyName.length > 0;
      const hasGoverningCharacteristic =
        skill.governingCharacteristic !== null &&
        CHARACTER_CHARACTERISTIC_KEYS.includes(
          skill.governingCharacteristic as any,
        );

      return {
        index,
        key: skill.key ?? '',
        name: skill.name,
        namePlaceholder,
        rank: skill.rank,
        bonus: '00',
        targetNumber: '00',
        unavailableLabel: localize('UESRPG.Placeholders.unavailableUntilEpic3'),
        governingCharacteristic: skill.governingCharacteristic ?? '',
        governingCharacteristicLabel: hasGoverningCharacteristic
          ? localize(`UESRPG.Attributes.${skill.governingCharacteristic}`)
          : localize('UESRPG.Empty.unassigned'),
        source: skill.source,
        governingCharacteristicOptions: this.#buildCharacteristicOptions(
          skill.governingCharacteristic,
        ),
        editable: this.isEditable,
        warnings: [
          ...(hasName ? [] : [localize('UESRPG.Messages.missingSkillName')]),
          ...(hasGoverningCharacteristic
            ? []
            : [localize('UESRPG.Messages.missingSkillCharacteristic')]),
        ],
      };
    });
  }

  #prepareOverviewListGroups(): OverviewListGroup[] {
    return [
      this.#prepareItemGroup(
        'traits',
        ITEM_TYPES.trait,
        localize('UESRPG.Sections.traits'),
        localize('UESRPG.Empty.traits'),
      ),
      this.#prepareItemGroup(
        'powers',
        ITEM_TYPES.power,
        localize('UESRPG.Sections.powers'),
        localize('UESRPG.Empty.powers'),
      ),
      this.#prepareEffectsGroup(),
    ];
  }

  #prepareInventoryGroups(): CharacterItemGroup[] {
    return [
      this.#prepareItemManagementGroup({
        key: 'weapons',
        type: ITEM_TYPES.weapon,
        label: localize('UESRPG.Sections.weapons'),
        emptyLabel: localize('UESRPG.Empty.weapons'),
        manualFallbackLabel: '',
      }),
      {
        key: 'future-items',
        label: localize('UESRPG.Sections.futureInventoryTypes'),
        emptyLabel: localize('UESRPG.Empty.futureInventoryTypes'),
        manualFallbackLabel: localize('UESRPG.Messages.manualFallbackRequired'),
        createType: '',
        canCreate: false,
        entries: [],
      },
    ];
  }

  #prepareMagicGroups(): CharacterItemGroup[] {
    return [
      this.#prepareItemManagementGroup({
        key: 'powers',
        type: ITEM_TYPES.power,
        label: localize('UESRPG.Sections.powers'),
        emptyLabel: localize('UESRPG.Empty.magic'),
        manualFallbackLabel: localize('UESRPG.Messages.magicManualFallback'),
      }),
      {
        key: 'future-magic',
        label: localize('UESRPG.Sections.futureMagicTypes'),
        emptyLabel: localize('UESRPG.Empty.futureMagicTypes'),
        manualFallbackLabel: localize('UESRPG.Messages.manualFallbackRequired'),
        createType: '',
        canCreate: false,
        entries: [],
      },
    ];
  }

  #prepareItemManagementGroup(options: {
    key: string;
    type: string;
    label: string;
    emptyLabel: string;
    manualFallbackLabel: string;
  }): CharacterItemGroup {
    const entries = this.actor.items
      .filter((item: Item) => item.type === options.type)
      .map((item: Item) => this.#prepareItemRow(item));

    return {
      key: options.key,
      label: options.label,
      emptyLabel: options.emptyLabel,
      manualFallbackLabel: options.manualFallbackLabel,
      createType: options.type,
      canCreate: this.isEditable,
      entries,
    };
  }

  #prepareItemRow(item: Item): CharacterItemRow {
    const system = item.system as Record<string, any>;
    const name = String(item.name ?? '').trim();
    const fields = this.#prepareItemFields(item, system);

    return {
      id: item.id ?? '',
      name: name || localize('UESRPG.Empty.unnamedItem'),
      typeLabel: localize(`UESRPG.Item.${String(item.type)}`),
      fields,
      warnings: [
        ...(name ? [] : [localize('UESRPG.Messages.missingListEntryName')]),
        ...fields
          .filter((field) => field.isMissing)
          .map((field) =>
            localize('UESRPG.Messages.missingItemField', {
              field: field.label,
            }),
          ),
      ],
      equipped: !!system.equipped,
      equippedLabel: system.equipped
        ? localize('UESRPG.Fields.equipped')
        : localize('UESRPG.Fields.carried'),
      canOpen: true,
      canDelete: this.isEditable,
      canToggleEquipped: this.isEditable && String(item.type) === ITEM_TYPES.weapon,
    };
  }

  #prepareItemFields(
    item: Item,
    system: Record<string, any>,
  ): CharacterItemField[] {
    if (String(item.type) === ITEM_TYPES.weapon) {
      return [
        this.#prepareNumberField('quantity', system.quantity, 1),
        this.#prepareNumberField('encumbrance', system.encumbrance, 0),
        this.#prepareTextField('damage', system.damage),
        this.#prepareTextField('range', system.range),
      ];
    }

    if (String(item.type) === ITEM_TYPES.power) {
      return [this.#prepareTextField('source', system.source)];
    }

    return [this.#prepareTextField('category', system.source)];
  }

  #prepareNumberField(
    key: string,
    value: unknown,
    fallback: number,
  ): CharacterItemField {
    const numericValue = Number(value);
    const hasValue = Number.isFinite(numericValue);

    return {
      label: localize(`UESRPG.Fields.${key}`),
      value: String(hasValue ? numericValue : fallback),
      isMissing: !hasValue,
    };
  }

  #prepareTextField(key: string, value: unknown): CharacterItemField {
    const text = String(value ?? '').trim();

    return {
      label: localize(`UESRPG.Fields.${key}`),
      value: text || localize('UESRPG.Empty.unassigned'),
      isMissing: text.length === 0,
    };
  }

  #prepareItemGroup(
    key: string,
    itemType: string,
    label: string,
    emptyLabel: string,
  ): OverviewListGroup {
    const entries = this.actor.items
      .filter((item: Item) => item.type === itemType)
      .map((item: Item) => ({
        name:
          String(item.name ?? '').trim() ||
          localize('UESRPG.Empty.unnamedItem'),
        meta: localize(`UESRPG.Item.${itemType}`),
        warnings: String(item.name ?? '').trim()
          ? []
          : [localize('UESRPG.Messages.missingListEntryName')],
      }));

    return { key, label, emptyLabel, entries };
  }

  #prepareEffectsGroup(): OverviewListGroup {
    const effects = this.actor.effects?.contents ?? [];
    const entries = effects.map((effect: ActiveEffect) => ({
      name:
        String(effect.name ?? '').trim() ||
        localize('UESRPG.Empty.unnamedEffect'),
      meta: effect.disabled
        ? localize('UESRPG.Fields.disabled')
        : localize('UESRPG.Fields.active'),
      warnings: String(effect.name ?? '').trim()
        ? []
        : [localize('UESRPG.Messages.missingListEntryName')],
    }));

    return {
      key: 'effects',
      label: localize('UESRPG.Sections.effects'),
      emptyLabel: localize('UESRPG.Empty.effects'),
      entries,
    };
  }

  #buildCharacteristicOptions(selectedValue: string | null): SelectOption[] {
    return [
      {
        value: '',
        label: localize('UESRPG.Empty.unassigned'),
        selected: selectedValue === null,
      },
      ...CHARACTER_CHARACTERISTIC_KEYS.map((value) => ({
        value,
        label: localize(`UESRPG.Attributes.${value}`),
        selected: value === selectedValue,
      })),
    ];
  }

  #prepareRaceDisplay(race: unknown): CharacterRaceDisplay {
    const normalizedRace = this.#normalizeRaceReference(race);

    return {
      uuid: normalizedRace.uuid ?? '',
      name: normalizedRace.name,
      placeholder: localize('UESRPG.Empty.race'),
      label: localize('UESRPG.Fields.race'),
      editable: this.isEditable,
    };
  }

  #prepareSheetTabs(tabs: Record<string, any>): CharacterSheetTab[] {
    return CharacterSheet.TABS.primary.tabs.map((definition) => {
      const id = definition.id;
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

    const activeTab =
      this.tabGroups.primary ?? CharacterSheet.TABS.primary.initial;
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

  #normalizeSkillEntries(skills: unknown): NormalizedSkillEntry[] {
    const entries = Array.isArray(skills)
      ? skills
      : skills && typeof skills === 'object'
        ? Object.entries(skills)
            .sort(([left], [right]) => Number(left) - Number(right))
            .map(([, value]) => value)
        : [];

    return entries.map((entry) => this.#readSkillEntry(entry));
  }

  #readSkillEntry(entry: unknown): NormalizedSkillEntry {
    const skill =
      entry && typeof entry === 'object' && !Array.isArray(entry)
        ? (entry as CharacterSkillEntry)
        : {};
    const governingCharacteristic = this.#normalizeCharacteristic(
      skill.governingCharacteristic,
    );
    const rank = Number(skill.rank ?? 0);

    return {
      name: String(skill.name ?? '').trim(),
      key: this.#normalizeOptionalText(skill.key),
      rank: Number.isFinite(rank) ? Math.max(0, Math.trunc(rank)) : 0,
      governingCharacteristic,
      source: String(skill.source ?? '').trim(),
    };
  }

  #normalizeRaceReference(race: unknown): NormalizedRaceReference {
    const reference =
      race && typeof race === 'object' && !Array.isArray(race)
        ? (race as CharacterRaceReference)
        : {};

    return {
      uuid: this.#normalizeOptionalText(reference.uuid),
      name: String(reference.name ?? '').trim(),
    };
  }

  #normalizeCharacteristic(value: unknown): string | null {
    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }

    const normalizedValue = value.trim();

    return CHARACTER_CHARACTERISTIC_KEYS.includes(normalizedValue as any)
      ? normalizedValue
      : null;
  }

  #normalizeOptionalText(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const trimmedValue = value.trim();

    return trimmedValue.length > 0 ? trimmedValue : null;
  }

  #getOwnedItem(target: HTMLElement): Item | null {
    const itemId = target.dataset.itemId;

    if (!itemId) {
      return null;
    }

    return this.actor.items.get(itemId) ?? null;
  }

  #capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
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
}
