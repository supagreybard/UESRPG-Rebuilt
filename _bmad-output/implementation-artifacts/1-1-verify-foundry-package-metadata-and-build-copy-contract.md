---
baseline_commit: 46e6286be8e81724a9af6ec37ec2ff533b261723
---

# Story 1.1: Verify Foundry Package Metadata And Build Copy Contract

Status: done

## Story

As a GM installing UESRPG Rebuilt,
I want the system package metadata and packaged assets to be aligned,
so that Foundry VTT 14 can install, load, and locate the system's scripts, styles, templates, language files, and packs reliably.

## Acceptance Criteria

1. Given the source package metadata and build configuration, when the system is built for distribution, then `system.json` declares the expected Foundry VTT 14 compatibility, ES module entry, styles, languages, packs, actor/item document types, and package metadata needed for the current system scope, and it does not bump compatibility beyond the tested Foundry runtime target.
2. Given runtime assets such as templates, styles, language files, icons, and pack data are referenced by package metadata or code, when the build-copy configuration is inspected, then those assets are included in the static-copy/build workflow, and generated `dist` output is treated as a build artifact rather than hand-edited source.
3. Given the system is built with the existing project workflow, when `npm run build` completes, then the built package contains the declared script, style, language, template, and pack paths expected by Foundry, and any missing or stale package/build-copy references are corrected in source.
4. Given the story touches package metadata or runtime asset paths, when migration and compatibility impact is assessed, then any compatibility concern for existing world data or installed package consumers is recorded, and no backward-compatibility code is added unless a concrete persisted-data or shipped-behavior need exists.

## Tasks / Subtasks

- [x] Audit `system.json` against current source registration and package scope. (AC: 1)
  - [x] Confirm `id`, `title`, `version`, `compatibility.minimum`, and `compatibility.verified` are intentional for Foundry VTT 14 and do not exceed tested runtime support.
  - [x] Confirm `esmodules` points to the Vite output file `uesrpg-rebuilt.js` and matches `vite.config.ts` build output.
  - [x] Confirm `styles`, `languages`, `packs`, `documentTypes`, `grid`, `primaryTokenAttribute`, and `secondaryTokenAttribute` still reflect the current supported system scope.
  - [x] Confirm actor/item document types align with `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `src/module/data/index.ts`, and `src/module/applications/index.ts`.
- [x] Audit the build-copy and pack compilation contract. (AC: 2, 3)
  - [x] Confirm `vite.config.ts` copies every source asset category referenced by metadata or runtime code: `system.json`, `templates/actor`, `templates/item`, `templates/chat`, `styles`, `lang`, and `icons`.
  - [x] Confirm packs are generated through `npm run packs:compile` into `dist/packs` and are not expected to be copied by `viteStaticCopy` from hand-edited `packs` or `dist` sources.
  - [x] Confirm `automation/prepare-dist-build.mjs` and `automation/compendium-packager.mjs` preserve the intended build sequence and do not hide missing source-pack failures.
  - [x] Correct source metadata/build-copy mismatches only in source files. Do not hand-edit generated `dist` output.
- [x] Verify the built package paths. (AC: 3)
  - [x] Run `npm run build`.
  - [x] Inspect `dist/system.json` and confirm it declares `esmodules: ["uesrpg-rebuilt.js"]`, `styles: ["styles/uesrpg-rebuilt.css"]`, `languages[0].path: "lang/en.json"`, and packs under `packs/<name>`.
  - [x] Confirm `dist/uesrpg-rebuilt.js`, `dist/styles/uesrpg-rebuilt.css`, `dist/lang/en.json`, all source templates, and compiled `dist/packs/traits`, `dist/packs/powers`, and `dist/packs/races` exist after build.
  - [x] If stale generated output or missing copied assets are found, fix the source/build workflow and rebuild.
- [x] Record migration and compatibility assessment. (AC: 4)
  - [x] Record whether metadata/path changes affect existing worlds, installed system consumers, pack names, actor/item type IDs, or persisted document data.
  - [x] Add migrations or compatibility handling only for concrete persisted-data or shipped-behavior needs.
  - [x] Record if no migration is needed and why.
- [x] Run baseline verification and capture evidence. (AC: 1, 2, 3, 4)
  - [x] Run `npm run typecheck`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Record any skipped manual Foundry runtime validation. If manual validation is performed, include Foundry version, world/test data, action, expected result, actual result, limitations, and follow-up defects.

## Dev Notes

### Current Source State

- `system.json` currently declares system id `uesrpg-rebuilt`, title `UESRPG Rebuilt`, version `0.1.0`, Foundry compatibility minimum/verified `14`, ES module `uesrpg-rebuilt.js`, stylesheet `styles/uesrpg-rebuilt.css`, English language file `lang/en.json`, three public item packs (`traits`, `powers`, `races`), actor types `character` and `npc`, item types `weapon`, `trait`, `race`, and `power`, grid distance `5 ft`, and token attributes `resources.health` / `resources.stamina`. [Source: system.json]
- Vite builds one ES module from `src/uesrpg-rebuilt.ts` to `dist/uesrpg-rebuilt.js`, empties `dist`, writes sourcemaps, and uses `vite-plugin-static-copy` for `system.json`, actor/item/chat templates, styles, language files, and icons. [Source: vite.config.ts]
- `npm run build` executes `node automation/prepare-dist-build.mjs && vite build && npm run packs:compile`. Pack compilation is separate from static copy and writes generated pack output under `dist/packs`. [Source: package.json; automation/prepare-dist-build.mjs; automation/compendium-packager.mjs]
- `automation/prepare-dist-build.mjs` stashes an existing `dist/packs` directory before Vite empties `dist`. `automation/compendium-packager.mjs` then compiles source packs from `packs-src/traits`, `packs-src/powers`, and `packs-src/races` into `dist/packs`. [Source: automation/prepare-dist-build.mjs; automation/compendium-packager.mjs]
- Existing runtime source registers actor/item document classes, data models, sheets, trackable attributes, migration settings, and the narrow `game.uesrpg` public API through Foundry lifecycle hooks in `src/uesrpg-rebuilt.ts`; this story should not move lifecycle registration work into package metadata. [Source: src/uesrpg-rebuilt.ts]

### File-Specific Guardrails

- `system.json`: update only if the audit proves metadata is missing, stale, or inconsistent with current source. Do not add future actor/item types before their data models, sheets, templates, localization, and copy/build paths are ready.
- `vite.config.ts`: update only for source asset categories that must ship to `dist`. Keep the existing single-entry ES module build unless an explicit architecture decision changes it.
- `automation/prepare-dist-build.mjs` and `automation/compendium-packager.mjs`: preserve the source-of-truth direction from `packs-src` to `dist/packs`; do not make generated packs or `dist` hand-edited source.
- `package.json`: keep npm scripts as the workflow source of truth. Do not add competing lockfiles or alternate build tools.
- `src/module/config/constants.ts`, `src/module/config/document-types.ts`, `src/module/data/index.ts`, and `src/module/applications/index.ts`: use these as alignment references for actor/item type IDs and current runtime registration.

### Architecture Compliance

- Foundry VTT 14 is the runtime/application boundary. Runtime behavior must remain a Foundry system package using Foundry metadata, documents, hooks, applications, templates, localization, compendia, and package build conventions. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-1---Foundry-Runtime-Is-The-Application-Boundary]
- Actor or item type changes are atomic cross-file changes across constants, `system.json`, data model registration, document/sheet registration, templates, localization, styles/assets, build-copy coverage, migrations when needed, and validation evidence. This story should verify alignment, not introduce partial new types. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes]
- Generated packs and `dist` artifacts are build outputs, not hand-edited source. Distributed System Content is not release-ready until provenance exists, but this story's scope is the current package/build contract, not provenance implementation. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-6---System-Content-Requires-Provenance-Before-Distribution]
- Release-relevant changes require `npm run typecheck`, `npm run lint`, and `npm run build`; build success is only partial packaging evidence and does not replace Foundry runtime validation where runtime behavior is affected. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence]

### Testing Requirements

- Required automated checks for this story: `npm run typecheck`, `npm run lint`, and `npm run build`. [Source: _bmad-output/project-context.md#Testing-Rules]
- After `npm run build`, inspect generated package paths rather than assuming Vite and pack compilation copied everything correctly.
- If the implementation changes only story metadata/build-copy source and does not change runtime behavior beyond package assets, manual Foundry validation may be recorded as not performed with rationale. If package metadata paths, packs, templates, styles, language files, or document type declarations change materially, validate the built system in Foundry VTT 14 or record the limitation explicitly.

### Scope Boundaries

- Do not bump Foundry compatibility beyond `14` based solely on TypeScript, lint, or Vite success. [Source: _bmad-output/project-context.md#Technology-Stack--Versions]
- Do not hand-edit `dist`; fix source and rebuild. [Source: _bmad-output/project-context.md#Development-Workflow-Rules]
- Do not add backward-compatibility code without a concrete persisted-data, shipped-behavior, or external-consumer need. Record the assessment instead. [Source: _bmad-output/planning-artifacts/epics.md#Story-1.1-Verify-Foundry-Package-Metadata-And-Build-Copy-Contract]
- Do not add AI-generated prepared user-facing content, visual assets, compendium entries, or localization copy as part of this packaging audit. [Source: _bmad-output/project-context.md#Critical-Dont-Miss-Rules]

### Previous Story Intelligence

- No previous Epic 1 story exists. This is the first story in the epic, so there are no prior story completion notes or review findings to inherit.

### Git Intelligence

- Recent commits include data model and constants work (`fix typing`, `Weapon WIP`) touching item/actor data files, shared schema fragments, and localization. Treat metadata/data-model/type alignment as a high-risk audit area before changing `system.json` or document type lists.
- Recent README work documents the local Foundry dev server and confirms `dist` is mounted as the system package in the Docker development environment. Use this only for manual runtime validation if needed; do not start or restart long-lived Docker services unless explicitly needed and confirmed.

## Project Structure Notes

- Relevant source files for this story live at the repository root (`system.json`, `vite.config.ts`, `package.json`), `automation/`, `src/module/config/`, `src/module/data/index.ts`, `src/module/applications/index.ts`, `templates/`, `styles/`, `lang/`, `icons/`, and `packs-src/`.
- Expected generated output lives under `dist/` after `npm run build`; generated output is validation evidence, not source to edit.
- No standalone architecture or UX files were found by the workflow's default `*architecture*.md` / `*ux*.md` whole-file glob, but the epics front matter points to the sharded architecture and UX artifacts loaded above.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-1.1-Verify-Foundry-Package-Metadata-And-Build-Copy-Contract`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-1-Package-Registration-And-Runtime-Contract`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#NFR-6-Packaging-reliability`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#Capability---Architecture-Map`
- `_bmad-output/project-context.md`
- `system.json`
- `vite.config.ts`
- `package.json`
- `automation/prepare-dist-build.mjs`
- `automation/compendium-packager.mjs`
- `src/uesrpg-rebuilt.ts`
- `src/module/config/constants.ts`
- `src/module/config/document-types.ts`
- `src/module/data/index.ts`
- `src/module/applications/index.ts`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

- `npm run typecheck` passed.
- Initial `npm run lint` failed because ESLint included BMAD/WDS support files outside runtime source and because `src/module/data/item/Race.ts` declared an unused empty interface. Fixed by excluding BMAD agent/tooling directories from lint and removing the empty interface.
- Initial `npm run build` failed because generated `dist` was owned by `root:root`; removed the generated artifact directory and rebuilt from source.
- Final `npm run typecheck`, `npm run lint`, and `npm run build` passed.
- Inspected `dist/system.json`, `dist/uesrpg-rebuilt.js`, `dist/styles/uesrpg-rebuilt.css`, `dist/lang/en.json`, copied templates, and compiled `dist/packs/traits`, `dist/packs/powers`, and `dist/packs/races`.

### Completion Notes List

- Confirmed `system.json` remains aligned with the current Foundry VTT 14 package scope: system id/title/version, compatibility `14`, ES module, style, language, item packs, actor/item document types, grid, and token attributes.
- Confirmed actor/item type declarations align with constants, document type lists, data model registration, and sheet registration.
- Confirmed `vite.config.ts` copies the runtime asset categories referenced by metadata/code and pack generation remains source-driven from `packs-src` through `npm run packs:compile` into `dist/packs`.
- No package metadata, runtime asset path, pack name, actor/item type ID, or persisted document data changes were made. No migration or compatibility handling is needed.
- Manual Foundry runtime validation was not performed because this story made no material package metadata/runtime path changes; build and output inspection validated the packaging contract.

### File List

- `_bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `eslint.config.js`
- `src/module/data/item/Race.ts`

### Change Log

- 2026-08-03: Verified package metadata/build-copy contract, fixed lint verification blockers, confirmed build output paths, and recorded compatibility assessment.
