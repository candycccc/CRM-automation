# WeQuote CRM prototype — UI alignment against the WeQuote portal

**Prepared:** 24 August 2026
**Prototype reviewed:** `index.html#quotes` (Quotes list) and `quote-detail.html?quote=Q-24589` (Quote workspace), served over HTTP and measured in a real browser at 1512×950.
**Reference:** the live WeQuote portal — Angular 14 + Bootstrap 4.6, `src/assets/scss/theme-standard.scss` and `src/assets/scss/styles.scss`.

Every prototype number below is a **computed style read from the rendered page**, not a value read out of a stylesheet. Every portal number is the declared SCSS variable. Nothing here is estimated.

---

## 0. How to read this

This document does two things. Section 1 asks the one question that has to be answered before any of the rest is worth doing. Sections 2–7 are the measured gap. Sections 8–10 are the work.

If you are picking this up cold: the prototype and the portal are not slightly out of step. They are built in two different design languages that happen to share a logo.

---

## 1. Answer this first

The prototype is not a drifted copy of the portal. It is a **coherent, deliberate, different** design language — call it WQD, after the `--wqd-*` variables in its CSS. It has its own red, its own text colour, its own typeface, its own radii, its own spacing.

So "align the styles" has two possible meanings, and they lead to opposite work:

| | **Option A — the prototype conforms to the portal** | **Option B — the portal is moving to WQD, and the prototype is the first screen of it** |
|---|---|---|
| What changes | The prototype's typeface, palette, radii, weights and component shapes are replaced with portal tokens. | Nothing in the prototype. The portal gets a token layer and screens migrate over time. |
| What you get | A CRM that looks native inside today's product on day one. | A modern design language, at the cost of a visibly two-tone product for as long as the migration runs. |
| Cost | Roughly a week of focused CSS work on the prototype (Section 8). | A multi-quarter programme touching 172 modal components and 13 list pages. |
| Risk | The CRM inherits a 2020-era look the new design was presumably trying to leave. | Users see two products. Every unmigrated screen looks broken next to a migrated one. |

**Nothing below assumes an answer.** Sections 2–7 measure the distance; that measurement is what Option A has to close and what Option B has to migrate. But do not start work until this is decided, because the two options share almost no tasks.

If the honest answer is "we want the new look but cannot migrate the portal yet", there is a third option worth naming: keep WQD, but **make the CRM's shared furniture match the portal** — the left sidebar, the top bar, the breadcrumb, the global search — so the CRM reads as a room inside the same building even though the furniture inside the room is new. That is a much smaller job than Option A and avoids the worst of Option B.

---

## 2. The reference: the portal's design system

These are the complete declared tokens. There are fourteen colours, one radius and three shadows in the entire system.

### Colour — `theme-standard.scss`

```scss
$primary:     #ff4655;   // red
$secondary:   #7b828c;   // muted text, table headings
$success:     #1eb395;   // teal-green
$info:        #2783b3;
$warning:     #ffaa07;
$danger:      #9a3ba3;   // PURPLE, not red — the usual source of mockup errors
$light:       #f3f5f7;
$dark:        #1f2f3e;   // body text
$medium:      #4a5461;   // dropdown background
$silver:      #a8b6c9;
$lightgrey:   #dadcdf;
$lightergrey: #ecebef;
$purple:      #7c71c3;
```

Page background is `#edf0f3`. `body { overflow: hidden }` — the portal never scrolls the document; panes scroll individually.

There is a second theme, `theme-pro.scss`, identical except `$primary: #488dea` (blue) and `$danger: #ff4655` (red). **A blue accent is legal only in the pro theme.** Any blue in a standard-theme screen is out of system.

### Typography

```scss
$font-family-sans-serif: 'Mulish', sans-serif;   // everywhere: body, headings, inputs, buttons
$font-size-base:  0.8rem;    // 12.8px
$line-height-base: 1.4;
$headings-font-weight: 700;

$h1: 1.6rem (25.6px)   $h2: 1.2rem (19.2px)   $h3: 1.08rem (17.3px)
$h4: 0.971rem          $h5: 0.857rem          $h6: 0.8rem
$small-font-size: 92%
```

### Shape and depth

```scss
$border-radius:    .25rem;   // 4px
$border-radius-lg: .25rem;   // 4px — deliberately the same
$border-radius-sm: .25rem;   // 4px — deliberately the same
$card-border-width: 0;

$box-shadow-sm: 0 .125rem .25rem rgba(#000, .15);
$box-shadow:    0 .5rem   1rem   rgba(#000, .05);
$box-shadow-lg: 0 1rem    3rem   rgba(#000, .05);
```

One radius. Three shadows, all barely visible. This is a flat, tight system and the sameness is the point.

### Components

```scss
$btn-padding-y: 0.532rem;  $btn-padding-x: 0.8rem;  $btn-font-size: 0.7rem;  // 11.2px
$badge-padding-y: .3281rem; $badge-padding-x: .3281rem; $badge-font-size: 70%;  // ~9px

$table-hover-bg:     rgba($secondary, .1);
$table-border-color: rgba($secondary, .3);
$table-head-color:   $secondary;          // #7b828c, no uppercase, no letter-spacing

$dropdown-bg:             $medium;        // #4a5461 — dark dropdowns with white text
$dropdown-link-hover-bg:  $primary;
$dropdown-font-size:      0.7rem;
$enable-caret: false;
$grid-gutter-width: 1.5rem;               // the spacing unit
```

Two conventions that are easy to miss and very visible when broken: **dropdown menus are dark**, and **`.flex-spaced` uses `1.5rem`** as the standard gap between panes.

---

## 3. What the prototype actually renders

Measured from the running pages.

### Typography

| | Prototype | Portal |
|---|---|---|
| Family | **Geist** (Google Fonts, weights 400–800) | **Mulish** |
| Body size | 12px | 12.8px |
| Page title | 25px / 700 | h1 25.6px / 700 |
| Quote workspace title | 23px / 700 | — |
| Table heading | 11px / **800**, uppercase, letter-spacing 0.33px | inherits 12.8px, no uppercase, no tracking |
| Side-nav item | 11px / **750** | — |
| Status pill | 11px / **800**, uppercase | badge ~9px |

Weights `750` and `800` do not exist in the portal. Mulish is loaded at 400/700/900; Geist is a variable font, which is how 750 became possible.

### Colour

| Measure | Value |
|---|---|
| Unique hex colours across the four prototype stylesheets | **1,007** |
| Total colour references | 4,545 |
| References that are a portal token (black and white included) | **605 — 13%** |
| References outside the portal palette | **3,940 — 87%** |

The most-used colours in the prototype, in order, with what the portal would have used:

| Prototype | Uses | Role | Portal token |
|---|---|---|---|
| `#576a92` | 340 | default text | `$dark #1f2f3e` |
| `#2450ff` | 207 | interactive / links | `$primary #ff4655` (or `$info`) |
| `#8294ba` | 176 | secondary text | `$secondary #7b828c` |
| `#60749e` | 137 | borders, focus ring | `$lightgrey #dadcdf` |
| `#1e8539` | 111 | success | `$success #1eb395` |
| `#cad5ed` | 86 | hairlines | `$lightgrey #dadcdf` |
| `#f12b53` | 66 | brand red | `$primary #ff4655` |
| `#df0000` | 32 | error | `$danger #9a3ba3` **(purple)** |

Three things are worth separating out.

1. **The red is wrong by a visible amount.** `#f12b53` against `#ff4655` — different hue and different saturation. Side by side in one product they read as two brands.
2. **There is a whole blue family** (`#2450ff`, `#285cff`, `#576a92`, `#8294ba`, `#60749e`, `#44577f`, `#33415c`, `#273650`, `#40577f`, `#7185ad`) that has no counterpart in the standard theme at all. Blue is the *pro* theme's primary. On a standard-theme screen it is out of system entirely.
3. **Error is red in the prototype and purple in the portal.** `$danger: #9a3ba3` is genuinely purple. Either the prototype is wrong, or the portal's convention is being retired — but it cannot be left ambiguous, because it decides what every destructive confirmation looks like.

### Shape and depth

| | Prototype | Portal |
|---|---|---|
| Distinct radius values | **22** — `0, 1, 2, 3, 3.25, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14px, 50%, 99px, 100px, 999px, 1000px, inherit` | **1** — `4px` |
| Radius on primary button | 6px | 4px |
| Radius on status pill | 5px | 4px |
| Radius on side-nav item | 7px | 4px |
| Radius on side card | 8px | 4px |
| Distinct shadows | ~20, including `0 0 30px rgba(150,161,180,.4)` and `7px 0 9px -9px` | 3, all `rgba(#000, .05–.15)` |

Part of that ramp is considered — 4/6/8 by element size is a real decision. The rest is not: `1px`, `3.25px`, and five different ways to say "fully round" (`50%`, `99px`, `100px`, `999px`, `1000px`) are drift, whichever option Section 1 lands on.

### Per-file state

| File | Lines | Unique colours | Radius values | `!important` |
|---|---|---|---|---|
| `assets/css/crm.css` | 7,841 | 324 | 20 | 32 |
| `assets/css/automation.css` | 2,324 | 525 | 16 | 65 |
| `assets/css/quote-demo.css` | 506 | 253 | 12 | 3 |
| `assets/css/compatibility.css` | 281 | 9 | 3 | 9 |

`automation.css` carries 525 unique colours in 2,324 lines — roughly one new colour every four lines. That file is where the palette problem actually lives.

---

## 4. The core finding: three token systems, in one prototype

The prototype declares custom properties from three unrelated systems, and they overlap in role.

**1. Portal-derived** — correct, and matches `theme-standard.scss` exactly:
```css
--ink: #1F2F3E;  --muted: #7B828C;  --magenta: #9A3BA3;
--purple: #7C71C3;  --divider: #DADCDF;
```

**2. WQD** — a separate design language:
```css
--wqd-color-surface-primary-default: #F12B53;
--wqd-color-text-default: #576A92;
--wqd-color-icon-success: #1E8539;
--wqd-color-icon-error: #DF0000;
--primary: var(--wqd-color-surface-primary-default);   /* overrides the portal red */
```

**3. Quote-workspace-local** — a third set of near-duplicates of the same roles:
```css
--qw-ink: #213140;    --qw-muted: #7b8491;   --qw-red: #f12b53;
--qw-line: #dce3eb;   --qw-soft: #f4f7fa;
```

So "the text colour" is defined three times as `#1F2F3E`, `#576A92` and `#213140`; "the line colour" as `#DADCDF`, `#CAD5ED` and `#dce3eb`; "the brand red" as `#FF4655`, `#F12B53` and `#f12b53`. Which one wins depends on which stylesheet loaded last and how specific the selector is. That is why the same role renders differently on the two screens.

### One live bug found while measuring

```css
--teal: var(--WQD-Color-Icon-icon-success, #1E8539);
```

CSS custom property names are **case-sensitive**. The property actually defined is `--wqd-color-icon-success`, all lower case. `--WQD-Color-Icon-icon-success` is never defined, so this always falls through to the literal `#1E8539` — and `#1E8539` is not the portal's success colour (`#1eb395`) either. Whatever this token was meant to do, it has never done it. Worth fixing regardless of which option Section 1 lands on.

---

## 5. Component-by-component gap

Measured values. Portal column is what the same component renders as today.

### Quotes list

| Component | Prototype (measured) | Portal | Gap |
|---|---|---|---|
| Page title "Quotes" | Geist 25px/700 `#213140` | Mulish 25.6px/700 `#1f2f3e` | family, and a slightly different ink |
| Header action links (Import / Export) | 12px/400, **uppercase**, `#58709a`, no background, radius 0 | no such pattern; the nearest is `.btn-link` in `$primary` | invented component |
| Primary button "New Quote" | bg `#f12b53`, 12px/400, radius **6px**, padding `0 16px` | bg `#ff4655`, 11.2px, radius 4px, padding `.532rem .8rem` | colour, size, radius, padding |
| Secondary button "New Customer" | bg `#4c5968` | `$medium #4a5461` | close but not the token |
| Filter selects | radius **6px**, border `#cbd4df`, 12px | radius 4px, border `$input-border-color` | radius, border colour |
| Status tabs | 12px/400, padding `19px 10px 16px`, red underline on active | Bootstrap `nav-tabs` | invented component |
| Table `th` | 11px/**800**, **uppercase**, tracking 0.33px, `#75808d` | inherits 12.8px, weight bold, no uppercase, no tracking, `$secondary #7b828c` | weight, case, tracking, size |
| Table `td` | 12–13px, `#263646` | 12.8px, `$dark #1f2f3e` | minor |
| Status pill | radius **5px**, 11px/**800**, uppercase, solid fill `#87909c` | `.badge`, radius 4px, ~9px, `$badge-padding .3281rem` | radius, size, weight |
| "New" flag on Options | radius 4px, 9px/800, `#f12b53` on `#fff4f6`, border `#ffb4c0` | `.badge-primary`, solid | shape and treatment |

### Quote workspace

| Component | Prototype (measured) | Portal | Gap |
|---|---|---|---|
| Top bar | bg `#17212a`, shadow `0 2px 10px rgba(14,27,41,.24)` | `$dark #1f2f3e`, `$box-shadow-sm` | colour, and a much heavier shadow |
| Side nav item (rest) | 11px/**750**, `#53688b`, radius **7px** | — | weight 750 is not in the system |
| Side nav item (active) | `#ef3658` on `#fff2f5`, border `#ff9caf`, 3px inset left bar | — | third red in the same product |
| Panel card | bg `#fbfcfe`, border `#dce4ee`, radius **8px**, no shadow | `.card`, `border-width: 0`, radius 4px, `$box-shadow` | border where the portal uses shadow |
| Quote status select | bg `#566271`, border `#8995a3`, radius 6px, uppercase | `.custom-select`, radius 4px | invented treatment |
| Metric figures (35% / £31,346) | Geist 400, large | Mulish | family |

The active side-nav item alone uses `#ef3658`, while the same page's buttons use `#f12b53` and the portal's brand is `#ff4655`. **Three different reds in one product.**

---

## 6. Direct mapping table

If Option A is chosen, this is the substitution list. Applying it mechanically gets most of the way.

| Prototype value | Replace with | Token |
|---|---|---|
| `#f12b53`, `#ef3658`, `#F12B53`, `--qw-red`, `--wqd-color-surface-primary-default` | `#ff4655` | `$primary` |
| `#576a92`, `#213140`, `#263646`, `--qw-ink`, `--wqd-color-text-default` | `#1f2f3e` | `$dark` |
| `#8294ba`, `#75808d`, `#7b8491`, `--qw-muted` | `#7b828c` | `$secondary` |
| `#cad5ed`, `#dce3eb`, `#dce4ee`, `#cbd4df`, `--qw-line` | `#dadcdf` | `$lightgrey` |
| `#f3f7ff`, `#f8fafd`, `#f9fbff`, `#fbfcfe`, `--qw-soft` | `#f3f5f7` | `$light` |
| `#1e8539`, `#eaf6ee` | `#1eb395` | `$success` |
| `#df0000` | `#9a3ba3` | `$danger` — **confirm this; it is purple** |
| `#b58128` | `#ffaa07` | `$warning` |
| `#2450ff`, `#285cff`, `#60749e`, `#44577f`, `#33415c`, `#273650`, `#40577f`, `#7185ad` | no equivalent | **decide** — see Section 9 |
| `#17212a`, `#4c5968`, `#566271` | `#1f2f3e` / `#4a5461` | `$dark` / `$medium` |
| radius `1, 2, 3, 3.25, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14px` | `4px` | `$border-radius` |
| radius `50%, 99px, 100px, 999px, 1000px` | keep — pills and avatars are legitimately round | — |
| `font-family: 'Geist'` | `'Mulish', sans-serif` | `$font-family-sans-serif` |
| `font-weight: 750, 800` | `700` | — |
| `font-weight: 500, 600` | `400` or `700` | Mulish has no 500/600 loaded |
| all bespoke shadows | `$box-shadow-sm` / `$box-shadow` / `$box-shadow-lg` | — |

Two cautions on applying this mechanically:

- **Contrast.** `#576a92` → `#1f2f3e` darkens text; that is safe. But `#8294ba` → `#7b828c` on a `#f3f5f7` ground is 3.3:1 — below WCAG AA for body text. Check every muted-on-tint pairing after substituting rather than assuming the portal's own pairings were compliant.
- **The blue family carries meaning.** In the prototype, blue marks *interactive*. The portal marks interactive with `$primary` red. A blanket blue→red substitution will turn quiet inline links into things that look like destructive buttons. Map by role, not by hex.

---

## 7. What is genuinely better in the prototype

Alignment should not mean discarding these. Each is worth porting *into* the portal rather than out of the prototype.

1. **The uppercase, tracked table heading** is more scannable than the portal's plain-weight heading, at the cost of being non-standard. If it is kept, it should be added to the portal as a table variant so it is a system decision rather than a one-screen exception.
2. **The status-tab row with live counts** is a better pattern than the portal's plain `nav-tabs` and could be generalised.
3. **The workspace's dedicated left navigation** is the right answer to "I am editing one document", and the portal has no equivalent today.
4. **The radius ramp** (4/6/8 by element size) is defensible design. The portal's flat 4px is a decision from an earlier era, not a law of nature.

---

## 8. Order of work, if Option A

Sequenced so that each step is independently shippable and visibly reduces the gap.

1. **Introduce a single token file.** One `:root` block, portal values, portal names. Delete the `--wqd-*` and `--qw-*` blocks. Nothing else changes yet — this step alone makes the rest mechanical. *Half a day.*
2. **Swap the typeface.** Replace the Geist link with Mulish, drop weights 500/600/750/800 to 400/700/900. Expect line-length and vertical-rhythm regressions; Mulish is wider than Geist at the same size. *One day including fixing what shifts.*
3. **Collapse the radii.** All 22 values to `4px`, except intentional pills. *Two hours.*
4. **Apply the colour map** from Section 6, by role rather than by find-and-replace, then re-check contrast. *Two days — this is where the real work is, because `automation.css` alone holds 525 colours.*
5. **Rebuild the five invented components** on portal primitives: header action links, filter selects, status tabs, status pills, the workspace status select. *One to two days.*
6. **Replace bespoke shadows** with the three portal shadows and give cards `border-width: 0` plus a shadow instead of a border. *Half a day.*
7. **Re-shoot the PRD figures** (§A8 Figures 6 and 7) so the requirements document shows the aligned interface rather than the current one.

Rough total: **five to seven working days** on the prototype's CSS, assuming no functional changes.

---

## 9. Open questions

These cannot be resolved from the code, and each changes the work.

1. **Section 1's fork** — Option A, B, or the shared-furniture middle path. Everything else depends on it.
2. **Is `$danger` still purple?** `#9a3ba3` is a genuinely unusual choice and the prototype has quietly replaced it with `#df0000`. If purple is being retired, retire it in the portal explicitly rather than by prototype drift.
3. **What is the blue for?** `#2450ff` is used 207 times. If it is the new interactive colour, it belongs in the token set with a name. If it arrived from the *pro* theme by accident, it should go.
4. **Standard theme or pro theme?** The prototype's blue leanings suggest it may have been designed against `theme-pro.scss`. Confirm which theme the CRM ships to.
5. **Is Mulish still the typeface?** If a font change is already planned, step 2 above is wasted work and should be skipped.

---

## 10. Scope of this review, and what it does not cover

**Covered:** the Quotes list and the Quote workspace — typography, colour, radius, shadow, spacing, and the eleven components listed in Section 5, measured in a rendered browser.

**Not covered, and each may hold more divergence:**

- The CRM Deals pipeline, Leads, and the automation builder — `automation.css` is 2,324 lines with 525 colours and was analysed only in aggregate, not component by component.
- Every dialogue: Link, Add option, Switch Deal, Unlink. These were read in the source but not opened and measured.
- Empty, loading and error states.
- Responsive behaviour below 1512px. The portal declares breakpoints to `xxl: 1600px`; the prototype was measured at one width only.
- Focus rings and keyboard states, beyond noting that `0 0 0 1px #60749E` appears 16 times as a focus treatment and is not a portal pattern.
- Dark mode — neither product has one.
- Anything about behaviour. This is a visual review only; the functional requirements are in `WeQuote-CRM-Phase-1-PRD.html` §A8 and the tests in the QA workbook.

**One thing I checked and want to record as a non-finding:** switching Group by Deal on and off does not change the owning company shown on any row. It looked wrong in a low-resolution screenshot; reading the DOM in both states showed all 13 rows identical. There is no bug there.
