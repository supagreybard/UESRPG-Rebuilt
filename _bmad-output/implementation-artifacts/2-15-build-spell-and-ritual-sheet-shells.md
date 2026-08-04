# Story 2.15: Build Spell And Ritual Sheet Shells

Status: ready-for-dev

## Story

As a player or GM creating UESRPG magic entries,
I want Foundry-native sheet shells for spells and rituals,
so that magic data has reliable, localized, editable surfaces before detailed casting and ritual fields are added.

## Acceptance Criteria

1. Spell and ritual item sheets use Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior.
2. Header, identity, spell/ritual type/category, mechanical area, prose/effect description, ritual/manual notes, and GM/private or provenance-adjacent notes render safely for default, missing, and partial data.
3. Permitted edits persist through awaited Foundry document updates using explicit schema-backed paths with migration impact assessed.
4. Limited/non-editable permission states remain legible and handle edit-only controls according to Foundry conventions.
5. Labels, headings, warnings, and empty states use localization and scoped tokenized styling with readable light/dark focus states.
6. Foundry VTT 14 validation covers spell and ritual documents in default, partial, editable, non-editable, and resized states.

## Tasks / Subtasks

- [ ] Audit current magic item support. (AC: 1-5)
  - [ ] Read current item types/data/sheets/templates and app registration; confirm spell/ritual types do not already exist.
- [ ] Add spell and ritual document support if absent. (AC: 1-5)
  - [ ] Update constants, `system.json`, data model registration, sheet registration, templates/partials, localization, styles/build-copy, and migration assessment atomically.
  - [ ] Reuse `BaseItemSheet` or a small shared magic item sheet base where useful; avoid a new app architecture.
  - [ ] Keep detailed mechanical fields for Story 2.16.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate spell and ritual sheets in Foundry VTT 14 with default, partial, editable, non-editable, light/dark, and narrow-width states.

## Dev Notes

- Current item types are `weapon`, `trait`, `race`, and `power`; spell and ritual types likely need an AD-2 coordinated change.
- Rituals are manual/simple entity workflows for 1.0; shells must be honest about manual notes and not imply full ritual automation.
- Do not add spellcasting workflow, mishap resolution, spell builder, or chat output here.

## Project Structure Notes

- Likely files: item data models, item sheet classes/templates under `src/module/applications/item` and `templates/item`, `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `src/module/data/index.ts`, `src/module/applications/index.ts`, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`, `vite.config.ts` only for new asset categories.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.15-Build-Spell-And-Ritual-Sheet-Shells`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Magic-Entity-Sheets`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
