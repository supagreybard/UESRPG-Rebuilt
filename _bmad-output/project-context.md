---
project_name: 'UESRPG-Rebuilt'
user_name: 'Greybard'
date: '2026-07-25'
sections_completed: ['discovery', 'technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality_rules', 'workflow_rules', 'critical_rules']
existing_patterns_found: 11
status: 'complete'
rule_count: 73
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Foundry VTT system package targeting Foundry `14`; this is not a generic web app. Follow Foundry document, hook, sheet, template, localization, and packaging conventions.
- Do not bump `system.json` compatibility just because TypeScript or Vite builds pass; compatibility reflects tested Foundry runtime support.
- TypeScript `^5.8.2` with `strict: true`, `moduleResolution: "bundler"`, `isolatedModules: true`, and `allowJs: false`.
- Vite `^6.2.2` builds one ES module from `src/uesrpg-rebuilt.ts` to `dist/uesrpg-rebuilt.js`; alternate bundlers, multiple runtime entries, or new app architecture require an explicit architecture decision.
- Runtime assets are copied by `vite-plugin-static-copy`; update `vite.config.ts` when adding templates, styles, language files, icons, or other files that must ship to `dist`.
- Foundry typings come from `fvtt-types` on GitHub `main`; upstream type changes can create type errors or obsolete local workarounds.
- Type gaps are expected but should be treated as type-safety work. Do not normalize new broad `any` usage; isolate and document local augmentations, wrappers, forks, or generated type layers.
- Keep `system.json`, registered document/data model types, sheet templates, localization keys, and build-copy rules aligned when adding or renaming actor/item types.
- Use npm with `package-lock.json`; do not commit competing lockfiles.
- Runtime `src/` code runs in Foundry's browser/client environment. Do not depend on Vite, Node scripts, package-only APIs, or `node:*` imports there.

## Critical Implementation Rules

### Language-Specific Rules

- Write TypeScript only in runtime source; `tsconfig.json` has `allowJs: false` and includes `src/**/*.ts`, `src/**/*.d.ts`, and `vite.config.ts`.
- Preserve strict-mode assumptions. Avoid weakening compiler options to make Foundry typing issues disappear.
- Prefer explicit local types, narrow interfaces, `unknown`, and type guards over broad `any`; existing `any` near Foundry APIs is temporary debt, not a pattern to expand.
- Use ES module imports/exports. Keep relative imports aligned with the existing folder structure and avoid barrel files unless they match an established `index.ts` registration/export pattern.
- Treat `game`, `foundry`, `Hooks`, `Actor`, `Item`, and `Roll` as Foundry runtime globals supplied by the client environment, not imports from npm packages.
- Use optional chaining and runtime checks around Foundry globals or collections that may be unavailable during lifecycle phases.
- Keep async Foundry operations explicit: `await` document updates and chat/message side effects; use `void` only when intentionally fire-and-forget, as in lifecycle startup.
- Keep persisted document updates path-based and conservative, especially migrations using keys like `system.prose.notes` or deletion syntax like `system.-=details`.

### Framework-Specific Rules

- Foundry VTT is the framework/runtime. Do not treat this as a generic browser SPA or server-rendered app.
- Use official Foundry VTT documentation as the authority for runtime behavior and APIs; prefer version-appropriate Foundry docs over generic web patterns, stale examples, or assumptions from typings alone.
- `system.json` is part of Foundry's runtime contract, not passive metadata; keep it aligned with code, templates, styles, languages, packs, and compatibility.
- Register Foundry integrations in lifecycle order from `src/uesrpg-rebuilt.ts`: document classes and data models during `init`, trackable attributes during `setup`, migrations and world-data work during `ready`.
- Do not read or mutate world collections before the lifecycle phase where Foundry makes them available.
- Treat `game.uesrpg` as the system's public API namespace for module/addon integration. Keep exposed values intentional, stable, discoverable, and documented when meant for module authors; do not force integrations to depend on internal file paths or sheet implementation details.
- Use Foundry V2 application patterns for sheets: `foundry.applications.api.HandlebarsApplicationMixin` over `ActorSheetV2` or `ItemSheetV2`.
- Sheet classes should define `DEFAULT_OPTIONS` with the system CSS class, dimensions, resizable window behavior, and `submitOnChange: true` / `closeOnSubmit: false` when matching existing sheets.
- Treat `_prepareContext` as the TypeScript-to-Handlebars boundary: compute labels, derived fields, and safe fallback values there; keep templates simple.
- Use `localize()` and `lang/en.json` keys for user-facing labels; do not hardcode display text in TypeScript or templates unless it is genuinely non-user-facing.
- Data models should use `foundry.data.fields` schemas with clear initial values and validation constraints for persisted actor/item system data.
- Actor/item type changes are cross-file invariants: update constants, `system.json` document types, data model registration, document/sheet registration, templates, localization, and build-copy coverage together.
- Runtime contract changes must consider existing world data and packaged `dist` behavior, not only TypeScript compile success.
- Preserve Foundry-native interaction patterns. Do not introduce a client framework or bespoke routing/state system without an explicit architecture decision.

### Testing Rules

- No dedicated automated test framework is configured yet; do not invent test commands beyond the scripts that exist.
- Use `npm run typecheck`, `npm run lint`, and `npm run build` as the current baseline verification commands.
- `npm run build` runs `automation/prepare-dist-build.mjs`, Vite build, and `npm run packs:compile`; treat build success as partial packaging verification, not Foundry runtime validation.
- Passing typecheck/lint/build does not prove Foundry runtime correctness. Validate in the local Foundry dev server when changes affect sheets, hooks, data models, migrations, compendium packs, `system.json`, localization, or runtime assets.
- Record manual Foundry validation in reproducible terms in the final report or story notes: affected document type, sheet or workflow opened, world/data state used, expected result, and any limitations.
- For sheet/template changes, verify rendered sheets with missing/empty/default data, localization keys, editable and non-editable states, and both light/dark Foundry themes when styling is affected.
- For asset/template additions, verify files are copied to `dist` and paths match Foundry runtime expectations.
- For compendium pack changes, be explicit whether source data or generated packs were edited, and validate the intended extract/compile direction.
- When adding future tests, keep them aligned with Foundry boundaries: pure utilities can be unit-tested outside Foundry, while document/sheet/lifecycle behavior needs Foundry-aware integration or manual runtime validation.
- Migration changes require extra care: verify against pre-migration sample data, check idempotency, and cover both world items and embedded actor items.

### Code Quality & Style Rules

- Formatting follows Prettier: single quotes, semicolons, and trailing commas. Avoid unrelated formatting churn outside files being intentionally changed.
- ESLint uses recommended JavaScript and TypeScript rules; `no-explicit-any` and `no-namespace` are disabled, but broad `any` remains discouraged by project convention.
- Keep source organization aligned with existing folders: `config`, `data`, `documents`, `applications`, `utils`, `dice`, `chat`, and `migration`.
- Use PascalCase for classes and class-backed document/data/sheet files; use camelCase for functions/variables; follow existing lowercase or kebab-case patterns for utilities, config files, templates, and CSS class segments.
- Keep system constants centralized in `src/module/config/constants.ts`; do not duplicate string literals for system IDs, actor/item types, labels, or resource paths.
- Treat public names and exposed shapes under `game.uesrpg` as integration-facing API; rename or reshape them deliberately and consider module compatibility.
- Prefer small, direct functions over new abstraction layers unless reuse is clear.
- Keep comments rare and useful; explain non-obvious Foundry lifecycle, migration, or persistence behavior rather than restating code.
- Preserve the localization pattern: shared label keys may be centralized in `LABELS`; all user-facing text should resolve through `UESRPG.*` keys and `localize()`.
- CSS should stay scoped under `.uesrpg-rebuilt` or related system classes, use `--uesrpg-rebuilt-*` tokens, and avoid broad global Foundry overrides or one-off hardcoded theme values.
- Follow `docs/ui-design-principles.md`: maintain Foundry-native UI behavior, Morrowind-inspired atmosphere, readable forms/chat cards, and intentional light/dark themes.

### Development Workflow Rules

- Use existing npm scripts as the source of truth for project workflows: `npm run build`, `npm run typecheck`, `npm run lint`, `npm run format`, and `npm run packs:*`; use `npm run dev` only when a watch build is actually needed.
- For local Foundry validation, follow `README.md`: build the system, use the Docker dev server if local runtime validation is needed and the server is already available, and access Foundry at `localhost:30001`.
- The Docker dev server may already be running or contain useful local state. Do not start, stop, restart, or rebuild it unless explicitly needed and confirmed.
- Avoid starting long-lived watch/dev processes unless the task requires them; prefer one-shot verification commands for routine checks.
- Treat generated artifacts as disposable outputs unless a workflow says otherwise. Do not hand-edit `dist`; fix source files and rebuild.
- Treat compendium pack data as managed by automation scripts. Be explicit when extracting from Foundry versus compiling source data for distribution, because the wrong direction can overwrite intended data.
- Keep `system.json` version, compatibility, packs, document types, languages, styles, and ES module entries aligned with shipped behavior.
- Do not commit or rely on local Foundry license files, dev server data, secrets, or machine-specific Docker state.
- Before reporting implementation complete, run the strongest feasible verification for the change and state any skipped checks.

### Critical Don't-Miss Rules

- Foundry's official AI Content Policy is authoritative and may change; consult it before adding AI-assisted or AI-generated user-facing package material: https://foundryvtt.com/article/ai-policy/.
- Do not add AI-generated prepared non-code user-facing content, including rules/lore/adventure text, journal or item descriptions, UI labels, visual assets, audio, marketing copy, bundled/generated compendium content, or externally hosted prepared content surfaced by the package.
- AI-assisted code is permitted only when the author can understand, explain, modify, and maintain it. Avoid large opaque generated code drops; keep design notes or commit history sufficient to demonstrate authorship and understanding.
- AI translation of human-authored UI/text requires fluent human review before publication.
- Runtime AI features for improvised end-user content require explicit design as AI tooling; generated executable code must be shown readably and require user confirmation before execution.
- Do not provide unlicensed or unauthorized third-party material to AI models as training data or runtime context, and do not scrape/inject context from other modules or assets unless the author has rights to do so.
- For third-party or stock assets, record source, license, and human-made provenance when required for policy compliance; do not add assets with unclear rights or origin.
- If a content, asset, compendium, translation, or runtime-AI change may be policy-sensitive, stop and ask rather than assuming compliance.
- Never treat `system.json`, data model schemas, sheet templates, localization, and build-copy configuration as independent changes; Foundry runtime behavior depends on their alignment.
- Do not expand broad `any` usage to paper over Foundry type gaps; reduce that debt where feasible.
- Do not hand-edit generated `dist` output or treat build artifacts as source.

## Authoritative References

- Foundry VTT API Docs: https://foundryvtt.com/api/
- Foundry VTT Knowledge Base: https://foundryvtt.com/kb/
- Foundry VTT AI Content Policy: https://foundryvtt.com/article/ai-policy/

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing code in this project.
- Follow all rules as documented; when unsure, prefer the more restrictive option or ask.
- Update this file when new durable implementation patterns emerge.

**For Humans:**

- Keep this file lean and focused on unobvious agent guidance.
- Update it when the technology stack, Foundry policy constraints, or project conventions change.
- Review periodically for outdated rules or constraints that have become obvious.

Last Updated: 2026-07-25
