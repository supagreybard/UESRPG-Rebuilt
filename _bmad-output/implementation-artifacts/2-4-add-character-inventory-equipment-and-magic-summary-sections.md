# Story 2.4: Add Character Inventory, Equipment, And Magic Summary Sections

Status: ready-for-dev

## Story

As a player preparing my character for play,
I want inventory, equipped gear, and magic-relevant summaries visible on my character sheet,
so that I can understand what my character can carry, use, wear, wield, or cast without leaving the character context.

## Acceptance Criteria

1. Embedded or linked weapons, armor, equipment, consumables, spells, and magic-relevant entries display in predictable localized groups with safe empty states.
2. Inventory/equipment rows show key mechanical values where available, such as quantity, encumbrance, damage, armor rating, range, equipped state, or category, and surface missing values near affected entries.
3. Magic summaries show key values where available, such as school, cost, difficulty, casting notes, ritual/manual status, and prepared/known state.
4. Ritual, enchantment, or alchemy complexity that is unsupported in 1.0 automation has visible manual-fallback language where relevant.
5. Permitted users can use Foundry-native controls to open, edit, delete, toggle supported equipped state, or create/add placeholders; persisted changes use Foundry document APIs.
6. Future attack, defense, spellcasting, alchemy, and builder actions are absent or clearly disabled/labeled; this story does not implement those workflows.
7. Dense/narrow-width, non-editable permissions, localization, item management, manual-fallback visibility, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit current embedded item and item-sheet support. (AC: 1-5)
  - [ ] Read actor sheets, item sheets, item data models, `system.json` item types, and `src/module/applications/index.ts`.
  - [ ] Identify which listed categories are supported now (`weapon`, `trait`, `race`, `power`) and which require new item types in later or current scope.
- [ ] Add character inventory/equipment/magic summaries. (AC: 1-4, 7)
  - [ ] Prepare grouped item rows in `_prepareContext` from actor-owned items or schema-backed references.
  - [ ] Keep row actions Foundry-native and permission-aware.
  - [ ] Add localization keys and scoped CSS for groups, values, warnings, empty states, and manual fallback.
- [ ] Add safe item management hooks only where needed. (AC: 5-6)
  - [ ] Use awaited Foundry document APIs for create/update/delete/toggle actions.
  - [ ] Do not implement combat, magic resolution, alchemy resolution, builders, or compendium workflows.
- [ ] Verify. (AC: 1-7)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate empty, partial, filled, dense, editable, non-editable, light/dark, and narrow-width states in Foundry VTT 14.

## Dev Notes

- Current registered item types are limited. If armor/equipment/consumable/spell/ritual/enchantment/alchemy document types are added here, make one coordinated AD-2 change across constants, `system.json`, data models, registration, templates, localization, styles/build-copy, and migration assessment.
- Prefer actor-owned embedded Items for inventory-like rows because Foundry already supports item ownership, opening, editing, and deletion.
- Manual-fallback language is required for ritual/enchantment/alchemy complexity but must be concise and localized; do not add prepared lore/rules prose.
- Keep all roll/combat/spellcasting workflow actions out of scope until Epic 3 and Epic 4.

## Project Structure Notes

- Likely files: actor sheet classes/templates, item sheet/data classes, `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `src/module/data/index.ts`, `src/module/applications/index.ts`, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`, `vite.config.ts` only if new asset categories are introduced.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.4-Add-Character-Inventory-Equipment-And-Magic-Summary-Sections`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-9---Manual-Fallback-Is-A-Visible-Workflow-State`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Release-Scope-Surfaces`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
