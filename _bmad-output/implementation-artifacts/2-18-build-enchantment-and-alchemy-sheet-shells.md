# Story 2.18: Build Enchantment And Alchemy Sheet Shells

Status: ready-for-dev

## Story

As a player or GM creating enchantment or alchemy-relevant entries,
I want Foundry-native sheet shells for enchantment and alchemy data,
so that these 1.0 manual/deferred areas still have reliable, localized, editable surfaces.

## Acceptance Criteria

1. Enchantment, enchanted item, alchemy output, ingredient, potion, poison, or related documents use Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior.
2. Header, identity, type/category, mechanical area, prose/effect description, manual notes, and GM/private or provenance-adjacent notes render safely for default, missing, and partial data.
3. Permitted edits persist through awaited Foundry document updates using explicit schema-backed paths with migration impact assessed.
4. Visible manual-fallback language communicates what is editable and what requires GM adjudication; sheets do not imply unavailable automated creation, pricing, balancing, mishap, or effect-resolution behavior.
5. Limited/non-editable states remain legible and handle edit-only controls according to Foundry conventions.
6. Labels, warnings, manual-fallback language, empty states, tokenized styling, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit current and prerequisite item support. (AC: 1-4)
  - [ ] Read current item type registration and any item sheet bases from Stories 2.12 and 2.15.
- [ ] Add enchantment/alchemy document shells if absent. (AC: 1-6)
  - [ ] Add item types/data models/sheet registration/templates/localization/styles atomically if new document types are needed.
  - [ ] Keep shells simple, editable, and explicit about 1.0 manual/deferred depth.
  - [ ] Do not add alchemy/enchanting builders, mishap resolution, effect automation, pricing, balancing, or artifact generation.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate default, partial, editable, non-editable, manual-fallback, light/dark, and narrow-width states in Foundry VTT 14.

## Dev Notes

- Architecture explicitly defers deeper enchantment and alchemy mechanics for 1.0; this story is about honest, editable sheet shells.
- Current item types likely do not cover enchantment/alchemy. Follow AD-2 if adding types.
- Manual fallback is required and must be localized, concise, and visible.

## Project Structure Notes

- Likely files: item data models/sheets/templates, constants/document types, `system.json`, `src/module/data/index.ts`, `src/module/applications/index.ts`, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.18-Build-Enchantment-And-Alchemy-Sheet-Shells`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-9---Manual-Fallback-Is-A-Visible-Workflow-State`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#Deferred`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
