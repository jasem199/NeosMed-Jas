## Family Management — Full Flow Documentation

---

### Overview
The Family section has two distinct sides. A user can **share their own medicine data** with family members by adding them or sending an invite. A user can also **view another person's medicine data** if that person has added them or sent them an invite. Both directions are managed from the same Family tab. Family members with access can see the full medicine list, intake history and stock history of the person who shared with them.

**Reasoning:** A bidirectional family model reflects real caregiving relationships. A parent may monitor a child's medicines while simultaneously being monitored by another family member. Both roles can coexist for the same user in the same app.

---

### Entry Point
**Bottom Navigation Bar** → **Family tab** (People icon)

---

## Screen 1 — Family Home Screen

### Layout
- Top Bar: NeosMed logo left, Profile avatar right
- Screen title: **"Family"** left aligned, medium bold
- Two clearly separated sections on the main canvas:
  - **"People I'm sharing with"** — members the user has added or invited
  - **"People sharing with me"** — members who have added or invited the user

### Section 1 — People I'm Sharing With
- Lists all members the current user has added or invited
- Each member card shows:
  - Avatar / initials circle
  - Member name
  - Relationship label
  - Access status tag: **Active** (green) / **Pending** (amber, invite not yet accepted) / **Paused** (gray)
  - Chevron icon — tapping opens member detail screen
- **"+ Add or Invite"** button at top right of this section

### Section 2 — People Sharing With Me
- Lists all members who have added or invited the current user
- Each card shows:
  - Avatar / initials circle
  - Their name
  - Their relationship label to the user
  - Chevron icon — tapping opens their shared data screen

### Empty State — Both Sections Empty
- Single illustration with message **"Your family circle is empty"**
- Subtext: "Add a family member or join someone's circle to get started"
- Two CTAs:
  - **"+ Add or Invite Member"**
  - **"Join with a Code"**

### Empty State — Only One Section Empty
- Section shows a muted text: "None yet" with a small inline CTA relevant to that section

**Reasoning:** Separating the two directions on the home screen prevents confusion about who is monitoring whom. Pending status on invite cards lets the user know when an invite has not been accepted yet.

---

## Flow 1 — Adding or Inviting a Family Member

### Flow Structure
User chooses to either add a member directly by phone number or invite them via a shareable code or email link. Both paths end with the member gaining access to the user's full medicine data, intake history and stock history.

---

### Entry Point
**Family Home Screen** → **"+ Add or Invite"** button

---

### Step 0 — Choose Method Bottom Sheet
Triggered immediately on tapping **"+ Add or Invite"**
Three options presented as tappable list items:
- 📱 **Add by Phone Number** — for users already on NeosMed
- 🔗 **Share Invite Link** — generates a link sent via any app (WhatsApp, email, etc.)
- 🔑 **Share Invite Code** — generates a short numeric or alphanumeric code the member enters manually

**Reasoning:** Multiple invite methods cover different user comfort levels. Phone number add is fastest if both users are on the app. Invite link works best for WhatsApp sharing which is dominant in Bangladesh. Code works when sharing verbally or in person.

---

### Path A — Add by Phone Number

**Step 1 — Member Identity**
- **Full Name** — Text input, required
- **Relationship** — Tap to select chip group (Mother / Father / Son / Daughter / Spouse / Sibling / Other)
- If "Other" selected, inline text input appears: "Specify relationship"
- **Phone Number** — Numeric input, required
- Helper text: "This person must have NeosMed installed"
- **Next** button — disabled until all required fields filled

**Step 2 — Set Access & Notifications**
- Section header: **"What can they see?"**
- **Medicine List** — Toggle (on, locked — cannot be turned off)
  - Subtext: "They will see all your medicines"
- **Intake History** — Toggle (on by default)
  - Subtext: "They will see your daily taken and missed history"
- **Stock History** — Toggle (on by default)
  - Subtext: "They will see your current stock levels"
- Divider
- Section header: **"Notifications"**
- **Medicine time alerts** — Toggle (on by default)
  - Subtext: "They get notified when it is your medicine time"
- **Missed dose alerts** — Toggle (on by default)
  - Subtext: "They get notified if you miss a dose"
- **Low stock alerts** — Toggle (off by default)
  - Subtext: "They get notified when your stock is low"
- **Next** button at bottom

**Reasoning:** Medicine list access is locked on because it is the foundation of sharing — there is no point adding a member if they cannot see the medicine list. All other toggles are optional. Separating data access from notification permissions gives the user precise control.

**Final Screen — Review & Confirm**
- Screen title: **"Looks good?"**
- Summary showing:
  - Name, Relationship, Phone Number — each with edit icon
  - Data access settings — with edit icon
  - Notification settings — with edit icon
- **Primary CTA: Confirm & Add Member**
- **Secondary action: Go Back**

---

### Path B — Share Invite Link

**Step 1 — Member Identity**
- Same fields as Path A Step 1 (Name, Relationship)
- No phone number field — link handles the connection

**Step 2 — Set Access & Notifications**
- Same toggles as Path A Step 2

**Step 3 — Share the Link**
- A unique invite link is generated
- Screen shows:
  - Message: **"Share this link with [Name]"**
  - Link displayed in a styled box with a **Copy** icon
  - **"Share via..."** button — opens native share sheet (WhatsApp, email, SMS, etc.)
  - Helper text: "This link expires in 48 hours. They must have NeosMed installed."
  - Link status: **Pending** until accepted
- **Done** button returns user to Family Home screen

**Reasoning:** 48 hour expiry on invite links balances convenience with security. Native share sheet is used instead of hardcoded WhatsApp button to respect the user's preferred communication app.

---

### Path C — Share Invite Code

**Step 1 — Member Identity**
- Same fields as Path A Step 1 (Name, Relationship)

**Step 2 — Set Access & Notifications**
- Same toggles as Path A Step 2

**Step 3 — Show the Code**
- A short 6 character alphanumeric code is generated (e.g. **MED·4X9**)
- Screen shows:
  - Large bold code in center, easy to read
  - **Copy** icon next to the code
  - Helper text: "Ask [Name] to enter this code in their NeosMed app under Family → Join with a Code"
  - Code expiry timer shown: "Expires in 48 hours"
  - **Refresh** icon to generate a new code if needed
- **Done** button returns user to Family Home screen

**Reasoning:** A short readable code is ideal for verbal sharing — reading a 6 character code over a phone call or in person is practical. Dot separator in the code (MED·4X9) improves readability for aged users.

---

### Error States — Adding / Inviting Flow
- **Name empty** — Inline error "Please enter a name"
- **No relationship selected** — Chip group shake with message "Please select a relationship"
- **Phone number empty** — Inline error "Phone number is required"
- **Invalid phone number** — Inline error "Please enter a valid phone number"
- **Phone number not registered on NeosMed** — Warning banner "This number is not registered on NeosMed. Try inviting them with a link or code instead" with quick action buttons
- **Duplicate member** — Warning "This person is already in your family circle"
- **Link generation failed** — Error toast "Couldn't generate invite link. Please try again" with Retry
- **Code generation failed** — Error toast "Couldn't generate invite code. Please try again" with Retry
- **All notifications turned off** — Soft warning "They won't receive any notifications. Are you sure?" Does not block proceeding

---

## Flow 2 — Joining Someone's Circle

### Flow Structure
User receives an invite via link or code from another NeosMed user and joins their circle. After joining, the user can view the inviter's full medicine list, intake history and stock history.

---

### Entry Point — Three ways
1. **Family Home Screen** → **"Join with a Code"** button (visible on empty state and as a persistent button at bottom of Section 2)
2. **Tapping an invite link** received via WhatsApp, email or SMS — deep links directly into the app
3. **Notifications tab** — if a direct add by phone number was made, a notification appears with Accept / Decline

---

### Path A — Join with a Code

**Step 1 — Enter Code**
- Full screen input with large code entry field (6 character, auto-formats with dot separator)
- Helper text: "Enter the code shared by your family member"
- **Verify** button — disabled until 6 characters entered
- On verify, app validates the code and shows the inviter's details

**Step 2 — Review Invitation**
- Shows:
  - Inviter's name and relationship they assigned
  - What data you will have access to (Medicine List, Intake History, Stock History based on their settings)
  - What notifications you will receive
- **Primary CTA: Accept & Join**
- **Secondary action: Decline**

**Reasoning:** Showing exactly what access is being granted before accepting builds trust and prevents surprise. User should know what they are agreeing to see before joining.

---

### Path B — Join via Invite Link
- Tapping the link opens NeosMed directly to the Review Invitation screen (Step 2 above)
- If app is not installed, link redirects to app store / PWA install page
- After install and signup, link resumes to Review Invitation screen

---

### Path C — Accept Direct Add (Phone Number)
- A notification appears: **"[Name] has added you to their family circle"**
- Tapping notification opens Review Invitation screen
- Same Accept / Decline flow as above
- Also visible in **Notifications tab** as an actionable card

---

### Error States — Joining Flow
- **Invalid code** — Inline error "This code is invalid. Please check and try again"
- **Expired code** — Inline error "This code has expired. Ask them to share a new one"
- **Already in circle** — Message "You are already connected with this person"
- **Invite link expired** — Full screen error "This invite link has expired. Ask them to send a new one" with CTA "Go to Family"
- **Network error on verify** — Error toast "Couldn't verify code. Check your connection and try again"

---

## Flow 3 — Viewing a Shared Member's Data

### Entry Point
**Family Home Screen** → **"People Sharing With Me"** section → Tap a member card

---

### Shared Data Screen Layout
- Back arrow top left
- Member name as screen title
- Relationship label below name
- Three tabs across the top:

**Tab 1 — Medicines**
- Full list of the member's medicines
- Each card shows: Medicine name, Dosage, Unit, Frequency, Intake advice
- Read only — no edit or delete actions available
- If no medicines added: "No medicines added yet"

**Tab 2 — Intake History**
- Date picker at top (same horizontal strip as home screen)
- Below: medicines grouped by time category for selected date
- Each medicine shows: Name, Scheduled time, Status (Taken / Missed / Pending)
- Default view: Today
- User can scroll back to past dates

**Tab 3 — Stock**
- List of all medicines with their current stock levels
- Each item shows: Medicine name, Current stock, Low stock threshold, Stock status tag (OK / Low / Critical)
- Read only

**Reasoning:** Three tabs mirror the three data types the member chose to share. Tab structure keeps each data type clean and focused. Read only across all tabs is enforced — a family member can monitor but never modify another person's data.

---

## Flow 4 — Managing Member Permissions (People I'm Sharing With)

### Entry Point
**Family Home Screen** → Tap a member card in **"People I'm Sharing With"** → Member Detail Screen

---

### Member Detail Screen Layout
- Back arrow top left
- Member name as screen title
- Three dot menu top right: Edit Member, Remove Member

**Member Info Card**
- Avatar / initials, Name, Relationship, Phone number, Access status tag

**Data Access Card**
- Title: **"What they can see"**
- Medicine List — locked on, non-toggleable
- Intake History — toggle, saves instantly
- Stock History — toggle, saves instantly

**Notifications Card**
- Title: **"Notifications"**
- Medicine time alerts — toggle, saves instantly
- Missed dose alerts — toggle, saves instantly
- Low stock alerts — toggle, saves instantly
- Each change shows a brief toast confirmation

**Invite Status Card** (shown only if invite is still pending)
- Status: **"Invite Pending"**
- Invite method shown (Link or Code)
- **Resend Invite** button
- **Cancel Invite** button

**Reasoning:** Resend invite is important for the common case where a family member lost or forgot the link or code. Cancel invite allows the user to revoke an unaccepted invite without waiting for expiry.

---

## Flow 5 — Removing a Member

### Entry Point
**Member Detail Screen** → Three dot menu → **"Remove Member"**

### Behavior
- Confirmation bottom sheet:
  - Title: **"Remove [Name]?"**
  - Subtext: "They will lose access to your medicine data and stop receiving notifications"
  - **Primary CTA: Remove** (destructive red)
  - **Secondary: Cancel**
- On confirm: member removed, user returns to Family Home
- Success toast: **"[Name] has been removed from your family circle"**
- The removed member's app updates immediately — their access to shared data is revoked

**Reasoning:** Immediate revocation on removal is a trust and privacy requirement. A user removing a member should have confidence that access is cut off instantly.

---

### General Error States
- **Network error on Family Home load** — "Couldn't load family data. Check your connection" with Retry
- **Failed to save permission toggle** — Toggle reverts, error toast "Couldn't update. Please try again"
- **Failed to remove member** — Error toast "Couldn't remove member. Please try again"
- **Failed to accept invite** — Error toast "Couldn't join. Please try again"

---

### General Interaction Rules
- Family tab badge shows total count of active connections (both directions)
- Pending invites shown with an amber badge on the Family tab icon
- All permission toggles save instantly — no save button required
- Phone number cannot be edited after adding — user must remove and re-add
- A user can be in both sections simultaneously — sharing their data with someone while also viewing someone else's data
- Leaving someone's circle (removing yourself from "People Sharing With Me") available via three dot menu on their card
- Data access is always read only for the receiving family member — no editing permissions under any circumstance