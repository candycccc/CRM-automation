# WeQuote Platform CRM

Standalone HTML prototype for WeQuote CRM, Quote lifecycle Automation and Needs Your Attention — plus the Phase 1 requirements and QA material that go with it.

## Where things are

```
├── index.html              ← the prototype and Quotes-list entry. Open this first.
├── quote-detail.html       ← dedicated Quote workspace opened from the Quotes list
├── QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html ← direct colleague-facing Guide
├── QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html ← interactive scope map; Templates + Custom routes
├── CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md ← complete Guide rebuild brief
├── crm-note-attention-phase1.js  ← Phase 1 Note / follow-up bridge
├── docs/                   ← requirements, guides and review material
│   ├── WeQuote-CRM-Phase-1-PRD.html
│   ├── WeQuote-CRM-Phase-1-QA-Checklist.xlsx   (frozen snapshot — see below)
│   ├── quote-automation/   ← Automation reading order and source catalogue
│   ├── needs-your-attention/ ← current Phase 1 scope and review pack
│   ├── handoffs/           ← current implementation handoff
│   └── visuals/            ← colleague-facing comparisons
├── assets/
│   ├── css/                ← core styles
│   ├── js/                 ← core behaviour
│   ├── compat/             ← late-stage compatibility layers
│   └── icons/
└── README.md
```

### Product documents and handoff

| Document | Status / reviewed | What it is | Where it lives |
|---|---|---|---|
| **Quote Lifecycle Automation product direction** | **Current Automation decision authority** · 29 August 2026 | The approved authoring direction: managed Templates plus compatible Custom in all seven Quote contexts, and the current Interest/Label boundaries. | [`docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md`](docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md) |
| **Phase 1 PRD** | **Committed Phase 1 baseline, with Automation addendum** · reviewed 29 August 2026 | The wider Phase 1 requirements. Its 29 August addendum points Automation authoring questions to the current product-direction record. Self-contained: images are embedded, so it needs no assets. | [`docs/WeQuote-CRM-Phase-1-PRD.html`](docs/WeQuote-CRM-Phase-1-PRD.html) — open it directly |
| **Phase 1 QA test plan** | Live test record · linked 29 August 2026 | Test plan and 137 test cases across 13 sheets, including the per-release gate and the traceability matrix. Testers record results here. | **[Google Sheets](https://docs.google.com/spreadsheets/d/144dD3swr3wN4Sp8pcLdtUvSaI-OaLEVaTOnozMtj_N0/edit)** |
| **Quote Lifecycle Automation mind map** | **Current colleague-facing scope overview** · reviewed 29 August 2026 | White-background interactive map of the 12 ready-made Templates, Custom Automation in every Quote context, inserted Custom Stages, Standalone Pipelines and shared safeguards. | [`QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html`](QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html) |
| **Quote Lifecycle Automation Guide** | Interactive reference · reviewed 29 August 2026 · **rebuild pending** | Existing 79-candidate prototype for exploring Stages, flow parts and custom choices. It predates the newer 12-Template overview and is not the fixed-Template inventory. | [`QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html`](QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html) |
| **Claude build brief for the Guide** | **Current rebuild specification** · 29 August 2026 | Complete build instructions, verified scope calculations, product boundaries and acceptance tests for bringing the interactive Guide up to the current overview. | [`CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md`](CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md) |
| **Quote lifecycle source catalogue** | Review evidence · reviewed 29 August 2026 | Detailed recipe and combination source used to validate the Guide. Its candidate combinations are not the 12 fixed Templates. | [`docs/quote-automation/QUOTE-LIFECYCLE-FROM-SCRATCH-STAGE-CATALOGUE.md`](docs/quote-automation/QUOTE-LIFECYCLE-FROM-SCRATCH-STAGE-CATALOGUE.md) |
| **Needs Your Attention review pack** | Current review pack · 28 August 2026 | Current Phase 1 scope, cross-module create behaviour and review handoff. | [`docs/needs-your-attention/NEEDS-YOUR-ATTENTION-COMPLETE-REVIEW-PACK-2026-08-28.md`](docs/needs-your-attention/NEEDS-YOUR-ATTENTION-COMPLETE-REVIEW-PACK-2026-08-28.md) |
| **Template vs Start from scratch visual** | Scope visual · reviewed 29 August 2026 | White-background scope comparison for colleague review. | [`docs/visuals/template-vs-scratch-scope.html`](docs/visuals/template-vs-scratch-scope.html) |
| **Claude Quote & Sales handoff** | Reconciliation input · current on 29 August 2026 | The new Quotes-list, dedicated Quote workspace, linked Deal, option and multi-company behaviour that must be reconciled into the PRD and QA plan. | [`docs/CLAUDE-HANDOFF-QUOTE-AND-SALES-UPDATE.md`](docs/CLAUDE-HANDOFF-QUOTE-AND-SALES-UPDATE.md) |
| **Claude Quote Detail blocking bug** | Open blocking handoff · current on 29 August 2026 | Runtime evidence, required routing contract and browser acceptance checks for the Quote Detail page that still opens inside the CRM shell. | [`docs/CLAUDE-ACTION-QUOTE-DETAIL-WORKSPACE-BUG.md`](docs/CLAUDE-ACTION-QUOTE-DETAIL-WORKSPACE-BUG.md) |

Status matters when the files disagree: the 29 August product-direction record controls Quote Automation authoring; the PRD remains the wider committed Phase 1 baseline and carries a matching addendum. The Mind Map is the current colleague-facing overview; the existing Guide remains an interactive reference until it is rebuilt from the current build brief. The catalogue's 79 reviewed candidates are not the 12 fixed Templates.

Each document has exactly one home. The PRD is a single HTML file — edit it in place rather than keeping a separate source copy. The QA test plan is the Google Sheet: it is the live document testers fill in, so it is never overwritten by re-uploading a workbook.

`docs/WeQuote-CRM-Phase-1-QA-Checklist.xlsx` is the workbook the Google Sheet was built from. It is kept in step with the Sheet, but the Sheet is the copy people read and fill in.

Once testers start recording results, the Sheet can no longer be regenerated by re-importing the workbook — a File → Import → Replace wipes every result. From that point changes are made in the Sheet directly, cell by cell.

### The prototype's files

| Path | Role |
|---|---|
| `index.html` | Page structure and application entry point |
| `quote-detail.html` | Dedicated Quote workspace; intentionally excludes the global CRM sidebar |
| `assets/css/crm.css` | Core CRM styles |
| `assets/css/automation.css` | Automation workspace styles |
| `assets/css/quote-demo.css` | Quotes list and dedicated Quote workspace styles |
| `assets/css/compatibility.css` | Late-stage visual compatibility rules |
| `assets/js/crm.js` | Core CRM data and interactions |
| `assets/js/automation.js` | Automation builder, previews and Phase 1 data adapters |
| `assets/js/quote-demo.js` | Quotes list, company scope, linked Deal/options and dedicated Quote workspace |
| `assets/js/compatibility-pre.js` | Pipeline and variation logic, loaded **before** the quote helpers |
| `assets/js/compatibility-post.js` | Change-order and trainline logic, loaded **after** the quote helpers |
| `assets/js/focus-widget.js` | Needs Your Attention floating widget and task interactions |
| `assets/js/my-notes.js` | My Notes interaction layer used by the prototype |
| `assets/js/custom-dashboard.js` | Personal dashboard customisation used by the prototype |
| `crm-note-attention-phase1.js` | Phase 1 Create Note, Meeting and follow-up integration |
| `assets/compat/variation-grouping-parity*.{js,css}` | Drag-to-group behaviour for variations and alternative groups |
| `assets/compat/quote-first-co-trainline.{js,css}` | The SVG connector drawn between a quote and its change orders |

Asset paths in `index.html` are relative, so keep the folder structure together when copying or publishing.

> **Quote source of truth:** start from the Quote flow in `index.html`; opening a Quote routes to `quote-detail.html`. Both use `assets/js/quote-demo.js`. `quote-workspace.html` is a deprecated experiment and must not be linked, reviewed or used for product decisions.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Push to the repository.
2. **Settings → Pages**, deploy from a branch, root folder.
3. `index.html` is the entry page. No build step.

The PRD is then at `/docs/WeQuote-CRM-Phase-1-PRD.html`.

## Asset notice

The removed `fonts/` directory is not part of this public prototype. Google Fonts and Font Awesome Free load from their public CDNs, so an internet connection is needed for those assets. Some Pro-only icon fallbacks may render differently without licensed local font files.
