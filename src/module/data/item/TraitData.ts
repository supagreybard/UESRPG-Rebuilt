import { TRAIT_STACK_MODES } from '../../config/constants';
import { defineParameter } from '../shared-definitions/parameters';
import { BaseRuleItemData } from './BaseRuleItemData';

const fields = foundry.data.fields;


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
