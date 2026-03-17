# Implementation plan (how we’d build the alignment)

**Source of truth:** [ALIGNMENT.md](./ALIGNMENT.md). Build in small, committable steps. No hard rollbacks.

---

## Order of work

We’d implement in this order so that shared pieces exist before each page.

1. **Foundations** – Design tokens, shared components, naming.
2. **Shell & nav** – Sidebar structure, Business profile entry, Add more → blade.
3. **Card system** – One card component with variations (headers, rows, thumbs, pills, dividers).
4. **Page by page** – Website → Ordering → Booking → Shopping → Neighborhoods → Business profile content → Sales channels. For each page: new customer state first, then returning.
5. **Polish** – Dark mode icon animation, graph dark mode, etc.

---

## Phase 1: Foundations

- **Buttons:** Rename/refactor so “secondary” = grey, “primary” = dark; ensure dark mode inverts correctly (white button, dark text). Use CSS vars consistently (e.g. `--button-primary-bg`, `--button-secondary-bg`).
- **Icons:** Move (or confirm) icons live under `src/assets`; ensure dark mode swaps to white (e.g. via `data-theme="dark"` and CSS or separate assets).
- **Modals:** Standardize in/out animation for upgrade modal and brand switcher (one shared animation pattern). Blade stays as-is for now; “Add more” will open it later.
- **No new UI yet** – just naming, vars, and animation so the rest can rely on them.

*Commit after this phase.*

---

## Phase 2: Shell & navigation

- **Business profile as top-level:** Move “Business profile” out of Online submenu to main level. Main nav: brand card header (card + name + $cashtag) as one clickable item → 16px padding, 12px radius, hover. Click sets active page to business profile and shows profile content on the right.
- **Brand header animation:** When Business profile is selected: $cashtag animates up/out, “Business profile” animates up/in; leave it in that state while selected (no revert).
- **Online submenu:** First item = Website (no “Customize your website” card). Remove reuse of the old start card everywhere.
- **Add more:** Sidebar “Add more” opens the existing blade (content TBD; just wire the open action).

*Commit after this phase.*

---

## Phase 3: Card system

- **Single card component** (or a small set with shared base): 32px rounded corners, border, consistent padding. Support:
  - Header variants (title only, title + sub text, title + primary/secondary button).
  - Dividers (16px above/below where specified).
  - Rows: icon/image box (with size variants: e.g. 48×60 monogram, 84×40 for Followers row), title, side text, pill, arrow/chevron.
  - **Thumbnail variation:** Row with optional thumbnails below (e.g. Website Pages); divider below only if another row follows.
- Use this for all pages so “My business”, “Locations”, “Connections”, “Pages”, “Domains”, “Menus”, “Fulfillment”, “Network”, “Followers”, etc. share the same look and behavior.

*Commit after this phase.*

---

## Phase 4: Page-by-page (new customer → returning customer)

For each page we’d:

1. Implement **new customer** state from ALIGNMENT (empty states, monograms, single items where specified).
2. Then add **returning customer** state (filled rows, logos, extra rows, graphs where specified).
3. Wire **New / Returning** footer icons to the same `customerViewMode` (or equivalent) so the page switches between the two states.

Order:

1. **Website** – Pages card (Order online + thumbs; then Homepage, Order online, About us) and Domains card (domain name + Active pill, cash.app + “Redirects to…”, Connect website). New vs returning as in ALIGNMENT.
2. **Ordering** – Menus + Fulfillment cards; new = Add menu primary, fulfillment rows + dividers; returning = Add menu secondary, Lunch/Drinks rows.
3. **Booking** – Appointments, Services, Staff, Availability; first card primary in new; returning = rows with side text as aligned.
4. **Shopping** – Collections + Fulfillment (reuse same Fulfillment card as Ordering).
5. **Neighborhoods** – Remove header dropdown. Day one = new customer, Month over month = returning. Cards: Network (location + chevron), Followers (View insight, Followers/Reachable rows, 84×40 boxes), Orders, Messages. Returning: Followers shows only Visit frequency + Average order value; improve graph dark mode.
6. **Business profile content** – Rows (Brand & about, Neighborhoods, Staff & permissions, Devices, Settings), Locations (Brookhaven only for new; current for returning), Connections (no OpenAI row; new = Google only + side-text-only for Apple/OpenAI/Meta; returning = as now minus OpenAI).
7. **Sales channels** – Same card structure; placeholder for DoorDash, Uber Eats, etc. (can be minimal until we align content).

Each page (or each page’s new/returning split) can be its own commit.

---

## Phase 5: Polish

- **Dark mode icon:** Animate/rotate when toggling theme (e.g. CSS transition or small JS).
- **Pills:** Confirm color correction in dark mode everywhere.
- **Graphs (Neighborhoods):** Visit frequency and Average order value with proper dark mode (background, axes, fills).
- **Icons:** Final pass so all sidebar and card icons switch to white in dark mode.

*Commit after this phase.*

---

## How we’d work (practices)

- **One phase (or one page) at a time** – no “do everything in one go.”
- **Commit after each phase** (and optionally after each page) – so we never need a hard rollback.
- **Reference ALIGNMENT.md** before changing a page – so new/returning and card content stay correct.
- **Stash or backup branch** before any revert/reset – per project rule.
- **Card system first** – then every page uses it; no one-off card markup per page.

---

## What we’re *not* doing in this plan

- Changing onboarding flow or Cash App icon behavior (TBD).
- Defining the blade content for “Add more” (TBD).
- Building Sales channels beyond structure/placeholder until we align on content.

If you want to adjust the order (e.g. do Business profile content before Neighborhoods) or add/remove a phase, we can update this plan next and still keep alignment-only until you say to start building.
