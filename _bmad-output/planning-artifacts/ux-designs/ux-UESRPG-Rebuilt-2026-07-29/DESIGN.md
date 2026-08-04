---
name: UESRPG Rebuilt
description: Foundry VTT 14 system UI for UESRPG 3e v4. Morrowind-inspired atmosphere, Foundry-native behavior, readable sheets and chat output for live tabletop play.
status: draft
sources:
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/prd.md
  - _bmad-output/planning-artifacts/briefs/brief-UESRPG-Rebuilt-2026-07-27/brief.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-checklist.md
  - _bmad-output/planning-artifacts/prds/prd-UESRPG-Rebuilt-2026-07-27/rules-coverage-decisions.md
  - docs/ui-design-principles.md
updated: 2026-07-29
colors:
  accent: '#5a1818'
  accent-strong: '#7b2320'
  focus: '#b86f2d'
  success: '#3f6f3b'
  failure: '#9f2f24'
  warning: '#9a6a20'
  health: '#a22d22'
  magicka: '#2f5f8f'
  stamina: '#4d7a36'
  rare: '#8a6a2a'
  light-app-background: '#e8ddc5'
  light-surface: '#f3ead6'
  light-panel: '#e2d2b2'
  light-input: '#fff8e8'
  light-text: '#24180f'
  light-text-muted: '#604e3b'
  light-heading: '#2f1b12'
  light-border: '#8b7252'
  light-border-strong: '#5c4029'
  light-shadow: 'rgba(46, 31, 18, 0.18)'
  dark-app-background: '#17120f'
  dark-surface: '#231c18'
  dark-panel: '#30251f'
  dark-input: '#1d1714'
  dark-text: '#f0e4cf'
  dark-text-muted: '#c0aa8d'
  dark-heading: '#f5d7a4'
  dark-border: '#6e5539'
  dark-border-strong: '#a17b4e'
  dark-shadow: 'rgba(0, 0, 0, 0.45)'
typography:
  heading:
    note: Decorative serif or runic-adjacent display role for sheet titles, section headings, labels, tabs, and emphasis only.
  body:
    note: Practical readable UI/body role for body text, descriptions, inputs, chat cards, and mechanical data.
  numeric:
    note: Practical readable role with tabular number behavior where available for characteristics, skills, resources, rolls, targets, costs, ENC, and combat values.
rounded:
  sm: 3px
  md: 5px
  lg: 8px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
components:
  sheet-shell:
    background: '{colors.light-surface} / {colors.dark-surface}'
    border: '{colors.light-border} / {colors.dark-border}'
    radius: '{rounded.md}'
  field-panel:
    background: '{colors.light-panel} / {colors.dark-panel}'
    border: '{colors.light-border}'
    radius: '{rounded.sm}'
  primary-accent:
    background: '{colors.accent}'
    foreground: '#ffffff'
  chat-card:
    background: '{colors.light-surface} / {colors.dark-panel}'
    border: '{colors.light-border} / {colors.dark-border}'
    radius: '{rounded.sm}'
---

# UESRPG Rebuilt - Design Spine

## Brand & Style

UESRPG Rebuilt should feel like a Foundry-native tool that has been treated with Elder Scrolls atmosphere, not like a separate game client embedded inside Foundry. The visual language is a clear homage to Morrowind: parchment and ink in light mode, carved metal and dark lacquer in dark mode, warm reds and bronzes as accents, and restrained framing around dense mechanical data.

The interface must remain practical during live play. Character data, statblocks, item properties, roll targets, combat state, magic information, warnings, and builder validation must be easier to scan than the ornamental layer. Atmosphere supports function; it never competes with rules use.

Foundry's native surface vocabulary remains the base. Sheets, dialogs, tabs, chat cards, controls, combat tracker integration, compendium usage, document permissions, and tutorial affordances should look intentionally skinned by the system while still behaving like Foundry.

## Colors

The system uses a two-theme material model rather than simple inversion.

Light mode is warm, archival, and parchment-led. Use `{colors.light-app-background}` for ambient background, `{colors.light-surface}` for primary document surfaces, `{colors.light-panel}` for grouped content, and `{colors.light-input}` for editable fields. Text should use `{colors.light-text}` and `{colors.light-heading}`; secondary mechanical notes use `{colors.light-text-muted}` only when contrast remains strong.

Dark mode is carved, metallic, and dense without becoming muddy. Use `{colors.dark-app-background}` for the ambient shell, `{colors.dark-surface}` and `{colors.dark-panel}` for document surfaces, and `{colors.dark-input}` for editable fields. Text uses `{colors.dark-text}` with `{colors.dark-heading}` for important headings.

`{colors.accent}` is UESRPG Red. Use it for active tabs, section accents, selected elements, primary actions, roll emphasis lines, and focus treatment where appropriate. Avoid using it as a large fill behind dense text.

Semantic gameplay colors must carry text or labels in addition to color. `{colors.health}`, `{colors.magicka}`, `{colors.stamina}`, `{colors.success}`, `{colors.failure}`, `{colors.warning}`, and `{colors.rare}` are compact role tokens, not decoration.

Avoid noisy parchment textures, muddy brown-on-brown contrast, saturated fantasy gradients, and one-off component colors that bypass the token set.

## Typography

Use two major roles: decorative identity text and practical mechanical text.

`{typography.heading}` is reserved for sheet titles, section headings, tab labels, major labels, and short emphasis. It may establish the Elder Scrolls atmosphere, but it must not be used for dense rules prose, form inputs, chat math, or long descriptions.

`{typography.body}` is the default for descriptions, notes, field help, chat cards, builder instructions, and all longer text.

`{typography.numeric}` is used for characteristics, skills, resources, ENC, cost, TN, DoS/DoF, damage, AR, spell level, magicka cost, and similar data. Numeric values should align cleanly in tables, grids, and compact stat blocks.

Typography should create a clear hierarchy between title, section, label, value, help text, and warning text. It should not rely on all-caps decorative text for dense form structure.

## Layout & Spacing

Use a compact 4px-based spacing scale: `{spacing.1}` through `{spacing.6}`. Dense live-play surfaces should favor consistent grouping over large empty areas; builder and onboarding surfaces can breathe more.

Sheets should use a clear shell, then repeatable sections: header, tab bar where needed, summary/status area, core data panels, lists/tables, notes, and GM/private areas. Preserve Foundry's expected sheet dimensions, scrolling, resizable behavior, and submit-on-change expectations when matching existing sheets.

Character and statblock sheets may use multi-column layouts on desktop-sized sheet windows when doing so improves scanning. Narrow sheets should collapse to a single column without hiding core actions or forcing horizontal scrolling.

Item, equipment, spell, ritual, enchantment, and alchemy sheets should emphasize the split between mechanical fields and descriptive/prose fields. Builders should present ordered steps when later decisions depend on earlier rules choices.

## Elevation & Depth

Depth is communicated through tonal layering, borders, and restrained shadows rather than heavy card elevation. Use `{colors.light-shadow}` and `{colors.dark-shadow}` sparingly on sheet shells, floating dialogs, and important overlays.

Most hierarchy should come from grouped panels, dividers, heading typography, and layout density. Chat cards should be lower intensity than sheets so they remain readable in the chat log during active play.

## Shapes

Use squared, lightly softened shapes. `{rounded.sm}` is for inputs, small badges, compact field groups, and chat internals. `{rounded.md}` is for sheet panels, cards, dialogs, and builder step containers. `{rounded.lg}` is reserved for larger modal or tutorial surfaces.

Avoid pill-heavy styling except for small status tags when the shape communicates state cleanly. The default should feel like carved or framed UI, not a modern consumer app.

## Components

- **Sheet shell** - Uses `{components.sheet-shell}`. Frames Foundry document sheets while preserving native sheet behavior.
- **Sheet header** - Carries document name, type/category, important summary values, and the most common primary actions. It may contain the strongest visual framing on a sheet.
- **Tabs** - Preserve Foundry-standard tab behavior. Use `{colors.accent}` for active state and restrained borders/dividers for inactive tabs.
- **Field panel** - Uses `{components.field-panel}` for grouped mechanical fields. Dense forms should use clear labels, readable inputs, and predictable focus states.
- **Resource strip** - Compact visual grouping for health, magicka, stamina, derived resources, XP, wounds, fatigue, or similar state. Uses semantic tokens plus text labels/values.
- **Mechanical table/list** - Used for skills, inventory, attacks, armor/defenses, spells, effects, and compendium-like lists. Values must remain aligned and scan-friendly.
- **Primary action** - Uses `{components.primary-accent}` sparingly for high-confidence actions such as roll, create, confirm, or proceed. Destructive or ambiguous actions should not use the primary accent.
- **Builder stepper** - Uses clear current/completed/incomplete/blocked states. Visual treatment must make validation failures easy to find without turning the whole surface red.
- **Chat card** - Uses `{components.chat-card}`. Shows roll source, roll type, inputs, target, modifiers, raw roll, outcome, critical state, DoS/DoF, warnings, and adjudication notes as applicable.
- **Warning/manual fallback callout** - Uses `{colors.warning}` and text, not color alone. Appears when missing data, rights-limited content, manual GM judgment, or deferred rule automation affects the workflow.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Preserve Foundry-native behaviors and interaction expectations | Replace Foundry sheets, dialogs, chat, combat, or compendia with a separate app model |
| Use Morrowind-inspired material cues with restraint | Directly recreate copyrighted UI, lore presentation, or assets |
| Make mechanical values, roll math, and editable fields readable first | Use decorative type for dense mechanics or inputs |
| Tokenize light/dark colors, semantic states, borders, spacing, and radius | Hardcode one-off colors inside components |
| Use semantic colors with labels and values | Rely on color alone for health, magicka, stamina, success, failure, or warnings |
| Keep chat cards concise and transparent | Turn chat output into ornate mini-sheets that slow play |
| Show missing data and manual fallback states visibly | Hide failed automation behind silent no-ops or raw data expectations |
