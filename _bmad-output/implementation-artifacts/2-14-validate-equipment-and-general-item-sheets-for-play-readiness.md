# Story 2.14: Validate Equipment And General Item Sheets For Play Readiness

Status: ready-for-dev

## Story

As Greybard preparing equipment and item support for later workflows,
I want equipment and general item sheets validated across realistic item types and data states,
so that character sheets, statblocks, combat, treasure, builders, and compendia can safely rely on item data being visible, editable, and understandable.

## Acceptance Criteria

1. With Stories 2.12 and 2.13 implemented, weapon, armor, equipment, consumable, and general item sheets open in Foundry VTT 14 with identity, category, mechanical fields, descriptions, notes, and applicable private/provenance-adjacent areas.
2. Default, partial, filled, dense, and intentionally incomplete item states show safe fallbacks, localized labels, near-field warnings, and no broken template output.
3. Representative edits persist item data through Foundry APIs, with migration impact recorded for changed persisted schema.
4. Owner/editor, observer/limited, and non-owner states respect permissions, edit-only controls, private fields, and readable non-editable views.
5. Light/dark themes, normal/narrow widths, visible focus states, keyboard traversal, numeric alignment, and no horizontal scrolling for core fields are verified.
6. Gaps blocking Epic 2 follow-on sheets, Epic 4, Epic 5, or Epic 6 are recorded, and unavailable automation remains absent, disabled, or labeled.

## Tasks / Subtasks

- [ ] Confirm prerequisite implementation status. (AC: 1)
  - [ ] Verify Stories 2.12 and 2.13 are implemented in source and read their Dev Agent Records.
- [ ] Build item validation fixtures. (AC: 1-6)
  - [ ] Use each supported equipment/general item type in default, partial, filled, dense, and incomplete states.
- [ ] Run automated and runtime checks. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate permissions, light/dark themes, and narrow-width behavior in Foundry VTT 14.
  - [ ] Record Foundry version/build, world/test data, actions, expected/actual results, status, limitations, and follow-up defects/stories.
- [ ] Fix only item-sheet-scope blockers. (AC: 1-6)

## Dev Notes

- This is validation/hardening, not combat, builder, treasure, or compendium implementation.
- If requested item types were not implemented by Stories 2.12-2.13, record the gap precisely rather than pretending validation covers them.
- Missing localization, broken permissions, not-applicable fields shown as broken data, and layout regressions are defects.

## Project Structure Notes

- Likely touched files are those changed by Stories 2.12-2.13 only. Do not hand-edit `dist`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.14-Validate-Equipment-And-General-Item-Sheets-For-Play-Readiness`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/project-context.md#Testing-Rules`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
