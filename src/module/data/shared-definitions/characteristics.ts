const fields = foundry.data.fields;

export const defineBaseCharacteristics = () => ({
    strength: new fields.NumberField({ initial: 0, integer: true }),
    endurance: new fields.NumberField({ initial: 0, integer: true }),
    agility: new fields.NumberField({ initial: 0, integer: true }),
    intelligence: new fields.NumberField({ initial: 0, integer: true }),
    willpower: new fields.NumberField({ initial: 0, integer: true }),
    perception: new fields.NumberField({ initial: 0, integer: true }),
    personality: new fields.NumberField({ initial: 0, integer: true }),
});

export const definePcCharacteristics = () => ({
    ...defineBaseCharacteristics(),
    luck: new fields.NumberField({ initial: 0, integer: true }),
});

export const defineNpcCharacteristics = () => ({
    ...defineBaseCharacteristics(),
    morale: new fields.NumberField({ initial: 0, integer: true }),
})
