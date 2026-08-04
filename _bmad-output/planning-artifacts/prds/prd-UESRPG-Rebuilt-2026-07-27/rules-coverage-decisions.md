---
title: UESRPG Rebuilt Rules Coverage Decisions
status: complete
created: 2026-07-29
updated: 2026-07-29
source_prd: _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md
---

# Rules Coverage Decisions

This document records rules coverage decisions made before drafting the full Rules Coverage Checklist. It is a working decision log, not the final checklist.

## 1. Balanced One-Shot Minimum

The representative balanced one-shot validation scenario starts with this minimum coverage:

- Character creation or prebuilt character use
- At least one skill/social resolution
- At least one characteristic test
- At least one opposed test
- Initiative
- Attack and defense
- Combat state update, such as damage, wounds, fatigue, or equivalent
- Spellcasting
- Ritual spellcasting
- Magical or alchemical mishap
- Alchemy or consumable use
- Treasure or artifact reward
- XP reward
- Compendium content use

## 2. Character Sheet Data Coverage

Character sheets must cover these datapoints for 1.0:

- Core Characteristics
- Skills
- Derived resources/state
- Race
- Birthsign
- Purchased Character Advancements & XP
- Equipment/inventory
- Spells and magic capability
- Active Effects/Conditions
- Notes/Biography
- GM/Private notes

The following earlier candidate categories are not separate required categories unless later re-added:

- Culture/background
- Class/profession/archetype
- Weapon/armor links as a separate category; these may live under equipment/inventory

## 3. Statblock Data Coverage

Statblocks use an NPC/creature-focused set of categories. The contents differ from character fields, but the 1.0 coverage categories are:

- Core Characteristics
- Skills or relevant test values
- Derived resources/state
- Creature/NPC type or role
- Equipment/inventory, where applicable
- Weapons/attacks
- Armor/defenses
- Spells and magic capability, where applicable
- Active Effects/Conditions
- Combat notes/tactics
- Notes/description
- GM/private notes

## 4. Item And Equipment Data Coverage

Chapter 7 item categories to represent for 1.0 are:

- Weapons
- Armor
- Shields
- Food & Drink
- Adventuring Gear
- Tools
- Clothing
- Jewelry
- Arcane Items, such as soul gems, enchanted items, spell scrolls
- Potions & Poisons
- Other items, such as instruments and game sets

Each item/equipment sheet needs these datapoints where applicable:

- Name and type/category
- Description/notes
- ENC (Encumbrance)
- Cost
- Quality: Inferior, Common, Superior
- Equipped state where applicable
- Combat and other usage stats
- Enchantments or other effects applied
- GM/Private notes where useful

## 5. Magic Entity Data Coverage

### Spells And Spell Scrolls

Spells and spell scrolls require:

- Name
- Description
- School
- Spell Attributes
- Spell Level
- Magicka Cost
- Spell Strength
- Spell Description
- Mechanically relevant fields, such as damage, AR, and similar rule fields

### Rituals

Rituals require:

- Name
- Description

Rituals may be mechanically simple for 1.0 and manually resolved by player plus GM.

### Enchantments

Enchantments require:

- Name
- Description
- Type: Cast, Strike, Constant

Further enchantment mechanical analysis is deferred until enchantments are ready for focused implementation. Enchantments are always tied to another entity, usually an item with sufficient EL (Enchantment Level).

### Alchemy

Alchemy entities require:

- Name
- Description
- Type: Potion, Poison

Further alchemy mechanical analysis is deferred until alchemy is ready for focused implementation.

## 6. Core Test Mechanics

### Baseline Test Rules

- Tests use `d100 <= target number`.
- Target number is usually `1-100`, but can exceed `100`.
- Modifiers adjust the target number, not the roll.
- Multiple modifiers stack into one net modifier.
- GM may apply modifiers beyond `+/-40`, including `+/-5` increments.

### Difficulty Modifiers

| Difficulty | Modifier |
| --- | ---: |
| Effortless | +40 |
| Simple | +30 |
| Easy | +20 |
| Ordinary | +10 |
| Average | +0 |
| Challenging | -10 |
| Difficult | -20 |
| Hard | -30 |
| Very Hard | -40 |

### Degrees

- DoS for success equals the tens digit of the `d100` result.
- Successful tests always have at least `1` DoS.
- DoF for failure equals `1 + tens digit of (roll - target number)`.
- Failed tests always have at least `1` DoF.
- If target number is over `100`, add the tens digit of the target number to DoS.

Note: the provided rules text says a character "always fails with at least one degree of success," but the context indicates this should mean at least one degree of failure.

### Criticals

Player characters:

- Critical success if the roll matches one of the character's Lucky Numbers, regardless of TN.
- Critical failure if the roll matches one of the character's Unlucky Numbers, regardless of TN.
- Lucky Numbers count equals Luck Bonus.
- Unlucky Numbers count equals `5 - Luck Bonus`.

NPCs and creatures:

- Critical success on `1-3`, unless the statblock says otherwise.
- Critical failure on `98-100`, unless the statblock says otherwise.

### Test Types

The checklist must cover:

- Standard Tests
- Teamwork
- Group Tests
- Simple Tests
- Opposed Tests
- Extended Tests
- Characteristic Tests
- Skill Tests
- Limited Skill Tests

### Characteristic And Skill Test Formulae

- Characteristic Test TN = characteristic score + difficulty/modifiers.
- Skill Test TN = chosen or GM-required governing characteristic + skill bonus + difficulty/modifiers.
- Skill bonus = `10 * skill rank`.
- Untrained skill penalty = `-20`.
- Limited Skill Test caps the primary skill rank at the limiting skill rank.

### Opposed Test Rules

- If only one participant succeeds, that participant wins.
- If both fail, nobody wins.
- If both succeed, tie by default, usually broken by comparing DoS.
- Further ties may be rerolled or left tied by GM decision.
- Critical success wins automatically unless both roll critical successes.
- If both critically succeed, resolve by roll-off.

## 7. Test Automation Level

The starting automation split for 1.0 is:

- Fully automated: Standard Tests, Characteristic Tests, Skill Tests
- Semi-automated: Opposed Tests, Group Tests, Extended Tests, Limited Skill Tests
- Manual with support text/chat output: Teamwork, Simple Tests
- Special-case automated where relevant: critical success/failure detection, DoS/DoF calculation, difficulty modifier selection

## 8. Combat Coverage

The 1.0 combat coverage list is:

- Initiative roll/calculation
- Combatant creation and ordering through Foundry combat tracker
- Attack workflow from actor plus weapon data
- Defense workflow linked or clearly associated with an attack
- Attack/defense DoS and critical handling
- Damage or injury resolution support
- Armor/AR handling, if applicable
- Shield handling, if applicable
- Weapon/item quality effects, if applicable
- Combat-relevant active effects/conditions
- Conservative combat state updates, with visible/reversible changes
- Manual GM override for ambiguous cases

## 9. Guided Workflow And Builder Coverage

The 1.0 builder and workflow set is:

- Character Creation Wizard
- Character Advancement Wizard
- Spell Creation Builder
- Enchanting Builder
- Alchemy Builder
- Equipment Builders
- Statblock Builder

Each builder must be validated against these rules:

- Captures all required fields for its entity type
- Uses ordered steps where rules decisions depend on earlier decisions
- Validates required inputs before document creation
- Produces a valid Foundry document
- Resulting document opens on its sheet
- Resulting document can be edited after creation
- Resulting document can be used in the relevant play workflow where applicable
- Resulting document can be packaged into compendia when rights/provenance allow
- Does not require routine raw JSON editing
- Provides clear manual fallback or GM note fields for deferred edge cases

The starting automation/depth split is:

- Required full builder: character creation, character advancement, spell creation, equipment, statblock
- Minimal/deferred builder: enchanting, alchemy
- Manual/simple entity workflow: rituals

## 10. System Content And Compendium Coverage

The 1.0 system content categories are:

- Character creation reference content, if needed by builders
- Birthsigns
- Weapons
- Armor
- Shields
- Food & Drink
- Adventuring Gear
- Tools
- Clothing
- Jewelry
- Arcane Items
- Potions & Poisons
- Other items
- Spells
- Spell scrolls
- Rituals
- Enchantments
- Alchemy outputs
- Effects/conditions
- Statblocks
- Treasure tables
- Mishap tables
- Artifact-generation tables or inputs
- XP/reward reference content, if needed

The 1.0 count strategy is:

- Required: enough content to run the balanced one-shot
- Required: enough common equipment, spells, and statblocks to support typical campaign preparation
- Required: all packaged content has provenance manifest entries
- Post-checklist follow-up: exact numerical counts will be set after content audit

## 11. Provenance Manifest Coverage

Each distributed System Content entry requires a Provenance Manifest entry with:

- Pack ID
- Entity ID
- Entity name
- Entity type/category
- Source reference or origin
- Rights status
- Human author/reviewer
- Review date
- Distribution allowed: yes/no
- Notes or limitation
- Related builder/source file, if applicable

The 1.0 release-blocking provenance rules are:

- No unreviewed packaged content
- No unclear-rights packaged content
- No unauthorized scraped content
- No AI-generated prepared user-facing package content
- Generated packs are not hand-edited as source of truth
- Pack compilation must pass before release

## 12. GM Tools Coverage

The 1.0 GM tool coverage is:

- XP reward support
- Treasure table rolling
- Artifact generation
- Output that can reference structured items where available
- Output that can use clear text results where rights/content limits require it
- GM-editable generated results
- Provenance-reviewed packaged tables/inputs
- Manual GM adjustment for campaign-specific rewards or treasure

The 1.0 depth split is:

- XP rewards: simple calculate/record/distribute support, not campaign analytics
- Treasure tables: Foundry roll table or equivalent workflow
- Artifact generator: understandable editable output, with deeper automation optional

## 13. Release Validation Evidence

Every release-relevant area needs evidence in this form:

- Area or requirement validated
- Foundry version
- World/test data used
- Actor/item/statblock/entity used
- Workflow opened or action performed
- Expected result
- Actual result
- Pass/fail/blocker status
- Notes or limitation
- Follow-up issue/story if not passing

Required validation passes are:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Install/open system in Foundry VTT 14
- Character sheet default/missing/filled states
- Statblock sheet default/missing/filled states
- Item/equipment sheets for major categories
- Spell/magic sheets
- Core test workflows
- Combat workflow
- Magic/mishap workflow
- Builder output open/edit/use/package checks
- Compendium pack compile/use checks
- Provenance manifest review
- Balanced one-shot pass
- Minimal-handholding pass, external if feasible or Greybard-simulated with limitation recorded
- Documentation/tutorial pass

## 14. Manual Fallback Boundaries

The 1.0 manual fallback policy is:

- Allowed for rare rules edge cases.
- Allowed for highly custom rituals, enchantments, alchemy, and unusual magic.
- Allowed for ambiguous combat outcomes or rare combat exceptions.
- Allowed where rights/content constraints prevent packaged table text.
- Allowed when GM judgment is explicitly required by the rules.
- Must be visible or discoverable in the relevant sheet, chat output, workflow text, or documentation.
- Must preserve normal playability for the balanced one-shot.
- Must not require routine raw JSON editing.
- Must not hide failed automation or missing required data.
- Must not replace core skill, characteristic, attack, defense, initiative, spellcasting, sheet, builder, or content workflows.

## 15. Decision Status

This decision log is complete for the Rules Coverage Checklist. Future implementation may add deeper rule-analysis decisions for enchantments, alchemy, rituals, combat sub-procedures, and exact compendium content counts as post-checklist follow-ups.
