# PRD Quality Review — UESRPG Rebuilt PRD
## Overall verdict
This is a strategically coherent and mostly decision-ready PRD for a brownfield Foundry system moving toward 1.0. Its main weakness is that too much of the verifiable product boundary is deferred to the Rules Coverage Checklist, so the PRD is stronger as a release thesis than as a standalone source for engineering stories.

## Decision-readiness — adequate
### Findings
- **[high] Release decision depends on an external artifact not included in the PRD (§3, §4.2, §10) — The PRD repeatedly makes the Rules Coverage Checklist authoritative for exact release scope: “defines the exact fields, formulas, edge cases, content coverage, validation expectations, and manual-fallback cases” (§3) and “Exact entity types and counts are defined by the Rules Coverage Checklist” (§10). That is a valid planning split, but a decision-maker cannot fully green-light 1.0 scope from this PRD alone. *Fix:* Add a short embedded release-scope summary naming the minimum sheet fields, roll families, builder validations, content categories, and compendium coverage thresholds that the checklist must satisfy.
- **[medium] Trade-offs are named, but not always with explicit consequences (§4.4, §4.5, §7.2, §8) — The PRD honestly allows “rare combat exceptions” and “highly custom spell, ritual, alchemy, or enchanting cases” to rely on manual adjudication, but it does not state what user pain or validation risk this creates. *Fix:* For each manual-fallback class, name the expected user-visible limitation and what makes the fallback acceptable for 1.0.

## Substance over theater — strong
### Findings
- **[low] Some NFRs remain adjective-heavy without thresholds (§5) — NFR-2 says common actions should be “fast enough,” and NFR-5 says sheets should prioritize “readable contrast” and “keyboard/mouse usability consistent with Foundry.” These are product-relevant rather than boilerplate, but still need later operationalization. *Fix:* Push concrete thresholds into the Rules Coverage Checklist or release validation plan, such as maximum interaction steps for common rolls and explicit light/dark theme checks.

## Strategic coherence — strong
### Findings

## Done-ness clarity — thin
### Findings
- **[critical] Many FRs are testable only after consulting the Rules Coverage Checklist (§4.2-§4.8) — Requirements such as “all character data required for common UESRPG play” (§4.2 FR-4), “minimum rules decisions needed to begin play” (§4.6 FR-20), and “minimum content counts” (§4.8 FR-31) deliberately defer acceptance detail to another artifact. That keeps the PRD readable, but downstream story creation cannot know what “done” means for these FRs from the PRD alone. *Fix:* Add at least one PRD-level acceptance consequence per feature group that can be verified without the checklist, and include a compact checklist summary or appendix for the most release-critical thresholds.
- **[high] Success metrics describe outcomes but not measurement procedures (§9) — SM-1 through SM-6 are well aligned to the thesis, but phrases like “representative balanced one-shot,” “complete core creation/play workflows,” and “fast and clear enough” are not bounded in the PRD. *Fix:* Define the representative one-shot scenario, required workflow list, pass/fail evidence, and who counts as an outside user for SM-2.
- **[medium] Manual validation evidence is specified, but release pass/fail criteria are incomplete (§4.9 FR-35, §4.9 FR-36) — FR-35 requires recording “expected result, actual result, and limitations,” and FR-36 requires a minimal-handholding pass, but the PRD does not say what number or severity of limitations blocks 1.0. *Fix:* Add release-blocker categories for manual validation findings, especially for broken core workflows, missing documentation, missing content provenance, and confusing builder output.

## Scope honesty — adequate
### Findings
- **[medium] MVP scope is very broad relative to the stated 1.0 gate (§7.1) — In-scope work includes sheets, three core test types, combat, magic, alchemy, seven builders, GM reward/treasure/artifact tools, rights-cleared compendia, docs, tutorials, and validation. The PRD has a deferrable list, but it does not prioritize which in-scope areas can degrade first if 1.0 pressure appears. *Fix:* Add priority bands or a release-cut ladder that distinguishes hard blockers from degradable scope inside §7.1.
- **[low] The external-test assumption weakens the minimal-handholding claim (§4.9 FR-36, §11) — FR-36 allows the external-group validation to “be simulated by Greybard initially if no external test group is available.” That is honest, but it materially lowers evidence quality for “other UESRPG groups.” *Fix:* State whether simulated validation is acceptable for 1.0 release or only for pre-release readiness, and require follow-up external validation if simulation is used.

## Downstream usability — adequate
### Findings
- **[medium] FR-to-UJ traceability is mostly implicit (§2.4, §4) — Feature group descriptions say they support user journeys, and success metrics map broad FR ranges, but individual FRs do not identify the UJs they serve. This is workable for a solo project but adds friction for story slicing and acceptance traceability. *Fix:* Add brief UJ references to feature groups or an FR/UJ matrix for the release-critical flows.
- **[medium] Domain terms are defined, but “System Content” and “Compendium Content” overlap in a way that could affect downstream packaging stories (§3, §4.8) — The glossary defines System Content as packaged compendium content and Compendium Content as “packs shipped with the system or generated for distribution.” The distinction is close enough that rights/provenance, pack automation, and content coverage stories may use them interchangeably. *Fix:* Clarify whether Compendium Content is the storage/distribution mechanism and System Content is the reviewed product content subset.

## Shape fit — strong
### Findings

## Mechanical notes
- ID continuity is clean: FR-1 through FR-37, UJ-1 through UJ-5, NFR-1 through NFR-9, and SM-1 through SM-6 plus SM-C1 through SM-C3 are contiguous and unique.
- Assumptions Index roundtrip is correct for the visible inline assumption in FR-36, and it also records the §6 rules-interpretation assumption.
- The PRD says “No addendum.md exists” by task context; no missing addendum cross-reference was found in the PRD.
- Cross-references to the Rules Coverage Checklist are numerous and load-bearing; this is mechanically consistent but should be treated as a dependency before architecture/story generation.
