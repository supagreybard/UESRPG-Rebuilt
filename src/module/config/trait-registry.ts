export type TraitValueShape =
  | 'none'
  | 'value'
  | 'qualifierValue'
  | 'qualifier'
  | 'weaponProfile';

export type TraitStackMode = 'single' | 'highest' | 'sum' | 'distinctQualifier';

export type SupportedTraitDefinition = {
  slug: string;
  valueShape: TraitValueShape;
  stackMode: TraitStackMode;
};

export const SUPPORTED_TRAITS = {
  'power-well': {
    slug: 'power-well',
    valueShape: 'value',
    stackMode: 'sum',
  },
  resistance: {
    slug: 'resistance',
    valueShape: 'qualifierValue',
    stackMode: 'highest',
  },
  weakness: {
    slug: 'weakness',
    valueShape: 'qualifierValue',
    stackMode: 'highest',
  },
  immunity: {
    slug: 'immunity',
    valueShape: 'qualifier',
    stackMode: 'distinctQualifier',
  },
  tough: {
    slug: 'tough',
    valueShape: 'value',
    stackMode: 'highest',
  },
  'natural-toughness': {
    slug: 'natural-toughness',
    valueShape: 'value',
    stackMode: 'highest',
  },
  'disease-resistance': {
    slug: 'disease-resistance',
    valueShape: 'value',
    stackMode: 'highest',
  },
  'spell-absorption': {
    slug: 'spell-absorption',
    valueShape: 'value',
    stackMode: 'highest',
  },
  'resist-normal-weapons': {
    slug: 'resist-normal-weapons',
    valueShape: 'value',
    stackMode: 'highest',
  },
  'natural-weapons': {
    slug: 'natural-weapons',
    valueShape: 'weaponProfile',
    stackMode: 'single',
  },
} as const satisfies Record<string, SupportedTraitDefinition>;

export function getSupportedTraitDefinition(
  slug: string,
): SupportedTraitDefinition | null {
  return SUPPORTED_TRAITS[slug as keyof typeof SUPPORTED_TRAITS] ?? null;
}

export function isSupportedTraitSlug(slug: string): boolean {
  return getSupportedTraitDefinition(slug) !== null;
}
