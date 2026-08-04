# Story 2.9: Add Statblock Equipment And Treasure

Status: ready-for-dev

## Story

As a GM preparing or reviewing a statblock,
I want equipment and treasure information visible, organized, and editable where appropriate,
so that NPC and creature possessions are easy to manage without raw data editing.

## Acceptance Criteria

1. Weapons, armor, equipment, consumables, currency, treasure notes, or loot-relevant entries are grouped in predictable localized sections with safe empty states.
2. Equipment rows show key values such as quantity, encumbrance, equipped state, damage, armor rating, value, rarity, or category where available and warn near missing values.
3. Treasure supports simple prose, structured entries, or absence without requiring Epic 6 treasure table/artifact workflows.
4. GM/permitted equipment and treasure management uses Foundry-native controls and awaited document APIs.
5. Loot generation and artifact automation are absent or clearly disabled/labeled; Epic 6 logic is out of scope.
6. Normal/narrow widths, keyboard traversal, non-editable permissions, localization, persistence, missing-data behavior, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit current item and statblock support. (AC: 1-4)
  - [ ] Read NPC sheet, `BaseInventoryItemData`, `WeaponData`, `BaseItemSheet`, and current item type registration.
- [ ] Add statblock equipment and treasure sections. (AC: 1-4, 6)
  - [ ] Reuse actor-owned embedded Items for equipment where possible.
  - [ ] Add schema-backed treasure notes/structured fields only if needed; assess migration impact.
  - [ ] Add localized labels, warnings, empty states, and scoped CSS.
- [ ] Preserve automation boundary. (AC: 5)
  - [ ] Do not implement treasure table rolling, artifact generation, reward distribution, or compendium provenance workflows.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate empty, partial, filled, dense, editable, and non-editable equipment/treasure states in Foundry VTT 14.

## Dev Notes

- Current item support includes weapon and rule items only; armor/equipment/consumable/currency categories may require new item types or a conservative generic representation.
- If adding item types, follow AD-2 atomically across constants, `system.json`, data models, sheet registration, templates, localization, style/build-copy, and migration assessment.
- Treasure prose must be procedural and concise; do not add AI-generated prepared content, loot tables, or artifact descriptions.

## Project Structure Notes

- Likely files: NPC sheet class/template, item data/sheet files, `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.9-Add-Statblock-Equipment-And-Treasure`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-6---System-Content-Requires-Provenance-Before-Distribution`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-9---Manual-Fallback-Is-A-Visible-Workflow-State`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
