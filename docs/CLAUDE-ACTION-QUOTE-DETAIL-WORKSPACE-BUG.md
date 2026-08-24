# Claude action brief — Quote Detail is still opening inside the CRM shell

**Priority:** Blocking UX bug  
**Updated:** 24 August 2026  
**Prototype entry point:** `../index.html#quotes`  
**Do not use:** `../quote-workspace.html`

## Read this first

Do not assume this issue is fixed because `quote-detail.html`, `qw-editor-focus-mode`, or dedicated Quote navigation code exists in the repository.

The latest real user test still opens a Quote inside `index.html` with the global WeQuote/CRM sidebar and ordinary CRM top bar visible. The runtime result therefore does **not** match the intended design.

Claude must reproduce the flow by clicking a Quote from the actual Quotes list and inspect the resulting URL and DOM. Reviewing source code alone is not sufficient.

## Current incorrect result

User journey:

```text
Open index.html
  → Quote & Sales
  → Quotes
  → click Q-24589 (or another Quote row)
```

What currently happens:

- the URL remains on `index.html`;
- the global WeQuote sidebar remains visible;
- the global top bar and CRM breadcrumb remain visible;
- Quote Detail is rendered as another CRM sub-page;
- the page shows the old large `Quote Summary` plus `Quote Details` panel;
- the Quote-specific workspace navigation is absent.

This result is wrong even if the Quote content itself is correct.

## Required result

Opening any Quote must enter a dedicated Quote workspace:

```text
Quotes list
  → open Quote
  → dedicated Quote workspace
      ├── Quote Summary
      ├── Quote Editor
      ├── Price Adjustments
      ├── Tax Rates
      ├── View Proposal
      ├── View Changes
      ├── Costs and Billing
      ├── Importer
      └── Notes and Documents
```

The workspace must replace the global CRM shell, not sit inside it.

## Non-negotiable navigation contract

Every supported Quote entry point must use one canonical routing function and reach the same workspace and Quote ID:

1. click a Quote table row;
2. click a Quote ID in the Options popover;
3. click an option in the linked-Deal panel;
4. open a newly created Quote option;
5. open a Quote from a Deal's related-Quotes area;
6. return from proposal/customer preview to Quote Detail;
7. open a copied URL directly.

If a separate HTML page is used, use an actual navigable URL such as:

```text
quote-detail.html?quote=Q-24589
```

Do not rely only on a table-row inline `onclick` plus CSS class toggling. Prefer a real link or a single route function that explicitly changes `window.location` and works under both `file://` and localhost.

## Dedicated workspace shell requirements

Once a Quote is open:

- the global `.sidebar` must not be present in the Quote workspace DOM;
- the ordinary CRM `.topbar` must not be present;
- the workspace must show the Quote-specific left navigation;
- the header must show Quote ID, revision/proposal name, issuing company and net total;
- the linked Deal and `Option N of M` must be visible;
- **View Deal** must open the correct Deal;
- **Back to Quotes** must return to `index.html#quotes`;
- refreshing or directly opening the Quote URL must restore the same Quote;
- browser back/forward must not reopen the deprecated CRM-style Quote screen.

Do not solve this by merely hiding the global sidebar with CSS while leaving two competing shells active. The dedicated Quote page should own its full layout.

## Quote-specific navigation

The left navigation must contain:

| Item | Expected content |
|---|---|
| Quote Summary | Quote identity, dates, status, margins, line items and Quote details |
| Quote Editor | Products, labour, subscriptions and summary |
| Price Adjustments | Quote-level discount and adjustment settings |
| Tax Rates | Quote-level tax configuration |
| View Proposal | Internal proposal workspace and customer preview entry |
| View Changes | Quote revision/change history |
| Costs and Billing | Internal cost and margin summary |
| Importer | CSV/Excel Quote-line import |
| Notes and Documents | Quote-scoped files and internal notes |

## Linked Deal and options requirements

The dedicated workspace must preserve the already agreed linked-Deal behaviour:

- show linked Deal name and derived Deal stage;
- show all Quote options and the current option;
- Add option opens a confirmation dialogue;
- the user chooses **Create a new Quote option** or **Link an existing Quote**;
- Link Quote supports **Existing Deal** and **Another Quote**;
- support Compare, Switch Deal and Unlink;
- show issuing company because the user may have entered from All Companies;
- do not silently change the customer, project, company or terminal outcome.

## Files to audit

Claude must audit the actual runtime and all competing handlers in:

- `../index.html`
- `../quote-detail.html`
- `../assets/js/quote-demo.js`
- `../assets/js/crm.js`
- `../assets/js/compatibility-pre.js`
- `../assets/js/compatibility-post.js`
- `../assets/css/quote-demo.css`
- `../assets/css/crm.css`

Search for every definition, reassignment and call of:

```text
openQuoteDemoDetail
openQuoteFromCrmContext
openQuoteWorkspace
openDetail
renderDetail
showView('quotes')
qw-editor-focus-mode
quoteWorkspace
```

Check script load order, duplicate globals, compatibility layers, stale inline handlers and cache-busting query versions. Remove or redirect any older Quote-detail renderer rather than allowing two versions to coexist.

## Deprecated file

`quote-workspace.html` is an abandoned experiment. It must not be used as the target, source of truth, fallback page or implementation reference.

Claude may repair or replace `quote-detail.html`, but the final live flow must begin at `index.html#quotes` and reach the dedicated workspace through a real working interaction.

## Required verification

Test both ways of opening the prototype:

1. direct file access: `file:///.../CRM-automation/index.html#quotes`;
2. local server: `python3 -m http.server`.

For at least `Q-24589` and `Q-11990`, record the following evidence after clicking from the Quotes list:

| Check | Pass condition |
|---|---|
| URL | Points to the canonical dedicated Quote route and contains the correct Quote ID |
| Global sidebar | Absent |
| Global top bar | Absent |
| Quote navigation | Present with all nine items |
| Quote identity | Correct ID, customer, proposal, company and linked Deal |
| Back to Quotes | Returns to the Quotes list |
| View Deal | Opens the correct Deal |
| Add option | Opens the choice dialogue before creating anything |
| Refresh | Reloads the same Quote workspace |
| Console | No new error |

Do not mark the bug complete until the click test passes in the browser. A successful syntax check or the existence of dedicated-workspace markup is not acceptance evidence.

## PRD and QA impact

The PRD A14 delivery checklist and QA plan should treat this as a blocking Phase 1A journey:

> Every Quote entry point opens the same dedicated Quote workspace and correct Quote record. The global CRM navigation is replaced by Quote-specific navigation, and Quote ↔ Deal navigation works in both directions.

Related handoff details remain in `CLAUDE-HANDOFF-QUOTE-AND-SALES-UPDATE.md`, but this file is the authoritative bug brief for the routing/shell problem.
