# Claude Build Brief — WeQuote Quote Lifecycle Automation Guide

**Prepared:** 29 August 2026  
**Status:** implementation-ready brief for a colleague-facing interactive guide  
**Primary output:** `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html` at the repository root

---

## 1. Task

Rebuild and improve the interactive **WeQuote Quote Lifecycle Automation Guide** as one self-contained English HTML file.

The Guide must help a non-technical colleague understand:

1. what the 12 fixed Phase 1 Templates contain;
2. what a user would have to choose when starting from scratch;
3. why reusable form controls do not make those two product scopes equivalent;
4. what changes when Custom Stages and new Pipelines are added;
5. which combinations are allowed, unavailable or still awaiting a product/runtime decision; and
6. how a simple flow is assembled from **Starts when**, optional **Wait**, optional **Rule**, **Yes**, optional **No**, and **Action** blocks.

This is a decision-support and learning Guide. It must follow the current product-direction record while clearly stating
where the prototype and production runtime are still behind; it must not claim that unbuilt runtime capabilities already work.

---

## 2. Required deliverables

### Main deliverable

Update this file in place:

```text
QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html
```

It must remain at the repository root so colleagues can find it immediately and GitHub Pages can publish it at a short URL.

### Source material

Use these sources in this order:

1. `docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md` — the current product decision and precedence record.
2. `docs/WeQuote-CRM-Phase-1-PRD.html` — the formal Phase 1 authority, read together with its 29 August current-direction addendum.
3. `docs/quote-automation/QUOTE-LIFECYCLE-FROM-SCRATCH-STAGE-CATALOGUE.md` — the detailed lifecycle, Trigger, Rule, Action and candidate-recipe evidence.
4. The existing root `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html` — interaction and content reference, not an authority where it conflicts with the decision record, PRD addendum or catalogue.
5. `docs/visuals/template-vs-scratch-scope.html` — the verified scope calculations and colleague-facing comparison.
6. `assets/js/automation.js` — evidence of current prototype implementation, not authority for preserving the superseded protected-context Custom gate.

Do not use the older PRD under a dated `handoff/` folder. The repository-level `docs/WeQuote-CRM-Phase-1-PRD.html` is the current PRD.

### Do not change as part of this task

- Do not rewrite the formal PRD.
- Do not change the runnable CRM prototype.
- Do not publish, commit or push without separate approval.
- Do not create another file called `Simple English` or `ZH-HK`. The formal name is **Quote Lifecycle Automation Guide**; use plain English inside it.

---

## 3. Product position that the Guide must state clearly

The Guide compares three layers and three kinds of status. It must not confuse approved product direction, current prototype
implementation or production runtime readiness.

### Layer 1 — managed Templates

The managed Template pack is:

> Quote lifecycle + 12 fixed Templates + 63 approved editable controls.

For each fixed Template, WeQuote locks the Template name, Quote context, Starts when event, Rule and branch structure, Wait position, Action types and step order. A user changes only the approved setting values exposed by that Template.

### Layer 2 — compatible Custom Automation in every existing Quote context

The 29 August product direction selects a separate **Custom** route in Qualified, In Progress, In Review, Passed Review,
Sent, Won and Lost. A user may choose compatible Starts when events, optional Rules, Waits, Yes/No paths and permitted
Actions in the selected context. Choosing the Starts when event creates an **Inactive Custom Automation draft** with that
Trigger placed.

This does not unlock or convert a managed Template. The selected Quote context stays fixed, and protected Quote lifecycle
operations remain unavailable. At the **28 August baseline**, the runnable front end still used the old protected-context
gate. The **29 August front end has now been updated** to expose the separate Custom route in all seven contexts. This is
prototype implementation evidence only; production runtime readiness remains unproven.

### Layer 3 — Custom Stages and new Pipelines

Custom Stages and new Pipelines add further product decisions:

- where a Stage sits in the Quote lifecycle;
- which Quote-specific choices are safe at that point;
- stable Stage identity and order;
- permissions and movement rules;
- Deal migration and deletion safeguards;
- multi-Quote behaviour; and
- which Stages WeQuote controls automatically.

The Guide can let colleagues explore this layer, but it must label its product and release status separately from the
approved seven-context Custom decision. In particular, **another Pipeline that still uses the protected Quote lifecycle**
is a review proposal, separate from a Standalone Pipeline without Quote lifecycle, and is **not confirmed Phase 1 scope**.
The seven-context decision does not by itself approve either Pipeline-management route for production.

### Required status banner

Show a visible banner near the top:

> **Decision-support Guide**  
> Every existing Quote context offers two product routes: 12 managed fixed Templates or compatible Custom Automation.
> The 29 August front end now demonstrates this direction, while production runtime readiness remains unproven. Custom
> Stages, another Quote-lifecycle Pipeline and Standalone Pipelines are shown separately so the team can review their
> additional product and QA scope. The additional Pipeline routes are not confirmed Phase 1 scope.

### Decision locked for this Guide build

Use the 29 August decision record unless the product owner gives a newer written decision:

- the 12 managed Templates remain the complete managed Template set;
- rename the current 79-row “Templates” explorer to **Reviewed examples**;
- the 79 examples may be loaded into the practice Builder for learning, but they are not promoted to approved Templates;
- every existing Quote lifecycle context offers a separate compatible Custom route that creates an Inactive draft; and
- Custom Stage behaviour, another Quote-lifecycle Pipeline and Standalone Pipeline behaviour remain reviewable product
  guidance rather than confirmed Phase 1 runtime scope.

Do not turn the 79 reviewed examples into managed Templates and do not unlock the twelve fixed Templates. Managed Templates
and Custom Automation remain separate product types. Do not treat the 28 August prototype's Custom-disabled gate as the
latest authority.

---

## 4. Plain-language model

Use these exact user-facing concepts. Do not replace them with academic or engineering terms.

| Product term | Plain-language explanation |
|---|---|
| **Starts when** | The saved change or date that starts the Automation. |
| **Wait** | Pause for a chosen time, then check that the Deal or Quote is still in the right situation. Optional. |
| **Rule** | A check that decides whether the flow follows Yes or No. Optional. |
| **Yes** | What WeQuote does when the Rule matches. |
| **No** | What WeQuote does when the Rule does not match, or the path can stop. Optional. |
| **Action** | A visible result such as creating a Note, setting the Next Action or requesting a file. |

Use a simple five-part introduction:

1. **Choose the Stage or context.**
2. **Choose what starts it.**
3. **Wait only if timing matters.**
4. **Add a Rule only if WeQuote needs to check something.**
5. **Choose what WeQuote should do.**

Avoid unexplained words such as adapter, resolver, idempotency, runtime, orchestration, deterministic, event contract, capability matrix or execution graph in the main reading path. If evidence needs those terms, put it inside an expandable **Technical evidence** section and explain it in one sentence.

---

## 5. Visual and accessibility requirements

### Overall appearance

- Use a white background for the page, every figure, every comparison panel and every export/print view.
- Use light neutral borders and restrained Stage accent colours. No black or dark-theme panels.
- Keep the visual compact and calm. Do not make every label bold or oversized.
- Use a clear reading hierarchy: approximately 30–36 px page title, 22–28 px section headings, 16 px body text, 14 px secondary text and 12 px metadata.
- Keep long reading paragraphs to about 65–75 characters per line.
- Use at least 44 px hit areas for interactive controls.
- Provide strong visible keyboard focus and sufficient colour contrast.
- Never rely on colour alone to explain Yes, No, allowed, unavailable or not ready.

### Technical format

- One standalone UTF-8 HTML file.
- Include `<meta charset="utf-8">`.
- Inline all CSS, JavaScript, data, icons and illustrations.
- No CDN, external font, external icon, `fetch`, XHR, WebSocket, API call or service worker.
- Must work from both `file://` and GitHub Pages.
- No data mutation, API request or `localStorage` write.
- Print output must retain white backgrounds and readable tables.
- Honour `prefers-reduced-motion`.
- Responsive breakpoints must be tested around 1180 px, 820 px and 520 px.

---

## 6. Required page structure

Build the page in this order.

### A. Header and orientation

- Title: **Quote Lifecycle Automation Guide**
- Short description: **See what each Quote Stage can use, try a flow, and compare fixed Templates with Start from scratch.**
- Status banner from section 3.
- A clear statement: **Nothing in this Guide is saved, activated or run.**
- Buttons for **Print** and **Reset Guide**.

### B. Five simple parts

Show the five-part model from section 4 as a compact horizontal flow on desktop and a vertical flow on small screens.

### C. Four main modes

Use four clearly named modes:

1. **Choices by Stage**
2. **12 fixed Templates**
3. **Try a Custom flow**
4. **Custom Stages and Pipelines**

Changing mode or Stage must clear or revalidate selections that are no longer allowed.

### D. Choices by Stage

Provide the seven Quote contexts:

- Qualified
- In Progress
- In Review
- Passed Review
- Sent
- Won
- Lost

For each context, provide three tabs:

- Starts when
- Rules
- Actions

Requirements:

- Group related choices.
- Show a live count and search box.
- Show unavailable/withheld items in a disabled state with a plain-language reason; do not silently hide them.
- Explain which record is being watched: Deal, Quote, Note, Meeting/Site Visit, File Request or date.
- Explain what the user still needs to choose after adding each block.
- Keep protected operations visible in a separate **WeQuote controls these steps** panel.

### E. 12 fixed Templates

Use a three-part interaction:

1. choose a Template;
2. see its fixed flow from Starts when through Yes/No Actions; and
3. see only its editable settings.

The user must be able to load a Template into the practice Builder, but doing so must not turn it into a claim that the Template structure is editable in Phase 1.

Add a separate **Reviewed examples** browser for the 79 candidate examples. Do not place those 79 rows under the 12 fixed Templates heading.

### F. Try a Custom flow

Use a guided Builder rather than presenting three giant checkbox columns.

Recommended order:

1. **Where is this flow used?** — choose Stage/context.
2. **When should it start?** — choose one Starts when event and fill only its settings.
3. **Should it wait?** — No wait or a simple duration.
4. **Does WeQuote need to check anything?** — No Rule, or add one or more compatible Rules with clear AND/OR language.
5. **What should WeQuote do if Yes?** — at least one Action is required.
6. **What should WeQuote do if No?** — stop this path by default, or add an allowed Action.
7. **Check this flow** — show a readable summary and validation results.

Do not use a full-screen picker that hides the flow. Use an inline drawer or side panel that closes when the user selects an item, presses Escape, clicks outside it, or drags/pans the canvas.

The Builder must support:

- reset;
- load a reviewed example;
- copy a plain-English flow summary;
- show a sample Yes result and sample No result;
- pricing-change subtype selection;
- multiple Rules with simple **all of these / any of these** wording; and
- multiple Actions where allowed.

### G. Automation Check

Call this feature **Check this flow**, not Flow checker.

It must answer, in plain language:

- Is a Starts when event selected?
- Is there at least one Yes Action?
- Is the Rule meaningful, or does it repeat what the Starts when event already proves?
- After a Wait, does the flow check that the Deal/Quote is still in the right Stage?
- Could an Action immediately start the same Automation again?
- Is a protected or unavailable operation present?
- Is the multi-Quote result clear?

Nothing is saved or activated. The result is educational only.

### H. Custom Stages and Pipelines

First ask:

- **Add a Stage to the Quote Pipeline**, or
- **Create another Pipeline with Quote Lifecycle** — review proposal, not confirmed Phase 1, or
- **Create a Standalone Pipeline**.

For a Quote-connected Custom Stage, ask where it sits and show the relevant boundary:

1. Between Qualified and In Progress
2. Between In Progress and In Review
3. Between In Review and Passed Review
4. Between Passed Review and Sent
5. Between Sent and Won/Lost

For another Pipeline with Quote Lifecycle, keep the protected Quote Stages and Quote-driven outcomes, then show how its own
Quote-connected Custom Stages would use the same five lifecycle gaps. Mark the entire route **Review proposal — not
confirmed for Phase 1** and list the unresolved Pipeline, migration, permission, reporting, deletion and active-Automation
contracts.

For a Standalone Pipeline without Quote lifecycle, show user-defined working Stages and protected Won/Lost results.
Quote-specific choices must disappear.

### I. Scope comparison

End with a detailed, white-background comparison:

- **12 fixed Templates** on the left;
- **Start from scratch** on the right;
- a stage-by-stage calculation table;
- the exact formulas in section 8;
- the expansion from existing Quote contexts to Custom Stages and new Pipelines; and
- the statement: **Shared settings UI does not mean shared product or QA scope.**

---

## 7. The 12 fixed Templates and 63 editable controls

The 12 Templates are approved closed flows. They are not generated combinations.

| # | Quote context | Fixed Template | Editable controls | What can change |
|---:|---|---|---:|---|
| 1 | Qualified | Qualified first Next Action | 5 | Next Action title, assignee, due-day count, day unit and due time |
| 2 | Qualified | Qualified inactivity reminder | 7 | Create Note fields (6) plus Wait days (1) |
| 3 | Qualified | Site visit and pre-Quote readiness | 6 | Create Note fields |
| 4 | In Progress | Quote build and SOW checks | 6 | Create Note fields |
| 5 | In Review | Internal Quote review | 6 | Create Note fields |
| 6 | Passed Review | Ready-to-send check | 6 | Create Note fields |
| 7 | Passed Review | High-value approval | 2 | Quote-value threshold and discount percentage; Note settings stay fixed |
| 8 | Sent | Sent Quote follow-up | 7 | Create Note fields (6) plus Wait days (1) |
| 9 | Sent | Quote expiry reminder | 6 | Create Note fields |
| 10 | Won | Won Deal handoff | 6 | Create Note fields |
| 11 | Won | Accepted Quote → Draft Invoice | 0 | No editable setting; result is fixed |
| 12 | Lost | Lost Deal reason follow-up | 6 | Create Note fields |
|  |  | **Total** | **63** |  |

Context totals:

| Context | Templates | Editable controls |
|---|---:|---:|
| Qualified | 3 | 18 |
| In Progress | 1 | 6 |
| In Review | 1 | 6 |
| Passed Review | 2 | 8 |
| Sent | 2 | 13 |
| Won | 2 | 6 |
| Lost | 1 | 6 |
| **Total** | **12** | **63** |

### Why 86% of the setting fields can reuse UI

There are 14 unique setting field types:

- Next Action: 5 field types
- Create Note: 6 field types
- Wait: 1 field type
- High-value approval limits: 2 field types

The first 12 field types can reuse normal setting controls in a broader Builder. The two approval-limit fields remain tied to the fixed High-value Template Rule.

```text
12 reusable field types ÷ 14 total field types
= 0.85714
= 85.7%
= 86% when rounded
```

Make the Guide explain that this is **UI reuse only**. It does not include choice compatibility, branch validation, activation safety, replay safety or multi-Quote QA.

---

## 8. Seven-context Custom compatibility calculations

These figures preserve the measured seven-context Creator matrix used to size and review the selected Custom route. The
29 August front end now demonstrates that route, but these figures remain a compatibility/scope comparison, not proof that
production runtime support exists, and not a delivery-time multiplier.

### 8.1 Eighteen Starts when types

| # | Starts when | Current context placements |
|---:|---|---|
| 1 | Deal enters Qualified | Qualified |
| 2 | Deal Owner changes | Qualified |
| 3 | Meeting or Site Visit changes | Qualified, In Progress |
| 4 | File is added to Deal | All seven contexts |
| 5 | Deal Next Action becomes due | Qualified, In Progress, Passed Review, Sent, Won |
| 6 | Expected Close Date is coming up | Qualified |
| 7 | First Quote is created | In Progress |
| 8 | Another Quote option is added | In Progress |
| 9 | Related Quote is edited | In Progress |
| 10 | Note follow-up time is reached | In Progress, In Review, Sent, Won, Lost |
| 11 | Quote is submitted for review | In Review |
| 12 | Quote Review Note changes | In Review |
| 13 | Quote becomes Passed Review | Passed Review |
| 14 | Quote is Sent | Sent |
| 15 | Customer views a Sent Quote | Sent |
| 16 | Quote expiry is coming up | Sent |
| 17 | Quote is accepted | Won |
| 18 | Deal becomes Lost | Lost |

The context placement counts are:

```text
Qualified 6
+ In Progress 7
+ In Review 4
+ Passed Review 3
+ Sent 6
+ Won 4
+ Lost 3
= 33 Starts-when placements
```

One Starts when type can appear in more than one context, which is why 18 unique types become 33 placements.

### 8.2 Sixteen Action types requiring compatibility decisions

Fourteen candidate Action types enter the shared context-compatibility calculation. Do not describe all fourteen as
universally selectable: Remove Deal label is limited to an owned system/Automation-managed Label, and Add Interest
requires approved structured evidence. Remove Interest is not one of these Action types.

1. Create Note
2. Schedule Meeting or Site Visit
3. Assign Deal Owner
4. Send internal notification
5. Add Deal label
6. Remove Deal label
7. Set Deal Next Action
8. Clear Deal Next Action
9. Add Deal watcher
10. Remove Deal watcher
11. Add Interest
12. Set Expected Close Date
13. Attach file to Deal
14. Request a file

Two additional Quote-creation Actions are placement-specific:

15. Create the first Quote — Qualified only
16. Create another Quote option — In Progress only

```text
14 candidate shared Action types × 7 Quote contexts = 98 context/type checks
+ Create the first Quote in Qualified = 1
+ Create another Quote option in In Progress = 1
= 100 static Action compatibility decisions
```

Do not add **Remove Interest** to this list. Removing a product/system Interest can destroy useful customer-history information. It remains a manual CRM operation, withheld from general Automation and recommended recipes. Label removal is different: an Automation may remove only a system-managed Label that it owns. Visible picker totals must be derived after those conditions are applied; do not present 14 as an always-selectable card count.

### 8.3 Minimum 1,300 static compatibility decisions

Before running or branch-testing any flow, the product needs at least these static decisions:

```text
Stage × Starts-when checks:
7 contexts × 18 types = 126

Stage × Action checks:
7 contexts × 16 types = 112

Starts-when × Rule checks by context:
(6×32) + (7×32) + (4×32) + (3×32) + (6×33) + (4×32) + (3×32)
= 1,062

Minimum static compatibility decisions:
126 + 112 + 1,062 = 1,300
```

The Guide must call this a **minimum compatibility decision count**. It is not a count of automated tests and does not include Waits, multiple Rules, AND/OR groups, multiple Actions, Yes/No branch outcomes, activation, permissions, replay safety, date rescheduling or multi-Quote handling.

### 8.4 The 15,238 simple-shape comparison

The current prototype allows 1,026 of the 1,062 Starts-when × Rule pairs. Count only these deliberately simple shapes:

> one Starts when + no Rule or one compatible Rule + one compatible Action

| Context | Starts when | Maximum candidate Action types | Allowed Starts-when × Rule pairs | Formula | Simple shapes |
|---|---:|---:|---:|---|---:|
| Qualified | 6 | 15 | 179 | `15 × (6 + 179)` | 2,775 |
| In Progress | 7 | 15 | 220 | `15 × (7 + 220)` | 3,405 |
| In Review | 4 | 14 | 127 | `14 × (4 + 127)` | 1,834 |
| Passed Review | 3 | 14 | 92 | `14 × (3 + 92)` | 1,330 |
| Sent | 6 | 14 | 188 | `14 × (6 + 188)` | 2,716 |
| Won | 4 | 14 | 125 | `14 × (4 + 125)` | 1,806 |
| Lost | 3 | 14 | 95 | `14 × (3 + 95)` | 1,372 |
| **Total** | **33** | **100 context/type checks** | **1,026** |  | **15,238** |

Required explanatory note:

> **15,238 is not the total possible configuration space, a visible picker count or a time estimate.** It is an upper-bound controlled comparison using only one Starts when, zero or one compatible Rule and one candidate Action type. It excludes Remove Interest but counts conditional Remove Label/Add Interest types before record-level eligibility is applied. Multiple Rules, AND/OR groups, Waits, multiple Actions and Yes/No paths make the real QA space larger and not usefully represented by one finite headline number.

### 8.5 Separate source-catalogue counts

Do not mix the Creator comparison above with the detailed source catalogue. Show this as a separate evidence summary:

- 7 Quote contexts
- 23 Starts-when definitions; 22 currently marked selectable
- 35 Rule definitions; 30 currently marked selectable
- 15 historical Action identifiers in the detailed catalogue; A11 Remove Interest is now withheld, while A09/A10 are conditional, so the current selectable total must be recalculated
- 79 reviewed **candidate examples**, made from 18 shared and 61 context-specific examples
- 5 additional withheld ideas, outside the 79
- 0 of 79 live end-to-end at the reviewed baseline
- 75 of 79 need Phase 1 CRM/Automation build work
- 4 of 79 also need a customer-view product/event decision

Visible reviewed-example counts by context are Qualified 25, In Progress 30, In Review 27, Passed Review 24, Sent 31, Won 26 and Lost 24. Do not add those seven numbers to find a unique total: the same 18 shared examples repeat in every context. The unique total remains 79.

Never call the 79 candidate examples Templates. Phase 1 has exactly 12 fixed Templates.

For historical orientation only, the earlier shared-catalogue calculation was:

```text
9 shared Starts when × 11 shared Rules × 15 historical Action identifiers = 1,485 raw triples
```

This number is superseded and must be recalculated from canonical availability data. It is not a recommended-example
count, a current picker total or the complete configuration space, and Remove Interest must not be retained merely to
preserve 1,485.

---

## 9. Custom Stage behaviour

A Custom Stage inherits Deal choices and receives extra Quote choices from the lifecycle gap where it sits.

### Base choices

For a Quote-connected Custom Stage, explain the count accurately:

- 9 shared Deal Starts when choices;
- plus **Deal enters this Custom Stage** as the Stage-specific entry choice;
- 11 shared Rules;
- the current eligible shared Action set derived from the historical catalogue, with Remove Interest excluded and Remove Label/Add Interest conditions applied;
- plus a conditional Quote-creation Action only in an approved early gap.

Do not say “9 ways to start in total” while displaying ten cards. Say **9 shared choices, plus the Custom Stage entry choice**.

### Five lifecycle gaps

| Placement | Meaning | Extra Quote starts/checks | Create Quote availability |
|---|---|---|---|
| Qualified → In Progress | Before the first Quote exists | Qualified checks | **Create the first Quote for this Deal** only |
| In Progress → In Review | At least one editable Quote exists | Quote saved / saved pricing change | **Create another Quote option** only |
| In Review → Passed Review | A Quote is in formal internal review | Submission and review-note choices | No Create Quote Action yet |
| Passed Review → Sent | Review passed but customer send has not succeeded | Passed-review choices | No Create Quote Action yet |
| Sent → Won/Lost | A sent Quote is waiting for a result | Sent, viewed and expiry choices | No Create Quote Action yet |

### How each Custom Stage gap expands the choice set

Show this table so colleagues can see why each inserted Stage is not the same:

| Custom Stage gap | Starts when shown | Rules shown | Maximum candidate Action types | Upper-bound raw one-Rule/one-Action triples |
|---|---:|---:|---:|---:|
| Qualified → In Progress | 10 | 13 | 15 | `10 × 13 × 15 = 1,950` |
| In Progress → In Review | 12 | 13 | 15 | `12 × 13 × 15 = 2,340` |
| In Review → Passed Review | 12 | 14 | 14 | `12 × 14 × 14 = 2,352` |
| Passed Review → Sent | 11 | 15 | 14 | `11 × 15 × 14 = 2,310` |
| Sent → Won/Lost | 13 | 16 | 14 | `13 × 16 × 14 = 2,912` |

These recalculated maxima exclude Remove Interest. They include Remove Label and Add Interest only as candidate types;
an actual picker/flow must apply their ownership and structured-evidence conditions and may therefore show fewer Actions.
The triples explain an upper scope bound, not recommended recipes. They exclude no-Rule flows, Waits, multiple Rules,
AND/OR groups, branches and multiple Actions.

### Quote creation rules

#### Create the first Quote for this Deal

Only show it while the Deal is still Qualified and has no current Quote.

Result:

- create one empty Quote;
- link it to the same Deal;
- Quote starts In Progress and is not sent;
- one Automation run creates no more than one Quote; and
- after success, WeQuote moves the Deal to In Progress.

#### Create another Quote option

Only show it while the Deal is In Progress and already has a current Quote.

Result:

- create a separate empty Quote option for the same Deal;
- it is not a revision or variation;
- it starts In Progress and is not sent;
- one run creates no more than one option; and
- a later, separate run may create another option.

At In Review, Passed Review or Sent, another Quote could mean an option, revision or variation. WeQuote must not guess, so no Create Quote Action is shown there until that product contract is approved. Won and Lost never show Create Quote.

### Source-divergence warning

The detailed catalogue still says Create related Quote must remain unavailable until a separate contract is approved, while the current Guide/prototype demonstrates the two constrained Actions above. Present them as **proposed guarded behaviour requiring approval**, not as already committed Phase 1 functionality, unless a newer authority resolves the difference.

---

## 10. Multi-Quote rules that must stay connected to the Guide

- In Progress means the first current Quote already exists.
- A Deal may have more than one Quote option.
- Creating the first Quote and creating another option are different Actions.
- A new option is not automatically a revision or variation.
- One Automation run must not create a duplicate Quote.
- A later, separate run may create a further option if the product allows it.
- WeQuote uses the current Quote that has moved furthest through the lifecycle to represent the Deal's working Stage.
- If one Quote option is accepted, that option wins and the other options become Lost.
- If every current Quote is cancelled, the Deal becomes Archived rather than Lost.
- If no option can continue for another reason, WeQuote may resolve the Deal as Lost under the approved lifecycle rule.

Every delayed flow must check the current Deal/Quote state again after the Wait.

### Which Quote should a flow evaluate?

- A Quote event evaluates the Quote that caused that event.
- A shared Deal event normally evaluates the viable Quote that is furthest through the lifecycle.
- A Rule such as **no related Quote**, **any accepted Quote** or **no viable Quote remains** evaluates all relevant Quote families for the Deal.
- Revisions count as one commercial option; use the latest active revision for that option.
- With several Quote options, a Quote change evaluates the triggering option, while a Deal lifecycle check evaluates the full viable set.

Keep a visible **Decision still required** note for the exact treatment of templates, samples, alternatives, archived/cancelled Quotes, change orders and revision precedence. Do not invent that contract inside the Guide.

---

## 11. Standalone and new Pipelines

Show **another Pipeline with Quote Lifecycle** as a separate review proposal before the Standalone route. It keeps protected
Quote Stages, Quote-driven movement, multi-Quote rules and the five Quote-connected Custom Stage gaps, but it requires its
own Pipeline name, permissions, Deal migration, reporting continuity, deletion safeguards and active-Automation impact
contracts. This route is **not confirmed Phase 1 scope**.

For a Standalone Pipeline:

- users define the Pipeline name, working Stage names and order;
- use a simple example such as New → In Progress → Complete;
- Won and Lost remain protected results;
- each working Stage gets 9 shared Deal Starts when choices, plus **Deal enters this Stage**;
- each working Stage gets 11 shared Rules and the current eligible shared Deal Action set;
- Quote-specific Starts when, Quote Rules, Create Quote Actions and automatic Quote lifecycle movement are not shown;
- users may move Deals manually between named working Stages; and
- automatic Stage movement remains unavailable until Stage targets, permissions, duplicate prevention and required-work rules are approved.

The simple Standalone picker baseline is:

```text
10 Starts when choices
× 11 Rules
× the dynamically eligible Deal Action set
= a total that must be derived from canonical availability data
```

The ten Starts when choices are the nine shared Deal choices plus **Deal enters this Stage**. The earlier 1,650 figure
used all fifteen historical Action identifiers and is superseded; do not preserve it by counting Remove Interest.

Explain the additional scope clearly:

- creating, renaming, ordering and archiving Stages;
- migrating Deals when a Stage changes or is removed;
- permissions;
- routing;
- deletion safeguards;
- reporting continuity; and
- what happens to active Automations when a Stage changes.

Do not present new Pipeline management as “free” merely because the same block cards can be reused.

---

## 12. Capability and safety rules

### Keep these unavailable to customer-authored flows

- Move a Deal directly into a protected Quote Stage.
- Send or resend a customer proposal.
- Approve, reject or accept a Quote.
- Mark a Deal Won or Lost directly.
- Create a Quote outside the two guarded early placements described above.
- Create a Draft Invoice as a general Action; it is the fixed result of the accepted-Quote Template only.
- Remove Interest automatically.

### Keep these out of the first release

- Customer-authored Else If.
- Wait until another event occurs.
- While/repeating loops.
- Working-day or arbitrary date-time Wait modes beyond the approved simple Wait.
- Automatic Stage movement chosen by the customer.

Before every Action, and especially after a Wait, WeQuote must recheck the lifecycle context, account access, user permission and record existence. If the Deal or Quote has left the required context, the invalid Action is skipped or the path stops safely.

### File behaviour

- **Attach file to Deal** uses a reusable managed file/template, not a one-off upload performed every time an Automation runs.
- **Request a file** creates a named File Request linked to the Deal.
- A generic upload does not satisfy a named File Request.
- A requested file counts as received only when the specific request is linked to the supplied file and marked Received.

### Labels and Interests

- Interest records customer need for a subsystem such as Lighting, AV, Panels or Security.
- Add Interest only from clear structured evidence.
- Do not infer Interest from free-text keyword matching.
- Do not remove Interest because one Quote line was removed, a Quote was rejected, or a Deal was Lost.
- Labels are internal work markers such as Needs re-review or Quote expiring.
- An Automation may remove only a system-managed Label that the same Automation or managed process owns.

### Evidence honesty

Do not claim any of the following exists unless a current source proves it:

- an existing hourly Quote-expiry job;
- a Quote expiry `notified` flag;
- a generic production customer-view boolean;
- a production Deal table; or
- a fully working end-to-end Automation runtime for the 79 candidate examples.

Use separate labels for:

1. **Product direction** — selected, proposed or out of scope;
2. **Prototype implementation** — exposed, hidden/disabled, partially demonstrated or not built;
3. **Build readiness** — live, adapter required, new build, contract required or withheld; and
4. **Readiness blocker** — the exact missing model, event, scheduler, decision or connection.

---

## 13. Embedded data requirements

Keep one embedded JSON dataset as the source for rendered counts, choices, examples and compatibility. Do not hard-code the same count independently in several sections.

Include:

- schema version;
- source catalogue filename and SHA-256;
- reviewed date;
- PRD/capability status;
- seven contexts;
- Starts when definitions and placements;
- Rule definitions and placements;
- Action definitions and placements;
- 12 fixed Templates and editable settings;
- 79 candidate examples and five withheld ideas;
- five Custom Stage gaps;
- two guarded Quote Actions;
- Standalone Pipeline choices; and
- validation rules.

Store behaviour as structured data. Never infer control state by parsing translated display text. At minimum, every example must carry:

- stable Trigger, Rule and Action IDs;
- `waitKind: "none" | "days"` plus a numeric duration where needed;
- `ruleJoin: "and" | "or"`;
- explicit Yes and No branch arrays;
- pricing subtype where relevant;
- product-direction, prototype-implementation, build-readiness and blocker fields; and
- a stable example ID.

The existing Guide currently misreads the display text **Start at once** as a days-based Wait and can misread lowercase “or” as AND. The rebuild must remove both translation-coupling bugs. All 79 reviewed examples must load into the Builder and round-trip back to the same structured flow without changing Wait or AND/OR meaning.

The current data set contains 74 immediate examples and five delayed examples. It also contains seven reviewed OR examples that must stay OR: `Q-C07`, `IP-C15`, `PR-C02`, `PR-C06`, `SE-C09`, `SE-C13` and `W-C05`.

Self-trigger validation must also use structured Trigger subtype, Action target, origin and duplicate-prevention policy. Do not reject a safe successor Action merely because it belongs to the same broad block family. For example, completing one Next Action may safely create its guarded successor, and watching Deal Value must not treat a Label change as editing the watched field.

When source data changes, all visible totals must update from the dataset.

---

## 14. Required validation behaviour

The Guide must catch and explain these cases:

- no Starts when selected;
- no Yes Action selected;
- selected choice is not allowed in the chosen Stage;
- a Rule only repeats the Starts when condition;
- a Wait exists but there is no post-Wait Stage/state check;
- an Action can start the same flow again;
- a protected operation is attempted;
- Create first Quote is used when a current Quote exists;
- Create another Quote option is used before the first Quote exists;
- Create Quote is attempted in In Review, Passed Review, Sent, Won or Lost;
- Remove Interest is attempted;
- a requested-file rule is satisfied by an unrelated upload; and
- a delayed flow would act on a Quote option that is no longer current.

Use direct messages such as:

> Add at least one Yes Action.

> This Rule repeats what already started the flow, so it does not add a useful check.

> After waiting, check that the Deal is still In Progress before creating another Quote option.

> Create another Quote option is available only after the first Quote exists and while the Deal is In Progress.

---

## 15. Acceptance tests

Claude must complete all of these before handing back the file.

### Content and count tests

- [ ] Exactly 12 fixed Templates are shown.
- [ ] Editable settings total exactly 63.
- [ ] The 14 field types and 12/14 = 86% explanation are visible.
- [ ] The seven-context Custom compatibility matrix shows 18 unique Starts when types and 33 placements.
- [ ] The seven-context Custom compatibility matrix shows 16 Action types and 100 placements.
- [ ] The 1,300 minimum compatibility calculation is rendered exactly.
- [ ] The seven-context simple-shape rows total 15,238.
- [ ] The 15,238 caveat is visible next to the number.
- [ ] The 79 candidate examples are not called Templates.
- [ ] The 79/5/75/4/0 readiness figures come from one dataset.
- [ ] Another Pipeline with Quote Lifecycle is visibly separate from Standalone/without Quote lifecycle and is labelled
      as a review proposal that is not confirmed for Phase 1.

### Interaction tests

- [ ] All seven Stage tabs work by mouse and keyboard.
- [ ] All four main modes work.
- [ ] Search and counts update together.
- [ ] Changing Stage removes or explains incompatible selected blocks.
- [ ] Disabled/withheld blocks cannot be selected and display a reason.
- [ ] A reviewed example loads the exact Starts when, Wait, Rules, Yes and No Actions into the Builder.
- [ ] All 79 reviewed examples round-trip without changing `waitKind`, duration, `ruleJoin`, block IDs or branch contents.
- [ ] The 74 immediate examples remain immediate, the five delayed examples retain their Wait, and the seven named OR examples remain OR.
- [ ] The Builder cannot copy or simulate an invalid flow.
- [ ] Sample Yes and No results match the visible flow.
- [ ] The picker/drawer closes on selection, Escape, outside click and canvas drag/pan.
- [ ] Conditional Create Quote Actions appear only in the approved early placements.
- [ ] Nothing is stored, activated or sent.

### Visual and technical tests

- [ ] `html`, `body`, every visual section and print output have an explicit white background.
- [ ] UTF-8 punctuation and arrows render correctly.
- [ ] No external request is made.
- [ ] No console error occurs.
- [ ] No horizontal overflow occurs at 1180, 820 or 520 px.
- [ ] Keyboard focus is visible and tabs/buttons have correct ARIA states.
- [ ] Reduced-motion mode removes non-essential animation.
- [ ] Print output is clean and readable.
- [ ] The final file works through both `file://` and a local HTTP server.

---

## 16. Hand-back checklist

When finished, report:

1. the exact file changed;
2. the source catalogue hash embedded in the file;
3. the count checks performed;
4. browser widths tested;
5. whether `file://` and HTTP both passed;
6. whether any source conflict remains unresolved; and
7. a short list of decisions that still require product approval.

Do not claim the Guide is production behaviour. Say separately whether an item is:

- selected product direction;
- exposed or still disabled in the current prototype;
- live, new-build, contract-required or withheld in the runtime; and
- proposed guarded behaviour or not available yet where a block-level decision remains open.

---

## 17. Copy-paste instruction for Claude

> Build the repository-root `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html` exactly from this brief. Use the 29 August product-direction record first, then the repository PRD with its current-direction addendum, and use the detailed Quote lifecycle catalogue as compatibility evidence. Keep the Guide self-contained, white-background, interactive, responsive and understandable to a new user. Show two separate routes in every existing Quote context: 12 managed fixed Templates and compatible Custom Automation that creates an Inactive draft. Keep the 79 reviewed examples separate from the 12 Templates, and keep Custom Stage and Standalone Pipeline scope separately labelled. Report product direction, prototype implementation and runtime readiness independently. Derive every visible count from one embedded dataset, show the full calculation for 63, 86%, 33, 100, 1,300 and 15,238, and complete every acceptance test before handing the file back. Do not modify the PRD or runnable CRM prototype as part of this Guide task.
