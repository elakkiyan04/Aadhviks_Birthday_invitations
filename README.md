# Elora Moments – Premium First Birthday Digital E-Invitation
### Baby Krishna Themed Commercial Multi-Client Digital Invitation

A high-performance, mobile-first, animated digital first birthday e-invitation built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed specifically for **Elora Moments** to personalize and sell via Instagram & WhatsApp.

---

## 🌟 Key Features

1. **Immediate Fullscreen Animated Opening**:
   - Opens immediately on URL visit without traditional homepages.
   - Cinematic 6-stage reveal: gentle peacock feathers, golden light, Baby Krishna illustration, baby's name reveal, "You're Invited", and first birthday title.
   - Replay button for guests to re-experience the opening sequence anytime.

2. **Baby Krishna Color & Aesthetic Theme**:
   - Palette: Peacock Blue (`#174F68`), Deep Krishna Blue (`#17345C`), Antique Gold (`#D5AE61`), Ivory Cream (`#FFF8E8`), Soft Sky Blue (`#DCEEF4`), and Peacock Green (`#287B70`).
   - Custom SVG artwork: Baby Krishna illustration, Peacock Feathers, Golden Flute (Bansuri), Butter Pot (Matka), Blooming Lotus, and ornate temple archways.

3. **Complete Bilingual Support (Tamil & English)**:
   - English & authentic Sri Lankan Tamil (தமிழ்) with instant toggle.
   - Complete translations for every section: opening, greetings, countdown, venue, RSVP form, wishes, and footer.
   - Language switching preserves audio playback, countdown, and active form states.

4. **Multi-Client Reusable Architecture**:
   - Centralized configuration in `lib/birthdays/config.ts`.
   - Supports unlimited birthday invitations from a single deployment:
     - `/birthday/aadhvik` (Default Demo)
     - `/birthday/niya`
     - `/birthday/aaron`
   - Configurable baby name, parents' names, date, time, venue, address, Google Maps URL, photos, and RSVP rules.

5. **Live Birthday Countdown**:
   - Real-time days, hours, minutes, seconds countdown locked to `Asia/Colombo` timezone.
   - Automatic celebration status when live, with negative number prevention.

6. **Interactive Event & Gallery Features**:
   - Google Maps button using client's exact configurable URL (no coordinates or fake locations).
   - Milestone photo gallery with mobile touch support and fullscreen lightbox preview.
   - WhatsApp one-click sharing with pre-filled event summary and link.
   - Save the Date: Google Calendar button and direct Apple/Outlook `.ICS` calendar file download.

7. **RSVP & Birthday Wishes Backend**:
   - Server-side input validation, honeypot anti-spam protection, and duplicate prevention.
   - Dual-mode storage: Supabase PostgreSQL for cloud production, and an automatic in-memory demo store for testing before database setup.

8. **Private Client RSVP Results Portal**:
   - Accessible at `/birthday-rsvp/[slug]` (e.g. `/birthday-rsvp/aadhvik`).
   - Protected with client access passcode (Demo passcode: `aadhvik2027`).
   - Displays total responses, attending headcount, declined responses, guest messages, and one-click **CSV Export**.
   - Strictly isolated per client slug.

9. **Background Krishna Flute Music**:
   - User-initiated audio playback with floating controller (Play/Pause, Mute/Unmute, audio wave visualizer).
   - Built-in Web Audio API Krishna flute synthesizer fallback (Raag Bhupali/Mohanam) if MP3 audio is offline or blocked.

10. **Elora Moments Commercial Signature Footer**:
    - Business Name: **ELORA MOMENTS**
    - Tagline: *"Make Every Moment Memorable"*
    - Phone: `074 284 0354` (`+94 74 284 0354` / `tel:+94742840354`)
    - WhatsApp Order CTA: `https://wa.me/94742840354` with prefilled message *"Hi Elora Moments, I would like to order a digital invitation."*

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. It automatically redirects straight to the live Aadhvik demo invitation at `/birthday/aadhvik`.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run it.
4. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
*(Note: If left empty, the application runs in local Demo Mode with sample RSVPs).*

---

## 🎨 How to Add or Personalize a Birthday Client

To personalize an invitation for a customer:
1. Open `lib/birthdays/config.ts`.
2. Add a new client entry under `BIRTHDAY_CLIENTS`:
   ```typescript
   mybaby: {
     id: "bday-mybaby-003",
     slug: "mybaby",
     babyName: { en: "MyBaby", ta: "மைபேபி" },
     celebrationDate: "2027-05-10",
     celebrationTime: "6:00 PM",
     venueName: { en: "Grand Hall", ta: "கிராண்ட் அரங்கம்" },
     address: { en: "Colombo, Sri Lanka", ta: "கொழும்பு, இலங்கை" },
     googleMapsUrl: "https://maps.google.com/?q=...",
     clientAccessCode: "mybaby2027",
     ...
   }
   ```
3. Share the URL with your client:
   - Invitation: `https://your-domain.com/birthday/mybaby`
   - Client RSVP Results: `https://your-domain.com/birthday-rsvp/mybaby`

---

## 🌐 Free Hosting Deployment (Netlify & GitHub)

1. Push your repository to GitHub.
2. Sign in to [netlify.com](https://www.netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
3. Select your GitHub repository.
4. Set build settings:
   - Build Command: `npm run build`
   - Publish directory: `.next`
5. Under **Environment variables**, set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Deploy!

