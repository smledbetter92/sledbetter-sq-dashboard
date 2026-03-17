# Baseline: “Up to this point” (Online Dashboard Cleaned)

This doc describes **Online Dashboard Cleaned** (`/Users/veeo/Online Dashboard Cleaned`) so we can use it as a known-good baseline. When we “start over” or add features, we do it on top of this.

---

## 1. Tech & structure

- **Stack:** React 18, Vite. No onboarding-only deps.
- **Entry:** `main.jsx` → `App.jsx` → `Dashboard.jsx` (no gate; dashboard always visible).
- **Key components:** Dashboard, Sidebar, MainContent, Banner, FollowersSection, OrdersCard, MessagesCard, BaseProfilePage, ProfileLocationsPage, DefaultWebsite, FeatureSection, SetupModals, AnalyticsModal, SettingsPage.

---

## 2. Sidebar

- **Main level:** Home, Online, Items & services, Customers, Reports, Staff, Banking, divider, Settings, Add more.
- **Online submenu**
  - **v3:** Business profile → Website → (divider) → Ordering → Booking → Shopping → (divider) → Neighborhoods → Sales channels.
  - **Non‑v3:** Business profile → Neighborhoods → (divider) → Online ordering → Online booking → Online shopping → (divider) → Sales channels.
- **Other submenus:** Items & services, Customers, Reports, Staff, Banking, Settings — back button only (no sub‑items).
- **Footer:** Bell, Message, Help, MgmtBot, Cash App. **No** theme toggle, **no** “open onboarding” button.
- **Props:** `activeBrand`, `onBrandChange`, `onResetToDefaultState`, `activePage`, `onPageChange`, `sidebarLevel`, `onSidebarLevelChange`, `onNavigationStart`, `profileVersion`, `onProfileVersionChange`, `onAccountBladeOpen`, `isAccountBladeOpen`.

---

## 3. Dashboard state

- `activeBrand`, `pageState` (day-one / month-over-month), `activePage` (default `'profile'`), `sidebarLevel` (default `'online'`), `profileVersion` (`'v3'`), account blade, switch‑business modal, location/brand modals, etc.
- **Not in baseline:** `hasEnteredDashboard`, OnboardingPage, theme (light/dark), `customerViewMode` (New/Returning).
- Navigation: `handleNavigationStart(targetPage, targetPageState)` with loading overlay.

---

## 4. MainContent – pages and content

| Page | What renders |
|------|----------------|
| **Neighborhoods** | Banner only when `pageState === 'day-one'`. FollowersSection. cards-grid: OrdersCard, MessagesCard. Page title + pill dropdown “Day one” / “Month over month” (radio icon). **No** NetworkCard. |
| **Profile** | v2: split layout + preview; v3: BaseProfilePage only; else BaseProfilePage. |
| **Website** | v3: Pages card, Domains card, Preview/Edit website, Blink modal, Upgrade modal. Non‑v3: Banner + “Shop domains” + “External site” cards. |
| **Ordering / Booking / Shopping / Channels** | Plain fallback: “Content for {Ordering|Booking|Shopping|Sales channels} coming soon” (no Banner, no “Get started” card). |
| **Settings, Banking, Staff, Reports, Customers, Items** | Same “Content for … coming soon” fallback. |

- **getPageTitle()** returns: Home, Ordering, Booking, Shopping, Neighborhoods, Profile, Website, Channels, Settings, Banking, Staff, Reports, Customers, Items & services (so nav and title stay in sync even when content is “coming soon”).

---

## 5. Banner

- **bannerContent keys:** `neighborhoods`, `profile`, `website` only.
- Ordering / Booking / Shopping / Channels do **not** show the Banner in Cleaned (they show “coming soon” only). If we ever passed `activePage` there, fallback would be `bannerContent['neighborhoods']`.

---

## 6. Assets

- **Product review 12:** bfb, kj, bnsd, spot-of-tea, vanilla-cafe, tea-monks, paper-son-coffee logos + some UI assets.
- Same core assets as main project (nhoodguide, localcashguide, messagesguide, theme1–3, etc.).

---

## 7. What the baseline does *not* include

- Onboarding flow (OnboardingPage, hasEnteredDashboard, Cash/Blink entry).
- Theme (light/dark, `data-theme`, CSS vars in index.css).
- `customerViewMode` (New vs Returning) and any UI that depends on it.
- Ordering/Booking/Shopping/Channels pages that show Banner + “Get started” card (only “coming soon” in baseline).
- Banner entries for `online-ordering`, `online-booking`, `online-shopping`, `channels`.
- NetworkCard on Neighborhoods (Cleaned has FollowersSection → cards-grid only).
- Any “no invert” or dark‑mode‑specific styles for product images / modals.

---

## 8. How to use this

- **Restore to baseline:** Copy from `Online Dashboard Cleaned` into this repo (or replace `src` and key config), then re‑apply only the changes you want.
- **Add features on top:** Use this list as the starting point; add onboarding, theme, booking/ordering/shopping/channels pages, NetworkCard, etc. in small, committed steps.
- **Check “up to this point”:** When in doubt, open Cleaned and this file — that’s the agreed baseline; everything else is an addition.
