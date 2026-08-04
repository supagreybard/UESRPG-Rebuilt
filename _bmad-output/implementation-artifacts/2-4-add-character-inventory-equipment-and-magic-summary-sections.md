---
baseline_commit: a1531e9ecd4907d66a2a9f1a49b5f42ab8cc642c
---

# Story 2.4: Add Character Inventory, Equipment, And Magic Summary Sections

Status: done

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

- [x] Audit current embedded item and item-sheet support. (AC: 1-5)
  - [x] Read actor sheets, item sheets, item data models, `system.json` item types, and `src/module/applications/index.ts`.
  - [x] Identify which listed categories are supported now (`weapon`, `trait`, `race`, `power`) and which require new item types in later or current scope.
- [x] Add character inventory/equipment/magic summaries. (AC: 1-4, 7)
  - [x] Prepare grouped item rows in `_prepareContext` from actor-owned items or schema-backed references.
  - [x] Keep row actions Foundry-native and permission-aware.
  - [x] Add localization keys and scoped CSS for groups, values, warnings, empty states, and manual fallback.
- [x] Add safe item management hooks only where needed. (AC: 5-6)
  - [x] Use awaited Foundry document APIs for create/update/delete/toggle actions.
  - [x] Do not implement combat, magic resolution, alchemy resolution, builders, or compendium workflows.
- [x] Verify. (AC: 1-7)
  - [x] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [x] Validate empty, partial, filled, dense, editable, non-editable, light/dark, and narrow-width states in Foundry VTT 14.

### Review Findings

- [x] [Review][Patch] Reduce magic summaries to currently backed `power` fields plus manual-fallback language [src/module/applications/actor/CharacterSheet.ts:546]
- [x] [Review][Patch] Weapon item-sheet equipped checkbox is rendered without checked-state binding [templates/item/item-sheet.hbs:53]
- [x] [Review][Patch] Create item action lacks an `isEditable` guard in the handler [src/module/applications/actor/CharacterSheet.ts:294]
- [x] [Review][Patch] Delete item action removes embedded items without confirmation [src/module/applications/actor/CharacterSheet.ts:333]
- [x] [Review][Patch] Five-column character tabs have no narrow-width fallback [styles/uesrpg-rebuilt.css:813]

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

- 2026-08-04: `npm run typecheck` passed.
- 2026-08-04: `npm run lint` passed.
- 2026-08-04: `npm run build` passed.
- 2026-08-04: Foundry VTT 14 runtime validation reported passed by user for Inventory as gear-only, Magic as separate tab, empty/filled states, editable/non-editable controls, weapon equipped toggle, narrow width, and light/dark themes.
- 2026-08-04: Code review patches applied; `npm run typecheck`, `npm run lint`, and `npm run build` passed after fixes.

### Completion Notes List

- Audited current actor/item sheet support and kept Story 2.4 within existing item types instead of adding new armor/equipment/consumable/spell/ritual/enchantment/alchemy document types.
- Added a gear-focused Inventory tab with actor-owned weapon rows, mechanical values, missing-field warnings, empty/future item states, placeholder creation, open/delete controls, and equipped toggle persistence through Foundry document APIs.
- Added a dedicated Magic tab for actor-owned power summaries, missing-field warnings, disabled future workflow labeling, and localized manual-fallback language for unsupported spellcasting, ritual, enchantment, and alchemy complexity.
- Added `equipped` to the existing inventory item schema and exposed it on weapon item sheets.

### File List

- `_bmad-output/implementation-artifacts/2-4-add-character-inventory-equipment-and-magic-summary-sections.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `lang/en.json`
- `src/module/applications/actor/CharacterSheet.ts`
- `src/module/applications/item/BaseItemSheet.ts`
- `src/module/data/item/abstract/BaseInventoryItem.ts`
- `src/module/data/util/fields.ts`
- `src/module/utils/localization.ts`
- `styles/uesrpg-rebuilt.css`
- `templates/actor/character-sheet.hbs`

### Change Log

- 2026-08-04: Implemented character inventory/equipment and dedicated magic summary tabs for Story 2.4; status set to review.
