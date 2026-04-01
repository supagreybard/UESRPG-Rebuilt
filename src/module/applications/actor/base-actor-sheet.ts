import { LABELS, SYSTEM_ID } from '../../config/constants';
import { localize } from '../../utils/localization';

type CharacteristicField = {
    key: string;
    label: string;
    value: number;
};

type ResourceField = {
    key: string;
    label: string;
    value: number;
    max: number;
};

const { HandlebarsApplicationMixin } = foundry.applications.api;
const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2 as any;
const ActorHandlebarsSheet = HandlebarsApplicationMixin(ActorSheetV2) as any;

export class BaseActorSheet extends ActorHandlebarsSheet {
    static DEFAULT_OPTIONS = {
        classes: [SYSTEM_ID, 'sheet', 'actor'],
        position: {
            width: 720,
            height: 640,
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
        const system = this.actor.system as Record<string, any>;
        const actorType = this.actor.type as keyof typeof LABELS.actorTypes;

        return {
            ...context,
            actor: this.actor,
            editable: this.isEditable,
            system,
            typeLabel: localize(LABELS.actorTypes[actorType]),
            resourceFields: this.#prepareResources(system),
            characteristicFields: this.#prepareCharacteristics(system),
        };
    }

    #prepareResources(system: Record<string, any>): ResourceField[] {
        const resources = system.resources ?? {};

        return [
            {
                key: 'health',
                label: localize('UESRPG.Fields.health'),
                value: Number(resources.health?.value ?? 0),
                max: Number(resources.health?.max ?? 0),
            },
            {
                key: 'stamina',
                label: localize('UESRPG.Fields.stamina'),
                value: Number(resources.stamina?.value ?? 0),
                max: Number(resources.stamina?.max ?? 0),
            },
            {
                key: 'magicka',
                label: localize('UESRPG.Fields.magicka'),
                value: Number(resources.magicka?.value ?? 0),
                max: Number(resources.magicka?.max ?? 0),
            },
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
