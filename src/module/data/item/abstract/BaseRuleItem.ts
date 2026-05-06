import type { DataSchema } from '../../util/fields';
import { BaseItemData, type BaseItemSchema } from './BaseItem';

export type BaseRuleItemSchema = BaseItemSchema;

export abstract class BaseRuleItemData<T extends DataSchema | undefined> extends BaseItemData<T> {
    static defineSchema() {
        return {
            ...super.defineSchema(),
        }
    }
}
