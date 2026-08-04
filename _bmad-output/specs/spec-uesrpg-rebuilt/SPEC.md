---
id: SPEC-uesrpg-rebuilt
companions:
  - ../../project-context.md
  - ../../planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md
  - ../../planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-checklist.md
  - ../../planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-decisions.md
  - ../../planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md
  - ../../planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md
  - ../../planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md
sources:
  - ../../planning-artifacts/briefs/brief-UESRPG-Rebuilt-2026-07-27/brief.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability only; consult them only if you need narrative rationale this contract intentionally omits.

# UESRPG Rebuilt 1.0

## Why

UESRPG Rebuilt exists to make UESRPG 3e v4 practical to run in Foundry VTT for GMs, players, and Greybard as maintainer. The force is both a vision and a pain to solve: a mechanically rich tabletop ruleset needs trustworthy sheets, rules automation, guided authoring, rights-cleared content, and Foundry-native workflows so another group can prepare and run sessions without Greybard personally guiding the table.

## Capabilities

- **CAP-1**
  - **intent:** UESRPG groups can install and use UESRPG Rebuilt as a proper Foundry VTT 14 system package.
  - **success:** The package registers actors, items, data models, sheets, styles, templates, localization, scripts, packs, settings, lifecycle hooks, and intentional `game.uesrpg` API surface without relying on Node-only runtime APIs, Vite-only behavior, or a separate application model.

- **CAP-2**
  - **intent:** Players and GMs can view, edit, and use character, statblock, item/equipment, and magic-relevant documents during preparation and live play.
  - **success:** Required sheet coverage from the Rules Coverage Checklist renders safely for default, missing, and filled data states; common actions are reachable from sheets; editable and read-only permission states remain legible.

- **CAP-3**
  - **intent:** Users can resolve core UESRPG d100 mechanics through visible Foundry-native roll, chat, combat, magic, and mishap workflows.
  - **success:** Skill tests, characteristic tests, opposed/semi-automated tests, initiative, attacks, defenses, spellcasting, mishaps, and accepted manual-support cases follow the Rules Coverage Checklist and produce chat output showing source, inputs, target, modifiers, raw roll, outcome, critical state, DoS/DoF where applicable, warnings, and adjudication notes.

- **CAP-4**
  - **intent:** Users and Greybard can create valid, editable Foundry documents through guided authoring workflows.
  - **success:** Character creation, character advancement, spell creation, equipment, and statblock builders validate required inputs, create valid documents, open the result on its sheet, preserve post-creation editability, support relevant play workflows, and avoid routine raw JSON editing; enchanting and alchemy provide the accepted minimal/manual 1.0 support.

- **CAP-5**
  - **intent:** The package can distribute useful System Content for 1.0 play without violating rights, provenance, or AI-content constraints.
  - **success:** Packaged content needed for the balanced one-shot and typical preparation is compiled from managed sources, has manifest-grade provenance entries, excludes unreviewed or unclear-rights entries, and contains no AI-generated prepared user-facing package content.

- **CAP-6**
  - **intent:** Release readiness can be demonstrated rather than inferred from successful builds.
  - **success:** `npm run typecheck`, `npm run lint`, and `npm run build` pass, and release-relevant sheets, workflows, builders, compendia, provenance, docs/tutorials, balanced one-shot coverage, and minimal-handholding install/use are validated in Foundry VTT 14 with recorded evidence.

## Constraints

- Foundry VTT 14 is the runtime boundary; preserve Foundry document, sheet, chat, roll, combat, compendium, tutorial, lifecycle, permission, and package conventions.
- Runtime source remains strict TypeScript under the existing Vite ES-module build; do not weaken compiler assumptions or introduce Node/package-only runtime dependencies.
- Actor and item type changes are atomic cross-file changes across constants, `system.json`, data models, registration, sheets, templates, localization, styles/assets, build-copy rules, migration handling, and validation evidence.
- Persisted game state mutates through awaited Foundry document APIs with conservative path-based updates; high-risk or ambiguous updates require confirmation or clear manual control.
- Rules automation uses shared dice/rules services and transparent chat output; divergent per-sheet roll math is not allowed.
- User-facing UI text, sheet labels, chat cards, tutorials, and workflow copy require localization keys and human review before release.
- CSS and visual treatment stay scoped to the system and follow the UX token model; semantic colors must be paired with text or accessible state.
- Manual fallback is allowed only where the checklist accepts it and must be visible or discoverable in the relevant sheet, dialog, chat output, workflow text, or documentation.
- Distributed System Content requires managed source data, pack automation, and manifest-grade rights/provenance review; generated packs and `dist` are outputs, not hand-edited sources of truth.
- Prepared user-facing package content must not be AI-generated unless a future explicit, policy-compliant process replaces this constraint.

## Non-goals

- Replace Foundry's native document, sheet, chat, roll, combat, compendium, tutorial, or package paradigms with a bespoke application model.
- Ship a generic Elder Scrolls rules/lore database outside the UESRPG 3e v4 Foundry system scope.
- Bundle unreviewed, unclear-rights, unauthorized scraped, or AI-generated prepared user-facing rules, lore, descriptions, compendium entries, visual assets, audio, or similar package content.
- Fully automate every rare UESRPG edge case before 1.0 when a visible manual fallback preserves the balanced one-shot and common play.
- Treat TypeScript, lint, Vite, or pack compilation success as proof of Foundry runtime correctness.
- Expand broad `any` usage or weaken strictness to paper over Foundry typing gaps.

## Success signal

- A group other than Greybard's own table, or a documented Greybard-simulated pass if no external group is available, can install UESRPG Rebuilt, create or use required entities, run the balanced one-shot flow, use rights-cleared compendium content, resolve common rolls/combat/magic/GM-tool workflows, and recover from normal missing-data or correction cases using package docs, Foundry Tutorial API guidance, and UI affordances.

## Assumptions

- Minimal-handholding validation may initially be simulated by Greybard if no external test group is available, with the limitation recorded and external validation identified as follow-up.
- Greybard remains the rules interpretation source unless a later authoritative source is named in planning artifacts.

## Open Questions

- What exact numerical content counts define sufficient common equipment, spells, statblocks, tables, and related System Content after the content audit?
- What exact field-level breakdown and formulas are required for every derived resource/state value when character and statblock data slices are implemented?
- What deeper enchantment, alchemy, ritual, and combat sub-procedure mechanics should be automated if later stories move beyond the accepted 1.0 manual/minimal fallback depth?
