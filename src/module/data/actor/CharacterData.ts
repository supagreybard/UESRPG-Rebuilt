import { defineCharacterCharacteristics } from '../shared/characteristics';
import { BaseActorData } from './BaseActorData';

const fields = foundry.data.fields;

export class CharacterData extends BaseActorData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      characteristics: new fields.SchemaField(defineCharacterCharacteristics()),
      experience: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
    };
  }
}
