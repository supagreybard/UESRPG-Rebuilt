# Story 2.17: Validate Spell And Ritual Sheets For Play Readiness

Status: ready-for-dev

## Story

As Greybard preparing spell and ritual support for later magic workflows,
I want spell and ritual sheets validated across realistic magic data states,
so that spellcasting, ritual workflows, mishaps, builders, and compendia can safely rely on magic data being visible, editable, and understandable.

## Acceptance Criteria

1. With Stories 2.15 and 2.16 implemented, spell and ritual sheets open in Foundry VTT 14 with identity, category, mechanical fields, descriptions, ritual/manual notes, and applicable private/provenance-adjacent areas.
2. Default, partial, filled, dense, and intentionally incomplete magic documents show safe fallbacks, localized labels, near-field warnings, manual fallback where applicable, and no broken template output.
3. Representative edits persist item data through Foundry APIs, with migration impact recorded for changed persisted schema.
4. Owner/editor, observer/limited, and non-owner states respect permissions, private fields, manual notes, and readable non-editable views.
5. Light/dark themes, normal/narrow widths, visible focus states, keyboard traversal, numeric alignment, and mechanical/prose separation are verified.
6. Gaps blocking Epic 4, Epic 5, or Epic 6 are recorded, and unavailable automation remains absent, disabled, or labeled.

## Tasks / Subtasks

- [ ] Confirm prerequisite implementation status. (AC: 1)
  - [ ] Verify Stories 2.15 and 2.16 are implemented in source and read their Dev Agent Records.
- [ ] Build spell/ritual validation fixtures. (AC: 1-6)
  - [ ] Use default, partial, filled, dense, and intentionally incomplete spell and ritual documents.
- [ ] Run automated and runtime checks. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate permissions, manual fallback, light/dark themes, and narrow-width behavior in Foundry VTT 14.
  - [ ] Record Foundry version/build, world/test data, actions, expected/actual results, status, limitations, and follow-up defects/stories.
- [ ] Fix only spell/ritual-sheet-scope blockers. (AC: 1-6)

## Dev Notes

- This is validation/hardening, not spellcasting, ritual resolution, mishap, builder, or compendium implementation.
- Manual fallback visibility is required for rituals and edge-case magic.
- If spell/ritual document types were not fully implemented by prerequisite stories, record the gap precisely.

## Project Structure Notes

- Likely touched files are those changed by Stories 2.15-2.16 only. Do not hand-edit `dist`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.17-Validate-Spell-And-Ritual-Sheets-For-Play-Readiness`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/project-context.md#Testing-Rules`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
