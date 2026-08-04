---
baseline_commit: 1a0cc60581f56c0c00df754676f799cf1299caf2
---

# Story 2.3: Add Character Skills And Overview Content

Status: done

## Story

As a player using my character during a session,
I want skills and overview content to be organized, scan-friendly, and editable where appropriate,
so that I can find the values needed for ordinary play without raw data editing.

## Acceptance Criteria

1. Character sheet displays skills with localized names, ranks or relevant values, governing characteristic where applicable, and row/section-local missing-data states.
2. Editable skill source fields persist through schema-backed actor data paths.
3. Dense skill rows and overview content keep values aligned where applicable and use normal Foundry scrolling.
4. Default, missing, or partial skill/overview data is surfaced near affected rows or sections and is not silently omitted.
5. Character overview content such as traits, race, powers, active effects, or similar non-inventory/non-magic entries is grouped with localized labels and safe empty states in the existing overview surface rather than treated as a separate common-list concept.
6. Roll-related values may show unavailable/future placeholders only if clearly labeled; this story does not implement skill-test math outside the Epic 3 shared d100 services.
7. Narrow-width, keyboard traversal, non-editable permissions, and Foundry VTT 14 validation are covered for default, partial, filled, editable, non-editable, and dense data states.

## Tasks / Subtasks

- [x] Audit existing character and rule-item data before editing. (AC: 1-5)
  - [x] Read `CharacterData`, shared item reference/grant schemas, current trait/race/power/skill data models, and character template patterns.
  - [x] Determine whether skills belong as actor system data, embedded item references, or another schema-backed representation; do not create transient template-only skills.
- [x] Add skill display/edit support and integrate relevant overview content. (AC: 1-5, 7)
  - [x] Prepare rows in `_prepareContext` with localized labels, aligned numeric values, missing-data flags, and permission state.
  - [x] Keep templates simple and localized; add keys to `lang/en.json` for new labels, warnings, and empty states.
  - [x] Use scoped CSS under `.uesrpg-rebuilt` and existing list/table/numeric patterns.
- [x] Preserve scope boundaries. (AC: 6)
  - [x] Do not add skill roll dialogs, d100 calculation, chat output, combat effects, or builder logic.
  - [x] If future roll buttons are shown, keep them disabled or clearly unavailable until Epic 3.
- [x] Verify. (AC: 1-7)
  - [x] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [x] Validate in Foundry VTT 14 with sparse, partial, dense, editable, and non-editable skill/list states.

### Review Findings

- [x] [Review][Dismiss] Separate overview-content controls are not required [templates/actor/character-sheet.hbs:397] — dismissed by product decision; this story does not treat overview content as a separate editable common-list concept. Overview content remains visible with safe empty states, while later workflow stories define item/effect interactions.
- [x] [Review][Patch] Localized default skill names are persisted into actor data [src/module/applications/actor/CharacterSheet.ts:243]
- [x] [Review][Dismiss] Skill source is persisted only as a hidden field and is not editable [templates/actor/character-sheet.hbs:275] — dismissed by product decision; editable source adds UI clutter without current functional benefit.
- [x] [Review][Patch] Bonus and target-number placeholders are not clearly labeled as unavailable until Epic 3 [templates/actor/character-sheet.hbs:334]
- [x] [Review][Patch] Custom tab controls are not keyboard-traversable [templates/actor/character-sheet.hbs:171]
- [x] [Review][Patch] Character sheet overrides normal Foundry window scrolling [styles/uesrpg-rebuilt.css:129]

## Dev Notes

- Story 2.2 should already have hardened characteristics/resources. Build on that context and avoid regressing the character sheet shell.
- Current source has `src/module/data/item/Skill.ts` exported but no current character-skill sheet surface in the actor template. Verify actual schema and registration before deciding where skill data lives.
- Current public item types in `system.json` are `weapon`, `trait`, `race`, and `power`; do not assume a separate `skill` Item document type is registered unless you add it atomically across constants, metadata, data model registration, sheet registration, localization, templates/styles, build-copy, and migration assessment.
- Overview content should support later Epic 3/4 workflows by making relevant character context visible without introducing a separate common-list model or rules automation now.

## Project Structure Notes

- Likely files: `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/CharacterSheet.ts`, `templates/actor/character-sheet.hbs`, `src/module/data/actor/CharacterData.ts`, `src/module/data/item/Skill.ts`, `src/module/data/shared/*`, `src/module/config/constants.ts`, `system.json` if adding document types, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.3-Add-Character-Skills-And-Overview-Content`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-4---Rules-Automation-Uses-Shared-Services-And-Transparent-Chat`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Component-Patterns`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

- 2026-08-04: Audited character actor schema, rule item schemas, existing `SkillData`, registered item types, character sheet context/template patterns, localization, and scoped CSS before choosing actor-system-backed skills.
- 2026-08-04: Implemented default schema-backed character skill rows, character sheet tabs, overview content, and compressed Foundry-validated character sheet layout.
- 2026-08-04: Ran `npm run typecheck`, `npm run lint`, and `npm run build`; all passed.
- 2026-08-04: Foundry VTT 14 validation performed by Greybard; iterative layout/runtime feedback addressed, final validation passed.

### Completion Notes List

- Added schema-backed `system.skills` character data with default UESRPG skill rows, ranks, governing characteristics, hidden/preserved source fields, and custom skill add/remove support.
- Reworked the character sheet into a horizontal header resource band, compact characteristics rail, and right-side segmented tab navigation for Overview, Skills, and Notes.
- Added localized skill labels, tab labels, empty states, warnings, and `00` Bonus/TN placeholders without implementing Epic 3 roll math.
- Added overview groups for embedded traits, race, powers, and active effects with safe empty/missing-data states.
- Scoped CSS keeps numeric values aligned, tab content scrolling contained, and validated character layout usable at the configured 800px by 700px default sheet size.

### File List

- `src/module/data/actor/CharacterData.ts`
- `src/module/applications/actor/CharacterSheet.ts`
- `templates/actor/character-sheet.hbs`
- `lang/en.json`
- `styles/uesrpg-rebuilt.css`
- `_bmad-output/implementation-artifacts/2-3-add-character-skills-and-overview-content.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-08-04: Implemented character skills and overview content; moved story to review.
