# Story 2.19: Add Enchantment And Alchemy Mechanical Fields

Status: ready-for-dev

## Story

As a player or GM configuring enchantment or alchemy-relevant entries,
I want their key structured fields and manual notes exposed clearly,
so that enchantments, enchanted items, ingredients, potions, poisons, and alchemy outputs can be understood and maintained without raw data editing.

## Acceptance Criteria

1. Enchantment or enchanted item sheets show type/category, effect summary, magnitude/potency where applicable, duration, charges/usage notes, item relationship, cost/value, risks, and manual adjudication notes where available.
2. Ingredient, potion, poison, or alchemy output sheets show category, effect summary, potency, dose/quantity, usage notes, creation notes, mishap/risk notes, value, and manual adjudication notes where available.
3. Missing data is surfaced near affected fields, and manual-fallback language explains structured values versus GM-adjudicated outcomes.
4. Permitted edits persist through awaited Foundry document updates using schema-backed paths and remain valid for later builders, alchemy, mishap, compendium, or content workflows.
5. Enchanting builders, alchemy builders, alchemy resolution, mishap resolution, and artifact generation are absent or clearly disabled/labeled.
6. Labels, numeric typography, mechanical/prose separation, responsive layout, permissions, manual fallback, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit Story 2.18 shell implementation. (AC: 1-4)
  - [ ] Read enchantment/alchemy data models, sheets, templates, localization, and Dev Agent Record.
- [ ] Add structured fields and manual notes. (AC: 1-4, 6)
  - [ ] Add fields through `foundry.data.fields` with safe initial values.
  - [ ] Prepare display/edit context in TypeScript; keep templates simple.
  - [ ] Add missing-data and manual-fallback messaging near affected fields.
  - [ ] Keep mechanical fields visibly separated from prose/effect fields.
- [ ] Preserve automation boundary. (AC: 5)
  - [ ] Do not implement builders, alchemy use, mishap resolution, effect automation, artifact generation, or pack content.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate supported enchantment/alchemy documents with default, partial, filled, dense, editable, and non-editable states in Foundry VTT 14.

## Dev Notes

- This story must preserve the 1.0 minimal/deferred scope. Structured fields support understanding and later workflows; they do not resolve effects automatically.
- Manual fallback must be visible, localized, and honest.
- If deeper mechanics become necessary, record follow-up scope rather than overbuilding this story.

## Project Structure Notes

- Primary files: enchantment/alchemy item data models, item sheet classes/templates, constants/document types, `system.json`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.19-Add-Enchantment-And-Alchemy-Mechanical-Fields`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-9---Manual-Fallback-Is-A-Visible-Workflow-State`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Magic-Entity-Sheets`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
