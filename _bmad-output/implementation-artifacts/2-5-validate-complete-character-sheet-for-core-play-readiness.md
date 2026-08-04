# Story 2.5: Validate Complete Character Sheet For Core Play Readiness

Status: ready-for-dev

## Story

As Greybard preparing character support for later rules automation,
I want the complete character sheet validated across realistic data and permission states,
so that Epic 3 and Epic 4 workflows can safely rely on character sheet data being visible, editable, and understandable.

## Acceptance Criteria

1. With Stories 2.1 through 2.4 implemented, the complete character sheet opens in Foundry VTT 14 with identity, notes, GM/private areas, characteristics, resources, summaries, skills, common play lists, inventory, equipment, and magic summaries rendering together.
2. Default, partial, filled, dense, and intentionally incomplete character data states show safe fallbacks, localized labels, near-field missing-data warnings, and no broken template output.
3. Representative edits across character sheet sections persist actor and embedded item data through Foundry document APIs, with migration impact recorded for changed schema shape.
4. Owner/editor, observer/limited, and non-owner permission states respect Foundry controls, item actions, private fields, and readable non-editable views.
5. Light/dark themes, normal/narrow widths, visible focus states, keyboard traversal, numeric alignment, and no horizontal scrolling for core fields are verified.
6. Gaps blocking Epic 3, Epic 4, or Epic 5 are recorded as follow-up defects/story notes, and unavailable automation remains absent, disabled, or labeled.

## Tasks / Subtasks

- [ ] Confirm prerequisite implementation status. (AC: 1)
  - [ ] Verify Stories 2.1-2.4 are implemented in source, not only contexted.
  - [ ] Read the completed Dev Agent Records and file lists for Stories 2.1-2.4 before validating.
- [ ] Build realistic validation fixtures manually in a Foundry dev world. (AC: 1-6)
  - [ ] Use default, partial/missing, filled, dense, and intentionally incomplete character actors.
  - [ ] Include embedded items and magic-relevant entries where Story 2.4 supports them.
- [ ] Run automated and runtime checks. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate editable and non-editable permission states, light/dark themes, and narrow-width layout.
  - [ ] Record Foundry version/build, world/test data, action, expected result, actual result, status, limitations, and follow-up defect/story.
- [ ] Fix only validation-blocking defects that are in the completed character sheet scope. (AC: 1-6)
  - [ ] Do not implement Epic 3/4/5 automation as part of this validation story.

## Dev Notes

- This is a validation and hardening story, not a new feature expansion story.
- Use Story 1.4 and Story 2.1 validation evidence format. If Foundry runtime validation is blocked, record the blocker honestly and do not claim pass.
- Treat missing localization keys, broken copied assets, unhandled non-editable states, and layout regressions as defects.
- Later d100, combat, magic, and builder workflows may depend on character data being visible and editable, but do not add those workflows here.

## Project Structure Notes

- Likely touched files are the files changed by Stories 2.1-2.4 only. Avoid unrelated refactors.
- Do not hand-edit `dist`; rebuild from source if package output is needed for validation.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.5-Validate-Complete-Character-Sheet-For-Core-Play-Readiness`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/project-context.md#Testing-Rules`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
