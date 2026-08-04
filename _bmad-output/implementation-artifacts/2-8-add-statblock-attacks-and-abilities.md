# Story 2.8: Add Statblock Attacks And Abilities

Status: ready-for-dev

## Story

As a GM using a statblock during play,
I want attacks and special abilities visible, organized, and editable where appropriate,
so that I can quickly understand what a non-player entity can do without raw data editing.

## Acceptance Criteria

1. Attack entries list localized labels and key values such as name, attack type, governing value, damage, range/reach, traits, or notes where available.
2. Special abilities, traits, powers, or similar action-relevant entries are grouped in readable localized sections without becoming ornate mini-sheets.
3. Empty, missing, partial, filled, and dense attack/ability data show safe empty states, fallbacks, and row/section-local warnings.
4. GM/permitted management actions such as open, edit, create placeholder, delete, reorder, or supported entry management use Foundry-native controls and awaited document APIs.
5. Attack roll, defense, damage, and ability automation are absent or clearly disabled/labeled; this story does not implement Epic 4 combat math.
6. Normal/narrow widths, keyboard traversal, aligned values, non-editable states, localization, persistence, and Foundry VTT 14 validation are covered.

## Tasks / Subtasks

- [ ] Audit current actor-owned item and rule-item capabilities. (AC: 1-4)
  - [ ] Read NPC sheet files, item document/data/sheet registration, `PowerData`, `TraitData`, `WeaponData`, and `system.json` item types.
- [ ] Add attacks and abilities display/management. (AC: 1-4, 6)
  - [ ] Prepare grouped rows in TypeScript from actor-owned items or schema-backed statblock data.
  - [ ] Add localized labels, warnings, empty states, and scoped mechanical-list CSS.
  - [ ] Use Foundry document APIs for management actions.
- [ ] Preserve scope boundary. (AC: 5)
  - [ ] Do not add d100 roll service calls, attack dialogs, damage resolution, defense workflows, or chat cards.
- [ ] Verify. (AC: 1-6)
  - [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`.
  - [ ] Validate statblocks with empty, partial, filled, dense, editable, and non-editable attack/ability data in Foundry VTT 14.

## Dev Notes

- Weapons, traits, and powers already exist as item concepts; reuse actor-owned embedded Items where appropriate instead of inventing parallel attack/ability state.
- If a new attack/ability persisted schema is needed, add it through data models and record migration impact.
- Epic 4 owns combat and ability automation. Keep this story focused on visible, editable statblock data.

## Project Structure Notes

- Likely files: NPC actor sheet class/template, item data/sheet classes for weapon/trait/power, constants/document types if new item types are introduced, `lang/en.json`, `styles/uesrpg-rebuilt.css`.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.8-Add-Statblock-Attacks-And-Abilities`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-4---Rules-Automation-Uses-Shared-Services-And-Transparent-Chat`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Statblock-Sheet`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
