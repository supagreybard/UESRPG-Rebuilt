import { defineNpcCharacteristics } from '../shared/characteristics';
import { BaseActorData } from './BaseActorData';

const fields = foundry.data.fields;

export class NPCData extends BaseActorData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      characteristics: new fields.SchemaField(defineNpcCharacteristics()),
    };
  }
}
