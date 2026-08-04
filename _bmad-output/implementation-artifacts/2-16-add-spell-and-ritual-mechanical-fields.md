# Story 2.16: Add Spell And Ritual Mechanical Fields

Status: ready-for-dev

## Story

As a player or GM configuring UESRPG magic entries,
I want spell and ritual sheets to expose their key mechanical and descriptive fields clearly,
so that magic can be understood and maintained without raw data editing.

## Acceptance Criteria

1. Spell sheets show school, governing skill/characteristic where applicable, cost, difficulty, range, duration, target, traits, casting notes, and effect description where available, with near-field warnings.
2. Ritual sheets show ritual type/category, requirements, participants, duration, cost, difficulty, steps, risks, manual adjudication notes, and effect description where available.
3. Ritual complexity or edge-case magic shows visible manual-fallback language and does not imply unavailable automation.
4. Permitted mechanical edits persist through awaited Foundry document updates using schema-backed paths and remain structurally valid for later workflows.
5. Spellcasting, ritual resolution, mishap resolution, and spell builder automation are absent or clearly disabled/labeled.
6. Labels, warnings, numeric typography, mechanical/prose separation, responsive layout, permissions, manual fallback, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit Story 2.15 spell/ritual shell implementation. (AC: 1-4)
  - [ ] Read the new spell/ritual data models, sheets, templates, localization, and Dev Agent Record.
- [ ] Add mechanical fields. (AC: 1-4, 6)
  - [ ] Add fields through `foundry.data.fields` with safe initial values and validation.
  - [ ] Prepare display/edit context in TypeScript and keep templates simple.
  - [ ] Add visible manual-fallback language for rituals and edge-case magic.
  - [ ] Visibly separate mechanical fields from prose/effect fields.
- [ ] Preserve automation boundary. (AC: 5)
  - [ ] Do not implement spellcasting, ritual rolling, mishaps, builders, or chat output.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate spell and ritual documents with default, partial, filled, dense, editable, and non-editable states in Foundry VTT 14.

## Dev Notes

- Story 2.15 must establish document types/shells before this story can safely add mechanical fields.
- Field choices should support later Epic 4 magic workflows and Epic 5 spell builder without embedding roll math or builder assumptions now.
- Manual fallback must be visible, localized, concise, and honest.

## Project Structure Notes

- Primary files: spell/ritual item data models, item sheet classes/templates, constants/document types, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.16-Add-Spell-And-Ritual-Mechanical-Fields`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-5---Builders-Are-Document-Authoring-Workflows`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-9---Manual-Fallback-Is-A-Visible-Workflow-State`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
