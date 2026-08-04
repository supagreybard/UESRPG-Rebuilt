import { LABELS, SYSTEM_ID } from '../../config/constants';
import {
  CHARACTER_CHARACTERISTIC_KEYS,
  NPC_CHARACTERISTIC_KEYS,
} from '../../data/shared/characteristics';
import { localize } from '../../utils/localization';

type CharacteristicField = {
  key: string;
  label: string;
  value: number;
  editable: boolean;
  warnings: string[];
};

type ResourceField = {
  key: string;
  label: string;
  value: number;
  max: number;
  displayValue: string;
  displayMax: string;
  fillPercent: number;
  valueLabel: string;
  maxLabel: string;
  editable: boolean;
  warnings: string[];
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
      experience: Number(system.experience ?? 0),
      typeLabel: localize(LABELS.actorTypes[actorType]),
      resourceFields: this.#prepareResources(system),
      characteristicFields: this.#prepareCharacteristics(system),
    };
  }

  #prepareResources(system: Record<string, any>): ResourceField[] {
    const resources = system.resources ?? {};
    const valueLabel = localize('UESRPG.Fields.current');
    const maxLabel = localize('UESRPG.Fields.max');

    return ['health', 'stamina', 'magicka'].map((key) => {
      const resource = resources[key] as Record<string, unknown> | undefined;
      const value = this.#numericFallback(resource?.value);
      const max = this.#numericFallback(resource?.max);
      const warnings = [
        ...(resource ? [] : [localize('UESRPG.Messages.missingResourceData')]),
        ...(Number.isFinite(Number(resource?.value))
          ? []
          : [localize('UESRPG.Messages.missingResourceValue')]),
        ...(Number.isFinite(Number(resource?.max))
          ? []
          : [localize('UESRPG.Messages.missingResourceMax')]),
      ];

      return {
        key,
        label: localize(`UESRPG.Fields.${key}`),
        value,
        max,
        displayValue: String(value),
        displayMax: String(max),
        fillPercent: this.#resourceFillPercent(value, max),
        valueLabel,
        maxLabel,
        editable: this.isEditable,
        warnings,
      };
    });
  }

  #prepareCharacteristics(system: Record<string, any>): CharacteristicField[] {
    const characteristics = system.characteristics ?? {};
    const actorType = this.actor.type as string;
    const keys =
      actorType === 'npc'
        ? NPC_CHARACTERISTIC_KEYS
        : CHARACTER_CHARACTERISTIC_KEYS;

    return keys.map((key) => {
      const rawValue = characteristics[key];
      const hasValue = Number.isFinite(Number(rawValue));
      const value = this.#numericFallback(rawValue);

      return {
        key,
        label: localize(`UESRPG.Attributes.${key}`),
        value,
        editable: this.isEditable,
        warnings: hasValue
          ? []
          : [localize('UESRPG.Messages.missingCharacteristicValue')],
      };
    });
  }

  #numericFallback(value: unknown): number {
    const numericValue = Number(value);

    return Number.isFinite(numericValue) ? numericValue : 0;
  }

  #resourceFillPercent(current: number, max: number): number {
    if (max <= 0) return 0;

    return Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  }
}
