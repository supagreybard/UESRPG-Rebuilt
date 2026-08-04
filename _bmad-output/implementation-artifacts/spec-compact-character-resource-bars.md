---
title: 'Compact Character Resource Bars'
type: 'feature'
created: '2026-08-04'
status: 'done'
route: 'one-shot'
---

# Compact Character Resource Bars

## Intent

**Problem:** Character sheet resource bars consumed too much header space because labels, value input, and max text were visually separated and oversized. The resource wrapper also added extra color treatment now that each bar has its own colored fill.

**Approach:** Move each resource label inside its bar, compact the bar grid and numeric controls, and remove the extra wrapper-side color/background treatment while preserving editable current values and accessible labels.

## Suggested Review Order

**Resource Bar Structure**

- Label now lives inside the resource bar alongside value and max.
  [`character-sheet.hbs:107`](../../templates/actor/character-sheet.hbs#L107)

**Compact Styling**

- Header resources use tighter columns, gaps, and wrapper padding.
  [`uesrpg-rebuilt.css:802`](../../styles/uesrpg-rebuilt.css#L802)

- Resource wrappers no longer add secondary color/background treatment.
  [`uesrpg-rebuilt.css:1377`](../../styles/uesrpg-rebuilt.css#L1377)

- Bar internals are compressed into one pill with label, value, slash, and max.
  [`uesrpg-rebuilt.css:1410`](../../styles/uesrpg-rebuilt.css#L1410)

- Resource-only input selectors override generic field chrome inside the bar.
  [`uesrpg-rebuilt.css:1467`](../../styles/uesrpg-rebuilt.css#L1467)
