import {
  getSupportedTraitDefinition,
  isSupportedTraitSlug,
  type SupportedTraitDefinition,
} from '../config/trait-registry';

type TraitLike = Item & {
  system: {
    slug?: string | null;
    active?: boolean;
    qualifier?: string | null;
    value?: number | null;
    weaponProfile?: {
      type?: string | null;
      damage?: string | null;
      range?: string | null;
    } | null;
  };
};

export type TraitInstance = {
  item: TraitLike;
  slug: string;
  qualifier: string | null;
  value: number | null;
  weaponProfile: {
    type: string | null;
    damage: string | null;
    range: string | null;
  } | null;
  definition: SupportedTraitDefinition;
};

export function getTraitInstances(actor: Actor, slug: string): TraitInstance[] {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    return [];
  }

  return getSupportedTraitItems(actor)
    .map((item) => toTraitInstance(item))
    .filter((instance): instance is TraitInstance => instance !== null)
    .filter((instance) => instance.slug === normalizedSlug);
}

export function hasTrait(
  actor: Actor,
  slug: string,
  qualifier?: string,
): boolean {
  const normalizedQualifier = normalizeQualifier(qualifier ?? null);

  return getTraitInstances(actor, slug).some((instance) => {
    if (normalizedQualifier === null) {
      return true;
    }

    return instance.qualifier === normalizedQualifier;
  });
}

export function getTraitValue(
  actor: Actor,
  slug: string,
  qualifier?: string,
): number | null {
  const instances = getTraitInstances(actor, slug);
  const normalizedQualifier = normalizeQualifier(qualifier ?? null);

  if (instances.length === 0) {
    return null;
  }

  const relevantInstances =
    normalizedQualifier === null
      ? instances
      : instances.filter(
          (instance) => instance.qualifier === normalizedQualifier,
        );

  if (relevantInstances.length === 0) {
    return null;
  }

  switch (relevantInstances[0].definition.stackMode) {
    case 'sum':
      return relevantInstances.reduce(
        (total, instance) => total + (instance.value ?? 0),
        0,
      );

    case 'highest':
      return relevantInstances.reduce<number | null>((highest, instance) => {
        if (instance.value === null) {
          return highest;
        }

        if (highest === null || instance.value > highest) {
          return instance.value;
        }

        return highest;
      }, null);

    case 'single':
    case 'distinctQualifier':
      return relevantInstances[0].value ?? null;
  }
}

export function getResolvedTraits(actor: Actor): Map<string, TraitInstance[]> {
  const resolvedTraits = new Map<string, TraitInstance[]>();

  for (const item of getSupportedTraitItems(actor)) {
    const instance = toTraitInstance(item);

    if (!instance) {
      continue;
    }

    const existingInstances = resolvedTraits.get(instance.slug) ?? [];
    existingInstances.push(instance);
    resolvedTraits.set(instance.slug, existingInstances);
  }

  return resolvedTraits;
}

export { isSupportedTraitSlug };

function getSupportedTraitItems(actor: Actor): TraitLike[] {
  return actor.items.filter((item) => {
    if (String(item.type) !== 'trait') {
      return false;
    }

    const trait = item as TraitLike;
    const slug = normalizeSlug(trait.system.slug ?? null);

    return (
      Boolean(trait.system.active) &&
      slug !== null &&
      isSupportedTraitSlug(slug)
    );
  }) as TraitLike[];
}

function toTraitInstance(item: TraitLike): TraitInstance | null {
  const slug = normalizeSlug(item.system.slug ?? null);

  if (!slug) {
    return null;
  }

  const definition = getSupportedTraitDefinition(slug);

  if (!definition) {
    return null;
  }

  return {
    item,
    slug,
    qualifier: normalizeQualifier(item.system.qualifier ?? null),
    value: typeof item.system.value === 'number' ? item.system.value : null,
    weaponProfile: normalizeWeaponProfile(item.system.weaponProfile ?? null),
    definition,
  };
}

function normalizeSlug(value: string | null): string | null {
  const normalizedValue = normalizeText(value);

  return normalizedValue === null ? null : normalizedValue.toLowerCase();
}

function normalizeQualifier(value: string | null): string | null {
  const normalizedValue = normalizeText(value);

  return normalizedValue === null ? null : normalizedValue.toLowerCase();
}

function normalizeText(value: string | null): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeWeaponProfile(
  weaponProfile: TraitLike['system']['weaponProfile'],
): TraitInstance['weaponProfile'] {
  if (!weaponProfile) {
    return null;
  }

  return {
    type: normalizeText(weaponProfile.type ?? null),
    damage: normalizeText(weaponProfile.damage ?? null),
    range: normalizeText(weaponProfile.range ?? null),
  };
}
