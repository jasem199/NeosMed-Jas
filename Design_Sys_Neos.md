# NeosMed Design System

> Portable reference for replicating the NeosMed UI in any project.

---

## 1. Foundation

- **Framework:** React + Vite
- **Font:** [Public Sans](https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700) — weights 400, 500, 600, 700
- **Icons:** [Remix Icon 4.6](https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css)
- **Layout:** Mobile-first, max-width `600px`, centered on desktop. Full-width below `430px`.
- **Min touch target:** 44×44px. No text below 10px.

---

## 2. CSS Custom Properties (tokens.css)

### Colors

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#3949FE` | Brand blue — CTAs, active states, logo |
| `--color-primary-pressed` | `#2a38e0` | Pressed state (15% darker) |
| `--color-on-primary` | `#ffffff` | Text on primary |
| `--color-canvas` | `#F7F7F8` | Page background |
| `--color-surface` | `#ffffff` | Card/sheet/nav background |
| `--color-surface-soft` | `#fbfbf9` | Faint cream tint, taken sections |
| `--color-surface-card` | `#f6f6f3` | Warm-cream tile background |
| `--color-secondary-bg` | `#e5e5e0` | Secondary button fill |
| `--color-secondary-pressed` | `#c8c8c1` | Secondary pressed |
| `--color-surface-dark` | `#262622` | Dark surfaces, toast bg |
| `--color-hairline` | `#dadad3` | 1px dividers, borders |
| `--color-hairline-soft` | `#e5e5e0` | Lighter dividers |
| `--color-ink` | `#000000` | Primary text, headings |
| `--color-ink-soft` | `#211922` | Inline link tint |
| `--color-body` | `#33332e` | Default paragraph |
| `--color-charcoal` | `#262622` | Softer body text |
| `--color-mute` | `#62625b` | Secondary text, captions |
| `--color-ash` | `#91918c` | Placeholders, disabled |
| `--color-stone` | `#c8c8c1` | Lowest emphasis text |
| `--color-on-dark` | `#ffffff` | Text on dark surfaces |
| `--color-error` | `#9e0a0a` | Validation errors |
| `--color-error-deep` | `#cc001f` | Destructive actions, badges |
| `--color-success` | `#22c55e` | Check button fill |
| `--color-success-deep` | `#103c25` | Success text |
| `--color-success-pale` | `#c7f0da` | Success tag bg |
| `--color-focus-outer` | `#3949FE` | Focus ring |
| `--color-accent-purple` | `#7e238b` | Patient/care section accent |
| `--color-accent-purple-deep` | `#6845ab` | Avatar gradient end |

### Spacing

| Token | Value |
|---|---|
| `--spacing-xxs` | 4px |
| `--spacing-xs` | 6px |
| `--spacing-sm` | 8px |
| `--spacing-md` | 12px |
| `--spacing-lg` | 16px |
| `--spacing-xl` | 24px |
| `--spacing-xxl` | 32px |
| `--spacing-section` | 64px |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `--rounded-none` | 0px | Structural edges |
| `--rounded-sm` | 8px | Logo icon, status tags |
| `--rounded-md` | 16px | Buttons, cards, inputs — **dominant** |
| `--rounded-lg` | 32px | Bottom sheets, admin sections |
| `--rounded-full` | 9999px | Pills, chips, avatars, FAB |

---

## 3. Typography Scale

| Class | Size | Weight | Line-Height | Letter-Spacing |
|---|---|---|---|---|
| `.text-display-xl` | 70px | 600 | 1.1 | -1.2px |
| `.text-display-lg` | 44px | 700 | 1.15 | -0.8px |
| `.text-heading-xl` | 28px | 700 | 1.2 | -1.2px |
| `.text-heading-lg` | 22px | 600 | 1.25 | — |
| `.text-heading-md` | 18px | 600 | 1.3 | — |
| `.text-body-md` | 16px | 400 | 1.4 | — |
| `.text-body-strong` | 16px | 600 | 1.4 | — |
| `.text-body-sm` | 14px | 400 | 1.4 | — |
| `.text-body-sm-strong` | 14px | 700 | 1.4 | — |
| `.text-caption-md` | 12px | 500 | 1.5 | — |
| `.text-caption-sm` | 12px | 400 | 1.4 | — |
| `.text-button-md` | 14px | 700 | 1 | — |
| `.text-button-sm` | 12px | 700 | 1 | — |

---

## 4. Global Animations

| Name | Keyframes | Use |
|---|---|---|
| `fadeIn` | opacity 0→1 | Screen transitions, error msgs |
| `slideUp` | translateY 100%→0 | Bottom sheets entering |
| `slideDown` | translateY 0→100% | Bottom sheets closing |
| `scaleIn` | scale 0.9→1, opacity 0→1 | Toast notifications, banners |
| `checkPop` | scale 1→1.2→1 | Check button confirm |
| `shimmer` | bg-position sweep | Loading skeletons |
| `progressFill` | width 0%→final | Progress bar |
| `burst` | scale 1→1.8, opacity 0.5→0 | Ripple on check |
| `spin` | rotate 0→360deg | Scanning spinner |
| `shake` | translateX ±4px | Validation error |

**Standard easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for physical motion. `ease` / `ease-out` for fades.

---

## 5. Component Patterns

### Buttons
- **Primary CTA:** `bg: primary`, `color: on-primary`, `radius: rounded-md`, `padding: 14px`, `font: 15px/700`. Active: `scale(0.98)`, `bg: primary-pressed`.
- **Secondary CTA:** `bg: transparent`, `border: 1px dashed primary`, `color: primary`. Active: `bg: surface-card`.
- **FAB:** 56×56px circle, `bg: primary`, `shadow: 0 4px 16px rgba(57,73,254,0.35)`, fixed bottom-right.
- **Icon Button:** 40×40px, `bg: surface-card`, `radius: full`.

### Cards
- **Time Card:** `bg: surface`, `radius: rounded-md`, `border: 1px solid hairline-soft`, `shadow: 0 4px 16px rgba(0,0,0,0.04)`, `padding: spacing-lg`.
- **Member Card:** Same shadow pattern. Caregiver variant: `border-left: 4px solid primary`. Patient variant: `bg: #F8F6FC`, `border-left: 4px solid accent-purple`.

### Bottom Sheet
- **Overlay:** `bg: rgba(0,0,0,0.5)`, `z-index: 1000`, flex align end.
- **Container:** `bg: surface`, `radius: rounded-lg rounded-lg 0 0`, `padding: spacing-xl`, `max-height: 85dvh`, animated slideUp/slideDown with 250ms close delay.
- **Handle:** 36×4px bar, `bg: stone`, `radius: full`, centered.

### Form Inputs
- **Default:** `padding: 14px 16px`, `border: 1px solid hairline`, `radius: rounded-md`, `bg: surface`.
- **Focus:** `border-color: ink`, `box-shadow: 0 0 0 3px rgba(57,73,254,0.15)`.
- **Chips:** `padding: 10px 18px`, `radius: full`, `border: 1px solid hairline`. Selected: `bg: ink`, `color: on-dark`.

### Toggle Switch
- 44×24px track, 20×20px knob. Off: `bg: hairline`. On: `bg: primary`. Knob `translateX(20px)` when on.

### Navigation
- **TopBar:** 60px sticky, `bg: surface`, `border-bottom: 1px solid hairline`. Logo icon 32px with `bg: primary`, logo text 20px/700 in primary color. Avatar 36px circle with gradient `primary → accent-purple-deep`.
- **BottomNav:** 64px fixed, `bg: surface`, `border-top: 1px solid hairline`. 5 tabs. Active: `color: primary`, `font-weight: 600`. Inactive: `color: ash`. Badge: 16px circle, `bg: error-deep`.

### Toast
- Fixed bottom 100px, centered, `bg: surface-dark`, `color: on-dark`, `radius: full`, `shadow: 0 4px 16px rgba(0,0,0,0.2)`.

### Progress Bar
- 6px height, `bg: secondary-bg`, fill gradient `primary → #6366f1`, `transition: width 0.6s cubic-bezier(0.32,0.72,0,1)`.

### Status Tags
- `padding: 4px 8px`, `radius: rounded-sm`, `font: 11px/700`, uppercase. Active: `bg: success-pale, color: success-deep`. Pending: `bg: #FEF7E0, color: #B06000`.

---

## 6. Interaction Patterns

- **Active/press:** `scale(0.92–0.98)` + `bg` darken. Duration: `0.15s ease`.
- **Disabled:** `opacity: 0.3–0.6`, `pointer-events: none`.
- **Taken medicine:** `opacity: 0.6`, strikethrough via `::after` pseudo-element animating `width: 0→100%`.
- **Missed medicine:** `border-left: 3px solid error-deep`.
- **Check confirm:** Green fill (`success`) + `checkPop` bounce + `burst` ripple.
- **Theme override:** Primary color stored in `localStorage` key `neosmed-primary-color`, applied at init via JS to `--color-primary` and auto-calculated `--color-primary-pressed` (15% darker).

---

## 7. Z-Index Stack

| Layer | Z-Index |
|---|---|
| TopBar | 100 |
| BottomNav | 90 |
| FAB | 80 |
| Bottom Sheet Overlay | 1000 |
| Scanning Overlay | 2000 |
| Toast | 2000 |

---

## 8. Key Rules

1. **Primary blue is scarce** — only CTAs, active indicators, logo. Never decorative.
2. **No drop shadows on content cards** — only modal/sheet layers get shadow.
3. **Three radius values** — 16px (most things), 32px (sheets/large), pill (circular).
4. **Hierarchy from weight, not color** — body stays `--color-body` regardless of context.
5. **Negative tracking** on display/heading-xl sizes: `-1.2px`.
6. **No hover states** in mobile-first design — only `:active` press states.
7. **All screens use** `min-height: 100dvh` with `padding-bottom: 160px` to clear fixed bottom nav.
