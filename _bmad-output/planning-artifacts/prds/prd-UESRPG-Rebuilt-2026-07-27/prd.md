---
title: UESRPG Rebuilt PRD
status: final
created: 2026-07-27
updated: 2026-07-27
---

# PRD: UESRPG Rebuilt

## 0. Document Purpose

This PRD translates the completed product brief into a solo/internal planning artifact for building UESRPG Rebuilt toward a 1.0 release. It is written for Greybard and downstream planning workflows: UX design, architecture, epics, stories, implementation, and release validation. The PRD defines the Playable Core release gate, globally numbered functional requirements, non-goals, success metrics, and resolved release decisions.

Source input: `_bmad-output/planning-artifacts/briefs/brief-UESRPG-Rebuilt-2026-07-27/brief.md`.

## 1. Vision

UESRPG Rebuilt is a Foundry Virtual Tabletop system for running UESRPG 3e v4, a community-created d100 tabletop roleplaying game set in the Elder Scrolls universe. The system should make UESRPG practical to run in Foundry by combining trustworthy rules automation, polished document sheets, guided entity workflows, useful system content, and Foundry-native interaction patterns.

The 1.0 release is not only a personal-table milestone. It should be complete enough for other UESRPG groups to install the package, create or import the entities they need, run sessions with minimal handholding, and understand what the system is doing without reading the implementation or relying on Greybard at the table.

Automation should reduce friction without replacing GM or player judgment. Users should see meaningful game data, understand why a roll or update happened, and be able to correct, extend, or homebrew content through clear sheets and authoring workflows.

## 2. Target Users

### 2.1 Primary Users

- **GMs running UESRPG in Foundry** need reliable tools for preparation, encounter execution, content authoring, rewards, treasure, magic, statblocks, and rules adjudication during live play.
- **Players running UESRPG characters in Foundry** need legible character information, fast common rolls, smooth advancement, understandable equipment and spell data, and low-friction play during sessions.
- **System/content maintainer** is Greybard in v1. This role needs the same guided builders that users receive because those builders are also the practical way to create and maintain packaged system content.

### 2.2 Jobs To Be Done

- Run a complete UESRPG session in Foundry without repeatedly leaving the VTT for common mechanics, character state, item data, spell data, or routine lookups.
- Prepare characters, statblocks, equipment, spells, treasure, and encounters with enough structured support that setup work is reliable instead of ad hoc.
- Resolve skill tests, characteristic tests, opposed tests, combat actions, spellcasting, ritual spellcasting, and relevant mishaps quickly enough for live table use.
- Create and maintain game entities through understandable forms rather than raw data entry wherever the rules require structured construction.
- Ship system-provided content with clear provenance, rights review, and enough coverage to make the package usable by other groups.
- Learn common system workflows through concise docs and Foundry-native tutorial guidance rather than personal instruction from Greybard.

### 2.3 Non-Users For 1.0

- Groups expecting a generic Elder Scrolls campaign manager rather than a UESRPG 3e v4 Foundry system.
- Users who want Foundry replaced with a separate bespoke application model.
- Users who need uncopyrighted, AI-generated, or unofficially scraped rules/lore/content bundled into the package.

### 2.4 Key User Journeys

- **UJ-1. A GM prepares a session with system-provided content.** The GM installs UESRPG Rebuilt, opens compendium packs, creates or selects statblocks, configures equipment and spells as needed, prepares treasure or rewards, and enters the session with the needed entities in Foundry rather than a collection of external notes. Value lands when the table-ready material is visible, editable, and usable through native Foundry documents.
- **UJ-2. A player runs a character during live play.** The player opens a character sheet, references core stats and equipment, makes a skill or characteristic test, reacts to combat or magic outcomes, and updates state without slowing the scene. Value lands when the sheet and chat output give enough information to trust the result.
- **UJ-3. The table resolves combat.** The GM and players roll initiative, attack, defend, and update combat-relevant state through Foundry-native workflows. Value lands when common combat steps are fast, visible, and recoverable if a GM needs to override or correct data.
- **UJ-4. A magic user casts or creates magic.** The user casts a spell or ritual, resolves required rolls and mishaps, and can create or configure spells through guided forms. Value lands when magic remains rules-faithful without requiring repeated manual reconstruction of spell data.
- **UJ-5. Greybard authors package content through the same workflows users will use.** Greybard uses builders for spells, equipment, statblocks, alchemy, enchanting, and related entities to create distributable system content. Value lands when content can be produced consistently, reviewed for rights/provenance, and packaged without hand-editing raw data as the normal path.

## 3. Glossary

- **UESRPG Rebuilt** — The Foundry VTT system package being built for UESRPG 3e v4.
- **UESRPG 3e v4** — The target tabletop ruleset for this system.
- **Playable Core** — The minimum set of sheets, mechanics, workflows, and content needed for another group to install the package and run UESRPG sessions with minimal handholding.
- **Rules Coverage Checklist** — A dedicated planning artifact that defines the exact fields, formulas, edge cases, content coverage, validation expectations, and manual-fallback cases required for the Playable Core.
- **Guided Workflow** — A structured UI flow or builder that helps a user create, advance, configure, or resolve a rules-heavy entity or process.
- **Builder** — A guided workflow used to author structured game entities such as spells, equipment, statblocks, enchantments, alchemy outputs, or related content.
- **System Content** — Reviewed, release-approved game content distributed as part of the product, such as items, equipment, spells, effects, statblocks, roll tables, and other Foundry entities required for play.
- **Compendium Content** — The Foundry pack storage and distribution mechanism used to ship or generate System Content.
- **Provenance Manifest** — A machine-readable sidecar manifest tracking each distributed System Content entry's pack/entity ID, source/provenance, rights status, AI-content status, reviewer, and review date.
- **Document Sheet** — A Foundry-native actor or item sheet for viewing and editing game document data.
- **Rules Automation** — System behavior that calculates, rolls, updates, or presents rules outcomes while keeping results visible and user-correctable.
- **Minimal Handholding** — The 1.0 usability bar where other UESRPG groups can install and run the system without Greybard personally explaining normal workflows.

### 3.1 Release-Scope Summary

The Rules Coverage Checklist is the detailed source for exact fields, formulas, counts, and edge cases. The PRD-level 1.0 release boundary is:

- Character and statblock sheets expose the core characteristics, skills, resources, equipment, magic data, advancement data, notes, and combat-relevant state needed for the balanced one-shot validation scenario.
- Skill, characteristic, opposed, initiative, attack, defense, spellcasting, ritual spellcasting, mishap, and alchemy workflows produce visible Foundry-native roll/chat output with inputs, target values where applicable, outcomes, and safe missing-data feedback.
- Builders for character creation, advancement, spell creation, enchanting, alchemy, equipment, and statblocks produce valid editable Foundry documents that can be opened, corrected, used in relevant workflows, and packaged when provenance allows.
- Broad, rights-cleared System Content covers the entity categories needed by the balanced one-shot and common campaign preparation: items, weapons, armor, spells, effects, statblocks, treasure tables, mishap tables, artifact-generation inputs, and related roll tables.
- Manual fallbacks are acceptable only for rare rules exceptions, highly custom magic/alchemy/enchanting cases, and rare combat exceptions when the normal workflow remains usable and the fallback is documented or discoverable.
- Release validation records evidence that the package can be installed, configured, used for the balanced one-shot, and understood through docs, tutorials, and UI affordances without Greybard personally guiding the table.

## 4. Features And Functional Requirements

### 4.1 Foundry-Native System Foundation

**Description:** UESRPG Rebuilt must behave as a proper Foundry VTT 14 system package. It should use Foundry document, sheet, chat, roll, hook, template, localization, compendium, and packaging conventions rather than building a separate application layer. This foundation supports every user journey.

#### FR-1: Package Registration And Runtime Contract

The system registers its actor types, item types, document classes, data models, sheets, styles, templates, localization, scripts, and packs through Foundry-compatible package metadata and lifecycle hooks.

**Consequences:**

- `system.json`, source registration code, templates, localization, styles, build-copy rules, and packed assets remain aligned for every supported actor and item type.
- Runtime source code does not depend on Node-only APIs or Vite-only behavior.
- Foundry VTT 14 compatibility is treated as a runtime target, not inferred from TypeScript or Vite success alone.

#### FR-2: Public System API Boundary

The system exposes only intentional, stable integration-facing values through `game.uesrpg` when module or macro interoperability requires them.

**Consequences:**

- Internal implementation paths are not treated as public API.
- Public names and shapes are documented when meant for external consumers.

#### FR-3: Localization-Ready User Interface

The system resolves user-facing labels and sheet text through localization keys rather than hardcoded source strings.

**Consequences:**

- New sheets, workflows, chat cards, and configuration forms include matching English localization keys.
- Missing localization is treated as a release-readiness defect for user-facing 1.0 surfaces.

### 4.2 Play Documents And Sheets

**Description:** Character, statblock, item, equipment, spell, and related sheets must be useful during live play and preparation. Sheets should be clear, stylish, legible, easy to reference, and aligned with the project's Morrowind-inspired visual direction without sacrificing readability. Rules-required sheet field coverage is defined by the dedicated Rules Coverage Checklist.

#### FR-4: Character Sheet

Players and GMs can view and manage all character data required for common UESRPG play through a Foundry-native character sheet.

**Consequences:**

- The sheet exposes core characteristics, skills, resources, equipment, magic-relevant data, advancement-relevant data, and notes required by the Rules Coverage Checklist.
- Common rolls are reachable from the sheet without raw data entry.
- Missing/default data states render legibly and safely.

#### FR-5: Statblock Sheet

GMs can create, view, edit, and run non-player entities through a statblock sheet suitable for preparation and live encounters.

**Consequences:**

- Statblocks support combat, tests, equipment, magic, notes, and other data needed to run creatures or NPCs covered by the Rules Coverage Checklist.
- Statblock data can be authored manually or through the statblock builder.

#### FR-6: Item And Equipment Sheets

GMs and players can view and configure items, weapons, armor, and related equipment through understandable sheets.

**Consequences:**

- Equipment data needed for rolls, combat, inventory, and reference is visible and editable.
- Sheet structure supports both packaged content and homebrew corrections.

#### FR-7: Magic Entity Sheets

GMs and players can view and configure spells, ritual-related data, effects, and magic-relevant entities through Foundry-native sheets.

**Consequences:**

- Magic entities expose enough data for spellcasting, ritual spellcasting, and mishap workflows.
- Magic entity sheets support content authored by builders and user-created homebrew.

### 4.3 Core Resolution Automation

**Description:** Common mechanical resolution must be fast and trustworthy enough for live sessions. Chat output and sheet updates should make results visible, understandable, and correctable.

#### FR-8: Skill Tests

Users can initiate and resolve UESRPG skill tests from relevant sheets or workflows.

**Consequences:**

- Roll inputs, modifiers, target values, and outcomes are visible in chat or equivalent Foundry-native output.
- The system supports manual GM/player judgment where rules context requires it.

#### FR-9: Characteristic Tests

Users can initiate and resolve characteristic tests from relevant sheets or workflows.

**Consequences:**

- Characteristic test output is consistent with skill test output patterns.
- Default/missing data produces safe user-facing feedback rather than silent failure.

#### FR-10: Opposed Tests

Users can resolve opposed tests between eligible actors or entities.

**Consequences:**

- The workflow makes each participant, roll, target, and outcome visible.
- The GM can adjudicate or correct ambiguous outcomes.

#### FR-11: Chat And Roll Transparency

Rules automation produces Foundry-native chat or roll output that explains enough of the calculation for users to trust it.

**Consequences:**

- Users can see what was rolled, which key values were used, and the resulting outcome.
- Automation does not hide game state changes that affect live play.

### 4.4 Combat Support

**Description:** Combat support must cover the normal live-session loop: initiative, attacking, defending, and combat-relevant state changes. The goal is not to eliminate GM adjudication, but to make repeated combat operations quick and consistent. Rare combat exceptions may rely on clear manual adjudication or sheet edits for 1.0 if the core initiative, attack, defense, and combat state workflows cover normal play.

#### FR-12: Initiative Tracking

Users can roll or calculate initiative and use Foundry combat tracking for UESRPG encounters.

**Consequences:**

- Initiative integrates with Foundry's combat workflow where feasible.
- Combatants can be added, ordered, and managed without bespoke navigation replacing Foundry's tracker.

#### FR-13: Attack Workflow

Users can initiate attacks from actor or item data and produce visible attack results.

**Consequences:**

- Attack workflows use relevant actor, skill, weapon, and modifier data defined by the Rules Coverage Checklist.
- Users can resolve or recover from missing data during play.

#### FR-14: Defense Workflow

Users can resolve defense actions or responses required by UESRPG combat.

**Consequences:**

- Defense output is linked clearly enough to the triggering attack for table use.
- The GM can override or adjust outcomes where adjudication is required.

#### FR-15: Combat State Updates

The system supports updates to combat-relevant actor state where rules automation requires it.

**Consequences:**

- Automated updates are conservative, visible, and reversible through normal Foundry document editing.
- High-risk or ambiguous updates require user confirmation or clear manual control.

### 4.5 Magic, Alchemy, And Mishaps

**Description:** Magic is a core play area and must support casting, ritual casting, creation/configuration, and mishaps for spellcasting and alchemy. These flows should be rules-faithful while remaining usable at the table. Highly custom spell, ritual, alchemy, or enchanting cases may rely on clear manual fields and GM adjudication for 1.0 if normal play workflows are supported.

#### FR-16: Spellcasting Workflow

Users can cast spells using actor and spell data, resolve required rolls, and produce visible outcomes.

**Consequences:**

- Spellcasting output includes enough information for GM and player trust.
- Missing spell or actor data is surfaced clearly.

#### FR-17: Ritual Spellcasting Workflow

Users can resolve ritual spellcasting through a workflow appropriate to UESRPG rules complexity.

**Consequences:**

- Ritual-specific inputs and outcomes are distinct from ordinary spellcasting where the rules require it.
- The workflow keeps GM adjudication available for edge cases.

#### FR-18: Magical Mishaps

The system supports magical mishap resolution for spellcasting and alchemy.

**Consequences:**

- Mishap triggers and results are visible to users.
- Mishap table/content handling respects rights and provenance requirements.

#### FR-19: Alchemy Support

The system supports alchemy-related creation or resolution workflows needed for 1.0 play and content authoring.

**Consequences:**

- Alchemy outputs can be represented as structured Foundry entities when needed.
- Alchemy mishaps integrate with the same visibility expectations as magical mishaps.

### 4.6 Guided Workflows And Builders

**Description:** Guided workflows are not merely polish. They are both user-facing usability features and the practical authoring tools needed to create and maintain 1.0 System Content. Each builder should produce structured, editable Foundry data that can be packaged, reviewed, corrected, and reused.

#### FR-20: Character Creation Wizard

Users can create playable characters through a guided workflow that produces a valid character document.

**Consequences:**

- The wizard captures the minimum rules decisions needed to begin play, with ordered steps and validation rules defined by the Rules Coverage Checklist.
- The resulting character remains editable through the character sheet.

#### FR-21: Character Advancement Wizard

Users can advance characters through a guided workflow that applies or records advancement decisions.

**Consequences:**

- Advancement changes are visible and auditable through sheet data.
- The workflow prevents or warns about invalid advancement choices where rules can be encoded safely.

#### FR-22: Spell Creation Builder

Users and Greybard can create structured spell entities through a guided builder.

**Consequences:**

- Builder output is usable for spellcasting and compendium packaging.
- Manual correction remains possible on the resulting spell sheet.

#### FR-23: Enchanting Builder

Users and Greybard can create structured enchanted items or enchantment-related entities through a guided builder.

**Consequences:**

- Builder output supports both play use and packaged content creation.
- The builder distinguishes rules-required choices from descriptive/user-provided fields.

#### FR-24: Alchemy Builder

Users and Greybard can create structured alchemy outputs through a guided builder.

**Consequences:**

- Builder output can be used in play and packaged as System Content when appropriate.
- Mishap-relevant or effect-relevant data is captured structurally.

#### FR-25: Equipment Builders

Users and Greybard can create weapons, armor, and related equipment through guided builders.

**Consequences:**

- Builder output supports item sheets, combat workflows, inventory reference, and compendium packaging.
- The workflow supports common equipment creation without raw data editing as the normal path.

#### FR-26: Statblock Builder

GMs and Greybard can create statblocks through a guided builder.

**Consequences:**

- Builder output is usable in combat, tests, magic where relevant, and compendium packaging.
- The builder supports enough entity variation for typical 1.0 play.

#### FR-27: Builder Output Quality

All builders produce Foundry document data that is structurally valid, user-editable, and suitable for compendium inclusion when rights/provenance allow it.

**Consequences:**

- Builders are validated not only by UI completion but by opening, editing, using, and packaging the resulting documents.
- Builder-created content should not require routine hand-editing of raw JSON as the normal production workflow.

### 4.7 GM Tools

**Description:** GM tools should support common preparation and reward workflows without over-expanding into a full campaign-management product.

#### FR-28: XP Reward Support

GMs can calculate, record, or distribute basic XP rewards in a way that supports UESRPG session flow.

**Consequences:**

- The workflow is sufficient for common reward handling at 1.0.
- Advanced campaign analytics or progression planning are out of scope for 1.0.

#### FR-29: Treasure Tables

GMs can use treasure tables through Foundry-native roll table or equivalent workflows.

**Consequences:**

- Treasure outputs can reference structured items or clear result text where rights allow.
- Table content has provenance review before distribution.

#### FR-30: Artifact Generator

GMs can generate high-value loot or artifacts through a workflow suitable for UESRPG play.

**Consequences:**

- Generated outputs are understandable and editable by the GM.
- Any packaged generation tables or text comply with rights and AI-content constraints.

### 4.8 System Content And Compendia

**Description:** System Content is a product feature. The package should include broad, rights-cleared, human-authored, reviewed compendium content for other UESRPG groups to run with minimal setup. Content coverage depends on both authoring workflow readiness and legal/community/Foundry package constraints.

#### FR-31: Core Compendium Coverage

The 1.0 package includes broad, rights-cleared compendium coverage for the main entity types needed for typical play.

**Consequences:**

- Expected coverage includes items, equipment, spells, effects, statblocks, roll tables, and similar entities needed for play where rights and provenance allow distribution.
- Main entity types and minimum content counts are defined by the Rules Coverage Checklist.

#### FR-32: Content Provenance Review

Every distributed System Content entry has acceptable provenance and rights status before release.

**Consequences:**

- The package does not include unreviewed scraped, unauthorized, unclear-rights, or AI-generated prepared user-facing content.
- Rights/provenance status is tracked in a machine-readable Provenance Manifest sufficient to make release decisions.

#### FR-33: Content Build Workflow

System Content can be compiled, packaged, and validated through the project's compendium automation rather than hand-edited distribution artifacts.

**Consequences:**

- Source data and generated packs have a clear direction of truth.
- Pack compilation is verified as part of release readiness.

### 4.9 Validation And Release Readiness

**Description:** Build success is necessary but insufficient. Release readiness requires automated project checks plus manual Foundry validation of affected runtime workflows.

#### FR-34: Baseline Automated Verification

The project passes the existing baseline verification commands before 1.0 release.

**Consequences:**

- `npm run typecheck`, `npm run lint`, and `npm run build` are treated as required gates.
- New workflows do not weaken TypeScript strictness or rely on broad type erasure to pass.

#### FR-35: Manual Foundry Runtime Validation

Affected sheets, workflows, document types, migrations, compendia, and package assets are manually validated in a real Foundry environment before being called release-ready.

**Consequences:**

- Manual validation records the affected document type, workflow opened, world/data state used, expected result, actual result, and limitations.
- Light/dark Foundry theme behavior is checked for sheet/style changes.
- Release-blocking validation failures include broken core workflows, missing or unsafe document data, missing rights/provenance for distributed content, confusing builder output that cannot be corrected through sheets, missing onboarding for required workflows, and any runtime issue that prevents the balanced one-shot from being completed.

#### FR-36: 1.0 Minimal Handholding Gate

Before 1.0, at least one validation pass confirms that a group other than Greybard's own table can reasonably install, create or use needed entities, and run a representative balanced one-shot session flow with minimal handholding. `[ASSUMPTION: This may be simulated by Greybard initially if no external test group is available.]`

**Consequences:**

- The release is not considered ready solely because Greybard can operate it from memory.
- Missing instructions, confusing workflows, and incomplete content paths are treated as product gaps, not just documentation gaps.
- If no external test group is available, Greybard-simulated validation can support pre-release readiness, but 1.0 should still record the limitation and identify follow-up external validation as a post-release or release-candidate action.

#### FR-37: User Onboarding Documentation And Tutorials

The 1.0 package includes concise onboarding support for users who are not personally guided by Greybard.

**Consequences:**

- Documentation includes an installation/setup quickstart, core play workflow guide, GM content workflow notes, and known release limitations.
- Foundry's Tutorial API is used to walk users through required common system workflows in the VTT.
- Documentation and tutorials explain normal workflows without duplicating the PRD as public-facing product copy.

## 5. Cross-Cutting Non-Functional Requirements

- **NFR-1: Foundry-native behavior.** The system preserves Foundry document, sheet, roll, chat, combat, compendium, and settings paradigms.
- **NFR-2: Live-play speed.** Common rolls and combat/magic actions should support repeated live-session use without requiring raw data editing or external lookup for normal cases.
- **NFR-3: Transparency.** Automated rolls and updates expose enough inputs and outcomes for GM/player trust.
- **NFR-4: Editability.** GMs can correct, extend, or homebrew actors, items, spells, statblocks, and generated/builder-created content through understandable sheets.
- **NFR-5: Accessibility and legibility.** Sheets and chat cards prioritize readable contrast, clear form structure, keyboard/mouse usability consistent with Foundry, and support for both light and dark Foundry themes.
- **NFR-6: Packaging reliability.** Runtime assets, templates, styles, localization, packs, and metadata are copied and packaged consistently through the existing build workflow.
- **NFR-7: Type and data safety.** Data models use explicit schemas and validation constraints where feasible; type gaps are isolated rather than normalized through broad `any` expansion.
- **NFR-8: Rights and AI-content compliance.** Prepared user-facing package content is human-authored or otherwise rights-cleared and is not generated by AI unless a future explicit policy-compliant process permits it.
- **NFR-9: Learnability.** Common workflows are discoverable through concise written guidance and Foundry-native tutorials rather than relying on personal instruction.

## 6. Constraints And Guardrails

- Target Foundry runtime is Foundry VTT 14.
- Runtime source is TypeScript and must follow the existing Vite/Foundry package architecture.
- Actor and item type changes require coordinated updates across constants, data models, registration, sheets, templates, localization, package metadata, and build-copy rules.
- User-facing labels and template text require localization coverage.
- Compendium source vs generated-pack direction must remain explicit; generated distribution artifacts should not be hand-edited as the source of truth.
- Rules interpretation and coverage decisions come from Greybard and are captured in the dedicated Rules Coverage Checklist unless a later authoritative source is named.
- Foundry's AI Content Policy and rights constraints are release-blocking for bundled content.

## 7. MVP / 1.0 Scope

### 7.1 In Scope For 1.0

- Foundry VTT 14 system package registration and runtime contract.
- Character, statblock, item/equipment, and magic-relevant document sheets.
- Skill tests, characteristic tests, opposed tests, roll/chat transparency.
- Combat support: initiative, attacking, defending, and conservative combat state updates.
- Spellcasting, ritual spellcasting, magical mishaps, and alchemy support.
- Guided workflows/builders for character creation, advancement, spell creation, enchanting, alchemy, equipment, and statblocks.
- GM tools: basic XP reward support, treasure tables, artifact generator.
- Rights-cleared System Content for main entity types needed for typical play.
- Baseline automated checks and manual Foundry runtime validation.
- User onboarding through quickstart/workflow documentation and Foundry Tutorial API guidance for common workflows.

### 7.2 Deferrable From 1.0 If Needed

- Advanced wizard polish beyond the minimum needed for content authoring and external usability.
- Rare rules edge cases that can be handled through clear manual sheet edits without breaking typical play.
- Advanced campaign-management features beyond core reward, treasure, and encounter preparation support.
- Deep analytics, optimization tools, or automation that would obscure GM judgment.
- Broad third-party integration surface beyond intentional `game.uesrpg` exports.

### 7.3 Release Gate

1.0 is ready when another UESRPG group can install UESRPG Rebuilt, create or use the main required entities, resolve common play workflows, access broad, rights-cleared System Content for typical preparation and play, and recover from normal missing-data or correction cases using quickstart/workflow documentation and Foundry-native tutorial guidance rather than Greybard personally guiding the table.

### 7.4 Release Cut Ladder

If 1.0 scope pressure appears, cut or degrade scope in this order:

1. Defer ornamental wizard polish, extra tutorial depth, and advanced visual refinement that does not affect readability or required workflow completion.
2. Narrow rare-edge automation to documented manual fallbacks for uncommon combat, statblock, magic, alchemy, or enchanting cases.
3. Reduce compendium breadth only where rights/provenance, authoring time, or review quality would otherwise block release; keep broad, rights-cleared coverage for the balanced one-shot and common campaign preparation.
4. Defer advanced GM tools beyond basic XP, treasure, and artifact-generation workflows if core session flow remains intact.
5. Do not cut package correctness, core sheets, core roll/test/combat/magic workflows, provenance review, baseline automated verification, or manual Foundry validation.

## 8. Non-Goals

- Replace Foundry's native document, sheet, chat, roll, combat, or compendium paradigms with a separate application model.
- Ship a generic Elder Scrolls lore/rules database outside the UESRPG 3e v4 system scope.
- Bundle content that is not rights-cleared, human-authored, or otherwise permitted for distribution.
- Use AI-generated prepared user-facing rules, lore, descriptions, compendium entries, visual assets, audio, or similar package content.
- Treat build success alone as proof of Foundry runtime correctness.
- Make every possible UESRPG edge case fully automated before 1.0 if a clear manual path preserves typical play.

## 9. Success Metrics

### Primary

- **SM-1: Representative session readiness.** A GM can prepare and run a representative balanced one-shot UESRPG session using actors, items, rolls, combat tools, magic support, GM tools, and compendium content. Validates FR-4 through FR-37.
- **SM-2: Minimal handholding installability.** A user outside Greybard's own table can install the package and complete core creation/play workflows with no personal explanation beyond normal package documentation, Foundry-native tutorials, and UI affordances. Validates FR-20 through FR-37.
- **SM-3: Builder-to-content viability.** Greybard can create package-ready structured System Content through builders for the required 1.0 entity types without routine raw JSON hand-editing. Validates FR-20 through FR-33.

**Measurement procedure:** SM-1 is measured by completing the balanced one-shot scenario with recorded setup, skill/social resolution, combat, magic, treasure/rewards, and compendium-use evidence. SM-2 is measured by an outside user where feasible, or a documented simulated pass if no external group is available, completing installation and core workflows using only package docs, tutorials, and UI affordances. SM-3 is measured by creating representative content with each required builder, opening and editing the resulting documents, using them in relevant workflows, and compiling eligible content into packs with provenance recorded.

### Secondary

- **SM-4: Live-play friction reduction.** Common rolls, combat actions, magic resolution, and sheet references are clear and efficient enough that they do not routinely interrupt live scenes. Validates FR-8 through FR-19.
- **SM-5: Sheet usability.** Character, statblock, item/equipment, and magic sheets remain legible, stylish, and useful with default, missing, and filled data states. Validates FR-4 through FR-7 and NFR-5.
- **SM-6: Release verification completeness.** Typecheck, lint, build, pack compilation, and documented manual Foundry validation pass for release-relevant workflows. Validates FR-34 and FR-35.

**Pass/fail evidence:** A metric passes only when required workflow evidence is recorded and no release-blocking validation failure remains open. Non-blocking limitations may ship only if they are documented, have a clear user workaround, and do not prevent the balanced one-shot or common campaign preparation from succeeding.

### Counter-Metrics

- **SM-C1: Do not optimize for maximum automation.** Automation that hides state, blocks GM judgment, or makes correction harder is a regression even if it reduces clicks.
- **SM-C2: Do not optimize for wizard polish over playable core.** Wizard work is required where it enables content authoring and external usability; ornamental polish that delays core playability should be deferred.
- **SM-C3: Do not optimize for content volume without provenance.** More bundled content is not valuable if rights, provenance, or maintainability are unclear.

## 10. Resolved Open Questions

1. The exact Playable Core fields, rolls, formulas, edge cases, builder validation rules, content counts, and manual-fallback cases are defined in a dedicated Rules Coverage Checklist artifact referenced by this PRD.
2. Minimum 1.0 compendium coverage targets broad, rights-cleared rules coverage, not only seed/example content. Exact entity types and counts are defined by the Rules Coverage Checklist.
3. System Content release decisions use a machine-readable Provenance Manifest as the required tracking format.
4. The 1.0 minimal-handholding validation pass uses a representative balanced one-shot covering setup, skill/social resolution, combat, magic, treasure/rewards, and compendium use.
5. Rare rules edge cases, highly custom magic/alchemy/enchanting cases, and rare combat exceptions can rely on clear manual sheet edits or GM adjudication for 1.0 if core workflows cover normal play.
6. Minimal-handholding support requires concise quickstart/workflow documentation plus Foundry Tutorial API guidance for common workflows.

## 11. Assumptions Index

- §4.9 FR-36: Minimal-handholding validation may be simulated by Greybard initially if no external test group is available.
- §6: Rules interpretation and coverage decisions come from Greybard unless a later authoritative source is named.
