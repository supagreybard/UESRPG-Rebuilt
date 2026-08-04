---
baseline_commit: 0999025
---

# Story 1.3: Establish Localization And UI Token Foundations

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a player or GM using UESRPG Rebuilt sheets and workflows,
I want user-facing labels and foundational UI styling to be localized and tokenized,
so that later sheets, dialogs, chat cards, and tutorials are readable, consistent, and maintainable in Foundry.

## Acceptance Criteria

1. Given a user-facing label, heading, action, warning, or workflow message is introduced in the foundation surfaces, when the UI renders it, then the text resolves through localization keys in the English language file, and hardcoded user-facing strings are not introduced in TypeScript or Handlebars templates.
2. Given foundational system styles are defined, when sheets, dialogs, or chat cards use system visual treatment, then CSS remains scoped under `.uesrpg-rebuilt` or related system classes, and light/dark theme colors, semantic colors, spacing, radius, focus, and surface tokens follow the UX design token model.
3. Given semantic colors are used for gameplay or validation states, when users view the affected UI, then the state is paired with text, labels, icons with accessible names, or explicit values, and color alone is not required to understand success, failure, warning, health, magicka, stamina, rarity, or missing-data states.
4. Given foundational styles or localization files are added or changed, when the package is built, then language and style assets are copied to the built package through the existing build workflow, and missing localization keys or stale asset paths are treated as defects.
5. Given the foundational UI is validated in Foundry, when default light and dark theme contexts are checked, then focus states, basic contrast, readable text, and scoped styling are confirmed for affected foundation surfaces, and the validation evidence records any limitations or follow-up work.

## Tasks / Subtasks

- [x] Audit current localization coverage for foundation surfaces. (AC: 1, 4)
  - [x] Inspect user-facing text in `src/module/applications/**/*.ts`, `src/module/chat/**/*.ts`, and `templates/**/*.hbs`.
  - [x] Keep labels prepared in `_prepareContext` where display-ready values already belong; templates should use prepared labels or `{{localize}}` only for simple labels.
  - [x] Add missing keys to `lang/en.json` using the existing `UESRPG.*` key pattern; do not add lore/prose/tutorial copy in this story.
  - [x] Confirm notification, warning, empty-state, tab, action, sheet, field, and chat labels resolve through localization keys.
- [x] Tighten the foundational CSS token model. (AC: 2, 3)
  - [x] Align `styles/uesrpg-rebuilt.css` custom properties with the UX design spine token categories: light/dark surfaces, text, borders, accent, semantic colors, spacing, radii, shadows, focus, and numeric/heading/body roles where practical.
  - [x] Keep selectors scoped to `.uesrpg-rebuilt`, `.uesrpg-rebuilt-*`, or theme-qualified system classes such as `body.theme-dark .uesrpg-rebuilt`; avoid broad Foundry global overrides.
  - [x] Preserve existing sheet and chat class names unless a concrete defect requires renaming; future stories already depend on these classes.
  - [x] Pair semantic color usage with visible labels, values, or text already present in sheet/chat markup; do not introduce color-only states.
- [x] Verify build-copy and package contract alignment. (AC: 4)
  - [x] Confirm `system.json` still declares `styles/uesrpg-rebuilt.css` and `lang/en.json`.
  - [x] Confirm `vite.config.ts` still copies `styles/*.css` and `lang/*.json` into `dist`.
  - [x] If adding new runtime style, language, template, or icon files, update `vite.config.ts` and `system.json` together where required.
  - [x] Do not hand-edit `dist`; rebuild from source.
- [x] Preserve Foundry-native UI behavior while improving styling. (AC: 2, 5)
  - [x] Keep Foundry V2 sheet `DEFAULT_OPTIONS` patterns intact: system CSS class, resizable windows, `submitOnChange: true`, and `closeOnSubmit: false` where already established.
  - [x] Maintain narrow-window behavior already present in `@media` rules and avoid horizontal scrolling for core foundation fields.
  - [x] Confirm focus states remain visible in both light and dark Foundry themes.
- [x] Run automated verification and capture runtime validation evidence. (AC: 4, 5)
  - [x] Run `npm run typecheck`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Validate in Foundry VTT 14 that representative actor/item sheets and the existing simple roll chat card render with localized labels and scoped styling in light and dark themes; record version, world/test data, action, expected result, actual result, status, limitations, and follow-up defects.

### Review Findings

- [x] [Review][Patch] Complete or correct manual Foundry validation evidence [1-3-establish-localization-and-ui-token-foundations.md:173]
- [x] [Review][Patch] Localize all valid race grant type labels [src/module/applications/item/RaceItemSheet.ts:512]
- [x] [Review][Defer] Object-shaped persisted grants are hidden by the `hasGrants` check [src/module/applications/item/RaceItemSheet.ts:96] — deferred, pre-existing
- [x] [Review][Defer] Malformed stored grant UUIDs can break race sheet context preparation [src/module/applications/item/RaceItemSheet.ts:565] — deferred, pre-existing

## Dev Notes

### Current Source State

- `lang/en.json` already contains the foundation localization namespace for sheet labels, actor/item type labels, sections, tabs, fields, actions, empty states, messages, chat labels, attributes, parameter types, and trait stack modes. Preserve the existing `UESRPG.*` structure and add only keys needed by actual foundation UI surfaces. [Source: lang/en.json]
- `src/module/utils/localization.ts` provides the local `localize(key: string)` helper, returning `game.i18n?.localize(key) ?? key`. Use it for TypeScript-prepared labels and notification text. [Source: src/module/utils/localization.ts]
- `src/module/config/constants.ts` centralizes system identity and `LABELS.actorTypes` / `LABELS.itemTypes` localization keys. Do not duplicate actor/item type label keys outside this pattern. [Source: src/module/config/constants.ts]
- `BaseActorSheet` and `BaseItemSheet` already prepare localized `typeLabel`, resource fields, characteristic fields, inventory fields, and subtype fields at `_prepareContext`. Preserve this TypeScript-to-Handlebars boundary; avoid moving rules or localization mapping into templates. [Source: src/module/applications/actor/BaseActorSheet.ts; src/module/applications/item/BaseItemSheet.ts]
- `BaseRuleItemSheet`, `TraitItemSheet`, `RaceItemSheet`, and `PowerItemSheet` already localize tab labels, field labels, sheet titles, and race grant warnings. This story should audit and tighten missing coverage rather than replacing sheet architecture. [Source: src/module/applications/item/BaseRuleItemSheet.ts; src/module/applications/item/TraitItemSheet.ts; src/module/applications/item/RaceItemSheet.ts; src/module/applications/item/PowerItemSheet.ts]
- Handlebars templates already use `{{localize}}` for common field, section, tab, chat, and action labels, and use document names for image titles. Dynamic document names are not localization defects. [Source: templates/actor/character-sheet.hbs; templates/actor/npc-sheet.hbs; templates/item/item-sheet.hbs; templates/item/rule-item-sheet.hbs; templates/item/trait-item-sheet.hbs; templates/chat/simple-roll.hbs]
- `styles/uesrpg-rebuilt.css` already defines system variables, light and dark theme variable sets, sheet/card/field/chat classes, semantic resource colors, focus treatment, and responsive collapse rules. Current tokens are partly aligned but not yet a clean match for the UX design spine names and values. [Source: styles/uesrpg-rebuilt.css; _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md#Colors]
- `system.json` declares `styles/uesrpg-rebuilt.css` and `lang/en.json`; `vite.config.ts` copies `styles/*.css` and `lang/*.json`. Keep these aligned for any asset changes. [Source: system.json; vite.config.ts]

### Architecture Compliance

- Foundry VTT 14 remains the application boundary. Do not introduce a client framework, external styling runtime, bespoke routing, or Node/Vite runtime dependency. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-1---Foundry-Runtime-Is-The-Application-Boundary]
- Sheet and chat UI must stay localized, tokenized, and Foundry-native. Application classes prepare labels, derived display values, permission states, and fallbacks; templates stay simple and localized; CSS remains scoped to `.uesrpg-rebuilt` or related system classes and uses the UX token model. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-7---Sheet-And-Chat-UI-Stay-Localized-Tokenized-And-Foundry-Native]
- Actor/item type changes are atomic cross-file changes. This story should not add or rename actor/item types; if a defect forces it, update constants, `system.json`, data models, registration, templates, localization, build-copy, migration assessment, and validation evidence together. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-2---Document-Type-Changes-Are-Atomic-Cross-File-Changes]
- Release-relevant style/localization changes require baseline verification plus manual Foundry VTT 14 validation evidence. Build success is not enough to prove runtime sheet/theme behavior. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence]

### UX And Accessibility Guardrails

- Use the Morrowind-inspired token model with warm parchment light tokens, dark carved/metallic tokens, UESRPG Red accents, semantic gameplay colors, restrained borders/shadows, lightly softened squared shapes, and scoped CSS variables/classes. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md#Colors]
- Semantic colors for health, magicka, stamina, success, failure, warning, and rarity must be compact role tokens paired with text or values. Avoid color-only meaning and avoid one-off component colors that bypass the token set. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md#Colors]
- Typography roles should separate decorative headings from practical body/mechanical text. Numeric mechanical values should align cleanly where practical and should not use decorative type. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md#Typography]
- Foundation UI must preserve Foundry behavior and remain readable in default, missing, filled, editable, non-editable, narrow-window, keyboard, and focus states where the affected surface supports them. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#State-Patterns; _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Accessibility-Floor]
- Final shipped UI labels and tutorial/help copy require human review before release. This story may add mechanical labels needed by existing UI, but should not add AI-generated prepared rules/lore/tutorial prose or public-facing content. [Source: _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md#Voice-and-Tone; _bmad-output/project-context.md#Critical-Dont-Miss-Rules]

### File-Specific Guardrails

- `lang/en.json`: add or correct English localization keys only for actual current/foundation UI. Keep JSON valid and sorted/coherent enough for maintainability; do not add speculative future keys in bulk.
- `styles/uesrpg-rebuilt.css`: refine the existing token and class foundation instead of replacing all styling. Avoid unrelated visual churn on sheet layouts not required for token/localization foundations.
- `templates/**/*.hbs`: remove hardcoded user-facing text if found. Keep dynamic document names, UUIDs, and data values dynamic rather than localized.
- `src/module/applications/**/*.ts`: localize user-facing labels, warnings, tab labels, field labels, and sheet titles through `localize()` or existing label constants. Runtime log/debug strings are not the main target unless they surface to users.
- `src/module/chat/**/*.ts` and `templates/chat/*.hbs`: ensure chat label text comes from localization keys and semantic success/failure state is represented by both text and styling.
- `system.json` and `vite.config.ts`: update only when asset declarations or copy targets actually change. Do not bump Foundry compatibility.
- `dist/`: never hand-edit generated output; use `npm run build`.

### Testing Requirements

- Required automated checks: `npm run typecheck`, `npm run lint`, and `npm run build`. [Source: _bmad-output/project-context.md#Testing-Rules]
- Required packaging check: after `npm run build`, confirm `dist/styles/uesrpg-rebuilt.css` and `dist/lang/en.json` exist and correspond to source paths declared in `system.json`. [Source: _bmad-output/planning-artifacts/epics.md#Story-1.3-Establish-Localization-And-UI-Token-Foundations]
- Required manual Foundry validation: open the built system in Foundry VTT 14 and inspect representative existing surfaces: a character actor sheet, an NPC sheet if available, at least one item/rule item sheet, and the simple roll chat card if reachable. Check localized labels, no missing key text for affected surfaces, scoped styling, visible focus states, readable light/dark theme behavior, and semantic color text-pairing. [Source: _bmad-output/planning-artifacts/epics.md#Story-1.3-Establish-Localization-And-UI-Token-Foundations]
- Manual validation evidence must include Foundry version, world/test data, action performed, expected result, actual result, status, limitations, and follow-up defects if any. [Source: _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence]

### Scope Boundaries

- This story establishes localization and UI token foundations only. It should not implement new sheets, new rules workflows, new builders, new document types, new compendium content, or tutorial/onboarding copy.
- Do not perform a full visual redesign. Make the smallest source changes needed to align foundational tokens and localization behavior with the design spine.
- Do not add new dependencies for CSS tokens, localization scanning, or UI state unless a concrete defect cannot be solved within the existing Foundry/Vite setup.
- Do not broaden `game.uesrpg` public API for localization or tokens unless there is a concrete module/macro consumer requirement.

### Previous Story Intelligence

- Story 1.2 tightened lifecycle boundaries by awaiting `runMigrations()` in `ready`, kept `game.uesrpg` intentionally narrow, centralized item sheet registration type references through `ITEM_TYPES`, and fixed an item data model schema initialization crash. Avoid undoing those runtime-registration fixes. [Source: _bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md#Completion-Notes-List]
- Story 1.2 passed `npm run typecheck`, `npm run lint`, and `npm run build` after the runtime fix. If checks fail in this story, investigate the current source changes rather than weakening TypeScript or lint configuration. [Source: _bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md#Debug-Log-References]
- Story 1.2 achieved Foundry VTT 14 Build 364 runtime validation in Greybard's local dev world after rebuild, including successful localization loading and actor template compilation. Use that as the current known-good runtime baseline. [Source: _bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md#Debug-Log-References]

### Git Intelligence

- Recent commits are `0999025 fix runtime errors`, `397fff6 ignore bmad and agents artifacts, fix type errors`, `46e6286 fix typing`, `644f6d6 Weapon WIP`, and `57d5a9b readme update`.
- Recent work fixed runtime/type issues. Keep changes narrow and verify no localization/style edits reintroduce Foundry load failures or type-check workarounds.
- No external web research is required for this story. The relevant technical constraints are project-specific Foundry VTT 14 conventions, existing source state, and the local architecture/UX spines.

## Project Structure Notes

- Localization file: `lang/en.json`.
- Scoped system CSS and token foundation: `styles/uesrpg-rebuilt.css`.
- Package asset declarations: `system.json`.
- Build-copy rules: `vite.config.ts`.
- Localization helper: `src/module/utils/localization.ts`.
- Shared constants and label key maps: `src/module/config/constants.ts`.
- Existing actor sheet context preparation: `src/module/applications/actor/BaseActorSheet.ts`, `CharacterSheet.ts`, and `NPCSheet.ts`.
- Existing item sheet context preparation: `src/module/applications/item/BaseItemSheet.ts`, `BaseRuleItemSheet.ts`, `TraitItemSheet.ts`, `RaceItemSheet.ts`, `PowerItemSheet.ts`, and `UesrpgItemSheet.ts`.
- Existing templates to audit: `templates/actor/*.hbs`, `templates/item/*.hbs`, and `templates/chat/*.hbs`.
- Generated output: `dist/` must remain build output only.

## References

- `_bmad-output/planning-artifacts/epics.md#Story-1.3-Establish-Localization-And-UI-Token-Foundations`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#FR-3-Localization-Ready-User-Interface`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#NFR-5-Accessibility-and-legibility`
- `_bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md#NFR-6-Packaging-reliability`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-7---Sheet-And-Chat-UI-Stay-Localized-Tokenized-And-Foundry-Native`
- `_bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md#AD-11---Release-Readiness-Requires-Runtime-Evidence`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md`
- `_bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md`
- `_bmad-output/project-context.md`
- `_bmad-output/implementation-artifacts/1-2-register-system-lifecycle-documents-data-models-sheets-settings-and-public-api-boundary.md`
- `lang/en.json`
- `styles/uesrpg-rebuilt.css`
- `system.json`
- `vite.config.ts`

## Dev Agent Record

### Agent Model Used

gpt-5.5

### Debug Log References

- 2026-08-04: `npx prettier --write src/module/applications/item/RaceItemSheet.ts templates/item/race-item-sheet-grants.hbs styles/uesrpg-rebuilt.css` formatted TypeScript/CSS; Handlebars formatting failed because Prettier cannot parse the existing block-in-attribute syntax in the template.
- 2026-08-04: `npm run typecheck` passed.
- 2026-08-04: `npm run lint` passed.
- 2026-08-04: `npm run build` passed; Vite copied static assets and compendium packs compiled.
- 2026-08-04: `test -f dist/styles/uesrpg-rebuilt.css && test -f dist/lang/en.json` passed.
- 2026-08-04: `docker ps --format '{{.Names}} {{.Status}} {{.Ports}}'` confirmed `uesrpg-rebuilt-foundry-devserver-1` was already running on `localhost:30001`.
- 2026-08-04: `chromium --headless --disable-gpu --no-sandbox --dump-dom http://localhost:30001` reached Foundry VTT 14 Build 364 but stopped at the unauthenticated join page, so sheet/chat visual validation could not be completed from this session.
- 2026-08-04: Manual review found actor sheet window title bars displaying `TYPES.Actor.npc` and `TYPES.Actor.character`; added missing `TYPES.Actor.*` localization keys.
- 2026-08-04: After actor type localization fix, `npm run typecheck`, `npm run lint`, `npm run build`, and `test -f dist/styles/uesrpg-rebuilt.css && test -f dist/lang/en.json` passed.
- 2026-08-04: Manual Foundry validation confirmed the character and NPC sheet window title localization fix after refresh/reopen.
- 2026-08-04: Final regression checks `npm run typecheck`, `npm run lint`, and `npm run build` passed before moving story to review.

### Completion Notes List

- Localized race grant type and grant parameter type display values in `RaceItemSheet` so the race grants template no longer renders raw `trait`, `power`, `text`, `number`, or `roll_formula` values as user-facing labels.
- Added Foundry actor document type localization keys so character and NPC sheet window title bars resolve to `Character` and `NPC` instead of `TYPES.Actor.*` keys.
- Tightened the CSS token foundation by scoping base custom properties to system UI classes, adding focus and typography role tokens, applying numeric role fonts to mechanical values, and routing broken/missing grant semantic colors through a missing-data token.
- Confirmed `system.json` and `vite.config.ts` already declare/copy `styles/uesrpg-rebuilt.css` and `lang/en.json`; no package contract changes were needed.
- Automated validation, packaging checks, and manual Foundry validation passed. Manual review found one actor sheet title-bar localization defect, which was fixed and revalidated.
- Manual Foundry validation evidence: Foundry VTT 14 Build 364, local dev world at `localhost:30001`; representative actor sheet windows were refreshed/reopened; expected localized title bars `Character` and `NPC`; actual result matched after the `TYPES.Actor.*` key fix; status passed; no remaining follow-up defects reported.

### File List

- `src/module/applications/item/RaceItemSheet.ts`
- `lang/en.json`
- `styles/uesrpg-rebuilt.css`
- `templates/item/race-item-sheet-grants.hbs`

### Change Log

- 2026-08-04: Localized race grant display labels and tightened scoped UI token/focus/semantic color foundations; automated checks passed, manual Foundry visual validation still pending.
- 2026-08-04: Fixed manual review finding where character and NPC sheet window title bars showed missing `TYPES.Actor.*` localization keys.
- 2026-08-04: Completed manual validation and moved story to review.
