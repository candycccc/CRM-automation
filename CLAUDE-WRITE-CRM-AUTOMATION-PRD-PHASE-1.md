# Claude PRD Update Brief — Quote Lifecycle Automation Phase 1

**Prepared:** 29 August 2026  
**Repository root:** `/Users/candy/Documents/1.WeQuote/1.Design/17-Prototype-html/CRM-automation`  
**Primary output:** `docs/WeQuote-CRM-Phase-1-PRD.html`  
**Status:** Product-owner decisions from the 29 August meeting; use these decisions to reconcile the existing Version 9 PRD.

---

## 1. Claude's task

Update the existing canonical Phase 1 PRD in place. Do not create a second PRD.

The current PRD still contains an earlier Managed + Custom model with a customer-visible `Starts when` choice, twelve Templates, a much larger Rule and Action catalogue, and scope calculations based on that larger model. The latest Phase 1 meeting deliberately reduces the Automation block surface while keeping the `Start from scratch` Builder, Custom Stages and Pipeline creation in scope.

Use the confirmed decisions in this brief as the latest authority for the Phase 1 Automation section. Preserve unrelated CRM requirements.

---

## 2. Canonical file placement

All paths below are relative to the repository root.

| Path | Role | Claude action |
|---|---|---|
| `docs/WeQuote-CRM-Phase-1-PRD.html` | The only canonical Phase 1 PRD | Update in place. Do not duplicate or rename it. |
| `QUOTE-LIFECYCLE-AUTOMATION-GUIDE-PHASE-1.html` | Current colleague-facing Phase 1 Automation Guide | Treat its reachable visible UI as the current Phase 1 catalogue and product summary. |
| `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html` | Full exploration Guide | Keep as broader historical/exploration reference. Do not use its 12-Template, Starts-when or 15,238-shape model as the current Phase 1 contract. |
| `docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md` | Earlier 29 August Managed + Custom record | Reconcile it as superseded for the specific Phase 1 decisions listed below. It still helps explain protected Quote lifecycle boundaries. |
| `docs/quote-automation/QUOTE-LIFECYCLE-FROM-SCRATCH-STAGE-CATALOGUE.md` | Broad candidate catalogue and evidence | Evidence/reference only. It is not the Phase 1 choice list. |
| `QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html` | Broad product-scope visual | Use for branch and Pipeline relationships, but reconcile its labels/counts with this brief before citing them as Phase 1. |
| `docs/visuals/template-vs-scratch-scope.html` | Earlier scope comparison | Historical comparison only where it uses 12 Templates, visible Starts when or 15,238 shapes. |
| `index.html` and `assets/js/automation.js` | Runnable prototype | Prototype evidence only. Current code does not overrule this Phase 1 decision. |
| `docs/handoffs/` and `handoff/` | Dated implementation evidence | Historical only; never a second current authority. |

The root Phase 1 Guide is intentionally a duplicate of the full Guide's visual structure with a smaller, meeting-approved catalogue. Do not redesign that Guide as part of the PRD task.

---

## 3. Latest Phase 1 product contract

### 3.1 No visible Starts when choice

- Do not expose a `Starts when` tab, picker or customer-configurable trigger block in Phase 1.
- Do not describe Phase 1 as a Trigger-first journey.
- Keep `Start from scratch` as the primary interactive Builder route. Reuse the existing Guide/Builder structure; remove only the customer-facing `Starts when` section and update the available Rules and Actions.
- Do not replace the Builder with a static catalogue and do not redesign the duplicated Guide.
- The runtime still needs an internal execution contract, but that contract is not a Phase 1 customer choice.
- Record the internal execution contract as an open decision; do not invent Stage entry, first publish or record replay behaviour.

### 3.2 Blocks available to the user

Phase 1 exposes:

1. **Rule — optional**
2. **If Yes / If No branches** created by the Rule
3. **Wait — optional**, configured in hours or days
4. **Action**

Phase 1 does not expose:

- AND / OR groups;
- Stop Branch as a selectable block; or
- a customer-configurable Starts when block.

One Rule asks one Yes / No question. Do not combine multiple checks inside one Rule.

### 3.3 Exactly three Rules

| Rule | Customer choices | Evaluation |
|---|---|---|
| **Deal Label** | Choose `Has` or `Does not have`, then choose one existing Deal Label. | Yes only when the saved Deal matches the exact Label condition. |
| **Deal Value** | Choose `Fixed value`, `Minimum`, `Maximum` or `Range`; enter one amount or minimum–maximum amounts. | Compare the current Deal Value using the Deal currency. Do not treat Quote total or Margin Value as Deal Value. |
| **Margin Value** | Choose `Fixed value`, `Minimum`, `Maximum` or `Range`; enter one amount or minimum–maximum amounts. | Compare the agreed Deal Margin Value. Margin percentage is not included unless Product later adds a separate contract. |

Validation requirements:

- Fixed value requires one valid amount.
- Minimum requires one valid lower bound.
- Maximum requires one valid upper bound.
- Range requires valid minimum and maximum amounts, with minimum not greater than maximum.
- Missing or invalid values keep the Automation Draft incomplete and identify the exact field.
- The multi-Quote Margin Value source and aggregation method remain an open decision.

### 3.4 Exactly ten Actions

The same Phase 1 Action catalogue is shown in every supported Stage. Context and Stage guardrails still apply.

1. Assign the Deal to a person
2. Create a Note
3. Schedule a Meeting or Site Visit
4. Add someone to Watch this Deal
5. Remove someone from Watching this Deal
6. Add a Deal Label
7. Remove a Deal Label
8. Add an Interest
9. Request a file
10. Move the Deal to a Stage

Important Action contracts:

- **Create a Note:** may include an optional @Mention. Use this instead of a separate internal-notification Action.
- **Remove a Deal Label:** may remove only a permitted system- or Automation-managed Label, not an arbitrary user-managed Label.
- **Add an Interest:** requires clear structured evidence. Free-text keyword inference is not enough.
- **Request a file:** one Action creates one named request. Requesting two files requires two Actions/items.
- **Move Stage:** normally the final Action in that path. It may select only a permitted Custom or working Stage and may not directly set or skip a protected Quote Stage, Won or Lost.

Do not expose these as Phase 1 Actions:

- Set the Deal Next Action
- Clear the Deal Next Action
- automatic attachment of a reusable file to the Deal
- Send an internal notification
- Remove Interest
- Set the Expected Close Date
- Create Quote or Create another Quote option as a general Automation Action

Multi-Quote remains a CRM/platform capability. Removing Create Quote from the Phase 1 Automation picker must not remove normal multi-Quote behaviour from CRM.

### 3.5 Request File human-review flow

The Phase 1 status model is:

```text
Open → Uploaded — needs review → Complete
```

- The Action creates one named File Request / Focus Point.
- The requested person uploads a file.
- Uploading does not automatically prove that it is the correct file.
- A team member reviews the upload and marks the named request Complete.
- A normal, unrelated Deal file upload must not complete the request.
- Phase 1 does not require automatic file-content validation.

### 3.6 One guided Template

- Phase 1 contains exactly **one** guided starter Template.
- Its purpose is to lower the learning curve.
- Its exact name, Quote context, Rule/Wait/Action recipe and editable fields have not yet been confirmed.
- Do not select one of the former twelve Templates or invent a new recipe in the PRD.
- Record the exact Template recipe as an open Product decision.
- Once confirmed, its structure is fixed and the user changes only explicitly approved setting values.

### 3.7 Custom Stages and Pipelines are included

Phase 1 includes all three product cases:

1. Add a Custom Stage to the existing Quote Pipeline.
2. Create another Pipeline that keeps the protected Quote lifecycle and supports approved Custom Stages.
3. Create a Standalone Pipeline with user-defined working Stages and no Quote lifecycle.

The same three Rules, optional Wait and ten Actions are available in supported working Stages. Apply these boundaries:

- Protected Quote Stages retain stable identity and Quote-driven movement.
- Move Stage cannot directly select or bypass Qualified, In Progress, In Review, Passed Review, Sent, Won or Lost.
- In a Standalone Pipeline, Move Stage can target a permitted working Stage; Won and Lost remain protected results.
- Pipeline creation, permissions, migration, reporting continuity, deletion safeguards and active-Automation impact need explicit acceptance criteria rather than being left as vague future work.

### 3.8 Draft, Publish and activation

Publish is included in Phase 1.

Use a state model that clearly distinguishes:

```text
Draft → Publish → Inactive → Activate → Active
```

- An unfinished Automation remains a Draft and may be saved without blocking other Automations.
- Validation blocks publishing or activating only the incomplete Automation; it must not block unrelated complete Automations.
- Publishing creates a complete version but does not silently turn it on.
- Activation is explicit.
- Editing an Active Automation must not replace the running version until changes are published according to the confirmed versioning contract.

Do not remove Publish from Phase 1. Exact permission and version-replacement details may be acceptance criteria/open decisions where not already settled.

---

## 4. Existing PRD statements that must be reconciled

Search the current PRD for these earlier claims and rewrite or explicitly mark them superseded where they describe current Phase 1:

- twelve Fixed Templates;
- customer-visible Starts when selection or a Trigger-first journey (the Start from scratch Builder itself remains in Phase 1);
- 14 shared Actions, 16 total Action types or 100 Action placements;
- 11/30+ selectable Rules;
- AND / OR groups;
- Stop Branch as a user block;
- Attach a reusable file automatically;
- internal notification Action;
- Set/Clear Deal Next Action Actions;
- Custom Stages, another Quote-lifecycle Pipeline or Standalone Pipeline described as outside Phase 1 or only a review proposal;
- 15,238 flow shapes or 1,300 compatibility decisions presented as the current Phase 1 size;
- twelve-Template setting totals such as 63 controls or 86% reuse presented as the current Phase 1 implementation contract.

These old numbers may remain only in a clearly labelled historical decision record. They must not appear as the current Phase 1 summary.

---

## 5. Decisions still open — do not invent answers

1. What internal event starts a Phase 1 Automation when Starts when is not customer-configurable?
2. What happens to existing matching Deals when an Automation is first published or activated?
3. What are the replay, re-entry and idempotency rules?
4. What is the single guided Template's exact recipe and editable setting list?
5. For multiple related Quotes, which records feed Deal Margin Value and how is it aggregated?
6. What warning and permission behaviour applies when Move Stage finds open required work / Focus Points?
7. What are the allowed minimum and maximum Wait durations for hours and days?
8. Is Preview included in the customer journey, and what exactly does it show? Test Automation is not part of the confirmed Phase 1 choice list.
9. What permissions control Publish, Activate and replacement of an Active version?

Give each open decision an owner and decide-by point. Do not silently convert an open decision into a requirement.

---

## 6. PRD acceptance checks

The updated PRD must pass all of these checks:

- It identifies itself as the current Phase 1 PRD and contains no competing second PRD.
- Current Phase 1 summary says **1 Template, 3 Rules, 10 Actions, Wait in hours or days**.
- No customer-facing Starts when choice appears in the Phase 1 contract.
- Deal Value and Margin Value both document Fixed, Minimum, Maximum and Range.
- Request File uses human review and named-request completion.
- Custom Stages, another Quote-lifecycle Pipeline, Standalone Pipeline and Publish are in Phase 1.
- An incomplete Draft does not block unrelated complete Automations.
- Protected Quote lifecycle movement and multi-Quote CRM behaviour remain intact.
- The former 12-Template / 15,238-shape model is not presented as current Phase 1.
- Every unresolved product detail is listed as an open decision rather than invented.
- Existing FR and AC identifiers are preserved where possible; superseded requirements are rewritten or explicitly cross-referenced rather than silently duplicated.

---

## 7. Hand-back required from Claude

Return:

1. the exact path updated;
2. sections, FRs and ACs added or rewritten;
3. every old statement marked superseded;
4. every remaining source conflict;
5. all open decisions and blockers;
6. validation results for HTML structure, navigation and requirement-ID continuity; and
7. confirmation that no prototype, Guide, Mind Map, QA workbook, commit or push was changed during the PRD task.
