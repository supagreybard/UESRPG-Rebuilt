# Epic 2 Sprint Plan: Playable Documents And Sheets

Generated: 2026-08-04  
Project: UESRPG-Rebuilt  
Source Epic: `_bmad-output/planning-artifacts/epics.md`  
Status Source: `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Planning Summary

Epic 2 is already started and all 20 Epic 2 story files exist. The sprint tracker has `epic-2: in-progress` and every Epic 2 story at `ready-for-dev`.

Use these sprints as execution bundles. Each sprint should preserve the existing Foundry VTT 14 sheet patterns, localization, scoped UI tokens, permission behavior, default/missing/filled state safety, and manual Foundry validation evidence requirements.

## Sprint 2A: Character Sheet Core

Goal: Deliver a complete playable character sheet foundation that later d100, combat, magic, and builder workflows can rely on.

Stories:

- `2-1-build-character-sheet-shell-identity-permissions-and-empty-states`
- `2-2-add-character-characteristics-resources-and-derived-summary-panels`
- `2-3-add-character-skills-and-common-play-lists`
- `2-4-add-character-inventory-equipment-and-magic-summary-sections`
- `2-5-validate-complete-character-sheet-for-core-play-readiness`

Exit Gate:

- Character actors render, edit, resize, and handle default, partial, dense, editable, and non-editable states without runtime errors.
- Character sheet validation evidence is recorded before moving dependent character workflows into Epic 3 or Epic 4.

## Sprint 2B: Statblock Sheet Core

Goal: Deliver a complete GM-facing statblock sheet suitable for preparation and live encounter reference.

Stories:

- `2-6-build-statblock-sheet-shell-identity-permissions-and-empty-states`
- `2-7-add-statblock-characteristics-resources-defenses-and-summary-panels`
- `2-8-add-statblock-attacks-and-abilities`
- `2-9-add-statblock-equipment-and-treasure`
- `2-10-add-statblock-magic-summaries`
- `2-11-validate-complete-statblock-sheet-for-play-readiness`

Exit Gate:

- Statblock actors support readable identity, characteristics, resources, defenses, attacks, abilities, equipment, treasure, and magic summaries.
- GM/private data and non-owner permission states are validated in Foundry.

## Sprint 2C: Equipment And General Item Sheets

Goal: Make equipment and general item documents understandable, editable, and useful from both item and actor contexts.

Stories:

- `2-12-build-equipment-and-general-item-sheet-shells`
- `2-13-add-equipment-and-general-item-mechanical-fields`
- `2-14-validate-equipment-and-general-item-sheets-for-play-readiness`

Exit Gate:

- Equipment and general item sheets visibly separate identity, mechanics, and prose fields.
- Representative item data can be created, edited, embedded, opened, and reviewed without raw data editing.

## Sprint 2D: Spell And Ritual Sheets

Goal: Make spell and ritual documents usable for manual play and ready for later Epic 4 spellcasting workflows.

Stories:

- `2-15-build-spell-and-ritual-sheet-shells`
- `2-16-add-spell-and-ritual-mechanical-fields`
- `2-17-validate-spell-and-ritual-sheets-for-play-readiness`

Exit Gate:

- Spell and ritual sheets expose casting-relevant fields, safe missing-data states, and visible manual fallback where automation is deferred.
- Later spellcasting workflow dependencies are recorded as story notes or deferred work.

## Sprint 2E: Enchantment, Alchemy, And Epic Closeout

Goal: Provide minimal manual-play-ready enchantment and alchemy surfaces without overbuilding deferred automation.

Stories:

- `2-18-build-enchantment-and-alchemy-sheet-shells`
- `2-19-add-enchantment-and-alchemy-mechanical-fields`
- `2-20-validate-enchantment-and-alchemy-sheets-for-manual-play-readiness`
- `epic-2-retrospective`

Exit Gate:

- Enchantment and alchemy sheets are legible, localized, editable, and clear about manual/deferred automation boundaries.
- Epic 2 retrospective captures follow-up defects, Epic 3/Epic 4 blockers, and validation limitations.

## Recommended Execution Rules

- Keep validation stories at the end of each document-family sprint unless a blocker requires earlier runtime validation.
- Do not mark a family sprint complete until `npm run typecheck`, `npm run lint`, `npm run build`, and relevant Foundry runtime validation evidence are recorded or explicitly deferred with rationale.
- Preserve `sprint-status.yaml` as the machine-readable source of truth. Update individual story statuses there as implementation moves from `ready-for-dev` to `in-progress`, `review`, and `done`.
- Capture cross-family follow-up work in `_bmad-output/implementation-artifacts/deferred-work.md` when it should not block the current story.
