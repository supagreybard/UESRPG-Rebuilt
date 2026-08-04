# Story 2.6: Build Statblock Sheet Shell, Identity, Permissions, And Empty States

Status: ready-for-dev

## Story

As a GM preparing a non-player entity,
I want a Foundry-native statblock sheet shell with identity fields, clear sections, permissions, and safe empty states,
so that NPC and creature data has a reliable, readable place to live before detailed statblock sections are added.

## Acceptance Criteria

1. NPC/statblock actor sheet uses the system Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior.
2. Header, identity area, type/category fields, section/tab structure, notes area, and GM/private area render safely for default, missing, and partial data.
3. Permitted edits persist through awaited Foundry document updates using schema-backed paths, with migration impact assessed for persisted shape changes.
4. Non-GM/limited/observer/non-owner states respect Foundry permissions, protect GM/private data, remain legible, and handle edit-only controls conventionally.
5. Labels, section headings, warnings, and empty states use localization and scoped tokenized styling with readable light/dark focus states.
6. Foundry VTT 14 validation covers default, partial, editable, non-editable, resized, and themed states.

## Tasks / Subtasks

- [ ] Audit current NPC/statblock source before editing. (AC: 1-5)
  - [ ] Read `BaseActorSheet`, `NPCSheet`, `templates/actor/npc-sheet.hbs`, `BaseActorData`, `NPCData`, `src/module/applications/index.ts`, `system.json`, `lang/en.json`, and `styles/uesrpg-rebuilt.css`.
  - [ ] Confirm `ACTOR_TYPES.npc` / `system.json` `npc` is the statblock actor type for this story; do not add another actor type unless explicitly needed and coordinated.
- [ ] Harden the NPC/statblock shell. (AC: 1-5)
  - [ ] Add identity, type/category, notes, GM/private, and empty-state context in TypeScript.
  - [ ] Preserve common `BaseActorSheet` behavior shared with character sheets.
  - [ ] Keep detailed characteristics/resources/defenses out of scope except preserving current safe rendering; Story 2.7 owns completion.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate in Foundry VTT 14 with default, partial, editable, observer/limited/non-owner where feasible, light/dark theme, and narrow-width states.

## Dev Notes

- Current `NPCSheet` already extends `BaseActorSheet` and points at `templates/actor/npc-sheet.hbs`; this story should harden that existing surface rather than create a separate statblock app.
- Current `NPCData` defines NPC characteristics through `defineNpcCharacteristics()` plus base resources/prose. Add fields only through `foundry.data.fields` schemas.
- Preserve character sheet behavior when modifying shared `BaseActorSheet` or shared CSS.
- No combat, attack, defense resolution, magic workflow, content, or builder automation belongs in this story.

## Project Structure Notes

- Primary files: `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/NPCSheet.ts`, `templates/actor/npc-sheet.hbs`, `src/module/data/actor/BaseActorData.ts`, `src/module/data/actor/NPCData.ts`, `src/module/config/constants.ts`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.6-Build-Statblock-Sheet-Shell-Identity-Permissions-And-Empty-States`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-7---Sheet-And-Chat-UI-Stay-Localized-Tokenized-And-Foundry-Native`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Statblock-Sheet`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
