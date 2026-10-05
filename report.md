# AROM: Change Report

A plain-language log of what changed in the app, written for the team rather than for developers. Newest entries first.

- **This file** = what changed, why, and what you need to know or re-test.
- **AGENTS.md** = the technical context file the AI coding assistant reads. Different audience, much more detail. You do not need to read it.

Each entry lists the commit it landed in, so you can match it to a version of the site.

---

## 5 Oct 2026: Refined Duolingo Concept (Stepping-Stone Path, Aromi Mascot, Community Kindness Garden)

Commit `e98d505`. No database step: visual and interaction refinement inside isolated /preview sandbox.

**Why.** Copying Duolingo directly (neon lime green, aggressive fire streaks, owl) does not fit AROM's gentle mental wellness identity. Instead, we adapted the core concepts of Duolingo (the winding stepping-stone roadmap, bite-sized daily micro-actions, an empathetic botanical mascot, tactile 3D cards, and positive reinforcement) into AROM's soothing botanical green, cream, and terracotta design system.

**What changed for users:**

- **Winding Stepping-Stones Path (ផ្លូវសតិសហគមន៍).** Instead of a generic card list or a Duolingo clone, users navigate an organic curved S-path with 5 tactile stepping-stone nodes for peer circles and daily calm milestones.
- **Empathetic Mascot "Aromi" (អារម្មណ៍តូច).** Replaced the owl with an adorable, gentle blooming sprout companion who waves and speaks in friendly speech balloons beside active support circles.
- **Soothing Wellness Counters.** Replaced intense flame streaks and gems with gentle Mindfulness Streaks (`🌿 15 ថ្ងៃ`), Kindness Drops (`💧 24 តំណក់`), and Heart Blooms (`🌸 10 ផ្កា`).
- **Interactive Cheer Drop (Node 3).** Tap the sky-blue water droplet stone to send supportive cheer to a peer, awarding +5 Kindness Drops and a celebratory toast notification.
- **Community Kindness Garden.** Transformed Duolingo's competitive league/quest model into a collective wellness garden where peers water the garden together (82% bloomed) with a tactile "💧 ស្រោចទឹក (+5)" action.
- **Serene Tactile 3D Styling.** Chunky pushable buttons and speech bubbles rendered in AROM's deep forest green (`#245242`), sage mint, and warm terracotta instead of neon green.

**What changed for the team:**

- **Authentic brand alignment.** The sandbox now demonstrates how to translate gamification concepts into mental wellness without sacrificing clinical warmth, psychological safety, or brand identity.

**What to re-test:**

- Open `http://localhost:3000/preview` in your browser;
- Verify the winding green journey line connecting the 5 stepping-stone nodes;
- Check Node 1 (Check-in complete with checkmark);
- Observe Node 2: verify Aromi the sprout mascot waving next to the active Stress & Burnout Circle with an "Enter Chat" speech balloon;
- Click on Node 3 ("ផ្ញើតំណក់លើកទឹកចិត្ត ១"): verify the water droplet button animates, drops count increases to 29 💧, and a floating green toast appears;
- Scroll down to "Community Kindness Garden" and tap "💧 ស្រោចទឹក (+5)": verify the bloom bar animates and kindness drops increase;
- Tap "Enter Chat" or the active circle node to test the bubbly chat view with reaction pills (`💧`, `🌱`, `❤️`, `🙏`);
- Tap `🌿 Calm Sanctuary` at the top to toggle between both designs seamlessly.

---

## 5 Oct 2026: Duolingo-Style Gamified Community Design Sample in /preview Sandbox

Commit `186c702`. No database step: client-side visual exploration inside isolated sandbox route.

**Why.** Mental health and emotional peer support can sometimes feel intimidating or clinical. Exploring a playful, encouraging gamification model inspired by Duolingo (streaks, gem rewards, uplifting mascots, daily quests, and cheer leaderboards) offers a fun and low-pressure alternative for community connection. To protect all working production code, this entire interactive design experience was implemented inside the `/preview` sandbox route with a toggle switch, allowing the team and users to compare the Duolingo style side-by-side with the calm sanctuary design without risking any production changes.

**What changed for users:**

- **Duolingo-style wellness community experience.** In `/preview`, users can explore a gamified community interface featuring flame streaks (`🔥 37`), gem tokens (`💎 300`), and compassion hearts (`💖 5`).
- **Interactive wellness mascot and tactile 3D buttons.** Includes a friendly leafy wellness companion SVG, bouncy progress indicators, and Duolingo signature tactile 3D pushable buttons (`START CHAT`).
- **Daily Community Quests.** An interactive quest card where users can complete daily micro-actions (Mood Check-in, Explore Peer Circles, Send 1 Supportive Cheer) and earn gem rewards (+15 💎) with responsive feedback.
- **Weekly Cheers Leaderboard.** Displays community supporters with gold, silver, and bronze ranks along with current peer ranking.
- **Playful group chat stream.** High-contrast bubbly chat bubbles with support reactions (`❤️ លើកទឹកចិត្ត`, `👏 អស្ចារ្យ`, `🌱 រីកចម្រើន`) and real-time message sending that awards +5 gems.
- **Instant style toggle.** Switch between `🦉 Duolingo Style` and `🌿 Calm Sanctuary` with a single tap in the top control bar.

**What changed for the team:**

- **Zero production risk.** Main routes (`app/community/`, `app/page.tsx`, etc.) remain completely untouched.
- **Side-by-side visual evaluation.** Product managers, designers, and developers can test both design paradigms on live desktop and mobile frame viewports in real time.

**What to re-test:**

- Visit `http://localhost:3000/preview` in your browser;
- Verify that the default view loads with `🦉 Duolingo Style` selected;
- Check the top header stats: verify streak flame (`🔥 37`), gem counter (`💎 300`), and heart counter (`💖 5`);
- Under "Daily Community Quests", tap on the quest "ផ្ញើពាក្យលើកទឹកចិត្ត ១ (Send 1 Cheer)": verify the checkmark animates and gem count increases to 315 💎;
- Tap the 3D green button "ចូលជជែកក្នុងក្រុម (START CHAT)" or click "Chat" in the top bar to open the chat stream;
- Type a message in the input box and tap Send: verify the message appears as a green chat bubble and adds +5 gems;
- Tap quick cheer pills (`❤️ លើកទឹកចិត្ត`, `👏 អស្ចារ្យ`, `🌱 រីកចម្រើន`) below messages;
- Tap `🌿 Calm Sanctuary` in the top switcher to instantly switch back to the botanical calm design;
- Tap the language toggle `🇰🇭 ខ្មែរ / 🇺🇸 EN` to verify bilingual labels in both modes;
- Click "← ត្រឡប់ទៅកម្មវិធីពិត" to navigate back to `/community`.

---

## 4 Oct 2026: Isolated Design Sandbox Route (/preview) for Risk-Free Redesign Exploration

Commit `59aca02`. No database step: completely isolated design environment with zero impact on production screens.

**Why.** When exploring new aesthetic directions (such as a calmer, prettier sanctuary design for the Community module), editing production files directly risks breaking working features, component bindings, or stored state. This new `/preview` route provides a self-contained, interactive design sandbox where new visuals, organic card shapes, color palettes, and micro-interactions can be freely tested and reviewed live in the browser without touching any production code.

**What changed for users:**

- **Dedicated design preview playground.** Visiting `/preview` provides a live, interactive environment displaying the proposed calm redesign for AROM Community.
- **Interactive Sanctuary Overview.** Features an organic soft sage arch header, reassuring anonymous security pills, an active circle card with mentor credentials, and botanical upcoming activity cards.
- **Interactive Circle Chat Hub.** Test the proposed peaceful group conversation interface with pinned kindness guidelines, distinct speech bubbles for peers and verified mentors, and a working message input bar.
- **Top Sandbox Control Bar.** Effortlessly toggle between Overview and Chat views, switch between English and Khmer, toggle mobile device frame mode, or return to the live app with a single click.

**What changed for the team:**

- **Zero-risk design iteration.** The team and vibe coders can experiment with CSS, typography, and component structures in `app/preview/page.tsx` without modifying `app/community/`, `app/page.tsx`, or any working features.
- **Client-side interactive sandbox.** Includes self-contained state for joining activity circles and sending test messages in real time.

**What to re-test:**

- Visit `http://localhost:3000/preview` in your browser;
- Click "ទិដ្ឋភាពទូទៅ (Overview)" and "ការសន្ទនាក្រុម (Chat)" in the top control bar to switch views;
- In Overview, tap "ចូលរួម (Join)" on any of the upcoming mindful circles to see the state toggle to "បានចូលរួម ✓";
- Tap "ចូលរង្វង់ (Enter Circle)" on the active support card to seamlessly transition into the Circle Chat;
- In Circle Chat, type a test message in the floating input bar and tap Send: verify your message renders with your avatar and timestamp;
- Tap the language toggle `🇰🇭 ខ្មែរ / 🇺🇸 EN` to verify bilingual labels;
- Click "← ត្រឡប់ទៅកម្មវិធីពិត" to return to the live application.

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
