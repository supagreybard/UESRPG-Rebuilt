const fields = foundry.data.fields;

export const BASE_CHARACTERISTIC_KEYS = [
  'strength',
  'endurance',
  'agility',
  'intelligence',
  'willpower',
  'perception',
  'personality',
] as const;

export const CHARACTER_CHARACTERISTIC_KEYS = [
  ...BASE_CHARACTERISTIC_KEYS,
  'luck',
] as const;

export const NPC_CHARACTERISTIC_KEYS = [
  ...BASE_CHARACTERISTIC_KEYS,
  'morale',
] as const;

const defineNumberCharacteristic = () =>
  new fields.NumberField({ initial: 0, integer: true });

export const defineBaseCharacteristics = () =>
  Object.fromEntries(
    BASE_CHARACTERISTIC_KEYS.map((key) => [key, defineNumberCharacteristic()]),
  );

export const defineCharacterCharacteristics = () => ({
  ...defineBaseCharacteristics(),
  luck: defineNumberCharacteristic(),
});

export const defineNpcCharacteristics = () => ({
  ...defineBaseCharacteristics(),
  morale: defineNumberCharacteristic(),
});
