import { BaseRuleItem } from './BaseRuleItem';

const fields = foundry.data.fields;

export class TraitData extends BaseRuleItem {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      slug: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
      }),
      active: new fields.BooleanField({ initial: true }),
      qualifier: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
      }),
      value: new fields.NumberField({
        required: false,
        nullable: true,
        initial: null,
      }),
      secondaryValue: new fields.NumberField({
        required: false,
        nullable: true,
        initial: null,
      }),
      formula: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
      }),
      weaponProfile: new fields.SchemaField({
        type: new fields.StringField({
          required: false,
          nullable: true,
          initial: null,
        }),
        damage: new fields.StringField({
          required: false,
          nullable: true,
          initial: null,
        }),
        range: new fields.StringField({
          required: false,
          nullable: true,
          initial: null,
        }),
      }),
      source: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
      }),
      temporary: new fields.BooleanField({ initial: false }),
      durationText: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
      }),
    };
  }
}
