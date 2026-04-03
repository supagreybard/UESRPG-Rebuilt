# UI Design Principles

## Purpose

This document defines the visual direction for the UESRPG system UI. It is intended to guide future styling work across item sheets, actor sheets, chat cards, dialogs, and other Foundry-facing interfaces.

The goal is to create a UI that feels clearly inspired by The Elder Scrolls, especially `Morrowind`, while remaining readable, maintainable, and compatible with Foundry's own interface language.

## Core Visual Direction

The visual identity should be a clear homage to `Morrowind`, not a direct recreation.

It should feel:

- immersive at first glance
- readable during play
- parchment-led in light mode
- carved or metallic in dark mode
- moderately textured, not heavily ornamented
- distinctively Elder Scrolls-inspired without fighting Foundry

## Design Principles

### 1. Atmosphere Supports Function

The styling should strengthen theme and identity without making the interface harder to use. Mechanical information must always remain easy to scan.

### 2. Foundry Is The Base UI

The system should feel native to Foundry. Styling should refine and skin existing Foundry patterns rather than replace them with bespoke interaction models.

### 3. Readability Comes First In Interactive Areas

Inputs, numeric fields, textareas, and chat cards must stay easy to read and use in both light and dark modes.

### 4. Themes Should Be Intentional, Not Inverted

Light and dark mode should feel like two designed interpretations of the same system, not simple color inversions.

### 5. Reuse Beats One-Off Styling

The styling system should be driven by reusable tokens for color, spacing, borders, and surfaces. Avoid component-level hardcoded values where shared tokens would work.

## Theme Direction

### Light Mode

Light mode should feel warm, archival, and parchment-like.

Suggested material cues:

- parchment and ivory surfaces
- sepia or dark ink text
- restrained bronze or brown borders
- subtle red accents

### Dark Mode

Dark mode should feel carved, metallic, and denser without becoming muddy or low-contrast.

Suggested material cues:

- charcoal and near-black surfaces
- warm highlights instead of cold greys
- metallic or lacquered panel treatment
- deeper accent use with strong contrast

### Shared Identity Across Themes

Both themes should share:

- spacing rhythm
- typography roles
- border logic
- component hierarchy
- accent and semantic color behavior

They should differ primarily in material interpretation:

- light mode: parchment and ink
- dark mode: carved metal, dark lacquer, and warm shadow

## Typography

### Decorative Typography

Decorative styling should be used for:

- page titles
- section headings
- most labels
- tabs
- important headings and emphasis points

Decorative type should help establish identity, but it must not carry large bodies of text or dense mechanics.

### Practical Typography

A readable UI/body font should be used for:

- body copy
- descriptions and notes
- inputs and textareas
- chat cards
- numeric and mechanical data

The intended balance is decorative headings with practical body text.

## Color Direction

### Brand Accent

Primary system accent:

- `UESRPG Red`: `#5a1818`

This should be used as a core brand color throughout the UI for:

- active states
- section accents
- selected elements
- emphasis lines and dividers
- focus and interaction treatment where appropriate

### Semantic Gameplay Palette

The system should also maintain a compact semantic palette for gameplay concepts. These should be tokenized rather than hardcoded per component.

Suggested roles:

- health: brighter red than `#5a1818`
- magicka: blue
- stamina: green
- success: readable green in both themes
- failure: readable red or red-orange in both themes
- warning: amber, if needed
- rare or special states: muted gold or similar, if needed later

## Texture And Framing

Texture and framing should be moderate.

Recommended approach:

- subtle tonal variation rather than heavy visible texture
- restrained framing on panels and cards
- most ornament concentrated around headers, separators, or titles
- minimal decorative noise in dense data-entry areas

Avoid:

- noisy parchment textures
- thick ornamental borders everywhere
- muddy brown-on-brown contrast
- overuse of fantasy styling in practical components

## Component Direction

### Item Sheets

Item Sheets should feel like a hybrid between a document and a game interface, similar to the balance found in `Morrowind`.

Key goals:

- stronger hierarchy in the sheet header
- cleaner, more intentional field grouping
- clearer separation between mechanics and prose
- more distinctive framing without becoming visually heavy
- better field contrast in both themes

### Actor Sheets

Actor sheets should share the same overall shell and visual system as item sheets.

Key goals:

- stronger visual grouping for resources and attributes
- fast readability for important numeric values
- semantic color support for gameplay-related stats where appropriate

### Tabs

Tab behavior should stay Foundry-standard.

Styling should be light-touch:

- preserve expected Foundry interaction
- improve typography and active-state treatment
- avoid creating a bespoke tab component system

### Forms And Inputs

Inputs should feel integrated into the system UI rather than generic browser elements dropped onto themed panels.

Key goals:

- readable contrast in both themes
- clear focus states
- consistent border and fill treatment
- maintainable styling for checkboxes, radios, and selects

### Chat Cards

Chat cards should be readable first, themed second.

They should carry hints of the same design language as sheets while remaining restrained and efficient during play.

Key goals:

- strong readability
- subtle framing
- clear success and failure treatment
- lower visual intensity than sheets

## Accessibility And Readability

The design should prefer readability without sacrificing atmosphere too much.

Implementation expectations:

- strong text contrast in both themes
- muted text remains readable in dark mode
- decorative fonts are never used for dense content
- focus states are obvious and usable
- semantic colors support information rather than replacing textual cues

## Maintainability

The styling system should remain easy to maintain.

Rules for implementation:

- define reusable design tokens at the top of the stylesheet
- implement light and dark mode through token overrides
- preserve shared structural classes where possible
- avoid one-off component-specific colors unless necessary
- reuse a small set of surface, border, and shadow recipes
- keep markup changes minimal unless they materially improve layout or semantics

## Recommended Token Categories

The initial design token system should likely include:

- app background
- surface background
- panel background
- input background
- main text
- muted text
- heading text
- border
- strong border
- accent
- strong accent
- health
- magicka
- stamina
- success
- failure
- shadow
- focus shadow
- spacing scale
- radius scale

## What To Avoid

The initial design should explicitly avoid:

- generic, flat presentation
- weak dark mode contrast
- visually noisy TES imitation
- unreadable decorative body text
- excessive ornament in dense forms
- styling that feels disconnected from Foundry

## Success Criteria

The design is successful if it:

- feels immersive but still usable during play
- reads clearly in both Foundry light and dark mode
- feels more like The Elder Scrolls and less like generic app UI
- improves item and actor sheet presentation substantially
- keeps chat cards practical and readable
- remains clean enough to extend without creating maintenance debt

## Proposed Implementation Order

1. Build a reusable token system for light and dark themes.
2. Rework the shared sheet shell, including window content, header, cards, labels, and fields.
3. Apply the new system to item sheets first.
4. Extend the same language to actor sheets.
5. Add semantic styling for gameplay resources and outcomes.
6. Refresh chat cards with a lighter version of the same design language.
7. Perform dark and light mode parity cleanup.

## Research Note

It may be useful to review how Foundry creators and UI-focused modules handle:

- dark and light theme token overrides
- Foundry-native tab styling
- decorative font loading and fallback strategy
- maintainable scoping of system-level UI styles

This should inform implementation patterns, but not become a dependency for the system redesign.
