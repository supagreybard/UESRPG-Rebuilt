import {
  CHARACTER_CHARACTERISTIC_KEYS,
  defineCharacterCharacteristics,
} from '../shared/characteristics';
import { BaseActorData } from './BaseActorData';

const fields = foundry.data.fields;

const DEFAULT_CHARACTER_SKILLS = [
  { key: 'acrobatics', governingCharacteristic: 'strength', source: 'core' },
  { key: 'alchemy', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'athletics', governingCharacteristic: 'strength', source: 'core' },
  { key: 'command', governingCharacteristic: 'strength', source: 'core' },
  { key: 'commerce', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'deceive', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'enchant', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'evade', governingCharacteristic: 'agility', source: 'core' },
  {
    key: 'investigate',
    governingCharacteristic: 'intelligence',
    source: 'core',
  },
  { key: 'logic', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'lore', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'navigate', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'observe', governingCharacteristic: 'perception', source: 'core' },
  { key: 'persuade', governingCharacteristic: 'personality', source: 'core' },
  { key: 'ride', governingCharacteristic: 'agility', source: 'core' },
  { key: 'stealth', governingCharacteristic: 'agility', source: 'core' },
  { key: 'subterfuge', governingCharacteristic: 'agility', source: 'core' },
  { key: 'survival', governingCharacteristic: 'intelligence', source: 'core' },
  { key: 'combatStyle', governingCharacteristic: 'strength', source: 'core' },
  { key: 'alteration', governingCharacteristic: 'willpower', source: 'core' },
  { key: 'conjuration', governingCharacteristic: 'willpower', source: 'core' },
  { key: 'destruction', governingCharacteristic: 'willpower', source: 'core' },
  { key: 'illusion', governingCharacteristic: 'willpower', source: 'core' },
  { key: 'mysticism', governingCharacteristic: 'willpower', source: 'core' },
  {
    key: 'necromancy',
    governingCharacteristic: 'intelligence',
    source: 'core',
  },
  { key: 'restoration', governingCharacteristic: 'willpower', source: 'core' },
];

const defineCharacterSkill = () => ({
  key: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
  }),
  name: new fields.StringField({ initial: '' }),
  rank: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
  governingCharacteristic: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
    choices: [...CHARACTER_CHARACTERISTIC_KEYS],
  }),
  source: new fields.StringField({ initial: '' }),
});

const defineCharacterRaceReference = () => ({
  uuid: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
  }),
  name: new fields.StringField({ initial: '' }),
});

export class CharacterData extends BaseActorData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      race: new fields.SchemaField(defineCharacterRaceReference()),
      characteristics: new fields.SchemaField(defineCharacterCharacteristics()),
      skills: new fields.ArrayField(
        new fields.SchemaField(defineCharacterSkill()),
        {
          initial: () =>
            DEFAULT_CHARACTER_SKILLS.map((skill) => ({
              ...skill,
              name: '',
              rank: 0,
            })),
        },
      ),
      experience: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
    };
  }
}
