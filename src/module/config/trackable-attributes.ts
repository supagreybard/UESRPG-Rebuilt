export const TRACKABLE_ATTRIBUTES = {
  bar: [['resources.health'], ['resources.stamina']],
  value: [],
} as const;

export function registerTrackableAttributes(): void {
  (CONFIG.Actor as { trackableAttributes?: unknown }).trackableAttributes =
    TRACKABLE_ATTRIBUTES;
}
