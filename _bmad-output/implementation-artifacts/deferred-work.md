## Deferred from: code review of 1-3-establish-localization-and-ui-token-foundations (2026-08-04)

- Object-shaped persisted grants are hidden by the `hasGrants` check: `#readGrantEntries` can read object-shaped grant collections, but `_prepareContext` sets `hasGrants` only when `system.grants` is an array. This appears pre-existing in `RaceItemSheet.ts`, so it was not treated as a current story blocker.
- Malformed stored grant UUIDs can break race sheet context preparation: `#resolveGrantSource` passes any non-empty stored `sourceUuid` to `fromUuid` without catching resolution errors. This appears pre-existing in `RaceItemSheet.ts`, so it was not treated as a current story blocker.

## Deferred from: code review of 2-1-build-character-sheet-shell-identity-permissions-and-empty-states (2026-08-04)

- Define a Foundry-safe private storage/update pattern before adding true GM/private character notes; ordinary actor system data plus sheet-level hiding is not a reliable privacy boundary.
