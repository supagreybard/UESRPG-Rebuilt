## Deferred from: code review of 1-3-establish-localization-and-ui-token-foundations (2026-08-04)

- Object-shaped persisted grants are hidden by the `hasGrants` check: `#readGrantEntries` can read object-shaped grant collections, but `_prepareContext` sets `hasGrants` only when `system.grants` is an array. This appears pre-existing in `RaceItemSheet.ts`, so it was not treated as a current story blocker.
- Malformed stored grant UUIDs can break race sheet context preparation: `#resolveGrantSource` passes any non-empty stored `sourceUuid` to `fromUuid` without catching resolution errors. This appears pre-existing in `RaceItemSheet.ts`, so it was not treated as a current story blocker.

## Deferred from: code review of 2-1-build-character-sheet-shell-identity-permissions-and-empty-states (2026-08-04)

- Define a Foundry-safe private storage/update pattern before adding true GM/private character notes; ordinary actor system data plus sheet-level hiding is not a reliable privacy boundary.

## Deferred from: code review of 2-5-validate-complete-character-sheet-for-core-play-readiness (2026-08-05)

- GM/private area acceptance is not satisfied by the recorded validation evidence: AC1 requires GM/private areas rendering with the complete character sheet, but Story 2.5 records "GM/private absence" and true private notes remain deferred from Story 2.1. Deferred because the project will likely make use of or suggest use of the GM Notes module from the Foundry repo.
