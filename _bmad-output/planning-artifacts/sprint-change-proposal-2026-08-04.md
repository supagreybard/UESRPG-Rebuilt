# Sprint Change Proposal: Story 2.3 Overview Content Correction

Date: 2026-08-04  
Project: UESRPG-Rebuilt  
Scope: Minor direct adjustment

## 1. Issue Summary

Story 2.3 described a separate "common play lists" concept for traits, conditions, statuses, effects, or similar character entries. Greybard rejected the product concept of a standalone common list and requested that this content be combined with the character overview content instead.

Triggering artifact: Story 2.3, previously titled `Add Character Skills And Common Play Lists`.

Core problem: The story wording implied a separate common-list model or editing workflow, which is unnecessary UI/product complexity. The desired behavior is simpler: skills remain their own scan-friendly editable section, while traits, race, powers, active effects, and similar context appear as overview content.

## 2. Impact Analysis

Epic impact: Epic 2 remains valid. No new epic, replan, or scope reduction is needed.

Story impact: Story 2.3 has been retitled and reframed as `Add Character Skills And Overview Content`. Story 2.5 validation language now validates overview content instead of common play lists.

Artifact impact: The canonical Epic 2 story text, implementation story artifact, sprint plan, sprint status key, validation story, and deferred-work ledger needed terminology and acceptance-criteria updates.

Technical impact: No source-code change is required by this proposal. The current Overview surface can carry relevant non-inventory/non-magic context without introducing a separate common-list model. Later item/effect interactions should be defined by the workflows that need them.

PRD/Architecture/UX impact: No PRD or architecture change is required. The correction aligns with the UX spine's sheet overview/mechanical-list patterns by avoiding extra navigation and keeping character context in predictable sheet sections.

## 3. Recommended Approach

Recommended path: Direct adjustment.

Rationale: The change is a naming and acceptance-criteria correction inside an existing Epic 2 story. It reduces scope ambiguity, avoids over-modeling, and does not affect MVP viability, epic sequencing, or Foundry architecture.

Effort: Low.  
Risk: Low.  
Timeline impact: None expected.

## 4. Detailed Change Proposals

Story: 2.3

Section: Title

OLD:

```text
Story 2.3: Add Character Skills And Common Play Lists
```

NEW:

```text
Story 2.3: Add Character Skills And Overview Content
```

Rationale: Removes the standalone common-list concept from the story name.

Story: 2.3

Section: User Story

OLD:

```text
I want skills and common play lists to be organized, scan-friendly, and editable where appropriate,
```

NEW:

```text
I want skills and overview content to be organized, scan-friendly, and editable where appropriate,
```

Rationale: Reframes the user value around the existing character overview instead of a separate list class.

Story: 2.3

Section: Acceptance Criteria

OLD:

```text
Common play lists such as traits, conditions, statuses, effects, or similar non-inventory/non-magic entries are grouped with localized labels, safe empty states, and permission-aware controls.
```

NEW:

```text
Character overview content such as traits, race, powers, active effects, or similar non-inventory/non-magic entries is grouped with localized labels and safe empty states in the existing overview surface rather than treated as a separate common-list concept.
```

Rationale: Keeps visibility and safe empty-state requirements while removing separate common-list controls as an implied requirement.

Story: 2.5

Section: Acceptance Criteria

OLD:

```text
identity, notes, GM/private areas, characteristics, resources, summaries, skills, common play lists, inventory, equipment, and magic summaries
```

NEW:

```text
identity, notes, GM/private areas, characteristics, resources, summaries, skills, overview content, inventory, equipment, and magic summaries
```

Rationale: Validation should verify the corrected character-sheet composition.

Deferred work:

OLD:

```text
Common play lists lack permission-aware controls...
```

NEW:

```text
Removed.
```

Rationale: The item only exists because the previous acceptance criteria implied separate common-list controls. With the concept removed, later item/effect interactions belong to later workflow stories.

## 5. Implementation Handoff

Scope classification: Minor.

Route to: Developer agent for direct artifact cleanup; no PM/Architect replan required.

Success criteria:

- Story 2.3 and sprint status use the corrected `skills and overview content` wording.
- No planning artifact continues to require a separate common-list model or separate common-list editing workflow.
- Story 2.5 validates overview content rather than common play lists.
- The obsolete deferred-work item is removed.

## 6. Checklist Summary

- [x] Trigger identified: Story 2.3 common-list wording.
- [x] Problem defined: standalone common-list concept is unwanted product/UI complexity.
- [x] Epic impact assessed: Epic 2 remains valid.
- [x] PRD impact assessed: no change required.
- [x] Architecture impact assessed: no change required.
- [x] UX impact assessed: aligns with existing sheet overview/mechanical-list patterns.
- [x] Path selected: direct adjustment.
- [x] Handoff defined: developer/direct artifact cleanup.
