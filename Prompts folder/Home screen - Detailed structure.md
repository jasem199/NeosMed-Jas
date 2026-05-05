### Home screen - Detailed structure

A single screen that serves as the app's command center. Fixed top bar and bottom nav. Scrollable main canvas in between. Floating action button triggers a bottom sheet for adding medicines.

---

### Top Bar

- **Left:** NeosMed logo (wordmark or icon + wordmark)
- **Right:** Profile avatar (circular, tappable — opens profile screen)
- Fixed, does not scroll
- Background: solid, subtle shadow to separate from content below

**Reasoning:** Logo on left establishes brand presence on every session open. Avatar on right is a universal pattern for profile access. Keeping it minimal avoids clutter at the top.

---

## Date Picker Section — Structure

---

### Layout (Top to Bottom)

- Horizontal scrollable date strip
- Below the strip: medium text line showing current selected date
- Below text line: contextual "Today" button when applicable

---

### Calendar Icon

- Position: **Left side of the date strip**, vertically centered
- Icon: 📅 Calendar icon, muted color by default
- **Visibility:** Hidden when user is on today's date and has not scrolled the date strip. Appears as soon as user swipes the date strip in either direction. this button replace the most left date placeholder.
- Tapping the calendar icon opens a **bottom sheet with a full calendar**

**Reasoning:** Hiding the calendar icon by default keeps the top section minimal for the most common use case — viewing today. Revealing it only when the user starts navigating signals that it is a navigation aid, not a primary action.

---

### Calendar Bottom Sheet

- Triggered by tapping the calendar icon
- Full calendar view inside a bottom sheet
- Shows current month by default, or the month of the currently selected date if user has navigated away
- **Month navigation:** Swipe left and right to move between months, or tap left/right arrow icons at top of calendar
- Month and year shown as a bold header at top center of the calendar (e.g. **May 2026**)
- Week header row starts from **Sat** to align with the date strip
- Selected date highlighted in primary color
- Today's date always has a subtle underline or dot indicator even when not selected
- Future dates are visible but grayed out and non-tappable
- Tapping a date closes the bottom sheet, date strip scrolls and snaps to the selected date, and text line below updates accordingly
- Sheet dismissible by swiping down or tapping outside

**Reasoning:** A full calendar bottom sheet allows users to jump to any past date instantly without endlessly swiping the horizontal strip. Month swipe is more intuitive than a dropdown for aged users. Keeping future dates visible but disabled maintains context without creating confusion.

---

### Date Text Line (Below Strip)

- When on today: **"Today, Tuesday 5 May"**
- When on another date: **"Monday, 4 May"** — "Today" prefix removed
- Font: Medium weight, moderate size, left aligned

---

### Contextual Today Button

- Appears below the date text line when user is on a different date
- If selected date is before today: **"← Today"** aligned to the right
- If selected date is after today: **"Today →"** aligned to the left
- Tapping snaps date strip back to today and updates text line
- Disappears when user returns to today

---

### Interaction Rules

- Calendar icon hidden on today, visible as soon as date strip is swiped
- Calendar bottom sheet opens only via calendar icon tap
- Selecting a date from calendar closes the sheet and syncs the date strip instantly
- Month swipe in calendar is gesture based with left and right arrow fallback icons
- Future dates non-tappable in both the date strip and the calendar
- Date strip and calendar always stay in sync — selecting from either updates the other
- Today indicator dot always visible on calendar regardless of selected date

---

### Main Canvas (Scrollable)

- Sits between the date section and bottom nav
- Full width, vertically scrollable
- Daily progress bar at the very top of canvas — thin bar showing "X of Y medicines taken today" with a small label
- Medicines grouped by time category with section headers:
    - 🌅 **Morning**
    - ☀️ **Afternoon**
    - 🌙 **Evening**
    - 🌑 **Night**
- Each section header shows the time label on left and **"Check All"** button on right
- **Medicine Card** contains:
    - Medicine name (large, bold)
    - Dosage + unit (e.g. "1 Pill", "5ml Syrup")
    - Intake advice tag (Before meal / After meal / With meal)
    - Large circular check button on the far right
- **Taken Section** — appears at the bottom of the canvas after first medicine is confirmed. Cards here are muted/lower opacity with strikethrough on name
- **Missed Section** — appears between active groups and taken section. Cards have a subtle red/amber left border
- Low stock alert banner — appears as a dismissible card above the first medicine group if any medicine stock is critically low. Shows medicine name and a "Buy Now" link

**Reasoning:** Progress bar gives instant motivation and context. Grouping by time of day reduces cognitive load. Low stock banner placed at top of canvas ensures visibility without interrupting the medicine confirmation flow. Taken and missed sections at bottom keep the active list short and focused.

---

### Floating "+" Add Button

- Position: Bottom right, above bottom nav bar
- Shape: Circular, primary color, medium shadow
- Icon: "+" plus icon in white
- **On tap:** Triggers a bottom sheet with 2 options:

**Bottom Sheet — Add Medicine**

- Sheet title: "Add Medicine"
- **Option 1:** 💊 Add Manually — tapping navigates to manual add flow
- **Option 2:** 📷 Scan Prescription —
    - 📷 Open Camera
    - 🖼️ Choose from Gallery
- Sheet is dismissible by swiping down or tapping outside

**Reasoning:** Floating button is a universal mobile pattern for primary actions. Nesting scan options in a secondary sheet keeps the first sheet clean and unambiguous. Two tap maximum to reach any add action.

---

### Bottom Navigation Bar

Fixed at the bottom. 5 items with icon and label:

| Position | Icon | Label |
| --- | --- | --- |
| 1 | 💊 Pill icon | Medication |
| 2 | 👨‍👩‍👧 People icon | Family |
| 3 | 📦 Box icon | Stock |
| 4 | 📊 Chart icon | Reports |
| 5 | 🔔 Bell icon | Notifications |
- Active tab highlighted with primary color icon and label
- Inactive tabs in muted gray
- Notification tab shows a badge count if there are unread notifications
- Bar has a subtle top border and solid background to separate from canvas

**Reasoning:** 5 tabs cover all major sections of the app without requiring deep navigation. Stock and Reports as separate tabs signal to the user that these are first class features, not buried in settings. Notifications as a tab rather than just a top bar icon gives it more visibility and suits aged users who may miss small top bar icons.

---

### Empty States

- **No medicines added yet** — Main canvas shows a centered illustration with message "No medicines added yet" and a CTA "Add your first medicine" that triggers the same bottom sheet as the "+" button
- **No medicines scheduled for selected past date** — Message "No medicines were scheduled for this day"
- **All medicines taken for today** — Positive state with a small celebratory illustration "All done for today! Great job 💪"

---

### Interaction Rules

- Top bar and bottom nav are always fixed, never scroll
- Date strip scrolls independently from main canvas
- Selecting a date on the strip updates the main canvas content instantly
- Future dates beyond today are visible in the date strip but main canvas shows "No medicines scheduled" — no check actions available
- Past dates show view only mode — check buttons disabled
- Bottom sheet dismisses on outside tap or downward swipe
- Low stock banner is dismissible with a swipe right, reappears on next app open if stock still low
- Progress bar updates in real time as medicines are checked
- Floating "+" button stays visible while scrolling, does not hide on scroll down