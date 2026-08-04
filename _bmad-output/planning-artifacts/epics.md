---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/specs/spec-uesrpg-rebuilt/SPEC.md
  - _bmad-output/project-context.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-checklist.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-decisions.md
  - _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/EXPERIENCE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-UESRPG-Rebuilt-2026-07-29/DESIGN.md
  - _bmad-output/planning-artifacts/architecture/architecture-UESRPG-Rebuilt-2026-07-29/ARCHITECTURE-SPINE.md
---

# UESRPG-Rebuilt - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for UESRPG-Rebuilt, decomposing the requirements from the SPEC, PRD, Rules Coverage Checklist, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The system registers its actor types, item types, document classes, data models, sheets, styles, templates, localization, scripts, and packs through Foundry-compatible package metadata and lifecycle hooks.

FR2: The system exposes only intentional, stable integration-facing values through `game.uesrpg` when module or macro interoperability requires them.

FR3: The system resolves user-facing labels and sheet text through localization keys rather than hardcoded source strings.

FR4: Players and GMs can view and manage all character data required for common UESRPG play through a Foundry-native character sheet.

FR5: GMs can create, view, edit, and run non-player entities through a statblock sheet suitable for preparation and live encounters.

FR6: GMs and players can view and configure items, weapons, armor, and related equipment through understandable sheets.

FR7: GMs and players can view and configure spells, ritual-related data, effects, and magic-relevant entities through Foundry-native sheets.

FR8: Users can initiate and resolve UESRPG skill tests from relevant sheets or workflows.

FR9: Users can initiate and resolve characteristic tests from relevant sheets or workflows.

FR10: Users can resolve opposed tests between eligible actors or entities.

FR11: Rules automation produces Foundry-native chat or roll output that explains enough of the calculation for users to trust it.

FR12: Users can roll or calculate initiative and use Foundry combat tracking for UESRPG encounters.

FR13: Users can initiate attacks from actor or item data and produce visible attack results.

FR14: Users can resolve defense actions or responses required by UESRPG combat.

FR15: The system supports updates to combat-relevant actor state where rules automation requires it.

FR16: Users can cast spells using actor and spell data, resolve required rolls, and produce visible outcomes.

FR17: Users can resolve ritual spellcasting through a workflow appropriate to UESRPG rules complexity.

FR18: The system supports magical mishap resolution for spellcasting and alchemy.

FR19: The system supports alchemy-related creation or resolution workflows needed for 1.0 play and content authoring.

FR20: Users can create playable characters through a guided workflow that produces a valid character document.

FR21: Users can advance characters through a guided workflow that applies or records advancement decisions.

FR22: Users and Greybard can create structured spell entities through a guided builder.

FR23: Users and Greybard can create structured enchanted items or enchantment-related entities through a guided builder.

FR24: Users and Greybard can create structured alchemy outputs through a guided builder.

FR25: Users and Greybard can create weapons, armor, and related equipment through guided builders.

FR26: GMs and Greybard can create statblocks through a guided builder.

FR27: All builders produce Foundry document data that is structurally valid, user-editable, and suitable for compendium inclusion when rights/provenance allow it.

FR28: GMs can calculate, record, or distribute basic XP rewards in a way that supports UESRPG session flow.

FR29: GMs can use treasure tables through Foundry-native roll table or equivalent workflows.

FR30: GMs can generate high-value loot or artifacts through a workflow suitable for UESRPG play.

FR31: The 1.0 package includes broad, rights-cleared compendium coverage for the main entity types needed for typical play.

FR32: Every distributed System Content entry has acceptable provenance and rights status before release.

FR33: System Content can be compiled, packaged, and validated through the project's compendium automation rather than hand-edited distribution artifacts.

FR34: The project passes the existing baseline verification commands before 1.0 release.

FR35: Affected sheets, workflows, document types, migrations, compendia, and package assets are manually validated in a real Foundry environment before being called release-ready.

FR36: Before 1.0, at least one validation pass confirms that a group other than Greybard's own table can reasonably install, create or use needed entities, and run a representative balanced one-shot session flow with minimal handholding, with Greybard-simulated validation allowed initially if no external group is available.

FR37: The 1.0 package includes concise onboarding support for users who are not personally guided by Greybard, including installation/setup quickstart, core play workflow guide, GM content workflow notes, known release limitations, and Foundry Tutorial API guidance.

### NonFunctional Requirements

NFR1: The system preserves Foundry document, sheet, roll, chat, combat, compendium, and settings paradigms.

NFR2: Common rolls and combat/magic actions support repeated live-session use without requiring raw data editing or external lookup for normal cases.

NFR3: Automated rolls and updates expose enough inputs and outcomes for GM/player trust.

NFR4: GMs can correct, extend, or homebrew actors, items, spells, statblocks, and generated/builder-created content through understandable sheets.

NFR5: Sheets and chat cards prioritize readable contrast, clear form structure, keyboard/mouse usability consistent with Foundry, and support for both light and dark Foundry themes.

NFR6: Runtime assets, templates, styles, localization, packs, and metadata are copied and packaged consistently through the existing build workflow.

NFR7: Data models use explicit schemas and validation constraints where feasible; type gaps are isolated rather than normalized through broad `any` expansion.

NFR8: Prepared user-facing package content is human-authored or otherwise rights-cleared and is not generated by AI unless a future explicit policy-compliant process permits it.

NFR9: Common workflows are discoverable through concise written guidance and Foundry-native tutorials rather than relying on personal instruction.

### Additional Requirements

- Foundry VTT 14 is the runtime boundary; implementation must preserve Foundry document, sheet, chat, roll, combat, compendium, tutorial, lifecycle, permission, and package conventions.
- Runtime behavior must be implemented as a Foundry VTT 14 system package and must not depend on Node-only APIs, Vite-only runtime behavior, or a separate browser application model.
- Actor and item type changes must be atomic cross-file changes across centralized constants, `system.json`, data model registration, document/sheet registration, templates, localization keys, styles/assets, `vite.config.ts` static-copy coverage, migrations when needed, and validation evidence.
- Persisted actor, item, combat, and content state must be represented in Foundry documents and mutated through awaited Foundry document APIs using conservative path-based updates.
- High-risk or ambiguous combat, magic, advancement, builder, or content updates require user confirmation or clear manual control.
- Mechanical resolution must flow through shared dice/rules services before producing Foundry-native chat or roll output.
- Shared d100 services must support `d100 <= target number`, target values over `100`, target-number modifiers, skill bonus as `10 * rank`, untrained penalty `-20`, limited tests, DoS/DoF, player Lucky/Unlucky criticals, and NPC/creature default critical ranges of `1-3` and `98-100` unless statblock data overrides them.
- Automated and semi-automated rolls must show actor/source, roll type, inputs used, target value when applicable, modifiers, raw roll, outcome, critical state, DoS/DoF when applicable, missing-data warnings, and manual adjudication notes.
- Character creation, character advancement, spell creation, equipment, and statblock builders are full 1.0 builders; enchanting and alchemy builders are minimal/deferred 1.0 builders; rituals are manual/simple entity workflows for 1.0.
- Builders must validate required inputs, create valid Foundry documents, open resulting documents on their sheets, preserve editability, and produce data usable by relevant play workflows.
- Builder-created content may enter compendium packaging only through the managed content and provenance workflow.
- Distributed System Content must originate from managed source data and have a machine-readable Provenance Manifest entry with pack/entity IDs, name, type/category, source/origin, rights status, human author/reviewer, review date, distribution allowed state, notes/limitations, and related builder/source file when applicable.
- Current public packs are not release-ready System Content until manifest-grade provenance exists and the pack workflow enforces or validates it.
- Generated packs and `dist` artifacts are build outputs, not hand-edited sources of truth.
- Sheet/application classes must prepare labels, derived display values, permission states, and safe fallbacks at the TypeScript-to-Handlebars boundary.
- Handlebars templates must stay simple and localized; CSS must remain scoped to `.uesrpg-rebuilt` or related system classes and use the UX token model.
- `init` owns public API, document class, data model, application, and settings registration; `setup` owns trackable attributes and setup-phase integrations; `ready` owns migrations and world-data operations.
- Release-relevant changes require `npm run typecheck`, `npm run lint`, `npm run build`, and manual Foundry VTT 14 validation evidence for affected sheets, workflows, document types, migrations, compendium packs, provenance manifest, documentation/tutorials, balanced one-shot coverage, and minimal-handholding pass.
- Manual fallback is allowed only for rare rules edge cases, highly custom rituals/enchanting/alchemy/unusual magic, ambiguous combat, rights-limited content, or explicit GM judgment; it must be visible/discoverable and must not replace core workflows.
- No starter or greenfield template was specified by the architecture; implementation should build within the existing Foundry-native layered document architecture and repository structure.

### UX Design Requirements

UX-DR1: Preserve Foundry-native behavior for sheets, dialogs, tabs, chat cards, combat tracker integration, compendium usage, document permissions, settings, and Tutorial API cues; do not introduce bespoke routing or hidden raw JSON editing as a normal workflow.

UX-DR2: Implement the Morrowind-inspired token model with warm parchment light theme tokens, carved/dark metallic dark theme tokens, UESRPG Red accents, semantic gameplay colors, restrained borders/shadows, lightly softened squared shapes, and scoped CSS variables/classes.

UX-DR3: Use typography roles intentionally: decorative heading role only for titles, section headings, tab labels, major labels, and short emphasis; practical body text for dense prose and inputs; numeric role for mechanical values such as characteristics, resources, TN, DoS/DoF, costs, ENC, damage, and AR.

UX-DR4: Sheet layouts must use repeatable Foundry-native sections: header, optional tab bar, summary/status area, core data panels, lists/tables, notes, and GM/private areas while preserving expected dimensions, scrolling, resizable behavior, and submit-on-change expectations.

UX-DR5: Character and statblock sheets may use multi-column desktop layouts but must collapse cleanly to one column in narrow sheet windows without hiding primary actions or forcing horizontal scrolling for core fields.

UX-DR6: Item, equipment, spell, ritual, enchantment, and alchemy sheets must visibly separate mechanical fields from descriptive/prose fields.

UX-DR7: Sheet headers must show document identity, type/category, important summary values, and high-value actions without hiding required editing behind nonstandard controls.

UX-DR8: Resource strips for characters/statblocks must summarize derived resources and combat-relevant values using semantic colors paired with text labels/values, with values editable or linked to editable sources where appropriate.

UX-DR9: Mechanical lists/tables for skills, inventory, attacks, armor, spells, effects, and content lists must keep values aligned and scan-friendly, with common actions reachable without raw data entry.

UX-DR10: Roll/test dialogs must show actor/source, roll type, governing value, difficulty, free modifiers, target value, and warnings before rolling when user confirmation is needed.

UX-DR11: Chat roll cards must concisely show source, roll type, inputs, target, modifiers, raw roll, outcome, critical state, DoS/DoF, missing-data warnings, and manual adjudication notes without becoming ornate mini-sheets.

UX-DR12: Defense output must be linked or clearly associated with the triggering attack so the table can understand combat sequence and outcome.

UX-DR13: Conservative combat or high-risk workflow updates may be suggested, but ambiguous or high-risk updates require confirmation or clear manual control.

UX-DR14: Builder steppers must show current, completed, incomplete, and blocked states; ordered steps are required when later rules choices depend on earlier choices.

UX-DR15: Builder validation failures must keep the user on the affected step, identify missing/invalid fields, preserve entered data, and visually/programmatically associate errors with affected fields where feasible.

UX-DR16: Builder completion must create a valid Foundry document, open it on its sheet, and leave it editable.

UX-DR17: Manual fallback states for rituals, enchantments, alchemy, rare combat, rights-limited tables, and GM adjudication must be visible or discoverable in the relevant sheet, chat output, workflow text, or documentation.

UX-DR18: Missing or incomplete data must be surfaced near the attempted action and route users back to editable sheet/workflow data where possible; silent failure is not acceptable.

UX-DR19: Non-editable permission states must respect Foundry document permissions while remaining legible and understandable.

UX-DR20: Accessibility floor requires accessible names/roles/states where Foundry patterns allow, keyboard traversal in reading order, visible focus states in light and dark themes, text-paired semantic colors, readable dense tables under zoom/resized sheet windows, and reduced-motion-safe emphasis.

UX-DR21: Compendium/provenance workflows must expose pack/entity ID, source/origin, rights status, human reviewer, review date, allowed/disallowed state, notes, and related builder/source file; blocked release content must not be hidden only in build logs.

UX-DR22: Onboarding must use concise docs plus Foundry Tutorial API cues for install/setup, core play workflows, GM content workflows, and known limitations; tutorial/UI copy requires localization and human review before release.

UX-DR23: The 1.0 information architecture must provide surfaces for every balanced one-shot requirement: character/prebuilt use, skill/social resolution, characteristic test, opposed test, initiative, attack/defense, combat state update, spellcasting, ritual spellcasting, mishap, alchemy/consumable use, treasure/artifact reward, XP reward, and compendium content use.

### FR Coverage Map

FR1: Epic 1 - Package registration and runtime contract

FR2: Epic 1 - Public `game.uesrpg` API boundary

FR3: Epic 1 - Localization-ready UI foundation

FR4: Epic 2 - Character sheet

FR5: Epic 2 - Statblock sheet

FR6: Epic 2 - Item and equipment sheets

FR7: Epic 2 - Magic entity sheets

FR8: Epic 3 - Skill tests

FR9: Epic 3 - Characteristic tests

FR10: Epic 3 - Opposed tests

FR11: Epic 3 - Chat and roll transparency

FR12: Epic 4 - Initiative tracking

FR13: Epic 4 - Attack workflow

FR14: Epic 4 - Defense workflow

FR15: Epic 4 - Combat state updates

FR16: Epic 4 - Spellcasting workflow

FR17: Epic 4 - Ritual spellcasting workflow

FR18: Epic 4 - Magical mishaps

FR19: Epic 4 - Alchemy support

FR20: Epic 5 - Character creation wizard

FR21: Epic 5 - Character advancement wizard

FR22: Epic 5 - Spell creation builder

FR23: Epic 5 - Enchanting builder

FR24: Epic 5 - Alchemy builder

FR25: Epic 5 - Equipment builders

FR26: Epic 5 - Statblock builder

FR27: Epic 5 - Builder output quality

FR28: Epic 6 - XP reward support

FR29: Epic 6 - Treasure tables

FR30: Epic 6 - Artifact generator

FR31: Epic 6 - Core compendium coverage

FR32: Epic 6 - Content provenance review

FR33: Epic 6 - Content build workflow

FR34: Epic 7 - Baseline automated verification

FR35: Epic 7 - Manual Foundry runtime validation

FR36: Epic 7 - 1.0 minimal-handholding gate

FR37: Epic 7 - User onboarding documentation and tutorials

## Epic List

### Epic 1: Foundry System Foundation And Package Contract

Users can install and open UESRPG Rebuilt as a proper Foundry VTT 14 system package with registered document types, sheets, localization, styles, packs, lifecycle hooks, and intentional public API boundaries.

**FRs covered:** FR1, FR2, FR3

**Implementation notes:** Establish the package, localization, lifecycle, UI token, style-copy, and public API foundations needed by later sheets, chat cards, workflows, tutorials, and compendium surfaces. Keep `game.uesrpg` narrow and intentional; do not overbuild interoperability before there is a concrete consumer.

### Epic 2: Playable Documents And Sheets

Players and GMs can view, edit, and use character, statblock, equipment, item, spell, ritual, enchantment, and alchemy-relevant documents through Foundry-native sheets that are legible, localized, tokenized, permission-aware, and safe for default/missing/filled states.

**FRs covered:** FR4, FR5, FR6, FR7

**Implementation notes:** Stories should be vertical by document family and include safe rendering, localization, tokenized layout, permissions, discoverability, narrow-window behavior, and relevant Foundry runtime validation evidence. Data model commitments may need later migration assessment as workflows and builders reveal additional persisted fields.

### Epic 3: Core D100 Tests And Transparent Chat Output

Users can resolve skill tests, characteristic tests, opposed tests, and supported test variants through shared UESRPG d100 rules services with visible Foundry-native roll/chat output, missing-data feedback, critical handling, DoS/DoF, modifiers, and manual adjudication notes where needed.

**FRs covered:** FR8, FR9, FR10, FR11

**Implementation notes:** All roll workflows must use shared dice/rules services and avoid divergent per-sheet math. Roll and chat stories must produce user-facing evidence for inputs, targets, modifiers, raw roll, outcome, critical state, DoS/DoF where applicable, missing-data warnings, and manual adjudication notes.

### Epic 4: Live Play Combat, Magic, And Mishap Workflows

Tables can run the core live-play loop for initiative, attacks, defenses, conservative combat state updates, spellcasting, ritual support, mishaps, and alchemy/consumable support with visible results and GM-correctable manual fallback where appropriate.

**FRs covered:** FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19

**Implementation notes:** Stories must stay vertical and small enough for implementation: initiative, attack, defense, combat state update, spellcasting, rituals/manual fallback, mishaps, and alchemy/consumables should be separate story slices with their own Foundry runtime validation evidence.

### Epic 5: Guided Creation And Advancement Builders

Users and Greybard can create and advance playable entities through guided workflows for characters, advancement, spells, enchanting, alchemy, equipment, and statblocks, producing valid editable Foundry documents that open on sheets and can be used in play or packaged when provenance allows.

**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27

**Implementation notes:** Builder stories must validate output by creating the document, opening it on its sheet, editing it, and using it in the relevant play workflow where applicable. Enchanting and alchemy remain minimal/deferred for 1.0 but must provide visible manual fallback rather than invalid structured automation.

### Epic 6: GM Tools, System Content, And Provenance

GMs can use XP reward support, treasure tables, and artifact generation, while Greybard can manage broad rights-cleared System Content through source-controlled pack automation and manifest-grade provenance review.

**FRs covered:** FR28, FR29, FR30, FR31, FR32, FR33

**Implementation notes:** Provenance and rights review must gate distributed System Content without blocking local/homebrew user content. Content volume must not outrun manifest-grade provenance, AI-content constraints, and pack workflow validation.

### Epic 7: Release Proof, Onboarding, And Minimal-Handholding Validation

The package can prove 1.0 readiness through collected per-epic validation evidence, final automated verification, manual Foundry VTT 14 release validation, balanced one-shot coverage, minimal-handholding install/use validation, quickstart/workflow docs, known limitations, and Foundry Tutorial API guidance.

**FRs covered:** FR34, FR35, FR36, FR37

**Implementation notes:** Epic 7 does not defer validation until the end. It consolidates and closes evidence produced by earlier epics, fills release-level gaps, and validates that another group or Greybard-simulated pass can complete the 1.0 flow with minimal handholding.

### Story Guardrails

All stories created from these epics must be vertical, validation-producing slices. Do not paste these checks as generic boilerplate under every story; translate only the relevant checks into specific, testable acceptance criteria.

Apply these checks where relevant:

- **Scope:** A story must be implementable by one developer pass. Split stories that span too many major surfaces, such as data model, sheet template, rules service, chat card, builder workflow, pack automation, and runtime validation.
- **User completion:** A story does not count by satisfying a requirement in name only. It must deliver the user-facing behavior needed for the 1.0 release gate.
- **Discoverability:** Common user actions must be reachable from the relevant Foundry surface, tutorial cue, or documentation without raw data editing or maintainer explanation.
- **Runtime evidence:** Foundry runtime behavior changes must include relevant validation evidence. Epic 7 consolidates release proof; it does not start validation.
- **Localization and UX:** User-facing text must use localization, and affected UI must preserve applicable token, accessibility, permission, narrow-window, and default/missing/filled/read-only state expectations.
- **Persisted data:** Actor/item/combat/content data changes must assess migration impact. Add compatibility work only when needed; otherwise record why not.
- **Manual fallback:** Manual fallback must be visible or discoverable at the point of use and preserve balanced one-shot playability.
- **Provenance/policy:** Distributed System Content must have appropriate provenance, rights, and AI-content gating; local/homebrew user content must remain editable and distinct.

## Epic 1: Foundry System Foundation And Package Contract

Users can install and open UESRPG Rebuilt as a proper Foundry VTT 14 system package with registered document types, sheets, localization, styles, packs, lifecycle hooks, and intentional public API boundaries.

### Story 1.1: Verify Foundry Package Metadata And Build Copy Contract

As a GM installing UESRPG Rebuilt,
I want the system package metadata and packaged assets to be aligned,
So that Foundry VTT 14 can install, load, and locate the system's scripts, styles, templates, language files, and packs reliably.

**Acceptance Criteria:**

**Given** the source package metadata and build configuration
**When** the system is built for distribution
**Then** `system.json` declares the expected Foundry VTT 14 compatibility, ES module entry, styles, languages, packs, actor/item document types, and package metadata needed for the current system scope
**And** it does not bump compatibility beyond the tested Foundry runtime target.

**Given** runtime assets such as templates, styles, language files, icons, and pack data are referenced by package metadata or code
**When** the build-copy configuration is inspected
**Then** those assets are included in the static-copy/build workflow
**And** generated `dist` output is treated as a build artifact rather than hand-edited source.

**Given** the system is built with the existing project workflow
**When** `npm run build` completes
**Then** the built package contains the declared script, style, language, template, and pack paths expected by Foundry
**And** any missing or stale package/build-copy references are corrected in source.

**Given** the story touches package metadata or runtime asset paths
**When** migration and compatibility impact is assessed
**Then** any compatibility concern for existing world data or installed package consumers is recorded
**And** no backward-compatibility code is added unless a concrete persisted-data or shipped-behavior need exists.

### Story 1.2: Register System Lifecycle, Documents, Data Models, Sheets, Settings, And Public API Boundary

As a module author or macro user relying on UESRPG Rebuilt,
I want the system's Foundry lifecycle registration and public API boundary to be intentional and stable,
So that the system loads predictably and exposes only documented integration points.

**Acceptance Criteria:**

**Given** Foundry VTT initializes the system
**When** the `init` lifecycle runs
**Then** intentional document classes, data models, sheet applications, settings, and `game.uesrpg` public API values are registered at the correct lifecycle phase
**And** internal implementation paths are not exposed as public API by default.

**Given** Foundry VTT enters setup
**When** setup-phase integrations are registered
**Then** trackable attributes or equivalent setup-phase system integrations are registered only where Foundry expects them
**And** world collections are not read or mutated before they are available.

**Given** Foundry VTT enters ready
**When** ready-phase work is performed
**Then** migrations or world-data operations run only during the ready phase
**And** async document updates or chat/message side effects are awaited unless intentionally fire-and-forget.

**Given** a value is exposed under `game.uesrpg`
**When** its purpose is reviewed
**Then** it is intentional, stable enough for module or macro consumers, and documented where meant for external use
**And** private implementation details remain reachable only through internal source imports.

**Given** lifecycle or registration code is changed
**When** `npm run typecheck`, `npm run lint`, and `npm run build` are run
**Then** the baseline checks pass
**And** Foundry runtime validation records that the system opens without registration errors.

### Story 1.3: Establish Localization And UI Token Foundations

As a player or GM using UESRPG Rebuilt sheets and workflows,
I want user-facing labels and foundational UI styling to be localized and tokenized,
So that later sheets, dialogs, chat cards, and tutorials are readable, consistent, and maintainable in Foundry.

**Acceptance Criteria:**

**Given** a user-facing label, heading, action, warning, or workflow message is introduced in the foundation surfaces
**When** the UI renders it
**Then** the text resolves through localization keys in the English language file
**And** hardcoded user-facing strings are not introduced in TypeScript or Handlebars templates.

**Given** foundational system styles are defined
**When** sheets, dialogs, or chat cards use system visual treatment
**Then** CSS remains scoped under `.uesrpg-rebuilt` or related system classes
**And** light/dark theme colors, semantic colors, spacing, radius, focus, and surface tokens follow the UX design token model.

**Given** semantic colors are used for gameplay or validation states
**When** users view the affected UI
**Then** the state is paired with text, labels, icons with accessible names, or explicit values
**And** color alone is not required to understand success, failure, warning, health, magicka, stamina, rarity, or missing-data states.

**Given** foundational styles or localization files are added or changed
**When** the package is built
**Then** language and style assets are copied to the built package through the existing build workflow
**And** missing localization keys or stale asset paths are treated as defects.

**Given** the foundational UI is validated in Foundry
**When** default light and dark theme contexts are checked
**Then** focus states, basic contrast, readable text, and scoped styling are confirmed for affected foundation surfaces
**And** the validation evidence records any limitations or follow-up work.

### Story 1.4: Validate Foundation In Foundry Runtime

As Greybard preparing the system for later feature work,
I want the foundation package to be validated in a real Foundry VTT 14 environment,
So that later sheet, workflow, builder, content, and onboarding work builds on a known-good runtime base.

**Acceptance Criteria:**

**Given** the foundation stories for package metadata, lifecycle registration, localization, and UI tokens are implemented
**When** the baseline verification commands are run
**Then** `npm run typecheck`, `npm run lint`, and `npm run build` pass
**And** any failures are fixed in source rather than bypassed by weakening compiler or lint configuration.

**Given** the built system package is available
**When** it is opened in a Foundry VTT 14 development world
**Then** the system loads without package metadata, script, style, language, template, registration, or lifecycle errors
**And** the result is recorded as runtime validation evidence.

**Given** the system is loaded in Foundry
**When** basic actor/item creation or opening is attempted for currently registered document types
**Then** default data and sheet registration do not produce runtime errors
**And** any unavailable or intentionally unimplemented surfaces are recorded as limitations rather than silently ignored.

**Given** package assets and localization are inspected in the built/runtime environment
**When** foundation paths and labels are checked
**Then** referenced language, style, template, and pack paths resolve as expected
**And** missing localization or asset-copy issues are recorded as defects.

**Given** validation evidence is recorded
**When** future epics begin
**Then** the evidence includes Foundry version, world/test data used, action performed, expected result, actual result, status, limitations, and follow-up story/issue if not passing.

## Epic 2: Playable Documents And Sheets

Players and GMs can view, edit, and use character, statblock, equipment, item, spell, ritual, enchantment, and alchemy-relevant documents through Foundry-native sheets that are legible, localized, tokenized, permission-aware, and safe for default/missing/filled states.

### Story 2.1: Build Character Sheet Shell, Identity, Permissions, And Empty States

As a player opening a UESRPG character,
I want a Foundry-native character sheet shell with identity fields, clear sections, permissions, and safe empty states,
So that character data has a reliable, readable place to live before detailed play sections are added.

**Acceptance Criteria:**

**Given** a character actor is opened
**When** the character sheet renders
**Then** it uses the system's Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior
**And** it provides a clear header, document identity area, section or tab structure, notes area, and GM/private area where applicable.

**Given** a character actor has default, missing, or partially filled identity data
**When** the sheet renders
**Then** safe fallback labels and values are shown instead of broken template output
**And** missing identity data is presented near the relevant field.

**Given** a user with edit permission changes supported identity or notes fields
**When** the sheet submits
**Then** actor data is persisted through awaited Foundry document updates using explicit schema-backed paths
**And** migration impact is assessed for any changed persisted data shape.

**Given** a user has limited or observer permission
**When** the character sheet renders
**Then** the sheet respects Foundry document permissions, remains legible, and presents edit-only controls as disabled, hidden, or read-only according to Foundry conventions.

**Given** character sheet shell labels, section headings, warnings, and empty states are user-facing
**When** the sheet renders
**Then** they resolve through localization keys
**And** styling uses scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** the character sheet shell is validated in Foundry VTT 14
**When** a character actor is opened, edited, resized, and viewed in default, partial, editable, and non-editable states
**Then** no shell rendering, permission, localization, or identity persistence errors occur
**And** validation evidence records the tested actor state, actions, result, limitations, and follow-up defects if any.

### Story 2.2: Add Character Characteristics, Resources, And Derived Summary Panels

As a player reviewing my UESRPG character during play,
I want characteristics, resources, and key derived summaries visible and editable where appropriate,
So that I can understand my character's current state without hunting through raw data or unrelated sections.

**Acceptance Criteria:**

**Given** a character actor is opened on the character sheet
**When** the characteristics section renders
**Then** the sheet displays the core UESRPG characteristic values using numeric typography and localized labels
**And** editable characteristic source fields persist changes through schema-backed actor data paths.

**Given** a character actor has resource data such as health, magicka, stamina, or equivalent tracked values
**When** the resource summary renders
**Then** current and maximum values are shown with text-paired semantic colors
**And** editable resource fields or linked source fields are reachable without raw data editing.

**Given** character data is default, missing, or partially filled
**When** characteristics, resources, or derived summaries render
**Then** safe fallback values and missing-data warnings appear near the affected section
**And** the sheet does not display broken template output or silently hide required play data.

**Given** derived summary values are displayed
**When** the sheet prepares context for the template
**Then** labels, fallback values, and display-ready derived fields are computed at the TypeScript-to-Handlebars boundary
**And** the template remains simple and does not duplicate rules calculations intended for later roll or combat workflows.

**Given** the character sheet is resized to a narrow sheet width
**When** the characteristics and resource panels collapse
**Then** values remain scan-friendly and editable fields remain reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** the characteristics and resources render
**Then** values remain legible
**And** edit controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** a character actor is opened with default, partial, filled, editable, and non-editable data states
**Then** characteristics, resources, localization, persistence, narrow-width layout, and missing-data behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.3: Add Character Skills And Common Play Lists

As a player using my character during a session,
I want skills and common play lists to be organized, scan-friendly, and editable where appropriate,
So that I can find the values needed for ordinary play without raw data editing.

**Acceptance Criteria:**

**Given** a character actor is opened on the character sheet
**When** the skills section renders
**Then** the sheet displays the character's skills with localized names, ranks or relevant values, governing characteristic where applicable, and clear missing-data states
**And** editable skill source fields persist through schema-backed actor data paths.

**Given** the character has many skills or play-relevant entries
**When** the user scans the list
**Then** values remain aligned and readable using the system's numeric typography role
**And** the layout supports normal Foundry scrolling without hiding section headings or required fields.

**Given** skill-related data is default, missing, or partially filled
**When** the skills section renders
**Then** missing or incomplete entries are surfaced near the affected row or section
**And** the sheet does not silently omit data needed for later skill-test workflows.

**Given** common play lists are present for character data such as traits, conditions, statuses, effects, or similar non-inventory/non-magic entries
**When** those lists render
**Then** they are grouped in predictable sheet sections with localized labels and safe empty states
**And** edit controls are reachable when the user has permission.

**Given** future roll automation is not yet part of this story
**When** the skills section presents roll-related values
**Then** it may expose obvious placeholders or disabled actions only if they are clearly labeled as unavailable or future workflow-dependent
**And** it must not implement separate skill-test math outside the shared d100 services planned for Epic 3.

**Given** the character sheet is viewed at narrow width or with dense data
**When** the skills and play lists render
**Then** rows remain readable, keyboard traversal follows reading order, and core values are reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** skills and common play lists render
**Then** values remain legible
**And** edit controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** a character actor is opened with default, partial, filled, editable, non-editable, and dense skill/list data states
**Then** skills, common play lists, localization, persistence, narrow-width layout, and missing-data behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.4: Add Character Inventory, Equipment, And Magic Summary Sections

As a player preparing my character for play,
I want inventory, equipped gear, and magic-relevant summaries visible on my character sheet,
So that I can understand what my character can carry, use, wear, wield, or cast without leaving the character context.

**Acceptance Criteria:**

**Given** a character actor has embedded or linked item data for weapons, armor, equipment, consumables, spells, or magic-relevant entries
**When** the character sheet renders
**Then** inventory, equipment, and magic summary sections display those entries in predictable localized groups
**And** empty states explain how to add or manage entries without requiring raw data editing.

**Given** weapons, armor, equipment, or consumables are listed on the character sheet
**When** the user scans the inventory/equipment sections
**Then** key mechanical values such as quantity, encumbrance, damage, armor rating, range, equipped state, or category are displayed where available
**And** missing mechanical values are surfaced near the affected entry rather than silently omitted.

**Given** spells or magic-relevant entries are listed on the character sheet
**When** the user scans the magic summary section
**Then** key values such as school, cost, difficulty, casting-relevant notes, ritual/manual status, or prepared/known state are displayed where available
**And** unsupported ritual, enchantment, or alchemy complexity is marked with visible manual-fallback language when relevant.

**Given** a user has edit permission
**When** they manage entries from the character sheet
**Then** common item management actions such as opening, editing, deleting, equipping/toggling where supported, or creating/adding placeholders are reachable through Foundry-native controls
**And** persisted changes use Foundry document APIs rather than raw data editing.

**Given** future attack, defense, spellcasting, alchemy, or builder automation is not yet part of this story
**When** entries show workflow-relevant actions or values
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement separate combat, magic, or builder logic outside the later planned epics.

**Given** the character sheet is viewed at narrow width or with dense inventory/magic data
**When** inventory, equipment, and magic sections render
**Then** lists remain scan-friendly, values remain aligned, and core actions remain reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** inventory, equipment, and magic sections render
**Then** entries remain legible and openable where Foundry permissions allow
**And** edit-only controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** a character actor is opened with empty, partial, filled, dense, editable, and non-editable inventory/equipment/magic states
**Then** localization, item display, item management, manual-fallback visibility, narrow-width layout, and permission behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.5: Validate Complete Character Sheet For Core Play Readiness

As Greybard preparing character support for later rules automation,
I want the complete character sheet validated across realistic data and permission states,
So that Epic 3 and Epic 4 workflows can safely rely on character sheet data being visible, editable, and understandable.

**Acceptance Criteria:**

**Given** Stories 2.1 through 2.4 are implemented
**When** the character sheet is opened in Foundry VTT 14
**Then** identity, notes, GM/private areas, characteristics, resources, derived summaries, skills, common play lists, inventory, equipment, and magic summaries render together without runtime errors
**And** the result is recorded as character sheet validation evidence.

**Given** a character actor has default, partial, filled, dense, and intentionally incomplete data states
**When** each state is opened and reviewed
**Then** the sheet shows safe fallback values, localized labels, missing-data warnings near affected sections, and no broken template output
**And** defects are recorded for any silent failure or hidden required play data.

**Given** a user with edit permission changes representative fields across character sheet sections
**When** the sheet submits those changes
**Then** persisted actor and embedded item data updates through Foundry document APIs
**And** migration impact is recorded for any changed persisted schema shape.

**Given** the character sheet is viewed as owner/editor, observer/limited, and non-owner where feasible
**When** each permission state is tested
**Then** edit-only controls, item actions, private fields, and read-only content respect Foundry document permission conventions
**And** readable non-editable views remain available where appropriate.

**Given** the sheet is resized and reviewed under light and dark Foundry themes
**When** dense character data is displayed
**Then** layout remains usable at normal and narrow widths without horizontal scrolling for core fields
**And** tokenized colors, visible focus states, keyboard traversal, and numeric alignment remain readable.

**Given** later skill, combat, magic, advancement, and builder workflows depend on character data
**When** the character sheet validation is completed
**Then** any gaps that would block Epic 3, Epic 4, or Epic 5 are identified as follow-up defects or story notes
**And** unavailable automation remains visibly absent, disabled, or labeled rather than misleading users.

### Story 2.6: Build Statblock Sheet Shell, Identity, Permissions, And Empty States

As a GM preparing a non-player entity,
I want a Foundry-native statblock sheet shell with identity fields, clear sections, permissions, and safe empty states,
So that NPC and creature data has a reliable, readable place to live before detailed statblock sections are added.

**Acceptance Criteria:**

**Given** a statblock, NPC, or creature actor is opened
**When** the statblock sheet renders
**Then** it uses the system's Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior
**And** it provides a clear header, document identity area, type/category fields, section or tab structure, notes area, and GM/private area where applicable.

**Given** a statblock has default, missing, or partially filled identity data
**When** the sheet renders
**Then** safe fallback labels and values are shown instead of broken template output
**And** missing identity or type/category data is presented near the relevant field.

**Given** a GM or permitted user changes supported identity, type/category, or notes fields
**When** the sheet submits
**Then** actor data is persisted through awaited Foundry document updates using explicit schema-backed paths
**And** migration impact is assessed for any changed persisted data shape.

**Given** a non-GM, limited, observer, or non-owner user opens a statblock where Foundry permissions allow it
**When** the sheet renders
**Then** the sheet respects Foundry document permissions, protects GM/private data, remains legible, and presents edit-only controls as disabled, hidden, or read-only according to Foundry conventions.

**Given** statblock sheet shell labels, section headings, warnings, and empty states are user-facing
**When** the sheet renders
**Then** they resolve through localization keys
**And** styling uses scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** the statblock sheet shell is validated in Foundry VTT 14
**When** a statblock actor is opened, edited, resized, and viewed in default, partial, editable, and non-editable states
**Then** no shell rendering, permission, localization, or identity persistence errors occur
**And** validation evidence records the tested actor state, actions, result, limitations, and follow-up defects if any.

### Story 2.7: Add Statblock Characteristics, Resources, Defenses, And Summary Panels

As a GM reviewing a non-player entity,
I want characteristics, resources, defenses, and key summary values visible and editable where appropriate,
So that I can understand the statblock's current game state without raw data editing.

**Acceptance Criteria:**

**Given** a statblock actor is opened on the statblock sheet
**When** the characteristics or equivalent trait section renders
**Then** the sheet displays the statblock's core values using numeric typography and localized labels
**And** editable source fields persist changes through schema-backed actor data paths.

**Given** a statblock has resource data such as health, magicka, stamina, or equivalent tracked values
**When** the resource summary renders
**Then** current and maximum values are shown with text-paired semantic colors
**And** editable resource fields or linked source fields are reachable without raw data editing.

**Given** a statblock has defense-relevant values
**When** the defenses or protection summary renders
**Then** key values are grouped and aligned for quick review
**And** missing defense-relevant data is surfaced near the affected field or section.

**Given** statblock data is default, missing, or partially filled
**When** characteristics, resources, defenses, or summary panels render
**Then** safe fallback values and missing-data warnings appear near affected sections
**And** the sheet does not display broken template output or silently hide required statblock data.

**Given** derived summary values are displayed
**When** the sheet prepares context for the template
**Then** labels, fallback values, and display-ready derived fields are computed at the TypeScript-to-Handlebars boundary
**And** the template remains simple and does not duplicate rules calculations intended for later roll, combat, or magic workflows.

**Given** the statblock sheet is resized to a narrow sheet width
**When** characteristics, resources, defenses, and summary panels collapse
**Then** values remain scan-friendly and editable fields remain reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** these sections render
**Then** values remain legible
**And** edit controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** a statblock actor is opened with default, partial, filled, editable, and non-editable data states
**Then** characteristics, resources, defenses, localization, persistence, narrow-width layout, and missing-data behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.8: Add Statblock Attacks And Abilities

As a GM using a statblock during play,
I want attacks and special abilities visible, organized, and editable where appropriate,
So that I can quickly understand what a non-player entity can do without raw data editing.

**Acceptance Criteria:**

**Given** a statblock actor has attack entries
**When** the attacks section renders
**Then** attacks are listed with localized labels and key mechanical values such as name, attack type, governing value where applicable, damage, range/reach, traits, or notes where available
**And** missing attack data is surfaced near the affected entry rather than silently omitted.

**Given** a statblock actor has special abilities, traits, powers, or similar action-relevant entries
**When** the abilities section renders
**Then** entries are grouped in a predictable localized section with readable descriptions or mechanical summaries
**And** dense entries remain scan-friendly without becoming ornate mini-sheets.

**Given** attack or ability data is default, missing, partial, filled, or dense
**When** the attacks and abilities sections render
**Then** safe empty states, fallback values, and missing-data warnings are shown near affected rows or sections
**And** the sheet does not display broken template output.

**Given** a GM or permitted user manages attacks or abilities from the statblock sheet
**When** they open, edit, create placeholder entries, delete, reorder, or otherwise manage supported entries
**Then** those actions use Foundry-native document controls and awaited document APIs
**And** persisted data remains structurally valid for later combat or rules workflows.

**Given** attack roll, defense, damage resolution, or ability automation is not yet part of this story
**When** attacks or abilities display workflow-relevant actions or values
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement separate combat math outside the later Epic 4 workflows.

**Given** the statblock sheet is viewed at normal and narrow widths
**When** attack and ability lists render
**Then** values remain aligned, rows remain readable, keyboard traversal follows reading order, and core controls remain reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** attacks and abilities render
**Then** entries remain legible
**And** edit-only controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** statblocks are opened with empty, partial, filled, dense, editable, and non-editable attack/ability states
**Then** attack and ability display, localization, persistence, missing-data behavior, responsive layout, and permission behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.9: Add Statblock Equipment And Treasure

As a GM preparing or reviewing a statblock,
I want equipment and treasure information visible, organized, and editable where appropriate,
So that NPC and creature possessions are easy to manage without raw data editing.

**Acceptance Criteria:**

**Given** a statblock actor has weapons, armor, equipment, consumables, currency, treasure notes, or loot-relevant entries
**When** the equipment and treasure sections render
**Then** entries are grouped in predictable localized sections
**And** empty states explain how to add or manage entries without requiring raw data editing.

**Given** equipment entries have mechanical values
**When** the statblock sheet displays them
**Then** key values such as quantity, encumbrance, equipped state, damage, armor rating, value, rarity, or category are shown where available
**And** missing mechanical values are surfaced near the affected entry rather than silently omitted.

**Given** treasure data is simple prose, structured entries, or absent
**When** the treasure section renders
**Then** the sheet provides a readable treasure area with safe fallbacks
**And** it does not require the later treasure table or artifact generator workflows from Epic 6.

**Given** a GM or permitted user manages equipment or treasure from the statblock sheet
**When** they open, edit, create placeholder entries, delete, toggle supported equipped states, or update treasure notes
**Then** those actions use Foundry-native document controls and awaited document APIs
**And** persisted data remains structurally valid for later item, treasure, or content workflows.

**Given** loot generation or artifact automation is not yet part of this story
**When** treasure-relevant areas display workflow actions
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement Epic 6 treasure or artifact generation logic.

**Given** the statblock sheet is viewed at normal and narrow widths
**When** equipment and treasure sections render
**Then** entries remain scan-friendly, values remain aligned, keyboard traversal follows reading order, and core controls remain reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** equipment and treasure sections render
**Then** entries and treasure notes remain legible where Foundry permissions allow
**And** edit-only controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** statblocks are opened with empty, partial, filled, dense, editable, and non-editable equipment/treasure states
**Then** equipment and treasure display, localization, persistence, missing-data behavior, responsive layout, and permission behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.10: Add Statblock Magic Summaries

As a GM preparing or reviewing a magical NPC or creature,
I want magic-relevant statblock entries summarized clearly,
So that spellcasting, ritual, enchantment, alchemy, or magical-trait information is visible without raw data editing.

**Acceptance Criteria:**

**Given** a statblock actor has spells, magical traits, ritual notes, enchantment notes, alchemy notes, or other magic-relevant entries
**When** the magic summary section renders
**Then** entries are grouped in predictable localized sections
**And** empty states explain how to add or manage magic-relevant data without raw data editing.

**Given** spell or magic entries have mechanical values
**When** the statblock sheet displays them
**Then** key values such as school, cost, difficulty, range, duration, preparation/known state, ritual/manual status, or notes are shown where available
**And** missing mechanical values are surfaced near the affected entry rather than silently omitted.

**Given** ritual, enchantment, alchemy, rare magic, or GM-adjudicated complexity is not fully automated
**When** those entries appear on the statblock sheet
**Then** visible manual-fallback language is shown where relevant
**And** the fallback does not imply automation that is not available.

**Given** a GM or permitted user manages magic-relevant entries from the statblock sheet
**When** they open, edit, create placeholder entries, delete, reorder, or update supported magic notes
**Then** those actions use Foundry-native document controls and awaited document APIs
**And** persisted data remains structurally valid for later spellcasting, ritual, mishap, alchemy, or builder workflows.

**Given** spellcasting, ritual resolution, mishap resolution, alchemy creation, or builder automation is not yet part of this story
**When** magic-relevant areas display workflow actions
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement Epic 4 or Epic 5 magic workflow logic.

**Given** the statblock sheet is viewed at normal and narrow widths
**When** magic summary sections render
**Then** entries remain scan-friendly, values remain aligned, keyboard traversal follows reading order, and core controls remain reachable without horizontal scrolling.

**Given** the user has non-editable permissions
**When** magic summary sections render
**Then** entries and notes remain legible where Foundry permissions allow
**And** edit-only controls are disabled, hidden, or read-only according to Foundry conventions.

**Given** this story is validated in Foundry VTT 14
**When** statblocks are opened with empty, partial, filled, dense, editable, and non-editable magic states
**Then** magic summary display, localization, manual-fallback visibility, persistence, missing-data behavior, responsive layout, and permission behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 2.11: Validate Complete Statblock Sheet For Play Readiness

As Greybard preparing statblock support for later combat, magic, content, and builder work,
I want the complete statblock sheet validated across realistic data and permission states,
So that later workflows can safely rely on statblock data being visible, editable, and understandable.

**Acceptance Criteria:**

**Given** Stories 2.6 through 2.10 are implemented
**When** the statblock sheet is opened in Foundry VTT 14
**Then** identity, type/category, notes, GM/private areas, characteristics, resources, defenses, summary panels, attacks, abilities, equipment, treasure, and magic summaries render together without runtime errors
**And** the result is recorded as statblock sheet validation evidence.

**Given** statblock actors have default, partial, filled, dense, and intentionally incomplete data states
**When** each state is opened and reviewed
**Then** the sheet shows safe fallback values, localized labels, missing-data warnings near affected sections, and no broken template output
**And** defects are recorded for any silent failure or hidden required statblock data.

**Given** a GM or permitted user changes representative fields across statblock sheet sections
**When** the sheet submits those changes
**Then** persisted actor and embedded item data updates through Foundry document APIs
**And** migration impact is recorded for any changed persisted schema shape.

**Given** the statblock sheet is viewed as GM/owner, observer/limited, and non-owner where feasible
**When** each permission state is tested
**Then** edit-only controls, item actions, private fields, and read-only content respect Foundry document permission conventions
**And** readable non-editable views remain available where appropriate.

**Given** the sheet is resized and reviewed under light and dark Foundry themes
**When** dense statblock data is displayed
**Then** layout remains usable at normal and narrow widths without horizontal scrolling for core fields
**And** tokenized colors, visible focus states, keyboard traversal, and numeric alignment remain readable.

**Given** later combat, magic, content, and statblock builder workflows depend on statblock data
**When** statblock sheet validation is completed
**Then** any gaps that would block Epic 3, Epic 4, Epic 5, or Epic 6 are identified as follow-up defects or story notes
**And** unavailable automation remains visibly absent, disabled, or labeled rather than misleading users.

### Story 2.12: Build Equipment And General Item Sheet Shells

As a player or GM creating UESRPG items,
I want Foundry-native item sheet shells for equipment and general item types,
So that item data has reliable, localized, editable surfaces before detailed mechanical sections are added.

**Acceptance Criteria:**

**Given** a weapon, armor, equipment, consumable, or general item document is opened
**When** its item sheet renders
**Then** it uses the system's Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior
**And** it provides a clear header, document identity area, type/category fields, mechanical section area, prose/description area, and GM/private or provenance-adjacent notes where applicable.

**Given** item data is default, missing, or partially filled
**When** the sheet renders
**Then** safe fallback labels and values are shown instead of broken template output
**And** missing identity or category data is presented near the relevant field.

**Given** a permitted user edits supported identity, category, description, or notes fields
**When** the sheet submits
**Then** item data is persisted through awaited Foundry document updates using explicit schema-backed paths
**And** migration impact is assessed for any changed persisted data shape.

**Given** the sheet is rendered by a user with limited or non-editable permissions where Foundry allows it
**When** the item sheet renders
**Then** the sheet respects Foundry document permissions, remains legible, and presents edit-only controls as disabled, hidden, or read-only according to Foundry conventions.

**Given** item sheet shell labels, section headings, warnings, and empty states are user-facing
**When** the sheet renders
**Then** they resolve through localization keys
**And** styling uses scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** this story is validated in Foundry VTT 14
**When** equipment and general item documents are opened, edited, resized, and viewed in default, partial, editable, and non-editable states
**Then** no shell rendering, permission, localization, or identity persistence errors occur
**And** validation evidence records item types tested, data states, actions, result, limitations, and follow-up defects if any.

### Story 2.13: Add Equipment And General Item Mechanical Fields

As a player or GM configuring UESRPG equipment,
I want equipment and general item sheets to expose their key mechanical fields clearly,
So that weapons, armor, consumables, and other gear can be understood and maintained without raw data editing.

**Acceptance Criteria:**

**Given** a weapon item is opened
**When** its mechanical fields render
**Then** key values such as weapon category, damage, range or reach, encumbrance, quantity, value, equipped/carry state, traits, and notes are displayed where available
**And** missing weapon data is surfaced near the affected field.

**Given** an armor item is opened
**When** its mechanical fields render
**Then** key values such as armor category, armor rating or protection values, encumbrance, quantity, value, equipped/carry state, traits, and notes are displayed where available
**And** missing armor data is surfaced near the affected field.

**Given** an equipment, consumable, or general item is opened
**When** its mechanical fields render
**Then** key values such as category, quantity, encumbrance, value, rarity where applicable, usage notes, effect notes, and carry/equipped state where applicable are displayed
**And** unsupported or not-applicable fields are absent or clearly labeled rather than presented as broken data.

**Given** a permitted user edits supported mechanical fields
**When** the sheet submits
**Then** item data persists through awaited Foundry document updates using explicit schema-backed paths
**And** persisted data remains structurally valid for later inventory, combat, treasure, builder, or compendium workflows.

**Given** future attack, defense, alchemy, treasure, or builder automation is not yet part of this story
**When** mechanical fields imply later workflow behavior
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement Epic 4, Epic 5, or Epic 6 workflow logic.

**Given** item sheet labels, headings, warnings, and empty states are user-facing
**When** mechanical fields render
**Then** they resolve through localization keys
**And** numeric values use the system numeric typography role with readable light/dark tokenized styling.

**Given** the item sheet is resized or viewed with dense mechanical data
**When** mechanical sections render
**Then** fields remain readable, keyboard traversal follows reading order, and core controls remain reachable without horizontal scrolling.

**Given** this story is validated in Foundry VTT 14
**When** weapon, armor, equipment, consumable, and general item documents are opened with default, partial, filled, editable, non-editable, and dense data states
**Then** mechanical fields, localization, persistence, missing-data behavior, responsive layout, and permission behavior work without runtime errors
**And** validation evidence records item types tested, limitations, and follow-up defects if any.

### Story 2.14: Validate Equipment And General Item Sheets For Play Readiness

As Greybard preparing equipment and item support for later workflows,
I want equipment and general item sheets validated across realistic item types and data states,
So that character sheets, statblocks, combat, treasure, builders, and compendia can safely rely on item data being visible, editable, and understandable.

**Acceptance Criteria:**

**Given** Stories 2.12 and 2.13 are implemented
**When** weapon, armor, equipment, consumable, and general item sheets are opened in Foundry VTT 14
**Then** identity, category, mechanical fields, descriptions, notes, and applicable private/provenance-adjacent areas render without runtime errors
**And** the result is recorded as item sheet validation evidence.

**Given** item documents have default, partial, filled, dense, and intentionally incomplete data states
**When** each state is opened and reviewed
**Then** the sheets show safe fallback values, localized labels, missing-data warnings near affected fields, and no broken template output
**And** defects are recorded for any silent failure or hidden required item data.

**Given** a permitted user changes representative fields across item sheet sections
**When** the sheet submits those changes
**Then** item data updates through Foundry document APIs
**And** migration impact is recorded for any changed persisted schema shape.

**Given** item sheets are viewed as owner/editor, observer/limited, and non-owner where feasible
**When** each permission state is tested
**Then** edit-only controls, private fields, and read-only content respect Foundry document permission conventions
**And** readable non-editable views remain available where appropriate.

**Given** item sheets are resized and reviewed under light and dark Foundry themes
**When** dense item data is displayed
**Then** layout remains usable at normal and narrow widths without horizontal scrolling for core fields
**And** tokenized colors, visible focus states, keyboard traversal, and numeric alignment remain readable.

**Given** later character, statblock, combat, treasure, builder, and compendium workflows depend on item data
**When** item sheet validation is completed
**Then** any gaps that would block Epic 2 follow-on sheets, Epic 4, Epic 5, or Epic 6 are identified as follow-up defects or story notes
**And** unavailable automation remains visibly absent, disabled, or labeled rather than misleading users.

### Story 2.15: Build Spell And Ritual Sheet Shells

As a player or GM creating UESRPG magic entries,
I want Foundry-native sheet shells for spells and rituals,
So that magic data has reliable, localized, editable surfaces before detailed casting and ritual fields are added.

**Acceptance Criteria:**

**Given** a spell or ritual document is opened
**When** its sheet renders
**Then** it uses the system's Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior
**And** it provides a clear header, document identity area, spell/ritual type or category fields, mechanical section area, prose/effect description area, ritual/manual notes area where applicable, and GM/private or provenance-adjacent notes where applicable.

**Given** spell or ritual data is default, missing, or partially filled
**When** the sheet renders
**Then** safe fallback labels and values are shown instead of broken template output
**And** missing identity, category, or ritual/manual status data is presented near the relevant field.

**Given** a permitted user edits supported identity, category, description, ritual/manual notes, or private notes fields
**When** the sheet submits
**Then** item data is persisted through awaited Foundry document updates using explicit schema-backed paths
**And** migration impact is assessed for any changed persisted data shape.

**Given** the sheet is rendered by a user with limited or non-editable permissions where Foundry allows it
**When** the spell or ritual sheet renders
**Then** the sheet respects Foundry document permissions, remains legible, and presents edit-only controls as disabled, hidden, or read-only according to Foundry conventions.

**Given** spell and ritual sheet shell labels, section headings, warnings, and empty states are user-facing
**When** the sheet renders
**Then** they resolve through localization keys
**And** styling uses scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** this story is validated in Foundry VTT 14
**When** spell and ritual documents are opened, edited, resized, and viewed in default, partial, editable, and non-editable states
**Then** no shell rendering, permission, localization, or identity persistence errors occur
**And** validation evidence records magic document types tested, data states, actions, result, limitations, and follow-up defects if any.

### Story 2.16: Add Spell And Ritual Mechanical Fields

As a player or GM configuring UESRPG magic entries,
I want spell and ritual sheets to expose their key mechanical and descriptive fields clearly,
So that magic can be understood and maintained without raw data editing.

**Acceptance Criteria:**

**Given** a spell document is opened
**When** its mechanical fields render
**Then** key values such as school, governing skill or characteristic where applicable, cost, difficulty, range, duration, target, traits, casting notes, and effect description are displayed where available
**And** missing spell data is surfaced near the affected field.

**Given** a ritual document is opened
**When** its ritual fields render
**Then** ritual-specific values such as ritual type/category, requirements, participants, duration, cost, difficulty, steps, risks, manual adjudication notes, and effect description are displayed where available
**And** missing ritual data is surfaced near the affected field.

**Given** ritual complexity or edge-case magic is not fully automated for 1.0
**When** ritual fields render
**Then** visible manual-fallback language explains that GM adjudication is expected where relevant
**And** the sheet does not imply unavailable automation.

**Given** a permitted user edits supported spell or ritual mechanical fields
**When** the sheet submits
**Then** item data persists through awaited Foundry document updates using explicit schema-backed paths
**And** persisted data remains structurally valid for later spellcasting, ritual, mishap, builder, or compendium workflows.

**Given** spellcasting, ritual resolution, mishap resolution, or spell builder automation is not yet part of this story
**When** mechanical fields imply later workflow behavior
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement Epic 4 or Epic 5 magic workflow logic.

**Given** spell and ritual labels, headings, warnings, and empty states are user-facing
**When** mechanical fields render
**Then** they resolve through localization keys
**And** numeric values use the system numeric typography role with readable light/dark tokenized styling.

**Given** the spell or ritual sheet is resized or viewed with dense mechanical data
**When** mechanical sections render
**Then** fields remain readable, mechanical fields are visibly separated from prose fields, keyboard traversal follows reading order, and core controls remain reachable without horizontal scrolling.

**Given** this story is validated in Foundry VTT 14
**When** spell and ritual documents are opened with default, partial, filled, editable, non-editable, and dense data states
**Then** mechanical fields, localization, manual-fallback visibility, persistence, missing-data behavior, responsive layout, and permission behavior work without runtime errors
**And** validation evidence records magic document types tested, limitations, and follow-up defects if any.

### Story 2.17: Validate Spell And Ritual Sheets For Play Readiness

As Greybard preparing spell and ritual support for later magic workflows,
I want spell and ritual sheets validated across realistic magic data states,
So that spellcasting, ritual workflows, mishaps, builders, and compendia can safely rely on magic data being visible, editable, and understandable.

**Acceptance Criteria:**

**Given** Stories 2.15 and 2.16 are implemented
**When** spell and ritual sheets are opened in Foundry VTT 14
**Then** identity, category, mechanical fields, descriptions, ritual/manual notes, and applicable private/provenance-adjacent areas render without runtime errors
**And** the result is recorded as spell and ritual sheet validation evidence.

**Given** spell and ritual documents have default, partial, filled, dense, and intentionally incomplete data states
**When** each state is opened and reviewed
**Then** the sheets show safe fallback values, localized labels, missing-data warnings near affected fields, visible manual-fallback language where applicable, and no broken template output
**And** defects are recorded for any silent failure, hidden required magic data, or misleading unavailable automation.

**Given** a permitted user changes representative fields across spell and ritual sheet sections
**When** the sheet submits those changes
**Then** item data updates through Foundry document APIs
**And** migration impact is recorded for any changed persisted schema shape.

**Given** spell and ritual sheets are viewed as owner/editor, observer/limited, and non-owner where feasible
**When** each permission state is tested
**Then** edit-only controls, private fields, manual notes, and read-only content respect Foundry document permission conventions
**And** readable non-editable views remain available where appropriate.

**Given** spell and ritual sheets are resized and reviewed under light and dark Foundry themes
**When** dense magic data is displayed
**Then** layout remains usable at normal and narrow widths without horizontal scrolling for core fields
**And** mechanical and prose fields remain visibly separated with readable tokenized colors, visible focus states, keyboard traversal, and numeric alignment.

**Given** later spellcasting, ritual, mishap, alchemy, builder, and compendium workflows depend on spell and ritual data
**When** spell and ritual sheet validation is completed
**Then** any gaps that would block Epic 4, Epic 5, or Epic 6 are identified as follow-up defects or story notes
**And** unavailable automation remains visibly absent, disabled, or labeled rather than misleading users.

### Story 2.18: Build Enchantment And Alchemy Sheet Shells

As a player or GM creating enchantment or alchemy-relevant entries,
I want Foundry-native sheet shells for enchantment and alchemy data,
So that these 1.0 manual/deferred areas still have reliable, localized, editable surfaces.

**Acceptance Criteria:**

**Given** an enchantment, enchanted item, alchemy output, ingredient, potion, poison, or other alchemy-relevant document is opened
**When** its sheet renders
**Then** it uses the system's Foundry V2 sheet pattern, system CSS class, expected dimensions, resizable behavior, and submit-on-change behavior
**And** it provides a clear header, document identity area, type/category fields, mechanical section area, prose/effect description area, manual notes area, and GM/private or provenance-adjacent notes where applicable.

**Given** enchantment or alchemy data is default, missing, or partially filled
**When** the sheet renders
**Then** safe fallback labels and values are shown instead of broken template output
**And** missing identity, category, or manual/deferred status data is presented near the relevant field.

**Given** a permitted user edits supported identity, category, description, manual notes, or private notes fields
**When** the sheet submits
**Then** item data is persisted through awaited Foundry document updates using explicit schema-backed paths
**And** migration impact is assessed for any changed persisted data shape.

**Given** enchantment and alchemy are minimal/deferred 1.0 builders or manual-support areas
**When** the sheet renders
**Then** visible manual-fallback language communicates what is editable and what still requires GM adjudication
**And** the sheet does not imply unavailable automated creation, pricing, balancing, mishap, or effect-resolution behavior.

**Given** the sheet is rendered by a user with limited or non-editable permissions where Foundry allows it
**When** the enchantment or alchemy sheet renders
**Then** the sheet respects Foundry document permissions, remains legible, and presents edit-only controls as disabled, hidden, or read-only according to Foundry conventions.

**Given** enchantment and alchemy sheet shell labels, section headings, warnings, manual-fallback language, and empty states are user-facing
**When** the sheet renders
**Then** they resolve through localization keys
**And** styling uses scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** this story is validated in Foundry VTT 14
**When** enchantment and alchemy-relevant documents are opened, edited, resized, and viewed in default, partial, editable, and non-editable states
**Then** no shell rendering, permission, localization, manual-fallback, or identity persistence errors occur
**And** validation evidence records document types tested, data states, actions, result, limitations, and follow-up defects if any.

### Story 2.19: Add Enchantment And Alchemy Mechanical Fields

As a player or GM configuring enchantment or alchemy-relevant entries,
I want their key structured fields and manual notes exposed clearly,
So that enchantments, enchanted items, ingredients, potions, poisons, and alchemy outputs can be understood and maintained without raw data editing.

**Acceptance Criteria:**

**Given** an enchantment or enchanted item document is opened
**When** its mechanical fields render
**Then** key values such as enchantment type/category, effect summary, magnitude or potency where applicable, duration, charges or usage notes, item relationship where applicable, cost/value where applicable, risks, and manual adjudication notes are displayed where available
**And** missing enchantment data is surfaced near the affected field.

**Given** an ingredient, potion, poison, or alchemy output document is opened
**When** its alchemy-relevant fields render
**Then** key values such as alchemy category, effect summary, potency where applicable, dose/quantity, usage notes, creation notes, mishap or risk notes where applicable, value where applicable, and manual adjudication notes are displayed where available
**And** missing alchemy data is surfaced near the affected field.

**Given** enchantment or alchemy complexity is minimal/deferred for 1.0
**When** these sheets render
**Then** visible manual-fallback language explains which values are structured and which outcomes still require GM adjudication
**And** the sheet does not imply unavailable automated creation, pricing, balancing, effect resolution, or mishap resolution.

**Given** a permitted user edits supported enchantment or alchemy mechanical fields
**When** the sheet submits
**Then** item data persists through awaited Foundry document updates using explicit schema-backed paths
**And** persisted data remains structurally valid for later builder, alchemy, mishap, compendium, or content workflows.

**Given** enchanting builders, alchemy builders, alchemy resolution, mishap resolution, or artifact generation are not yet part of this story
**When** mechanical fields imply later workflow behavior
**Then** unavailable actions are absent or clearly disabled/labeled
**And** this story does not implement Epic 4, Epic 5, or Epic 6 workflow logic.

**Given** enchantment and alchemy labels, headings, warnings, manual-fallback language, and empty states are user-facing
**When** mechanical fields render
**Then** they resolve through localization keys
**And** numeric values use the system numeric typography role with readable light/dark tokenized styling.

**Given** the enchantment or alchemy sheet is resized or viewed with dense mechanical data
**When** mechanical sections render
**Then** fields remain readable, mechanical fields are visibly separated from prose fields, keyboard traversal follows reading order, and core controls remain reachable without horizontal scrolling.

**Given** this story is validated in Foundry VTT 14
**When** enchantment and alchemy-relevant documents are opened with default, partial, filled, editable, non-editable, and dense data states
**Then** mechanical fields, localization, manual-fallback visibility, persistence, missing-data behavior, responsive layout, and permission behavior work without runtime errors
**And** validation evidence records document types tested, limitations, and follow-up defects if any.

### Story 2.20: Validate Enchantment And Alchemy Sheets For Manual Play Readiness

As Greybard preparing enchantment and alchemy support for 1.0,
I want enchantment and alchemy-relevant sheets validated across realistic manual/deferred data states,
So that these areas are usable, honest about automation limits, and ready for later builders or workflows.

**Acceptance Criteria:**

**Given** Stories 2.18 and 2.19 are implemented
**When** enchantment and alchemy-relevant sheets are opened in Foundry VTT 14
**Then** identity, category, mechanical fields, descriptions, manual notes, and applicable private/provenance-adjacent areas render without runtime errors
**And** the result is recorded as enchantment/alchemy sheet validation evidence.

**Given** enchantment and alchemy-relevant documents have default, partial, filled, dense, and intentionally incomplete data states
**When** each state is opened and reviewed
**Then** the sheets show safe fallback values, localized labels, missing-data warnings near affected fields, visible manual-fallback language where applicable, and no broken template output
**And** defects are recorded for any silent failure, hidden required data, or misleading unavailable automation.

**Given** a permitted user changes representative fields across enchantment or alchemy sheet sections
**When** the sheet submits those changes
**Then** item data updates through Foundry document APIs
**And** migration impact is recorded for any changed persisted schema shape.

**Given** enchantment and alchemy sheets are viewed as owner/editor, observer/limited, and non-owner where feasible
**When** each permission state is tested
**Then** edit-only controls, private fields, manual notes, and read-only content respect Foundry document permission conventions
**And** readable non-editable views remain available where appropriate.

**Given** enchantment and alchemy sheets are resized and reviewed under light and dark Foundry themes
**When** dense manual/deferred data is displayed
**Then** layout remains usable at normal and narrow widths without horizontal scrolling for core fields
**And** mechanical and prose fields remain visibly separated with readable tokenized colors, visible focus states, keyboard traversal, and numeric alignment.

**Given** later enchanting, alchemy, mishap, builder, artifact, and compendium workflows depend on enchantment or alchemy-relevant data
**When** enchantment/alchemy sheet validation is completed
**Then** any gaps that would block Epic 4, Epic 5, or Epic 6 are identified as follow-up defects or story notes
**And** unavailable automation remains visibly absent, disabled, or labeled rather than misleading users.

## Epic 3: Core D100 Tests And Transparent Chat Output

Users can resolve skill tests, characteristic tests, opposed tests, and supported test variants through shared UESRPG d100 rules services with visible Foundry-native roll/chat output, missing-data feedback, critical handling, DoS/DoF, modifiers, and manual adjudication notes where needed.

### Story 3.1: Implement Shared D100 Test Resolution Service

As a developer implementing UESRPG rules automation,
I want a shared d100 test resolution service,
So that skill, characteristic, opposed, combat, and magic workflows use one consistent rules path instead of duplicating roll math.

**Acceptance Criteria:**

**Given** a workflow needs to resolve a UESRPG d100 test
**When** it calls the shared d100 service with a target value and optional modifiers
**Then** the service resolves `d100 <= target number` success/failure consistently
**And** target values over `100` are supported without clamping unless an explicit rule requires it.

**Given** a skill test uses rank information
**When** the service receives rank and trained/untrained inputs
**Then** skill bonus is calculated as `10 * rank`
**And** the untrained penalty of `-20` is applied only when the test is untrained according to the provided input.

**Given** a test is limited
**When** the service resolves the outcome
**Then** limited-test behavior is applied according to the provided inputs
**And** the returned result clearly identifies the limited-test state and final outcome.

**Given** a roll is resolved
**When** the raw d100 value and final target are known
**Then** the service computes success/failure, critical state, and DoS/DoF where applicable
**And** player Lucky/Unlucky critical handling and NPC/creature default critical ranges of `1-3` and `98-100` are supported unless statblock data overrides them.

**Given** required input data is missing or invalid
**When** the service is asked to resolve the test
**Then** it returns structured warnings or failure information suitable for UI/chat display
**And** it does not silently produce misleading results.

**Given** Foundry roll output is required
**When** the service generates or consumes roll data
**Then** it preserves enough structured input and result detail for later chat cards to display actor/source, roll type, inputs used, target value, modifiers, raw roll, outcome, critical state, DoS/DoF, warnings, and manual adjudication notes
**And** the service remains reusable by later skill, characteristic, opposed, combat, and magic workflows.

**Given** this service is implemented
**When** `npm run typecheck`, `npm run lint`, and `npm run build` are run
**Then** the baseline checks pass
**And** broad `any` usage is not introduced to bypass Foundry typing gaps.

### Story 3.2: Add Skill Test Dialog And Sheet Entry Points

As a player or GM resolving a skill test,
I want to start a skill test from relevant sheets and confirm its inputs in a Foundry-native dialog,
So that the roll uses character or statblock data transparently before producing a result.

**Acceptance Criteria:**

**Given** a character or statblock has skill data available
**When** a user initiates a skill test from a relevant sheet row, button, or action
**Then** a Foundry-native test dialog opens with actor/source, selected skill, governing value where applicable, rank/training state, difficulty or free modifier field, limited-test option where applicable, and visible warnings for missing inputs
**And** the user can confirm or cancel before rolling.

**Given** the dialog is opened with complete skill data
**When** the user confirms the test
**Then** the workflow calls the shared d100 service from Story 3.1
**And** it does not duplicate skill-test math in the sheet, template, or dialog code.

**Given** skill data is missing, partial, untrained, or malformed
**When** the dialog opens
**Then** the missing-data state is surfaced near the affected input
**And** the user is prevented from rolling misleading results or is given an explicit manual-adjudication path when appropriate.

**Given** modifiers or limited-test state are changed in the dialog
**When** the user reviews the target calculation
**Then** the dialog shows enough inputs to explain the target before rolling
**And** changed dialog values are passed to the shared d100 service as structured inputs.

**Given** the user has insufficient permission or the actor/source is unavailable
**When** a skill test action is attempted
**Then** the workflow blocks or degrades according to Foundry permission conventions
**And** the user receives localized, non-silent feedback.

**Given** skill test UI text is user-facing
**When** entry points and dialogs render
**Then** labels, actions, warnings, and empty states resolve through localization keys
**And** styling follows scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** this story is validated in Foundry VTT 14
**When** skill tests are initiated from character and statblock sheets with complete, partial, untrained, limited-test, editable, and non-editable data states
**Then** dialogs open, inputs are reviewable, cancellation works, confirmed tests call the shared d100 service, and permission/missing-data behavior works without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 3.3: Add Characteristic Test Dialog And Sheet Entry Points

As a player or GM resolving a characteristic test,
I want to start a characteristic test from relevant sheets and confirm its inputs in a Foundry-native dialog,
So that the roll uses actor data transparently before producing a result.

**Acceptance Criteria:**

**Given** a character or statblock has characteristic data available
**When** a user initiates a characteristic test from a relevant characteristic row, summary panel, button, or action
**Then** a Foundry-native test dialog opens with actor/source, selected characteristic, base value, difficulty or free modifier field, limited-test option where applicable, and visible warnings for missing inputs
**And** the user can confirm or cancel before rolling.

**Given** the dialog is opened with complete characteristic data
**When** the user confirms the test
**Then** the workflow calls the shared d100 service from Story 3.1
**And** it does not duplicate characteristic-test math in the sheet, template, or dialog code.

**Given** characteristic data is missing, partial, or malformed
**When** the dialog opens
**Then** the missing-data state is surfaced near the affected input
**And** the user is prevented from rolling misleading results or is given an explicit manual-adjudication path when appropriate.

**Given** modifiers or limited-test state are changed in the dialog
**When** the user reviews the target calculation
**Then** the dialog shows enough inputs to explain the target before rolling
**And** changed dialog values are passed to the shared d100 service as structured inputs.

**Given** the user has insufficient permission or the actor/source is unavailable
**When** a characteristic test action is attempted
**Then** the workflow blocks or degrades according to Foundry permission conventions
**And** the user receives localized, non-silent feedback.

**Given** characteristic test UI text is user-facing
**When** entry points and dialogs render
**Then** labels, actions, warnings, and empty states resolve through localization keys
**And** styling follows scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** this story is validated in Foundry VTT 14
**When** characteristic tests are initiated from character and statblock sheets with complete, partial, limited-test, editable, and non-editable data states
**Then** dialogs open, inputs are reviewable, cancellation works, confirmed tests call the shared d100 service, and permission/missing-data behavior works without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 3.4: Add Opposed Test Setup And Resolution Flow

As a GM or player resolving a contested action,
I want to set up and resolve opposed tests between eligible actors,
So that both sides' rolls and the resulting winner or tie state are transparent at the table.

**Acceptance Criteria:**

**Given** two eligible actors or entities are available
**When** a user initiates an opposed test workflow
**Then** a Foundry-native setup flow lets the user select or confirm each participant, each participant's test type, relevant skill or characteristic, modifiers, limited-test state where applicable, and manual notes
**And** the user can confirm or cancel before rolling.

**Given** the opposed test setup has complete participant data
**When** the user confirms the opposed test
**Then** each participant's roll is resolved through the shared d100 service from Story 3.1
**And** opposed-test-specific comparison logic determines winner, loser, tie, or manual-adjudication-needed state without duplicating base d100 math.

**Given** one or both participants have missing, partial, inaccessible, or malformed data
**When** the opposed test setup renders or is confirmed
**Then** missing-data warnings appear near the affected participant/input
**And** the workflow blocks misleading results or provides an explicit manual-adjudication path.

**Given** opposed test modifiers or selected test types are changed
**When** the user reviews the setup
**Then** each side's visible target calculation updates or is clearly summarized before rolling
**And** changed values are passed to the shared d100 service as structured inputs.

**Given** actor permissions, token selection, or combat context limits what participants can be accessed
**When** an opposed test is initiated
**Then** the workflow respects Foundry permissions and available actor/token context
**And** unavailable participants produce localized, non-silent feedback.

**Given** opposed test output is produced
**When** the workflow completes
**Then** it preserves structured detail for chat display including participants, roll types, inputs, targets, modifiers, raw rolls, outcomes, critical states, DoS/DoF where applicable, comparison result, warnings, and manual notes
**And** the output clearly associates both sides of the opposed test.

**Given** opposed test UI text is user-facing
**When** setup and result surfaces render
**Then** labels, actions, warnings, empty states, and manual-adjudication text resolve through localization keys
**And** styling follows scoped `.uesrpg-rebuilt` token classes with readable light/dark behavior and visible focus states.

**Given** this story is validated in Foundry VTT 14
**When** opposed tests are initiated with two complete actors, one missing-data actor, mixed skill/characteristic tests, modifiers, limited tests, cancellation, editable/non-editable permissions, and unavailable participants
**Then** setup, cancellation, resolution, comparison, permissions, and missing-data behavior work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 3.5: Build Transparent Roll Chat Cards

As a player or GM reviewing a resolved test,
I want Foundry-native chat cards that explain the roll outcome clearly,
So that everyone at the table can trust the result without recalculating it manually.

**Acceptance Criteria:**

**Given** a skill test, characteristic test, or opposed test is resolved
**When** the workflow posts to chat
**Then** the chat output uses a Foundry-native chat message/card with system-scoped styling
**And** it is concise rather than an ornate mini-sheet.

**Given** a single-actor test result is displayed
**When** the chat card renders
**Then** it shows actor/source, roll type, selected skill or characteristic where applicable, inputs used, base value, modifiers, final target, raw d100 roll, outcome, critical state, DoS/DoF where applicable, limited-test state where applicable, warnings, and manual adjudication notes where applicable.

**Given** an opposed test result is displayed
**When** the chat card renders
**Then** it clearly associates both participants with their roll details
**And** it shows comparison result, winner/loser/tie/manual-adjudication-needed state, and any warnings or notes for either side.

**Given** roll result data contains missing-data warnings, unavailable automation markers, or manual notes
**When** the chat card renders
**Then** those messages appear in a visible, localized area near the affected result
**And** the card does not imply a more certain result than the input data supports.

**Given** chat card text is user-facing
**When** the card renders
**Then** labels, outcomes, critical states, warnings, and manual-adjudication text resolve through localization keys
**And** numeric values use the system numeric typography role with readable light/dark tokenized styling.

**Given** chat output is viewed by users with different permissions
**When** roll cards render in chat
**Then** sensitive/private information is not exposed beyond Foundry permission expectations
**And** visible result information remains understandable to intended viewers.

**Given** this story is validated in Foundry VTT 14
**When** skill, characteristic, and opposed tests produce success, failure, critical success, critical failure, DoS/DoF, limited-test, missing-data, and manual-note results
**Then** chat cards render without runtime errors and contain the required transparent roll details
**And** validation evidence records tested result types, limitations, and follow-up defects if any.

### Story 3.6: Add Missing-Data, Modifier, And Manual-Adjudication Feedback

As a GM or player resolving tests with imperfect data,
I want missing inputs, modifiers, and manual-adjudication needs surfaced before and after rolling,
So that the table can correct data or make an informed ruling instead of trusting a misleading result.

**Acceptance Criteria:**

**Given** a skill, characteristic, or opposed test is initiated with missing or incomplete source data
**When** the dialog or setup flow renders
**Then** missing-data warnings appear near the affected actor, skill, characteristic, modifier, or participant field
**And** the user can identify what needs to be fixed without inspecting raw data.

**Given** missing or invalid data would make a roll misleading
**When** the user attempts to confirm the test
**Then** the workflow blocks the roll or requires an explicit manual-adjudication path
**And** the chosen path is preserved in the structured result and chat output.

**Given** user-entered modifiers are applied
**When** the dialog, setup flow, service result, or chat card presents the calculation
**Then** each modifier source or free modifier value is visible in the target calculation
**And** the final target can be understood from the displayed inputs.

**Given** a GM or player adds manual adjudication notes
**When** the roll is resolved or a manual path is selected
**Then** those notes are included in the structured result and visible chat output
**And** the result does not imply automation beyond the data that was actually used.

**Given** a user cancels or corrects a test after seeing warnings
**When** they return to the relevant sheet or dialog
**Then** entered data is not needlessly lost
**And** the affected sheet/workflow route remains discoverable.

**Given** feedback text is user-facing
**When** warnings, modifier labels, blocked states, and manual-adjudication prompts render
**Then** they resolve through localization keys
**And** visual treatment uses text-paired semantic colors with visible focus states and readable light/dark tokenized styling.

**Given** this story is validated in Foundry VTT 14
**When** skill, characteristic, and opposed tests are attempted with missing skill rank, missing characteristic, malformed modifier, unavailable participant, blocked roll, manual-adjudication path, and corrected data states
**Then** warnings, blocking behavior, modifier display, manual notes, cancellation/correction flow, and chat preservation work without runtime errors
**And** validation evidence records limitations and follow-up defects if any.

### Story 3.7: Validate Core D100 Tests In Foundry Runtime

As Greybard preparing the core resolution layer for combat, magic, and later workflows,
I want skill, characteristic, opposed, and chat-output behavior validated in Foundry,
So that later automation builds on a trustworthy, transparent d100 test foundation.

**Acceptance Criteria:**

**Given** Stories 3.1 through 3.6 are implemented
**When** `npm run typecheck`, `npm run lint`, and `npm run build` are run
**Then** the baseline checks pass
**And** any failures are fixed in source rather than bypassed by weakening compiler, lint, or type-safety expectations.

**Given** a Foundry VTT 14 development world contains representative character and statblock actors
**When** skill tests, characteristic tests, and opposed tests are initiated from relevant sheets or workflows
**Then** dialogs/setup flows open, cancellation works, confirmed rolls resolve through the shared d100 service, and no runtime errors occur
**And** validation evidence records the actor types, data states, actions, expected result, actual result, and limitations.

**Given** representative test cases cover success, failure, target values over `100`, trained and untrained skills, limited tests, player Lucky/Unlucky criticals, NPC/creature default critical ranges, DoS/DoF, modifiers, missing data, malformed data, unavailable participant, and manual-adjudication paths
**When** those cases are resolved
**Then** service results, dialogs, chat cards, warnings, and manual notes remain internally consistent
**And** discrepancies are recorded as defects or follow-up story notes.

**Given** roll chat cards are produced for skill, characteristic, and opposed tests
**When** they are reviewed in Foundry chat
**Then** they show the required transparent roll details, localized labels, text-paired semantic states, readable numeric values, and no misleading unavailable automation
**And** sensitive/private information is not exposed beyond Foundry permission expectations.

**Given** test workflows are used under light and dark Foundry themes and normal/narrow UI contexts where relevant
**When** dialogs and chat cards are reviewed
**Then** focus states, keyboard traversal, contrast/readability, and scoped styling remain acceptable
**And** any UX/accessibility limitations are recorded.

**Given** Epic 4 combat and magic workflows will reuse the core d100 foundation
**When** Epic 3 validation is completed
**Then** any service, data, chat, permission, or UI gaps that would block later workflows are identified as follow-up defects or story notes
**And** the validation evidence is sufficient for later stories to reference.

## Epic 4: Live Play Combat, Magic, And Mishap Workflows

Tables can run the core live-play loop for initiative, attacks, defenses, conservative combat state updates, spellcasting, ritual support, mishaps, and alchemy/consumable support with visible results and GM-correctable manual fallback where appropriate.

### Story 4.1: Integrate UESRPG Initiative With Foundry Combat Tracker

As a GM running an encounter,
I want UESRPG initiative to work through Foundry's combat tracker,
So that combatants can be ordered and managed during live play without leaving Foundry's normal combat workflow.

**Acceptance Criteria:**

**Given** a combat encounter contains character and statblock combatants
**When** initiative is rolled or calculated for selected combatants
**Then** the system uses the appropriate UESRPG initiative inputs from actor data
**And** combatant initiative values are written to Foundry combatants through the expected Foundry combat workflow.

**Given** initiative is initiated from a supported actor, token, or combat tracker route
**When** the user confirms the action
**Then** the workflow produces visible Foundry-native roll or chat output showing the actor, initiative inputs used, modifiers if any, raw roll or calculated value, and final initiative
**And** the output is localized and understandable without inspecting actor data.

**Given** required initiative data is missing or incomplete
**When** initiative is attempted
**Then** the workflow surfaces the missing actor fields near the attempted action or in the confirmation/output flow
**And** it blocks misleading automation or provides an explicit manual initiative entry path.

**Given** a GM needs to correct initiative
**When** the combat tracker or workflow permits manual adjustment through Foundry-native controls
**Then** the correction remains possible without raw data editing
**And** the system does not overwrite manual corrections unless the user explicitly rerolls or recalculates initiative.

**Given** initiative output uses system UI treatment
**When** it renders in dialogs or chat cards
**Then** labels resolve through localization keys, numeric values are scan-friendly, semantic warnings are paired with text, and light/dark styling remains readable.

**Given** this story is validated in Foundry VTT 14
**When** initiative is tested with character combatants, statblock combatants, mixed combatants, missing data, manual entry, reroll/recalculate, and corrected tracker values
**Then** combat ordering, output, missing-data handling, and manual correction work without runtime errors
**And** validation evidence records tested actor types, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.2: Add Attack Workflow From Actor And Weapon Data

As a player or GM resolving a combat action,
I want to initiate attacks from actor and weapon data,
So that attack results are fast, transparent, and usable during live combat.

**Acceptance Criteria:**

**Given** a character or statblock has usable attack and weapon data
**When** the user initiates an attack from a supported sheet, token, item, or combat workflow route
**Then** the workflow identifies the attacker, selected attack or weapon, governing skill/characteristic data, weapon/item data, and available modifiers
**And** the user can confirm the attack without raw data editing.

**Given** an attack is confirmed
**When** the attack roll resolves
**Then** it uses the shared d100 resolution service where applicable
**And** the result includes target value, modifiers, raw roll, success/failure, critical state, and DoS/DoF when applicable.

**Given** attack output is produced
**When** it appears in chat or equivalent Foundry-native output
**Then** it shows the attacker, attack or weapon name, relevant input data, target calculation, raw roll, outcome, critical state, DoS/DoF, and any manual adjudication note
**And** the output is clear enough for the defender and GM to continue the combat sequence.

**Given** attack data includes weapon, quality, effect, or situational fields that are incomplete or ambiguous
**When** the attack workflow reaches confirmation or output
**Then** the workflow surfaces missing or ambiguous fields without silently applying questionable automation
**And** it allows explicit GM/manual adjudication where the rules or data are not safe to automate.

**Given** attack workflow UI or chat output renders
**When** users review it in light and dark Foundry themes
**Then** user-facing labels resolve through localization keys, numeric values remain scan-friendly, semantic outcomes are paired with text, and focus/keyboard behavior follows Foundry expectations.

**Given** this story is validated in Foundry VTT 14
**When** attacks are tested from character and statblock sources with filled data, missing weapon data, missing governing test data, modifiers, critical success/failure, normal success/failure, and manual adjudication
**Then** the workflow resolves or blocks appropriately without runtime errors
**And** validation evidence records tested sources, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.3: Add Linked Defense Workflow For Attack Results

As a GM or defending player,
I want defense actions to be linked or clearly associated with the triggering attack,
So that the table can resolve combat sequence and outcomes without losing context.

**Acceptance Criteria:**

**Given** an attack result has been produced by the attack workflow
**When** a defender or GM initiates a defense from that result
**Then** the defense workflow preserves the triggering attack context, attacker, defender, attack result, and relevant attack metadata
**And** the defense output is linked to or clearly associated with the original attack in Foundry-native chat or workflow UI.

**Given** a defender has usable defense data
**When** the defense action is confirmed
**Then** the workflow identifies the defender, selected defense type or source, governing skill/characteristic data, shield/armor or other relevant defense inputs where applicable, and modifiers
**And** it resolves through the shared d100 service where applicable.

**Given** defense resolution completes
**When** the result is displayed
**Then** the output shows defender, defense source/type, attack reference, target calculation, modifiers, raw roll, success/failure, critical state, DoS/DoF, and any manual adjudication note
**And** the table can understand whether the attack was defended, unresolved, or requires GM decision.

**Given** attack-defense comparison is ambiguous, tied, or depends on data not safely automated
**When** the defense result is produced
**Then** the workflow does not force a false final outcome
**And** it presents a visible GM adjudication or manual outcome path.

**Given** required defense data is missing or incomplete
**When** defense is attempted
**Then** missing or ambiguous fields are surfaced near the attempted action or confirmation flow
**And** the user can correct data or continue through an explicit manual path without raw data editing.

**Given** linked defense UI or chat output renders
**When** users review it in light and dark Foundry themes
**Then** user-facing labels resolve through localization keys, attack/defense association remains visually and textually clear, semantic outcomes are text-paired, and focus/keyboard behavior follows Foundry expectations.

**Given** this story is validated in Foundry VTT 14
**When** defenses are tested from character and statblock defenders against attack results with success, failure, criticals, ties/ambiguity, missing defense data, shield/armor-relevant data, modifiers, manual adjudication, and cancelled defense
**Then** linked context, defense resolution, output, correction, and manual paths work without runtime errors
**And** validation evidence records tested attacker/defender types, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.4: Support Conservative Combat State Updates

As a GM resolving combat outcomes,
I want the system to suggest and apply only safe combat state updates,
So that damage, wounds, fatigue, conditions, or equivalent state changes can be handled quickly without hiding risky automation.

**Acceptance Criteria:**

**Given** an attack and defense sequence produces enough data for a safe combat state update
**When** the GM reviews the proposed update
**Then** the workflow shows the affected actor, source result, proposed fields, current values, new values, and reason for the change
**And** no persisted actor or combatant state is changed before user confirmation.

**Given** the GM confirms a proposed update
**When** the update is applied
**Then** actor or combatant state is mutated through awaited Foundry document update APIs using explicit path-based updates
**And** the resulting chat or workflow output records what changed.

**Given** a proposed update would involve ambiguous rules, missing armor/shield/quality/effect data, unusual damage or injury handling, or GM judgment
**When** the workflow reaches state update resolution
**Then** the system does not silently apply the update
**And** it presents a visible manual update/adjudication path with notes that can be reflected in output.

**Given** an applied update needs correction
**When** the GM uses Foundry-native sheet or combat tracker controls
**Then** the state remains editable and recoverable without raw JSON editing
**And** the system does not prevent normal GM correction.

**Given** state update output renders in the workflow or chat
**When** users review it
**Then** changed values, skipped values, manual notes, and warnings are localized, text-paired, and clear enough for the table to trust what changed and what did not.

**Given** this story introduces or changes persisted combat-relevant actor data paths
**When** implementation is planned and validated
**Then** migration impact is assessed and recorded
**And** compatibility work is added only if existing world data or shipped behavior requires it.

**Given** this story is validated in Foundry VTT 14
**When** state updates are tested for safe update, blocked ambiguous update, missing armor/shield/effect data, manual note, cancellation, confirmed update, and post-update correction
**Then** updates are conservative, visible, reversible through normal controls, and free of runtime errors
**And** validation evidence records tested actors, fields, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.5: Add Combat Missing-Data And Manual-Override Feedback

As a GM or player resolving combat under imperfect data,
I want combat workflows to clearly show missing data and manual override paths,
So that combat can continue without trusting unsafe automation or editing raw data mid-session.

**Acceptance Criteria:**

**Given** initiative, attack, defense, or combat state update workflows are opened with missing or incomplete combat data
**When** the workflow renders or reaches confirmation
**Then** missing fields are shown near the affected actor, weapon, armor, shield, combatant, modifier, condition, or state update input
**And** the user can tell what needs correction without inspecting raw document data.

**Given** combat data is ambiguous or outside safe automation
**When** the workflow would otherwise calculate, roll, compare, or update state
**Then** the system blocks misleading automation or requires an explicit manual override/adjudication choice
**And** the chosen manual path is preserved in the workflow result or chat output.

**Given** a GM enters a manual override, adjustment, or adjudication note
**When** the combat workflow output is produced
**Then** the manual input is visible to the table where appropriate
**And** the output distinguishes automated results from GM-entered or manually adjudicated results.

**Given** a user cancels or corrects combat data after seeing feedback
**When** they return to the affected workflow, sheet, or tracker route
**Then** entered data is not needlessly lost
**And** the correction path remains discoverable without raw JSON editing.

**Given** warning, blocked, and manual override UI renders
**When** users review it in light and dark Foundry themes
**Then** user-facing text resolves through localization keys, semantic colors are paired with text, focus states remain visible, and disabled/read-only states remain understandable.

**Given** this story is validated in Foundry VTT 14
**When** initiative, attack, defense, and state update workflows are tested with missing actor data, missing weapon data, missing armor/shield data, unavailable combatant/target, malformed modifiers, ambiguous state update, manual override, cancellation, and corrected data states
**Then** feedback, blocking, override, correction, and output preservation work without runtime errors
**And** validation evidence records tested workflows, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.6: Add Spellcasting Workflow From Actor And Spell Data

As a magic-using player or GM,
I want to cast spells using actor and spell data,
So that spellcasting can be resolved in Foundry with visible costs, inputs, rolls, outcomes, and recoverable missing-data handling.

**Acceptance Criteria:**

**Given** a character or statblock has usable magic capability and a spell entity
**When** the user initiates spellcasting from a supported actor sheet, spell list, spell sheet, item route, or workflow action
**Then** the workflow identifies the caster, spell, school or relevant casting basis, magicka cost, spell attributes, difficulty/modifiers, target value where applicable, and missing-data warnings
**And** the user can confirm or cancel without raw data editing.

**Given** spellcasting is confirmed and requires a roll
**When** the roll resolves
**Then** it uses the shared d100 service where applicable
**And** the result includes target value, modifiers, raw roll, success/failure, critical state, DoS/DoF where applicable, and spell-specific notes needed for table use.

**Given** spellcasting affects actor state such as magicka or equivalent resource expenditure
**When** the workflow can safely propose the update
**Then** the proposed current value, new value, and reason are shown before mutation
**And** persisted actor state changes are applied only after confirmation through awaited Foundry document updates.

**Given** spell or actor data is missing, incomplete, ambiguous, or outside 1.0 automation depth
**When** the workflow reaches confirmation or output
**Then** the system surfaces the affected fields and blocks misleading automation or requires a visible manual adjudication path
**And** manual notes are preserved in the result and chat output.

**Given** spellcasting output is produced
**When** it appears in Foundry-native chat or workflow UI
**Then** it shows caster, spell, spell inputs, cost/resource handling, target calculation, modifiers, raw roll, outcome, critical state, DoS/DoF where applicable, warnings, and manual notes
**And** it remains clear enough for the GM and player to continue play.

**Given** spellcasting UI or chat output renders
**When** users review it in light and dark Foundry themes
**Then** labels resolve through localization keys, numeric values are scan-friendly, semantic outcomes/warnings are paired with text, and focus/keyboard behavior follows Foundry expectations.

**Given** this story is validated in Foundry VTT 14
**When** spellcasting is tested from character and statblock casters with filled data, missing caster data, missing spell data, modifiers, success/failure, criticals, safe resource update, blocked ambiguous update, manual adjudication, and cancellation
**Then** the workflow resolves, blocks, updates, or records manual handling appropriately without runtime errors
**And** validation evidence records tested caster types, spell data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.7: Add Manual Ritual Spellcasting Support

As a player or GM resolving rituals,
I want rituals to be usable as readable, editable, and referenceable Foundry entities with explicit manual resolution support,
So that ritual spellcasting remains playable in 1.0 without pretending complex ritual automation is complete.

**Acceptance Criteria:**

**Given** a ritual entity exists in the system
**When** a user opens it from a sheet, item directory, actor spell/magic list, or compendium import
**Then** the ritual is readable, editable when permissions allow, and clearly identifiable as a ritual
**And** it exposes the ritual name, description, notes, and any structured fields already supported by the magic entity model.

**Given** a user initiates ritual resolution from a ritual entity or actor-linked ritual route
**When** the ritual workflow opens
**Then** it shows the ritual, caster or participant context where available, relevant notes/description, and an explicit manual resolution/adjudication area
**And** it does not require raw data editing to use the ritual during play.

**Given** ritual resolution is intentionally manual/simple for 1.0
**When** the user confirms a ritual outcome
**Then** the output clearly states that the result was manually resolved or GM-adjudicated
**And** any notes entered during the workflow are preserved in Foundry-native chat or workflow output.

**Given** ritual data or actor context is missing or incomplete
**When** ritual resolution is initiated
**Then** the workflow surfaces the missing context without blocking manual play unnecessarily
**And** it distinguishes unavailable automation from user-entered ritual notes or GM adjudication.

**Given** ritual UI or output renders
**When** users review it in light and dark Foundry themes
**Then** labels resolve through localization keys, manual-fallback state is text-visible, semantic warnings are text-paired, and read-only/editable permission states remain understandable.

**Given** this story is validated in Foundry VTT 14
**When** rituals are tested from item directory, actor-linked route, compendium-imported entity, missing actor context, read-only permission, editable permission, manual note entry, cancellation, and confirmed manual outcome
**Then** ritual reading, editing, reference, manual resolution, and output preservation work without runtime errors
**And** validation evidence records tested routes, permission states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.8: Add Magical And Alchemical Mishap Workflow

As a GM or magic/alchemy user,
I want mishap triggers and results to be visible during spellcasting and alchemy workflows,
So that mishaps can be resolved consistently while respecting 1.0 automation and content/provenance limits.

**Acceptance Criteria:**

**Given** a spellcasting or alchemy/consumable workflow can produce a magical or alchemical mishap
**When** the workflow resolves the triggering action
**Then** the system identifies whether a mishap check or result is needed from available actor, spell, alchemy, item, or roll data
**And** the trigger state is visible in the workflow or chat output.

**Given** mishap resolution can be safely automated from available structured data or reviewed roll table content
**When** the user confirms mishap resolution
**Then** the system produces Foundry-native roll/chat output showing mishap source, trigger, roll/table input where applicable, result reference or result text where rights allow, and any applied notes
**And** the output is clear enough for GM adjudication.

**Given** mishap table text, roll table entries, or result details are unavailable, rights-limited, unreviewed, or outside 1.0 automation depth
**When** mishap resolution is needed
**Then** the workflow presents a visible manual mishap adjudication path instead of shipping or exposing unapproved content
**And** manual notes are preserved in output.

**Given** mishap resolution would imply actor state changes, item changes, damage, resource changes, or conditions
**When** those changes are not safely automatable
**Then** the workflow does not silently mutate state
**And** it routes to GM-confirmed manual state handling or a later safe update workflow.

**Given** mishap UI or output renders
**When** users review it in light and dark Foundry themes
**Then** labels resolve through localization keys, trigger/result/manual states are text-visible, semantic warnings are text-paired, and focus/keyboard behavior follows Foundry expectations.

**Given** this story is validated in Foundry VTT 14
**When** magical and alchemical mishaps are tested with automatic trigger, no trigger, reviewed table/result availability, unavailable or rights-limited table data, manual adjudication, missing actor/item/spell/alchemy data, cancellation, and confirmed output
**Then** mishap trigger visibility, automated/manual resolution boundaries, output, and no-silent-state-mutation behavior work without runtime errors
**And** validation evidence records tested workflows, content/provenance state, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.9: Add Alchemy And Consumable Use Workflow

As a player or GM using potions, poisons, or other consumables,
I want alchemy and consumable use to be represented through clear Foundry workflows,
So that common consumable effects can be used in play while complex alchemy remains manually adjudicable for 1.0.

**Acceptance Criteria:**

**Given** a character or statblock has an alchemy item, potion, poison, or consumable item
**When** the user initiates use from an actor inventory, item sheet, or supported workflow route
**Then** the workflow identifies the user, item, item category/type, available structured use data, quantity or equipped/held state where applicable, and missing-data warnings
**And** the user can confirm, cancel, or route to manual adjudication without raw data editing.

**Given** a consumable has structured effects or usage notes that can be safely presented
**When** use is confirmed
**Then** the output shows the item, user, declared use, structured effect summary or notes, any roll/result data where applicable, quantity/state update proposal where applicable, and manual adjudication notes
**And** it does not imply deeper alchemy automation than the system actually supports.

**Given** consumable use would change quantity, actor state, effects, conditions, or other persisted data
**When** the workflow can safely propose that change
**Then** current value, new value, and reason are shown before mutation
**And** changes apply only after confirmation through awaited Foundry document update APIs.

**Given** alchemy or consumable data is incomplete, ambiguous, highly custom, rights-limited, or outside 1.0 automation depth
**When** the user attempts to use it
**Then** the workflow surfaces the limitation and provides a visible manual adjudication path
**And** user-entered notes are preserved in chat or workflow output.

**Given** alchemical mishap handling is relevant
**When** the use workflow detects or requires mishap handling
**Then** it routes to the mishap workflow from Story 4.8 or clearly records that mishap handling is manual
**And** it avoids duplicating separate mishap logic.

**Given** alchemy/consumable UI or output renders
**When** users review it in light and dark Foundry themes
**Then** labels resolve through localization keys, structured/manual states are text-visible, semantic warnings are text-paired, numeric values are scan-friendly, and focus/keyboard behavior follows Foundry expectations.

**Given** this story is validated in Foundry VTT 14
**When** potion, poison, food/drink, arcane consumable, missing item data, quantity update, blocked unsafe update, manual adjudication, mishap routing, cancellation, and read-only permission cases are tested
**Then** use flow, output, update confirmation, manual boundaries, mishap routing, and permissions work without runtime errors
**And** validation evidence records tested item types, actor types, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 4.10: Validate Live Play Combat, Magic, And Mishap Workflows In Foundry Runtime

As Greybard preparing the system for the balanced one-shot release gate,
I want Epic 4 combat, magic, mishap, and alchemy workflows validated together in Foundry,
So that the live-play loop is proven usable before builder, content, and release-validation work builds on it.

**Acceptance Criteria:**

**Given** Stories 4.1 through 4.9 are implemented
**When** `npm run typecheck`, `npm run lint`, and `npm run build` are run
**Then** the baseline checks pass
**And** any failures are fixed in source rather than bypassed by weakening compiler, lint, or build expectations.

**Given** a Foundry VTT 14 development world contains representative character, statblock, weapon, armor, shield, spell, ritual, alchemy, and consumable data
**When** a live-play validation pass runs initiative, attack, linked defense, conservative state update, spellcasting, ritual resolution, mishap handling, and consumable use
**Then** each workflow opens from the intended Foundry route, resolves or blocks appropriately, outputs clear chat/workflow evidence, and produces no runtime errors
**And** validation evidence records world/data used, workflow route, expected result, actual result, limitations, and follow-up defects.

**Given** the balanced one-shot minimum requires initiative, attack/defense, combat state update, spellcasting, ritual spellcasting, magical or alchemical mishap, and alchemy or consumable use
**When** Epic 4 validation is reviewed
**Then** each of those live-play requirements has passing evidence or an explicit recorded blocker
**And** manual fallback remains visible and playable where accepted for 1.0.

**Given** workflows involve persisted actor, item, combatant, or combat state changes
**When** validation exercises confirmed update, cancellation, blocked update, and manual correction paths
**Then** state changes occur only after confirmation, use awaited Foundry document APIs, remain correctable through normal Foundry controls, and do not require raw JSON editing
**And** migration impact is recorded for any changed persisted data path.

**Given** workflows produce chat cards, dialogs, or workflow UI
**When** they are reviewed under light and dark Foundry themes, read-only/editable permission states, missing/default/filled data, and narrow-enough application windows where relevant
**Then** labels are localized, semantic states are text-paired, focus and keyboard behavior are acceptable, and output remains scan-friendly for live table use.

**Given** mishap or content-sensitive workflows depend on packaged tables, result text, or source content
**When** validation encounters unavailable, unreviewed, rights-limited, or provenance-blocked content
**Then** the system does not expose unapproved distributed content
**And** the manual adjudication path preserves playability and records the limitation.

**Given** Epic 5 builders and Epic 6 content workflows will create or package data consumed by Epic 4
**When** Epic 4 validation is complete
**Then** any data shape, builder requirement, content/provenance requirement, or onboarding gap discovered during live-play validation is recorded as a follow-up for the relevant later epic
**And** the evidence is sufficient for Epic 7 release proof to reference.

## Epic 5: Guided Creation And Advancement Builders

Users and Greybard can create and advance playable entities through guided workflows for characters, advancement, spells, enchanting, alchemy, equipment, and statblocks, producing valid editable Foundry documents that open on sheets and can be used in play or packaged when provenance allows.

### Story 5.1: Establish Shared Builder Stepper, Validation, And Completion Pattern

As a player, GM, or Greybard using guided builders,
I want builders to share a consistent stepper, validation, and completion pattern,
So that later character, advancement, spell, equipment, statblock, enchanting, and alchemy builders feel predictable and produce valid editable documents.

**Acceptance Criteria:**

**Given** a builder workflow is opened
**When** the shared builder pattern renders
**Then** it provides ordered steps, current/completed/incomplete/blocked states, navigation controls, cancellation, and permission-aware disabled/read-only behavior
**And** it follows Foundry V2 application conventions rather than introducing a separate app architecture.

**Given** a step has required or invalid fields
**When** the user attempts to continue or create output
**Then** validation keeps the user on the affected step, identifies missing or invalid fields near the controls, preserves entered data, and blocks invalid document creation
**And** errors are visually and programmatically associated with affected fields where feasible.

**Given** a builder reaches completion with valid data
**When** the user confirms creation or update
**Then** the pattern supports creating or updating the intended Foundry document through awaited Foundry document APIs
**And** the resulting document opens on its sheet where appropriate and remains editable through normal sheets.

**Given** a builder includes deferred or highly custom cases
**When** the workflow cannot safely produce fully structured automation
**Then** the shared pattern supports visible manual fallback fields or GM notes
**And** output distinguishes structured data from manual/adjudication notes.

**Given** builder-created output may later become System Content
**When** the shared completion pattern prepares output metadata
**Then** it leaves room for provenance-related data or packaging review links without treating local/homebrew builder output as release-approved packaged content
**And** it does not add unreviewed distributed content.

**Given** builder UI renders
**When** users review it in light and dark Foundry themes and narrow-enough application widths
**Then** labels resolve through localization keys, focus/keyboard traversal follows reading order, semantic states are text-paired, and the layout remains usable without horizontal scrolling for core fields.

**Given** this story is validated in Foundry VTT 14
**When** a representative builder shell is tested with default data, missing required fields, invalid fields, preserved entered data, blocked creation, cancellation, manual fallback notes, successful document creation/opening, read-only permission, and editable permission
**Then** shared builder behavior works without runtime errors
**And** validation evidence records tested states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.2: Build Character Creation Core Identity And Characteristics Steps

As a player or GM creating a playable character,
I want the character creation builder to capture core identity and characteristics first,
So that later creation steps have valid character context to build on.

**Acceptance Criteria:**

**Given** the character creation builder is opened
**When** the first creation steps render
**Then** the workflow captures character identity fields needed for a valid character actor, including name and supported core identity fields
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** the characteristics step is reached
**When** the user enters or adjusts core characteristic values
**Then** the builder presents all required UESRPG core characteristics with localized labels, numeric input treatment, safe defaults, and validation constraints
**And** invalid or missing characteristic values block progression with feedback near the affected fields.

**Given** identity or characteristic choices influence later builder steps or derived values
**When** the user changes those earlier values
**Then** the builder preserves valid downstream entries where safe, flags affected downstream values where recalculation or review is needed, and avoids silently discarding entered data.

**Given** the builder is cancelled or closed before final creation
**When** the user exits the workflow
**Then** no invalid partial character actor is created
**And** any temporary state is handled without persisting incomplete document data as a playable character.

**Given** user-facing builder UI renders
**When** users review identity and characteristic steps in light/dark themes and narrow-enough application widths
**Then** labels resolve through localization keys, numeric fields are scan-friendly, focus order is readable, semantic validation states are paired with text, and primary actions remain reachable.

**Given** this story is validated in Foundry VTT 14
**When** the identity and characteristics steps are tested with default values, filled values, missing name, invalid characteristic value, changed earlier inputs, cancellation, and permission states
**Then** step rendering, validation, preserved-data behavior, and no-partial-actor behavior work without runtime errors
**And** validation evidence records tested states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.3: Add Character Creation Skills, Resources, And Advancement Inputs

As a player or GM creating a playable character,
I want the builder to capture skills, derived resources, and starting advancement/XP-relevant inputs,
So that the resulting character has the mechanical data needed for core tests and later advancement.

**Acceptance Criteria:**

**Given** the character creation builder has valid identity and characteristic context
**When** the skills step renders
**Then** it presents required UESRPG skills with governing or selectable characteristic context where applicable, rank/bonus input behavior, trained/untrained handling, and localized labels
**And** invalid or missing required skill data is surfaced near affected fields.

**Given** skill choices influence core test readiness
**When** the user enters skill ranks or related choices
**Then** the builder prepares data compatible with the skill test workflow from Epic 3
**And** it does not require raw data editing before a created character can attempt relevant skill tests.

**Given** the resources/state step renders
**When** derived resources or starting state values are calculated, entered, or reviewed
**Then** the builder shows the source inputs, editable or reviewable values, and validation constraints
**And** it flags values that must be reviewed after earlier characteristic or identity changes.

**Given** advancement or XP-relevant starting inputs are part of character creation
**When** the advancement input step renders
**Then** it captures purchased advancement, starting XP, or equivalent tracked values supported by the character data model
**And** the resulting data remains compatible with the character advancement builder in Story 5.5.

**Given** the user navigates backward, changes earlier values, or cancels
**When** affected skills, resources, or advancement inputs depend on changed data
**Then** safe entries are preserved, affected entries are flagged for review, invalid progression is blocked, and no partial character actor is created.

**Given** these builder steps render
**When** users review them in light/dark themes and narrow-enough application widths
**Then** dense skill/resource controls remain readable, numeric values are scan-friendly, validation states are text-paired, labels are localized, and keyboard traversal follows reading order.

**Given** this story is validated in Foundry VTT 14
**When** skills, resources, and advancement inputs are tested with default data, filled data, invalid skill rank, untrained skill behavior, changed earlier characteristic values, invalid resource values, advancement/XP entries, cancellation, and permission states
**Then** rendering, validation, preserved-data behavior, and downstream data compatibility work without runtime errors
**And** validation evidence records tested states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.4: Add Character Creation Equipment, Magic, And Final Actor Creation

As a player or GM finishing character creation,
I want to add starting equipment and magic choices, review the character, and create a valid actor,
So that the completed character opens on its sheet and can immediately participate in core play workflows.

**Acceptance Criteria:**

**Given** the character creation builder has valid identity, characteristics, skills, resources, and advancement inputs
**When** the equipment step renders
**Then** the user can add or record supported starting equipment, weapons, armor, shields, and inventory notes using structured item references or manual entries where appropriate
**And** missing or invalid equipment data is surfaced without requiring raw data editing.

**Given** the magic step renders
**When** the user adds spells, magic capability, ritual references, or magic notes supported by the character data model
**Then** the builder prepares data compatible with spellcasting and ritual workflows from Epic 4 where applicable
**And** unsupported or manually adjudicated magic details are captured as visible notes rather than unsafe automation.

**Given** the review step renders
**When** the user reviews the prepared character
**Then** the builder shows key identity, characteristics, skills, resources, advancement/XP, equipment, and magic summary values
**And** validation blocks final creation until required incomplete or invalid fields are resolved.

**Given** the user confirms final creation
**When** the character actor is created
**Then** the builder creates a valid Foundry character actor through awaited Foundry document APIs, opens it on the character sheet, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary play.

**Given** the created character is used after creation
**When** the user opens the sheet and initiates representative skill, characteristic, equipment, spellcasting, and combat-related workflows where data exists
**Then** the character data is usable or produces clear missing-data/manual-feedback states consistent with earlier epics
**And** follow-up gaps are recorded rather than hidden.

**Given** the character may later be included in compendium content
**When** the builder completes local/homebrew creation
**Then** it does not mark the character as release-approved System Content
**And** any packaging/provenance readiness metadata or notes remain distinct from actual provenance approval.

**Given** this story is validated in Foundry VTT 14
**When** final character creation is tested with filled equipment, missing equipment data, magic-capable character, non-magic character, manual magic notes, invalid review state, successful actor creation/opening, sheet edit after creation, and representative workflow use
**Then** final creation, output validity, sheet opening, editability, and play-workflow compatibility work without runtime errors
**And** validation evidence records tested data, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.5: Add Character Advancement Builder

As a player or GM advancing a character,
I want a guided advancement workflow that records or applies advancement decisions,
So that character growth is tracked through understandable Foundry controls instead of raw data edits.

**Acceptance Criteria:**

**Given** a character actor exists
**When** a user with appropriate permission opens the advancement builder from the character sheet or supported workflow route
**Then** the builder loads current advancement/XP-relevant character data, purchased advancements, skills, characteristics, resources, and notes needed for advancement decisions
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** the user enters advancement decisions
**When** they choose supported advancement types such as skill changes, characteristic changes, resource/state changes, XP spend/recording, or notes
**Then** the workflow shows current values, proposed new values, XP or advancement impact where supported, and any missing or invalid inputs
**And** it blocks invalid progression with feedback near affected controls.

**Given** an advancement decision is ambiguous, table-specific, or outside safe automation
**When** the user reaches review or confirmation
**Then** the workflow provides a visible manual advancement note/adjudication path
**And** it distinguishes structured changes from manually recorded advancement notes.

**Given** the user confirms advancement
**When** the builder applies changes
**Then** actor data is updated through awaited Foundry document APIs using explicit path-based updates
**And** the updated character remains editable and usable through normal character sheet controls.

**Given** advancement affects data used by skill, characteristic, combat, or magic workflows
**When** the updated character is used after advancement
**Then** relevant workflows use the updated values or show clear missing-data/manual-feedback states
**And** stale derived values or recalculation needs are surfaced rather than silently ignored.

**Given** advancement UI renders
**When** users review it in light/dark themes, read-only/editable permission states, and narrow-enough application widths
**Then** labels resolve through localization keys, numeric values are scan-friendly, semantic validation states are text-paired, focus order is readable, and primary actions remain reachable.

**Given** this story changes persisted character data paths
**When** implementation is planned and validated
**Then** migration impact is assessed and recorded
**And** compatibility work is added only if existing world data or shipped behavior requires it.

**Given** this story is validated in Foundry VTT 14
**When** advancement is tested with filled character data, missing XP/advancement data, valid structured advancement, invalid advancement, manual note/adjudication, cancellation, confirmed update, sheet edit after update, and representative post-advancement roll/workflow use
**Then** advancement recording/application, validation, persistence, editability, and downstream compatibility work without runtime errors
**And** validation evidence records tested character states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.6: Add Spell Creation Builder

As a GM, player, or Greybard creating spells,
I want a guided spell creation builder,
So that spell entities are structurally valid, editable, and usable in spellcasting workflows.

**Acceptance Criteria:**

**Given** the spell creation builder is opened
**When** the ordered steps render
**Then** the workflow captures spell name, description, school, spell attributes, spell level, magicka cost, spell strength, spell description, and mechanically relevant fields supported for 1.0
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** a spell field is required or constrained
**When** the user enters missing or invalid spell data
**Then** validation identifies the affected fields near the controls, preserves entered data, and blocks document creation until required issues are resolved
**And** unsupported custom mechanics can be captured as visible notes rather than invalid structured automation.

**Given** the user reaches review
**When** they inspect the spell summary
**Then** the builder shows key spell identity, school, attributes, cost, strength, mechanical fields, and manual notes
**And** the summary distinguishes structured data from descriptive or adjudication notes.

**Given** the user confirms creation
**When** the spell entity is created
**Then** the builder creates a valid Foundry item or magic entity through awaited Foundry document APIs, opens it on its sheet, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary use.

**Given** the created spell is used after creation
**When** the user opens the spell sheet or initiates spellcasting from actor-linked spell data where applicable
**Then** the spell data is usable in Epic 4 spellcasting workflows or produces clear missing-data/manual-feedback states
**And** follow-up gaps are recorded rather than hidden.

**Given** the spell may later be included in packaged System Content
**When** the builder creates local/homebrew spell output
**Then** it does not mark the spell as release-approved content
**And** provenance or packaging readiness fields remain distinct from actual provenance approval.

**Given** spell builder UI renders
**When** users review it in light/dark themes, read-only/editable permission states, and narrow-enough application widths
**Then** labels resolve through localization keys, focus order follows reading order, semantic validation states are text-paired, and mechanical/descriptive fields remain visually separated.

**Given** this story is validated in Foundry VTT 14
**When** spell creation is tested with filled spell data, missing required data, invalid numeric data, custom/manual notes, cancellation, successful document creation/opening, sheet edit after creation, actor-linked spellcasting use, and permission states
**Then** spell creation, validation, output validity, sheet editability, and workflow compatibility work without runtime errors
**And** validation evidence records tested data, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.7: Add Weapon, Armor, And Shield Builders

As a GM, player, or Greybard creating combat equipment,
I want guided builders for weapons, armor, and shields,
So that combat-relevant items are structurally valid, editable, and usable in attack, defense, and state update workflows.

**Acceptance Criteria:**

**Given** a user opens the combat equipment builder
**When** they choose weapon, armor, or shield creation
**Then** the workflow captures item name, category/type, description/notes, ENC, cost, quality, equipped-state behavior where applicable, combat stats, effects/enchantments reference fields where applicable, and GM/private notes
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** the user is creating a weapon
**When** weapon-specific steps render
**Then** the builder captures supported attack-relevant fields needed by the attack workflow
**And** missing or invalid attack-relevant data is surfaced before document creation.

**Given** the user is creating armor or a shield
**When** defense-specific steps render
**Then** the builder captures supported armor/AR, shield, defense, quality, and state-update-relevant fields needed by defense and combat state workflows
**And** ambiguous or unsupported defense behavior can be captured as visible manual notes.

**Given** the user reaches review
**When** they inspect the equipment summary
**Then** the builder distinguishes core item identity, mechanical combat fields, descriptive/prose fields, GM/private notes, and manual adjudication notes
**And** validation blocks final creation until required invalid data is corrected.

**Given** the user confirms creation
**When** the equipment item is created
**Then** the builder creates a valid Foundry item through awaited Foundry document APIs, opens it on its sheet, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary use.

**Given** the created weapon, armor, or shield is used after creation
**When** it is attached to an actor or used from relevant sheets/workflows
**Then** weapon data is usable in attack workflows, armor/shield data is usable in defense or state update workflows where supported, and unsupported cases produce clear manual-feedback states
**And** follow-up gaps are recorded rather than hidden.

**Given** builder-created combat equipment may later be packaged
**When** local/homebrew output is created
**Then** the builder does not mark it as release-approved System Content
**And** provenance or packaging readiness fields remain distinct from actual provenance approval.

**Given** this story is validated in Foundry VTT 14
**When** weapon, armor, and shield creation are tested with filled data, missing required data, invalid numeric data, quality/equipped fields, enchantment/effect references, manual notes, cancellation, successful document creation/opening, sheet edit after creation, actor attachment, and representative combat workflow use
**Then** creation, validation, output validity, sheet editability, and combat workflow compatibility work without runtime errors
**And** validation evidence records tested item types, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.8: Add General Equipment And Consumable Builders

As a GM, player, or Greybard creating non-weapon equipment and consumables,
I want guided builders for general items, adventuring gear, arcane items, potions, poisons, food, drink, and other equipment,
So that common inventory content is valid, editable, and usable in inventory, reference, and consumable workflows.

**Acceptance Criteria:**

**Given** a user opens the general equipment builder
**When** they choose a supported non-combat or consumable category
**Then** the workflow captures item name, category/type, description/notes, ENC, cost, quality where applicable, equipped or carried state where applicable, usage stats or notes where applicable, enchantment/effect references where applicable, and GM/private notes
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** the user creates food, drink, potion, poison, arcane consumable, or similar consumable content
**When** consumable-specific steps render
**Then** the builder captures supported use data, quantity/state behavior, structured effect summary where safe, and manual adjudication notes for complex or unsupported behavior
**And** it prepares data compatible with the alchemy/consumable use workflow from Epic 4 where applicable.

**Given** the user creates tools, clothing, jewelry, adventuring gear, or other general items
**When** category-specific steps render
**Then** the builder captures supported inventory/reference fields without forcing irrelevant combat or magic fields
**And** unsupported special behavior can be recorded as visible notes.

**Given** the user reaches review
**When** they inspect the item summary
**Then** the builder distinguishes item identity, category-specific fields, mechanical/use fields, descriptive/prose fields, GM/private notes, and manual adjudication notes
**And** validation blocks final creation until required invalid data is corrected.

**Given** the user confirms creation
**When** the item is created
**Then** the builder creates a valid Foundry item through awaited Foundry document APIs, opens it on its sheet, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary use.

**Given** the created item is used after creation
**When** it is attached to an actor, opened on its sheet, used for reference, or used through the consumable workflow where applicable
**Then** structured data is usable where supported, unsupported behavior produces clear manual-feedback states, and follow-up gaps are recorded rather than hidden.

**Given** builder-created general equipment may later be packaged
**When** local/homebrew output is created
**Then** the builder does not mark it as release-approved System Content
**And** provenance or packaging readiness fields remain distinct from actual provenance approval.

**Given** this story is validated in Foundry VTT 14
**When** food/drink, adventuring gear, tools, clothing, jewelry, arcane items, potions, poisons, other items, missing required data, invalid numeric data, quantity/use fields, manual notes, cancellation, successful document creation/opening, sheet edit after creation, actor attachment, and representative consumable workflow use are tested
**Then** creation, validation, output validity, sheet editability, inventory compatibility, and consumable workflow compatibility work without runtime errors
**And** validation evidence records tested item categories, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.9: Build Statblock Builder Core Identity, Characteristics, And Role Steps

As a GM or Greybard creating an NPC or creature,
I want the statblock builder to capture identity, role, and core characteristics first,
So that later combat, magic, and notes steps have valid statblock context to build on.

**Acceptance Criteria:**

**Given** the statblock builder is opened
**When** the first ordered steps render
**Then** the workflow captures statblock name, NPC/creature type or role, description summary where applicable, and supported core identity fields needed for a valid statblock actor
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** the characteristics step is reached
**When** the user enters or adjusts statblock characteristic values
**Then** the builder presents all required UESRPG core characteristics with localized labels, numeric input treatment, safe defaults, and validation constraints
**And** invalid or missing characteristic values block progression with feedback near affected fields.

**Given** statblock skills or relevant test values are needed before later workflow use
**When** the user enters skill/test values in the early statblock steps
**Then** the builder captures supported skills or relevant test values needed for core tests and combat workflows
**And** unsupported or shorthand statblock values can be captured as visible notes rather than invalid structured automation.

**Given** identity, role, characteristics, or test values influence later derived state or combat choices
**When** the user changes those earlier values
**Then** the builder preserves valid downstream entries where safe, flags affected values for review, and avoids silently discarding entered data.

**Given** the builder is cancelled or closed before final creation
**When** the user exits the workflow
**Then** no invalid partial statblock actor is created
**And** temporary state is handled without persisting incomplete document data as a playable statblock.

**Given** user-facing statblock builder UI renders
**When** users review identity, role, characteristics, and test-value steps in light/dark themes and narrow-enough application widths
**Then** labels resolve through localization keys, numeric values are scan-friendly, validation states are text-paired, focus order is readable, and primary actions remain reachable.

**Given** this story is validated in Foundry VTT 14
**When** statblock identity, role, characteristics, and test-value steps are tested with default values, filled values, missing name, missing role/type, invalid characteristic value, shorthand/manual notes, changed earlier inputs, cancellation, and permission states
**Then** step rendering, validation, preserved-data behavior, and no-partial-actor behavior work without runtime errors
**And** validation evidence records tested states, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.10: Add Statblock Combat, Magic, Notes, And Final Actor Creation

As a GM or Greybard finishing an NPC or creature statblock,
I want to add combat data, magic capability, tactics, notes, and create a valid statblock actor,
So that the completed statblock can be opened, edited, and used in tests, combat, and magic workflows.

**Acceptance Criteria:**

**Given** the statblock builder has valid identity, role, characteristics, and test-value context
**When** the combat step renders
**Then** the user can add supported derived resources/state, equipment where applicable, weapons/attacks, armor/defenses, active effects/conditions, combat notes, and tactics
**And** missing or invalid combat-relevant data is surfaced before final creation.

**Given** the magic step renders for a statblock with magic capability
**When** the user adds spells, rituals, magic capability, or magic notes
**Then** the builder prepares data compatible with spellcasting and ritual workflows from Epic 4 where applicable
**And** unsupported or manually adjudicated magic details are captured as visible notes rather than unsafe automation.

**Given** the notes and GM/private step renders
**When** the user enters description, public notes, tactics, and GM/private notes
**Then** the builder stores those fields in sheet-visible locations with permission-aware display expectations
**And** descriptive/prose fields remain distinct from mechanical fields.

**Given** the review step renders
**When** the user reviews the prepared statblock
**Then** the builder shows key identity, role, characteristics, test values, resources/state, equipment, attacks, defenses, spells/magic, conditions, combat notes, tactics, public notes, and GM/private summary values
**And** validation blocks final creation until required incomplete or invalid fields are resolved.

**Given** the user confirms final creation
**When** the statblock actor is created
**Then** the builder creates a valid Foundry statblock actor through awaited Foundry document APIs, opens it on the statblock sheet, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary preparation or live play.

**Given** the created statblock is used after creation
**When** the user opens the sheet and initiates representative skill, characteristic, initiative, attack, defense, spellcasting, ritual, and state-update workflows where data exists
**Then** the statblock data is usable or produces clear missing-data/manual-feedback states consistent with earlier epics
**And** follow-up gaps are recorded rather than hidden.

**Given** the statblock may later be included in packaged System Content
**When** the builder completes local/homebrew creation
**Then** it does not mark the statblock as release-approved System Content
**And** provenance or packaging readiness metadata or notes remain distinct from actual provenance approval.

**Given** this story is validated in Foundry VTT 14
**When** final statblock creation is tested with filled combat data, missing attack data, missing defense data, magic-capable statblock, non-magic statblock, manual magic/combat notes, invalid review state, successful actor creation/opening, sheet edit after creation, and representative workflow use
**Then** final creation, output validity, sheet opening, editability, and play-workflow compatibility work without runtime errors
**And** validation evidence records tested data, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.11: Add Minimal Enchanting Builder With Manual Fallback

As a GM, player, or Greybard creating enchanted items,
I want a minimal enchanting builder with explicit manual fallback,
So that enchantment-related entities can be represented for 1.0 without unsafe or incomplete deep automation.

**Acceptance Criteria:**

**Given** the enchanting builder is opened
**When** the ordered steps render
**Then** the workflow captures enchantment name, description, type such as Cast, Strike, or Constant, linked item or item-reference context where applicable, and notes needed to represent the enchantment
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** an enchantment is tied to another entity
**When** the user selects or records the linked item context
**Then** the builder preserves the relationship or reference in a sheet-visible way
**And** missing linked-item context is surfaced clearly without requiring raw data editing.

**Given** deeper enchantment mechanics are deferred beyond 1.0 focused implementation
**When** the workflow reaches mechanical detail or review
**Then** unsupported mechanics are captured as visible manual notes or GM adjudication fields
**And** the builder does not imply unsupported automated enchantment behavior.

**Given** the user reaches review
**When** they inspect the enchantment summary
**Then** the builder distinguishes structured enchantment identity/type/linkage fields from descriptive notes and manual adjudication notes
**And** validation blocks final creation until required invalid data is corrected.

**Given** the user confirms creation
**When** the enchantment or enchanted-item representation is created
**Then** the builder creates or updates valid Foundry document data through awaited Foundry document APIs, opens the resulting document on its sheet where appropriate, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary review or play.

**Given** the created enchantment is used after creation
**When** it is opened on a sheet, linked to or reviewed from an item, or referenced during play
**Then** structured fields and manual notes are visible and understandable
**And** unsupported behavior produces clear manual-feedback states rather than silent automation failure.

**Given** builder-created enchantment content may later be packaged
**When** local/homebrew output is created
**Then** the builder does not mark it as release-approved System Content
**And** provenance or packaging readiness fields remain distinct from actual provenance approval.

**Given** this story is validated in Foundry VTT 14
**When** enchanting builder use is tested with Cast, Strike, and Constant types; linked and missing item context; manual mechanics notes; invalid required data; cancellation; successful document creation/opening; sheet edit after creation; actor/item reference during play; and permission states
**Then** minimal enchanting creation, validation, linkage/reference, manual fallback, output validity, and editability work without runtime errors
**And** validation evidence records tested data, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.12: Add Minimal Alchemy Builder With Manual Fallback

As a GM, player, or Greybard creating alchemy outputs,
I want a minimal alchemy builder with explicit manual fallback,
So that potions, poisons, and alchemy-related outputs can be represented for 1.0 without unsafe or incomplete deep automation.

**Acceptance Criteria:**

**Given** the alchemy builder is opened
**When** the ordered steps render
**Then** the workflow captures alchemy output name, description, type such as Potion or Poison, supported usage fields, quantity/state behavior where applicable, structured effect summary where safe, and notes needed to represent the output
**And** it uses the shared builder stepper, validation, cancellation, and preserved-data behavior from Story 5.1.

**Given** deeper alchemy mechanics are deferred beyond 1.0 focused implementation
**When** the workflow reaches complex formula, ingredient, potency, or special-effect behavior
**Then** unsupported mechanics are captured as visible manual notes or GM adjudication fields
**And** the builder does not imply unsupported automated alchemy behavior.

**Given** alchemy output may be used as a consumable
**When** the user enters usage details
**Then** the builder prepares data compatible with the alchemy/consumable use workflow from Epic 4 where applicable
**And** unsupported use cases produce visible manual notes rather than invalid structured automation.

**Given** the user reaches review
**When** they inspect the alchemy summary
**Then** the builder distinguishes structured alchemy identity/type/use fields from descriptive notes and manual adjudication notes
**And** validation blocks final creation until required invalid data is corrected.

**Given** the user confirms creation
**When** the alchemy output is created
**Then** the builder creates a valid Foundry item or alchemy entity through awaited Foundry document APIs, opens it on its sheet, and leaves it editable through normal sheet controls
**And** no generated data requires raw JSON editing before ordinary review or play.

**Given** the created alchemy output is used after creation
**When** it is opened on a sheet, attached to an actor, or used through the consumable workflow where applicable
**Then** structured fields and manual notes are visible and understandable
**And** unsupported behavior produces clear manual-feedback states rather than silent automation failure.

**Given** builder-created alchemy content may later be packaged
**When** local/homebrew output is created
**Then** the builder does not mark it as release-approved System Content
**And** provenance or packaging readiness fields remain distinct from actual provenance approval.

**Given** this story is validated in Foundry VTT 14
**When** alchemy builder use is tested with Potion and Poison types, structured use fields, quantity/state behavior, manual mechanics notes, invalid required data, cancellation, successful document creation/opening, sheet edit after creation, actor attachment, representative consumable workflow use, and permission states
**Then** minimal alchemy creation, validation, manual fallback, output validity, editability, and consumable compatibility work without runtime errors
**And** validation evidence records tested data, expected result, actual result, limitations, and follow-up defects if any.

### Story 5.13: Validate Builder Outputs Across Sheets, Play Workflows, And Packaging Readiness

As Greybard preparing builder-created content for real use,
I want all Epic 5 builders validated across sheets, workflows, and packaging-readiness boundaries,
So that builder outputs are valid, editable, playable, and not confused with provenance-approved System Content.

**Acceptance Criteria:**

**Given** Stories 5.1 through 5.12 are implemented
**When** `npm run typecheck`, `npm run lint`, and `npm run build` are run
**Then** the baseline checks pass
**And** any failures are fixed in source rather than bypassed by weakening compiler, lint, build, or type-safety expectations.

**Given** each full 1.0 builder is available
**When** character creation, character advancement, spell creation, weapon/armor/shield creation, general equipment/consumable creation, and statblock creation are run with representative valid data
**Then** each builder produces or updates a valid Foundry document, opens or returns to the relevant sheet, remains editable, and requires no raw JSON editing before ordinary use
**And** validation evidence records the document type, data used, expected result, actual result, limitations, and follow-up defects.

**Given** minimal/deferred 1.0 builders are available
**When** enchanting and alchemy builders are run with representative valid and complex/custom data
**Then** supported structured fields are created correctly, unsupported mechanics are represented through visible manual notes or GM adjudication fields, and output does not imply deeper automation than exists
**And** manual fallback remains discoverable during later sheet or play use.

**Given** builder outputs are used in earlier play workflows
**When** created characters, statblocks, spells, weapons, armor, shields, consumables, enchantments, and alchemy outputs are opened on sheets and used in relevant Epic 3 and Epic 4 workflows where applicable
**Then** usable data flows into tests, initiative, attack, defense, state update, spellcasting, ritual, mishap, and consumable workflows or produces clear missing-data/manual-feedback states
**And** gaps are recorded as follow-up defects or later-epic requirements.

**Given** builders include validation and stepper behavior
**When** missing data, invalid numeric data, blocked steps, backward navigation, changed earlier inputs, cancellation, read-only permissions, editable permissions, and narrow-window layouts are tested across representative builders
**Then** data is preserved where safe, errors remain associated with affected fields, invalid creation is blocked, primary actions remain reachable, and no partial invalid documents are persisted.

**Given** builder-created output could be considered for compendium packaging
**When** local/homebrew builder output is reviewed
**Then** it is not treated as release-approved System Content without Epic 6 provenance review
**And** any provenance or packaging readiness metadata remains distinct from actual distribution approval.

**Given** builder UI and output are reviewed under light and dark Foundry themes
**When** representative builder steps, review screens, validation failures, completion states, and opened output sheets are inspected
**Then** labels are localized, semantic states are text-paired, focus order is acceptable, mechanical and descriptive fields remain distinguishable, and builder output remains readable and editable.

**Given** Epic 6 content and provenance work will use builder-created data
**When** Epic 5 validation is complete
**Then** any data shape, source-data, manifest, pack automation, or provenance-review needs discovered during builder validation are recorded for Epic 6
**And** the evidence is sufficient for Epic 7 release proof to reference.

## Epic 6: GM Tools, System Content, And Provenance

GMs can use XP reward support, treasure tables, and artifact generation, while Greybard can manage broad rights-cleared System Content through source-controlled pack automation and manifest-grade provenance review.

### Story 6.1: Add Simple XP Reward Calculation And Distribution Support

As a GM finishing a session or encounter,
I want simple XP reward support,
So that I can calculate, record, or distribute basic XP rewards without using raw data edits or external bookkeeping for normal cases.

**Acceptance Criteria:**

**Given** a GM opens the XP reward workflow from a supported GM tool, actor, combat, or session-prep route
**When** the workflow renders
**Then** it provides fields for reward reason/source, recipient characters, XP amount or simple calculation inputs, notes, and manual adjustment
**And** it does not imply campaign analytics or advancement automation beyond the 1.0 scope.

**Given** recipients are selected
**When** the GM enters or calculates an XP reward
**Then** the workflow shows each recipient, current XP or advancement-relevant value where available, proposed awarded XP, proposed new value where safe, and any missing-data warnings
**And** invalid amounts or unavailable recipients are surfaced before confirmation.

**Given** the GM confirms XP distribution or recording
**When** the workflow can safely update recipient character data
**Then** updates are applied through awaited Foundry document APIs using explicit path-based updates
**And** the output records recipient, reward source/reason, amount, notes, and changed values.

**Given** recipient data is missing, read-only, ambiguous, or outside safe automation
**When** the GM attempts to distribute XP
**Then** the workflow blocks misleading updates or routes to manual recording/notes
**And** the output distinguishes automated updates from manual or advisory records.

**Given** XP reward output renders
**When** users review it in chat or workflow UI
**Then** labels resolve through localization keys, numeric values are scan-friendly, semantic warnings are text-paired, and GM manual adjustments are visible.

**Given** this story is validated in Foundry VTT 14
**When** XP support is tested with one recipient, multiple recipients, missing recipient data, read-only recipient, invalid amount, manual adjustment, cancellation, confirmed update, and post-update character sheet review
**Then** calculation/recording/distribution, output, manual fallback, and sheet compatibility work without runtime errors
**And** validation evidence records tested recipients, data states, expected result, actual result, limitations, and follow-up defects if any.

### Story 6.2: Add Treasure Table Rolling Workflow

As a GM preparing or running a session,
I want to roll treasure results through Foundry-native roll tables or an equivalent workflow,
So that rewards can be generated visibly and adjusted without leaving Foundry.

**Acceptance Criteria:**

**Given** treasure table support is available
**When** a GM opens the treasure workflow from a supported GM tool, compendium, roll table, or session-prep route
**Then** the workflow exposes available reviewed treasure tables or inputs, roll controls, context/notes fields, and manual adjustment options
**And** it preserves Foundry-native roll table behavior where feasible.

**Given** a treasure table or equivalent input has provenance-approved packaged content
**When** the GM rolls treasure
**Then** the output shows table/input name, roll result, generated item or text result where rights allow, source/context notes, and any manual adjustment
**And** structured item references are used where available.

**Given** treasure result content is unavailable, unreviewed, rights-limited, or not approved for distribution
**When** the GM attempts to roll or display that result
**Then** the workflow does not expose unapproved packaged content
**And** it provides a clear manual result/adjudication path that preserves local playability.

**Given** the GM wants to adjust a treasure result
**When** they edit or record the result through the workflow
**Then** the generated output remains GM-editable through Foundry-native controls or notes
**And** manual changes are visible in chat or workflow output.

**Given** treasure output renders
**When** users review it in chat or workflow UI
**Then** labels resolve through localization keys, numeric/table values are scan-friendly, semantic warnings are text-paired, and provenance/content limitations are understandable without reading build logs.

**Given** this story is validated in Foundry VTT 14
**When** treasure rolling is tested with reviewed table content, structured item reference result, text result where rights allow, unreviewed/provenance-blocked content, manual result, adjustment, cancellation, and compendium/roll table access routes
**Then** rolling, output, provenance gating, manual fallback, and editability work without runtime errors
**And** validation evidence records tested tables/inputs, provenance states, expected result, actual result, limitations, and follow-up defects if any.

### Story 6.3: Add Artifact Generation Workflow With GM-Editable Output

As a GM creating high-value loot or artifacts,
I want an artifact generation workflow with understandable editable output,
So that I can generate or assemble memorable rewards while retaining final GM control.

**Acceptance Criteria:**

**Given** the artifact generation workflow is opened from a supported GM tool or session-prep route
**When** the workflow renders
**Then** it exposes available reviewed artifact-generation inputs or tables, configuration/context fields, roll/generate controls, notes, and manual adjustment controls
**And** it does not imply deeper artifact automation than the 1.0 scope supports.

**Given** artifact generation uses provenance-approved packaged inputs
**When** the GM generates an artifact result
**Then** the output shows generation inputs, roll/table results where applicable, structured item references where available, clear text result components where rights allow, and GM notes
**And** the generated result is understandable without reading source data or implementation details.

**Given** generation inputs, table entries, or result details are unavailable, unreviewed, rights-limited, or not approved for distribution
**When** artifact generation reaches that content
**Then** the workflow does not expose unapproved packaged content
**And** it provides a clear manual generation/adjudication path that preserves local playability.

**Given** the GM wants to edit the generated artifact
**When** they adjust the result, notes, linked item, or generated text
**Then** the final output remains GM-editable through Foundry-native controls, item sheets, or workflow notes
**And** manual changes are visible in chat or workflow output.

**Given** an artifact result can be represented as a structured item
**When** the GM confirms creation or linkage
**Then** the workflow creates or links valid Foundry item data through awaited Foundry document APIs where supported, opens it on its sheet where appropriate, and leaves it editable
**And** it does not mark generated local/homebrew artifacts as release-approved System Content.

**Given** artifact generation output renders
**When** users review it in chat or workflow UI
**Then** labels resolve through localization keys, numeric/table values are scan-friendly, semantic warnings are text-paired, and provenance/content limitations are understandable without reading build logs.

**Given** this story is validated in Foundry VTT 14
**When** artifact generation is tested with reviewed inputs, structured item references, text result where rights allow, unreviewed/provenance-blocked input, manual generation, GM adjustment, optional item creation/linkage, cancellation, and sheet edit after creation
**Then** generation, output, provenance gating, manual fallback, editability, and item compatibility work without runtime errors
**And** validation evidence records tested inputs, provenance states, expected result, actual result, limitations, and follow-up defects if any.

### Story 6.4: Define System Content Source Categories And Minimum Coverage

As Greybard preparing 1.0 System Content,
I want source-controlled content categories and minimum coverage expectations defined,
So that compendium work targets the balanced one-shot and common preparation needs without outrunning provenance review.

**Acceptance Criteria:**

**Given** the 1.0 release requires System Content coverage
**When** content source categories are defined
**Then** they include applicable release-scope categories: character creation reference content if needed by builders, birthsigns, weapons, armor, shields, food and drink, adventuring gear, tools, clothing, jewelry, arcane items, potions and poisons, other items, spells, spell scrolls, rituals, enchantments, alchemy outputs, effects/conditions, statblocks, treasure tables, mishap tables, artifact-generation tables or inputs, and XP/reward reference content if needed
**And** each category is mapped to the relevant document type, pack, source-data location, or explicit non-packaged/manual status.

**Given** exact numerical content counts are a post-checklist content-audit follow-up
**When** minimum 1.0 coverage is defined
**Then** the coverage target focuses on enough content to run the balanced one-shot and support common equipment, spells, statblocks, and preparation workflows
**And** the document records which categories are required, optional, deferred, or blocked by provenance/content availability.

**Given** content may come from builders, source files, manual authoring, or existing packs
**When** source categories are reviewed
**Then** each source path is identified as source-of-truth, generated output, local/homebrew, or distributed System Content candidate
**And** generated packs and `dist` artifacts are not treated as hand-edited sources of truth.

**Given** content categories are user-facing package material
**When** the category plan is reviewed for policy and rights risk
**Then** it records that distributed content requires human-authored or otherwise rights-cleared provenance
**And** AI-generated prepared user-facing content, unclear-rights content, or unauthorized scraped content is excluded from release candidates.

**Given** content category planning affects compendium packaging
**When** category-to-pack mapping is created or updated
**Then** `system.json`, source pack definitions, pack automation expectations, localization where relevant, and build-copy behavior are identified as alignment points
**And** gaps are recorded before pack compilation work proceeds.

**Given** this story is validated
**When** the category and minimum coverage plan is reviewed against the balanced one-shot, GM prep flow, builder outputs, Epic 3/4 workflows, and Epic 6 GM tools
**Then** each required live-play and prep content need is covered, manually covered, deferred, or explicitly blocked
**And** follow-up content/provenance tasks are recorded without adding unreviewed packaged content.

### Story 6.5: Add Provenance Manifest Schema And Review Workflow

As Greybard preparing distributed System Content,
I want a manifest-grade provenance schema and review workflow,
So that every packaged content entry has explicit rights, source, and review status before release.

**Acceptance Criteria:**

**Given** a distributed System Content entry is eligible for packaging
**When** provenance data is recorded
**Then** the manifest captures pack ID, entity ID, entity name, entity type/category, source reference or origin, rights status, human author/reviewer, review date, distribution allowed yes/no, notes or limitation, and related builder/source file where applicable
**And** entries with missing required provenance fields are treated as incomplete.

**Given** content is created from builder output, source-controlled data, existing packs, or manual authoring
**When** the provenance workflow reviews it
**Then** the source path and authorship/review path are recorded clearly
**And** local/homebrew content is not automatically treated as release-approved distributed System Content.

**Given** a content entry has unclear rights, unreviewed source, unauthorized scraped material risk, or AI-generated prepared user-facing content risk
**When** the provenance workflow evaluates distribution status
**Then** distribution is blocked or marked not allowed
**And** the blocked reason is visible in the manifest rather than hidden only in build logs.

**Given** a content entry is approved for distribution
**When** its manifest entry is reviewed
**Then** the rights status, human reviewer, review date, and distribution allowed state are present and internally consistent
**And** approval can be audited without opening generated pack data as the source of truth.

**Given** provenance data is maintained in source control
**When** manifest files are added or updated
**Then** generated packs and `dist` output remain derived artifacts
**And** the workflow avoids hand-editing generated distribution artifacts as the authoritative provenance source.

**Given** provenance workflow UI, reports, or validation output are user-facing or maintainer-facing
**When** they render or run
**Then** labels and messages are localized where runtime-facing, concise where maintainer-facing, and clear enough to distinguish approved, blocked, incomplete, and local/homebrew states.

**Given** this story is validated
**When** provenance entries are tested with complete approved content, missing required fields, blocked rights status, unreviewed source, local/homebrew output, builder-created candidate content, and generated pack output
**Then** the manifest schema and review workflow correctly classify each state
**And** validation evidence records tested content states, expected result, actual result, limitations, and follow-up defects if any.

### Story 6.6: Align Compendium Source Data And Pack Compilation Workflow

As Greybard maintaining distributable System Content,
I want compendium source data and pack compilation to stay aligned with the system package,
So that release content can be built and tested from source-controlled data without hand-editing generated packs.

**Acceptance Criteria:**

**Given** source-controlled System Content exists
**When** pack source data is organized or updated
**Then** each included content category maps to the expected Foundry pack, document type, and source-data location
**And** generated packs and `dist` artifacts remain derived outputs rather than sources of truth.

**Given** pack metadata or content categories change
**When** package configuration is reviewed
**Then** `system.json`, pack definitions, source data, build/pack automation, and static-copy behavior remain aligned
**And** missing pack references, stale generated outputs, or broken source paths are treated as defects.

**Given** content is compiled for distribution
**When** the existing pack compilation workflow runs
**Then** source data compiles into Foundry-compatible packs
**And** compilation failures are fixed in source data or automation rather than by hand-editing generated pack artifacts.

**Given** GM tools depend on treasure tables, mishap tables, artifact inputs, XP/reward reference content, or structured item references
**When** pack source data is compiled
**Then** included references resolve in the generated packs
**And** unavailable or deferred content has a visible manual fallback or limitation path in the relevant workflow.

**Given** content is intentionally excluded, deferred, or manually limited for 1.0
**When** source data and pack outputs are reviewed
**Then** the limitation is recorded in planning notes, release notes, or the relevant manual review artifact
**And** the pack workflow does not require hand-editing generated artifacts to represent that decision.

**Given** this story is validated
**When** pack compilation is tested with representative equipment, spell, statblock, table, artifact-input, mishap, and reward/reference content
**Then** source data compiles successfully, package metadata remains aligned, generated packs are usable in Foundry, and manual exclusions/limitations are recorded
**And** validation evidence records tested packs, expected result, actual result, limitations, and follow-up defects if any.

### Story 6.7: Validate System Content Packs And GM Tool Workflows In Foundry Runtime

As Greybard preparing System Content and GM tools for 1.0,
I want Epic 6 packs and GM workflows validated together,
So that prep/reward content is usable in Foundry and release limitations are explicit.

**Acceptance Criteria:**

**Given** Stories 6.1 through 6.6 are implemented
**When** `npm run typecheck`, `npm run lint`, and `npm run build` are run
**Then** the baseline checks pass
**And** any failures are fixed in source rather than bypassed by weakening compiler, lint, build, pack, or type-safety expectations.

**Given** representative System Content source data exists
**When** pack compilation runs
**Then** generated packs are produced from source-controlled data, pack metadata remains aligned, and generated pack artifacts are not hand-edited as source of truth
**And** validation evidence records tested packs, source categories, expected result, actual result, limitations, and follow-up defects.

**Given** a Foundry VTT 14 development world loads the built system
**When** representative compendium packs are opened, searched, imported, and used from actor/item/sheet/workflow routes
**Then** equipment, spells, statblocks, tables, reward references, mishap inputs, and artifact inputs open as Foundry documents where included, remain editable after import, and produce no runtime errors
**And** unavailable or deferred content is recorded as a limitation rather than silently ignored.

**Given** GM tool workflows are available
**When** XP rewards, treasure rolling, and artifact generation are tested with included content, missing/deferred content, manual adjustments, and GM notes
**Then** workflows produce understandable Foundry-native output, preserve manual fallback, and avoid implying unavailable automation or unavailable content
**And** generated or selected results remain GM-editable where appropriate.

**Given** content-sensitive workflows involve treasure tables, mishap tables, artifact inputs, or clear text results
**When** validation encounters unavailable, deferred, or manually excluded content
**Then** the workflow preserves local playability through manual result/adjudication paths
**And** release limitations are recorded for Epic 7 onboarding and release notes.

**Given** Epic 7 will consolidate release proof
**When** Epic 6 validation is complete
**Then** evidence identifies which System Content categories are usable, manually limited, deferred, or blocked
**And** the evidence is sufficient for balanced one-shot validation and minimal-handholding release review.

## Epic 7: Release Proof, Onboarding, And Minimal-Handholding Validation

The package can prove 1.0 readiness through collected per-epic validation evidence, final automated verification, manual Foundry VTT 14 release validation, balanced one-shot coverage, minimal-handholding install/use validation, quickstart/workflow docs, known limitations, and Foundry Tutorial API guidance.

### Story 7.1: Create The 1.0 Release Checklist

As Greybard preparing UESRPG Rebuilt for 1.0,
I want one practical release checklist that shows what has been tested, what still needs work, and what limits are known,
So that release readiness is judged from actual Foundry use instead of memory or scattered notes.

**Acceptance Criteria:**

**Given** the project needs a 1.0 release checklist
**When** the checklist is created
**Then** it has sections for automated checks, Foundry install/load, sheets, rolls/tests, combat, magic, builders, GM tools, compendia, documentation, and the balanced one-shot
**And** each section can be marked as not started, passing, failing, blocked, deferred, or manually supported.

**Given** a workflow or surface is tested
**When** Greybard records the result
**Then** the checklist captures the Foundry version, test world or data used, action performed, expected result, actual result, status, and notes
**And** failures include the follow-up story or issue needed to fix them.

**Given** earlier epics already require validation
**When** the checklist is filled in
**Then** it links to or summarizes that existing evidence instead of asking Greybard to retest everything from scratch
**And** missing evidence is visible as a release gap.

**Given** 1.0 includes manual limits for rituals, enchanting, alchemy, rare combat cases, and some content gaps
**When** those limits are recorded
**Then** the checklist states where the manual path exists, whether it was tested, and whether it still allows the balanced one-shot to run
**And** manual support is not counted as passing unless the user can actually find and use it.

**Given** 1.0 needs user-facing help
**When** docs or tutorial guidance are reviewed
**Then** the checklist records whether install/setup, core play, GM content tools, and known limitations are covered
**And** planning docs are not treated as user documentation.

**Given** the checklist is reviewed before final validation starts
**When** it is compared against FR34 through FR37 and the balanced one-shot checklist
**Then** every required release area has a concrete test slot
**And** any missing, vague, or untestable item is rewritten before release validation begins.

### Story 7.2: Run Final Baseline Verification And Package Build

As Greybard preparing a 1.0 release candidate,
I want the project's required automated checks and package build to pass cleanly,
So that release validation starts from a buildable system package instead of an uncertain source tree.

**Acceptance Criteria:**

**Given** all planned 1.0 source changes for the release candidate are present
**When** `npm run typecheck` is run
**Then** TypeScript checking passes without weakening strict compiler settings, hiding type errors through broad type erasure, or introducing runtime-only assumptions that Foundry will not satisfy.

**Given** typechecking passes
**When** `npm run lint` is run
**Then** linting passes without disabling relevant rules or normalizing new broad `any` usage to bypass Foundry typing gaps.

**Given** typecheck and lint pass
**When** `npm run build` is run
**Then** the Vite build, static asset copying, dist preparation, and pack compilation complete successfully
**And** generated output is treated as a build artifact rather than hand-edited source.

**Given** the package build completes
**When** package metadata and build output are spot-checked
**Then** the built package contains the expected script, style, language, template, pack, and metadata paths
**And** Foundry VTT compatibility is not bumped beyond the runtime version actually validated.

**Given** any automated check or build step fails
**When** the failure is reviewed
**Then** the release checklist records the failing command, error summary, suspected affected area, and follow-up fix story or issue
**And** the release candidate is not marked ready until the failure is fixed and rerun.

**Given** all final automated checks pass
**When** Story 7.2 is completed
**Then** the exact commands run, date, result, and any limitations are recorded in the 1.0 release checklist
**And** manual Foundry validation can proceed from the built package.

### Story 7.3: Validate Full Foundry Runtime Install And Core Surfaces

As Greybard validating a 1.0 release candidate,
I want the built system to install, load, and open its core Foundry surfaces,
So that release testing starts from a package that works in the actual Foundry VTT 14 runtime.

**Acceptance Criteria:**

**Given** the release candidate package has been built
**When** it is installed or loaded in a Foundry VTT 14 development world
**Then** the system loads without package metadata, script, style, language, template, pack, lifecycle, or registration errors
**And** the Foundry version, world used, install/load route, and result are recorded in the release checklist.

**Given** the system is loaded
**When** representative character, statblock, item/equipment, spell/magic, ritual, enchantment, alchemy, and GM tool surfaces are opened
**Then** each surface opens through its intended Foundry route without runtime errors
**And** any unavailable, deferred, or manually supported surface is recorded as a limitation rather than silently ignored.

**Given** sheet surfaces are opened
**When** default, missing, filled, editable, and read-only permission states are spot-checked
**Then** sheets render safely, user-facing labels resolve, missing data is understandable, and normal Foundry editing behavior works where permissions allow
**And** failures are recorded with affected document type and follow-up fix.

**Given** runtime assets are required by the package
**When** templates, styles, language files, icons, and packs are referenced by the system
**Then** the built package resolves those assets at runtime
**And** missing localization keys, missing templates, broken styles, or stale pack references are recorded as defects.

**Given** core surfaces use system styling
**When** representative sheets, dialogs, chat cards, builders, and GM tools are checked in light and dark Foundry themes
**Then** text remains readable, focus states are visible, semantic states are paired with text, and primary actions remain reachable
**And** any visual limitation that affects use is recorded.

**Given** Story 7.3 validation is complete
**When** the release checklist is updated
**Then** install/load status, core surface status, runtime asset status, theme/readability status, and open blockers are visible
**And** the release candidate does not proceed to balanced one-shot validation if install/load or core surface blockers remain.

### Story 7.4: Validate Balanced One-Shot Workflow Coverage

As Greybard validating 1.0 playability,
I want to run the representative balanced one-shot checklist in Foundry,
So that the release proves it can support an actual session flow instead of isolated feature tests.

**Acceptance Criteria:**

**Given** install/load and core surface validation have no release-blocking failures
**When** balanced one-shot validation begins
**Then** the release checklist identifies the test world, actors, items, spells, statblocks, compendium content, GM tools, and documentation used
**And** the pass uses the built release candidate rather than unbuilt source assumptions.

**Given** the balanced one-shot requires character creation or prebuilt character use
**When** that setup step is performed
**Then** a character can be created or imported/opened, reviewed on its sheet, edited where appropriate, and used in later workflow steps
**And** any manual setup limitation is recorded.

**Given** the session flow requires non-combat tests
**When** skill/social resolution, characteristic test, and opposed test steps are performed
**Then** each test can be initiated, resolved, and understood from Foundry-native output
**And** missing-data or manual-adjudication paths are discoverable if encountered.

**Given** the session flow requires combat
**When** initiative, attack, defense, and combat state update steps are performed
**Then** Foundry combat tracking, attack output, linked defense, and conservative state update behavior support live play
**And** ambiguous combat cases route to visible GM control rather than unsafe automation.

**Given** the session flow requires magic and alchemy
**When** spellcasting, ritual spellcasting, magical or alchemical mishap, and alchemy or consumable use steps are performed
**Then** each workflow resolves or routes to the intended manual path without runtime errors
**And** manual/simple ritual, enchanting, or alchemy limitations remain playable.

**Given** the session flow requires rewards and content use
**When** treasure or artifact reward, XP reward, and compendium content use steps are performed
**Then** GM tools and compendium content support the scenario, generated/selected results remain editable where appropriate, and missing/deferred content limitations are recorded.

**Given** balanced one-shot validation is complete
**When** results are reviewed
**Then** every required balanced one-shot checklist item is marked passing, failing, blocked, deferred, or manually supported
**And** the release candidate is not considered 1.0-ready if a required item cannot be completed or reasonably worked around during play.

### Story 7.5: Create Installation Setup Quickstart

As a GM installing UESRPG Rebuilt without Greybard present,
I want a short installation and setup quickstart,
So that I can install the system, create or open a world, and find the first useful workflows without personal guidance.

**Acceptance Criteria:**

**Given** a user reads the quickstart
**When** they follow the installation/setup instructions
**Then** they can install or enable the UESRPG Rebuilt system through the supported Foundry package route, create or open a world using the system, and confirm the system loaded
**And** the instructions do not assume Greybard is present.

**Given** the quickstart covers first-use setup
**When** a GM finishes the basic install steps
**Then** the quickstart points them to actor creation or prebuilt/imported character use, statblock access, compendium content if available, and the first roll/combat/magic workflows
**And** it avoids duplicating the full PRD or rules coverage checklist as public-facing copy.

**Given** install or setup can fail
**When** the quickstart describes troubleshooting
**Then** it covers likely first-run issues such as wrong Foundry version, missing package assets, unavailable compendium content, build/install confusion, and where to find known limitations
**And** it avoids telling users to edit raw JSON as the normal fix.

**Given** onboarding copy is user-facing package material
**When** the quickstart is written or revised
**Then** final copy receives human review before release, uses clear procedural language, and avoids AI-generated lore/rules filler
**And** any remaining copy limitation is recorded in the release checklist.

**Given** the quickstart references UI labels or workflow names
**When** the system UI or localization changes
**Then** the quickstart remains consistent with the actual labels and routes users see in Foundry
**And** stale instructions are treated as release-readiness defects.

**Given** this story is validated
**When** the quickstart is tested by following it in a clean or representative Foundry setup
**Then** a user can reach a loaded world and identify where to create/open characters, statblocks, compendia, and core workflows
**And** validation results and any confusing steps are recorded in the release checklist.

### Story 7.6: Create Core Play Workflow Guide

As a player or GM learning UESRPG Rebuilt,
I want a concise guide to the core play workflows,
So that I can run common tests, combat, magic, and manual fallback paths without Greybard explaining them.

**Acceptance Criteria:**

**Given** a user opens the core play workflow guide
**When** they read it
**Then** it explains where to start skill tests, characteristic tests, opposed tests, initiative, attacks, defenses, combat state updates, spellcasting, rituals, mishaps, and alchemy/consumable use
**And** it points to the relevant Foundry surfaces rather than describing raw data edits.

**Given** workflow output must be understandable
**When** the guide describes rolls or chat cards
**Then** it explains the major visible result fields such as actor/source, roll type, inputs, target, modifiers, raw roll, outcome, critical state, DoS/DoF, warnings, and manual notes
**And** it keeps explanation procedural rather than rewriting rules text as a full rules reference.

**Given** some 1.0 workflows are manually supported
**When** the guide covers rituals, enchanting, alchemy, rare combat cases, missing data, or ambiguous outcomes
**Then** it explains where manual fallback appears and what the GM or player should do next
**And** it does not imply unsupported automation exists.

**Given** user-facing guide copy is package material
**When** the guide is written or revised
**Then** final copy receives human review before release, uses clear procedural language, and avoids AI-generated lore/rules filler
**And** any remaining copy limitation is recorded in the release checklist.

**Given** the guide references UI labels, workflow names, or screenshots if any are used
**When** the system UI changes
**Then** guide references remain consistent with the actual Foundry routes and localized labels
**And** stale or misleading instructions are treated as release-readiness defects.

**Given** this story is validated
**When** Greybard or a test user follows the guide for representative core workflows
**Then** they can complete or understand each documented workflow using only the guide and UI
**And** confusing, missing, or inaccurate steps are recorded in the release checklist.

### Story 7.7: Create GM Content Workflow Notes And Release Limitations

As a GM preparing sessions with UESRPG Rebuilt,
I want concise notes about content, builders, GM tools, and known 1.0 limits,
So that I can prepare a session, understand what is included, and know when manual handling is expected.

**Acceptance Criteria:**

**Given** a GM opens the content workflow notes
**When** they read them
**Then** the notes explain where to find or create characters, statblocks, equipment, spells, rituals, enchantments, alchemy outputs, treasure tables, artifact tools, and XP reward support
**And** they point to Foundry-native compendia, sheets, builders, and GM tool routes rather than raw data editing.

**Given** content may be included, deferred, manually limited, or locally created
**When** the notes describe available content
**Then** they state what categories are available for 1.0, what is limited or deferred, and what the GM may need to create or adjudicate manually
**And** limitations are concrete enough to avoid surprise during session prep.

**Given** Greybard or users can create content through builders
**When** the notes cover builder-created content
**Then** they explain that builder output remains editable through sheets and may be used locally
**And** they do not imply local/homebrew output is official packaged content.

**Given** GM tools support XP, treasure, and artifacts
**When** the notes describe those tools
**Then** they explain what each tool does at 1.0 depth, where manual adjustment appears, and what output remains GM-editable
**And** they avoid implying campaign analytics or deep artifact automation beyond the implemented scope.

**Given** user-facing notes and release limitations are package material
**When** they are written or revised
**Then** final copy receives human review before release, uses clear procedural language, and avoids AI-generated lore/rules filler
**And** any remaining copy limitation is recorded in the release checklist.

**Given** this story is validated
**When** Greybard or a test GM follows the notes during representative session prep
**Then** they can find included content, create or edit missing content, use GM tools, and identify known limitations without personal explanation
**And** confusing, missing, or inaccurate notes are recorded in the release checklist.

### Story 7.8: Add Foundry Tutorial API Guidance For Common Workflows

As a new GM or player using UESRPG Rebuilt in Foundry,
I want in-VTT tutorial guidance for the most important workflows,
So that I can discover core actions without reading all documentation first.

**Acceptance Criteria:**

**Given** the system loads in Foundry
**When** tutorial guidance is available
**Then** users can access concise Foundry Tutorial API guidance for installation/first setup, character or prebuilt use, core tests, combat, magic, builders, GM tools, compendium content, and known limitations where appropriate
**And** the tutorials follow Foundry-native tutorial patterns rather than custom routing.

**Given** a tutorial step points users to a workflow
**When** the user follows it
**Then** the tutorial references the actual sheet, dialog, tool, compendium, or workflow route used by the system
**And** it does not send users to raw JSON editing as the normal path.

**Given** a workflow has manual support or known 1.0 limits
**When** tutorial guidance mentions that workflow
**Then** it explains the manual path or limitation briefly and points users to the relevant guide or release limitation note
**And** it does not imply unsupported automation exists.

**Given** tutorial copy is user-facing package material
**When** tutorial text is written or revised
**Then** final copy receives human review before release, resolves through localization keys where runtime-facing, uses clear procedural language, and avoids AI-generated lore/rules filler
**And** any remaining copy limitation is recorded in the release checklist.

**Given** tutorial assets or localization keys are added
**When** the package is built
**Then** tutorial data, language files, and any referenced assets are copied or bundled through the existing build workflow
**And** missing tutorial assets or localization keys are treated as release-readiness defects.

**Given** this story is validated in Foundry VTT 14
**When** tutorial guidance is opened and followed for representative setup, core test, combat, magic, builder, GM tool, compendium, and limitation workflows
**Then** tutorial steps are reachable, accurate, localized, and useful without runtime errors
**And** confusing, stale, or missing tutorial steps are recorded in the release checklist.

### Story 7.9: Run Minimal-Handholding Validation Pass

As Greybard preparing 1.0 for users outside his own table,
I want a minimal-handholding validation pass,
So that the system proves a new group can install, prepare, and run the core flow using the package, docs, tutorials, and UI rather than Greybard's memory.

**Acceptance Criteria:**

**Given** the release candidate has passing automated checks, core runtime validation, balanced one-shot validation, and onboarding materials
**When** the minimal-handholding pass begins
**Then** the pass uses the built release candidate, quickstart, workflow guide, GM content notes, tutorial guidance, and release limitations
**And** it records whether the tester is external or Greybard-simulated.

**Given** an external tester or Greybard-simulated tester starts from the quickstart
**When** they install/load the system and create or open a world
**Then** they can reach the first useful system workflows without personal instruction
**And** any confusing or missing setup instruction is recorded.

**Given** the tester prepares a representative session
**When** they use compendia, builders, sheets, statblocks, equipment, spells, GM tools, and known limitation notes
**Then** they can create, import, open, edit, or identify needed content for the scenario
**And** any place they need unexplained maintainer knowledge is recorded as a product gap.

**Given** the tester runs representative play steps
**When** they perform skill/social resolution, characteristic test, opposed test, initiative, attack/defense, combat state update, spellcasting, ritual support, mishap handling, alchemy/consumable use, treasure/artifact reward, XP reward, and compendium content use
**Then** workflows can be completed or manually supported using only UI/docs/tutorials
**And** hidden raw data editing or Greybard-only explanation is treated as a failure for that step.

**Given** manual fallback is part of 1.0
**When** the tester reaches rituals, enchanting, alchemy, rare combat, missing data, or deferred content
**Then** they can find the manual path and understand what to do next
**And** manual support is counted as acceptable only if it preserves the session flow.

**Given** the pass is complete
**When** results are reviewed
**Then** the release checklist records passed steps, failed steps, confusing docs/tutorials, missing content, broken workflows, and limitations
**And** 1.0 is not marked ready if minimal-handholding failures block install, prep, or the balanced one-shot flow.

### Story 7.10: Finalize 1.0 Release Readiness Evidence

As Greybard deciding whether UESRPG Rebuilt is ready for 1.0,
I want the release checklist, validation results, onboarding status, and known limitations finalized in one place,
So that the release decision is explicit, reproducible, and not based on assumptions.

**Acceptance Criteria:**

**Given** Stories 7.1 through 7.9 are complete
**When** release readiness is reviewed
**Then** the final release checklist shows status for automated checks, Foundry install/load, sheets, rolls/tests, combat, magic, builders, GM tools, compendia, documentation/tutorials, balanced one-shot, and minimal-handholding validation
**And** open failures or blockers are visible without searching through scattered notes.

**Given** required release checks have been run
**When** the final evidence is reviewed
**Then** `npm run typecheck`, `npm run lint`, `npm run build`, Foundry VTT 14 runtime validation, balanced one-shot validation, documentation/tutorial validation, and minimal-handholding validation have recorded results
**And** any skipped or simulated pass is clearly marked with the reason and limitation.

**Given** manual limits or deferred areas remain in 1.0
**When** the final release notes or checklist are reviewed
**Then** they clearly state what is manually supported, deferred, or not included
**And** each limitation has either a tested manual path, a documented workaround, or a release-blocking status.

**Given** packaged content and docs are user-facing
**When** final release evidence is reviewed
**Then** included content and onboarding copy have been manually reviewed by Greybard for rights, clarity, and policy-sensitive issues
**And** no AI-generated prepared user-facing package content is included as release material.

**Given** the release candidate has open issues
**When** readiness is decided
**Then** each issue is classified as release-blocking, acceptable limitation, deferred follow-up, or post-release improvement
**And** 1.0 is not marked ready while any release-blocking issue remains.

**Given** final release readiness is approved
**When** Story 7.10 is complete
**Then** the project has a single release-readiness record that names the release candidate/build, validation date, tested Foundry version, evidence sources, known limitations, and final decision
**And** the record is usable for future maintenance or post-release validation.
