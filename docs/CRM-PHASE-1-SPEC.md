# WeQuote CRM — Phase 1 specification (historical extraction)

**Extracted from `WeQuote-CRM-Phase-1-PRD.html` · 25 August 2026.**

> **SUPERSEDED REFERENCE — DO NOT USE AS THE CURRENT AUTOMATION CONTRACT.**
> This file is a 25 August text extraction kept only for traceability. The single current PRD is
> [`WeQuote-CRM-Phase-1-PRD.html`](WeQuote-CRM-Phase-1-PRD.html), Version 9 · Managed + Custom. Current direction is
> [`quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md`](quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md).
> Every fixed Quote context now offers **Start from scratch | Templates**, in that order. Start from scratch creates a
> Custom Automation **Draft**; a complete saved flow that is off is **Inactive**; only a valid flow can become **Active**.
> An Owning Company is Deal record data and can be chosen as a Rule parameter — there is no Automation-wide Company
> scope. The old Template-only and Company-scope statements retained below are superseded and must not be implemented.

This is the **committed Phase 1 scope only**. Phase 2 (customer-defined stages), Phase 3
(fully custom pipelines) and all 26 figures have been removed. Where the full PRD showed a
diagram, its caption is kept as a quoted note, because the captions carry the rule and the
images do not.

**Section headings keep their original PRD identifiers** (§A1, §B2, §C1 …) so every
cross-reference in the prose resolves inside this file. Requirement IDs (`FR-nn`) and
acceptance-criterion IDs (`AC-XXX-nn`) are stable and match the full PRD and the QA
workbook. **Do not renumber them.** Where something is out of Phase 1 scope it is marked
*Deferred* in place, keeping its number.

**Historical 25 August wording begins below.** It does not override Version 9.

---


## Contents

- [§A1 · The decision](#a1-the-decision)
- [§A2 · What exists today, and what is new](#a2-what-exists-today-and-what-is-new)
- [§A3 · How Phase 1 is delivered](#a3-how-phase-1-is-delivered)
- [§A4 · Object model](#a4-object-model)
- [§A5 · Lead lifecycle](#a5-lead-lifecycle)
- [§A6 · Quote event to Deal stage](#a6-quote-event-to-deal-stage)
- [§A7 · Alternatives, change orders and Deal value](#a7-alternatives-change-orders-and-deal-value)
- [§A8 · Quote & Sales — the list and the quote workspace](#a8-quote--sales--the-list-and-the-quote-workspace)
- [§A9 · Company access and Automation scope](#a9-company-access-and-automation-scope)
- [§A10 · Templates, and the creation journey](#a10-templates-and-the-creation-journey)
- [§A11 · What an Automation is made of](#a11-what-an-automation-is-made-of)
- [§A12 · Draft, test, validate, publish](#a12-draft-test-validate-publish)
- [§A13 · Required-work gate and file requests](#a13-required-work-gate-and-file-requests)
- [§A14 · Open decisions](#a14-open-decisions)
- [§A15 · Delivery gate](#a15-delivery-gate)
- [§A16 · Risks and sign-off](#a16-risks-and-sign-off)
- [§B1 · Block library contract](#b1-block-library-contract)
- [§B2 · Functional requirements](#b2-functional-requirements)
- [§B3 · Acceptance criteria](#b3-acceptance-criteria)
- [§C1 · Conflict register](#c1-conflict-register)
- [§C2 · What is actually built today](#c2-what-is-actually-built-today)
- [§C3 · Existing integrations — coexistence](#c3-existing-integrations--coexistence)

---

## §A1 · The decision

*WeQuote CRM separates two kinds of logic, and the separation is the product.*

#### Protected — owned by WeQuote

- Quote lifecycle progression
- Which quote event derives which Deal stage
- The meaning of Won, Lost, Archived and Expired
- Precedence when several quotes disagree

#### Editable — created by the customer

- Automations: triggers, conditions, actions
- Which of their companies each Automation serves
- Notes, meetings, next actions, labels, interests, watchers
- File requests and required-work checkpoints

A customer Automation may **react** to a quote event and **organise work** around a Deal. It may not redefine what a quote status means, approve a quote, simulate sending or acceptance, or write a protected stage directly.

The protected Phase 1 lifecycle is:

```
Qualified  (no quote yet)
  ↓
In Progress  (first quote created)
  ↓
In Review  (conditional)
  ↓
Passed Review  (conditional)
  ↓
Sent  (issued to client)
  ↓
Won / Lost  (outcome)
```

`In Review` and `Passed Review` appear only where Quote Review is enabled. `Archived` and `Expired` are derived statuses, not pipeline stages.

> **Why derive rather than let people type**
>
> Quote status already drives proposals, invoicing, reporting and the integrations we sell. If a salesperson could set a Deal stage independently, every one of those surfaces would inherit the disagreement. Deriving the pipeline from quotes makes the forecast exactly as trustworthy as the invoice ledger, because it is the same fact read twice.

> **Figure 1 — The customer-edit boundary.** The same split as the two columns above, drawn across all three phases. The **automation layer** is always the customer's. The **protected quote lifecycle** is always ours. The middle band — the custom stage overlay — is what Phase 2 opens up, and it is the only part of this picture that changes between phases.

> **Rules that must not drift**
>
> These six statements are settled. Any later edit — including a wording pass — must leave them saying exactly this.
 
 Creating the **first related quote** moves the Deal from Qualified to In Progress.
 **Any** relevant quote being accepted makes the Deal Won. Remaining groups change the signed value, never the stage.
 Sales **supplies the loss reason**. Sales does not decide the Lost outcome; the system derives it.
 Testing is **optional**. Only a real conflict blocks publishing.
 A Phase 2 custom stage receives the **identical** core block library wherever it sits.
 A protected quote lifecycle event is **never** an ordinary Automation action.

### Plain language

This document uses a handful of engineering words because the appendices need them. Each one means something ordinary.

**What the technical words mean**

| Term | In plain words |
|---|---|
| Resolver | The system deciding a Deal's current stage from its quotes |
| Enrolment / scope | Where an Automation applies |
| Runtime | What happens when an Automation actually runs |
| Authoring surface | The editing experience — the simple form, or the canvas |
| Typed fields | Simple settings such as owner, number of days, or label |
| Atomic swap | Publishing replaces the live version safely, all at once |
| Idempotent | Retrying will not create duplicate results |
| Tenant boundary | Keeping each customer account's data separate |
| Event ingest / adapter | Receiving a quote event and standardising it |
| Version pinning | Work already in flight finishes on the version it started with |
| Byte-identical blocks | Exactly the same block choices, everywhere |
| Schema / persistence | How Automation settings and versions are saved |
| One-way door | Once opened in the advanced builder, it cannot return to the simple form |


---

## §A2 · What exists today, and what is new

*Nothing in the left column needs building. Nothing in the right column may be described to a customer as already available.*

#### Exists today

- Quote states: In Progress, In Review, Passed Review, Sent, Accepted, Complete, Cancelled
- Expired derived from a sent quote passing its expiry date
- Quote activity recording viewed, passed review, changes requested and accepted
- Submit Review, Pass Review, Mark as Sent, Mark as Accepted as trusted operations
- Trading Name chosen per quote, with its own logo, addresses and VAT number
- Approval thresholds by quote value and discount percentage
- Customer records, contacts and a customer merge tool
- Notes and documents stored as a name plus a link

#### New in Phase 1

- Lead, and the Lead inbox
- Deal and Deal stage
- Qualified, Won, Lost outcomes and Archived status
- Deal Next Action, Labels, Interests, Watchers
- Expected Close Date
- CRM meeting and site-visit activity
- Company scope for Automations
- Request file, required upload, reminder and completion state
- Create or link a related quote from a Deal
- How several quotes on one Deal combine into one stage, and the viewed count on the Deal card

> **Terminology that will cause trouble**
>
> The existing **Trading Name** is not automatically the same entity as the new CRM **Owning Company**. Trading Name already does two jobs — it decides what appears on an invoice, and it feeds an accounting breakdown. Making it a third thing needs an explicit decision, not an assumption. See §A13 · D4.

Two further pieces of vocabulary need holding apart. The existing Sales Overview already groups accepted and complete quotes as "Won" and shows a proposal seen status; the Phase 2 forecast view is a separate thing and this document does not relabel Sales Overview as a CRM forecast. And the existing notes-and-documents feature is not the Phase 1 file-request model, which adds a named request, a required upload, a reminder and a completion state.

> **Figure 2 — The dashboard that exists today.** Today's Dealer Overview is built entirely on **quotes**: active and accepted counts, value in pipeline against target, monthly margin, latest quotes, and sales by salesperson. It already answers "how are we doing?" — which is exactly why the Phase 2 CRM forecast must be a separate view rather than a rename. Nothing on this screen is being replaced.

---

## §A3 · How Phase 1 is delivered

*Three phases, ordered by how much structural control the customer gains — because each handover is harder to reverse than the last.*

### How Phase 1 is delivered

The three phases above describe how much of the pipeline the customer is allowed to reshape. Phase 1 is large enough that shipping it as one release would set the date by the slowest of five unrelated things: the stage logic, the canvas builder, timed work, the Zoho decision and duplicate control.

Phase 1 therefore splits into three deliveries.

**Delivery roadmap**

| Release | What it delivers |
|---|---|
| **Phase 1A** CRM foundation | Lead, Deal, Customer, Company, Activity. The logic that turns quotes into one Deal stage, and the protected lifecycle. Alternative groups and change orders. Value and margin. **No customer Automation authoring.** |
| **Phase 1B** Managed recipes | Named, versioned recipes with simple settings and company scope. The engine that runs them, the shared way a flow is described, and how it is saved. Timed work for recipes that need to wait. |
| **Phase 1C** Template editing | Opening one of the twelve templates as an editable copy in the builder: the canvas, the shared block list, draft / test / publish, the simulator, conflict validation and the required-work gate. **Every Automation still starts from a template.** |
| **Future** Advanced authoring | Start from scratch — an empty canvas and the global block catalogue as a creation route in their own right. Excluded from Phase 1 by the 25 August handoff. |
| **Phase 2** Custom stages | Customer-defined stages inside the five permitted lifecycle gaps, with migration and impact preview. Forecast. |
| **Phase 3** Fully custom pipelines | Every stage customer-defined, explicit named movement, no protected quote syncing. |


Phase 1 is delivered in three parts rather than one, so a delay in the builder cannot hold back the CRM, and a delay in timed work cannot hold back the recipes. The existing phase artifacts stay valid — 1A, 1B and 1C together are the Phase 1 they describe.

> **Three principles that make the split hold**
>
> **Phase 1A delivers the CRM records and the protected stage logic, with no customer-built Automations at all.** It may derive and display — a pipeline stage, a value, a "needs your attention" panel computed from existing data. It may not create records or send messages. That line is testable: Phase 1A writes no note, task, file request or notification that a person did not ask for.
 **Phase 1B introduces managed recipes as a permanent configuration experience, not as canvas presets.** Most customers will never open a canvas; a switch and a few settings is their finished product, not a stepping stone.
 **Phase 1C introduces the advanced builder, reusing the same way of describing a flow, and the same engine, built in Phase 1B.** One way of describing a flow, two ways of editing it — never two engines.

> **Two consequences worth pricing in**
>
> Because both editing experiences produce the same description, the **description format, and the way its versions are stored, belong to Phase 1B rather than Phase 1C**. Phase 1B is therefore more than a set of forms, and should be estimated as a runtime release.
 And "open as an editable copy in the advanced builder" is a **one-way door**. The canvas is a superset of the recipe form, so a flow cannot return to the simple form afterwards. Do not promise round-tripping.

### Explicitly out of Phase 1

- Customer-created custom stages
- Fully custom pipelines
- Forecast dashboards, weighted probabilities and forecast-specific filtering or sorting
- Existing-Deal migration and pipeline-wide structural impact preview
- Public web-to-lead capture forms [Open decision]

> **Why forecasting waits**
>
> A weighted forecast built on a Deal model that is still settling produces numbers that will be quoted back at us for years. Phase 2 owns forecast so that Phase 1 can change its mind about the Deal without invalidating a board pack.

---

## §A4 · Object model

*Five records that hold data, and the states they pass through. Each boundary exists because something real changes at it.*

```
Lead  (unqualified)
  ↓
Deal  (owns the stage)
  ↓
Quote  (priced work)
  ↓
Accepted  (a state, not a record)
  ↓
Project  (delivery)
  ↓
Invoice  (billing)
  ↓
Paid  (a state, not a record)
```

#### Lead

An unqualified opportunity, sitting in the Lead inbox.

- Created manually, from a form, or by import
- Creating one creates or links a Customer in the same operation
- Duplicate matching must let the user attach to an existing Customer
- Holds title, source, estimated value, owner, customer, contacts, labels, interests, notes
- Converted or discarded; discarding requires a reason
- A converted Lead becomes read-only and stays in history

#### Customer

An organisation or an individual.

- The Lead flow captures organisation and contact person separately
- A new customer is flagged **prospect** until its first Deal, Quote or Project
- Choosing an existing customer must never create a duplicate

#### Deal

One commercial opportunity for one customer. The container that owns the pipeline position.

- Pipeline and stage; owner; one required Owning Company
- Estimated and derived value; expected close date
- Risk notes and lost reason
- Linked contacts with Deal roles
- Workflow tasks and approvals
- Alternative groups, linked quotes and their change orders
- Linked projects and invoices

#### Quote

A commercial document, linked to a Deal when it takes part in CRM automation.

- Cannot be attached directly to a Lead
- May be created from any Deal stage once the Deal exists
- Quote state and Deal stage remain separate fields

#### Alternative group

A named set of mutually exclusive **quotes** on one Deal.

- Only one quote in a group can be accepted
- Quotes inside a group do not add together
- Independent quotes and separate groups **are** additive
- Accepting one system-rejects its siblings
- Rejected siblings stay in the audit history
- Once resolved, a quote cannot leave its group

#### Project & Invoice

Downstream records, deliberately not pipeline stages.

- A Won Deal may prompt the user to create or link a Project
- An accepted quote may raise an invoice action for Finance

> **Alternative groups are the important idea here**
>
> Our customers quote the same job three ways *and* quote three parts of a job separately, often on the same Deal. A flat list of quotes cannot tell those apart, so any value roll-up guesses. An alternative group makes it explicit: inside a group the quotes compete, across groups they accumulate. Everything in §A7 depends on this. Phase 2 applies the identical rule one level down, to options inside a single quote.

> **Figure 3 — A Deal, in full.** The lifecycle strip runs across the top and the person on this screen cannot move the Deal along it. Below it the money panel separates **pipeline estimate from signed contract value** and reports margin four ways — deal, signed, product and labour. Down the left the Deal carries an owning company, an expected close date, an owner and a **source**. **Needs your attention** states the problem plainly — no activity logged for 41 days — and History threads quote revisions, files and notes into one timeline.

> **🛑 Three more things this screen settles, or unsettles**
>
> **Margin is a first-class figure, split four ways.** No source document mentions margin, yet the Deal reports it at deal, signed, product and labour level. The value model in §A7 has to account for it.
 **A Deal has a source** — the lead-source idea carried forward. Not specified anywhere.
 **Lost is a button.** Top right sits a manual *Lost* control, alongside the *Accept & Mark Won* flow in §A6. Both outcomes are human actions in the built product, not derived states.

---

## §A5 · Lead lifecycle

*A Lead has four states and exactly one forward exit. It never holds a quote.*

```
Open  (in the inbox)
  ↓
Converted  (became a Deal)
  ↓
Discarded  (reason required)
  ↓
Archived  (set aside)
```

### Creating a Lead

1. User selects **Create Lead**.
2. User searches for an existing organisation or individual customer.
3. User selects a match, or creates a new **prospect** customer.
4. User enters contact and enquiry information.
5. System creates the Lead and links the customer.
6. If the New Lead response Automation is on, the system assigns an owner and creates a first-contact activity where one does not already exist.

### Converting to a Deal

The order is mandatory and cannot be short-circuited:

```
Open Lead  (step 1)
  ↓
Convert to Deal  (user confirms)
  ↓
Lead read-only  (marked converted)
  ↓
Deal created  (customer already linked)
  ↓
Qualified  (never skipped)
```

- Conversion creates the Deal only — the customer is already linked from Lead creation.
- Deal title defaults to the Lead title; estimated value and owner carry across.
- Conversion must never skip Qualified or create a Deal in a later stage.

The UI may offer **Convert + Create Quote** as one click, but the system still performs two ordered operations: convert the Lead into a Deal in Qualified, then create a draft quote linked to that Deal. The quote begins In Progress, and creating it **is** the trusted event that moves the Deal from Qualified to In Progress (§A6). There is no state in which a Deal holds a related quote and remains Qualified.

> **🛑 Conflict · duplicate customer risk**
>
> The specification requires a customer record at *Lead creation*, flagged as a prospect. That means every enquiry — including the ones that go nowhere — creates or matches a customer row. The existing customer list already runs to tens of thousands of records and already needs a dedicated merge tool, which tells us duplicates are a live problem today. See §C1 · C9 and §A14 for the mitigation this needs.

### Deliberate non-goals for Leads

- No separate Lead kanban board — the Lead inbox is a table, not a board
- No project created when a Lead is created
- No quote attached directly to a Lead

> **Figure 4 — The Lead inbox.** Inbox and Archive tabs, a company filter, and one row per lead. Three details in this screen are **not** in any written specification and need adopting or removing: leads carry an **owning company**; the label column is used for **temperature** (Hot, Warm, Cold) and a lead may hold more than one; and **next activity** is rendered as overdue in red, which makes the inbox a work queue rather than a list.

> **Figure 5 — A Lead, before it is a Deal.** A Lead carries almost everything a Deal does — owner, value, interests, next actions, notes — and none of the commitments. The organisation is free text, the project is empty, and no quote can be attached. Everything here can be true before anyone has agreed to price anything, which is precisely why a Lead cannot be a stage of a quote.

> **Figure 6 — Converting Leads into Deals.** Conversion is explicit and it is one-way. The dialogue names the pipeline and the entry stage before anything is created, and says what happens to the Leads themselves: they become read-only *Converted* records rather than disappearing, so the source reporting survives. Note the owning company column behind — a Lead does not need one, but the Deal it becomes does.

> **Leads carry an owning company**
>
> The prototype shows an owning company on every lead — Main Company, Los Angeles, Northern California, Orange County, Palm Desert. This is sensible for a multi-branch dealer and it means company scoping (§A9) applies to the Lead inbox too, not only to Deals. It should be written into the specification rather than left as prototype behaviour.

---

## §A6 · Quote event to Deal stage

*Protected system logic, not a customer Automation. It reads every relevant quote on the Deal and writes one stage.*

```
Quote event  (create · review · send · accept · cancel · expire)
  ↓
Standardise it  (and confirm the account)
  ↓
Work out the stage  (read all relevant quotes)
  ↓
Protected mapping  (derive stage or status)
  ↓
CRM update  (stage, activity, history)
  ↓
Automation  (eligible flows run)
```

> **Figure 7 — The pipeline board.** The clearest statement of the whole design, made in the interface rather than in prose. A strip across the top spells out the derivation — **"Deal Stage is system-derived from related Quote events"** — followed by the chain from Qualified through to Won and Lost, and the note that all-cancelled becomes an archive status rather than a stage. Each column then repeats the rule locally under **Moves when**, and carries a padlock where the stage is protected. Cards show owning company, deal and margin value, and what is overdue.

> **🛑 Three things in Figure 7 are not in any specification**
>
> A **Site Ready** column sits between Qualified and In Progress with no padlock and a "lifecycle segment" label — that is a Phase 2 custom stage, already built, inside a release that states there are no custom stages in Phase 1. A **Commit Forecast** tab and a **Stage-weighted (Legacy)** tab sit in the view switcher, although forecast is deferred to Phase 2. And every card and column carries a **margin** figure, which appears in no requirement in any source document. See §C1 · C11 to C13.

### The seven stages

### Which quotes count

A Deal may hold several quote families, each with its own revision history. For every family the resolver considers **one** revision, and ignores the rest.

**Relevant quote — inclusion test**

| Include only if | Reason |
|---|---|
| It is the family's current active revision | Superseded revisions must not set a stage |
| It is the family's latest revision | Latest and active are separate flags today and can disagree |
| It is not a sample | Demo quotes would otherwise derive real Deal stages |
| It is not a template | Template quotes are not commercial work |
| It is not archived | Archived work is out of play |
| It is not cancelled | Cancelled work is not viable |
| It is not an expired sent quote | Expiry removes viability without any decision being made |


> **Two further flags need a ruling**
>
> The quote record also carries an over-quota flag and a sales-order flag. Neither is covered by any current specification. A sales order in particular lives downstream of acceptance, so treating it as a competing quote would fight the Won rule. See §A13 · D5.

### Order of precedence

Read top to bottom. The first line that matches is the answer.

**Aggregate precedence**

| # | If this is true | The Deal is |
|---|---|---|
| 1 | Any relevant quote is accepted or complete | Won |
| 2 | Every related quote is cancelled | Archived [status] |
| 3 | At least one relevant quote is sent | Sent |
| 4 | At least one relevant quote has passed review | Passed Review |
| 5 | At least one relevant quote is in review | In Review |
| 6 | At least one quote is a draft or in progress | In Progress |
| 7 | No quote exists | Qualified |
| 8 | Quotes exist, none accepted, none relevant, not all cancelled | Lost |


**Line 1 is absolute.** Once any quote on the Deal is accepted, the Deal is Won and remaining quotes cannot reopen or downgrade it. **Line 8 is the only way a Deal is genuinely lost** — by running out of live options, not by someone marking it lost.

> **🛑 Line 1 is not quite what the prototype does**
>
> The built product does not derive Won silently. It offers **Accept & Mark Won** — and, where several variations are in play, **Accept selected & mark Won**, so a person chooses the winner. It then offers **Accept & Change Winner** afterwards, which means the outcome is revisable.
 That is a better design than pure derivation, because a deal with three competing options genuinely needs a human to say which one was signed. But it contradicts the claim that Won is derived and terminal, and it changes what "absolute precedence" means. This needs restating rather than patching. See §C1 · C18 and §A13 · D1.

### Worked example

### Sent engagement count

- **The number on the right**: one live, client-facing sent proposal per quote family.
- **The number on the left**: how many of those the client has opened at least once.
- Excluded: drafts, in review, passed review, cancelled, expired, superseded and historical revisions.
- Detailed view timestamps stay on each quote's own activity timeline.

### Backward recalculation

If the quote supplying the highest stage is cancelled or expires, the system works the stage out again from what remains, and the Deal may move to an earlier stage. The old state, new state, source quote and reason are all written to history.

> **🛑 Conflict · this directly contradicts an existing specification**
>
> An existing approved document states the opposite: *"Never automatically move a Deal backwards"*, and that an expired quote should keep the Deal in Sent with a follow-up instead. Both behaviours are defensible and they cannot both ship. See §C1 · C5 and §A13 · D1.

### Change orders and grouped quotes

Two things sit above this ladder and are specified in full in §A7. **Alternative groups** decide whether two quotes on the same Deal are rivals or colleagues, which changes what "at least one quote is sent" means for value even though it does not change the stage. **Change orders** vary work already sold: they never move the Deal stage, never reopen a Won Deal, and are excluded from the engagement count. Both are Phase 1 scope.

---

## §A7 · Alternatives, change orders and Deal value

*Two questions run through every Deal our customers work on. Which of these competing options wins? And once one has been signed, how do we change what was sold? Alternatives answer the first. Change orders answer the second.*

### Alternatives — one principle, two levels

A Deal holds several quotes. Some of those quotes are **rivals** — three ways to do the same job, of which the customer picks one. Others are **colleagues** — three parts of one job, which add up. Without saying which is which, no value figure on the Deal can be trusted.

An **alternative group** is how that gets said. Quotes inside one group are mutually exclusive; quotes left independent, and separate groups, are additive. It is a deliberate user action, not an inference.

The same principle then applies one level down. Once a quote has been accepted, a large rework can be raised against it as a **Variation** — and because a rework of that size usually has more than one sensible answer, Variations group into alternatives exactly like quotes do. If the accepted quote covered a whole office, a Variation might strip out or add a substantial part of that office, and the customer may want to see two or three versions of it before choosing.

**The same rule, applied at two levels**

|   | Alternatives between quotes [Phase 1] | Alternatives between Variations [Phase 2] |
|---|---|---|
| **Members of a group** | Quotes on one Deal | Variations raised against one accepted quote |
| **Raised when** | Before anything is accepted | After a quote has been accepted |
| **Typical size** | A whole approach to the job | A large rework — a substantial addition or removal |
| **Rule inside a group** | Only one member can be accepted. Accepting it system-rejects its siblings. |   |
| **Rule across groups** | Separate groups, and independent members, add together. |   |
| **Once resolved** | An accepted, rejected, cancelled or complete member cannot be moved out of its group or regrouped. |   |
| **Audit** | System-rejected siblings stay visible in history and stop contributing to signed totals. |   |


> **Why this matters for the build**
>
> The rules are identical at both levels, which means the grouping mechanism should be built **once** in Phase 1 and reused for Variations in Phase 2, rather than written twice. It also means the customer learns the concept once: a group is a set of choices, and only one of them can win.

> **What §A6 works from**
>
> The precedence ladder in §A6 reads one relevant quote per family. Alternative groups sit above that: they decide whether two relevant quotes are rivals or colleagues. The Deal becomes Won on the **first** acceptance. Accepting is the human act — a person chooses which quote won, and that choice system-rejects its siblings — but the Deal Stage that follows is derived, not chosen. Remaining groups may still resolve afterwards; they change the signed value, never the Stage.

### Change orders [Phase 1]

A change order is also raised against an accepted quote, but it is the *small* instrument. It carries no options, it is one change to work already sold, and only one may be open at a time.

```
Accepted revision  (the signed-off baseline)
  ↓
Raise change order  (one at a time)
  ↓
With the customer  (awaiting response)
  ↓
Signed  (becomes the new baseline)
  ↓
Rejected  (stops contributing)
```

- Raised against the accepted revision, which acts as the **signed-off baseline**.
- **Only one change order in flight per quote.** While one is with the customer, another cannot be raised.
- A **signed** change order takes over as the new signed-off baseline.
- A **rejected** change order stops contributing to the signed totals.
- A quote carrying a signed change order **cannot be unlinked** from its Deal.
- If the accepted revision changes, its change orders **move to follow it**.
- A change order **never changes the Deal stage** and never reopens a Won Deal.
- Change orders are left out of the viewed count in §A6.

**Change order or Variation — which instrument**

|   | Change order [Phase 1] | Variation [Phase 2] |
|---|---|---|
| **Raised against** | The accepted quote — both work from the signed-off baseline |   |
| **Scale** | One discrete change | A large rework of the accepted scope |
| **Options** | None — a single document | Several, grouped as alternatives |
| **Concurrency** | One in flight per quote | Several open at once, one accepted per group |
| **Customer action** | Signs it | Chooses one from the group |
| **Effect on value** | Difference added to signed totals | The accepted Variation replaces the reworked scope |
| **Effect on Deal stage** | None. Neither reopens a Won Deal. |   |


> **Why the sizes are split across phases**
>
> A change order is a bounded, single-answer change and can ship with the baseline product. A Variation is a rework large enough to need options, which means it needs the grouping mechanism, an acceptance flow and value replacement rather than a simple difference. Phase 1 builds the grouping mechanism for quotes; Phase 2 reuses it for Variations rather than inventing a second one.

### Deal value

The interface must never present one blended total. Seven money questions have seven answers.

**Values shown on a Deal**

| Value | Meaning |
|---|---|
| Deal estimate | Manual figure, used when no quotes are linked |
| Accepted / signed | **Accepted net totals plus change-order differences**, counting one accepted quote per alternative group and adding across groups |
| Invoiced | Raised, excluding drafts |
| Paid | Received |
| Outstanding | Invoiced but unpaid |
| Remaining to invoice | Signed value minus invoiced |
| Draft invoice value | Shown separately, never inside the invoiced total |


A Won Deal locks to the signed figure; a Lost Deal freezes for lost-value reporting. Billing colours and value order must match the billing progress bar.

**Events that move money**

| Event | Effect on Deal value | Effect on Deal stage |
|---|---|---|
| Quote accepted in a group | Becomes the signed baseline; siblings system-rejected and removed from value | **Derives Won immediately** (§A6). The signed value keeps settling as the remaining groups resolve. |
| Change order signed | Difference added; becomes the new baseline | None |
| Change order rejected | Stops contributing to signed totals | None |
| Quote cancelled | Removed from active group value; prompt the owner for a next action | Recalculates per §A6 |
| All groups dropped | Freezes for lost-value reporting | **Derives Lost** (§A6). Sales must supply the loss reason, which does not change the outcome. |
| Quote complete | No change — a fulfilment state, not a commercial one | None |


---

## §A8 · Quote & Sales — the list and the quote workspace

*A quote stopped being a detail page inside the CRM. It is now somewhere a person goes to work, and the interface has to say so.*

Everything so far has described how the CRM *reasons* about quotes — which one counts (§A6), how rivals differ from colleagues (§A7). This section is about where the person actually stands while doing the work: the list they start from, and the workspace they enter.

Someone begins at **Quote & Sales → Quotes**, settles which deal and which options belong together, then opens one quote. At that moment they stop browsing the CRM and start editing a single document. The navigation changes to match.

```
Quotes list  (filter and group)
  ↓
One quote  (row, option or deal)
  ↓
Quote workspace  (its own navigation)
  ↓
Linked deal  (options and outcome)
```

### The list, and who is allowed to see what

The company filter offers **All Companies** and the companies the signed-in person may open. That list is a permission boundary, not a convenience. A company missing from the filter is a company they cannot reach by any route, a pasted URL included.

Under All Companies every row must say which company issued the quote, or two rows for the same customer become indistinguishable. Pick one company and that column disappears, because the same value repeated down every row is noise. Status counts, search, pagination and grouping all follow the chosen scope — a count that ignores the filter is worse than no count at all.

> **Figure 8 — Step 1 — the Quotes list, All Companies.** Everything starts here. Because **All Companies** is selected, every row carries its issuing company — without it the two Theater Upgrades quotes at the top would be indistinguishable. The tabs along the top count quotes by status *within the current scope*, and the **Options** control on each row says how many quotes its deal holds.

> **Figure 9 — Step 2 — scoped to one company.** Choose a single company and the company column disappears, because repeating one value down every row is noise. Everything else follows the same scope: thirteen quotes become two, and the tab counts fall with them — All 13→2, In Progress 4→0. A count that ignored the filter would be worse than no count.

> **One quiet migration risk**
>
> Existing quotes with no owning company must be resolved before this ships. The tempting default — treat them as belonging to whoever is signed in — hands one company's quotes to another without anyone noticing. They have to be assigned deliberately and flagged for review. The gate for that sits in §A15.

### Grouping that changes nothing

**Group by Deal** gathers the quotes belonging to one deal under a single heading. It is a view, not an edit: no quote record changes, and switching it off restores the flat list exactly. The Options control on a row says how many quotes the deal holds and opens their summary. Group headings and column spans have to stay aligned whether the Company column is showing or hidden — the two states are where this breaks.

> **Figure 10 — Step 3 — grouped by deal.** Related quotes gather under their deal. This is a view and nothing more: no quote record changes, and switching it off restores the flat list exactly. The two Theater Upgrades options now sit together under one heading.

### Opening a quote — one destination, five doors

There are five ways to reach a quote. All five must arrive at the same place with the same record loaded.

**Entry points into the quote workspace**

| The person clicks | and arrives at |
|---|---|
| A row in the Quotes list | The dedicated quote workspace, at that quote's own address, with that record loaded |
| The dedicated quote workspace, at that quote's own address, with that record loaded | A quote ID inside the options popover |
| The dedicated quote workspace, at that quote's own address, with that record loaded | An option in the linked-deal panel |
| The dedicated quote workspace, at that quote's own address, with that record loaded | A quote option they have just created |
| The dedicated quote workspace, at that quote's own address, with that record loaded | A related quote listed on a Deal |


No door may open the older CRM-style quote summary. One surviving fallback route is enough to make the workspace optional, and an optional workspace will not be maintained.

> **Figure 11 — Step 4 — what else is on this deal.** The Options control opens the deal without leaving the list: both options, their values, their statuses, and the sentence that governs the whole model — *only one option can be accepted*. From here you can add an option, open the deal, or unlink.

### What the workspace is

Opening a quote replaces the CRM sidebar and top bar with navigation belonging to the quote: Summary, Editor, Price Adjustments, Tax Rates, View Proposal, View Changes, Costs and Billing, Importer, and Notes and Documents. The header names the quote, the proposal or revision, the issuing company and the net total. The summary carries customer, project, assignee, label, quote status, dates, margins and line items.

The workspace is a place of its own, not a panel inside the CRM, and the address bar has to agree. Opening a quote changes the browser address to that quote, so it can be linked in a message, bookmarked, and reopened straight from that link. The separation is deliberate: it is what stops the CRM sidebar reappearing around a quote somebody is editing. In the prototype that means the list lives at `index.html#quotes` and the workspace at `quote-detail.html?quote=<quote ID>`, both driven by the same data and interaction logic.

The issuing company appears whether or not it was visible in the list, because the person may have arrived from All Companies and cannot be assumed to know. A back action returns to the Quotes list, keeping the filter and grouping they left behind wherever that is practical.

> **Figure 12 — Step 5 — inside the quote.** Opening a quote replaces the CRM chrome entirely. The navigation down the left belongs to the quote; the header carries the issuing company, because the person may have arrived from All Companies and cannot be assumed to know. Along the top: the deal, the stage the resolver derived for it, **Option 1 of 2**, and the way back.

### The deal, seen from the quote

Above the quote sits its relationship to a deal: the deal's name, the stage the resolver has derived for it, **Option N of M**, a way to open the deal, and a menu covering every option on it. A quote with no deal shows **Link options** — not an invented deal, and not an empty space.

**The four relationship actions, and what each one protects**

| Action | What it does | What it must never do |
|---|---|---|
| **Link** | Attaches an unlinked quote to an existing deal, or to another quote so the two share a deal grouping. | Change the owning company, the customer or an accepted outcome. The dialogue states what will change before it changes. |
| **Add option** | Creates a new quote option, or links a compatible existing one. A new option inherits the deal's customer, project, owning company and deal, and the person names it first. | Create a quote the moment the menu is clicked. Nothing exists until it is confirmed. |
| **Switch Deal** | Moves an already-linked quote from one deal to another, updating both option counts. | Happen silently as a side effect of linking, or move a quote off a Won deal without protecting that outcome and its history. |
| **Unlink** | Separates the quote from the deal. Both survive as independent records. | Delete either record, or leave the deal holding an option that is no longer there. |


All four write an audit event. The panel listing the options — option number, quote ID, which is current, which one won, value, status, unlink — is a relationship manager. It is not a second copy of the data; the quote and the deal remain the records of truth.

> **Figure 13 — Step 6 — managing the relationship.** This is the relationship manager described in §A8 — option number, quote ID, which one is current, value, status, and a way to unlink each. It edits the relationship, not the records: the quote and the deal remain the sources of truth. All five actions live here, and each writes an audit event.

> **Figure 14 — Step 7 — adding an option.** Nothing is created until this is confirmed — the requirement that the menu click alone must not produce a quote. The chips underneath the name field show exactly what the new option will inherit: *same customer*, *Theater Upgrades*, *Main Company*. The other route, linking a compatible quote that already exists, sits on the same dialogue.

> **Figure 15 — Step 8 — linking to an existing deal.** The first of the two linking routes. Each candidate deal shows its stage, how many options it already holds and its value — and, where it cannot be used, why. Every row here is padlocked with *project mismatch*: compatibility is enforced in the dialogue rather than reported as an error afterwards.

> **Figure 16 — Step 9 — or linking to another quote.** The second route. Only Q-24590 — same customer, same project — can be selected; everything else is padlocked and labelled *different customer*. Choosing it makes WeQuote create or reuse the shared deal. The gate runs on three things at once: owning company, customer and project.

> **Figure 17 — Step 10 — comparing the options.** Compare is **customer-facing**, and the dialogue says so: internal margin, product cost, commission and supplier pricing are deliberately withheld. What remains is what a client should see when choosing — investment, difference, scope, warranty, timeline — with one accept button each, because only one can win.

> **🛑 Cross-company linking is a security question, not a convenience**
>
> A quote and a deal must share an owning company. The exception is real — some organisations genuinely work across their own companies — but it needs a permission the person actually holds and a confirmation they actually see. A link that quietly crosses the boundary is the same defect as opening another company's Deal by URL, wearing different clothes.

### Getting back

The relationship reads in both directions. From the quote, View Deal opens the deal. From the deal, a related quote opens that quote's workspace. Neither direction may land on an unrelated pipeline, and neither may land on the retired quote page. A round trip — quote to deal and back — returns to the record it started from.

> **What the prototype proves, and what it does not**
>
> The prototype demonstrates this journey convincingly and should be used to settle interface questions. It holds its state in the browser. It does not demonstrate persistence, permissions, audit logging, migration, idempotency or server-side stage resolution — each of those is delivery work described in this document, and none should be reported as already built. §C1 keeps that distinction feature by feature.

---

## §A9 · Company access and Automation scope

*One CRM account may hold several operating companies. A manager sees across them; an Automation runs for the ones it was built for.*

Audio Vision is the working example: one account containing London, Manchester and Projects as separate operating branches.

**Company model**

| Record | Example | Rule |
|---|---|---|
| **Account** | Audio Vision Group | One account may view permitted records across all its companies. |
| **Owning Company** | Audio Vision — London | Required on every Deal. Used for Automation scope matching. |
| **Other companies** | Manchester; Projects | A user may view All Companies or filter to those they can access. |
| **Related quote** | AV-LON-1042 | Inherits the Deal's owning company. Cross-company linking is never silent. |
| **Automation scope** | All, or selected | Required before the draft is created. Default: All Companies. |


Scope must be visible in five places: Create Automation, the builder's flow summary, the map and list cards, the before-and-after comparison, and the publish confirmation. Change history records the old scope, the new scope, the user, the timestamp and the published version.

### What has to match before it runs

```
Account  (tenant boundary)
  ↓
User access  (may see company)
  ↓
Company scope  (match)
  ↓
Stage  (match)
  ↓
Active version  (published only)
  ↓
Execute  (audited)
```

> **The first box is new, and it matters**
>
> Seeing records by company does not exist in the product today. Quote visibility currently has two settings: records you own, or records shared with the whole organisation. There is no company, team or territory tier. Because the runtime order above makes company matching load-bearing, this is a new access-control layer and should be estimated as one.

A further consequence: an Automation fires from a background queue, not from a person clicking. Today the product checks permissions against whoever is signed in — and a background job has nobody signed in. So the account each event belongs to must be established and checked the moment it arrives, before any company or stage is matched.

---

## §A10 · Templates, and the creation journey

*Two ways to set one up, delivered in two releases, sharing one description format and one engine.*

> **Definition — managed automation recipe**
>
> A **managed automation recipe** is a ready-made flow with a few settings a customer can change. A customer may enable or disable it, choose its company scope, and edit only the fields the recipe exposes. **It does not require access to the canvas builder.**
 Those settings are things like: who it is for, which companies it covers, how many days to wait, which label to use, what the note says, when it is due, whether it is required, and who gets told.

This replaces the earlier definition, in which selecting a template copied an editable draft into the canvas. That version could not be delivered without the canvas, so it forced the most expensive surface into the first release. A recipe is instead a finished configuration experience in its own right — and for most customers, the only one they will ever use.

Technically the two surfaces are one system:

```
Phase 1B recipe form  (typed fields)
  ↓
Shared workflow definition  (one schema, versioned)
  ↓
Runtime  (one engine)
```

```
Phase 1C builder  (editable copy of a template)
  ↓
Shared workflow definition  (same schema)
```

Once Phase 1C ships, a recipe can offer **Open as an editable copy in the advanced builder**. The copy is independent — the live recipe keeps running untouched — and the move is **one-way**, because the canvas can express flows the form cannot.

### Creation journey [Phase 1B and 1C]

*One hierarchy for every pipeline type, and one creation route: every Automation begins as one of the twelve templates.*

```
Choose pipeline  (same records as Deals)
  ↓
Map or list  (opens centred)
  ↓
Card or empty state  (always openable)
  ↓
Builder  (focus mode)
```

1. Choose the fixed stage.
2. Choose one of the twelve templates for that stage. **There is no blank-canvas route in Phase 1** — see the Future row in §A3.
3. Choose company scope.
4. An inactive draft is created.
5. Edit triggers, rules and actions.
6. Save draft.
7. Optionally test.
8. Validate.
9. Publish, unless a blocking conflict exists.

A pipeline or stage with zero Automations must still open, showing an empty state that explains the situation and offers Create Automation. The stage is fixed when the Automation is created and stays read-only in the builder — it cannot be renamed there.

> **Figure 18 — Choose a pipeline.** Every pipeline is listed, including one with no Automations at all — the requirement that a zero-Automation pipeline stays openable, visible in the interface. Each row shows its lifecycle as a chain of stage chips, so the difference between the two pipelines is legible before you open either.

> **🛑 There are four levels here, not three**
>
> The legend along the bottom of Figure 18 reads: **pipeline** (the protected business lifecycle) → **Automation** (one complete setup for that pipeline) → **flows** (independent business outcomes inside it) → **steps and rules** (trigger, condition, wait, action, end).
 Every written specification describes three levels and never defines a **flow**. This also explains the "Flow 1", "Flow 3" and "Flow 4 · advanced" labels on the design artifacts, which otherwise look like slide numbers. If an Automation contains several flows, then almost everything in §A11 — draft, test, publish, active state, version history — needs to state whether it applies to the Automation or to a single flow. See §C1 · C14.

> **Figure 19 — Automation setups for one pipeline.** Not one automation per pipeline, but three named **setups** — Standard, High-value and Simplified — each a whole sales policy carrying ten or eleven automations inside it. The interface states its own constraints across the top: **one setup active at a time**, the protected quote lifecycle stays unchanged, and before switching you preview the policy fit, the affected open Deals and a before/after result. The last line of that banner matters most: **existing runs keep their original Automation**.

### What comes ready to use [Phase 1B]

Twelve named recipes ship configured and ready. In Phase 1B a customer enables one, scopes it and edits its exposed fields. From Phase 1C the same twelve are also available as a starting point in the canvas. Neither route ever alters the protected lifecycle.

**Twelve ready-made automations**

| Stage | Template | Status |
|---|---|---|
| Qualified | Qualified first next action | Connected |
| Qualified | Qualified inactivity reminder | Connected |
| Qualified | Site visit and pre-quote readiness | Connected |
| In Progress | Quote build and scope-of-work checks | Connected |
| In Review | Internal quote review | Connected |
| Passed Review | Ready-to-send check | Connected |
| Passed Review | **High-value approval** | Template ships; thresholds are live production settings. Open ruling: whose threshold applies (§A14 · D7). |
| Sent | Sent quote follow-up | Connected |
| Sent | Quote expiry reminder | Connected |
| Won | Won Deal handoff | Connected |
| Won | Accepted quote to draft invoice | Connected |
| Lost | Lost Deal reason follow-up | Connected |


> **Figure 20 — What comes ready to use.** Every template with its actual steps, grouped by the stage it starts in. Two things are worth reading closely. **High-value approval** — the one unconnected template — already has its rule expressed as `Value > 25,000 in the Deal Company currency OR discount > 15%`. The *fields* behind that rule are real, configurable production settings; the *numbers* are example values from this artifact and should not be quoted as a real customer’s setting. Separately, exactly **two** templates use an explicit **Wait** step — seven calendar days on Qualified inactivity, three calendar days on Sent follow-up. The rest work from due dates or date-based triggers, which is a different scheduling problem (§C2).

> **The one gap is the cheapest item in the pack**
>
> High-value approval fires when a configured quote-value or discount-percentage threshold is exceeded. Both thresholds already exist as live configuration in the product — they drive the current review requirement. Connecting this template is a wiring job, not a new capability. One ruling is needed: those thresholds are held per user, so whose threshold applies — the Deal owner's, the quote owner's, or the approver's? See §A13 · D7.

---

## §A11 · What an Automation is made of

*Three kinds of building block, one shared list, and a few extras that only make sense at certain points in the sale.*

Whether a customer switches on a ready-made recipe or builds a flow themselves, they are choosing from the same list. The product calls these **workflow blocks**. There are only three kinds, plus a short list of things that are deliberately never offered.

#### Starts when — available everywhere

- Deal owner changes
- Next action changes, becomes due, overdue or completed
- Meeting or site visit changes
- File added to the Deal
- Requested file received
- Deal inactivity reaches a configured duration
- Expected close date approaching
- Deal data changes: owner, label, interest, value, company, expected close

#### Rules — available everywhere

- Owner or next action is missing
- Required task or file is missing
- Meeting or site visit complete or incomplete
- Recent activity exists or does not
- Label, interest, value or company matches
- Expected close date matches

#### Actions — available everywhere

- Assign Deal owner or a named person
- Set or clear next action
- Create note
- Schedule meeting or site visit
- Add or remove watcher
- Add or remove Deal label
- Add or remove interest
- Request or attach file
- Set expected close date
- Send internal notification

#### Never offered

- Approve a quote or stand in for a reviewer
- Send a proposal to a client
- Accept a quote on a client's behalf
- Mark a Deal Won or Lost
- Write any protected stage directly
- Redefine what a stage means

> **Figure 21 — What you can use, stage by stage.** The single-catalogue rule, drawn. The shared core sits across the top — identical everywhere. Each stage row then adds only the quote events and quote-state rules that can genuinely occur there, and the **Actions column repeats "same shared core actions" seven times**, which is the invariant stated as a picture. The right-hand column holds the protected progression deliberately *outside* the library: `First Quote created → In Progress` is labelled "not an Automation Action".

> **Figure 22 — An Automation, at rule level.** The same map at full zoom. Between the stage columns sit the **protected transitions** — grey, uneditable, labelled with the quote event that causes them. Inside each column sit the customer’s automations, each one a *when*, an *if*, and a branch for *yes* and *no*. The legend along the bottom restates the rules that never move: Won is any relevant quote accepted, Archived is all of them cancelled, Expired is derived from sent plus an expiry date.

### The rule that keeps it simple

**One shared list, not one per stage.** Every stage offers the same Actions and the same core triggers and rules. A stage only *adds* the quote events that can genuinely happen there — you cannot wait for a review result at a point where no quote exists yet. Blocks that do not fit are shown crossed out rather than hidden, so nobody wonders what is missing.

The engineering contract behind that sentence is in §B1.

---

## §A12 · Draft, test, validate, publish

*Customers edit rules while live deals run through them. Testing is encouraged, not compulsory.*

```
View  (current published)
  ↓
Edit  (triggers, rules, actions)
  ↓
Save draft  (never affects live)
  ↓
Test  (optional)
  ↓
Validate  (conflict check)
  ↓
Publish  (atomic swap)
```

**State behaviour**

| State | What the user sees | Publish |
|---|---|---|
| No changes | Save draft disabled; no unpublished changes | Nothing to publish |
| Unpublished changes | `Current · published` compared with `After · draft` | Available if validation passes |
| Test passed | `Test passed · just now` | Available |
| Test outdated | Shown after any edit following a pass | Still available unless a conflict requires a retest |
| Blocking conflict | Exact step and reason highlighted | Disabled until fixed |


### Why testing is optional

Forcing a test for every wording change teaches people to click through warnings. Testing becomes mandatory only where validation finds a genuine conflict:

- An action missing mandatory configuration
- A referenced target stage that no longer exists
- A file-received trigger pointing at a deleted file request
- Circular stage movement
- A protected milestone used as a generic move target
- A wait or retry path with no safe ending

### Simulator

A test runs against a safe copy and never touches live CRM data. Timeline is the default tab and supports Play, Step, Reset and Speed. Before-and-after shows the CRM records and fields that would actually change — not two duplicate pipeline columns. Exiting with unsaved work offers Continue editing, Discard changes, and Save draft and exit.

### What happens when one runs

- Only the published version runs. Drafts, test drafts, inactive and out-of-scope Automations never run.
- Every run stores the source event, the Automation and version, the company scope, the branch taken and timestamps.
- A retry never doubles up — no second note, meeting, next action, file request or move.

### Where results must appear

**Visible outcomes**

| Outcome | Must appear in |
|---|---|
| Note, meeting, site visit, next action | Deal activity |
| Operational follow-up or scheduled meeting | Deal activity **and** the Deal card |
| Label, interest, owner, expected close | Deal fields and history |
| File request | Needs your attention, the Deal card, and history |
| Every outcome | Change and activity history |


> **Known acceptance defect, and a wider concern**
>
> When an Automation creates a scheduled meeting or follow-up for a Qualified Deal, it currently lands only in history — it must appear on the Deal card and in Deal activity as well.
 More broadly: the product's existing activity log holds roughly 1,800 entries against roughly 11,000 quotes and tens of thousands of customer records. It is, in practice, unused. The CRM's entire value rests on that timeline, so understanding why nobody writes to it today should shape the interface more than anything else in this document. See §A13 · D3.

Two vocabulary rules to hold: Deal labels remain a flexible multi-select — Hot, Warm, Cold, VIP and any customer-created value all use labels, and no separate temperature field is introduced. Interests are a distinct multi-select with their own add and remove actions. Expected close date sits on Deal details beneath labels, and is not a Lead field.

---

## §A13 · Required-work gate and file requests

*When work must happen before a stage can move, the system blocks the move and then resumes the exact operation the user started.*

```
Attempt  (stage move or quote action)
  ↓
Collect  (every unfinished item)
  ↓
Dialog  ("have you completed…?")
  ↓
Resolve  (upload or mark complete)
  ↓
Continue  (enabled when empty)
  ↓
Resume  (the original action)
```

- List every unfinished item, including where there are ten or more.
- Mark each item's source — a custom-stage requirement or a quote-lifecycle requirement.
- File requirements offer Upload file; note, meeting and readiness requirements offer Mark complete.
- Continue stays disabled until the list is empty.
- Review in Deal opens Needs your attention.
- After completion, resume the exact original operation — never substitute a generic fallback.

### Requested file is received

This trigger is never created from nothing. It must bind to a real, named, open file request on the Deal.

- The request may have been created in the current stage, an earlier stage, or manually.
- Without a valid selectable request, the Automation cannot be saved.
- Creating a request writes Deal activity, Needs your attention, history, and due-and-assignee status on the Deal card.
- Uploading the matching file resolves the requirement automatically.
- Reminder, due-date and assignee changes remain auditable.

---

## §A14 · Open decisions

*Nine questions that are not engineering's to answer. The first four change the shape of the product.*

The consolidated model recalculates and lets a Deal step back — a sent proposal expires, and the Deal returns to In Progress because the only live quote is the one still being built. An earlier approved specification states the opposite outright.

We already sell a two-way Zoho CRM sync that maps quotes to Zoho deals with configurable stage mapping. Introducing our own Deal gives those customers two pipelines for one job. No source document in this package mentions the integration. Full detail in §C3.

The existing notes and activity log holds roughly 1,800 entries against roughly 11,000 quotes and tens of thousands of customer records. The CRM's whole value rests on the timeline — the notes, the calls, the reminders, the relationship history.

Trading Name already decides what appears on an invoice and feeds an accounting breakdown. Making it decide which Automations apply gives one record a third job. Separately, many existing quotes have no trading name set at all, so a default is needed before a company can be made mandatory.

Beyond the seven tests in §A6, the quote record carries an over-quota flag and a sales-order flag. A sales order sits downstream of acceptance, so counting it as a competing quote would fight the Won rule.

A change order goes to the customer for signature, so it is a priced, customer-facing document like a quote. Quotes can be gated behind internal review and a value or discount approval threshold; nothing states whether change orders follow the same path, or go straight out.

The behaviour of a change order once signed is settled and specified in §A7. This is only about what happens before it is sent.

The high-value approval template fires on a quote-value or discount threshold. Those thresholds are configured per user in the product today.

The prototype is ahead of every document in three places. A custom stage — **Site Ready** — is already built into the Sales Pipeline, inside a release that states Phase 1 has no custom stages. A **Commit Forecast** view already exists, although forecast is deferred to Phase 2. And **margin** appears on every deal card and column total while appearing in no requirement anywhere.

This is a scoping question, not a bug. The work is done and demonstrable; the choice is whether to document it into Phase 1, hide it until its phase arrives, or ship it as-is and accept that the roadmap boundary in §A3 is not real.

Whether an accepted quote can be reversed, or only reopened with an audit event. Default inactivity thresholds for Leads and Deals. Whether overdue reminders repeat or fire once — the recommendation is fire once with a persistent overdue state. Whether Finance is notified on each acceptance or only once all alternative groups resolve. Whether a cancelled group changes Deal value before the owner confirms. Whether raising a change order follows the same internal review path as a quote. Whether a Create related quote action is ever exposed. Whether Phase 3 supports templates.

---

## §A15 · Delivery gate

*Acceptance criteria prove the software behaves. This list proves a release is safe to ship. They are different questions, and a release can pass the first while failing the second.*

Each release has its own gate. An item marked **blocking** stops the release; an item marked **track** must have a named owner and a date, but does not hold the door.

Owners here are roles, not people — the named individual, the current status, the target date and the evidence live in the QA workbook, because a published page cannot be filled in. This section defines the gate; the workbook tracks it.

### Phase 1A — CRM foundation

**Gate for Phase 1A**

| Area | Item | Owner | Gate |
|---|---|---|---|
| **Decisions closed** | D1 — do Deals move backwards? Until this is answered, FR-24 is not committed scope. | Product | Blocking |
| **Decisions closed** | D2 — Zoho coexistence. Deals stay switched off for Zoho-connected organisations until agreed. | Product + CTO | Blocking |
| **Decisions closed** | D4 — is the CRM company the existing Trading Name, or a new record? | Product + Eng | Blocking |
| **Decisions closed** | D5 — do over-quota quotes and sales orders count toward a Deal stage? | Product | Blocking |
| **Decisions closed** | D6 — does raising a change order follow the quote review path? | Product | Blocking |
| **Decisions closed** | D3 — why is today's activity timeline unused? Research complete, findings applied to the design. | Product + Design | Blocking |
| **Data** | Quote stage history extended to record the review stages it currently cannot. | Data | Blocking |
| **Data** | Activity timeline carries an organisation column, filled in for existing rows. | Data | Blocking |
| **Data** | Owning company assigned to existing quotes that have none. | Data | Blocking |
| **Data** | Ruling recorded on whether Deals are created for existing quotes, or only for new work. | Product + Eng | Blocking |
| **Data** | Default Lead states and disqualify reasons seeded per organisation. | Data | Track |
| **Build** | Stage logic derives every stage; no screen lets a person set one. | Engineering | Blocking |
| **Build** | Phase 1A creates no note, task, file request or notification unprompted (FR-41). | Engineering | Blocking |
| **Build** | Company-level visibility shipped as a real permission tier, not a filter. | Engineering | Blocking |
| **Build** | Account is established and checked when an event arrives, not from a signed-in session. | Engineering | Blocking |
| **Build** | Alternative groups, change orders, signed value and the four margin figures all present. | Engineering | Blocking |
| **Build** | Every route into a quote opens the same dedicated quote workspace, and the global CRM navigation is replaced by the quote's own. | Engineering | Blocking |
| **Build** | The quote workspace shows quote identity, issuing company, linked deal, deal stage and option position, with working navigation back to the list and to the deal. | Engineering + Design | Blocking |
| **Build** | All Companies shows the owning company column and selecting one company hides it. Counts, search, grouping and rows respect both the permission and the filter. | Engineering | Blocking |
| **Build** | Link, Add option, Switch Deal and Unlink use explicit dialogues, inherit the required records and write audit history. | Engineering | Blocking |
| **Security** | A quote cannot be silently linked to a deal owned by another company. A cross-company exception requires an explicit permission and a confirmation the user sees. | Engineering + Security | Blocking |
| **Tests** | All eight precedence rules, each proven in isolation. | QA | Blocking |
| **Tests** | Each of the seven quote-inclusion clauses proven to exclude. | QA | Blocking |
| **Tests** | Both revision flags tested in all four combinations. | QA | Blocking |
| **Tests** | An event carrying another account's identifiers is rejected. | QA | Blocking |
| **Tests** | Quote-list row, options popover, deal bridge and a newly created option all reach the same workspace holding the correct record. | QA | Blocking |
| **Tests** | Company column visibility, counts, filters, Group by Deal and empty states proven for All Companies and for each permitted company. | QA | Blocking |
| **Tests** | Create, link, switch and unlink proven for linked, unlinked, cross-company, Won, cancelled and deleted quotes. | QA | Blocking |
| **Tests** | Multiple-option acceptance resolves one winner, the sibling outcomes, the deal stage, engagement counts, activity and invoice idempotency. | QA | Blocking |
| **Flags** | Site Ready custom stage hidden until Phase 2. | Engineering | Blocking |
| **Flags** | Commit Forecast and Stage-weighted views hidden until Phase 2. | Engineering | Blocking |
| **Handoff** | Conflict register (§C1) signed off, every row resolved or explicitly deferred. | Product | Blocking |
| **Handoff** | Margin definition written down: what each of the four figures includes. | Product | Track |
| **Handoff** | Product copy defines quote, option, revision, alternative group, linked deal, issuing company, Rejected, Cancelled, Expired, Lost and Archived consistently. | Product | Track |


### Phase 1B — managed recipes

**Gate for Phase 1B**

| Area | Item | Owner | Gate |
|---|---|---|---|
| **Decisions** | D7 — whose approval threshold applies on a high-value quote. | Product | Blocking |
| **Build** | One shared description of a flow, with versions stored server-side. Browser storage does not satisfy this. | Engineering | Blocking |
| **Build** | Recipe settings can be changed without opening the canvas. | Engineering | Blocking |
| **Build** | Every recipe carries a company scope, visible everywhere it is listed. | Engineering | Blocking |
| **Build** | Timed recipes have a real work queue: persistence, worker, 1–90 calendar-day waits, timezone, cancellation when a record leaves the stage. | Engineering | Blocking |
| **Tests** | Replaying the same event creates nothing twice, for every action type. | QA | Blocking |
| **Tests** | Work already in flight finishes on the version it started with. | QA | Blocking |
| **Tests** | Only one change order can be open per quote. | QA | Blocking |
| **Handoff** | All twelve recipes are defined and configurable. A timed recipe cannot be switched on until the production work queue exists. | Product | Blocking |
| **Handoff** | Event-driven recipes ship first. Timed recipes stay unavailable, not merely inactive, until the queue lands. | Engineering | Track |


### Phase 1C — template editing in the builder

**Gate for Phase 1C**

| Area | Item | Owner | Gate |
|---|---|---|---|
| **Build** | The block list is built from one shared source. No per-stage hard-coded lists, and placement never used as a permission key (FR-33). | Engineering | Blocking |
| **Build** | Draft, optional test and publish, with publishing blocked only by a real conflict. | Engineering | Blocking |
| **Build** | Required-work gate collects every outstanding item and resumes the exact original action. | Engineering | Blocking |
| **Tests** | The shared core block list is identical in all seven protected stages. Stage-specific quote events and rules appear only where they can genuinely occur. | QA | Blocking |
| **Tests** | A draft or test never changes the live version. | QA | Blocking |
| **Handoff** | "Open as an editable copy" documented as one-way, with no promise of returning to the simple form. | Design | Track |


> **The two items most likely to be skipped**
>
> The **activity timeline research** (D3) and the **organisation column backfill** both look like preparation rather than product, so both tend to slide. The first decides whether anyone uses the CRM; the second is the only thing keeping one customer's notes out of another customer's timeline. Neither is optional.

---

## §A16 · Risks and sign-off

**Risk register**

| Risk | Severity | Response |
|---|---|---|
| **Two pipelines disagree.** Zoho-connected customers see a different stage in each system. | High | Settle D2 before build; hold Deals back for those organisations. |
| **The customer list doubles.** A prospect record is created for every enquiry, including dead ones. | High | Duplicate matching is mandatory at Lead creation, not advisory. Report on prospect records that never convert. |
| **Two incompatible stage models ship.** Earlier specifications use a five-stage model while this document commits to seven. The build and the prototype must follow one signed-off model. | High | §C1 conflict register signed off before build starts. |
| **Recipes that cannot fire.** Two recipes and four core triggers need timed work. Scheduled jobs exist in production, but no Automation work queue does. | High | FR-38. Ship event-driven recipes first; the queue gates only the timed ones. |
| **The phase boundary is already leaking.** A custom stage and a forecast view are built and demonstrable inside a release that excludes both. | High | D9. Decide per feature: document into Phase 1, or hide behind a flag until its phase. |
| **Undocumented capability ships silently.** Margin, lead owning company, lead temperature labels and the flow level all exist without a requirement. | Medium | C11–C16 adopted into the specification before build, so nothing ships unwritten. |
| **Nobody uses the timeline.** We ship a CRM whose core surface is ignored, as today's is. | Medium | D3 research before build; measure note-creation rate as a launch metric. |
| **Everything becomes a dialog box.** The product's habit is the pop-up; a CRM needs one-click capture. | Medium | Inline capture is a stated design requirement for the Lead inbox and Deal card. |
| **The builder is bigger than it looks.** A visual rules canvas is a new interface class for this team. | Medium | Design it before estimating it. |
| **The three quote mechanisms get conflated.** Alternative groups, change orders and Variations were treated as one idea across earlier drafts. | Medium | §A7 holds them apart and fixes the phase of each. Review that table before build. |


### Sign-off

**Required confirmations**

| Owner | Confirms |
|---|---|
| **Product** | The conflict register (§C1). Lead model and duplicate control. The three quote mechanisms in §A7 and their phases. D1, D5, D6, D7. |
| **CTO / Engineering** | One global catalogue. Resolver order and precedence. Account-boundary contract (FR-35). Idempotency and audit. Versioning as new persistence (FR-40). Scheduler dependency (FR-38). D2. |
| **Design** | Two-route creation screen. Lead inbox and conversion with duplicate candidates. Required-work dialog. Sent engagement card. The inline-capture commitment. |
| **WeQuote domain owner** | Current quote status, trading name, review, send, accept, expiry and cancellation behaviour. |
| **Data / Integrations** | Zoho coexistence (§C3). Inbound sync field ownership. Owning-company backfill. |
| **Roadmap owner** | Forecast stays in Phase 2; fully custom pipelines stay in Phase 3. |


> **Recommended order of work**
>
> Settle §C1 and decisions D1 to D3 before any build starts. All three are answerable by a decision rather than by engineering, and all three are expensive to discover late. Everything else in this document can proceed in parallel.

---

## §B1 · Block library contract

*The engineering rules behind §A11. Breaking any of these forces a rewrite when custom stages arrive — those stages are **Phase 2, not Phase 1 delivery**; the rules are kept here as a Phase 1 guardrail so the rewrite never becomes necessary.*

### The one rule engineering must not break

- All seven stages expose identical core block identifiers, names, settings and validation.
- A stage may only **add** quote-specific triggers and rules. It may never remove or rename the shared core.
- Core actions do not change by stage in Phase 1.
- Protected progression stays outside the editable catalogue.

### What each stage adds

**What each stage adds, and what stays out of reach**

| Stage | Adds triggers | Adds rules | Protected result, outside the library |
|---|---|---|---|
| **Qualified** | Deal enters Qualified | No related quote exists; still Qualified | First quote created → In Progress |
| **In Progress** | First quote created; quote edited; pricing or scope changes | Quote is draft; pricing or scope incomplete; review enabled | Submit review → In Review. Review off: send → Sent |
| **In Review** | Quote submitted; review note changes | Still in review; reviewer missing; technical note open | Review passes → Passed Review. Changes requested → In Progress |
| **Passed Review** | Quote passes review | Quote viable; client-facing content complete; further approval needed | Quote sent → Sent |
| **Sent** | Quote sent; client views quote; expiry approaching | Still sent; viewed or not; viable; not expired | Accepted → Won. None viable → Lost |
| **Won** | Quote accepted; Deal becomes Won | Accepted quote exists; deposit required; handoff incomplete | Terminal outcome |
| **Lost** | Deal becomes Lost | Loss reason missing; no viable quote remains | Terminal outcome |


> **Create related quote — unresolved**
>
> If a *Create related quote* action is ever permitted, it must create the quote and let the protected system logic derive In Progress; it must never write the Deal stage itself. The current canonical matrix does not list it as a shared core action, so it stays out of Phase 1 rather than being invented to fill the gap. See §A13 · D8.

---

## §B2 · Functional requirements

**Phase 1 requirements**

| ID | Requirement |
|---|---|
| FR-01 | Automation creation offers exactly one route in Phase 1: start from one of the twelve templates. *The second route — start from scratch — is **deferred** beyond Phase 1 by the 25 August handoff. This requirement keeps its number; only the scratch half is out of scope.* |
| FR-02 | A managed recipe is a versioned workflow with configurable typed fields, usable without the canvas. Enabling, scoping and field editing must not require the builder. |
| FR-03 | The recipe form and the canvas emit the same workflow definition and run on the same engine. Two engines are not permitted. |
| FR-04 | Opening a recipe as an editable copy in the builder leaves the live recipe running, and is a one-way conversion. |
| FR-05 | ***Deferred beyond Phase 1.*** Start from scratch uses one global block catalogue, shared with the templates. The catalogue itself is still built in Phase 1C, because template editing reads from it — what is deferred is the empty-canvas entry point. |
| FR-06 | All fixed stages expose identical shared core block identifiers and actions. |
| FR-07 | Stage compatibility may add quote-specific triggers and rules, but never removes or renames the shared core. |
| FR-08 | Protected quote progression stays outside editable actions. |
| FR-09 | Every Automation has All Companies or selected-company scope. |
| FR-10 | Scope is visible in the builder, map and list, comparison, publish and history. |
| FR-11 | Saving a draft never alters the active published version. |
| FR-12 | A test runs on a safe snapshot without changing live CRM data. |
| FR-13 | Publish is permitted without a current test unless validation finds a blocking conflict. |
| FR-14 | Publishing replaces the live version in one step, and records the version it replaced. |
| FR-15 | Runtime executes only active, published, stage-matched and company-matched Automations. |
| FR-16 | Multi-quote aggregation uses the documented precedence and the relevant-quote test in §A6. |
| FR-17 | Won is never downgraded by remaining quotes; all-cancelled becomes Archived, not Lost. |
| FR-18 | Sent engagement uses the documented eligible-quote denominator. |
| FR-19 | The required-work gate lists all unfinished requirements and resumes the original operation. |
| FR-20 | Requested-file-received binds to a real named file request. |
| FR-21 | Automation runtime is idempotent and fully audited. |
| FR-22 | Created notes, meetings, next actions and file requests are visible on the relevant Deal surfaces. |
| FR-23 | Zero-Automation pipelines and stages remain accessible and offer Create Automation. |
| FR-24 | *Conditional on decision D1.* If backward movement is approved, the resolver recalculates when the quote supplying the highest state stops qualifying, and writes the reason to history. Until D1 is answered this is not committed scope. |
| FR-25 | Forecast, weighted probability and forecast-specific filters and sorts stay outside Phase 1. |
| FR-26 | A Lead is a first-class object with fixed states — open, archived, discarded, converted — and never holds a quote. |
| FR-27 | Lead creation runs duplicate matching and lets the user attach to an existing customer rather than creating one. |
| FR-28 | Conversion creates exactly one Deal, in Qualified, and marks the Lead converted and read-only. |
| FR-29 | Signed Deal value is accepted net totals plus change-order differences, counting one accepted quote per alternative group and adding across groups. |
| FR-30 | Accepting a quote system-rejects its alternative-group siblings, which remain in the audit trail; a resolved quote cannot leave its group. |
| FR-31 | Only one change order may be in flight per quote. A signed change order becomes the new signed-off baseline; a rejected one stops contributing to signed totals. |
| FR-32 | A change order never alters the Deal stage, never reopens a Won Deal, and is excluded from the sent-engagement denominator. |
| FR-33 | The block list a stage offers is decided in two different ways, and they must not be confused. For a **protected quote stage**: shared core, plus only the quote events and quote-state rules that can genuinely occur at that stage. For a **Phase 2 custom stage**: the **complete shared core, identical wherever it sits**. Placement changes only the quote context shown, the flow summary, the valid named targets and the next protected event — it must never add, remove or hide a core block, and lifecycle placement must never be used as a permission key. |
| FR-34 | A quote carrying a signed change order cannot be unlinked from its Deal. If the accepted revision changes, its change orders follow it. |
| FR-35 | The account boundary is resolved and asserted at event ingest, before company and stage matching, because queued runs have no user session. |
| FR-36 | Company-level visibility is delivered as a new scoping tier for Leads, Deals and Automations. |
| FR-37 | The activity timeline is extended to carry an organisation column, Deal and Lead links, and the new entry types the shared actions create. Automation results must be readable from the record they belong to. |
| FR-38 | Time-driven and date-driven recipes require a production due-queue: persistence, worker, 1–90 calendar-day Wait and timezone handling, version pinning, cancellation when a record leaves the stage, idempotency, retry and audit. Event-driven and state-driven recipes must not be blocked behind it. |
| FR-39 | Where a Zoho CRM link is active, Deal behaviour follows the coexistence contract in §C3. |
| FR-40 | The workflow definition schema and its versioned persistence are delivered in Phase 1B, because both authoring surfaces depend on them. Prototype behaviour backed by browser storage does not satisfy this. |
| FR-41 | Phase 1A may derive and display lifecycle state, value and attention items. Phase 1A must not create notes, tasks, file requests or outbound notifications without an explicit user action. |
| FR-42 | Every route into a quote — a list row, a quote ID in the options popover, an option in the linked-deal panel, a newly created option, or a related quote on a Deal — opens the same dedicated quote workspace with that record loaded. No route may fall back to the earlier CRM-style quote summary. |
| FR-43 | Opening a quote replaces the global CRM sidebar and top bar with navigation belonging to the quote: Summary, Editor, Price Adjustments, Tax Rates, View Proposal, View Changes, Costs and Billing, Importer, and Notes and Documents. |
| FR-44 | The quote workspace header identifies the quote, its proposal or revision name, the issuing company and the net total. The summary carries customer, project, assignee, label, quote status, dates, margins and line items. The issuing company is shown whether or not the list displayed it. |
| FR-45 | The Quotes list company filter offers All Companies and only those companies the signed-in user is permitted to open. Company access is a permission boundary: an unpermitted company's quotes are unreachable by filter, search, grouping or direct URL. |
| FR-46 | Under All Companies the list shows an owning company column carrying a readable short name and exposing the full name. Selecting a single company hides that column. Status counts, search results, pagination totals and grouped results all follow the selected scope. |
| FR-47 | Quotes with no owning company are resolved during migration and assigned deliberately. They must never default to the company of whoever is signed in. |
| FR-48 | Group by Deal groups related quotes for display only and alters no quote record. Group headings and table column spans stay correct whether the owning company column is visible or hidden. |
| FR-49 | A linked quote shows its deal name, the deal's derived stage, its position as Option N of M, a View Deal action, and a menu covering every option on that deal. An unlinked quote shows a Link options action in the same place, never an invented deal. |
| FR-50 | Link offers two explicit routes: attach to an existing deal, or attach to another quote so the two share a deal grouping. The dialogue states what linking changes before it is confirmed. Linking never alters owning company, customer or an accepted outcome. |
| FR-51 | A quote and its deal must share an owning company. A cross-company link requires an explicit permission held by that user plus a confirmation they see, and is otherwise refused. |
| FR-52 | A quote already linked to a different deal requires an explicit Switch Deal, never silent reassignment. Switching a quote away from a Won deal must protect the terminal outcome and its audit history. |
| FR-53 | Link, switch and unlink each write an audit event recording the quote, both deals where applicable, the actor and the time. |
| FR-54 | Add option opens a dialogue offering a new quote option or a compatible existing quote, and creates nothing until confirmed. A new option inherits the deal's customer, project, owning company and deal reference, carries the name the user supplies, updates the option count and opens in the quote workspace. |
| FR-55 | The linked-deal panel lists every option with its option number, quote ID, current marker, accepted marker, value, quote status and an unlink control, and offers Create Quote, Link Quote, Compare, Switch Deal and Unlink. The panel manages the relationship; the quote and the deal remain the records of truth. |
| FR-56 | Quote and deal navigate in both directions: View Deal opens the linked deal, and a related quote on a Deal opens that quote's workspace. Neither direction may route to an unrelated pipeline or to the retired standalone quote page. |
| FR-57 | The quote workspace is addressable in its own right. Opening a quote changes the browser address to that quote so it can be linked, bookmarked and reopened directly, and the workspace is served as its own page rather than a view nested inside the CRM shell. |


---

## §B3 · Acceptance criteria

> **Why these carry prefixes**
>
> Each criterion has a fixed identifier that never moves. Positional numbering breaks the moment a criterion is inserted, and the QA workbook traces every test back to these IDs.

### Automation builder

**Automation builder**

| ID | Criterion |
|---|---|
| AC-BLD-01 | A user can open every pipeline shown in Deals from the Automation pipeline chooser. |
| AC-BLD-02 | A pipeline with zero Automations opens to an empty state and Create Automation. |
| AC-BLD-03 | The user first chooses a fixed stage, then one of the twelve templates for that stage. No blank-canvas route is offered. *(The template-or-scratch choice is deferred with FR-01.)* |
| AC-BLD-04 | Company scope is required and defaults to All Companies. |
| AC-BLD-05 | All seven stages show the same shared core block identifiers and actions. |
| AC-BLD-06 | Only genuinely compatible quote-specific triggers and rules are added per stage. |
| AC-BLD-07 | A customer cannot add a generic action that writes a protected stage. |
| AC-BLD-08 | Saving a draft leaves the live Automation running unchanged. |
| AC-BLD-09 | A test creates no live CRM data, and the timeline supports Play, Step, Reset and Speed. |
| AC-BLD-10 | Publish remains available when a test is missing or outdated, provided validation is clean. |
| AC-BLD-11 | Before-and-after shows actual changed outcomes and suppresses duplicate no-change views. |
| AC-BLD-12 | Runtime ignores drafts, test drafts, inactive and out-of-scope Automations. |


### Resolver and Deal

**Resolver and Deal**

| ID | Criterion |
|---|---|
| AC-DEAL-01 | The multi-quote resolver follows the declared precedence and writes its audit entry. *Backward recalculation is **conditional on decision D1**, matching FR-24; until D1 is answered it is not part of this criterion.* |
| AC-DEAL-02 | All-cancelled becomes Archived; expired remains derived; neither is a stage. |
| AC-DEAL-03 | The sent Deal card shows the correct viewed-of-sent denominator. |
| AC-DEAL-04 | A sample quote, a template quote and an archived quote never derive a Deal stage. |
| AC-DEAL-05 | A family whose latest revision is not the active one derives no stage from that revision. |
| AC-DEAL-06 | A post-Won change order updates Deal value without changing the stage. |
| AC-DEAL-07 | Accepting one quote in an alternative group system-rejects its siblings and they remain visible in audit. |
| AC-DEAL-08 | Separate groups and independent quotes sum; quotes inside one group do not. |
| AC-DEAL-09 | A second change order cannot be raised while one is in flight on the same quote. |
| AC-DEAL-10 | A signed change order changes the signed value and leaves the Deal stage untouched. |


### Lead

**Lead**

| ID | Criterion |
|---|---|
| AC-LEAD-01 | Creating a Lead creates or links exactly one customer, and duplicate candidates are always offered. |
| AC-LEAD-02 | Converting a Lead creates exactly one Deal, in Qualified. |
| AC-LEAD-03 | A converted Lead is read-only and remains in history. |
| AC-LEAD-04 | Discarding a Lead requires a reason. |
| AC-LEAD-05 | A quote cannot be attached to a Lead by any route. |


### Quote & Sales

**Quote & Sales**

| ID | Criterion |
|---|---|
| AC-QS-01 | Each of the five entry points — list row, quote ID in the options popover, option in the linked-deal panel, newly created option, related quote on a Deal — opens the dedicated quote workspace showing the record that was clicked. |
| AC-QS-02 | Inside the quote workspace the global CRM sidebar and top bar are absent and the quote navigation is present. |
| AC-QS-03 | Every item in the quote navigation opens, and each returns to Summary. |
| AC-QS-04 | With All Companies selected, every row identifies its issuing company by a readable short name, and the full name is obtainable without opening the quote. |
| AC-QS-05 | Selecting one company hides the owning company column, and the status counts, search results, pagination totals and groups all update to that company alone. |
| AC-QS-06 | Group by Deal keeps headings and column spans aligned with the owning company column both shown and hidden, and leaves every quote record unchanged. |
| AC-QS-07 | A quote with no owning company is flagged for migration and is never displayed as belonging to the signed-in user's company. |
| AC-QS-08 | Linking an unlinked quote to an existing deal states the effect first, and afterwards the owning company, the customer and any accepted outcome are unchanged. |
| AC-QS-09 | Linking one quote to another produces a single shared deal grouping and creates no duplicate quote. |
| AC-QS-10 | A link between a quote and a deal owned by different companies is refused, or is completed only after an explicit permission check and a confirmation the user sees. |
| AC-QS-11 | Add option creates nothing before confirmation. On confirmation the new option carries the supplied name, inherits customer, project, owning company and deal, increments the option count and opens in the quote workspace. |
| AC-QS-12 | Switch Deal updates the option count on both deals and writes an audit event; an attempt to switch a quote away from a Won deal is refused or explicitly protected. |
| AC-QS-13 | After Unlink the quote and the deal both remain valid independent records, and the deal no longer counts the removed option. |
| AC-QS-14 | A quote to deal to quote round trip returns to the record it started from, and no step lands on an unrelated pipeline or the retired standalone quote page. |
| AC-QS-15 | Opening a quote changes the browser address to that quote. Pasting that address into a new browser session opens the same quote in the workspace, subject to the same company permission as any other route. |


### What happens when one runs

**What happens when one runs**

| ID | Criterion |
|---|---|
| AC-RUN-01 | A requested-file-received trigger cannot be saved without a valid named request. |
| AC-RUN-02 | The required-work dialog lists all blockers, keeps Continue disabled and resumes the exact original operation. |
| AC-RUN-03 | An Automation-created meeting or follow-up appears on the Deal card and in activity, as well as history. |
| AC-RUN-04 | Replaying the same event creates no duplicate notes, meetings, next actions or file requests. |
| AC-RUN-05 | An event carrying another account's identifiers is rejected at ingest. |
| AC-RUN-06 | An Automation never executes for a Deal whose owning company is outside the published scope. |
| AC-RUN-07 | No forecast, weighted probability or forecast-specific filter or sort ships in Phase 1. |


> **Automated coverage required**
>
> **AC-DEAL-01** to **AC-DEAL-08** and **AC-RUN-02** to **AC-RUN-04** must be covered by automated tests rather than manual checks. The precedence ladder, the relevant-quote test, backward recalculation, alternative-group resolution, change-order arithmetic, idempotency and the account boundary are the least safe logic in the release to leave to a manual pass. **AC-QS-10** joins them: a cross-company link is an isolation defect, and isolation is not something a manual pass proves.

---

## §C1 · Conflict register

*The sources disagree, or run ahead of themselves, in 19 places. Each needs a decision recorded, not a silent merge.*

Two models exist in the source material. The **consolidated model** has seven stages, all derived by the resolver. An **earlier approved specification** has five stages with some manual movement. The prototype has since moved to the seven-stage model, plus one custom stage, so the five-stage version now survives only in that document. The two are not compatible.

Rows C1 to C10 are disagreements *between documents*. Rows C11 to C16 are cases where the **prototype is ahead of every document** — capability exists that nothing specifies. Both kinds need a decision; the second kind is more urgent, because the work is already paid for and will otherwise ship undocumented.

**Where the sources disagree**

| # | Topic | Consolidated model | Earlier spec & prototype | Resolution |
|---|---|---|---|---|
| C1 | Deal stages | Seven: Qualified, In Progress, In Review, Passed Review, Sent, Won, Lost | Five in the earlier document: Qualified, Quoting, Sent, Won, Lost. The prototype no longer matches it. | Consolidated wins; prototype changes |
| C2 | Stage movement | Entirely derived | User moves Qualified → Quoting | Consolidated wins; removes a user action |
| C3 | First quote created | Derives In Progress | "Creating a quote early does not move the Deal" | Consolidated wins |
| C4 | Quote in review / passed review | Derive Deal stages | "No automatic Deal stage change" | Consolidated wins |
| C5 | Backward movement | Explicit recalculation; Deal may step back | "Never automatically move a Deal backwards" | [Open · D1] |
| C6 | Quote expires | Recalculate; may drop to In Progress | Keep in Sent and prompt a follow-up | Follows C5 |
| C7 | All quotes cancelled | Deal becomes Archived automatically | Never auto-Lost; Sales confirms with a reason | [Open · D2] |
| C8 | Multi-quote model | Flat precedence only | Alternative groups: exclusive within, additive across | Groups are Phase 1; reinstated in §A7 |
| C9 | Lead and customer | Not specified at all | Lead creation creates or links a customer, flagged prospect | Earlier spec is the only source; adopt with a duplicate-control requirement |
| C10 | Lead states | Not specified | Open, Archived, Discarded, Converted — fixed, not customer-defined | Adopt as specified |
| C11 | Custom stages in Phase 1 | "There are no Custom Stages in Phase 1" | A **Site Ready** custom stage is already built into the Sales Pipeline (Fig. 6) | [Open · D8] |
| C12 | Forecast | Deferred to Phase 2 | **Commit Forecast** and **Stage-weighted (Legacy)** views already exist (Fig. 6) | [Open · D8] |
| C13 | Margin | Not mentioned in any document | Margin value shown on every Deal card and column total (Fig. 6) | Adopt and specify how it derives |
| C14 | Automation hierarchy | Three levels; no concept of a flow | Four levels: pipeline → Automation → **flows** → steps (Fig. 7) | Adopt four levels; restate §A11 per level |
| C15 | Lead owning company | Not specified | Every lead carries an owning company (Fig. 4) | Adopt; extend company scoping to leads |
| C16 | Lead labels | Labels described only on Deals | Leads use labels for temperature — Hot, Warm, Cold — and may hold several | Adopt; no separate temperature field |
| C17 | Naming and phasing | "Scope group" used for one undifferentiated idea | Three distinct things: **alternative group** and **change order** in Phase 1, **Variation** in Phase 2 | Adopt the built vocabulary and the phase split (§A7) |
| C18 | How Won happens | Purely derived: "any accepted quote → Won" | Explicit **Accept & Mark Won** with a winner selection, plus **Accept & Change Winner** afterwards | [Open · D1] |
| C19 | Deal value formula | "Derives from the primary quote in each group" | **Accepted net totals + change-order differences** | Adopt the built formula |


> **🛑 The most consequential omission**
>
> The consolidated handoff mentions Leads exactly twice — once to say expected close date is *not* a Lead field, and once as the filename of a diagram. It contains no Lead requirements, no Lead states and no Lead blocks, yet the navigation, the prototype and the runtime all have Leads, and the whole product story starts with one. The Lead specification in §A5 is recovered from the earlier document because it is the only place it exists.

---

## §C2 · What is actually built today

*A line-by-line comparison of what the written specifications commit to and what the prototype actually contains. The gap runs almost entirely one way.*

Every row carries a **status tier**, because "the prototype has it" covers four very different situations. Conflating them is how a demo becomes a delivery estimate.

**Status tiers used below**

| Tier | Means |
|---|---|
| **Production** | Backed by code running in the live Portal today |
| **Prototype** | Works in the browser prototype, including its local simulation. Not production persistence. |
| **Placeholder** | Visible in the interface but marked disabled or future in code |
| **Spec only** | Written down; nothing built anywhere |


**Parity matrix**

| Area | What the documents say | What actually exists | Status |
|---|---|---|---|
| **Quote lifecycle** | Seven quote states, expiry derived | The live product's own quote states and expiry handling | Production |
| **Approval thresholds** | High-value approval template | Configurable review-over-value and review-over-discount fields | Production |
| **Scheduled jobs** | Not named as a dependency | Thirteen crons; quote expiry and request overdue run hourly and write a notified flag | Production |
| **Notification delivery** | Send internal notification action | Notification triggers, templates and a queue cron | Production |
| **Customer merge** | Duplicate control at Lead creation | A merge tool and merge log | Production |
| **Deal stages** | Seven protected stages | Seven, plus a `Site Ready` custom stage on the board | Prototype |
| **Lead inbox** | Not specified in the master handoff | Full table with owning company, temperature labels, source, overdue next activity | Prototype |
| **Deal page** | Deal fields listed | Six value figures including four margins, source, needs-your-attention, history | Prototype |
| **Alternatives** | "Scope group", one idea | `alternatives group` at two levels, regrouping locked once resolved | Prototype |
| **Change orders** | Unspecified until this version | Raise, one in flight, signed baseline, rejected stops contributing | Prototype |
| **Wait & date triggers** | In the shared core catalogue | **Simulated in the browser** — pending runs held in local storage, scanned by a one-minute timer | Prototype |
| **Draft / test / publish** | Atomic version replacement (FR-14) | The interactions work, but state lives in local storage | Prototype |
| **Preview** | Timeline with Play, Step, Reset, Speed | `Automation Preview` and "no CRM data was changed"; no transport controls found | Prototype |
| **Required-work gate** | FR-15, in prose | `Automation checkpoint · required before…` | Prototype |
| **Custom-stage trigger** | Phase 2 direction | `A Deal moves into the selected customer-defined Stage` | Prototype |
| **Fully custom pipeline** | Phase 3 direction | `Automation setup for the Fully Custom…` | Prototype |
| **Forecast** | Deferred to Phase 2 | `Commit Forecast` and `Stage-weighted (Legacy)` views | Prototype |
| **Margin** | Not mentioned anywhere | Four figures on every Deal | Prototype |
| **Nested branches** | Yes / No branches | `Else If` is present in the interface but **disabled in code** | Placeholder |
| **Wait until event** | Safe waits in the rule set | Present, marked future | Placeholder |
| **Loops** | Not specified | `While loop` present, marked future | Placeholder |
| **Automation versioning** | Atomic snapshot replacement, rollback | **Nothing.** The `Add a new version` control found earlier is a *file duplicate policy* for Deal files, not automation versioning | Spec only |
| **Company-level visibility** | FR-36, on the runtime critical path | Company filters exist in the prototype views; no permission tier in the live product | Spec only |
| **Tenant assertion at ingest** | FR-35 | Nothing — live isolation is session-derived | Spec only |
| **Activity tenant column** | FR-37 | Nothing — the live table has no organisation column | Spec only |
| **Zoho coexistence** | FR-39, added in this version | The integration ships; the coexistence contract does not exist | Spec only |
| **Won / Lost authority** | Derived and absolute | Manual `Accept & Mark Won`, `Accept & Change Winner`, and a `Lost` button | Contradiction |


> **🛑 The distinction that matters for estimating**
>
> Fifteen rows sit at **Prototype**. That is real, demonstrable design work and it de-risks the product enormously — but a browser prototype holding state in local storage is not a shipped capability. Draft, test and publish *behave* correctly today without any of the server-side persistence FR-14 requires, and the wait steps *fire* today because a one-minute timer in the page scans a local list.
 Reading those rows as "already built" would understate the remaining work by the entire backend. Reading them as "not started" would waste the design that exists. The tier column is there so neither happens.

### What the production runtime fires

The prototype simulates far more than the production runtime can execute. These are the events that a real server-side workflow could be built on today.

**Triggers the runtime actually fires today**

| Trigger | Object | Limit worth knowing |
|---|---|---|
| New Lead is created | Lead | Form, import and manual creation are one shared event |
| Open Lead has no next activity | Lead | A periodic **scan**, not an event — so it needs the scheduler despite looking like state |
| Lead is converted to a Deal | Lead + Deal | Always-on system rule, not an editable template |
| Deal enters a selected stage | Deal | Scoped to one pipeline |
| Deal reaches Won | Deal | Runs on first match; does not itself mark the Deal Won |
| Quote is sent | Quote + Deal | First send of each revision, not a saved draft |
| Quote is accepted | Quote + Deal | Quote must belong to a Deal; duplicate draft invoices prevented |


Two further events exist but cannot be built against: the CRM emits a Deal-created event with no handler, and recognises an invoice-created event that no workflow starts from. Neither should be described to a customer as available.

> **Scheduling: reduced risk, not solved**
>
> The live platform already runs **thirteen scheduled jobs** — every minute, five minutes, hour and midnight, plus one dedicated to the notification queue. Quote expiry and request overdue are handled by the **hourly** job, which scans with SQL, sends a notification and writes a "notified" flag back. That is the fire-once-with-persistent-state pattern these recipes need, already proven.
 So this is not a green field. But a production Automation due-queue is more than one table and a worker. It must also handle 1–90 calendar-day waits, timezones and daylight saving; version pinning so a paused or republished Automation resumes against the right snapshot; cancelling or revalidating a pending run when the record leaves the stage; idempotency and concurrency locking; retry and failure monitoring; and permissions and audit history.
 **Existing cron infrastructure materially reduces scheduler risk, but a production Automation due-queue still requires a technical spike and runtime design.**

> **🛑 What this matrix means for the roadmap**
>
> The phase boundaries in §A3 do not exist in the built artifact. Phase 2 capability (custom stages, forecast) and Phase 3 capability (fully custom pipeline setup) are both present and reachable. A release plan that claims Phase 1 excludes them must therefore **hide them behind a flag**, and prototype screens shown to stakeholders should be marked as future concept so nobody reads them as committed scope.

---

## §C3 · Existing integrations — coexistence

*We already sell a CRM sync. No source document in this package mentions it.*

WeQuote has shipped a substantial two-way **Zoho CRM** integration for years. It maps every quote to a Zoho *deal*, and it lets each customer configure how our quote statuses translate into their Zoho pipeline stages — in both directions. It is actively maintained and customers depend on it.

For those customers, our new Deal is a *second* deal, with a second set of stages. Two systems will hold a position for the same job.

**Questions this raises**

| Question | Proposed answer |
|---|---|
| Which system owns the stage? | Ours is derived and read-only with respect to Zoho. We never write our derived stage into their pipeline. |
| How does the object mapping work? | Either the existing integration gains a Deal object type, or our Deal maps onto the existing quote-to-Zoho-deal link. |
| Does backward recalculation propagate? | No. The existing link record assumes forward-only progression, so pushing a backward correction risks overwriting customer-owned Zoho data. Log the divergence instead. |
| What does the customer see? | Needs a design answer for the case where both a WeQuote Deal and a Zoho deal exist for one quote. |


> **🛑 Recommended gate**
>
> Until this is agreed, do not switch Deals on for organisations with an active Zoho CRM link. Shipping into that overlap without a decision produces support tickets we cannot answer.

Two smaller consequences. Customer records are already pulled inbound from Zoho, Magento and QuickBooks; those imported customers have no owning company, so a default is needed. And the accepted-quote-to-draft-invoice template must set the invoice to draft explicitly, because the product's default state for a new invoice is not draft.

---
