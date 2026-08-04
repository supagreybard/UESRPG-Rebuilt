# Story 2.12: Build Equipment And General Item Sheet Shells

Status: ready-for-dev

## Story

As a player or GM creating UESRPG items,
I want Foundry-native item sheet shells for equipment and general item types,
so that item data has reliable, localized, editable surfaces before detailed mechanical sections are added.

## Acceptance Criteria

1. Weapon, armor, equipment, consumable, or general item sheets use Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior.
2. Header, identity, type/category fields, mechanical section area, prose/description area, and GM/private or provenance-adjacent notes render safely for default, missing, and partial data.
3. Permitted edits to identity, category, description, or notes persist through awaited Foundry document updates using explicit schema-backed paths with migration impact assessed.
4. Limited/non-editable permission states remain legible and handle edit-only controls according to Foundry conventions.
5. Labels, headings, warnings, and empty states use localization and scoped tokenized styling with readable light/dark focus states.
6. Foundry VTT 14 validation covers equipment/general item documents in default, partial, editable, non-editable, and resized states.

## Tasks / Subtasks

- [ ] Audit current item sheet/data/type support. (AC: 1-5)
  - [ ] Read `BaseItemSheet`, `UesrpgItemSheet`, `BaseItemData`, `BaseInventoryItemData`, `WeaponData`, item template, app registration, constants, document types, `system.json`, localization, and styles.
- [ ] Build or harden item shell surfaces. (AC: 1-5)
  - [ ] Reuse `BaseItemSheet`/`UesrpgItemSheet` where possible.
  - [ ] If adding armor/equipment/consumable/general item types, update all AD-2 files atomically.
  - [ ] Keep detailed mechanical fields for Story 2.13; this story only provides reliable shell/category/prose/private-note structure.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate supported item types in Foundry VTT 14 with default, partial, editable, non-editable, light/dark, and narrow-width states.

## Dev Notes

- Current `system.json` has item types `weapon`, `trait`, `race`, and `power`; only `weapon` is clearly equipment-like. Add new item types only when needed and coordinated.
- Current `BaseItemSheet` already handles identity, inventory fields for `weapon`, subtype fields for weapon damage/range, prose, and submit-on-change behavior. Extend instead of replacing.
- Do not add combat, treasure, builder, or compendium logic here.

## Project Structure Notes

- Primary files: `src/module/applications/item/BaseItemSheet.ts`, `src/module/applications/item/UesrpgItemSheet.ts`, `templates/item/item-sheet.hbs`, `src/module/data/item/*`, `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.12-Build-Equipment-And-General-Item-Sheet-Shells`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Item-And-Equipment-Sheets`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
