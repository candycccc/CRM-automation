# WeQuote CRM Automation — selected canonical upload manifest

Prepared: 29 August 2026

This manifest defines the files to select for an upload. It does **not** claim that every file physically present in the working folder belongs in the package. The working folder can contain Git metadata, ignored snapshots, exports and local macOS files; select only the canonical set below.

## Canonical upload set

- Runnable prototype: `index.html`, `quote-detail.html`, `crm-note-attention-phase1.js` and the runtime files under `assets/` that those pages reference.
- Package entry documents: `README.md` and `UPLOAD-MANIFEST.md`.
- Automation colleague views: `QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html` and `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html`.
- Automation specification and evidence: `CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md` and `docs/quote-automation/`.
- Canonical Phase 1 material: `docs/WeQuote-CRM-Phase-1-PRD.html`, the current QA workbook, CRM Phase 1 specification and design-system reference.
- Current Needs Your Attention documents under `docs/needs-your-attention/`, plus the current implementation handoffs under `docs/handoffs/`.
- Current root-level documents under `docs/` that are linked from `README.md`, including the Quote & Sales handoff and Quote Detail blocking handoff.
- Colleague visual: `docs/visuals/template-vs-scratch-scope.html` and its referenced local assets, if any.

## Automation artifact status

| File | Status on 29 August 2026 | Use |
|---|---|---|
| `docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md` | **Current Automation decision authority** | Resolve Template-versus-Custom authoring and Action-policy questions here. |
| `docs/WeQuote-CRM-Phase-1-PRD.html` | **Committed Phase 1 baseline, with Automation addendum** | Resolve wider Phase 1 scope here; follow its addendum for current Automation authoring direction. |
| `QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html` | **Current colleague-facing scope overview** | Review the 12 fixed Templates, custom routes, Custom Stage gaps and Standalone Pipeline together. |
| `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html` | Interactive reference · rebuild pending | Explore the existing 79-candidate model; do not treat its candidates as the 12 fixed Templates. |
| `CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md` | **Current rebuild specification** | Bring the Guide into line with the current overview and verified calculations. |
| `docs/quote-automation/QUOTE-LIFECYCLE-FROM-SCRATCH-STAGE-CATALOGUE.md` | Review evidence | Verify combinations and source detail; it is not the fixed-Template inventory. |

## Keep out of the upload

- `.git/`, `.DS_Store`, `__MACOSX`, AppleDouble files and temporary browser probes.
- Dated or duplicate full-folder snapshots under `handoff/`, `handoff-focus-point/` and `handoff-needs-your-attention 2/`.
- Old ZIP archives and duplicate macOS-metadata packages.
- Superseded top-level `focus-widget-*` concept exports.
- `quote-workspace.html`, which is a deprecated experiment and is not used by the current prototype.
- Unlisted generated screenshots, temporary visual probes and ignored review exports.

## Upload safely

Select only the paths in **Canonical upload set**. Do not copy the whole physical working folder and do not use a blanket Git add, because excluded historical and local files may be present beside the selected package. Preserve filenames and directory case exactly.

No build step is required for GitHub Pages. `index.html` remains the entry page.

## Validation scope

The checks below apply to the selected canonical files, not to every file physically present in the working folder:

- Runtime JavaScript files in the selected set passed `node --check` at package review time.
- The selected `assets/`, `index.html`, `quote-detail.html` and canonical PRD were matched to the chosen repository versions at package review time.
- `index.html#automation`, `quote-detail.html`, the Guide, the Mind Map and the Template-versus-scratch visual were opened from their selected paths during review.
- The Mind Map controls reviewed were expand/collapse, search, Map/Outline and zoom.
- The selected Guide, Mind Map and Template-versus-scratch visual use explicit white page or visual backgrounds.
- macOS metadata and historical snapshots are excluded by selection; their possible presence in the working folder is not a validation failure.

## Source selection

- Runtime code: selected latest prototype files reviewed 29 August 2026; local historical snapshots are not a source of authority.
- Current Automation direction: `docs/quote-automation/QUOTE-LIFECYCLE-AUTOMATION-PRODUCT-DIRECTION-2026-08-29.md`.
- Formal Phase 1 baseline: repository-level `docs/WeQuote-CRM-Phase-1-PRD.html`; older nested PRD copies are excluded.
- Current overview: `QUOTE-LIFECYCLE-AUTOMATION-MIND-MAP.html`.
- Existing interactive reference: `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html`.
- Current Guide rebuild specification: `CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md`.
- Needs Your Attention: the current documents selected from `docs/needs-your-attention/` and `docs/handoffs/`.
