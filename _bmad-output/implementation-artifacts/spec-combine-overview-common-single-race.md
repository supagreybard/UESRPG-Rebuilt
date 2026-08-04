---
title: 'Combine character overview/common and single race data'
type: 'feature'
created: '2026-08-04'
status: 'done'
review_loop_iteration: 0
baseline_commit: '1a0cc60581f56c0c00df754676f799cf1299caf2'
context: []
---

<frozen-after-approval reason="human-owned intent -- do not modify unless human renegotiates">

## Intent

**Problem:** The player character sheet separates overview content from common play lists, and race is represented as a plural embedded item list even though characters can only have one race.

**Approach:** Merge the current common-tab list content into the Overview tab, remove the separate Common tab, and add a single race item reference field to character system data that is shown in the header beside the character name. Until item-link functionality is implemented, displaying the stored race name is acceptable.

## Boundaries & Constraints

**Always:** Keep Foundry V2 sheet patterns, localization, source-template/style alignment, and strict TypeScript behavior. Preserve existing editable/non-editable sheet behavior. Treat race as a single actor data reference to one race item, not a string-only field and not a multi-item list.

**Ask First:** If enforcing a one-race invariant requires deleting existing embedded race items, changing drag/drop behavior, or adding a world migration that rewrites existing actor items, stop and ask.

**Never:** Do not hand-edit `dist`, do not bump system compatibility, do not introduce broad new `any` usage, and do not add prepared rules/lore text.

## I/O & Edge-Case Matrix

| Scenario           | Input / State                     | Expected Output / Behavior                                                                                  | Error Handling                                                        |
| ------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Combined overview  | Character sheet opens             | Tabs show Overview, Skills, and Notes; Overview contains identity/XP plus traits, powers, and effects lists | Missing lists keep localized empty messages                           |
| Single race header | Character has `system.race.name`  | Header shows one race display beside name                                                                   | Empty value displays localized placeholder                            |
| Legacy race items  | Character has embedded race items | Sheet does not present race as a plural common list                                                         | Existing embedded items are left untouched unless separately migrated |

</frozen-after-approval>

## Code Map

- `src/module/data/actor/CharacterData.ts` -- defines persisted character system schema; add single `race` item reference field.
- `src/module/applications/actor/CharacterSheet.ts` -- prepares sheet tabs, header context, common-list groups, and form normalization.
- `templates/actor/character-sheet.hbs` -- renders character header, Overview tab, common lists, and tab panels.
- `lang/en.json` -- localizes race field/placeholder and removes or stops using plural race/common tab labels.
- `styles/uesrpg-rebuilt.css` -- adapts tab grid count and header identity layout for name plus race.

## Tasks & Acceptance

**Execution:**

- [x] `src/module/data/actor/CharacterData.ts` -- add a single persisted `race` item reference field with item UUID/name slots -- actor data reflects one race item value without requiring full link rendering yet.
- [x] `src/module/applications/actor/CharacterSheet.ts` -- remove `common` from tabs, expose race display data, normalize `system.race`, and exclude race items from common list groups -- behavior matches one-race model.
- [x] `templates/actor/character-sheet.hbs` -- render race alongside name in the header and move common list markup into the Overview panel -- UI combines tabs without losing content.
- [x] `lang/en.json` -- add/update localized labels/placeholders for singular race and combined overview -- user-facing strings stay localized.
- [x] `styles/uesrpg-rebuilt.css` -- adjust header layout, three-tab navigation, and overview common-list layout if needed -- layout remains usable on desktop and mobile.

**Acceptance Criteria:**

- Given a character sheet opens, when the tab navigation is rendered, then there is no Common tab and the Overview tab includes the common play lists.
- Given a character has no race reference, when the header renders, then the race display uses a localized placeholder and no plural race list is shown.
- Given a character has a race reference with a name, when the header renders in editable or non-editable mode, then exactly one race name is shown beside the character name.
- Given the form submits, when `system.race.name` contains surrounding whitespace, then the persisted display name is trimmed.

## Spec Change Log

## Verification

**Commands:**

- `npm run typecheck` -- expected: TypeScript passes.
- `npm run lint` -- expected: ESLint passes.
- `npm run build` -- expected: Vite/package build succeeds.

**Manual checks:**

- In Foundry, open a character sheet with empty/default data and verify Overview/Skills/Notes tabs, a single race field beside name, and no Common tab.
- In Foundry, set a race display name and verify it persists after sheet submit/reopen; check editable and non-editable states if available.

## Suggested Review Order

**Race Data Contract**

- Defines one race item reference with future link-ready UUID/name slots.
  [`CharacterData.ts:63`](../../src/module/data/actor/CharacterData.ts#L63)

- Registers the race reference on character system data.
  [`CharacterData.ts:76`](../../src/module/data/actor/CharacterData.ts#L76)

**Sheet Behavior**

- Removes Common from primary tabs and keeps Overview as default.
  [`CharacterSheet.ts:107`](../../src/module/applications/actor/CharacterSheet.ts#L107)

- Exposes race display data and trims submitted race references.
  [`CharacterSheet.ts:137`](../../src/module/applications/actor/CharacterSheet.ts#L137)

- Common groups now exclude race items from the plural list.
  [`CharacterSheet.ts:298`](../../src/module/applications/actor/CharacterSheet.ts#L298)

**Template Layout**

- Renders race beside name using the single reference fields.
  [`character-sheet.hbs:32`](../../templates/actor/character-sheet.hbs#L32)

- Moves common play lists into the Overview tab.
  [`character-sheet.hbs:263`](../../templates/actor/character-sheet.hbs#L263)

**Supporting UI**

- Adds singular race label and empty placeholder.
  [`en.json:47`](../../lang/en.json#L47)

- Updates three-tab navigation and race header layout.
  [`uesrpg-rebuilt.css:813`](../../styles/uesrpg-rebuilt.css#L813)
