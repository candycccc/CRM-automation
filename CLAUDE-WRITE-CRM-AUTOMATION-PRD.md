# Claude PRD Writing Brief — WeQuote CRM Automation

**Prepared:** 29 August 2026  
**Status:** canonical update brief for the formal Phase 1 PRD  
**Repository root:** `/Users/candy/Documents/1.WeQuote/1.Design/17-Prototype-html/CRM-automation`  
**Primary output:** `docs/WeQuote-CRM-Phase-1-PRD.html`

---

## 1. Claude's task

Write a complete, evidence-based PRD for **WeQuote CRM Automation**.

The PRD must explain the product as two top-level branches:

1. **With Quote Lifecycle**
2. **Without Quote Lifecycle**

Within the Quote Lifecycle branch, it must explain the difference between:

- the twelve managed fixed Templates;
- compatible Custom Automation in every existing Quote context;
- a Custom Stage inserted into the existing Quote Pipeline; and
- another Pipeline that still uses the protected Quote lifecycle.

Within the branch without Quote Lifecycle, it must explain a Standalone Pipeline with user-defined working Stages and Deal-only Automation choices.

The PRD must distinguish:

- selected product direction;
- current prototype behaviour;
- production runtime readiness;
- review proposals; and
- work that is outside Phase 1.

Do not infer CRM capabilities from the Automation catalogue. Start from the CRM and Quote capabilities proven by the canonical sources, then describe what Automation may safely read or change.

---

## 2. Deliverable and single-PRD rule

### Update the canonical PRD in place

Update this existing self-contained HTML file:

```text
docs/WeQuote-CRM-Phase-1-PRD.html
```

This is the only canonical Phase 1 PRD. Preserve its existing wider CRM requirements, embedded images, navigation and
self-contained format while reconciling the confirmed Automation direction and the latest cross-module evidence.

Do not create a second PRD source, Markdown copy or differently named V8/V9 PRD. Use Git diff/review for recovery and
review the changed canonical HTML before hand-back.

### Do not change in the PRD update task

- Do not modify `index.html`, `quote-detail.html` or anything under `assets/`.
- Do not rebuild the Guide or Mind Map.
- Do not update the QA workbook or Google Sheet.
- Do not remove unrelated existing Phase 1 requirements from the canonical PRD.
- Do not commit, push or publish.
- Do not copy the whole dated `handoff/` snapshot back into the repository root.

---

## 3. File placement and authority map

All relative paths below are relative to:

```text
/Users/candy/Documents/1.WeQuote/1.Design/17-Prototype-html/CRM-automation
```

### 3.1 Read these first, in this order

| Order | Relative path | Status | Use in the PRD |
|---:|---|---|---|
| 1 | `docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md` | **Current Automation decision authority** | Controls Template versus Custom authoring, Action policy and the distinction between Quote-connected and Standalone Pipelines. |
| 2 | `docs/WeQuote-CRM-Phase-1-PRD.html` | **Current wider Phase 1 baseline, with 29 August Automation addendum** | Controls the wider CRM scope. Read superseded Automation wording together with its visible addendum notices. |
| 3 | `QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html` | **Current colleague-facing scope overview** | Shows the two top-level branches and the relationship between Templates, Custom, Custom Stages and Pipelines. |
| 4 | `docs/quote-automation/QUOTE-LIFECYCLE-FROM-SCRATCH-STAGE-CATALOGUE.md` | Detailed review evidence | Provides Starts when, Rule, Action, Stage, recipe, evidence and readiness detail. Its 79 examples are candidates, not the twelve Templates. |
| 5 | `CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md` | Verified Guide specification and calculation record | Use the verified 12-Template settings, 63/14/86%, 33/100/1,300/15,238 calculations, safety rules and acceptance tests. |
| 6 | `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html` | Interactive reference | Use to understand the current interaction model and embedded catalogue. It is not allowed to overrule the product-direction record or PRD addendum. |
| 7 | `docs/visuals/template-vs-scratch-scope.html` | Verified colleague-facing comparison | Use the white-background scope comparison and its explanatory calculations. |
| 8 | `docs/handoffs/NEXT-CHAT-HANDOFF-AUTOMATION-TRIGGER-FIRST-BUILDER-2026-08-28.md` | Current implementation handoff | Use for the implemented Trigger-first creator journey and test evidence. Treat dated behaviour as implementation history where a newer decision exists. |

### 3.2 Runnable prototype evidence

| Relative path | What it proves | Authority limit |
|---|---|---|
| `index.html` | Current CRM and Automation entry points, pipeline list, focused map/list and Builder journey. | Prototype evidence only; visible UI is not proof of production runtime readiness. |
| `quote-detail.html` | Dedicated Quote workspace opened from the Quotes list. | Do not use deprecated `quote-workspace.html`. |
| `assets/js/automation.js` | Current Automation Creator, compatibility, Builder, preview, list/map and prototype runtime behaviour. | Code is not allowed to preserve a rule that the newer product-direction record supersedes. |
| `assets/css/automation.css` | Current Automation layout, panel, map and responsive presentation. | Styling evidence only. |
| `assets/js/crm.js` | Current CRM prototype records and interactions, including Deal watchers. | Prototype evidence, not proof of a production Deal model. |
| `assets/js/quote-demo.js` | Quotes list, linked Deal/options, company scope and dedicated Quote workspace behaviour. | Prototype evidence only. |
| `assets/js/focus-widget.js` | Needs Your Attention floating widget behaviour. | Adjacent integration evidence; the widget is hidden while the user is editing the Automation map/Builder. |
| `crm-note-attention-phase1.js` | Phase 1 Note, Meeting and follow-up bridge. | Adjacent integration evidence. |

### 3.3 Adjacent CRM documents that the PRD must reconcile

| Relative path | Use |
|---|---|
| `docs/CLAUDE-HANDOFF-QUOTE-AND-SALES-UPDATE.md` | Quotes list, dedicated Quote workspace, linked Deal, Quote options and multi-company behaviour. |
| `docs/CLAUDE-ACTION-QUOTE-DETAIL-WORKSPACE-BUG.md` | Dated Quote Detail routing evidence and blocking browser acceptance checks. Re-verify the latest runnable route before claiming the bug is still open. |
| `docs/needs-your-attention/NEEDS-YOUR-ATTENTION-COMPLETE-REVIEW-PACK-2026-08-28.md` | Complete Needs Your Attention review pack and shared outcome surfaces. |
| `docs/needs-your-attention/PHASE-1-NEEDS-YOUR-ATTENTION-SCOPE-2026-08-28.md` | Phase 1 Needs Your Attention boundary. |
| `docs/needs-your-attention/PRD-NEEDS-YOUR-ATTENTION-CROSS-MODULE-CREATE-2026-08-28.md` | Cross-module Create Note, Meeting and follow-up requirements. |
| `docs/PRD-PLATFORM-TASK-WIDGET.md` | Platform task-widget decisions that affect shared Automation outcomes. |
| `docs/CRM-PHASE-1-SPEC.md` | Wider CRM Phase 1 specification. |
| `docs/WeQuote-CRM-Design-System.html` | Current design-system reference. |
| `docs/UI-ALIGNMENT-PROTOTYPE-VS-PORTAL.md` | Prototype-versus-Portal UI alignment evidence. |

### 3.4 Package and publishing documents

| Relative path | Use |
|---|---|
| `README.md` | Canonical repository entry and document index. |
| `UPLOAD-MANIFEST.md` | Exact selected upload set and exclusions. |
| `docs/quote-automation/README.md` | Automation-specific reading order. |
| `docs/WeQuote-CRM-Phase-1-QA-Checklist.xlsx` | Frozen/local workbook supporting the live QA Sheet. Do not replace the live Sheet by importing it again. |

### 3.5 Historical or excluded material

Do not use these as current authority:

- `handoff/WeQuote-CRM-Full-Roadmap-Phase-1-2-3-2026-08-26/` — dated full-folder snapshot;
- `handoff-focus-point/` and `handoff-needs-your-attention 2/` — dated packaged snapshots;
- `quote-workspace.html` — deprecated Quote workspace experiment;
- `docs/PRD-AUTOMATION-UPDATE-BRIEF-FOR-CLAUDE-2026-08-25.md`;
- `docs/PRD-AUTOMATION-FINAL-FOLLOW-UP-FOR-CLAUDE-2026-08-25.md`;
- `docs/PRD-PHASE-1-ONLY-RESTRUCTURE-BRIEF-FOR-CLAUDE-2026-08-25.md`;
- `docs/PRD-AUTOMATION-CLARIFICATIONS-FOR-CLAUDE-2026-08-25.md`;
- old ZIP archives, screenshots and top-level `focus-widget-*` concept files.

These can be cited only to explain historical implementation or a superseded decision. They must never reverse a newer 29 August decision.

---

## 4. Conflict-resolution order

When sources disagree, use this order:

1. The 29 August product-direction record for Automation authoring and Action policy.
2. The repository-level Phase 1 PRD for wider committed CRM scope, read with its addendum.
3. A newer dated product-owner decision recorded in the canonical root or `docs/quote-automation/`.
4. The detailed catalogue for compatibility and evidence.
5. The current runnable prototype for implementation evidence.
6. Dated handoffs for historical implementation context only.

For every disputed feature, the PRD must show three separate status fields:

| Status field | Allowed values |
|---|---|
| **Product direction** | Selected / Review proposal / Out of Phase 1 / Withheld |
| **Prototype implementation** | Exposed / Partly demonstrated / Hidden or disabled / Not built |
| **Runtime readiness** | Live / Adapter required / New build / Contract required / Withheld |

Add a fourth field, **Readiness blocker**, naming the missing event, model, scheduler, rule evaluator, permission, decision or connection.

When evidence labels are needed, use the canonical vocabulary consistently:

- `LIVE INTERNAL EVENT`
- `LIVE EXTERNAL WEBHOOK EVENT`
- `LIVE STATE — NO INTERNAL EVENT`
- `LIVE REUSABLE CAPABILITY`
- `P1 ADAPTER / RESOLVER`
- `P1 NEW MODEL / RUNTIME`
- `P1 SCHEDULED SCAN`
- `SPEC ONLY / WITHHELD`

---

## 5. Product model the PRD must use

### Branch A — With Quote Lifecycle

The protected Quote lifecycle contexts are:

1. Qualified
2. In Progress
3. In Review
4. Passed Review
5. Sent
6. Won
7. Lost

Archived remains a Deal status, not an Automation placement context.

Every one of the seven contexts provides two separate creation routes:

```text
Custom | Templates
```

The current prototype presents **Custom first** and **Templates second**. Templates remain important because they lower the learning curve; they are not the only route.

This branch contains four layers:

1. twelve managed fixed Templates in the existing Quote Pipeline;
2. compatible Custom Automation in every existing Quote context;
3. a Custom Stage inserted into an approved gap of the existing Quote Pipeline; and
4. another Pipeline that still uses the protected Quote lifecycle — review proposal only, not confirmed Phase 1.

### Branch B — Without Quote Lifecycle

A Standalone Pipeline:

- has its own Pipeline name and user-defined working Stage names/order;
- uses approved Deal/CRM Starts when events, Rules and Actions;
- does not show Quote-specific Starts when events, Quote Rules or Create Quote Actions;
- does not receive automatic Quote lifecycle movement; and
- keeps Won and Lost as protected result meanings.

Standalone Pipeline creation and management are outside the current Phase 1 baseline unless a newer written decision explicitly includes them.

### Scope-status table to preserve

| Capability | Product status on 29 August 2026 | Important qualification |
|---|---|---|
| Twelve managed Quote Templates | Selected Phase 1 direction | Structurally locked; 63 approved editable control instances. |
| Compatible Custom Automation in all seven existing Quote contexts | Selected current direction | Front-end demonstrated; production persistence/events/runtime remain unproven. |
| Deal foundation, Next Action, Meetings, Watchers, Labels, Interests and named File Requests | Phase 1 committed new build where specified by the wider PRD | Committed scope does not mean runtime-ready. Each still needs its stated model/event/connection. |
| Customer-created Custom Stage inside the Quote Pipeline | Separately tracked scope decision | Do not infer approval from existing-context Custom Automation. |
| Another Pipeline with Quote Lifecycle | Review proposal | Not confirmed Phase 1. |
| Standalone Pipeline without Quote Lifecycle | Separate route, not confirmed Phase 1 | Deal-only Automation choices; no Quote lifecycle behaviour. |
| Managed Template ↔ Custom conversion | Open product contract | Neither direction is implied by editing or viewing a Template in Builder. |

---

## 6. Managed Templates

There are exactly **twelve** managed Templates. They are closed, approved flow shapes — not generated combinations.

For every Template, the following remain fixed:

- Template identity and name;
- Quote context;
- Starts when event;
- Rule and operator;
- Yes/No branch shape;
- Wait position;
- Action types;
- step order;
- duplicate-prevention behaviour; and
- protected lifecycle checkpoint.

A user changes only declared setting values.

| # | Context | Template | Editable controls |
|---:|---|---|---:|
| 1 | Qualified | Qualified first Next Action | 5 |
| 2 | Qualified | Qualified inactivity reminder | 7 |
| 3 | Qualified | Site visit and pre-Quote readiness | 6 |
| 4 | In Progress | Quote build and SOW checks | 6 |
| 5 | In Review | Internal Quote review | 6 |
| 6 | Passed Review | Ready-to-send check | 6 |
| 7 | Passed Review | High-value approval | 2 |
| 8 | Sent | Sent Quote follow-up | 7 |
| 9 | Sent | Quote expiry reminder | 6 |
| 10 | Won | Won Deal handoff | 6 |
| 11 | Won | Accepted Quote → Draft Invoice | 0 |
| 12 | Lost | Lost Deal reason follow-up | 6 |
|  |  | **Total** | **63** |

The 63 control instances use fourteen unique setting field types. Twelve of the fourteen field types can reuse broader Builder controls:

```text
12 ÷ 14 = 85.7% = 86% rounded
```

The PRD must say clearly that **86% is UI-control reuse, not scope or QA equivalence**.

Adding a Template creates a complete, valid **Inactive** instance using approved defaults. It does not become Custom merely because the user edits an allowed value or views it in Builder.

---

## 7. Custom Automation in every Quote context

Custom uses a Trigger-first journey:

1. select the fixed Quote context;
2. select **Custom**;
3. choose one compatible **Starts when** event;
4. create a **Draft** with that Trigger placed;
5. open Builder;
6. optionally add a Wait;
7. optionally add one or more compatible Rules using plain **all of these / any of these** language;
8. add at least one permitted Action to the Yes path;
9. optionally add No-path Actions, otherwise stop that path; and
10. validate and explicitly activate.

The selected Quote context stays fixed. The Trigger may change only to another Trigger compatible with that context.

### Draft, Inactive and Active

Use only these clear states:

- **Draft** — incomplete or not ready to run;
- **Inactive** — complete and valid, but switched off;
- **Active** — switched on and eligible to run.

Do not use a confusing separate **Needs setup** lifecycle state. An incomplete Draft remains saved and editable. It must not block another complete Automation from being activated. Activation validates the selected Automation and explains its missing items directly.

The persisted `enabled` value for a Draft is false, so older technical notes may call it an “Inactive Custom draft.” In the
user interface, show **Draft** until the flow is complete and valid; then show **Inactive** while it remains switched off.

### Plain-language block model

| Block | Meaning |
|---|---|
| **Starts when** | The saved change or date that starts the Automation. Exactly one is required. |
| **Wait** | Pause for a chosen time. Optional. After waiting, check the current state again. |
| **Rule** | A check that sends the flow down Yes or No. Optional. Multiple confirmed checks may use all/any. |
| **Yes** | Actions run when the Rule matches. At least one permitted Action is required before activation. |
| **No** | Optional Actions when the Rule does not match; otherwise stop this path. |
| **Action** | A visible CRM result such as a Note, Meeting, Next Action, Label or File Request. |

Avoid academic terms in the main UI and PRD user stories. Technical event, idempotency and adapter detail belongs in the implementation section.

---

## 8. Compatibility and scale facts

For the seven existing Quote contexts, the reviewed Creator matrix contains:

- 18 unique Starts when types;
- 33 allowed Starts-when placements;
- 16 Action types in the compatibility calculation;
- 100 static Stage × Action placement decisions;
- at least 1,300 static compatibility decisions before runtime testing; and
- 15,238 deliberately simplified flow shapes using one Starts when, zero or one compatible Rule and one candidate Action.

The PRD must include these caveats:

- 15,238 is not 15,238 independent test cases;
- it is not a delivery-time multiplier;
- it is not the full configuration space;
- multiple Rules, AND/OR, Waits, multiple Actions, branches, permissions, replay and multi-Quote states make the real QA space larger; and
- the counts compare product surface area, not engineering days.

Use the exact formulas and per-context tables from `CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md`. Do not recalculate them from memory.

The catalogue's 79 rows are **reviewed candidate examples**, not Templates. Five additional ideas are withheld. At the reviewed baseline, none of the 79 was proven live end to end.

---

## 9. Action policy

The shared selectable Action catalogue contains fourteen Action types:

1. Create Note
2. Schedule Meeting or Site Visit
3. Assign Deal Owner
4. Send internal notification
5. Add Deal Label
6. Remove Deal Label — conditional
7. Set Deal Next Action
8. Clear Deal Next Action
9. Add Deal watcher
10. Remove Deal watcher
11. Add Interest — conditional
12. Set Expected Close Date
13. Attach file to Deal
14. Request a file

### Interest and Label rules

- Interest records structured customer need for a subsystem such as Lighting, AV, Panels or Security.
- Add Interest only from clear structured evidence and an exact approved Interest identity.
- Never infer Interest from a free-text keyword.
- **Remove Interest is not an Automation Action.** It remains a manual CRM operation.
- Labels are internal work markers.
- Add Label may use an existing permitted Label identity.
- Remove Label may remove only a system- or Automation-managed Label owned by the executing Automation or approved managed process.

### File rules

- Attach file to Deal uses a reusable managed file/template.
- It is not a free upload performed afresh every time the Automation runs.
- Request a file creates a named File Request linked to the Deal.
- A generic upload does not satisfy a named File Request.
- The request counts as Received only when the named request is linked to the supplied file and marked Received.

### Protected operations

Customer-authored Automation must not:

- send or resend a customer Quote;
- approve, reject or accept a Quote;
- accept on behalf of a customer;
- write Qualified, In Progress, In Review, Passed Review or Sent directly;
- mark a Deal Won or Lost directly;
- bypass the Quote-driven lifecycle resolver;
- create a Draft Invoice as a general Action; or
- remove Interest automatically.

---

## 10. Guarded Create Quote Actions and multi-Quote logic

The PRD must distinguish two different proposed guarded Actions.

### Create the first Quote for this Deal

Only while the Deal is Qualified and has no current Quote:

- create one empty Quote;
- link it to the same Deal;
- start it at In Progress;
- do not send it;
- create no more than one Quote in one Automation run; and
- move the Deal to In Progress only after successful creation/linking.

### Create another Quote option

Only while the Deal is In Progress and already has a current Quote:

- create a separate empty Quote option for the same Deal;
- do not treat it as a revision or variation;
- start it at In Progress and do not send it;
- create no more than one option in one run; and
- allow a later separate run to create a further option if the approved contract permits it.

At In Review, Passed Review or Sent, another Quote could mean an option, revision or variation. WeQuote must not guess. Won and Lost never expose Create Quote.

These guarded Actions remain subject to explicit product/runtime approval where the catalogue records unresolved contracts. Do not describe them as production-ready merely because the Guide or prototype demonstrates them.

### Multi-Quote resolver

- A Deal may have several Quote options.
- The first Quote and another option are different operations.
- A new option is not automatically a revision or variation.
- A Quote event evaluates the Quote option that caused the event.
- A Deal lifecycle check evaluates the relevant viable Quote set.
- Revisions count as one commercial option; use the latest active revision for that option.
- The Quote furthest through the lifecycle represents the working Deal Stage.
- If one option is accepted, it wins and the other options become Lost.
- If every current Quote is Cancelled, the Deal becomes Archived rather than Lost.
- One failed option does not make the Deal Lost while another can still be accepted.

Every delayed path must recheck the Deal, Quote family and lifecycle context after its Wait.

---

## 11. Custom Stages in the existing Quote Pipeline

A Quote-connected Custom Stage keeps its own stable identity and is placed in one of five lifecycle gaps:

| Gap | Meaning | Extra Quote choices | Create Quote boundary |
|---|---|---|---|
| Qualified → In Progress | Before the first Quote exists | Qualified checks | Create first Quote only |
| In Progress → In Review | At least one editable Quote exists | Quote saved and pricing-change choices | Create another Quote option only |
| In Review → Passed Review | Formal internal review | Submission and review-note choices | No Create Quote Action yet |
| Passed Review → Sent | Review passed, not sent successfully | Passed-review choices | No Create Quote Action yet |
| Sent → Won/Lost | Customer outcome pending | Sent, viewed and expiry choices | No Create Quote Action yet |

Each Custom Stage gets:

- nine shared Deal Starts when choices;
- **Deal enters this Custom Stage** as an additional Stage-specific choice;
- eleven shared Rules;
- the eligible shared Action set; and
- only the Quote-specific choices safe in its lifecycle gap.

The protected Quote Stages and derived results retain their identity and automatic Quote-driven movement. Automatic customer-defined Stage movement is not approved until target, permission, required-work, duplicate and loop contracts exist.

Custom Stage creation, move, delete, Deal migration and release timing remain separate scope decisions from Custom Automation inside an existing context.

---

## 12. New Pipeline routes

### Another Pipeline with Quote Lifecycle

This is a **review proposal, not confirmed Phase 1**.

It would retain:

- protected Quote Stages;
- Quote-driven movement and outcomes;
- multi-Quote resolver rules;
- compatible Automation in every Quote context; and
- the same five approved gaps for Quote-connected Custom Stages.

It additionally requires contracts for Pipeline identity, permissions, Deal migration, reporting continuity, deletion safeguards, active-Automation impact and multi-Quote behaviour.

### Standalone Pipeline without Quote Lifecycle

This is a separate top-level product branch and is outside the current Phase 1 baseline unless newly approved.

It uses:

- user-defined working Stages;
- nine shared Deal starts plus Deal enters this Stage;
- eleven shared Rules; and
- the eligible shared Deal Action set.

It does not show Quote-specific events, Quote Rules, Create Quote Actions or automatic Quote lifecycle movement.

Do not describe Pipeline management as free because the same UI cards can be reused. It introduces creation, rename, order, archive, migration, permission, routing, deletion, reporting and active-Automation contracts.

---

## 13. Required Creator, map and Builder UX requirements

The PRD must include these current UX decisions:

- Custom appears before Templates in the creation panel.
- Selecting a Stage must pan/jump the map to that Stage.
- Provide a labelled bottom Stage navigator/minimap for direct Stage navigation.
- Map zoom controls must support zoom in and zoom out, plus Fit view.
- The user may pan/drag the map.
- Opening the creator panel uses a visible but restrained animation so the click never appears to do nothing.
- The creator remains alongside the map; it must not replace the page with a full-screen picker that hides the flow.
- Dragging/panning the canvas closes or safely collapses the open picker/panel.
- The Automation map and Builder hide the floating Needs Your Attention widget so it cannot cover controls.
- Custom Trigger selection creates a Draft and opens Builder.
- Templates remain structurally locked and expose only approved settings.
- Edit remains available from the Automation list.
- Incomplete Drafts are saved but cannot activate; they do not block activation of other complete Automations.
- Activation errors name the exact missing Trigger, Rule setting or Action rather than showing a generic message.
- A test/practice run never creates live CRM data and is not itself required for activation when validation is otherwise clean.

Use a compact visual hierarchy. All diagrams, exports and print views use an explicit white background.

---

## 14. Production-runtime honesty and known blockers

The PRD must not claim that the prototype proves production readiness.

Known blockers or gaps that require explicit treatment include:

1. Quote events must respect the selected Automation context rather than bypassing Stage matching.
2. **First Quote** must mean no current Quote → one current Quote; it must not fire for every `quote.created`, option, revision, template or unrelated Quote.
3. Next Action created, edited, due, overdue, completed, rescheduled and cleared must remain distinguishable.
4. The selectable Rule catalogue and runtime evaluator must have one canonical compatibility source; an unsupported Rule must never silently produce the wrong result.
5. Persisted Automation definitions, versions, Drafts and active revisions need a durable model.
6. Permissions, account boundary, audit history, idempotency, retry/replay and duplicate prevention are mandatory.
7. Wait, expected-close, inactivity and Quote-expiry paths require dependable schedulers and rescheduling/cancellation behaviour.
8. File Request needs a real named request model and exact request-to-file linkage.
9. Multi-Quote option, revision and variation identity must be durable.
10. Customer-view behaviour requires the proven durable activity/event contract, not an invented generic boolean flag.

Where the catalogue supplies blocker IDs, retain them so Engineering and QA can trace the requirement:

- `phase1-deal-automation`
- `deal-quote-relation`
- `deal-lifecycle-resolver`
- `scheduled-fire-once`
- `quote-expiry-scan`
- `meeting-model`
- `file-request-model`
- `review-note-model`
- `quote-save-diff-event`
- `sent-event-normalization`
- `customer-view-subscription/query`
- `acceptance-normalization`
- `safe-clear-contract`
- `post-wait-revalidation`

Do not repeat these previously disproven claims:

- an existing hourly Quote-expiry job;
- a Quote-expiry `notified` flag;
- a generic production customer-view boolean;
- a production Deal table; or
- a fully working end-to-end runtime for all 79 candidate examples.

Where production already emits a Quote event, identify the exact event and still state what Deal/context adapter is missing.

### Decisions that must remain open unless a newer source resolves them

- Managed Template to Custom conversion, versioning and support contract.
- Final approval of the two guarded Quote-creation Actions.
- Exact relevant/viable/current Quote treatment across templates, samples, alternatives, revisions, archived/cancelled Quotes and change orders.
- Backward lifecycle recalculation and the exact Lost-versus-Archived boundary.
- Customer-view boundary: first/every/per-revision and its independence from legacy email preferences.
- Quote-save and pricing materiality, including pricing categories and old/new payload.
- Structured SOW source and event.
- Deterministic fields or validators for content complete, review destination, review Note, deposit, commercial handoff and Loss Reason.
- Pipeline creation, Stage migration, permissions, reporting, deletion safeguards and active-Automation impact.

Put these in an owned Open Decisions table. Do not silently choose an answer inside the PRD.

---

## 15. Needs Your Attention and shared CRM outcomes

Automation outcomes must appear on the same CRM surfaces as manually created work:

- Notes;
- Meetings and Site Visits;
- Deal Next Actions and follow-ups;
- File Requests;
- Labels, Interests and Watchers where allowed; and
- Needs Your Attention when an item requires the current user's action.

The Phase 1 Needs Your Attention surface is task-first. `My Notes` and a special `My Dashboard` mode are not required parts of that Phase 1 widget.

The widget is user-configurable in workspace customisation, appears under Modules in the personal settings structure, and may be enabled or disabled for that user. Its compact pill retains a plus button for Create follow-up. Completed work remains reviewable through filters, and reopening/rescheduling follows the current review pack.

Keep this integration section adjacent to, but separate from, the core Automation authoring scope.

---

## 16. Required PRD structure

Write the Markdown draft in this order:

1. Document control, date, owner, status and source authority.
2. Executive summary.
3. Problem and user value.
4. Goals and measurable outcomes.
5. Non-goals and out-of-scope items.
6. Personas and permissions.
7. Product model: With Quote Lifecycle / Without Quote Lifecycle.
8. Quote lifecycle and multi-Quote resolver.
9. Twelve managed Templates and editable settings.
10. Custom Automation creation and Builder model.
11. Starts when catalogue and placement rules.
12. Rule, Wait and branch behaviour.
13. Action catalogue and safety boundaries.
14. Custom Stage placement rules.
15. Another Quote-lifecycle Pipeline proposal.
16. Standalone Pipeline proposal.
17. Draft, Inactive, Active, publish and version behaviour.
18. Map, panel, Stage navigation and responsive UX requirements.
19. CRM outcome integration and Needs Your Attention.
20. Data model and stable identifiers.
21. Event, scheduler and runtime contracts.
22. Validation and flow-safety checks.
23. Permissions, account isolation and audit.
24. Error, retry, replay and duplicate handling.
25. Reporting and observability.
26. Functional requirements with stable IDs.
27. Acceptance criteria with stable IDs.
28. Phase 1, review-proposal and later-phase scope table.
29. QA strategy and traceability.
30. Open decisions, owner and decision deadline.
31. Source register and superseded statements.

Every functional requirement must contain:

- stable ID;
- user or system actor;
- precondition;
- action/behaviour;
- visible result;
- error/safe-stop result;
- product-direction status;
- runtime-readiness status;
- source path; and
- matching acceptance-criterion ID.

---

## 17. Writing rules

- Write in clear, professional English for Product, Design, Engineering and QA.
- Prefer **Starts when**, **Rule**, **Wait**, **Yes**, **No** and **Action** in user-facing sections.
- Explain technical terms the first time they appear.
- Do not write “current” without saying product direction, prototype implementation or runtime readiness.
- Do not convert a review proposal into committed Phase 1 scope.
- Do not call the 79 reviewed examples Templates.
- Do not claim 15,238 independent tests.
- Do not count Remove Interest as selectable merely to preserve an old total.
- Do not hide a source conflict. Put it in Open decisions with an owner.
- Do not invent a CRM field, event, status, model, scheduler or permission because an Automation block would be convenient.
- Cite repository-relative source paths next to material requirements.
- Keep diagrams and tables on a white background in any HTML/PDF rendering.

---

## 18. Minimum acceptance checklist for Claude

### Scope and content

- [ ] Two top-level branches are explicit: With Quote Lifecycle and Without Quote Lifecycle.
- [ ] All seven Quote contexts show separate Custom and Template routes.
- [ ] Exactly twelve managed Templates and 63 editable control instances are documented.
- [ ] Fixed Template structure and editable values are separated.
- [ ] Custom Trigger-first creation, Draft semantics and activation rules are documented.
- [ ] Eighteen Starts when types, 33 placements, 16 Action types, 100 placements, 1,300 decisions and 15,238 simple shapes include their caveats.
- [ ] The 79 reviewed examples are not called Templates.
- [ ] Remove Interest is withheld/manual.
- [ ] Add Interest and Remove Label include their conditions.
- [ ] The two guarded Create Quote Actions and multi-Quote behaviour are separated.
- [ ] All five Quote-connected Custom Stage gaps are documented.
- [ ] Another Quote-lifecycle Pipeline is labelled review proposal, not confirmed Phase 1.
- [ ] Standalone Pipeline is a separate branch without Quote lifecycle.
- [ ] Needs Your Attention integration is adjacent but not confused with the authoring product.

### Evidence and readiness

- [ ] Every major capability separates product direction, prototype implementation and runtime readiness.
- [ ] Every runtime blocker names the missing contract.
- [ ] No disproven hourly-expiry, notified-flag, generic viewed-flag or production-Deal-table claim appears.
- [ ] Source paths are repository-relative and point to existing canonical files.
- [ ] Dated handoff copies and 25 August briefs do not overrule 29 August sources.

### PRD quality

- [ ] Requirements and acceptance criteria have stable IDs and traceability.
- [ ] Draft/Inactive/Active language is consistent.
- [ ] An incomplete Draft does not block another Automation.
- [ ] Protected Quote lifecycle operations remain unavailable to free-form customer Actions.
- [ ] UX requirements cover Stage jump, minimap, zoom out, panel animation, canvas-drag close and widget suppression.
- [ ] Open decisions list an owner and decision deadline rather than silently guessing.

---

## 19. Hand-back format

When the draft is finished, Claude must report:

1. the exact output path;
2. the source files read;
3. the number of functional requirements and acceptance criteria written;
4. every remaining source conflict;
5. every review proposal that was deliberately kept out of Phase 1;
6. every runtime blocker still open; and
7. whether any canonical source file was changed besides the PRD.

Do not say the PRD is final until Product, Engineering and QA have reviewed the open-decision table.

---

## 20. Copy-paste instruction for Claude

> Read `CLAUDE-WRITE-CRM-AUTOMATION-PRD.md` completely, then read the canonical sources in its stated authority order. Update the single canonical `docs/WeQuote-CRM-Phase-1-PRD.html` in place; do not create a second PRD source or differently named copy. Preserve its wider Phase 1 content and self-contained HTML format while writing a complete, traceable CRM Automation section with two top-level product branches: With Quote Lifecycle and Without Quote Lifecycle. In every existing Quote context, document both separate routes: compatible Custom Automation and the twelve managed fixed Templates. Keep Template structure locked, describe only its approved editable settings, and preserve the verified 63/14/86% calculations. Document the Custom Trigger-first journey, Draft/Inactive/Active states, compatible Starts when, Wait, Rules, Yes/No paths, Actions, protected lifecycle boundaries, five Custom Stage gaps, guarded multi-Quote Create Quote behaviour, the separate review proposal for another Quote-lifecycle Pipeline, and the separate Standalone Pipeline branch without Quote lifecycle. Treat the 79 rows as reviewed candidate examples, not Templates. Separate product direction, prototype implementation and runtime readiness for every major capability. Do not invent CRM functionality, events or production readiness. Include stable functional-requirement and acceptance-criterion IDs, source-path traceability, a phase table, a runtime-blocker table and an owned open-decision register. Report all unresolved conflicts when handing back the updated PRD.
