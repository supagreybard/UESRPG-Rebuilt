import { SYSTEM_ID, SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseRuleItemSheet } from './BaseRuleItemSheet';

type CharacteristicField = {
    key: string;
    label: string;
    value: number;
};

type RaceGrantParameterField = {
    index: number;
    id: string;
    type: string;
    value: string;
};

type RaceGrantField = {
    index: number;
    type: string;
    slug: string | null;
    sourceUuid: string | null;
    sourceName: string | null;
    optionGroup: string | null;
    parameterFields: RaceGrantParameterField[];
    hasParameters: boolean;
    isBroken: boolean;
    isResolved: boolean;
    displayName: string;
};

export class RaceItemSheet extends BaseRuleItemSheet {
    static readonly GRANT_DROP_SELECTOR = '[data-race-grant-drop-zone]';

    static override DEFAULT_OPTIONS: any = foundry.utils.mergeObject(
        super.DEFAULT_OPTIONS,
        {
            classes: [SYSTEM_ID, 'sheet', 'item', 'item-race'],
            actions: {
                activateTab: RaceItemSheet.prototype._onActivateTab,
                removeGrant: RaceItemSheet.prototype._onRemoveGrant,
            },
        },
    );

    static override TABS = {
        primary: {
            initial: 'system',
            labelPrefix: 'UESRPG.Tabs',
            tabs: [
                { id: 'details' },
                { id: 'system' },
                { id: 'grants' },
                { id: 'prose' },
            ],
        },
    };

    static override PARTS = {
        ...super.PARTS,
        sheet: {
            ...super.PARTS.sheet,
            templates: [
                ...super.PARTS.sheet.templates,
                `${SYSTEM_PATH}/templates/item/race-item-sheet-system.hbs`,
                `${SYSTEM_PATH}/templates/item/race-item-sheet-grants.hbs`,
            ],
        },
        system: {
            template: `${SYSTEM_PATH}/templates/item/race-item-sheet-system.hbs`,
            id: 'system',
            classes: ['uesrpg-rebuilt-race-sheet__part'],
        },
        grants: {
            template: `${SYSTEM_PATH}/templates/item/race-item-sheet-grants.hbs`,
            id: 'grants',
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
            grantFields: await this.#prepareGrantFields(system.grants),
            hasGrants: Array.isArray(system.grants) && system.grants.length > 0,
        };
    }

    override async _onRender(context: any, options: any): Promise<void> {
        await super._onRender(context, options);
        this.#activateGrantDropZone();
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
        const rawGrants = system.grants;
        const entries = Array.isArray(rawGrants)
            ? rawGrants
            : rawGrants && typeof rawGrants === 'object'
                ? Object.entries(rawGrants)
                    .sort(([left], [right]) => Number(left) - Number(right))
                    .map(([, value]) => value)
                : [];

        system.grants = entries
            .map((entry) => this.#normalizeGrantEntry(entry))
            .filter(
                (
                    entry,
                ): entry is {
                    parameters: Array<{ id: string; value: string }>;
                } & Record<string, unknown> => entry !== null,
            );
        data.system = system;

        return data;
    }

    protected override _getSheetTitleKey(): string {
        return 'UESRPG.Sheets.race';
    }

    protected override _getContentSectionOrder(): string[] {
        return ['details', 'system', 'grants', 'prose'];
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

    protected async _onRemoveGrant(
        event: PointerEvent,
        target: HTMLElement,
    ): Promise<void> {
        const index = Number(target.dataset.index ?? -1);

        if (index < 0) {
            return;
        }

        await this.submit();

        const system = this.item.system as Record<string, any>;
        const grants = Array.isArray(system.grants) ? [...system.grants] : [];

        if (index >= grants.length) {
            return;
        }

        grants.splice(index, 1);

        await this.item.update({
            'system.grants': grants,
        });
        await this.render({ parts: ['grants'] });
        event.preventDefault();
    }

    protected _canDragDrop(selector: string): boolean {
        return this.isEditable && selector === RaceItemSheet.GRANT_DROP_SELECTOR;
    }

    protected _onDragOver(event: DragEvent): void {
        if (!this.#isGrantDropTarget(event.target)) {
            return;
        }

        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
    }

    protected async _onDrop(event: DragEvent): Promise<void> {
        if (!this.#isGrantDropTarget(event.target)) {
            return;
        }

        event.preventDefault();

        const dropData = TextEditor.getDragEventData(event);
        const uuid = this.#readDropUuid(dropData);

        if (uuid === null) {
            this.#warn('UESRPG.Messages.invalidGrantDrop');
            return;
        }

        const document = await fromUuid(uuid);

        await this._onDropDocument(event, document);
    }

    protected async _onDropDocument(
        event: DragEvent,
        document: foundry.abstract.Document.Any | null,
    ): Promise<void> {
        if (!this.#isGrantDropTarget(event.target)) {
            return;
        }

        if (!(document instanceof Item)) {
            this.#warn('UESRPG.Messages.invalidGrantDrop');
            return;
        }

        const type = String(document.type);

        if (type !== 'trait' && type !== 'power') {
            this.#warn('UESRPG.Messages.invalidGrantDrop');
            return;
        }

        const system = document.system as Record<string, unknown>;
        const slug = this.#normalizeOptionalText(system.slug);

        if (slug === null) {
            this.#warn('UESRPG.Messages.missingGrantSlug');
            return;
        }

        await this.submit();

        const grants = this.#readGrantEntries(
            (this.item.system as Record<string, unknown>).grants,
        );

        if (
            grants.some(
                (grant) =>
                    this.#normalizeOptionalText(grant.sourceUuid) === document.uuid,
            )
        ) {
            this.#warn('UESRPG.Messages.duplicateGrant');
            return;
        }

        grants.push({
            type,
            slug,
            sourceUuid: document.uuid,
            sourceName: document.name,
            optionGroup: null,
            parameters: this.#readGrantOverrideParameters(system.parameters),
        });

        await this.item.update({
            'system.grants': grants,
        });
        await this.render({ parts: ['grants'] });
    }

    #prepareCharacteristics(system: Record<string, any>): CharacteristicField[] {
        const characteristics = system.characteristics ?? {};

        return Object.entries(characteristics).map(([key, value]) => ({
            key,
            label: localize(`UESRPG.Attributes.${key}`),
            value: Number(value ?? 0),
        }));
    }

    async #prepareGrantFields(grants: unknown): Promise<RaceGrantField[]> {
        const entries = this.#readGrantEntries(grants);

        return Promise.all(
            entries.map((entry, index) => this.#prepareGrantField(entry, index)),
        );
    }

    async #prepareGrantField(
        entry: Record<string, unknown>,
        index: number,
    ): Promise<RaceGrantField> {
        const grant = this.#readRecord(entry);
        const storedType = this.#readGrantType(grant.type);
        const storedSlug = this.#normalizeOptionalText(grant.slug);
        const sourceUuid = this.#normalizeOptionalText(grant.sourceUuid);
        const sourceName = this.#normalizeOptionalText(grant.sourceName);
        const optionGroup = this.#normalizeOptionalText(grant.optionGroup);
        const overrides = this.#prepareGrantOverrideMap(grant.parameters);
        const sourceItem = await this.#resolveGrantSource(sourceUuid);

        if (!(sourceItem instanceof Item)) {
            return {
                index,
                type: storedType,
                slug: storedSlug,
                sourceUuid,
                sourceName,
                optionGroup,
                parameterFields: [],
                hasParameters: false,
                isBroken: true,
                isResolved: false,
                displayName:
                    sourceName ??
                    storedSlug ??
                    localize('UESRPG.Messages.missingGrantSource'),
            };
        }

        const sourceSystem = sourceItem.system as Record<string, unknown>;
        const parameterFields = this.#prepareResolvedGrantParameterFields(
            sourceSystem.parameters,
            overrides,
        );

        return {
            index,
            type: String(sourceItem.type),
            slug: this.#normalizeOptionalText(sourceSystem.slug) ?? storedSlug,
            sourceUuid: sourceItem.uuid,
            sourceName: sourceItem.name,
            optionGroup,
            parameterFields,
            hasParameters: parameterFields.length > 0,
            isBroken: false,
            isResolved: true,
            displayName: sourceItem.name,
        };
    }

    #prepareResolvedGrantParameterFields(
        parameters: unknown,
        overrides: Map<string, string>,
    ): RaceGrantParameterField[] {
        if (!Array.isArray(parameters)) {
            return [];
        }

        return parameters.flatMap((entry, index) => {
            const parameter = this.#readRecord(entry);
            const id = this.#normalizeOptionalText(parameter.id);

            if (id === null) {
                return [];
            }

            return [
                {
                    index,
                    id,
                    type: this.#readGrantParameterType(parameter.type),
                    value: overrides.get(id) ?? String(parameter.value ?? ''),
                },
            ];
        });
    }

    #prepareGrantOverrideMap(parameters: unknown): Map<string, string> {
        const overrides = new Map<string, string>();

        for (const entry of this.#readGrantParameterEntries(parameters)) {
            const parameter = this.#normalizeGrantParameterEntry(entry);

            if (parameter) {
                overrides.set(parameter.id, parameter.value);
            }
        }

        return overrides;
    }

    #normalizeGrantEntry(entry: unknown):
        | (Record<string, unknown> & {
            parameters: Array<{ id: string; value: string }>;
        })
        | null {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
            return null;
        }

        const record = entry as Record<string, unknown>;
        const parameterEntries = this.#readGrantParameterEntries(record.parameters);

        return {
            type: this.#readGrantType(record.type),
            slug: this.#normalizeOptionalText(record.slug),
            sourceUuid: this.#normalizeOptionalText(record.sourceUuid),
            sourceName: this.#normalizeOptionalText(record.sourceName),
            optionGroup: this.#normalizeOptionalText(record.optionGroup),
            parameters: parameterEntries
                .map((parameter) => this.#normalizeGrantParameterEntry(parameter))
                .filter(
                    (parameter): parameter is { id: string; value: string } =>
                        parameter !== null,
                ),
        };
    }

    #readGrantEntries(grants: unknown): Record<string, unknown>[] {
        if (Array.isArray(grants)) {
            return grants.map((entry) => this.#readRecord(entry));
        }

        if (grants && typeof grants === 'object') {
            return Object.entries(grants)
                .sort(([left], [right]) => Number(left) - Number(right))
                .map(([, value]) => this.#readRecord(value));
        }

        return [];
    }

    #readGrantParameterEntries(parameters: unknown): unknown[] {
        if (Array.isArray(parameters)) {
            return parameters;
        }

        if (parameters && typeof parameters === 'object') {
            return Object.entries(parameters)
                .sort(([left], [right]) => Number(left) - Number(right))
                .map(([, value]) => value);
        }

        return [];
    }

    #readGrantOverrideParameters(
        parameters: unknown,
    ): Array<{ id: string; value: string }> {
        if (!Array.isArray(parameters)) {
            return [];
        }

        return parameters.flatMap((entry) => {
            const parameter = this.#readRecord(entry);
            const id = this.#normalizeOptionalText(parameter.id);

            if (id === null) {
                return [];
            }

            return [
                {
                    id,
                    value: String(parameter.value ?? ''),
                },
            ];
        });
    }

    #readGrantParameterType(value: unknown): string {
        return typeof value === 'string' && value.trim().length > 0
            ? value.trim()
            : 'text';
    }

    #normalizeGrantParameterEntry(
        entry: unknown,
    ): { id: string; value: string } | null {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
            return null;
        }

        const record = entry as Record<string, unknown>;
        const id = this.#normalizeOptionalText(record.id);

        if (id === null) {
            return null;
        }

        return {
            id,
            value: String(record.value ?? ''),
        };
    }

    #readGrantType(value: unknown): string {
        return typeof value === 'string' && value.trim().length > 0
            ? value.trim()
            : 'trait';
    }

    #normalizeOptionalText(value: unknown): string | null {
        if (typeof value !== 'string') {
            return null;
        }

        const trimmedValue = value.trim();

        return trimmedValue.length > 0 ? trimmedValue : null;
    }

    #readRecord(value: unknown): Record<string, unknown> {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value as Record<string, unknown>;
        }

        return {};
    }

    #readDropUuid(dropData: unknown): string | null {
        if (!dropData || typeof dropData !== 'object' || Array.isArray(dropData)) {
            return null;
        }

        const uuid = (dropData as Record<string, unknown>).uuid;

        return typeof uuid === 'string' && uuid.trim().length > 0 ? uuid : null;
    }

    async #resolveGrantSource(sourceUuid: string | null): Promise<unknown> {
        if (sourceUuid === null) {
            return null;
        }

        return fromUuid(sourceUuid);
    }

    #isGrantDropTarget(target: EventTarget | null): boolean {
        return (
            target instanceof Element &&
            target.closest(RaceItemSheet.GRANT_DROP_SELECTOR) !== null
        );
    }

    #warn(key: string): void {
        ui.notifications?.warn(localize(key));
    }

    #activateGrantDropZone(): void {
        const element = this.element as HTMLElement | null | undefined;

        if (!element) {
            return;
        }

        for (const dropZone of Array.from(
            element.querySelectorAll(RaceItemSheet.GRANT_DROP_SELECTOR),
        )) {
            if (!(dropZone instanceof HTMLElement)) {
                continue;
            }

            dropZone.addEventListener('dragover', (event) => {
                void this._onDragOver(event);
            });
            dropZone.addEventListener('drop', (event) => {
                void this._onDrop(event);
            });
        }
    }
}
