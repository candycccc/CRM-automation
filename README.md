# WeQuote Platform CRM

Standalone HTML prototype for the WeQuote CRM deal, quote, revision, variation, change-order and alternative-group flows — plus the Phase 1 requirements and QA plan that go with it.

## Where things are

```
├── index.html              ← the prototype. Open this first.
├── quote-workspace.html    ← standalone quote editor page
├── docs/                   ← requirements and QA
│   ├── WeQuote-CRM-Phase-1-PRD.html
│   └── WeQuote-CRM-Phase-1-QA-Checklist.xlsx
├── assets/
│   ├── css/                ← core styles
│   ├── js/                 ← core behaviour
│   ├── compat/             ← late-stage compatibility layers
│   └── icons/
└── fonts/                  ← Font Awesome Pro (see licence note below)
```

### The two documents

| File | What it is | How to open |
|---|---|---|
| `docs/WeQuote-CRM-Phase-1-PRD.html` | Phase 1 requirements. Self-contained: images are embedded, so it needs no assets. Part A is the main PRD, Part B the developer appendix, Part C the audit appendix. | Double-click, or serve and browse to it |
| `docs/WeQuote-CRM-Phase-1-QA-Checklist.xlsx` | Test plan and 137 test cases across 13 sheets, including the release gate and a traceability matrix. | Excel, Numbers or Google Sheets |

The PRD is one file by design — edit it directly rather than keeping a separate source copy.

### The prototype's files

| Path | Role |
|---|---|
| `index.html` | Page structure and application entry point |
| `assets/css/crm.css` | Core CRM styles |
| `assets/css/automation.css` | Automation workspace styles |
| `assets/css/compatibility.css` | Late-stage visual compatibility rules |
| `assets/js/crm.js` | Core CRM data and interactions |
| `assets/js/automation.js` | Automation builder, previews and Phase 1 data adapters |
| `assets/js/compatibility-pre.js` | Pipeline and variation logic, loaded **before** the quote helpers |
| `assets/js/compatibility-post.js` | Change-order and trainline logic, loaded **after** the quote helpers |
| `assets/compat/variation-grouping-parity*.{js,css}` | Drag-to-group behaviour for variations and alternative groups |
| `assets/compat/quote-first-co-trainline.{js,css}` | The SVG connector drawn between a quote and its change orders |

Asset paths in `index.html` are relative, so keep the folder structure together when copying or publishing.

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

`fonts/` contains locally supplied Font Awesome Pro files required by some prototype icons. Before making this repository public, confirm your Font Awesome licence permits redistribution — or keep the repository private and replace them with publicly distributable icons.

Google Fonts and Font Awesome Free load from their public CDNs, so an internet connection is needed for those.
