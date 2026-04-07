import { defineBaseCharacteristics } from '../shared-definitions/characteristics';
import { defineGrant } from '../shared-definitions/grants';
import { BaseRuleItemData } from './BaseRuleItemData';

const fields = foundry.data.fields;

export class RaceData extends BaseRuleItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            characteristics: new fields.SchemaField(defineBaseCharacteristics(), { required: true }),
            grants: new fields.ArrayField(new fields.SchemaField(defineGrant())),
        };
    }
}
