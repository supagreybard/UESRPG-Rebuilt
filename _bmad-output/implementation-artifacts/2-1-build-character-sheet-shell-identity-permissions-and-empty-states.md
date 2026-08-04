# Story 2.1: Build Character Sheet Shell, Identity, Permissions, And Empty States

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a player opening a UESRPG character,
I want a Foundry-native character sheet shell with identity fields, clear sections, permissions, and safe empty states,
so that character data has a reliable, readable place to live before detailed play sections are added.

## Acceptance Criteria

1. Given a character actor is opened, when the character sheet renders, then it uses the system's Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior, and it provides a clear header, document identity area, section or tab structure, notes area, and GM/private area where applicable.
2. Given a character actor has default, missing, or partially filled identity data, when the sheet renders, then safe fallback labels and values are shown instead of broken template output, and missing identity data is presented near the relevant field.
3. Given a user with edit permission changes supported identity or notes fields, when the sheet submits, then actor data is persisted through awaited Foundry document updates using explicit schema-backed paths, and migration impact is assessed for any changed persisted data shape.
4. Given a user has limited or observer permission, when the character sheet renders, then the sheet respects Foundry document permissions, remains legible, and presents edit-only controls as disabled, hidden, or read-only according to Foundry conventions.
5. Given character sheet shell labels, section headings, warnings, and empty states are user-facing, when the sheet renders, then they resolve through localization keys, and styling uses scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.
6. Given the character sheet shell is validated in Foundry VTT 14, when a character actor is opened, edited, resized, and viewed in default, partial, editable, and non-editable states, then no shell rendering, permission, localization, or identity persistence errors occur, and validation evidence records the tested actor state, actions, result, limitations, and follow-up defects if any.

## Tasks / Subtasks

- [ ] Audit the existing character sheet shell and preserve working foundation behavior. (AC: 1, 3)
  - [ ] Read `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/CharacterSheet.ts`, `templates/actor/character-sheet.hbs`, `src/module/data/actor/BaseActorData.ts`, `src/module/data/actor/CharacterData.ts`, `lang/en.json`, and relevant `styles/uesrpg-rebuilt.css` sections before editing.
  - [ ] Confirm the sheet still uses `foundry.applications.api.HandlebarsApplicationMixin`, `ActorSheetV2`, `classes: [SYSTEM_ID, 'sheet', 'actor']`, `position.width: 720`, `position.height: 640`, `window.resizable: true`, `form.submitOnChange: true`, and `form.closeOnSubmit: false`.
  - [ ] Preserve existing default character resources, characteristics, experience, and notes fields unless moving them behind placeholder/summary sections is necessary for shell clarity; do not remove persisted paths used by current templates without a migration assessment.
- [ ] Implement the Story 2.1 character shell scope. (AC: 1, 2, 5)
  - [ ] Refine the header/document identity area around actor name, actor image, type/sheet label, and safe fallback display values.
  - [ ] Add clear shell-level sections or tabs for identity/overview, notes, and GM/private content where applicable, with empty states for sections whose detailed play data lands in later Epic 2 stories.
  - [ ] Keep detailed characteristics/resources panels out of scope except for preserving current rendering; Story 2.2 owns characteristic, resource, and derived summary completion.
  - [ ] Do not add skill, inventory, equipment, magic, roll, combat, or builder actions in this story; later stories own those surfaces.
- [ ] Add permission-aware rendering. (AC: 3, 4)
  - [ ] Prepare permission/editability state in `_prepareContext`; keep templates simple.
  - [ ] Make identity, image, notes, and GM/private controls respect `this.isEditable` or Foundry-provided editability conventions.
  - [ ] Ensure non-editable views remain legible and do not offer misleading editable controls.
  - [ ] Protect any GM/private area according to Foundry permission expectations; if the exact private-data convention is not yet established, implement the smallest clear GM/private notes surface and record any limitations.
- [ ] Add localization and scoped styling for new shell labels, warnings, and empty states. (AC: 2, 5)
  - [ ] Add all new user-facing labels to `lang/en.json`; do not hardcode user-facing strings in TypeScript or Handlebars.
  - [ ] Reuse existing `UESRPG.Sheets.*`, `UESRPG.Sections.*`, `UESRPG.Fields.*`, `UESRPG.Empty.*`, and `UESRPG.Messages.*` key patterns where they fit.
  - [ ] Keep CSS scoped under `.uesrpg-rebuilt` / `.uesrpg-rebuilt-sheet` / `.uesrpg-rebuilt-actor-sheet` classes and use existing `--uesrpg-rebuilt-*` tokens.
  - [ ] Preserve narrow-window behavior: core identity, notes, and empty states must collapse without horizontal scrolling.
- [ ] Assess persisted data and migration impact. (AC: 3)
  - [ ] If adding schema-backed fields such as GM/private notes, add them through `foundry.data.fields` in `BaseActorData` or `CharacterData` with safe initial values.
  - [ ] If persisted data shape changes, explicitly decide whether a migration is required for existing world actors and embedded data; add migration only for a concrete persisted-world need.
  - [ ] Use path-based actor updates through Foundry sheet submission; do not introduce separate client-side state or raw JSON editing workflows.
- [ ] Verify the story with existing project gates and Foundry runtime evidence. (AC: 1-6)
  - [ ] Run `npm run typecheck`.
  - [ ] Run `npm run lint`.
  - [ ] Run `npm run build`.
  - [ ] In Foundry VTT 14, open a character actor with default data, partial/missing identity data, filled identity/notes data, editable permissions, and observer/limited or non-owner permissions where feasible.
  - [ ] Resize the sheet to a narrow window and check light/dark theme readability, focus states, and absence of horizontal scrolling for core shell fields.
  - [ ] Record validation evidence in the Dev Agent Record using the required format from Story 1.4.

## Dev Notes

### Current Source State

- Character actors are already registered as an actor document type in `system.json` and as `ACTOR_TYPES.character` in `src/module/config/constants.ts`; no new actor type is needed for this story. [Source: system.json; src/module/config/constants.ts]
- Character data model registration already maps `ACTOR_TYPES.character` to `CharacterData` during `init` through `registerDataModels()`. Preserve this lifecycle ownership. [Source: src/module/data/index.ts; src/uesrpg-rebuilt.ts]
- Character sheet registration already maps the character actor type to `CharacterSheet` and makes it default during `init` through `registerApplicationClasses()`. [Source: src/module/applications/index.ts]
- `BaseActorSheet` currently owns the Foundry V2 sheet pattern through `HandlebarsApplicationMixin(ActorSheetV2)`, system classes, default dimensions, resizable window, and submit-on-change behavior. It prepares `actor`, `editable`, `system`, `experience`, `typeLabel`, `resourceFields`, and `characteristicFields` for templates. [Source: src/module/applications/actor/BaseActorSheet.ts]
- `CharacterSheet` currently points at `templates/actor/character-sheet.hbs` and adds `sheetTitle: localize('UESRPG.Sheets.character')`. [Source: src/module/applications/actor/CharacterSheet.ts]
- The current character template renders actor image, actor type/sheet label, actor name, resources, characteristics, experience, and notes. This means Story 2.1 is not starting from an empty sheet; implementation must preserve existing working paths unless deliberately reshaping them. [Source: templates/actor/character-sheet.hbs]
- `BaseActorData` currently provides `system.resources.health`, `system.resources.stamina`, `system.resources.magicka`, and `system.prose.description`, `system.prose.flavorText`, `system.prose.notes`. `CharacterData` adds `system.characteristics` and `system.experience`. [Source: src/module/data/actor/BaseActorData.ts; src/module/data/actor/CharacterData.ts]
- Localization already includes actor sheet, actor type, resource, characteristic, experience, and notes labels. New shell sections, empty states, missing-data warnings, or GM/private labels need new `UESRPG.*` keys. [Source: lang/en.json]
- Current CSS already defines scoped system tokens, actor sheet header/grid/resource/characteristic styles, focus states, light/dark theme variables, and narrow-window media queries. Extend these patterns rather than replacing the style system. [Source: styles/uesrpg-rebuilt.css]

### What This Story Changes

- This story should harden the character sheet as a reliable shell: document identity, readable top-level structure, notes, GM/private area where applicable, permission-aware edit/read-only behavior, localization, empty states, and validation evidence.
- It may move or reframe existing fields into clearer shell sections, but it must not implement the full characteristic/resource/derived-summary work from Story 2.2 or the later skills, inventory, magic, roll, combat, or builder surfaces.
- It should surface missing or incomplete identity data near the affected field. Examples include missing actor name fallback/placeholder, missing image fallback behavior where Foundry conventions allow, and clear empty-state text for sections not yet populated.

### What Must Be Preserved

- Preserve Foundry-native document and sheet behavior: no bespoke app state, routing, or raw JSON editing as normal workflow. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-1---Foundry-Runtime-Is-The-Application-Boundary]
- Preserve lifecycle ownership: registration remains in `init`; do not read world collections or perform world-data work from sheet registration or context prep. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-10---Lifecycle-Phases-Own-Their-Work]
- Preserve path-based persisted document updates and schema-backed fields. If adding private/GM notes or identity-related fields changes persisted data shape, assess migration impact before finalizing. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents]
- Preserve localized, tokenized, Foundry-native UI. New labels and empty states must use localization keys, `_prepareContext` should prepare display values and permission state, templates should remain simple, and CSS should stay scoped to system classes and tokens. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-7---Sheet-And-Chat-UI-Stay-Localized-Tokenized-And-Foundry-Native]
- Preserve existing automated checks and runtime validation expectations: `npm run typecheck`, `npm run lint`, `npm run build`, plus manual Foundry VTT 14 validation for sheet changes. [Source: _bmad-output/project-context.md#Testing-Rules]

### Architecture Compliance

- Foundry VTT 14 is the runtime boundary; this is a Foundry system sheet, not a SPA component. [Source: _bmad-output/project-context.md#Technology-Stack--Versions]
- Sheet classes should use Foundry V2 application patterns with `HandlebarsApplicationMixin`, `DEFAULT_OPTIONS`, system CSS class, dimensions, resizable behavior, `submitOnChange: true`, and `closeOnSubmit: false` when matching existing sheets. [Source: _bmad-output/project-context.md#Framework-Specific-Rules]
- `_prepareContext` is the TypeScript-to-Handlebars boundary. Compute labels, fallback values, permission/read-only state, and empty-state flags there rather than embedding logic in the template. [Source: _bmad-output/project-context.md#Framework-Specific-Rules]
- Data models must use `foundry.data.fields` schemas with safe initial values and validation constraints for persisted actor data. [Source: _bmad-output/project-context.md#Framework-Specific-Rules]
- Actor/item type changes are cross-file invariants, but this story should not add or rename actor types. If a future need appears, stop and align constants, `system.json`, data models, sheet registration, templates, localization, build-copy, and migrations together. [Source: _bmad-output/project-context.md#Critical-Implementation-Rules]

### UX Requirements

- Character sheet is a primary surface reached from the actor directory, token, builder output, or compendium import. It must view/edit player character data and eventually initiate common character rolls/workflows, but roll entry points are not part of this story. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Information-Architecture]
- Sheet header must show document identity, type/category, summary state, and high-value actions without hiding required editing behind nonstandard controls. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Component-Patterns]
- Default document data must render safely; missing or incomplete data must be surfaced near the affected category; non-editable permissions must remain legible. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#State-Patterns]
- Narrow sheet windows must collapse to one column, preserve primary actions, and avoid horizontal scrolling for core fields. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Responsive--Platform]
- Visual treatment should preserve the existing Morrowind-inspired but practical direction: parchment/ink light mode, carved/dark metallic dark mode, UESRPG red accents, clear field panels, restrained borders/shadows, and readable mechanical data. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md#Brand--Style]

### Scope Boundaries

- In scope: character sheet shell, identity/header, section/tab structure, notes, GM/private area if applicable, permission/read-only behavior, safe empty/missing/default states, localization, scoped CSS, and runtime validation evidence.
- Out of scope: full characteristic/resource/derived summary completion, skill lists, inventory/equipment, magic summaries, roll/test actions, combat workflows, builder workflows, compendium content, tutorial copy, or new actor/item document types.
- Do not add AI-generated prepared user-facing content, lore/rules prose, compendium entries, visual assets, or tutorial copy. UI labels and empty-state text must be concise, localizable, and human-reviewable before release. [Source: _bmad-output/project-context.md#Critical-Dont-Miss-Rules]

### Previous Story Intelligence

- Story 1.1 verified package metadata and build-copy alignment and fixed lint/build-output blockers. Use existing scripts and source-backed build flow; do not hand-edit `dist`. [Source: _bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md#Completion-Notes-List]
- Story 1.2 tightened lifecycle boundaries, awaited migrations in `ready`, kept `game.uesrpg` intentionally narrow, centralized item sheet registration constants, and fixed a data model schema initialization crash. Be alert for regressions in registration, schema initialization, and Foundry load. [Source: _bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md#Completion-Notes-List]
- Story 1.3 localized actor sheet window titles and tightened scoped CSS token/focus/semantic foundations. Preserve those localization and style patterns rather than introducing new hardcoded labels or one-off CSS values. [Source: _bmad-output/implementation-artifacts/1-3-establish-localization-and-ui-token-foundations.md#Completion-Notes-List]
- Story 1.4 validated the foundation after Stories 1.1-1.3: automated checks passed, built package paths were inspected, and user-performed Foundry VTT 14 runtime validation reported no blocking findings. Use Story 1.4's evidence format for this story's runtime validation. [Source: _bmad-output/implementation-artifacts/1-4-validate-foundation-in-foundry-runtime.md#Dev-Agent-Record]

### Git Intelligence

- Recent commits are `a152927 stage the system.json changes in version`, `c4d6ab5 add system.json file`, `3c95792 0.2.0`, `7c8ed15 add synced versioning`, and `4c5971a some localization work and ui token foundations`.
- Versioning and metadata have changed recently; do not bump package version or Foundry compatibility as part of this story unless explicitly requested.
- Recent localization/token work means sheet edits should be checked for missing `TYPES.*` or `UESRPG.*` labels in actual Foundry windows, not only source review.

### Testing Requirements

- Required automated checks: `npm run typecheck`, `npm run lint`, and `npm run build`. [Source: _bmad-output/project-context.md#Testing-Rules]
- Required manual Foundry validation: open a character actor in Foundry VTT 14 with default, partial/missing, filled, editable, and non-editable states; edit identity/notes where allowed; resize the sheet; check light and dark theme readability/focus behavior; record limitations honestly. [Source: _bmad-output/planning-artifacts/epics.md#Story-2.1-Build-Character-Sheet-Shell-Identity-Permissions-And-Empty-States]
- If the local Foundry server, license, or world state blocks validation, record the blocker exactly and do not claim runtime validation passed. [Source: _bmad-output/project-context.md#Testing-Rules]

### Validation Evidence Format

Use this structure in the Dev Agent Record for each major validation pass:

```text
Foundry version/build:
World/test data:
Action performed:
Expected result:
Actual result:
Status: Pass | Fail | Blocked | Limited
Limitations:
Follow-up defect/story:
```

## Project Structure Notes

- Primary sheet classes: `src/module/applications/actor/BaseActorSheet.ts`, `src/module/applications/actor/CharacterSheet.ts`.
- Primary template: `templates/actor/character-sheet.hbs`.
- Actor data schemas: `src/module/data/actor/BaseActorData.ts`, `src/module/data/actor/CharacterData.ts`.
- Sheet registration: `src/module/applications/index.ts`.
- Constants and labels: `src/module/config/constants.ts`, `lang/en.json`.
- Styles: `styles/uesrpg-rebuilt.css`.
- Build-copy coverage: `vite.config.ts` already copies `templates/actor/*.hbs`, `styles/*.css`, and `lang/*.json`; update only if new runtime asset categories are introduced, which should not be needed for this story.
- Generated output: `dist/` remains build output only.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-2.1-Build-Character-Sheet-Shell-Identity-Permissions-And-Empty-States`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-4-Character-Sheet`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-checklist.md#4-Character-Sheet-Coverage`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-3---Persisted-State-Mutates-Only-Through-Foundry-Documents`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-7---Sheet-And-Chat-UI-Stay-Localized-Tokenized-And-Foundry-Native`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Release-Scope-Surfaces`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md`
- `_bmad-output/project-context.md`
- `_bmad-output/implementation-artifacts/1-1-verify-foundry-package-metadata-and-build-copy-contract.md`
- `_bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md`
- `_bmad-output/implementation-artifacts/1-3-establish-localization-and-ui-token-foundations.md`
- `_bmad-output/implementation-artifacts/1-4-validate-foundation-in-foundry-runtime.md`
- `src/module/applications/actor/BaseActorSheet.ts`
- `src/module/applications/actor/CharacterSheet.ts`
- `templates/actor/character-sheet.hbs`
- `src/module/data/actor/BaseActorData.ts`
- `src/module/data/actor/CharacterData.ts`
- `lang/en.json`
- `styles/uesrpg-rebuilt.css`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

### Completion Notes List

### File List
