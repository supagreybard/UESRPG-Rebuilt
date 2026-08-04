# Story 2.7: Add Statblock Characteristics, Resources, Defenses, And Summary Panels

Status: ready-for-dev

## Story

As a GM reviewing a non-player entity,
I want characteristics, resources, defenses, and key summary values visible and editable where appropriate,
so that I can understand the statblock's current game state without raw data editing.

## Acceptance Criteria

1. Statblock characteristics or equivalent traits display with numeric typography, localized labels, and schema-backed editable source fields.
2. Resources such as health, magicka, and stamina show current/max values with text-paired semantic colors and reachable editable fields.
3. Defense/protection summaries group key values and surface missing defense data near affected fields or sections.
4. Default, missing, or partial data renders safe fallbacks and warnings without broken template output or hidden required statblock data.
5. Derived summary labels and display values are prepared in TypeScript; templates do not duplicate later roll/combat/magic calculations.
6. Narrow-width, dense, and non-editable permission states remain readable and usable.
7. Foundry VTT 14 validation covers default, partial, filled, editable, and non-editable statblock states.

## Tasks / Subtasks

- [ ] Audit existing NPC/statblock data and template. (AC: 1-5)
  - [ ] Read `NPCData`, shared characteristics definitions, `BaseActorData`, `BaseActorSheet`, `NPCSheet`, and `npc-sheet.hbs`.
- [ ] Add statblock mechanical panels. (AC: 1-6)
  - [ ] Extend `_prepareContext` with display-ready characteristic, resource, defense, summary, warning, and permission context.
  - [ ] Add schema-backed defense/source fields only if needed; record migration impact.
  - [ ] Use localized labels and scoped tokenized CSS.
- [ ] Preserve boundaries. (AC: 5)
  - [ ] Do not add attack rolls, defense workflows, damage resolution, spellcasting, or combat state updates.
- [ ] Verify. (AC: 1-7)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate default, partial, filled, editable, non-editable, light/dark, and narrow-width states in Foundry VTT 14.

## Dev Notes

- Build on Story 2.6 shell behavior and avoid regressing shared actor sheet code.
- Current `BaseActorSheet` prepares resources and characteristics generically; prefer extending shared preparation carefully or overriding in `NPCSheet` when NPC-specific fields are needed.
- Defense display is data visibility only. Epic 4 owns attack/defense workflows and state updates.

## Project Structure Notes

- Primary files: `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/NPCSheet.ts`, `templates/actor/npc-sheet.hbs`, `src/module/data/actor/NPCData.ts`, `src/module/data/shared/characteristics.ts`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.7-Add-Statblock-Characteristics-Resources-Defenses-And-Summary-Panels`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-4---Rules-Automation-Uses-Shared-Services-And-Transparent-Chat`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
