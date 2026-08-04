# Story 2.3: Add Character Skills And Common Play Lists

Status: ready-for-dev

## Story

As a player using my character during a session,
I want skills and common play lists to be organized, scan-friendly, and editable where appropriate,
so that I can find the values needed for ordinary play without raw data editing.

## Acceptance Criteria

1. Character sheet displays skills with localized names, ranks or relevant values, governing characteristic where applicable, and row/section-local missing-data states.
2. Editable skill source fields persist through schema-backed actor data paths.
3. Dense skill and play-relevant lists keep values aligned using the numeric typography role and normal Foundry scrolling.
4. Default, missing, or partial skill/list data is surfaced near affected rows or sections and is not silently omitted.
5. Common play lists such as traits, conditions, statuses, effects, or similar non-inventory/non-magic entries are grouped with localized labels, safe empty states, and permission-aware controls.
6. Roll-related values may show unavailable/future placeholders only if clearly labeled; this story does not implement skill-test math outside the Epic 3 shared d100 services.
7. Narrow-width, keyboard traversal, non-editable permissions, and Foundry VTT 14 validation are covered for default, partial, filled, editable, non-editable, and dense data states.

## Tasks / Subtasks

- [ ] Audit existing character and rule-item data before editing. (AC: 1-5)
  - [ ] Read `CharacterData`, shared item reference/grant schemas, current trait/race/power/skill data models, and character template patterns.
  - [ ] Determine whether skills belong as actor system data, embedded item references, or another schema-backed representation; do not create transient template-only skills.
- [ ] Add skill and common-list display/edit support. (AC: 1-5, 7)
  - [ ] Prepare rows in `_prepareContext` with localized labels, aligned numeric values, missing-data flags, and permission state.
  - [ ] Keep templates simple and localized; add keys to `lang/en.json` for new labels, warnings, and empty states.
  - [ ] Use scoped CSS under `.uesrpg-rebuilt` and existing list/table/numeric patterns.
- [ ] Preserve scope boundaries. (AC: 6)
  - [ ] Do not add skill roll dialogs, d100 calculation, chat output, combat effects, or builder logic.
  - [ ] If future roll buttons are shown, keep them disabled or clearly unavailable until Epic 3.
- [ ] Verify. (AC: 1-7)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate in Foundry VTT 14 with sparse, partial, dense, editable, and non-editable skill/list states.

## Dev Notes

- Story 2.2 should already have hardened characteristics/resources. Build on that context and avoid regressing the character sheet shell.
- Current source has `src/module/data/item/Skill.ts` exported but no current character-skill sheet surface in the actor template. Verify actual schema and registration before deciding where skill data lives.
- Current public item types in `system.json` are `weapon`, `trait`, `race`, and `power`; do not assume a separate `skill` Item document type is registered unless you add it atomically across constants, metadata, data model registration, sheet registration, localization, templates/styles, build-copy, and migration assessment.
- Common play lists should support later Epic 3/4 workflows by making data visible and editable, not by implementing rules automation now.

## Project Structure Notes

- Likely files: `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/CharacterSheet.ts`, `templates/actor/character-sheet.hbs`, `src/module/data/actor/CharacterData.ts`, `src/module/data/item/Skill.ts`, `src/module/data/shared/*`, `src/module/config/constants.ts`, `system.json` if adding document types, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.3-Add-Character-Skills-And-Common-Play-Lists`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-4---Rules-Automation-Uses-Shared-Services-And-Transparent-Chat`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Component-Patterns`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
