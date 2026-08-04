---
baseline_commit: 46e6286be8e81724a9af6ec37ec2ff533b261723
---

# Story 1.2: Register System Lifecycle, Documents, Data Models, Sheets, Settings, And Public API Boundary

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a module author or macro user relying on UESRPG Rebuilt,
I want the system's Foundry lifecycle registration and public API boundary to be intentional and stable,
so that the system loads predictably and exposes only documented integration points.

## Acceptance Criteria

1. Given Foundry VTT initializes the system, when the `init` lifecycle runs, then intentional document classes, data models, sheet applications, settings, and `game.uesrpg` public API values are registered at the correct lifecycle phase, and internal implementation paths are not exposed as public API by default.
2. Given Foundry VTT enters setup, when setup-phase integrations are registered, then trackable attributes or equivalent setup-phase system integrations are registered only where Foundry expects them, and world collections are not read or mutated before they are available.
3. Given Foundry VTT enters ready, when ready-phase work is performed, then migrations or world-data operations run only during the ready phase, and async document updates or chat/message side effects are awaited unless intentionally fire-and-forget.
4. Given a value is exposed under `game.uesrpg`, when its purpose is reviewed, then it is intentional, stable enough for module or macro consumers, and documented where meant for external use, and private implementation details remain reachable only through internal source imports.
5. Given lifecycle or registration code is changed, when `npm run typecheck`, `npm run lint`, and `npm run build` are run, then the baseline checks pass, and Foundry runtime validation records that the system opens without registration errors.

## Tasks / Subtasks

- [x] Audit the existing lifecycle entrypoint and registration modules. (AC: 1, 2, 3, 4)
  - [x] Confirm `src/uesrpg-rebuilt.ts` registers public API, document classes, data models, sheet applications, and settings during `init` only.
  - [x] Confirm setup-phase work is limited to `registerTrackableAttributes()` or equivalent Foundry setup integrations.
  - [x] Confirm ready-phase work is limited to migrations/world-data operations and does not register document classes, data models, sheets, or settings late.
  - [x] Confirm all async ready-phase work is awaited internally or explicitly intentional fire-and-forget from the lifecycle hook.
- [x] Audit and tighten `game.uesrpg` public API exposure. (AC: 1, 4)
  - [x] Review every value currently assigned under `game.uesrpg` in `src/uesrpg-rebuilt.ts` and typed in `src/global.d.ts`.
  - [x] Keep only stable, intentional integration-facing values such as canonical actor/item type IDs, system id, and document classes if they are meant for module or macro consumers.
  - [x] Do not expose internal sheet classes, data models, migration helpers, utilities, source paths, or mutable runtime implementation objects by default.
  - [x] If the public API shape changes, update `src/global.d.ts` in the same change and record compatibility impact for external macro/module consumers.
- [x] Verify document, data model, and sheet registration alignment. (AC: 1)
  - [x] Confirm actor and item types align across `system.json`, `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `src/module/data/index.ts`, and `src/module/applications/index.ts`.
  - [x] Confirm document classes are registered through `registerDocumentClasses()` and not duplicated elsewhere.
  - [x] Confirm data model registration covers every declared actor/item type and no undeclared type.
  - [x] Confirm sheet registration covers every declared actor/item type and uses localized sheet labels.
  - [x] Avoid adding new actor or item types in this story unless the full AD-2 cross-file set is completed.
- [x] Verify settings and migration lifecycle boundaries. (AC: 1, 3)
  - [x] Confirm `registerMigrationSettings()` runs in `init` before settings are used.
  - [x] Confirm `runMigrations()` runs only from `ready` and reads `game.actors`, `game.items`, embedded actor items, or other world collections only there.
  - [x] Confirm migration updates are conservative, path-based, and awaited.
  - [x] Record whether this story changes persisted data shape. Add migration handling only for a concrete persisted-world need.
- [x] Verify setup-phase trackable attributes. (AC: 2)
  - [x] Confirm `TRACKABLE_ATTRIBUTES` matches the current package token attributes declared in `system.json` where applicable.
  - [x] Confirm setup registration does not read or mutate world actors/items and does not rely on ready-only collections.
- [x] Run baseline verification and capture evidence. (AC: 5)
  - [x] Run `npm run typecheck`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Validate in Foundry VTT 14 that the system opens without lifecycle, registration, sheet, data model, settings, or migration errors; record Foundry version, world/test data, action performed, expected result, actual result, limitations, and follow-up defects.

## Dev Notes

### Current Source State

- `src/uesrpg-rebuilt.ts` is the single lifecycle entrypoint. It currently assigns `game.uesrpg`, registers document classes, data models, sheet applications, and migration settings during `init`; registers trackable attributes during `setup`; and invokes `void runMigrations()` plus a ready log during `ready`. [Source: src/uesrpg-rebuilt.ts]
- Current `game.uesrpg` surface contains `actorTypes`, `itemTypes`, `systemId`, and `documents.Actor` / `documents.Item`. The matching global type augmentation lives in `src/global.d.ts`. Treat this as integration-facing API: keep it narrow, stable, and intentionally documented in story evidence if retained. [Source: src/uesrpg-rebuilt.ts; src/global.d.ts]
- Current actor types are `character` and `npc`; current item types are `weapon`, `trait`, `race`, and `power`. Constants live in `src/module/config/constants.ts`; document type arrays live in `src/module/config/document-types.ts`; package declarations live in `system.json`. [Source: system.json; src/module/config/constants.ts; src/module/config/document-types.ts]
- `registerDocumentClasses()` assigns `CONFIG.Actor.documentClass` and `CONFIG.Item.documentClass`, then mixes selected `UesrpgActor` and `UesrpgItem` prototype methods onto base Foundry prototypes. Preserve existing behavior unless the audit identifies a concrete Foundry VTT 14 compatibility issue. [Source: src/module/documents/index.ts]
- `registerDataModels()` maps every current actor/item type to its data model through `CONFIG.Actor.dataModels` and `CONFIG.Item.dataModels`. This story should verify alignment and avoid partial new data model commitments. [Source: src/module/data/index.ts]
- `registerApplicationClasses()` unregisters core v1 sheets and registers system sheets through `foundry.applications.apps.DocumentSheetConfig`. It uses existing V2 sheet classes but includes local `as any` casts around Foundry typing gaps; do not expand broad `any` beyond the existing isolated registration gap unless unavoidable. [Source: src/module/applications/index.ts]
- `registerMigrationSettings()` registers hidden world setting `uesrpg-rebuilt.migrationVersion` during `init`. `runMigrations()` reads world actors/items and embedded actor items during `ready`, uses path-based update keys such as `system.prose.notes`, `system.-=details`, and `system.parameters`, and awaits document updates inside migration loops. [Source: src/module/migration/index.ts]
- `registerTrackableAttributes()` currently assigns bar attributes for `resources.health` and `resources.stamina`, matching `system.json` primary and secondary token attributes. [Source: system.json; src/module/config/trackable-attributes.ts]

### Architecture Compliance

- Foundry VTT 14 is the application boundary. Runtime behavior must remain a Foundry system package using Foundry documents, data models, hooks, V2 application sheets, templates, localization, chat, rolls, combat, settings, compendia, tutorials, and package metadata. Do not introduce a separate browser app, router, or Node/Vite runtime dependency. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-1---Foundry-Runtime-Is-The-Application-Boundary]
- Lifecycle phase ownership is binding for this story: `init` owns the intentional `game.uesrpg` public API, document classes, data models, applications, and settings; `setup` owns trackable attributes and setup integrations; `ready` owns migrations and world-data operations. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-10---Lifecycle-Phases-Own-Their-Work]
- Actor or item type changes require a coordinated update across constants, `system.json`, data model registration, document/sheet registration, templates, localization, styles/assets, build-copy coverage, migration handling when needed, and validation evidence. This story is a registration-boundary audit and should not add future types unless that full set is completed. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes]
- Persisted actor, item, combat, and content state must mutate through awaited Foundry document APIs using conservative path-based updates. This matters for migrations under `ready`. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents]
- Public integration surface is limited to intentional `game.uesrpg` exports; internal module paths are private unless explicitly promoted and documented. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-10---Lifecycle-Phases-Own-Their-Work]

### File-Specific Guardrails

- `src/uesrpg-rebuilt.ts`: preserve lifecycle ordering. Do not read `game.actors`, `game.items`, compendia contents, or embedded documents during `init` or `setup`. If keeping `void runMigrations()`, confirm `runMigrations()` handles errors acceptably or change to an explicit async wrapper without blocking Foundry hook registration.
- `src/global.d.ts`: keep synchronized with `game.uesrpg`. Do not type internal-only values as public API by convenience.
- `src/module/config/constants.ts`: keep canonical system, actor type, item type, resource, and label constants centralized here. Do not duplicate type IDs in new code.
- `src/module/config/document-types.ts`: keep actor/item type arrays aligned with constants and `system.json`.
- `src/module/documents/index.ts`: preserve existing document class registration and prototype behavior unless the implementation intentionally changes the document API boundary and records why.
- `src/module/data/index.ts`: keep data model registration exhaustive for declared types. Do not register models for undeclared package types.
- `src/module/applications/index.ts`: keep sheet registration exhaustive for declared types and localized through `UESRPG.Sheets.*` labels in `lang/en.json`. Avoid widening the existing Foundry type workaround.
- `src/module/config/trackable-attributes.ts`: keep setup-only registration aligned with package token attributes and do not mutate world data.
- `src/module/migration/index.ts`: keep settings registration in `init`, migration execution in `ready`, collection reads ready-only, and document updates awaited.
- `system.json`: update only if the audit proves package document types, token attributes, or metadata are inconsistent with source. Do not bump Foundry compatibility.

### Testing Requirements

- Required automated checks: `npm run typecheck`, `npm run lint`, and `npm run build`. [Source: _bmad-output/project-context.md#Testing-Rules]
- Required manual validation for this story: open the built system in a Foundry VTT 14 development world and confirm no console/runtime errors from lifecycle hooks, document class registration, data model registration, sheet registration, migration setting registration, setup trackable attribute registration, or ready migrations. [Source: _bmad-output/planning-artifacts/epics.md#Story-1.2-Register-System-Lifecycle-Documents-Data-Models-Sheets-Settings-And-Public-API-Boundary]
- Manual validation evidence must include Foundry version, world/test data, action performed, expected result, actual result, status, limitations, and follow-up defects if any. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence]
- Build success is partial evidence only. It does not prove Foundry runtime registration behavior. [Source: _bmad-output/project-context.md#Testing-Rules]

### Scope Boundaries

- This story is about lifecycle registration and public API boundaries, not new sheet features, new document types, new rules workflows, new compendium provenance, or new UI token work.
- Do not expose implementation details under `game.uesrpg` just to make internal code easier to call. Public API values should be stable enough for module or macro users.
- Do not add backward-compatibility code unless the implementation changes a shipped public API, persisted data shape, package metadata contract, or other concrete external consumer behavior.
- Do not add AI-generated prepared user-facing package content, public help/tutorial copy, localization copy beyond labels needed for registration, visual assets, or compendium content as part of this story.

### Previous Story Intelligence

- Story 1.1 confirmed the current package metadata/build-copy contract and actor/item type declarations are aligned with constants, document type lists, data model registration, and sheet registration. Treat this as a known-good baseline and avoid changing metadata or types unless the lifecycle audit proves a defect. [Source: _bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md#Completion-Notes-List]
- Story 1.1 fixed lint verification blockers and established that final `npm run typecheck`, `npm run lint`, and `npm run build` passed. If those checks now fail, investigate changes since baseline rather than weakening compiler or lint configuration. [Source: _bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md#Debug-Log-References]
- Story 1.1 did not perform manual Foundry runtime validation because it made no material runtime path changes. Story 1.2 directly affects runtime registration behavior, so manual Foundry validation should be performed or explicitly recorded as a limitation. [Source: _bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md#Completion-Notes-List]

### Git Intelligence

- Recent commits are `46e6286 fix typing`, `644f6d6 Weapon WIP`, `57d5a9b readme update`, `1a90df3 add wiki as submodule`, and `87d0ec6 move compose file to root for QoL`. Expect recent type/data-model work around actors/items and avoid broad `any` expansion to hide Foundry typing gaps.
- Recent README/dev-server work means local Foundry runtime validation may be available through the documented Docker dev server, but do not start, stop, restart, or rebuild long-lived Docker services unless needed and confirmed.

## Project Structure Notes

- Lifecycle entrypoint: `src/uesrpg-rebuilt.ts`.
- Public API typing: `src/global.d.ts`.
- Central constants and document type lists: `src/module/config/constants.ts` and `src/module/config/document-types.ts`.
- Setup integration: `src/module/config/trackable-attributes.ts`.
- Document class registration: `src/module/documents/index.ts` plus `UesrpgActor` and `UesrpgItem` classes.
- Data model registration: `src/module/data/index.ts`.
- Sheet registration: `src/module/applications/index.ts`.
- Settings and migrations: `src/module/migration/index.ts`.
- Package contract references: `system.json`, `lang/en.json`, `templates/`, `styles/`, and `vite.config.ts`.
- No new runtime asset path should be needed for this story unless a registration defect requires package metadata or localization alignment.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-1.2-Register-System-Lifecycle-Documents-Data-Models-Sheets-Settings-And-Public-API-Boundary`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-1-Package-Registration-And-Runtime-Contract`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-2-Public-System-API-Boundary`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-34-Baseline-Automated-Verification`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-35-Manual-Foundry-Runtime-Validation`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-1---Foundry-Runtime-Is-The-Application-Boundary`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-10---Lifecycle-Phases-Own-Their-Work`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/project-context.md`
- `_bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md`
- `src/uesrpg-rebuilt.ts`
- `src/global.d.ts`
- `src/module/config/constants.ts`
- `src/module/config/document-types.ts`
- `src/module/config/trackable-attributes.ts`
- `src/module/documents/index.ts`
- `src/module/data/index.ts`
- `src/module/applications/index.ts`
- `src/module/migration/index.ts`
- `system.json`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

- 2026-08-03: Audited lifecycle ownership in `src/uesrpg-rebuilt.ts`: public API, document classes, data models, sheet applications, and migration settings run during `init`; trackable attributes run during `setup`; migrations run during `ready`.
- 2026-08-03: Confirmed `game.uesrpg` only exposes `actorTypes`, `itemTypes`, `systemId`, and public document classes. No `src/global.d.ts` shape change was required.
- 2026-08-03: Confirmed actor/item type alignment across `system.json`, constants, document type arrays, data models, and sheet registration. No actor/item types were added.
- 2026-08-03: Changed `ready` hook to `async` and explicitly `await runMigrations()` before ready logging.
- 2026-08-03: Replaced hardcoded item sheet registration type literals with `ITEM_TYPES` constants in `src/module/applications/index.ts`.
- 2026-08-03: Ran `npm run typecheck` successfully.
- 2026-08-03: Ran `npm run lint` successfully.
- 2026-08-03: Ran `npm run build` successfully. Build copied static assets and compiled packs.
- 2026-08-03: Started the documented Docker Foundry dev server with user approval. Foundry VTT 14 Build 364 started and `http://localhost:30001` responded with `302 /license`; world-level runtime validation was blocked by license setup and will be performed by Greybard.
- 2026-08-03: Investigated Foundry black-screen console error `The ar subclass of DataModel must define its Document schema` during item data model localization. Root cause was `BaseItemData.defineSchema()` calling abstract `TypeDataModel.defineSchema()` through `super.defineSchema()`.
- 2026-08-03: Removed the abstract `super.defineSchema()` call from `BaseItemData`, matching the existing actor base data model pattern.
- 2026-08-03: Re-ran `npm run typecheck`, `npm run lint`, and `npm run build` successfully after the DataModel schema fix.
- 2026-08-03: Greybard validated in Foundry VTT 14 Build 364. World loaded successfully after rebuild; console showed init log, localization loading, setup/render templates, migration scaffold running from `0.0.0` to `0.1.0`, migration completion, ready log, scene canvas drawing, and `systems/uesrpg-rebuilt/templates/actor/character-sheet.hbs` compilation. No lifecycle, registration, sheet, data model, settings, or migration errors were reported in the provided console output.

### Completion Notes List

- Lifecycle boundaries are tightened: migrations are now awaited directly inside the `ready` hook, while `init` and `setup` retain their existing registration ownership.
- Public API exposure remains unchanged and intentionally narrow. No compatibility impact for existing macro/module consumers of `game.uesrpg` is expected.
- Sheet registration now uses canonical item type constants instead of duplicate string literals for trait, race, and power sheet mappings.
- Item data model localization should no longer throw before the world renders because the item base schema no longer delegates to Foundry's abstract `TypeDataModel.defineSchema()`.
- This story does not change persisted data shape and does not add migration handling.
- Automated baseline verification passed. Manual Foundry world validation passed in Foundry VTT 14 Build 364 using Greybard's local dev world console evidence.

### File List

- `_bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/module/applications/index.ts`
- `src/module/data/item/abstract/BaseItem.ts`
- `src/uesrpg-rebuilt.ts`

### Change Log

- 2026-08-03: Marked story in progress and captured lifecycle/public API/registration audit evidence.
- 2026-08-03: Awaited ready-phase migrations and centralized item sheet registration type references through `ITEM_TYPES`.
- 2026-08-03: Captured automated verification results and manual Foundry validation blocker.
- 2026-08-03: Fixed item data model schema initialization crash reported during manual Foundry validation and refreshed automated verification.
- 2026-08-03: Captured successful Foundry VTT 14 runtime validation evidence and marked story ready for review.
