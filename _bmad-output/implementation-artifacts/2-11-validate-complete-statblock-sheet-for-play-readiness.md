# Story 2.11: Validate Complete Statblock Sheet For Play Readiness

Status: ready-for-dev

## Story

As Greybard preparing statblock support for later combat, magic, content, and builder work,
I want the complete statblock sheet validated across realistic data and permission states,
so that later workflows can safely rely on statblock data being visible, editable, and understandable.

## Acceptance Criteria

1. With Stories 2.6 through 2.10 implemented, complete statblock sheets open in Foundry VTT 14 with identity, type/category, notes, GM/private areas, characteristics, resources, defenses, summaries, attacks, abilities, equipment, treasure, and magic summaries rendering together.
2. Default, partial, filled, dense, and intentionally incomplete statblocks show safe fallbacks, localized labels, near-field warnings, and no broken template output.
3. Representative edits persist actor and embedded item data through Foundry APIs, with migration impact recorded for changed persisted schema.
4. GM/owner, observer/limited, and non-owner states respect permissions, edit-only controls, item actions, private fields, and readable non-editable views.
5. Light/dark themes, normal/narrow widths, visible focus states, keyboard traversal, numeric alignment, and no horizontal scrolling for core fields are verified.
6. Gaps blocking Epic 3, Epic 4, Epic 5, or Epic 6 are recorded, and unavailable automation remains absent, disabled, or labeled.

## Tasks / Subtasks

- [ ] Confirm prerequisite implementation status. (AC: 1)
  - [ ] Verify Stories 2.6-2.10 are implemented in source.
  - [ ] Read their Dev Agent Records and file lists.
- [ ] Build realistic validation fixtures. (AC: 1-6)
  - [ ] Use empty, partial, filled, dense, and intentionally incomplete NPC/statblock actors with supported embedded item/magic data.
- [ ] Run automated and runtime checks. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate permissions, light/dark themes, and narrow-width behavior in Foundry VTT 14.
  - [ ] Record Foundry version/build, world/test data, actions, expected/actual results, status, limitations, and follow-up defects/stories.
- [ ] Fix only statblock-sheet-scope blockers. (AC: 1-6)

## Dev Notes

- This is a validation/hardening story, not a new combat, magic, content, or builder implementation story.
- Do not claim runtime validation passed if the local Foundry environment blocks validation.
- Treat missing localization, hidden required statblock data, misleading unavailable automation, and permission leaks as defects.

## Project Structure Notes

- Likely touched files are those changed by Stories 2.6-2.10 only. Avoid unrelated refactors and do not hand-edit `dist`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.11-Validate-Complete-Statblock-Sheet-For-Play-Readiness`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/project-context.md#Testing-Rules`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
