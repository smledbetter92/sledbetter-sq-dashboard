# Current state of Online Dashboard

**Project:** `/Users/veeo/Online Dashboard` (this repo)  
**Baseline reference:** `Online Dashboard Cleaned` + [BASELINE.md](./BASELINE.md)  
**Where you lost work:** A bad rollback reverted six files to the last commit; only the “Neighborhoods pill” change was intended. Uncommitted work was recovered from Cursor Local History (Feb 13 snapshot) for many files; some (e.g. `index.css`, `MessagesCard.jsx`) had no history and were rebuilt from conversation.

This doc is the **current state** of pages, sidebars, structure, and styles as of the last pass.

---

## 1. Entry and shell

- **Onboarding gate:** If `hasEnteredDashboard === false`, only `OnboardingPage` renders (no sidebar). “Enter dashboard” sets `hasEnteredDashboard = true` and `activePage = 'profile'`.
- **After onboarding:** Full dashboard: Sidebar + MainContent (+ Account blade when open).
- **Theme:** `theme` state (`'light' | 'dark'`) from localStorage; `document.documentElement.setAttribute('data-theme', theme)`; persisted on change.

---

## 2. Sidebar – structure

### Main level (always visible when in dashboard)

- Home  
- Online (expandable → Online submenu)  
- Items & services (submenu, back only)  
- Customers (submenu, back only)  
- Reports (submenu, back only)  
- Staff (submenu, back only)  
- Banking (submenu, back only)  
- Divider  
- Settings (submenu, back only)  
- Add more  

### Online submenu

- **When `profileVersion === 'v3'`:**  
  Business profile → Website → (divider) → **Ordering** → **Booking** → **Shopping** → (divider) → **Neighborhoods** → Sales channels  

- **When not v3:**  
  Business profile → Neighborhoods → (divider) → **Online ordering** → **Online booking** → **Online shopping** → (divider) → Sales channels  

### Sidebar footer (bottom)

- Search input (“Ask anything…”)
- Avatar (VO + status)
- Version toggle (v1 / v2 / v3)
- **New / Returning** (v3 only): toggles `customerViewMode`; icons `new.svg` / `returning.svg`
- **Dark mode** toggle: calls `onThemeChange`; class `theme-toggle` / `theme-toggle--dark`
- **Cash / Blink** button: calls `onOpenOnboarding()` → sets `hasEnteredDashboard = false` (back to onboarding)

### Sidebar props (current)

`activeBrand`, `onBrandChange`, `onResetToDefaultState`, `activePage`, `onPageChange`, `sidebarLevel`, `onSidebarLevelChange`, `onNavigationStart`, `profileVersion`, `onProfileVersionChange`, `onAccountBladeOpen`, `isAccountBladeOpen`, `theme`, `onThemeChange`, `onOpenOnboarding`, `customerViewMode`, `onCustomerViewModeChange`.

---

## 3. Dashboard state (relevant to pages/sidebar)

- `activePage` (default `'profile'`), `sidebarLevel` (default `'online'`), `profileVersion` (`'v3'`), `pageState` (`'day-one' | 'month-over-month'`).
- `hasEnteredDashboard` (default `false`), `customerViewMode` (default `'returning'`), `theme` (from localStorage, default `'light'`).
- When `activePage` is profile → `sidebarLevel` set to `'main'`; when activePage is website, online-ordering, online-booking, online-shopping, neighborhoods, or channels → `sidebarLevel` set to `'online'`.

---

## 4. MainContent – page title

`getPageTitle()`:

- **neighborhoods:** `'Neighborhoods'` (v3) or `'Home'` (non-v3)
- **profile:** `'Business profile'`
- **website:** `'Website'`
- **channels / online-ordering / online-booking / online-shopping:** `'Channels'` / `'Ordering'` / `'Booking'` / `'Shopping'`
- **settings, banking, staff, reports, customers, items:** Settings, Banking, Staff, Reports, Customers, Items & services
- **default:** `'Home'`

---

## 5. MainContent – what each page renders

### Neighborhoods

- **Header:** Page title + pill dropdown (Day one / Month over month) with **radio icon** (no green pill).
- **v3:**
  - Banner only when `customerViewMode === 'returning'`.
  - **NetworkCard** (first), then **FollowersSection** (gets `customerViewMode`), then **cards-grid**: **OrdersCard**, **MessagesCard** (`useV3Layout={true}`, `customerViewMode`).
- **Non-v3:**
  - Banner only when `pageState === 'day-one'`.
  - FollowersSection → cards-grid (OrdersCard, MessagesCard). No NetworkCard.

### Profile

- v2: Split layout with preview panel; BaseProfilePage in main area.
- v3: BaseProfilePage only (no preview split).
- Else: BaseProfilePage.  
- Header: v3 → “Switch business”; else → “Reload”.

### Website

- **v3:**  
  Banner + full layout: Pages card, Domains card, **Preview** and **Edit website** (Blink) buttons in header. Website/Blink modals use **data-theme="dark"** where applicable.  
- **Non-v3:**  
  Banner + “Shop domains” card + “External site” card.

### Ordering, Booking, Shopping, Channels

- Each has: **Banner** (`activePage` = `online-ordering` | `online-booking` | `online-shopping` | `channels`) + **main-content-inner** + single **brand-card-start** card:
  - Title + short description + “Get started” button.
  - Card uses `var(--button-secondary-bg)` (theme-aware).
- **Banner** has dedicated `bannerContent` entries for these four keys (so each page gets its own banner copy).

### Other pages (Settings, Banking, Staff, Reports, Customers, Items & services)

- Fallback: “Content for {getPageTitle()} coming soon” (uses `var(--text-secondary)`).

---

## 6. Banner

- **Keys in `bannerContent`:**  
  `neighborhoods`, `profile`, `website`, **`online-ordering`**, **`online-booking`**, **`online-shopping`**, **`channels`**.
- Each key has title, description, buttonText, and guides (at least one). Ordering/booking/shopping/channels use “Get started” and short guide copy.

---

## 7. Styles and theme

- **Global (index.css):**
  - `:root` / `[data-theme="light"]`: `--app-bg`, `--sidebar-bg`, `--text-primary`, `--text-secondary`, button vars, etc.
  - `[data-theme="dark"]`: Dark overrides for sidebar, main content, modals, account blade, Blink “Ask anything” (white body, dark eyes/mouth), search input, cards; **no invert** for product images (`orders-product-icon--no-invert`) and Capitola/Google where needed.
- **MainContent.css:** `var(--app-bg)`, `var(--text-primary)`, button vars, popover, pill-button, v3 thumbnails, navigation overlay/spinner; **`.main-content-inner`** (width/max-width for ordering/booking/shopping/channels).
- **Sidebar.css:** `var(--sidebar-bg)`, `var(--sidebar-border)`.
- **Dashboard.css:** `var(--app-bg)`; `.dashboard--onboarding`; onboarding fullscreen/view and Blink icon styles.
- **Website modals:** Dark theme applied via `data-theme="dark"` on website modal overlays in MainContent and BaseProfilePage where used.

---

## 8. Components (current)

- **Dashboard:** Onboarding gate, theme, customerViewMode, sidebar level logic, Account blade, switch-business modal.
- **Sidebar:** Full nav (main + Online + other submenus), footer (search, version, New/Returning, theme, Cash/Blink).
- **MainContent:** All page branches above; NetworkCard, FollowersSection, OrdersCard, MessagesCard; Banner; website v3/non-v3; ordering/booking/shopping/channels cards.
- **Banner:** All seven page keys; guide modal.
- **OrdersCard:** Single “Popular items” (or “Popular with followers”) section; product image uses `orders-product-icon--no-invert` in dark mode.
- **MessagesCard:** v3: “Create message” in header, service rows (e.g. Welcome, New item) with Active badge/dot; non-v3: “Create message” in header, no “Create message” row in list.
- **FollowersSection:** Two rows (Followers, Reachable), “View insights”, divider; Visit frequency + Average order value when `showAnalytics`; receives `customerViewMode` when used in v3 Neighborhoods.
- **NetworkCard:** Map, Brookhaven dropdown, `customerViewMode`; used as first block in v3 Neighborhoods only.

---

## 9. Where you are vs baseline vs lost work

| Area | Baseline (Cleaned) | Current (this repo) | Notes |
|------|--------------------|----------------------|--------|
| Onboarding | No | Yes | First screen; then dashboard. |
| Theme | No | Yes | Light/dark, localStorage, CSS vars, modals. |
| customerViewMode | No | Yes | New/Returning in sidebar; drives Banner + v3 Neighborhoods. |
| Sidebar nav | Same structure | Same + theme, onboarding, New/Returning | |
| Ordering/Booking/Shopping/Channels | “Coming soon” only | Banner + “Get started” card each | |
| Banner keys | neighborhoods, profile, website | + online-ordering, online-booking, online-shopping, channels | |
| Neighborhoods v3 | No NetworkCard; Banner when day-one | NetworkCard first; Banner when returning; radio pill | Recovered/rebuild. |
| Neighborhoods pill | Radio icon | Radio icon (no green pill) | Intended keep. |
| Website modals dark | N/A | data-theme="dark" | Recovered. |
| index.css / MessagesCard | — | Rebuilt from conversation | No Local History for these. |

**Summary:** You’re **ahead of baseline**: onboarding, theme, customer view mode, full ordering/booking/shopping/channels pages with Banner + cards, v3 Neighborhoods with NetworkCard and conditional Banner, and dark styles are all in. The main loss was from the rollback; recovery was done via Local History and conversation, with a few files rebuilt by hand.

Use **BASELINE.md** for “what Cleaned is”; use this file for “what the app is right now.”
