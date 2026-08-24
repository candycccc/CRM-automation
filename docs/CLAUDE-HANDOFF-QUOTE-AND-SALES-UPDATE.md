# Claude handoff — Quote & Sales → Quotes update

**Updated:** 24 August 2026  
**Prototype source of truth:** `../index.html` (Quotes list) and `../quote-detail.html` (dedicated Quote workspace)  
**Main implementation:** `../assets/js/quote-demo.js` and `../assets/css/quote-demo.css`

## Important source-of-truth rule

`quote-workspace.html` is **deprecated and must not be used, linked, reviewed, or treated as a product screen**. It was an earlier standalone experiment and is not part of the agreed prototype.

The live Quote flow now deliberately uses two pages:

- `index.html#quotes` — global **Quote & Sales → Quotes** list and CRM context;
- `quote-detail.html?quote=Q-…` — dedicated Quote workspace with Quote-specific navigation.

Both pages use the same `quote-demo.js` data and interaction logic. This split is intentional: it prevents the global CRM sidebar from reappearing around a Quote that is being edited.

## Why this update exists

The Quote experience is no longer a small CRM-style detail page. A user starts from **Quote & Sales → Quotes**, manages which Deal and Quote options belong together, and then enters a dedicated Quote workspace. The workspace has its own navigation because the user is now editing one Quote, not browsing the CRM.

This update must be reflected in:

1. the Phase 1 PRD;
2. the A14 delivery checklist;
3. the QA test plan and traceability matrix; and
4. any Claude-generated screenshots or product-flow explanations.

## Confirmed user journey

```text
Quote & Sales → Quotes
        ↓
Filter by company / status / owner / label / search
        ↓
Optional: group Quotes by Deal
        ↓
Open a Quote row or a Quote option
        ↓
Dedicated `quote-detail.html` workspace
        ├── Quote Summary
        ├── Quote Editor
        ├── Price Adjustments
        ├── Tax Rates
        ├── View Proposal
        ├── View Changes
        ├── Costs and Billing
        ├── Importer
        └── Notes and Documents
        ↓
Manage linked Deal and alternative Quote options
        ├── View Deal
        ├── Add option
        ├── Link existing Quote
        ├── Switch Deal
        ├── Unlink
        └── Compare options
```

## 1. Quotes list

### Company scope

- The company filter offers **All Companies** and the individual companies the user is permitted to access.
- Company access is a permission boundary, not merely a visual filter.
- When **All Companies** is selected, the table shows an **Owning Company / Quote issuer** column so every Quote can be identified without opening it.
- The row shows a readable short company name and exposes the full company name.
- When one company is selected, the Company column is hidden because it would repeat the same value in every row.
- Status counts, search results, pagination totals and grouped results must all use the selected company scope.
- Existing Quotes with no owning company must be resolved during migration; they must not silently appear as belonging to the signed-in user's company.

### Quote and Deal grouping

- A Quote can be unlinked or linked to one CRM Deal.
- A Deal can contain multiple related Quote options.
- **Group by Deal** groups related Quotes without changing the underlying Quote records.
- Group headers and table column spans must remain correct whether the Company column is visible or hidden.
- The Options control shows how many Quotes are linked to the Deal and opens the option summary.

### Opening a Quote

The following entry points must all open the same dedicated Quote workspace:

- clicking a Quote row;
- clicking a Quote ID inside the option popover;
- opening an option from the linked-Deal panel;
- opening a newly created Quote option; and
- returning from a Deal to one of its Quotes.

No entry point may fall back to the old CRM-style Quote summary screen. The browser URL must change to `quote-detail.html?quote=<Quote ID>`.

## 2. Dedicated Quote workspace

When a Quote opens:

- it opens as the separate `quote-detail.html` workspace rather than an inner CRM view;
- the global CRM sidebar and ordinary CRM top bar are replaced;
- the Quote-specific navigation is displayed;
- the header identifies the Quote, proposal/revision name, issuing company and net total;
- the Summary shows customer, project, assignee, label, Quote status, dates, margins and line items;
- the issuing company is visible because a user may have entered from **All Companies**;
- a back action returns to the Quotes list without losing the selected list context where practical.

The linked-Deal context at the top of the Quote shows:

- the linked Deal name;
- the Deal's current derived lifecycle stage;
- `Option N of M`;
- a **View Deal** action; and
- a management menu for all Quote options on the Deal.

If the Quote is not linked, the same area shows **Link options** rather than an invented Deal.

## 3. Link Quote flow

Selecting **Link** opens a dialogue with two explicit routes:

1. **Existing Deal** — link the Quote to a compatible CRM Deal.
2. **Another Quote** — select a compatible Quote and let WeQuote create or use the shared Deal grouping.

The dialogue must explain what linking changes. Linking must not silently change company ownership, customer or accepted outcomes.

Compatibility rules:

- Quote and Deal must belong to the same owning company unless the user has an explicit cross-company permission and confirms the exception.
- A Quote already linked to a different Deal requires **Switch Deal**, not silent reassignment.
- A Won Deal cannot be switched casually; the terminal outcome and audit history must be protected.
- Link, switch and unlink actions write an audit event.

## 4. Add option flow

Selecting **Add option** opens a dialogue. It must never create a Quote immediately with no confirmation.

The user chooses one of two routes:

- **Create a new Quote option**; or
- **Link an existing compatible Quote**.

A newly created option inherits the source Deal's:

- customer;
- project, when present;
- owning company / Quote issuer; and
- linked Deal ID.

The user provides the option/revision name before creation. After creation, the option count updates and the new Quote opens in the dedicated Quote workspace.

## 5. Manage linked Deal and Quote options

From a Quote, the user can open a linked-Deal panel showing every option with:

- option number;
- Quote ID;
- current option marker;
- accepted/winner marker;
- value;
- Quote status; and
- unlink control.

Available actions are **Create Quote**, **Link Quote**, **Compare**, **Switch Deal** and **Unlink**. The Deal and each Quote remain independent records; the panel is a relationship manager, not a replacement data model.

## 6. Multiple-Quote lifecycle rules

- One Deal may contain several Quote options.
- Only one alternative Quote in the same option group can be accepted.
- Accepting one option makes the Deal Won and resolves sibling alternatives according to the agreed resolver rule (for example, sent alternatives become Rejected and unsent alternatives become Cancelled).
- The action must be idempotent; replaying acceptance cannot create duplicate invoices, activity entries or stage transitions.
- Sent is a Deal-level derived stage when at least one relevant viable Quote is Sent and no higher-priority outcome applies.
- The Sent Deal card shows Quote engagement such as `2/3 sent Quotes viewed`; customer viewing does not create another pipeline stage.
- Accepted or Complete derives Won.
- No viable Quote remaining may derive Lost, subject to the final backwards-movement ruling.
- All related Quotes Cancelled derives Archived status, not a new pipeline stage.
- Expired is derived from a Sent Quote passing its expiry date. It is not a manually selected protected stage.

## 7. Quote ↔ Deal navigation

The relationship is visible and navigable in both directions:

- Quote workspace → **View Deal** opens the correct CRM Deal.
- Deal → related Quote opens the correct dedicated Quote workspace.
- The Quote workspace displays the linked Deal and option position.
- The Deal displays all related Quotes, their statuses and engagement.
- Back navigation must not route to an unrelated pipeline or the deprecated Quote page.

## 8. A14 delivery-checklist review

The existing A14 checklist is strong on the lifecycle resolver, data migration, account isolation, company permissions and the Phase 1B/1C Automation engine. It does **not yet prove that the new Quote & Sales journey is safe to ship**.

Add the following rows to **Phase 1A — CRM foundation**. These are product delivery gates, not optional design polish.

| ID | Area | Delivery item | Owner | Gate |
|---|---|---|---|---|
| A14-QS-01 | Build | Every Quote entry point opens the same dedicated Quote workspace; the global CRM navigation is replaced by Quote-specific navigation. | Engineering | Blocking |
| A14-QS-02 | Build | The Quote workspace displays Quote identity, issuing company, linked Deal, Deal stage and option position, with working navigation back to Quotes and to the Deal. | Engineering + Design | Blocking |
| A14-QS-03 | Build | All Companies shows an Owning Company column; selecting one company hides the redundant column. Counts, search, grouping and rows respect both company permission and filter. | Engineering | Blocking |
| A14-QS-04 | Build | Link, Add option, Switch Deal and Unlink use explicit dialogues, preserve/inherit the required records and write audit history. | Engineering | Blocking |
| A14-QS-05 | Security | A Quote cannot be silently linked to a Deal owned by another company. Cross-company exceptions require explicit permission and confirmation. | Engineering + Security | Blocking |
| A14-QS-06 | Tests | Quote-list row, option popover, Deal bridge and newly created option all reach the same Quote workspace and correct record. | QA | Blocking |
| A14-QS-07 | Tests | Company column visibility, counts, filters, Group by Deal and empty states are proven for All Companies and each permitted company. | QA | Blocking |
| A14-QS-08 | Tests | Create/link/switch/unlink flows are proven for linked, unlinked, cross-company, Won, Cancelled and deleted Quote cases. | QA | Blocking |
| A14-QS-09 | Tests | Multiple-option acceptance resolves one winner, sibling outcomes, Deal stage, engagement counts, activity and invoice idempotency correctly. | QA | Blocking |
| A14-QS-10 | Handoff | Product copy defines Quote, option, revision, alternative group, linked Deal, issuing company, Rejected, Cancelled, Expired, Lost and Archived consistently. | Product | Track |

## 9. Minimum QA scenarios to add

1. Open the Quotes list with All Companies and confirm each row identifies its issuing company.
2. Select one company and confirm the Company column disappears while counts and rows update.
3. Group by Deal in both company-column states and confirm headings and columns remain aligned.
4. Open a Quote from every supported entry point and confirm the global sidebar is absent.
5. Use every Quote workspace navigation item and return to Summary.
6. Link an unlinked Quote to an existing Deal.
7. Link an unlinked Quote to another Quote and verify the resulting Deal grouping.
8. Attempt an incompatible cross-company link and confirm it is blocked or explicitly confirmed by an authorised user.
9. Add a new option; verify the confirmation dialogue and inherited customer, project, company and Deal.
10. Link an existing Quote as an option; verify no duplicate Quote is created.
11. Switch a Quote between Deals; verify the old and new option counts and audit events.
12. Attempt to switch a Quote away from a Won Deal and confirm the protected result.
13. Unlink a Quote and verify both the Quote and Deal remain valid independent records.
14. Accept one of several options and verify the one-winner rule, sibling outcomes and idempotency.
15. Verify `N/M sent Quotes viewed` from zero viewed through all viewed.
16. Verify Cancelled, Expired, Lost and Archived are represented according to the resolver and are not invented as manual protected stages.
17. Navigate Quote → Deal → Quote and confirm every route preserves the correct record IDs.

## 10. Prototype limitations and implementation note

This is an interaction prototype. Its browser-held demo state proves the intended UX but does not satisfy production persistence, permissions, audit logging, migration, idempotency or server-side lifecycle resolution. Claude must describe those as delivery requirements, not as already completed backend capabilities.

When updating the PRD, use clean existing design artifacts or fresh screenshots from the main `index.html` prototype. Do not use browser-comment screenshots with blue annotation frames, cropped screenshots, or images taken from `quote-workspace.html`.
