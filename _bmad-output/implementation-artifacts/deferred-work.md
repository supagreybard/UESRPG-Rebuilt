## Deferred from: code review of 1-3-establish-localization-and-ui-token-foundations (2026-08-04)

- Object-shaped persisted grants are hidden by the `hasGrants` check: `#readGrantEntries` can read object-shaped grant collections, but `_prepareContext` sets `hasGrants` only when `system.grants` is an array. This appears pre-existing in `RaceItemSheet.ts`, so it was not treated as a current story blocker.
- Malformed stored grant UUIDs can break race sheet context preparation: `#resolveGrantSource` passes any non-empty stored `sourceUuid` to `fromUuid` without catching resolution errors. This appears pre-existing in `RaceItemSheet.ts`, so it was not treated as a current story blocker.
