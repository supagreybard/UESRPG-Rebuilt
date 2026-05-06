import { defineParameterOverride } from "../../shared-definitions/parameters";
import { BaseItemData } from "../BaseItemData";

const fields = foundry.data.fields;

export class WeaponMaterialData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            damage: new fields.StringField({ initial: '1d6', blank: false }),
            range: new fields.StringField({ initial: 'melee', blank: false }),
            damageMod: new fields.NumberField({ integer: true }),
            qualities: new fields.ArrayField(
                new fields.SchemaField(defineParameterOverride()),
                {
                    initial: [],
                },
            ),
        };
    }
}
