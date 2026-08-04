# Story 2.10: Add Statblock Magic Summaries

Status: ready-for-dev

## Story

As a GM preparing or reviewing a magical NPC or creature,
I want magic-relevant statblock entries summarized clearly,
so that spellcasting, ritual, enchantment, alchemy, or magical-trait information is visible without raw data editing.

## Acceptance Criteria

1. Spells, magical traits, ritual notes, enchantment notes, alchemy notes, or other magic-relevant entries are grouped in predictable localized sections with empty states.
2. Magic rows show key values such as school, cost, difficulty, range, duration, preparation/known state, ritual/manual status, or notes where available.
3. Missing magic values are surfaced near affected entries rather than silently omitted.
4. Ritual, enchantment, alchemy, rare magic, or GM-adjudicated complexity shows visible manual-fallback language and does not imply unavailable automation.
5. GM/permitted management uses Foundry-native controls and awaited document APIs while keeping data structurally valid for later workflows.
6. Spellcasting, ritual resolution, mishap resolution, alchemy creation, and builder automation are absent or clearly disabled/labeled.
7. Normal/narrow widths, keyboard traversal, non-editable permissions, localization, manual fallback, persistence, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit current magic-relevant types and statblock support. (AC: 1-5)
  - [ ] Read current item types, rule item models, NPC sheet files, and planned magic item sheet stories.
- [ ] Add statblock magic summary sections. (AC: 1-5, 7)
  - [ ] Prepare grouped magic rows from actor-owned items or schema-backed notes.
  - [ ] Add localized labels, warnings, manual-fallback language, empty states, and scoped CSS.
  - [ ] Use Foundry document APIs for supported management actions.
- [ ] Preserve scope boundary. (AC: 6)
  - [ ] Do not implement spellcasting, rituals, mishaps, alchemy resolution, or builders.
- [ ] Verify. (AC: 1-7)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate empty, partial, filled, dense, editable, and non-editable magic states in Foundry VTT 14.

## Dev Notes

- Current registered item types do not include spell/ritual/enchantment/alchemy. Add document types only through a coordinated AD-2 change, or represent unsupported magic as schema-backed notes with visible manual fallback until those sheets exist.
- Manual fallback is a required visible state for ritual/enchantment/alchemy complexity; keep it honest and localized.
- This story prepares statblock visibility for Epic 4 magic workflows but does not call rules services or produce chat output.

## Project Structure Notes

- Likely files: NPC sheet class/template, item data/sheet classes if new magic item types are introduced, constants/document-types/system metadata, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.10-Add-Statblock-Magic-Summaries`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-9---Manual-Fallback-Is-A-Visible-Workflow-State`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Magic-Entity-Sheets`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
