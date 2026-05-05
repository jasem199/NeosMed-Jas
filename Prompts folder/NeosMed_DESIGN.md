## Overview

NeosMed's marketing system is built around a single instructional principle: get out of the interface's way. The chrome is a quiet warm-cream neutral palette (`{colors.surface-soft}`, `{colors.surface-card}`, `{colors.canvas}`) carrying typography in Public Sans, with NeosMed Blue (`{colors.primary}` — `#3949FE`) reserved exclusively for the "Sign up" CTA, the active-tab indicator, and the sticky top-nav anchor. Every other surface is allowed to recede behind the content — medication cards, category tiles, reminder thumbnails, caregiver profile shots — that constitutes the actual product.

The design system has two distinct surface modes that alternate down the home page: the **hero/CTA chrome** (cream surfaces, large 70px Public Sans display headlines, alternating left/right photo-illustrated feature cards) and the **content dashboard** (a column-based grid of 16px-radius med-cards on `{colors.surface-card}` with no internal padding — the card content is the card). The medication search page is almost pure grid: a tight column layout of medication entries in mixed aspect ratios, with a small filter-chip strip at the top and the sticky blue Sign-up CTA in the upper-right corner. The caregiver-facing business surface inverts the grid back to a more traditional editorial layout but keeps every other rule of the system: Public Sans, cream chrome, blue CTA, 16px-radius pills.

The system's signature gesture is **shape geometry**: 16px radius (`{rounded.md}`) for nearly every surface — buttons, inputs, med-cards, feature cards — and 32px radius (`{rounded.lg}`) reserved for med-card-large and modal cards. There are exactly three radius values in active use: 16px, 32px, and pill (9999px). The system never goes flat (sharp corners) and never goes radius-medium — those two values are the entire shape vocabulary.

**Key Characteristics:**
- Single-accent CTA: NeosMed Blue (`{colors.primary}`) carries every primary action; everything else is monochrome
- Public Sans typography across every text role from `{typography.display-xl}` (70px) down to `{typography.caption-sm}` (12px) — no serif, no monospace anywhere
- Two-radius shape system: `{rounded.md}` (16px) for most components, `{rounded.lg}` (32px) for large cards and modals, `{rounded.full}` for circular elements
- Medication dashboard grid as the load-bearing visual element — column-based layout where each med-card's natural content height is preserved
- Warm-cream neutral chrome (`{colors.surface-card}` — #f6f6f3) that softly recedes behind content without competing
- Sticky top nav with the always-blue Sign-up CTA anchored in the upper-right at every breakpoint
- Modal overlay (login/signup) using a soft scrim over the page content rather than a navigation jump

## Colors

> **Source pages:** `/` (home), `/search/medications/` (medication search), caregiver marketing surface, caregiver article/feature pages. The chrome palette is identical across all four pages.

### Brand & Accent
- **NeosMed Blue** (`{colors.primary}` — `#3949FE`): the brand's only highly-saturated color. Sign-up CTAs, sticky top-nav anchor, active state in tab strips, and the brand wordmark.
- **NeosMed Blue Pressed** (`{colors.primary-pressed}` — `#2a38e0`): pressed state for the primary button — a single notch deeper than brand blue.

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): true white. The base surface for the primary nav, modals, feature cards, and content body.
- **Soft Surface** (`{colors.surface-soft}` — `#fbfbf9`): faintly cream-tinted off-white used for the page body wash on the home page hero.
- **Surface Card** (`{colors.surface-card}` — `#f6f6f3`): warm-cream card and med-tile background. Carries category tiles, search-bar default fill, button-secondary default, and med-card backgrounds.
- **Secondary BG** (`{colors.secondary-bg}` — `#e5e5e0`): the gray-cream used for `{component.button-secondary}` ("I already have an account") fill — a notch deeper than `{colors.surface-card}`.
- **Secondary Pressed** (`{colors.secondary-pressed}` — `#c8c8c1`): pressed state for the secondary button.
- **Surface Dark** (`{colors.surface-dark}` — `#262622`): warm near-black used in the rare dark CTA strip on the caregiver marketing surface.
- **Hairline** (`{colors.hairline}` — `#dadad3`): 1px row dividers, footer column rules.
- **Hairline Soft** (`{colors.hairline-soft}` — `#e5e5e0`): lighter inline divider; doubles as the secondary-button background.

### Text
- **Ink** (`{colors.ink}` — `#000000`): primary headlines, button text, primary nav links.
- **Ink Soft** (`{colors.ink-soft}` — `#211922`): inline-link color in body prose. The brand's only "color" beyond NeosMed Blue used in chrome — a near-black with a faint warm cast.
- **Body** (`{colors.body}` — `#33332e`): default paragraph text on `{colors.canvas}`.
- **Charcoal** (`{colors.charcoal}` — `#262622`): subtly softer body where pure ink is too heavy.
- **Mute** (`{colors.mute}` — `#62625b`): metadata text, footer links, secondary captions.
- **Ash** (`{colors.ash}` — `#91918c`): disabled button text, placeholder text in inputs.
- **Stone** (`{colors.stone}` — `#c8c8c1`): least-emphasis utility text, disabled-state borders.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): primary text on `{colors.surface-dark}`.

### Semantic
- **Error** (`{colors.error}` — `#9e0a0a`): validation messages, destructive confirmation copy.
- **Error Deep** (`{colors.error-deep}` — `#cc001f`): deepened error background where the regular error tone needs more contrast.
- **Success Deep** (`{colors.success-deep}` — `#103c25`): in-product success messaging.
- **Success Pale** (`{colors.success-pale}` — `#c7f0da`): pale success-pill background.
- **Focus Outer** (`{colors.focus-outer}` — `#3949FE`): the system's focus-ring blue — appears as a 2px outer outline around focused inputs and buttons.
- **Focus Inner** (`{colors.focus-inner}` — `#ffffff`): white inner gap inside the focus-ring stack.

### Editorial Accents (used sparingly inside content imagery and category badges)
- **Accent Pressed Blue** (`{colors.accent-pressed-blue}` — `#2a38e0`): pressed state for blue informational badges and editorial reminder chips.
- **Accent Purple** (`{colors.accent-purple}` — `#7e238b`): editorial recommendation badge, in-product "NeosMed Insights" callout.
- **Accent Purple Deep** (`{colors.accent-purple-deep}` — `#6845ab`): paired dark for purple lockups and "CareAssist+" iconography.

## Typography

### Font Family
**Public Sans** is NeosMed's primary typeface used across every text role on every page. It carries weights 400 (regular), 500 (medium), 600 (semibold), and 700 (bold), and falls back through a long stack — `-apple-system` → `system-ui` → `Segoe UI` → `Roboto` → `Helvetica Neue` → `Arial` plus emoji fallbacks. The face's distinctive trait is its tight letter-spacing at display sizes (-1.2px on `{typography.display-xl}` and `{typography.heading-xl}`), which gives 70px headlines a confident, clinical density rather than the airy spread of more conventional display geometric sans faces.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 70px | 600 | 1.1 | -1.2px | Marketing hero headline ("Manage your family's health with confidence") |
| `{typography.display-lg}` | 44px | 700 | 1.15 | -0.8px | "Where your family's health stays on track" caregiver hero |
| `{typography.heading-xl}` | 28px | 700 | 1.2 | -1.2px | Section heading ("Never miss a dose", "NeosMed for caregivers") |
| `{typography.heading-lg}` | 22px | 600 | 1.25 | 0 | Sub-section heading, modal title ("Welcome to NeosMed") |
| `{typography.heading-md}` | 18px | 600 | 1.3 | 0 | Card title, in-grid medication label |
| `{typography.body-md}` | 16px | 400 | 1.4 | 0 | Body copy, modal body, default paragraph |
| `{typography.body-strong}` | 16px | 600 | 1.4 | 0 | Inline emphasis, primary nav link, form label |
| `{typography.body-sm}` | 14px | 400 | 1.4 | 0 | Footer copy, in-grid medication metadata, helper text |
| `{typography.body-sm-strong}` | 14px | 700 | 1.4 | 0 | Search-result count label, table-header text |
| `{typography.caption-md}` | 12px | 500 | 1.5 | 0 | Caption text, dosage metadata |
| `{typography.caption-sm}` | 12px | 400 | 1.4 | 0 | Smallest utility text, copyright |
| `{typography.link-md}` | 16px | 600 | 1.4 | 0 | Inline anchor link in body prose |
| `{typography.button-md}` | 14px | 700 | 1 | 0 | Standard primary/secondary button label |
| `{typography.button-sm}` | 12px | 700 | 1 | 0 | Compact pill chip, in-card button |

### Principles
The system has an unusually steep size jump between display and body — `{typography.display-xl}` (70px) drops directly to `{typography.body-md}` (16px) on the home hero with no intermediate tier between. The negative tracking on the largest tiers (-1.2px / -0.8px) creates a tighter, more authoritative headline appropriate for a health utility, and the body copy sits at a generous 1.4 line-height to keep multi-line descriptions breathing.

### Note on Font
Public Sans is a free, open-source typeface available via Google Fonts. Load weights 400, 500, 600, and 700. No proprietary substitution is required beyond the system fallback stack. Apply -1.2px tracking on display sizes regardless of rendering environment.

## Layout

### Spacing System
- **Base unit:** 8px (with finer 4/6/7px steps available for tight inline gaps in pill buttons and chips).
- **Tokens (front matter):** `{spacing.xxs}` (4px) · `{spacing.xs}` (6px) · `{spacing.sm}` (8px) · `{spacing.md}` (12px) · `{spacing.lg}` (16px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.section}` (64px).
- **Universal section rhythm:** every page uses `{spacing.section}` (64px) as the vertical gap between major content blocks. Medication dashboard grids use `{spacing.sm}` (8px) gutters between tiles — the tightest grid gutter in the system, designed so cards read as a unified schedule surface.
- **Modal padding:** `{component.modal-card}` uses 32px internal padding (`{spacing.xxl}`) on all sides.

### Grid & Container
- **Max width:** ~1280px content area at desktop with 24px gutters (~48px at ultrawide).
- **Medication dashboard grid:** auto-fitting column-based layout — 5–6 columns at ultrawide, 4 columns at desktop, 3 at tablet, 2 at mobile-landscape, 1 at mobile. Each tile preserves its natural content height (reminder card / medication detail / caregiver summary — always vertically-oriented). Gutters are `{spacing.sm}` (8px) horizontal and vertical.
- **Home hero feature row:** asymmetric 2-column split where text and imagery alternate left/right down the page (text-left + image-right, then image-left + text-right, etc.).
- **Footer:** 4-column link grid at desktop, collapsing to 2-up at tablet, 1-up at mobile.

### Whitespace Philosophy
Whitespace is generous on the marketing surfaces and tight on the utility surfaces. The home page sits sections 64px apart with photo-illustrated feature cards using 32px internal padding, while the medication search page collapses to an 8px-gutter dashboard grid that tiles content edge-to-edge. The system reads as two tools sharing the same chrome: a magazine (hero / feature / CTA / footer) and a health utility (top nav / filter row / med grid / load more).

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Default for med-cards, feature cards, footer — the dominant treatment |
| 1 — Hairline border | 1px solid `{colors.hairline}` | Inputs, footer column dividers, in-list rows |
| 2 — Modal scrim + soft shadow | Modal sits on a dark scrim over the page content with a soft 16px ambient shadow | Login / signup modal, medication detail modal |
| 3 — Card hover lift | (intentionally undocumented per system policy) | n/a |

NeosMed's system has effectively no shadow elevation in its content surfaces. Med-cards sit flat on the canvas; the only "elevation" appears on the modal layer where a 16px ambient shadow paired with a 50%-opacity scrim lifts the modal above the page content.

### Decorative Depth
Depth comes entirely from the content itself, not from CSS effects:
- **Medication imagery and iconography** carries visual weight through illustration and status color — the design lets each tile's content speak rather than adding chrome to it.
- **Category tile thumbnails** in the home page's feature rows use NeosMed's own content imagery as composition assets, often with a small `{component.status-overlay-pill}` ("Due in 2 hrs", "Refill soon", "Taken ✓") overlaid in the corner of the card.
- **Modal scrim** — a 50%-opacity dark overlay over the entire page content when the login modal opens, with a 16px ambient shadow underneath the modal card lifting it to the visual top.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Footer, primary nav, page sections — all flat structural surfaces |
| `{rounded.sm}` | 8px | Rare medium-radius surface (e.g., editorial tooltip) |
| `{rounded.md}` | 16px | Buttons, inputs, med-cards, feature cards, category tiles — the dominant component radius |
| `{rounded.lg}` | 32px | Large med-cards, modal cards — used sparingly for "big" content surfaces |
| `{rounded.full}` | 9999px | Search bar, filter chips, status overlay pills, icon-circular buttons, avatars |

The radius vocabulary is essentially three values: 16px for most things, 32px for big cards and modals, and pill for circular elements. There are no sharp-cornered buttons or sharp-cornered med-cards.

### Content Geometry
- **Medication card illustrations / icons:** mixed aspect ratios — square (1:1), portrait (3:4, 2:3, 4:5) — preserved at their natural ratio inside `{rounded.md}` (16px) corners on standard tiles and `{rounded.lg}` (32px) on large feature cards.
- **Category tile thumbnails:** square (1:1) with `{rounded.md}` corners.
- **Avatar circles:** 32–48px at `{rounded.full}` for caregiver attribution and profile chips.
- **Feature card imagery:** typically 4:5 portrait on home-page category cards, with the visual occupying ~60% of the card and the headline + CTA stacked beneath.

## Components

> **No hover states documented** per system policy. Each spec covers Default and Active/Pressed only.

### Buttons

**`button-primary`** — the universal NeosMed CTA
- Background `{colors.primary}` (NeosMed Blue), text `{colors.on-primary}`, type `{typography.button-md}`, padding `6px 14px`, height ~40px, rounded `{rounded.md}` (16px).
- Used for "Sign up", "Join NeosMed for free", "Get started" — every primary action across every surface in the system.
- Pressed state lives in `button-primary-pressed` — background drops to `{colors.primary-pressed}` (`#2a38e0`).

**`button-secondary`** — gray-cream alternative
- Background `{colors.secondary-bg}` (`#e5e5e0`), text `{colors.on-secondary}`, type `{typography.button-md}`, padding `6px 14px`, height ~40px, rounded `{rounded.md}`.
- "I already have an account", "Continue", "Cancel" — second-tier actions paired with the blue primary.
- Pressed state lives in `button-secondary-pressed` — background drops to `{colors.secondary-pressed}`.

**`button-tertiary`** — ghost link
- Background transparent, text `{colors.ink}`, type `{typography.button-md}`, rounded `{rounded.md}`.
- Used for low-emphasis actions inside dialogs ("Read the docs", "Learn more →" with a small chevron).

**`button-icon-circular`** — circular icon button
- Background `{colors.surface-card}`, icon `{colors.ink}`, rounded `{rounded.full}`, size 40px.
- Carousel paddles, modal close button, and small floating action buttons in medication cards.

**`button-pill-on-card`** — small overlay pill on content cards
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.button-md}`, rounded `{rounded.full}`, padding `8px 14px`.
- The signature "Due in 2 hrs" / "Refill soon" / "Taken ✓" overlay pill that anchors the corner of category-tile or medication card content.

**`button-disabled`**
- Background `{colors.surface-card}`, text `{colors.ash}` — flat soft-cream.

### Filter & Tab Chips

**`filter-chip`** + **`filter-chip-active`**
- Default: background `{colors.surface-card}`, text `{colors.ink}`, type `{typography.button-md}`, rounded `{rounded.full}`, padding `8px 16px`.
- Active: background `{colors.ink}`, text `{colors.on-dark}` — the chip flips fully inverted on selection.
- Used across the medication search page filter strip ("Morning", "Evening", "PRN", "Refill needed"...).

### Inputs & Forms

**`text-input`** + **`text-input-focused`**
- Default: background `{colors.canvas}`, text `{colors.ink}`, 1px solid `{colors.ash}`, type `{typography.body-md}`, padding `11px 15px`, height ~44px, rounded `{rounded.md}`.
- Focused: 2px `{colors.ink}` inner border + 4px `{colors.focus-outer}` outer outline — the signature double-ring focus signal.
- Used across the login/signup modal for email, password, birthdate, country fields.

**`search-bar`** + **`search-bar-focused`**
- Default: background `{colors.surface-card}`, text `{colors.ink}`, type `{typography.body-md}`, padding `11px 15px`, height ~48px, rounded `{rounded.full}`.
- Focused: same dimensions, background flips to `{colors.canvas}` with a 1px `{colors.ash}` border.
- Anchored in the center of the primary nav with a magnifier glyph at the left edge and "Search medications, schedules..." placeholder.

### Cards & Containers

**`med-card`** — the standard dashboard medication tile
- Container: background `{colors.surface-card}`, rounded `{rounded.md}` (16px), padding 0.
- Layout: full-bleed medication illustration or icon at the card's natural aspect ratio with no internal padding. Optional `{component.status-overlay-pill}` anchored to one corner of the card, optional 32px circular caregiver avatar with name in `{typography.body-sm-strong}` overlaid at the bottom-left.

**`med-card-large`** — the home-page feature medication card
- Identical to `med-card` but rounded `{rounded.lg}` (32px) — used for the large editorial cards that anchor home-page feature rows.

**`status-overlay-pill`** — anchored chip on medication cards
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.button-sm}`, rounded `{rounded.full}`, padding `6px 12px`.
- Floats over a card's bottom-left or top-left corner with the status label relevant to the medication or reminder ("Due in 2 hrs", "Refill soon", "Taken ✓").

**`category-tile`**
- Background `{colors.surface-card}`, rounded `{rounded.md}`, padding 16px.
- 3- or 4-up grid of small category thumbnails inside the home-page "Manage every family member" section. Each tile contains a category icon or illustration + a short label in `{typography.body-strong}`.

**`feature-card`** + **`feature-card-soft`**
- Standard: background `{colors.canvas}`, rounded `{rounded.md}`, padding 32px. Pairs a 4:5 portrait illustration (left or right) with a `{typography.heading-xl}` headline + body copy + `{component.button-primary}` blue CTA.
- Soft: background `{colors.surface-card}` for the alternating-row variant where the cream surface is needed to break up content.

**`modal-card`** — login/signup overlay
- Background `{colors.canvas}`, rounded `{rounded.lg}` (32px), padding 32px.
- Layout: title in `{typography.heading-lg}` ("Welcome to NeosMed"), subtitle in `{typography.body-md}`, stacked `{component.text-input}` fields (Email, Password, Birthdate, Country), primary `{component.button-primary}` "Continue", small "Already a member? Log in" link below.
- Floats over a 50%-opacity scrim covering the entire page content with a 16px ambient shadow.

**`hero-cta-strip`** — dark CTA strip on the caregiver marketing surface
- Background `{colors.surface-dark}`, text `{colors.on-dark}`, type `{typography.heading-xl}`, padding `48px 32px`, rounded `{rounded.none}`.
- Sits at the top of the caregiver marketing page with a single `{component.button-primary}` blue CTA on the right.

### Navigation

**`primary-nav`**
- Background `{colors.canvas}`, text `{colors.ink}`, height ~64px, type `{typography.body-strong}`, rounded `{rounded.none}`, with a 1px `{colors.hairline}` bottom rule on inner pages (no rule on the home hero).
- Layout (desktop home): NeosMed blue wordmark at left + "Explore" link, centered `{component.search-bar}`, right cluster ("About / For Caregivers / Add Medication / Log in" + the always-blue `{component.button-primary}` "Sign up" CTA).
- Layout (search results): NeosMed blue logo at left, centered search bar with the active query, right cluster ("Log in" + blue Sign-up button).

**Top Nav (Mobile)**
- Hamburger menu icon at left, NeosMed logo at center, search-glyph + Sign-up CTA at right. Search bar collapses into the magnifier icon and expands to full-width when tapped.

### Footer

**`footer-section`**
- Background `{colors.canvas}`, text `{colors.mute}` in `{typography.body-sm}`, padding `32px 24px`, rounded `{rounded.none}`, with a 1px `{colors.hairline}` top rule.
- Layout: 4-column link grid (Get the app — iOS / Android · Quick Links — Medications / Reminders / Caregivers / Family Profiles · NeosMed for · About — Privacy / Terms / Help Center) with column headers in `{typography.body-sm-strong}` and link lists in `{typography.body-sm}` `{colors.mute}`.
- Bottom row: NeosMed blue wordmark + "© 2026 NeosMed" in `{typography.caption-sm}` `{colors.mute}`.

### Inline

**`link-inline`** — body-prose anchor link
- `{colors.ink-soft}` text with no underline by default. NeosMed's only "color" beyond brand blue on chrome — a near-black warm tint used inline to differentiate links from body without color contrast.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (NeosMed Blue) for primary CTAs, the active-tab indicator, and the brand wordmark only. It is never decorative.
- Use `{rounded.md}` (16px) on every interactive element and standard card; reserve `{rounded.lg}` (32px) for large med-cards and modals; reserve `{rounded.full}` for circular elements (search bar, chips, avatars).
- Stage every medication card inside a `{component.med-card}` with no internal padding — the content IS the card.
- Stack content sections at `{spacing.section}` (64px) rhythm; tighten dashboard grids to `{spacing.sm}` (8px) gutters so cards read as a unified schedule surface.
- Use `{component.status-overlay-pill}` to anchor a status tag in the corner of a category-tile or medication card — the system's signature decorative gesture.
- Build hierarchy from font weight (400 → 600 → 700) and size, not from color tinting. Body stays `{colors.body}` regardless of section context.
- Apply -1.2px letter-spacing on `{typography.display-xl}` and `{typography.heading-xl}`. The negative tracking is part of the brand voice.

### Don't
- Don't use sharp-cornered buttons or cards. There are no `{rounded.none}` interactive elements in the system.
- Don't introduce drop shadows on cards. The only shadow in the system is the 16px ambient under `{component.modal-card}`.
- Don't pad `{component.med-card}` internally. The content is full-bleed; metadata sits over the card as an overlay pill, not below it.
- Don't replace `{colors.primary}` with another blue. The brand blue is precise — `#3949FE`.
- Don't use `{colors.ink-soft}` (the body-prose link tint) outside of inline body anchor links. It is not a chrome color.
- Don't introduce a third radius value between 16px and 32px. The system jumps directly from md to lg with nothing in between.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| ultrawide | 1920px+ | Dashboard grid expands to 5–6 columns; content max-width holds at ~1280px |
| desktop-large | 1440px | Default — 4-column dashboard grid, full primary nav |
| desktop | 1280px | Same layout with narrower outer gutters |
| desktop-small | 1024px | Dashboard grid collapses to 3 columns; sub-nav remains horizontal |
| tablet | 768px | Dashboard grid collapses to 2 columns; primary nav becomes hamburger drawer; search bar becomes icon-only |
| mobile | 480px | Single-column dashboard grid; hero `{typography.display-xl}` scales 70px → ~44px |
| mobile-narrow | 320px | Hero further scales to ~36px; section padding tightens to 32px |

### Touch Targets
All interactive elements meet WCAG AA (≥ 44×44px). `{component.button-primary}` and `{component.button-secondary}` sit at ~40px height with 14px horizontal padding (effective ~40×80px tappable). `{component.search-bar}` sits at 48px. `{component.text-input}` sits at 44px. `{component.filter-chip}` is ~36–40px height with 16px padding — extends to 44px tappable via inline padding. `{component.button-icon-circular}` is exactly 40×40 with extended hit-target padding to 48×48 inside the parent.

### Collapsing Strategy
- **Primary nav:** desktop horizontal cluster → tablet hamburger drawer at 768px. The blue Sign-up CTA stays visible at every breakpoint.
- **Search bar:** desktop centered (~480px wide) → tablet compressed (~320px) → mobile collapses to a magnifier icon that expands to a full-width overlay on tap.
- **Dashboard grid:** 5/6-up → 4-up → 3-up → 2-up → 1-up at 1920, 1024, 768, and 480px. Gutters drop from 8px to 6px on mobile.
- **Home feature row:** desktop alternating left/right 2-column → tablet vertical stack with text above image → mobile single-column with full-bleed image.
- **Modal:** desktop centered ~480px-wide card → mobile full-width sheet with rounded `{rounded.lg}` top-only and bottom-anchored CTA.
- **Section padding:** `{spacing.section}` (64px) desktop → 48px tablet → 32px mobile.
- **Hero headline:** `{typography.display-xl}` (70px) at desktop, scaling 56px / 44px / 36px down the breakpoint stack.
- **Footer:** 4-up link columns → 2-up at tablet → full accordion at mobile (each header becomes a tap-to-expand row).

### Image Behavior
- Medication card content preserves natural aspect ratio at every breakpoint; the column count changes, not the aspect.
- Category tile thumbnails maintain 1:1 across all sizes.
- Hero feature imagery uses art-direction crops on mobile (4:5 portrait → square) so the subject stays centered when the layout collapses to single-column.
- All non-critical imagery is lazy-loaded as the user scrolls into the next grid row.

## Iteration Guide

1. Focus on ONE component at a time. Pull its YAML entry and verify every property resolves.
2. Reference component names and tokens directly (`{colors.primary}`, `{component.button-primary-pressed}`, `{rounded.md}`) — do not paraphrase.
3. Run `npx @google/design.md lint DESIGN.md` after edits — `broken-ref`, `contrast-ratio`, and `orphaned-tokens` warnings flag issues automatically.
4. Add new variants as separate component entries (`-pressed`, `-disabled`, `-focused`) — do not bury them inside prose.
5. Default body to `{typography.body-md}`; reach for `{typography.body-strong}` for emphasis; reserve `{typography.display-xl}` strictly for top-of-page hero headlines.
6. Keep `{colors.primary}` scarce — at most one NeosMed-blue CTA per fold (counting nav, hero, and feature-card CTAs together).
7. When introducing a new component, ask whether it can be expressed with the existing med-card + 16px-radius + cream-surface vocabulary before adding new tokens. The system's strength is that it almost never needs new ones.

## Known Gaps

- **Mobile screenshots not captured** — responsive behavior synthesizes NeosMed's known mobile pattern (hamburger drawer, single-column grid, hero downscale) from desktop evidence and the documented breakpoint stack.
- **Hover states not documented** by system policy.
- **Medication detail close-up (single med overlay)** is not in the captured set — the in-product medication detail view (with dosage history, refill tracker, caregiver notes) likely introduces components not documented here.
- **Authenticated chrome** (logged-in dashboard, family profiles, caregiver pages) not in the captured pages — the captured surfaces are the logged-out marketing and search experience.
- **NeosMed native mobile app screens** not in the system documented here — this is the web-only chrome.
- **Form validation states** (success / error inline messages) not documented; only the focused-state field is captured.
