---
name: UESRPG Rebuilt
status: draft
sources:
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md
  - _bmad-output/planning-artifacts/briefs/brief-UESRPG-Rebuilt-2026-07-27/brief.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-checklist.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-decisions.md
  - docs/ui-design-principles.md
updated: 2026-07-29
---

# UESRPG Rebuilt - Experience Spine

## Foundation

UESRPG Rebuilt is a Foundry VTT 14 system package, not a standalone web app. The UX inherits Foundry's document, sheet, chat, roll, combat tracker, compendium, settings, permissions, localization, and Tutorial API conventions. `DESIGN.md` is the visual identity reference; this spine defines how the system works.

Primary form factor is desktop/laptop Foundry play during preparation and live sessions. Narrower sheet windows must remain usable when resized, but phone-first interaction is not a 1.0 target unless Foundry itself provides the surface.

The 1.0 UX release gate is minimal handholding: another UESRPG group can install the system, create or use required entities, resolve common workflows, access rights-cleared content, and recover from missing-data or correction cases without Greybard personally guiding the table.

## Information Architecture

| Surface | Reached from | Purpose |
|---|---|---|
| Character sheet | Actor directory, token, builder output, compendium import | View/edit player character data and initiate common character rolls/workflows. |
| Statblock sheet | Actor directory, token, builder output, compendium import | View/edit NPC or creature data and run preparation/live encounter workflows. |
| Item/equipment sheet | Item directory, actor inventory, compendium import, builders | View/edit equipment, item stats, usage details, enchantments/effects, and GM notes. |
| Spell/magic entity sheet | Item directory, actor spell list, compendium import, spell builder | View/edit spell, scroll, ritual, enchantment, or alchemy entity data. |
| Roll/test dialog | Sheet action, macro, contextual workflow | Confirm roll inputs, difficulty/modifiers, target values, and missing-data handling before output. |
| Chat roll card | Roll/test/combat/magic workflow output | Explain roll inputs, target, modifiers, raw roll, outcome, critical state, DoS/DoF, warnings, and adjudication notes. |
| Combat workflow | Foundry combat tracker, actor sheet actions, item attacks | Resolve initiative, attacks, defenses, and conservative combat state updates. |
| Builder wizard | Actor/item creation actions, system tools, documentation/tutorial links | Create valid editable documents through ordered rules-aware steps. |
| GM tools | System tools, roll tables, compendia, documentation/tutorial links | Support XP rewards, treasure tables, artifact generation, and GM-editable outputs. |
| Compendium/provenance workflow | Foundry compendia, content build workflow, maintainer docs | Let users access rights-cleared content and let Greybard track release-ready source/provenance. |
| Onboarding/tutorials | Foundry Tutorial API, package docs, first-run/system help | Teach install/setup, core play workflows, GM content workflows, and known limitations. |
| Validation evidence | Release docs or validation workflow | Record Foundry version, data used, action performed, expected/actual result, status, and follow-up. |

IA closes only when every balanced one-shot requirement has a surface: character/prebuilt use, skill/social resolution, characteristic test, opposed test, initiative, attack/defense, combat state update, spellcasting, ritual spellcasting, mishap, alchemy/consumable use, treasure/artifact reward, XP reward, and compendium content use.

## Voice and Tone

Microcopy must be concise, procedural, and table-safe. Brand voice and visual posture live in `DESIGN.md`; UX copy should help users understand what will happen, what happened, and what they can correct.

Because this package must not ship AI-generated prepared user-facing copy, exact final UI labels, tutorial text, and public-facing help text require human review before release. This spine defines copy behavior and intent, not final localized strings.

| Do | Don't |
|---|---|
| State the action, required data, and result plainly. | Add chatty encouragement or lore-flavored filler to mechanics. |
| Explain missing data at the point of action. | Fail silently or send users to raw data as the normal path. |
| Keep manual adjudication notes short and actionable. | Pretend the system resolved an edge case it cannot safely decide. |
| Use localization keys for all shipped labels and tutorial copy. | Hardcode user-facing strings in templates or TypeScript. |
| Pair semantic color with explicit text/status. | Rely on color alone to communicate outcome or warning. |

## Component Patterns

Behavioral rules live here; visual specs live in `DESIGN.md.Components`.

| Component | Use | Behavioral rules |
|---|---|---|
| Sheet header | Character, statblock, item, magic sheets | Shows document identity, type/category, summary state, and high-value actions. Must not hide required editing behind nonstandard controls. |
| Tab set | Larger sheets | Preserve Foundry-standard tab behavior. Tabs group related data; they should not become a separate navigation system. |
| Resource strip | Characters/statblocks | Summarizes derived resources/state and combat-relevant values. Values remain editable or link to their editable source where appropriate. |
| Mechanical list/table | Skills, inventory, attacks, armor, spells, effects, content lists | Rows expose enough data to scan and act. Common actions are reachable without raw data entry. |
| Roll/test dialog | Skill, characteristic, opposed, limited, group, extended tests | Shows actor/source, roll type, governing value, difficulty, free modifiers, target value, and warnings before rolling when user confirmation is needed. |
| Chat roll card | All automated/semi-automated rolls | Shows actor/source, roll type, inputs, target, modifiers, raw roll, outcome, critical state, DoS/DoF, missing-data warning, and manual adjudication note where applicable. |
| Linked defense prompt/card | Combat | Defense output must be clearly associated with the triggering attack so the table can understand sequence and outcome. |
| State update confirmation | Combat and high-risk workflows | Conservative updates may be suggested, but ambiguous or high-risk updates require confirmation or clear manual control. |
| Builder stepper | Character creation, advancement, spell, equipment, statblock, enchanting, alchemy | Ordered steps when rules choices depend on earlier choices. Required validation blocks document creation until resolved. Deferred edge cases route to visible manual fields/notes. |
| Provenance indicator/workflow | Packaged content and maintainer workflows | Supports pack/entity ID, source/origin, rights status, human reviewer, review date, allowed/disallowed state, notes, and related builder/source file. |
| Tutorial cue | Onboarding | Uses Foundry Tutorial API for common workflows; never duplicates the PRD as user-facing copy. |

## State Patterns

| State | Surface | Treatment |
|---|---|---|
| Default document data | All sheets | Render safely with visible editable defaults and no broken layout. |
| Missing or incomplete data | Sheets, dialogs, chat cards | Surface the missing field or category near the attempted action; allow correction through sheet/workflow when possible. |
| Filled data | All sheets | Prioritize scan speed and table use; important values should not be buried in prose-only sections. |
| Non-editable permissions | Sheets/builders | Respect Foundry document permissions. Disabled controls remain understandable; view-only data remains legible. |
| Roll success/failure | Chat roll card | Show raw roll, target, outcome, and DoS/DoF where applicable. Use text plus semantic treatment. |
| Critical success/failure | Chat roll card | Distinguish critical state from ordinary success/failure and show why it applied where rules data permits. |
| Opposed tie or ambiguity | Opposed test/combat | State that GM adjudication or roll-off is required; do not force a false winner. |
| Manual fallback | Rituals, enchantments, alchemy, rare combat, rights-limited tables | Make fallback visible/discoverable in the relevant sheet, chat output, workflow text, or documentation. |
| Builder validation failure | Builder stepper | Keep user on the affected step, identify missing/invalid fields, and preserve entered data. |
| Builder completion | Builder stepper | Creates a valid Foundry document, opens on its sheet, and remains editable. |
| Rights/provenance blocked content | Compendium/provenance workflow | Prevent release inclusion until reviewed. Do not hide blocked state inside build logs only. |
| Foundry runtime validation failure | Validation evidence | Record expected/actual result, blocker status, limitation, and follow-up story/issue. |

## Interaction Primitives

- Click/tap sheet actions to initiate rolls, builders, edits, and document opening; no hidden gesture-only interactions.
- Keyboard navigation follows Foundry expectations and browser focus order. Custom shortcuts are optional and must not be required for core workflows.
- Dialogs and modals stack one level deep where possible. Avoid modal chains for builder steps.
- Common rolls should be reachable from relevant sheets without raw data entry.
- Free-form GM modifiers must be possible where the rules permit modifiers beyond preset difficulty values.
- Automations must be visible, conservative, and correctable through ordinary Foundry document editing.
- Manual fallback is a visible workflow state, not an implementation failure hidden from users.
- Drag-and-drop may be used where Foundry users expect it, such as inventory or compendium interactions, but must not be the only way to complete required workflows.
- Banned for 1.0 core UX: bespoke routing, hidden raw JSON editing as normal workflow, silent automation failure, color-only outcomes, tutorial copy that assumes Greybard is present.

## Accessibility Floor

Behavioral accessibility lives here; visual contrast lives in `DESIGN.md`.

- Interactive elements expose names, roles, states, and disabled/read-only conditions to assistive technology where Foundry patterns allow.
- Keyboard traversal follows reading order on sheets, dialogs, builders, and chat card actions.
- Focus states must remain visible in both light and dark themes.
- Semantic colors must be paired with text labels, icons with accessible names, or explicit values.
- Dense tables and lists should remain readable under browser zoom and resized sheet windows.
- Builder errors are programmatically and visually associated with the affected fields where feasible.
- Chat output should not require interpreting decorative styling to understand result, target, or warning state.
- Reduced-motion preferences should avoid unnecessary animated emphasis in builder transitions, warnings, or chat output.

## Responsive & Platform

UESRPG Rebuilt targets Foundry VTT 14 in the browser/client environment. It should behave as a Foundry system across desktop/laptop displays and resizable Foundry application windows.

| Condition | Behavior |
|---|---|
| Wide sheet window | Multi-column grouping allowed for character/statblock summaries, resources, skills, inventory, and spell lists when it improves scanning. |
| Narrow sheet window | Collapse to one column, preserve primary actions, avoid horizontal scrolling for core fields. |
| Light Foundry theme | Use parchment-led material tokens from `DESIGN.md`. |
| Dark Foundry theme | Use carved/metallic material tokens from `DESIGN.md`; do not invert blindly. |
| Foundry permissions/read-only | Preserve readable view mode and disable edits according to native document permissions. |
| Compendia | Use Foundry-native compendium opening, import, and pack interaction patterns. |

## Release Scope Surfaces

### Character Sheet

Must expose core characteristics, skills, derived resources/state, race, birthsign, purchased advancements and XP, equipment/inventory, spells and magic capability, active effects/conditions, notes/biography, and GM/private notes. Common rolls must be reachable from the sheet.

### Statblock Sheet

Must expose NPC/creature characteristics, skills or relevant test values, derived resources/state, type/role, equipment where applicable, attacks, armor/defenses, spells where applicable, active effects/conditions, combat notes/tactics, description, and GM/private notes.

### Item And Equipment Sheets

Must support weapons, armor, shields, food/drink, adventuring gear, tools, clothing, jewelry, arcane items, potions/poisons, and other items. Applicable fields include name, category, notes, ENC, cost, quality, equipped state, usage stats, enchantments/effects, and GM/private notes.

### Magic Entity Sheets

Spells and scrolls must expose name, description, school, spell attributes, spell level, magicka cost, spell strength, spell description, and mechanically relevant fields. Rituals may remain manual/simple for 1.0 but must be openable, readable, editable, and referenceable. Enchantments and alchemy may use simpler editable representations with visible GM adjudication boundaries.

### Builders

Required full builders: character creation, character advancement, spell creation, equipment, and statblock. Minimal/deferred builders: enchanting and alchemy. Rituals are manual/simple entity workflows for 1.0. Each builder must produce valid editable Foundry documents and avoid routine raw JSON editing.

### GM Tools

XP support is simple calculate/record/distribute support, not campaign analytics. Treasure tables should use Foundry roll table or equivalent workflows. Artifact generation output must be understandable and GM-editable.

## Key Flows

### Flow 1 - Session Prep With System Content (Mara, GM, evening before game)

1. Mara opens Foundry and loads the UESRPG Rebuilt world.
2. She opens relevant compendium packs and selects statblocks, equipment, spells, and treasure inputs for tomorrow's session.
3. She opens a statblock sheet, checks combat values, tactics notes, and available attacks.
4. She adjusts one homebrew detail through the sheet instead of raw data.
5. She prepares a treasure or artifact reward through a GM tool or roll table.
6. **Climax:** The needed entities are visible, editable, and usable as Foundry documents for the session, with provenance limitations not blocking local prep.

Failure: a packaged content entry lacks release-ready provenance. The maintainer workflow blocks distribution inclusion, while local user-created content remains editable and clearly user-owned.

### Flow 2 - Live Character Test (Talan, player, mid-session social scene)

1. Talan opens his character sheet from his token or actor directory.
2. He locates the relevant skill and starts a skill test.
3. The test dialog shows the governing characteristic, skill rank/bonus, difficulty, free modifiers, target value, and any missing-data warnings.
4. He confirms the roll.
5. Chat outputs the actor, roll type, inputs, target, modifiers, raw roll, outcome, critical state if any, and DoS/DoF.
6. **Climax:** The table can trust the result without leaving Foundry or asking Greybard how the math was derived.

Failure: a required value is missing. The dialog or chat card names the missing value and routes Talan or the GM back to the editable sheet data.

### Flow 3 - Combat Exchange (Neris, GM, running an encounter)

1. Neris starts combat through Foundry's combat tracker and rolls initiative.
2. A player initiates an attack from actor plus weapon data.
3. The attack output shows source, weapon/input data, target value, roll, outcome, critical state, and DoS/DoF.
4. The defender resolves a linked or clearly associated defense workflow.
5. The system suggests conservative combat state updates where safe.
6. **Climax:** Attack, defense, and state changes are visible and recoverable, and Neris can override ambiguous outcomes through normal GM control.

Failure: armor, shield, quality, or unusual effect data is ambiguous. The workflow presents a manual GM adjudication note instead of silently applying a questionable update.

### Flow 4 - Magic And Mishap (Seren, magic-using player, tense scene)

1. Seren opens the character sheet spell list or a spell entity sheet.
2. She starts spellcasting from actor and spell data.
3. The workflow surfaces magicka cost, spell attributes, difficulty/modifiers, target, missing data, and relevant mishap handling.
4. Chat shows the spellcasting result and any mishap trigger/result information available under rights/provenance constraints.
5. For a ritual, Seren and the GM use the ritual entity as a readable/editable reference and resolve manually.
6. **Climax:** Magic remains rules-faithful and understandable without forcing every custom edge case into automation.

Failure: a ritual, enchantment, or alchemy case is outside 1.0 automation depth. The sheet and chat/manual note make the fallback explicit and preserve playability.

### Flow 5 - Builder To Usable Document (Greybard, maintainer, content-authoring pass)

1. Greybard opens a builder for a spell, equipment item, statblock, or character.
2. The builder walks ordered steps where later rules choices depend on earlier selections.
3. Required fields validate before document creation.
4. The builder creates a valid Foundry document and opens it on its sheet.
5. Greybard edits or corrects the result through the sheet, then uses it in the relevant play workflow.
6. If eligible for package content, the entity receives provenance manifest data before release inclusion.
7. **Climax:** Content can be authored, reviewed, used, and packaged without routine raw JSON hand-editing.

Failure: an edge-case enchantment or alchemy output exceeds 1.0 builder depth. The builder produces a clear manual/simple representation with GM notes rather than invalid structured data.
