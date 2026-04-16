import { PARAMETER_TYPES, TRAIT_STACK_MODES } from '../config/constants';

type TraitParameterType =
  (typeof PARAMETER_TYPES)[keyof typeof PARAMETER_TYPES];
type TraitStackMode =
  (typeof TRAIT_STACK_MODES)[keyof typeof TRAIT_STACK_MODES];

type TraitParameterData = {
  id?: string | null;
  type?: string | null;
  value?: string | null;
};

type TraitLike = Item & {
  system: {
    slug?: string | null;
    event?: string | null;
    logic?: string | null;
    stackMode?: string | null;
    parameters?: TraitParameterData[] | null;
  };
};

export type ResolvedTraitParameter = {
  id: string;
  index: number;
  type: TraitParameterType;
  raw: string;
};

export type TraitEventDispatch<TContext extends Record<string, unknown>> = {
  actor: Actor;
  context: TContext;
  event: string;
  traits: TraitInstance[];
};

export type TraitInstance = {
  item: TraitLike;
  slug: string;
  event: string | null;
  logic: string | null;
  stackMode: TraitStackMode;
  parameters: ResolvedTraitParameter[];
  getParameter: (index: number) => ResolvedTraitParameter | null;
  getTextParameter: (index: number) => string | null;
  getNumberParameter: (index: number) => number | null;
  getRollFormulaParameter: (index: number) => string | null;
};

export function getTraitInstances(
  actor: Actor,
  slug?: string,
): TraitInstance[] {
  const normalizedSlug = normalizeSlug(slug ?? null);

  return getTraitItems(actor)
    .map((item) => toTraitInstance(item))
    .filter((instance): instance is TraitInstance => instance !== null)
    .filter((instance) => {
      if (normalizedSlug === null) {
        return true;
      }

      return instance.slug === normalizedSlug;
    });
}

export function hasTrait(actor: Actor, slug: string): boolean {
  return getTraitInstances(actor, slug).length > 0;
}

export function getTraitsForEvent(
  actor: Actor,
  event: string,
): TraitInstance[] {
  const normalizedEvent = normalizeEvent(event);

  if (normalizedEvent === null) {
    return [];
  }

  return getTraitInstances(actor).filter(
    (instance) => instance.event === normalizedEvent,
  );
}

export function hasTraitForEvent(actor: Actor, event: string): boolean {
  return getTraitsForEvent(actor, event).length > 0;
}

export function getResolvedTraits(actor: Actor): Map<string, TraitInstance[]> {
  return groupTraitInstances(
    getTraitInstances(actor),
    (instance) => instance.slug,
  );
}

export function getResolvedTraitEvents(
  actor: Actor,
): Map<string, TraitInstance[]> {
  return groupTraitInstances(
    getTraitInstances(actor).filter((instance) => instance.event !== null),
    (instance) => instance.event,
  );
}

export function dispatchTraitEvent<TContext extends Record<string, unknown>>(
  actor: Actor,
  event: string,
  context: TContext,
): TraitEventDispatch<TContext> {
  const normalizedEvent = normalizeEvent(event);

  return {
    actor,
    context,
    event: normalizedEvent ?? '',
    traits:
      normalizedEvent === null ? [] : getTraitsForEvent(actor, normalizedEvent),
  };
}

function getTraitItems(actor: Actor): TraitLike[] {
  return actor.items.filter(
    (item) => String(item.type) === 'trait',
  ) as TraitLike[];
}

function toTraitInstance(item: TraitLike): TraitInstance | null {
  const slug = normalizeSlug(item.system.slug ?? null);

  if (slug === null) {
    return null;
  }

  const parameters = normalizeParameters(item.system.parameters);

  return {
    item,
    slug,
    event: normalizeEvent(item.system.event ?? null),
    logic: normalizeText(item.system.logic ?? null),
    stackMode: normalizeStackMode(item.system.stackMode ?? null),
    parameters,
    getParameter: (index) => getParameter(parameters, index),
    getTextParameter: (index) => getTextParameter(parameters, index),
    getNumberParameter: (index) => getNumberParameter(parameters, index),
    getRollFormulaParameter: (index) =>
      getRollFormulaParameter(parameters, index),
  };
}

function groupTraitInstances(
  instances: TraitInstance[],
  getKey: (instance: TraitInstance) => string | null,
): Map<string, TraitInstance[]> {
  const groupedInstances = new Map<string, TraitInstance[]>();

  for (const instance of instances) {
    const key = getKey(instance);

    if (key === null) {
      continue;
    }

    const existingInstances = groupedInstances.get(key) ?? [];
    existingInstances.push(instance);
    groupedInstances.set(key, existingInstances);
  }

  return groupedInstances;
}

function normalizeParameters(parameters: TraitLike['system']['parameters']) {
  if (!Array.isArray(parameters)) {
    return [];
  }

  return parameters.map((parameter, index) => ({
    id: normalizeParameterId(parameter?.id ?? null),
    index,
    type: normalizeParameterType(parameter?.type ?? null),
    raw: normalizeRawValue(parameter?.value ?? null),
  }));
}

function normalizeParameterId(value: string | null): string {
  if (typeof value !== 'string') {
    return foundry.utils.randomID();
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : foundry.utils.randomID();
}

function getParameter(
  parameters: ResolvedTraitParameter[],
  index: number,
): ResolvedTraitParameter | null {
  if (!Number.isInteger(index) || index < 0) {
    return null;
  }

  return parameters[index] ?? null;
}

function getTextParameter(
  parameters: ResolvedTraitParameter[],
  index: number,
): string | null {
  const parameter = getParameter(parameters, index);

  if (!parameter || parameter.type !== PARAMETER_TYPES.text) {
    return null;
  }

  return parameter.raw.length > 0 ? parameter.raw : null;
}

function getNumberParameter(
  parameters: ResolvedTraitParameter[],
  index: number,
): number | null {
  const parameter = getParameter(parameters, index);

  if (!parameter || parameter.type !== PARAMETER_TYPES.number) {
    return null;
  }

  const numericValue = Number(parameter.raw);

  return Number.isFinite(numericValue) ? numericValue : null;
}

function getRollFormulaParameter(
  parameters: ResolvedTraitParameter[],
  index: number,
): string | null {
  const parameter = getParameter(parameters, index);

  if (!parameter || parameter.type !== PARAMETER_TYPES.roll_formula) {
    return null;
  }

  return parameter.raw.length > 0 ? parameter.raw : null;
}

function normalizeSlug(value: string | null): string | null {
  const normalizedValue = normalizeText(value);

  return normalizedValue === null ? null : normalizedValue.toLowerCase();
}

function normalizeEvent(value: string | null): string | null {
  return normalizeText(value);
}

function normalizeText(value: string | null): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeRawValue(value: string | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeParameterType(value: string | null): TraitParameterType {
  return Object.values(PARAMETER_TYPES).includes(value as TraitParameterType)
    ? (value as TraitParameterType)
    : PARAMETER_TYPES.text;
}

function normalizeStackMode(value: string | null): TraitStackMode {
  return Object.values(TRAIT_STACK_MODES).includes(value as TraitStackMode)
    ? (value as TraitStackMode)
    : TRAIT_STACK_MODES.single;
}
