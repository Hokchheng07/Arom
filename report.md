# AROM (អារម្មណ៍) — Project Feature Update Report

> **Last Updated:** September 2026  
> **Target Audience:** Teammates & Collaborators  
> **Status:** All core modules implemented, integrated, and verified.

---

## 📌 Project Summary
**AROM** is a bilingual (English & Khmer) mental health and emotional wellness web platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Motion**. It provides daily emotional check-ins, guided practices, community support groups, and verified professional therapist booking.

---

## 🚀 Recent Feature Updates & Highlights

### 1. 🧠 Emotion & Wellness Detection (`/detection`)
* **Quick Access Modal:** Triggered seamlessly from the laptop sidebar and the center navigation button on mobile.
* **Mood & Journal Integration:** Connected emotion detection directly to the Journal page with URL query parameter support (`?mood=...`) wrapped in a Next.js `Suspense` boundary.
* **Figma-Accurate Journal Summary:** Added an AI Journal Summary card positioned right above the journal history. Features authentic Figma mood icons and friendly, reassuring wellness labels rather than raw emojis.

### 2. 👥 Community & Support Groups (`/community`)
* **Figma-Aligned Group Hub:** Fully translated the Figma community design into interactive components.
* **Smart Group Access Flow:**
  * If already joined: clicking a group opens the group chat hub immediately.
  * If not joined: displays group details, rules, expectations, and a "Join Group" action first.
* **Group Mentor Cards:** Prominently displays the assigned mentor on top of the member list with their name, role, and professional experience.
* **Interactive Chat Bar:** Community chat message bar now supports attaching images and files directly alongside text messages (removed redundant "Create a Post" screen for a smoother chat experience).

### 3. 🩺 Professional Therapy Booking (`/professional`)
* **Therapist Directory & Filters:** Search and filter verified mental health professionals by specialization, availability, and language.
* **Detailed Profile Pages:** Therapist bio, qualifications, counseling approach, and pricing.
* **Interactive Booking Flow:** Multi-step appointment scheduling with date and time selection leading into a dedicated **Booking Complete** confirmation screen.

### 4. 🧘 Practice & Stress Management (`/practice`)
* **Interactive Breathing Exercises:** Guided animated breathing session with visual inhale/exhale pacing.
* **Managing Daily Stress:** Step-by-step coping strategies, stress-relief practices, and quick relaxation techniques.

### 5. 📚 Learn, Mindguide & Interactive Tips (`/learn`, `/tips`, `/mindguide`)
* **Home Page Integration:** The home screen daily wellness plan cards are now connected to community groups and interactive wellness tips.
* **Lesson Detail Views:** Structured mental health education modules with readable typography in both English and Khmer.

### 6. 🎨 Navigation, Styling & Technical Fixes
* **Unified Responsive Navigation:** Bottom navigation bar across mobile devices and a clean desktop sidebar.
* **Active State Fix:** Resolved the duplicate active green indicator on bottom navigation tabs.
* **Hydration Issue Resolved:** Fixed Next.js Server-Side Rendering (SSR) hydration mismatches by synchronizing `localStorage` (language & user state) inside `useEffect`.
* **Bilingual Typography:** Configured Google Fonts `Kantumruy Pro` for Khmer and `Inter` for Latin scripts.

---

## 🛠️ Tech Stack & Dependencies
* **Framework:** Next.js `16.3.5` (App Router)
* **Core:** React `19.2.8` & TypeScript `5`
* **Styling:** Tailwind CSS `v4` (`@tailwindcss/postcss`)
* **Animations:** Motion `13.4.0`
* **Icons:** Lucide React (`lucide-react`)
* **Form Handling & Validation:** `react-hook-form` + `zod`

---

## 🏃 How to Run the Project Locally

```bash
# 1. Install dependencies (if newly cloned)
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

### Key Routes to Test:
* **Home:** `http://localhost:3000/`
* **Emotion Detection & Journal:** Click the center navigation button or visit `http://localhost:3000/detection`
* **Community Groups:** `http://localhost:3000/community`
* **Therapists & Booking:** `http://localhost:3000/professional`
* **Practice Exercises:** `http://localhost:3000/practice`
* **Learning Modules:** `http://localhost:3000/learn`

---

## 📋 Suggested Next Steps for Collaboration
1. **Backend / Database Integration:** Hook up chat messages, journal entries, and bookings to a real backend (e.g., Supabase / PostgreSQL / Firebase).
2. **User Authentication:** Integrate real auth (NextAuth / Supabase Auth) with user profiles and session persistence.
3. **Khmer Translations Expansion:** Expand translation dictionaries across any newly added subpages.
