import { BaseRuleItemData } from './BaseRuleItemData';

const fields = foundry.data.fields;

export class SkillData extends BaseRuleItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            rank: new fields.NumberField({ min: 0, max: 5 })
        };
    }
}
