---
title: 'Center Resource Bar Values'
type: 'feature'
created: '2026-08-04'
status: 'done'
route: 'one-shot'
---

# Center Resource Bar Values

## Intent

**Problem:** Character sheet resource bars showed the current value input and max value group aligned from the left, and the bar corners were sharper than the desired visual direction.

**Approach:** Center the existing current/slash/max value group inside each resource bar and increase the resource bar border radius to `1.5em` without changing resource data, sheet behavior, or markup.

## Suggested Review Order

- `../../styles/uesrpg-rebuilt.css:864` - Review the resource bar layout, especially `justify-content: center` and `border-radius: 1.5em`.
