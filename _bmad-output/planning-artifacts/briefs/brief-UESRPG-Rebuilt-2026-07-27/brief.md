---
title: UESRPG Rebuilt Product Brief
status: complete
created: 2026-07-27
updated: 2026-07-27
---

# Product Brief: UESRPG Rebuilt

## Product Summary

UESRPG Rebuilt is a Foundry Virtual Tabletop system for running UESRPG 3e v4, a community-created d100 tabletop roleplaying game set in the Elder Scrolls universe. The project aims to make UESRPG fully playable in Foundry while reducing table friction through rules automation, guided workflows, useful compendium content, and polished document sheets.

The 1.0 release should support complete play at the table: GMs and players should be able to create and manage characters, resolve common mechanics, conduct combat, use magic, configure game entities, and access system-provided entities without constantly leaving Foundry or interrupting play to perform manual bookkeeping.

## Audience And Use Context

The primary users are GMs and players using Foundry VTT to run UESRPG sessions. The system should support both preparation and live play: GMs need reliable tools for building encounters, managing rewards, referencing entities, and creating game content; players need legible character information, smooth rolls, and low-friction advancement and equipment management.

## Problem

UESRPG is a mechanically rich tabletop system, and running it in a virtual tabletop can create friction when rules, rolls, sheet data, item configuration, and reference material are scattered across manual workflows. Every manual lookup or repeated calculation can interrupt play, especially during combat, magic use, character advancement, and GM preparation.

Foundry systems can reduce this friction, but only if they treat the table experience as the product: sheets must be easy to navigate, rolls must be quick and trustworthy, entity configuration must be understandable, and the system must provide enough structured content to make play practical without excessive setup work.

## Product Goal

The 1.0 goal is to deliver a fully playable UESRPG 3e v4 system in Foundry with key workflows automated. The playable core is the release gate: GMs and players must be able to run sessions using the system for core tests, combat, characters, statblocks, magic, items, and commonly needed reference entities.

Automation should support the flow of play rather than replace user judgment. The system should make routine operations fast and consistent, while keeping Foundry-native interaction patterns and visible game data so users understand what the system is doing.

## Experience Principles

- Keep gameplay moving: common rolls, tests, combat actions, and updates should be fast enough to use during live sessions.
- Make sheets clear, stylish, legible, and easy to reference with simple navigation.
- Prefer guided workflows for complex setup tasks such as character creation, advancement, spell creation, enchanting, alchemy, equipment creation, and statblock creation.
- Preserve Foundry-native behavior instead of introducing unfamiliar application patterns.
- Make entity data understandable and editable so GMs can correct, extend, or homebrew content.
- Treat visual design as part of usability: the interface should support the project's Morrowind-inspired atmosphere without sacrificing readability.

## 1.0 Scope

### Core Mechanics

- Skill tests.
- Characteristic tests.
- Opposed tests.
- Combat support, including attacking, defending, and initiative tracking.

### Play Documents

- Character sheets.
- Statblocks.
- Item and equipment configuration.
- Sheets and forms that prioritize clear reference, simple navigation, style, and legibility.

### Magic

- Spellcasting.
- Ritual spellcasting.
- Magical mishaps for spellcasting and alchemy.

### Guided Workflows

- Character creation.
- Character advancement.
- Spell creation.
- Enchanting.
- Alchemy.
- Equipment builders for weapons, armor, and related items.
- Statblock creation.

These wizards are targeted for 1.0, but the playable core remains the release gate. If scope must be cut, defer wizard depth or polish before compromising the ability to run a complete session.

### GM Tools

- Basic XP reward support.
- Treasure tables.
- Artifact generator for high-value loot.

### Compendium Content

1.0 should include system-provided compendium content for most or all entity types needed for play. Expected coverage includes common items, equipment, spells, effects, statblocks, roll tables, and similar system entities.

Compendium content is a product feature, not only data packaging. It should make the system usable with less setup while respecting legal, community, and Foundry package constraints.

## Non-Goals / Out Of Scope

- Replacing Foundry's native document, sheet, chat, roll, or compendium paradigms with a separate application model.
- Bundling content that is not rights-cleared, human-authored, or otherwise permitted for distribution.
- Using AI-generated prepared user-facing rules, lore, descriptions, compendium entries, visual assets, audio, or similar package content.
- Treating build success alone as runtime validation; Foundry behavior must still be checked in a real Foundry environment for relevant changes.

## Success Criteria

- A GM can prepare and run a UESRPG session in Foundry using the system's actors, items, rolls, combat tools, magic support, and compendium content.
- Players can maintain character sheets, make common rolls, reference important character information, and handle advancement or equipment changes with minimal friction.
- Core resolution flows are accurate, visible, and fast enough for live play.
- Sheets are legible, stylish, easy to navigate, and useful as at-the-table references.
- Common entity setup tasks have guided workflows or clear manual paths.
- System-provided compendium content covers the main entity types needed for typical play.
- The package builds cleanly and is manually validated in Foundry for runtime workflows affected by the release.

## Key Risks And Constraints

- The 1.0 scope is large across mechanics, sheets, magic, wizards, GM tools, and compendium content.
- Wizard-heavy workflows may compete with core playability; release planning should protect the playable core first.
- Compendium content requires explicit provenance and rights review before release.
- The project targets Foundry VTT 14 and must follow Foundry document, hook, sheet, template, localization, packaging, and validation conventions.
- User-facing labels and templates need localization support rather than hardcoded text.
- Changes to actor or item types require coordinated updates across data models, system metadata, sheets, templates, localization, and build-copy configuration.
- Typecheck, lint, and build are necessary but not sufficient; sheet, document, migration, compendium, and runtime workflow changes require Foundry validation.

## Open Questions

- What is the exact source and review process for 1.0 compendium content?
- Which wizard workflows are mandatory for the first public 1.0 release, and which can ship as clear manual workflows first if needed?
- What minimum compendium coverage defines “fully playable” for a typical UESRPG campaign?
- Which GM tools are essential for 1.0 versus suitable for early post-1.0 releases?
