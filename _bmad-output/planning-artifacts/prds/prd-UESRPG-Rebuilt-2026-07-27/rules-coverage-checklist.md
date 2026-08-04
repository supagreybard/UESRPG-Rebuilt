---
title: UESRPG Rebuilt Rules Coverage Checklist
status: complete
created: 2026-07-29
updated: 2026-07-29
source_prd: _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md
source_decisions: _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-decisions.md
---

# Rules Coverage Checklist

This checklist defines the 1.0 Playable Core rules coverage required by the finalized PRD. It translates PRD scope into concrete coverage checks for sheets, workflows, builders, content, provenance, manual fallbacks, and release validation.

## 1. Checklist Legend

Use these statuses while planning and validating implementation:

- `[ ]` Not started or not yet verified
- `[~]` Partial coverage; follow-up needed
- `[x]` Covered and verified
- `[M]` Manual fallback accepted for 1.0
- `[D]` Deferred beyond 1.0 or deferred until deeper rule analysis
- `[F]` Post-checklist follow-up; not blocking this checklist

## 2. 1.0 Release Gate

1.0 is ready only when another UESRPG group can install UESRPG Rebuilt, create or use the main required entities, resolve common play workflows, access broad rights-cleared System Content for typical preparation and play, and recover from normal missing-data or correction cases using quickstart/workflow documentation and Foundry-native tutorial guidance rather than Greybard personally guiding the table.

## 3. Balanced One-Shot Minimum

The representative balanced one-shot validation scenario must include:

- `[ ]` Character creation or prebuilt character use
- `[ ]` At least one skill/social resolution
- `[ ]` At least one characteristic test
- `[ ]` At least one opposed test
- `[ ]` Initiative
- `[ ]` Attack and defense
- `[ ]` Combat state update, such as damage, wounds, fatigue, or equivalent
- `[ ]` Spellcasting
- `[ ]` Ritual spellcasting
- `[ ]` Magical or alchemical mishap
- `[ ]` Alchemy or consumable use
- `[ ]` Treasure or artifact reward
- `[ ]` XP reward
- `[ ]` Compendium content use

## 4. Character Sheet Coverage

Character sheets must expose, edit, and safely render these datapoints:

- `[ ]` Core Characteristics
- `[ ]` Skills
- `[ ]` Derived resources/state
- `[ ]` Race
- `[ ]` Birthsign
- `[ ]` Purchased Character Advancements & XP
- `[ ]` Equipment/inventory
- `[ ]` Spells and magic capability
- `[ ]` Active Effects/Conditions
- `[ ]` Notes/Biography
- `[ ]` GM/Private notes

Validation expectations:

- `[ ]` Default character data renders safely.
- `[ ]` Missing or incomplete data renders safe user-facing feedback.
- `[ ]` Filled character data renders legibly.
- `[ ]` Common rolls are reachable from the sheet without raw data entry.
- `[ ]` Sheet supports normal Foundry document editing and permissions.

Not separate 1.0 required categories unless later re-added:

- `[D]` Culture/background
- `[D]` Class/profession/archetype
- `[D]` Weapon/armor links as a separate category; these may live under equipment/inventory

## 5. Statblock Sheet Coverage

Statblocks must expose, edit, and safely render NPC/creature-focused data. Contents differ from character fields, but coverage categories are:

- `[ ]` Core Characteristics
- `[ ]` Skills or relevant test values
- `[ ]` Derived resources/state
- `[ ]` Creature/NPC type or role
- `[ ]` Equipment/inventory, where applicable
- `[ ]` Weapons/attacks
- `[ ]` Armor/defenses
- `[ ]` Spells and magic capability, where applicable
- `[ ]` Active Effects/Conditions
- `[ ]` Combat notes/tactics
- `[ ]` Notes/description
- `[ ]` GM/private notes

Validation expectations:

- `[ ]` Default statblock data renders safely.
- `[ ]` Missing or incomplete data renders safe user-facing feedback.
- `[ ]` Filled statblock data renders legibly.
- `[ ]` Statblock data can be used in relevant tests and combat workflows.
- `[ ]` Statblocks can be authored manually or through the statblock builder.

## 6. Item And Equipment Coverage

Chapter 7 item categories to represent for 1.0:

- `[ ]` Weapons
- `[ ]` Armor
- `[ ]` Shields
- `[ ]` Food & Drink
- `[ ]` Adventuring Gear
- `[ ]` Tools
- `[ ]` Clothing
- `[ ]` Jewelry
- `[ ]` Arcane Items, such as soul gems, enchanted items, spell scrolls
- `[ ]` Potions & Poisons
- `[ ]` Other items, such as instruments and game sets

Each item/equipment sheet must support these datapoints where applicable:

- `[ ]` Name and type/category
- `[ ]` Description/notes
- `[ ]` ENC (Encumbrance)
- `[ ]` Cost
- `[ ]` Quality: Inferior, Common, Superior
- `[ ]` Equipped state where applicable
- `[ ]` Combat and other usage stats
- `[ ]` Enchantments or other effects applied
- `[ ]` GM/Private notes where useful

Validation expectations:

- `[ ]` Major item categories have usable sheets or sheet sections.
- `[ ]` Equipment data needed for rolls, combat, inventory, and reference is visible and editable.
- `[ ]` Packaged and homebrew items can be corrected through sheets.

## 7. Magic Entity Coverage

### 7.1 Spells And Spell Scrolls

Spells and spell scrolls must support:

- `[ ]` Name
- `[ ]` Description
- `[ ]` School
- `[ ]` Spell Attributes
- `[ ]` Spell Level
- `[ ]` Magicka Cost
- `[ ]` Spell Strength
- `[ ]` Spell Description
- `[ ]` Mechanically relevant fields, such as damage, AR, and similar rule fields

Validation expectations:

- `[ ]` Spell data is usable in spellcasting workflows.
- `[ ]` Missing spell or actor data is surfaced clearly.
- `[ ]` Spell scrolls are represented as arcane items or otherwise linked to spell data.

### 7.2 Rituals

Rituals must support:

- `[ ]` Name
- `[ ]` Description
- `[M]` Manual player plus GM resolution for 1.0

Validation expectations:

- `[ ]` Ritual entities can be opened, read, edited, and referenced during play.
- `[M]` Ritual mechanics may remain intentionally simple for 1.0.

### 7.3 Enchantments

Enchantments must support:

- `[ ]` Name
- `[ ]` Description
- `[ ]` Type: Cast, Strike, Constant
- `[ ]` Linkage to another entity, usually an item with sufficient EL (Enchantment Level)
- `[D]` Deeper enchantment mechanical analysis deferred until focused implementation

Validation expectations:

- `[ ]` Enchantment data can be represented and reviewed.
- `[M]` Complex enchantment behavior may rely on sheet fields and GM adjudication for 1.0.

### 7.4 Alchemy

Alchemy entities must support:

- `[ ]` Name
- `[ ]` Description
- `[ ]` Type: Potion, Poison
- `[D]` Deeper alchemy mechanical analysis deferred until focused implementation

Validation expectations:

- `[ ]` Potion and poison entities can be represented and reviewed.
- `[M]` Complex alchemy behavior may rely on sheet fields and GM adjudication for 1.0.

## 8. Core Test Mechanics Coverage

### 8.1 Baseline Test Rules

- `[ ]` Tests use `d100 <= target number`.
- `[ ]` Target number is usually `1-100`, but can exceed `100`.
- `[ ]` Modifiers adjust the target number, not the roll.
- `[ ]` Multiple modifiers stack into one net modifier.
- `[ ]` GM may apply modifiers beyond `+/-40`, including `+/-5` increments.

### 8.2 Difficulty Modifiers

| Status | Difficulty | Modifier |
| --- | --- | ---: |
| `[ ]` | Effortless | +40 |
| `[ ]` | Simple | +30 |
| `[ ]` | Easy | +20 |
| `[ ]` | Ordinary | +10 |
| `[ ]` | Average | +0 |
| `[ ]` | Challenging | -10 |
| `[ ]` | Difficult | -20 |
| `[ ]` | Hard | -30 |
| `[ ]` | Very Hard | -40 |

### 8.3 Degrees

- `[ ]` DoS for success equals the tens digit of the `d100` result.
- `[ ]` Successful tests always have at least `1` DoS.
- `[ ]` DoF for failure equals `1 + tens digit of (roll - target number)`.
- `[ ]` Failed tests always have at least `1` DoF.
- `[ ]` If target number is over `100`, add the tens digit of the target number to DoS.

Rules note: the provided rules text says a character "always fails with at least one degree of success," but context indicates this should mean at least one degree of failure.

### 8.4 Criticals

Player characters:

- `[ ]` Critical success if the roll matches one of the character's Lucky Numbers, regardless of TN.
- `[ ]` Critical failure if the roll matches one of the character's Unlucky Numbers, regardless of TN.
- `[ ]` Lucky Numbers count equals Luck Bonus.
- `[ ]` Unlucky Numbers count equals `5 - Luck Bonus`.

NPCs and creatures:

- `[ ]` Critical success on `1-3`, unless the statblock says otherwise.
- `[ ]` Critical failure on `98-100`, unless the statblock says otherwise.

### 8.5 Test Types

- `[ ]` Standard Tests
- `[ ]` Teamwork
- `[ ]` Group Tests
- `[ ]` Simple Tests
- `[ ]` Opposed Tests
- `[ ]` Extended Tests
- `[ ]` Characteristic Tests
- `[ ]` Skill Tests
- `[ ]` Limited Skill Tests

### 8.6 Characteristic And Skill Test Formulae

- `[ ]` Characteristic Test TN = characteristic score + difficulty/modifiers.
- `[ ]` Skill Test TN = chosen or GM-required governing characteristic + skill bonus + difficulty/modifiers.
- `[ ]` Skill bonus = `10 * skill rank`.
- `[ ]` Untrained skill penalty = `-20`.
- `[ ]` Limited Skill Test caps the primary skill rank at the limiting skill rank.

### 8.7 Opposed Test Rules

- `[ ]` If only one participant succeeds, that participant wins.
- `[ ]` If both fail, nobody wins.
- `[ ]` If both succeed, tie by default, usually broken by comparing DoS.
- `[ ]` Further ties may be rerolled or left tied by GM decision.
- `[ ]` Critical success wins automatically unless both roll critical successes.
- `[ ]` If both critically succeed, resolve by roll-off.

### 8.8 Test Automation Level

- `[ ]` Fully automated: Standard Tests, Characteristic Tests, Skill Tests
- `[ ]` Semi-automated: Opposed Tests, Group Tests, Extended Tests, Limited Skill Tests
- `[M]` Manual with support text/chat output: Teamwork, Simple Tests
- `[ ]` Special-case automated where relevant: critical success/failure detection, DoS/DoF calculation, difficulty modifier selection

### 8.9 Required Roll/Chat Transparency

Each automated or semi-automated roll must show:

- `[ ]` Actor or source
- `[ ]` Roll type
- `[ ]` Inputs used
- `[ ]` Target value where applicable
- `[ ]` Modifiers where applicable
- `[ ]` Raw roll
- `[ ]` Outcome/result
- `[ ]` Critical result where applicable
- `[ ]` DoS/DoF where applicable
- `[ ]` Missing-data warning when needed
- `[ ]` Manual adjudication note when the system cannot decide

## 9. Combat Coverage

The 1.0 combat coverage list is:

- `[ ]` Initiative roll/calculation
- `[ ]` Combatant creation and ordering through Foundry combat tracker
- `[ ]` Attack workflow from actor plus weapon data
- `[ ]` Defense workflow linked or clearly associated with an attack
- `[ ]` Attack/defense DoS and critical handling
- `[ ]` Damage or injury resolution support
- `[ ]` Armor/AR handling, if applicable
- `[ ]` Shield handling, if applicable
- `[ ]` Weapon/item quality effects, if applicable
- `[ ]` Combat-relevant active effects/conditions
- `[ ]` Conservative combat state updates, with visible/reversible changes
- `[ ]` Manual GM override for ambiguous cases

Validation expectations:

- `[ ]` Combat workflows remain Foundry-native and integrate with the combat tracker where feasible.
- `[ ]` Attack and defense output is clear enough for table use.
- `[ ]` Missing combat data can be resolved or recovered from during play.
- `[ ]` High-risk or ambiguous state updates require confirmation or clear manual control.

## 10. Magic, Mishap, And Alchemy Workflow Coverage

- `[ ]` Spellcasting workflow uses actor and spell data.
- `[ ]` Spellcasting output includes enough information for GM and player trust.
- `[ ]` Missing spell or actor data is surfaced clearly.
- `[M]` Ritual spellcasting can be manually resolved with ritual entity support for 1.0.
- `[ ]` Magical mishap triggers and results are visible to users.
- `[ ]` Alchemical mishap triggers and results are visible to users where supported.
- `[ ]` Mishap table/content handling respects rights and provenance requirements.
- `[M]` Highly custom spell, ritual, alchemy, or enchanting cases may rely on clear manual fields and GM adjudication.

## 11. Guided Workflow And Builder Coverage

The 1.0 builder and workflow set is:

- `[ ]` Character Creation Wizard
- `[ ]` Character Advancement Wizard
- `[ ]` Spell Creation Builder
- `[ ]` Enchanting Builder
- `[ ]` Alchemy Builder
- `[ ]` Equipment Builders
- `[ ]` Statblock Builder

Each builder must be validated against these rules:

- `[ ]` Captures all required fields for its entity type
- `[ ]` Uses ordered steps where rules decisions depend on earlier decisions
- `[ ]` Validates required inputs before document creation
- `[ ]` Produces a valid Foundry document
- `[ ]` Resulting document opens on its sheet
- `[ ]` Resulting document can be edited after creation
- `[ ]` Resulting document can be used in the relevant play workflow where applicable
- `[ ]` Resulting document can be packaged into compendia when rights/provenance allow
- `[ ]` Does not require routine raw JSON editing
- `[ ]` Provides clear manual fallback or GM note fields for deferred edge cases

Automation/depth split:

- `[ ]` Required full builder: character creation, character advancement, spell creation, equipment, statblock
- `[M]` Minimal/deferred builder: enchanting, alchemy
- `[M]` Manual/simple entity workflow: rituals

## 12. GM Tools Coverage

The 1.0 GM tool coverage is:

- `[ ]` XP reward support
- `[ ]` Treasure table rolling
- `[ ]` Artifact generation
- `[ ]` Output that can reference structured items where available
- `[ ]` Output that can use clear text results where rights/content limits require it
- `[ ]` GM-editable generated results
- `[ ]` Provenance-reviewed packaged tables/inputs
- `[ ]` Manual GM adjustment for campaign-specific rewards or treasure

Depth split:

- `[ ]` XP rewards: simple calculate/record/distribute support, not campaign analytics
- `[ ]` Treasure tables: Foundry roll table or equivalent workflow
- `[ ]` Artifact generator: understandable editable output, with deeper automation optional

## 13. System Content And Compendium Coverage

The 1.0 system content categories are:

- `[ ]` Character creation reference content, if needed by builders
- `[ ]` Birthsigns
- `[ ]` Weapons
- `[ ]` Armor
- `[ ]` Shields
- `[ ]` Food & Drink
- `[ ]` Adventuring Gear
- `[ ]` Tools
- `[ ]` Clothing
- `[ ]` Jewelry
- `[ ]` Arcane Items
- `[ ]` Potions & Poisons
- `[ ]` Other items
- `[ ]` Spells
- `[ ]` Spell scrolls
- `[ ]` Rituals
- `[ ]` Enchantments
- `[ ]` Alchemy outputs
- `[ ]` Effects/conditions
- `[ ]` Statblocks
- `[ ]` Treasure tables
- `[ ]` Mishap tables
- `[ ]` Artifact-generation tables or inputs
- `[ ]` XP/reward reference content, if needed

The 1.0 count strategy is:

- `[ ]` Required: enough content to run the balanced one-shot
- `[ ]` Required: enough common equipment, spells, and statblocks to support typical campaign preparation
- `[ ]` Required: all packaged content has provenance manifest entries
- `[F]` Exact numerical counts are a post-checklist content-audit follow-up

## 14. Provenance Manifest Coverage

Each distributed System Content entry requires a Provenance Manifest entry with:

- `[ ]` Pack ID
- `[ ]` Entity ID
- `[ ]` Entity name
- `[ ]` Entity type/category
- `[ ]` Source reference or origin
- `[ ]` Rights status
- `[ ]` Human author/reviewer
- `[ ]` Review date
- `[ ]` Distribution allowed: yes/no
- `[ ]` Notes or limitation
- `[ ]` Related builder/source file, if applicable

Release-blocking provenance rules:

- `[ ]` No unreviewed packaged content
- `[ ]` No unclear-rights packaged content
- `[ ]` No unauthorized scraped content
- `[ ]` No AI-generated prepared user-facing package content
- `[ ]` Generated packs are not hand-edited as source of truth
- `[ ]` Pack compilation must pass before release

## 15. Manual Fallback Boundaries

Manual fallback is accepted for 1.0 only when it satisfies these boundaries:

- `[M]` Allowed for rare rules edge cases.
- `[M]` Allowed for highly custom rituals, enchantments, alchemy, and unusual magic.
- `[M]` Allowed for ambiguous combat outcomes or rare combat exceptions.
- `[M]` Allowed where rights/content constraints prevent packaged table text.
- `[M]` Allowed when GM judgment is explicitly required by the rules.
- `[ ]` Must be visible or discoverable in the relevant sheet, chat output, workflow text, or documentation.
- `[ ]` Must preserve normal playability for the balanced one-shot.
- `[ ]` Must not require routine raw JSON editing.
- `[ ]` Must not hide failed automation or missing required data.
- `[ ]` Must not replace core skill, characteristic, attack, defense, initiative, spellcasting, sheet, builder, or content workflows.

## 16. Release Validation Evidence

Every release-relevant area needs evidence in this form:

- `[ ]` Area or requirement validated
- `[ ]` Foundry version
- `[ ]` World/test data used
- `[ ]` Actor/item/statblock/entity used
- `[ ]` Workflow opened or action performed
- `[ ]` Expected result
- `[ ]` Actual result
- `[ ]` Pass/fail/blocker status
- `[ ]` Notes or limitation
- `[ ]` Follow-up issue/story if not passing

Required validation passes:

- `[ ]` `npm run typecheck`
- `[ ]` `npm run lint`
- `[ ]` `npm run build`
- `[ ]` Install/open system in Foundry VTT 14
- `[ ]` Character sheet default/missing/filled states
- `[ ]` Statblock sheet default/missing/filled states
- `[ ]` Item/equipment sheets for major categories
- `[ ]` Spell/magic sheets
- `[ ]` Core test workflows
- `[ ]` Combat workflow
- `[ ]` Magic/mishap workflow
- `[ ]` Builder output open/edit/use/package checks
- `[ ]` Compendium pack compile/use checks
- `[ ]` Provenance manifest review
- `[ ]` Balanced one-shot pass
- `[ ]` Minimal-handholding pass, external if feasible or Greybard-simulated with limitation recorded
- `[ ]` Documentation/tutorial pass

## 17. Documentation And Tutorial Coverage

1.0 onboarding support must include:

- `[ ]` Installation/setup quickstart
- `[ ]` Core play workflow guide
- `[ ]` GM content workflow notes
- `[ ]` Known release limitations
- `[ ]` Foundry Tutorial API guidance for required common workflows
- `[ ]` Documentation that explains normal workflows without duplicating the PRD as public-facing product copy

## 18. Post-Checklist Follow-Ups

These items are accepted as follow-up work and do not block this checklist from being complete:

- `[F]` Exact numerical compendium content counts after content audit
- `[F]` Exact field-level breakdown for every derived resource/state value
- `[F]` Deeper enchantment mechanics
- `[F]` Deeper alchemy mechanics
- `[F]` Deeper ritual mechanics if rituals become automated beyond manual support
- `[F]` Detailed combat sub-procedures beyond the accepted 1.0 combat coverage list
