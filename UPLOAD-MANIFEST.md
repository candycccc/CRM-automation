# WeQuote CRM Automation — GitHub upload manifest

Prepared: 29 August 2026

This folder is a clean, upload-ready copy. It has no `.git` directory and does not alter repository history.

## Included

- Latest runnable prototype: `index.html`, `quote-detail.html`, `crm-note-attention-phase1.js` and their complete `assets/` dependency tree.
- Canonical Phase 1 PRD from the repository-level `docs/` folder.
- Current QA workbook, CRM Phase 1 specification and design-system reference.
- Current Quote Lifecycle Automation Guide and its detailed source catalogue.
- Complete Claude build brief for rebuilding the Quote Lifecycle Automation Guide.
- Current Needs Your Attention scope, consolidated review pack, cross-module creation PRD and handoff.
- Current Trigger-first Automation creation handoff.
- White-background Template versus Start from scratch comparison.

## Deliberately excluded

- Dated full-folder snapshots under `handoff/`.
- The stale PRD copy inside the full-roadmap snapshot.
- Duplicate Focus / Needs Your Attention handoff folders and the old ZIP containing macOS metadata.
- `.DS_Store`, `__MACOSX`, AppleDouble files and temporary browser probes.
- Superseded standalone Focus widget concept exports.
- `quote-workspace.html`, which is a deprecated experiment and is not used by the current prototype.

## Upload safely

Copy the contents of this folder into the repository root. Preserve filenames and directory case exactly.

When using Git from the existing working repository, stage explicit paths instead of `git add -A`, because local historical snapshots may still exist outside this package.

No build step is required for GitHub Pages. `index.html` is the entry page.

## Validation completed

- Every runtime JavaScript file passed `node --check`.
- The packaged `assets/`, `index.html`, `quote-detail.html` and canonical PRD match the selected repository files byte for byte.
- `index.html#automation` loaded from the packaged folder with no browser errors.
- `quote-detail.html` loaded as the standalone Quote Workspace with no browser errors.
- The Quote Lifecycle Automation Guide loaded from its packaged path with no browser errors.
- The Template versus Start from scratch comparison loaded as UTF-8 with an explicit white `html`, `body` and visual background.
- No `.DS_Store`, AppleDouble or `__MACOSX` file is present in this folder.

## Source selection

- Runtime code: latest full-roadmap prototype snapshot, updated 29 August 2026, plus removal of stale requests for deleted local Font Awesome Pro files.
- Formal PRD: repository-level `docs/WeQuote-CRM-Phase-1-PRD.html`; the older nested PRD was not copied.
- Automation guide: `QUOTE-LIFECYCLE-AUTOMATION-GUIDE.html`.
- Guide build brief: `CLAUDE-BUILD-QUOTE-LIFECYCLE-AUTOMATION-GUIDE.md`.
- Needs Your Attention: complete four-document review set from the latest dedicated handoff.
