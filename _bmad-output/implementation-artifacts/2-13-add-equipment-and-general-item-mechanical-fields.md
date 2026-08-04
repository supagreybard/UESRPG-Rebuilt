# Story 2.13: Add Equipment And General Item Mechanical Fields

Status: ready-for-dev

## Story

As a player or GM configuring UESRPG equipment,
I want equipment and general item sheets to expose their key mechanical fields clearly,
so that weapons, armor, consumables, and other gear can be understood and maintained without raw data editing.

## Acceptance Criteria

1. Weapon sheets show category, damage, range/reach, encumbrance, quantity, value, equipped/carry state, traits, and notes where available, with near-field missing-data warnings.
2. Armor sheets show category, armor rating/protection values, encumbrance, quantity, value, equipped/carry state, traits, and notes where available.
3. Equipment, consumable, or general item sheets show category, quantity, encumbrance, value, rarity, usage/effect notes, and carry/equipped state where applicable; unsupported fields are absent or clearly not applicable.
4. Permitted mechanical edits persist through awaited Foundry document updates using schema-backed paths and remain structurally valid for later workflows.
5. Future attack, defense, alchemy, treasure, and builder automation is absent or clearly disabled/labeled.
6. Labels, headings, warnings, empty states, numeric typography, responsive layout, permissions, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit item schemas and sheet context. (AC: 1-4)
  - [ ] Read Story 2.12 output, `BaseInventoryItemData`, `WeaponData`, item sheet classes/templates, and localization.
- [ ] Add mechanical field schemas and display. (AC: 1-4, 6)
  - [ ] Add fields through `foundry.data.fields` with safe initial values and validation.
  - [ ] Prepare display/edit fields in TypeScript; keep templates simple.
  - [ ] Add missing-data warnings, not-applicable states, localized labels, and scoped numeric/list styling.
- [ ] Preserve automation boundary. (AC: 5)
  - [ ] Do not implement attack/defense rolls, damage resolution, alchemy use, treasure generation, or builders.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate weapon, armor/equipment/consumable/general item types supported by Story 2.12 in Foundry VTT 14.

## Dev Notes

- Current `WeaponData` only has `damage` and `range` in addition to quantity/encumbrance. Expanding fields may require migration assessment.
- If armor/equipment/consumable/general item types do not exist after Story 2.12, add them atomically or split/record blocker rather than forcing unsupported fields onto unrelated types.
- Keep fields understandable and editable for homebrew; do not require raw JSON editing.

## Project Structure Notes

- Primary files: item data models, item sheet classes/templates, constants/document types, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.13-Add-Equipment-And-General-Item-Mechanical-Fields`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md#Typography`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
