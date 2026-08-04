# Story 2.20: Validate Enchantment And Alchemy Sheets For Manual Play Readiness

Status: ready-for-dev

## Story

As Greybard preparing enchantment and alchemy support for 1.0,
I want enchantment and alchemy-relevant sheets validated across realistic manual/deferred data states,
so that these areas are usable, honest about automation limits, and ready for later builders or workflows.

## Acceptance Criteria

1. With Stories 2.18 and 2.19 implemented, enchantment and alchemy-relevant sheets open in Foundry VTT 14 with identity, category, mechanical fields, descriptions, manual notes, and applicable private/provenance-adjacent areas.
2. Default, partial, filled, dense, and intentionally incomplete documents show safe fallbacks, localized labels, near-field warnings, visible manual fallback, and no broken template output.
3. Representative edits persist item data through Foundry APIs, with migration impact recorded for changed persisted schema.
4. Owner/editor, observer/limited, and non-owner states respect permissions, private fields, manual notes, and readable non-editable views.
5. Light/dark themes, normal/narrow widths, visible focus states, keyboard traversal, numeric alignment, and mechanical/prose separation are verified.
6. Gaps blocking Epic 4, Epic 5, or Epic 6 are recorded, and unavailable automation remains absent, disabled, or labeled.

## Tasks / Subtasks

- [ ] Confirm prerequisite implementation status. (AC: 1)
  - [ ] Verify Stories 2.18 and 2.19 are implemented in source and read their Dev Agent Records.
- [ ] Build validation fixtures. (AC: 1-6)
  - [ ] Use default, partial, filled, dense, and intentionally incomplete enchantment/alchemy-relevant documents.
- [ ] Run automated and runtime checks. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate permissions, manual fallback, light/dark themes, and narrow-width behavior in Foundry VTT 14.
  - [ ] Record Foundry version/build, world/test data, actions, expected/actual results, status, limitations, and follow-up defects/stories.
- [ ] Fix only enchantment/alchemy sheet-scope blockers. (AC: 1-6)

## Dev Notes

- This is validation/hardening for manual/deferred sheet support. Do not implement enchanting builders, alchemy builders, mishap resolution, artifact generation, or compendium content.
- Manual fallback visibility is the key release-readiness risk for these surfaces.
- If document type coverage is narrower than the epic wording, record the gap and blocker exactly.

## Project Structure Notes

- Likely touched files are those changed by Stories 2.18-2.19 only. Do not hand-edit `dist`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.20-Validate-Enchantment-And-Alchemy-Sheets-For-Manual-Play-Readiness`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/project-context.md#Testing-Rules`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
