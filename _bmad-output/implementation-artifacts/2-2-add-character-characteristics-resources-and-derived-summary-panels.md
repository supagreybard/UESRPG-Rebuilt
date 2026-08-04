---
baseline_commit: 6130032f9a3f062874c0dab86fd0d934c18fa9f6
---

# Story 2.2: Add Character Characteristics, Resources, And Derived Summary Panels

Status: done

## Story

As a player reviewing my UESRPG character during play,
I want characteristics, resources, and key derived summaries visible and editable where appropriate,
so that I can understand my character's current state without hunting through raw data or unrelated sections.

## Acceptance Criteria

1. Character sheet displays core UESRPG characteristic values with numeric typography, localized labels, and schema-backed editable source fields.
2. Resource summaries for health, magicka, stamina, or equivalent tracked values show current/max values with text-paired semantic colors and reachable editable fields.
3. Default, missing, or partially filled data renders safe fallback values and section-local missing-data warnings without broken template output.
4. Derived summary labels, fallback values, and display-ready values are prepared in TypeScript at `_prepareContext`; templates do not duplicate later roll/combat rules calculations.
5. Characteristic, resource, and summary panels remain scan-friendly and editable at narrow sheet widths without horizontal scrolling.
6. Non-editable permission states remain legible and disable, hide, or render controls read-only according to Foundry conventions.
7. Foundry VTT 14 validation covers default, partial, filled, editable, and non-editable character actors and records limitations/follow-up defects.

## Tasks / Subtasks

- [x] Audit current character sheet characteristic/resource behavior before editing. (AC: 1-4)
  - [x] Read `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/CharacterSheet.ts`, `templates/actor/character-sheet.hbs`, `src/module/data/actor/BaseActorData.ts`, `src/module/data/actor/CharacterData.ts`, `lang/en.json`, and `styles/uesrpg-rebuilt.css`.
  - [x] Preserve the Story 2.1 shell, identity, notes, permission behavior, and empty-state work.
- [x] Complete characteristics and resource panels. (AC: 1-3, 5-6)
  - [x] Keep persisted paths schema-backed under `system.characteristics` and `system.resources` unless a migration assessment justifies changes.
  - [x] Add display metadata in `_prepareContext` for labels, values, max values, warnings, and permission/read-only state.
  - [x] Use scoped CSS and existing `--uesrpg-rebuilt-*` tokens; pair semantic resource colors with text labels/values.
- [x] Add derived summary display without roll/combat automation. (AC: 4)
  - [x] Show only safe summaries derivable from existing actor data or explicitly schema-backed fields.
  - [x] Do not implement skill tests, characteristic tests, initiative, combat state updates, spellcasting, or builder logic.
- [x] Verify. (AC: 1-7)
  - [x] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [x] Validate in Foundry VTT 14 with default, partial, filled, editable, non-editable, light/dark theme, and narrow-width states.

## Dev Notes

- Story 2.1 is the immediate predecessor and already defines the character shell guardrails. Preserve its Foundry V2 sheet pattern, registration, localization, scoped CSS, and validation evidence format.
- Current `BaseActorSheet` already prepares `resourceFields` and `characteristicFields`; extend that path instead of moving display logic into Handlebars.
- Current data schemas already define `system.resources.health/stamina/magicka`, `system.characteristics`, and `system.experience`; prefer extending these schemas conservatively over adding ad hoc template-only data.
- If new derived values require persisted source fields, add them through `foundry.data.fields` and record migration impact. Do not add compatibility code without concrete existing-world data need.
- Keep UI labels in `lang/en.json`; do not hardcode user-facing labels or warnings.
- This story is character-sheet display/edit readiness only. Later stories own skills, inventory, magic, roll/test entry points, combat, and builders.

## Project Structure Notes

- Primary files: `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/CharacterSheet.ts`, `templates/actor/character-sheet.hbs`, `src/module/data/actor/BaseActorData.ts`, `src/module/data/actor/CharacterData.ts`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.
- Build-copy coverage already includes actor templates, styles, and language files; update `vite.config.ts` only if a new runtime asset category is introduced.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.2-Add-Character-Characteristics-Resources-And-Derived-Summary-Panels`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-7---Sheet-And-Chat-UI-Stay-Localized-Tokenized-And-Foundry-Native`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Release-Scope-Surfaces`
- `_bmad-output/implementation-artifacts/2-1-build-character-sheet-shell-identity-permissions-and-empty-states.md`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

- 2026-08-04: Ran `npm run typecheck`, `npm run lint`, and `npm run build` after implementation and after Foundry validation feedback changes; all passed.
- 2026-08-04: Foundry validation initially reported bad display in overview/resource/characteristic sections; revised resource bar, removed redundant overview totals and duplicate characteristic display, then user reported validation passed.

### Completion Notes List

- Preserved Story 2.1 character sheet shell, identity, notes, and permission handling while extending existing context preparation for characteristics and resources.
- Prepared schema-backed characteristic/resource display metadata in `_prepareContext`, including safe numeric fallbacks, localized labels, warning messages, editable/read-only state, and resource fill percentage.
- Replaced placeholder overview copy with compact semantic resource bars showing editable current value, slash separator, non-editable max value, accessible aria labels, and text-paired color accents.
- Kept characteristic editing direct and non-redundant, using localized labels and numeric inputs without adding roll/combat/test automation.
- Renamed the experience field display label to localized `Total XP`.
- Foundry VTT 14 validation passed by user report for default, partial, filled, editable, non-editable, light/dark theme, and narrow-width character sheet states after display revisions.

### File List

- `_bmad-output/implementation-artifacts/2-2-add-character-characteristics-resources-and-derived-summary-panels.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `lang/en.json`
- `src/module/applications/actor/BaseActorSheet.ts`
- `styles/uesrpg-rebuilt.css`
- `templates/actor/character-sheet.hbs`

### Change Log

- 2026-08-04: Implemented Story 2.2 characteristic, resource, fallback warning, and display-readiness panels; verified with typecheck, lint, build, and user-reported Foundry VTT 14 validation.
