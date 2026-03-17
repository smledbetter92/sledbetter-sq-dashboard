# Alignment – sidebar bottom & key concepts (no build yet)

**Purpose:** Single source of truth for what we're building. Get this right first; then build page by page.

---

## Sidebar bottom icons – what they represent

### 1. Circle numbers (1, 2, 3)
- **Versions of this dashboard.**
- **3 = current version** – the one we work in.
- (1 and 2 are legacy/other versions.)

### 2. Contact-style icons (new.svg / returning.svg)
- **State of any given page**, not a separate page:
  - **New customer** (`new.svg`): What **new** customers see.
    - Some things already set up; others in an **empty** state.
    - Example: **Brand cards in monogram form** – 48×60px, 12px rounded corners (no logo yet).
  - **Returning customer** (`returning.svg`): What **returning** customers see.
    - Mostly everything set up (e.g. **brand cards with logos**).
- We'll go **page by page** to update the UI for both states.

### 3. Dark mode icon
- Switches UI between **light** and **dark**.
- **Styles:** Pulled from the dark mode work we did in the **website editor modal**.
- **Behavior:**
  - Icon should **animate/rotate** when switching.
- **Details we got right:**
  - Pills: **color correction for dark mode**.
  - Dark buttons: **correctly inverted** (white button with dark text).

### 4. Cash App icon
- **Onboarding button** (just starting; TBD).
- No further spec yet.

---

## UI / Components (standardized)

### Cards
- **32px rounded corners**, border. Used for: My business, Locations, Connections, etc.
- **Standardized with variations:**
  - Different header types
  - Sub text
  - Dividers
  - Rows with icon/image boxes
  - Side text in rows
  - Pills
  - Arrows
- These cards are **key** – used throughout the app.

### Buttons
- **Naming:** Grey = **secondary button**, dark = **primary button**. (Not "standard" – use secondary/primary.)
- **Dark mode:** Primary and secondary are **equal** (correct inversion: white button with dark text in dark mode).
- Buttons can have **icons** or **dropdown chevrons**.

### Modals
1. **Full-screen modal**
   - Close (X), **Cancel** (secondary), **Save** (primary).
   - Can have **sidebars** (left and/or right) with **content area in center** (800px wide).
2. **Standard modal**
   - Like **upgrade modal** and **brand switcher modal**.
   - These two should **share the same animation** in and out.
3. **Blade**
   - (Account-blade style – slides in from side.)

### Icons
- Live in **assets folder**.
- Should **change for dark mode to white** (e.g. in dark theme, icons render white).

---

## Key changes (what we're aligning to)

### Business profile
- **Top-level page** (like Home) – **moved out of Online** into parent/sidebar main level.
- **Accessed by the brand card header:** the whole thing (brand card image, business name, $cashtag) is a **nav button**:
  - 16px inner padding, 12px rounded corners, hover state.
  - Click → loads Business profile as the right-side page/content.
- **Animated text on selection:** $cashtag pushes **up/out**, "Business profile" text pushes **up/in**; stays in that state when selected.

**Business profile page content** – same card structure, **brand card in header** (what we have now).  
**Rows:** Brand & about, Neighborhoods ($cashtag with pill), Staff & permissions, Devices, Settings.

- **New customer:** **Monogram** brand card. Neighborhoods = **inactive** pill. **Staff & permissions** – side text "3 members, 2 admins". **Devices** – "3 POS, 2 printers, 2 modes". **Settings** – "Payments, banking, tax forms".
- **Returning customer:** **Logo** brand card. Neighborhoods = **Active** pill. Same rows with appropriate content.

**Locations card:** What we have now for **returning**. **New customer** = only **Brookhaven** (one location).

**Connections card:** What we have now for returning, but **remove the OpenAI / ChatGPT row** (no row between Apple and Meta).  
- **New customer:** No linked business (e.g. no Capitola Coffee). Only **Google Business Profile** connected. Apple, OpenAI, Meta show **side text only** – short description of what they are.  
- **Returning:** As we have now (with connections), minus OpenAI row.

### Website page
- **Same structure** (cards). **Cards:** **Pages**, **Domains**.

**Pages card**
- **New customer:** One row – **Order online** – with **thumbnails** below it: Business header, Menu, Footer. Thumbnails are a **variation on the row** (addition below the row). Only add a **divider below** if another row follows.
- **Returning customer:** Rows: **Homepage**, **Order online**, **About us** – each with thumbs (same thumbnail pattern).

**Domains card**
- **Returning customer:** First row = **domain itself** (e.g. "joybakeshop.com") with **Active** pill – this was previously "Connect domain", now shows the connected domain name. Next row = **cash.app** URL with **side text** "Redirects to joybakeshop.com". **Connect website** row remains the same.
- (New customer for Domains: to be aligned if needed – e.g. connect domain as primary, etc.)

### Online (submenu)
- **Website is the first page** (first item under Online).
- **Removed** the "Customize your website" card altogether.
- Stopped using that **start card** everywhere.

### Ordering page
- **2 cards:** **Menus**, **Fulfillment**.
- **New customer:**
  - **Menus:** Header only + primary button **"Add menu"**. Card hugs content – 32px padding all around.
  - **Fulfillment:** Header + rows: Pickup, Curbside pickup → **divider** (16px above/below) → Delivery, Seller-powered delivery → **divider** → Shipping.
- **Returning customer:**
  - **Menus:** "Add menu" becomes **secondary**; **rows appear** with two menus (e.g. Lunch, Drinks).
  - Fulfillment: same structure, filled as appropriate.

### Booking page
- **Same structure** as ordering (cards as the pattern).
- **Cards:** Appointments, Services, Staff, Availability.
- **New customer:** Only the **first card** has a primary button.
- **Returning customer:** Each card filled with rows (we had come up with some with side text, etc.).

### Shopping page
- **Same structure.** Cards: **Collections**, **Fulfillment**.
- **Fulfillment** = same card as on Ordering page.

### Neighborhoods page
- **Day one** state = **new customer** view.
- **Month over month** state = **returning customer** view.
- **Remove the dropdown button in the header** (no pill/dropdown for Day one / Month over month in header).
- **Cards:** Network, Followers, Orders, Messages. Match structure to ordering-page cards.
- **Network:** Secondary button with **location name** + **dropdown chevron**.
- **Followers:** "View insight" button; two rows: **Followers**, **Reachable customers**. Row icon = same container style but **84px wide × 40px tall**, text **centered inside**, styled like row title.
- **Returning customer:** Followers card pulls in **graphs** – only **Visit frequency** and **Average order value**. Do a better job with **dark mode on those graphs**.

### Sales channels
- Not built yet. Will **share same structure** (cards, etc.).
- Focus: connecting/setting up **DoorDash, Uber Eats**, etc., and others that relate to **booking** or **shopping** as well.

### Add more (sidebar)
- **Now opens the blade** we have (same blade UI – slides in from side).
- **TBD** on what that blade will contain / show.

---

## Next
- Continue aligning (screenshots, page-by-page detail as needed).
- No building until alignment is locked.
