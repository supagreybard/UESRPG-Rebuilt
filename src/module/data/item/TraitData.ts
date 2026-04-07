import { PARAMETER_TYPES, TRAIT_STACK_MODES } from '../../config/constants';
import { BaseRuleItemData } from './BaseRuleItemData';

const fields = foundry.data.fields;

export const defineParameter = () => ({
  type: new fields.StringField({
    choices: Object.keys(PARAMETER_TYPES),
    initial: PARAMETER_TYPES.text,
    required: true,
  }),
  value: new fields.StringField({ initial: '' }),
});

export class TraitData extends BaseRuleItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      parameters: new fields.ArrayField(
        new fields.SchemaField(defineParameter()),
        {
          initial: [],
        },
      ),
      event: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
      }),
      stackMode: new fields.StringField({
        choices: Object.keys(TRAIT_STACK_MODES),
        initial: TRAIT_STACK_MODES.single,
        required: true,
      }),
      logic: new fields.JavaScriptField({
        required: false,
        nullable: true,
        initial: null,
      }),
    };
  }
}
