# AROM: Change Report

A plain-language log of what changed in the app, written for the team rather than for developers. Newest entries first.

- **This file** = what changed, why, and what you need to know or re-test.
- **AGENTS.md** = the technical context file the AI coding assistant reads. Different audience, much more detail. You do not need to read it.

Each entry lists the commit it landed in, so you can match it to a version of the site.

---

## 3 Oct 2026: Comprehensive Natural Khmer Localization, Anti-AI Typography, and Icon Standards

Commit `6eca0fd`. No database step: state is stored in memory and browser local storage.

**Why.** The initial Khmer translations in the app felt robotic, stiff, and machine-translated. Furthermore, generic 4-pointed star sparkles and loose hyphens made the application feel like a generic AI template. This update rewrote all user-facing copy across every screen into authentic, warm, and clinical Khmer, established strict anti-AI typography rules (natural Khmer first, English in parentheses), and replaced all generic AI icons with calming, clinical wellness symbols.

**What changed for users:**

- **Authentic, natural Khmer across every screen.** Content across Home, Profile Settings, MindGuide, Practice Exercises, Learning Modules, Emotion Detection & Reflection Journal, Therapist Directory & Booking, and Community now reads like it was written by an empathetic Cambodian mental health counselor.
- **Clear bilingual phrasing.** Important terms now show the natural Khmer term first followed by the English equivalent in parentheses, such as `ភាពតានតឹង (Burnout)`, `ការថប់បារម្ភ (Anxiety)`, `ដំណេក (Sleep)`, `ការតាមដានរោគសញ្ញា (Symptom Detection)`, and `អនឡាញ (Online)`.
- **No robotic AI punctuation.** Completely removed em dashes and loose hyphens from titles, descriptions, and labels across the entire interface.
- **Clinical, calming wellness icons.** Replaced all 4-pointed star AI symbols with human-centered wellness icons including `Compass`, `Lightbulb`, `UserCheck`, `CalendarCheck`, `MaskIcon`, and `ShieldCheckIcon`.
- **Complete therapist booking flow in Khmer.** Booking dates now render with natural Khmer weekdays (ច័ន្ទ, អង្គារ, ពុធ) and months, with clear session types (`អនឡាញ (Online)` and `ជួបផ្ទាល់ (In Person)`). Replaced missing fallback dashes with reassuring labels.
- **Authentic community experience.** Support groups now feature Khmer discussion titles, safety guideline checklists, mentor credentials, and active group chat streams in Khmer.

**What changed for the team:**

- **Centralized language getters in `lib/therapists.ts` and `lib/booking.ts`.** All therapist names, roles, bios, and booking time slots now have typed helper functions (`getTherapistName`, `getTherapistRole`, `getSpecialtyLabel`, `getMeetingTypeLabel`, `getPeriodLabel`), making it easy to add new practitioners without touching UI templates.
- **Strict rules added to `AGENTS.md`.** Rule 6 (no em dashes or loose hyphens) and Rule 7 (no sparkles icons) prevent future AI assists from re-introducing robotic copy or generic star icons.
- **Verified zero TypeScript compiler errors.** `npx tsc --noEmit` runs completely clean across all 49 modified files.

**What to re-test:**

- Switch language to Khmer using the top language toggle: verify all navigation, headings, and cards switch to natural Khmer;
- Open `/detection/journal`: check that moods and question chips show natural Khmer with English in parentheses, like `ស្ងប់ចិត្ត (Calm)` and `ភាពតានតឹង (Burnout)`;
- Open `/professional`: check the therapist directory filters, click on Dr. Sopheap Chan, and tap "Book Appointment" to walk through the 3-step booking flow;
- On the booking review screen, verify the sidebar summary shows the therapist details with no missing values or stray dashes;
- Open `/community`: verify group titles show authentic Khmer, enter a group hub, check the guidelines card, and switch between Chat, Activities, and Members tabs;
- Send a chat message or attach a test file in the group hub: verify the message appears with the sender badge and time.

---

## 3 Oct 2026: Guided Question-by-Question Reflections with Voice Input

Commit `2fcd76f`. No database step.

**Why.** The original journal reflection screen only offered a single unstructured text box, which made users feel lost or intimidated when writing about their feelings. Adding guided, question-by-question reflection prompts with voice dictation helps users unpack their emotions gently and easily.

**What changed for users:**

- **Step-by-step guided questions.** Users can reflect on their feelings through structured prompts with the ability to add preset wellness questions.
- **Voice recording support.** Tap the microphone button to dictate journal thoughts directly instead of typing everything by hand.
- **Saved reflection summary.** Upon finishing, users see today's mood breakdown and reflection summary immediately.
- **Reflection history.** Users can review past reflections and review emotional insights over time.

**What changed for the team:**

- Componentized reflection states in `app/detection/journal/page.tsx` with clear steps (Entry form, Saved view, History log).

**What to re-test:**

- Visit `/detection/journal`, select a mood like `ស្ងប់ចិត្ត (Calm)`, answer the prompt questions, and press Save Reflection;
- Test the microphone voice button on prompts and the general note textarea;
- Check the History tab to verify past reflections appear in chronological order.

---

## 3 Oct 2026: Interactive Home Progress Section and Community Header Harmonization

Commit `62a63bf`. No database step.

**Why.** The home screen needed an immediate sense of weekly emotional momentum, while the community screen header needed to feel visually consistent with the rest of the app.

**What changed for users:**

- **Weekly mood timeline.** Users can inspect their emotional progression across the week on the home screen.
- **Consistent header.** The community screen now uses the unified brand header matching the rest of the application.

**What changed for the team:**

- Harmonized header components across features to reduce duplicate layout code.

**What to re-test:**

- Open Home (`/`) and tap different days in the weekly mood progress bar to inspect notes and mood ratings;
- Navigate to `/community` and confirm the top header aligns with the Home and MindGuide screens.

---

## 3 Oct 2026: Figma-Accurate Mood Icons and Clinical Wellness Labels

Commit `57e0a15`. No database step.

**Why.** Raw text emojis and generic AI star badges looked cheap and unpolished in the journal summary card.

**What changed for users:**

- **Custom Figma mood illustrations.** Journal summaries now feature custom illustrations instead of generic phone emojis.
- **Calming clinical labels.** Reassuring wellness terms replace robotic diagnostic language.

**What changed for the team:**

- Integrated Figma icon assets into the mood detection components.

**What to re-test:**

- Complete a journal entry and verify the mood icon rendered on the reflection card matches the Figma design system.
