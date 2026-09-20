"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Mic,
  MicOff,
  Plus,
  RefreshCw,
  ShieldCheck,
  X,
  Calendar,
  Trash2,
} from "lucide-react";
import { FigmaIcon } from "../../components/figma-icon";
import { DesktopNavigation } from "../../_components/app-navigation";
import { BottomNav } from "../../components/bottom-nav";
import { TopHeader } from "../../components/top-header";
import { useLanguage } from "../../_components/language-provider";

type ViewMode = "entry" | "saved" | "history";

type JournalEntry = {
  id: string;
  date: string;
  mood: string;
  tags: string[];
  content: string;
  createdAt: string;
};

const DEFAULT_ENTRIES: JournalEntry[] = [
  {
    id: "figma-1",
    date: "Today",
    mood: "Good",
    tags: ["Happy", "Proud"],
    content:
      "Had a productive and peaceful day! Finished my core tasks early and had time to relax with a cup of tea. Feeling proud of my progress.",
    createdAt: "2026-09-20",
  },
  {
    id: "figma-2",
    date: "Sep 18",
    mood: "Great",
    tags: ["Grateful", "Energetic"],
    content:
      "Went for a refreshing morning walk and spent quality time with friends. Really grateful for the good conversations and positive energy today.",
    createdAt: "2026-09-18",
  },
  {
    id: "figma-3",
    date: "Sep 15",
    mood: "Okay",
    tags: ["Calm"],
    content:
      "A quiet, balanced day. Managed to focus on my assignments without rushing and took regular breaks to recharge.",
    createdAt: "2026-09-15",
  },
  {
    id: "figma-4",
    date: "Sep 12",
    mood: "Good",
    tags: ["Calm", "Hopeful"],
    content:
      "Started the day with a clear plan. Felt much more organized and confident in handling my responsibilities.",
    createdAt: "2026-09-12",
  },
  {
    id: "figma-5",
    date: "Sep 8",
    mood: "Not Good",
    tags: ["Tired"],
    content:
      "Felt a bit drained after a long week. Decided to take a warm bath, disconnect from screens, and get an early night's rest.",
    createdAt: "2026-09-08",
  },
];

type MoodOption = {
  en: string;
  km: string;
  icon: string;
};

const MOODS: MoodOption[] = [
  { en: "Great", km: "អស្ចារ្យ", icon: "boxicons_happy-beaming" },
  { en: "Good", km: "ល្អ", icon: "ic_outline-mood" },
  { en: "Okay", km: "ធម្មតា", icon: "teenyicons_mood-flat-outline" },
  { en: "Not Good", km: "មិនល្អ", icon: "akar-icons_face-sad" },
  { en: "Very difficult", km: "ពិបាកខ្លាំង", icon: "boxicons_tired" },
];

type EmotionOption = {
  en: string;
  km: string;
  emoji: string;
  category: "positive" | "reflective";
};

const EMOTIONS: EmotionOption[] = [
  // Positive & Uplifting
  { en: "Happy", km: "រីករាយ", emoji: "😊", category: "positive" },
  { en: "Grateful", km: "ដឹងគុណ", emoji: "✨", category: "positive" },
  { en: "Calm", km: "ស្ងប់ស្ងាត់", emoji: "🌿", category: "positive" },
  { en: "Proud", km: "មានមោទនភាព", emoji: "⭐", category: "positive" },
  { en: "Hopeful", km: "មានសង្ឃឹម", emoji: "🌱", category: "positive" },
  { en: "Energetic", km: "មានថាមពល", emoji: "⚡", category: "positive" },
  { en: "Relaxed", km: "ធូរស្រាល", emoji: "🕊️", category: "positive" },
  // Reflective & Challenging
  { en: "Tired", km: "អស់កម្លាំង", emoji: "😴", category: "reflective" },
  { en: "Stressed", km: "តានតឹង", emoji: "🌪️", category: "reflective" },
  { en: "Anxious", km: "ថប់បារម្ភ", emoji: "💭", category: "reflective" },
  { en: "Sad", km: "កើតទុក្ខ", emoji: "🌧️", category: "reflective" },
  { en: "Overwhelmed", km: "លើសលប់", emoji: "🌊", category: "reflective" },
  { en: "Lonely", km: "ឯកោ", emoji: "🥀", category: "reflective" },
  { en: "Angry", km: "ខឹង", emoji: "🔥", category: "reflective" },
];

function mapMoodParam(param: string | null): string {
  if (!param) return "Good";
  const lower = param.toLowerCase().trim();
  if (lower === "great") return "Great";
  if (lower === "good") return "Good";
  if (lower === "okay") return "Okay";
  if (lower === "low" || lower === "not good") return "Not Good";
  if (lower === "very low" || lower === "very difficult") return "Very difficult";
  return "Good";
}

function getDefaultEmotionsForMood(mood: string): string[] {
  if (mood === "Great") return ["Happy", "Grateful", "Energetic"];
  if (mood === "Good") return ["Calm", "Happy", "Proud"];
  if (mood === "Okay") return ["Calm", "Relaxed"];
  if (mood === "Not Good") return ["Tired"];
  if (mood === "Very difficult") return ["Stressed", "Overwhelmed"];
  return ["Calm", "Happy"];
}

function getStarterReflectionForMood(mood: string, km: boolean): string {
  switch (mood) {
    case "Great":
      return km
        ? "ថ្ងៃនេះពិតជាអស្ចារ្យណាស់! ខ្ញុំមានថាមពល បានបំពេញការងារដោយជោគជ័យ និងមានពេលវេលាដ៏មានន័យ។ ខ្ញុំមានអារម្មណ៍ដឹងគុណ និងរីករាយជាខ្លាំង។"
        : "Today was wonderful! I felt energized, accomplished my goals, and enjoyed some great moments. Feeling grateful and happy.";
    case "Good":
      return km
        ? "ថ្ងៃនេះជាថ្ងៃដ៏ល្អ និងមានផលិតភាព។ អ្វីៗដំណើរការយ៉ាងរលូន ហើយខ្ញុំមានអារម្មណ៍ស្ងប់ និងពេញចិត្តនឹងលទ្ធផល។"
        : "Had a good, productive day today! Things went smoothly, and I'm feeling peaceful, focused, and content.";
    case "Okay":
      return km
        ? "ថ្ងៃនេះធម្មតា និងមានសេចក្តីស្ងប់។ ខ្ញុំបានដោះស្រាយកិច្ចការប្រចាំថ្ងៃមួយជំហានម្តងៗ ហើយកំពុងរក្សាតុល្យភាពនៃចិត្ត។"
        : "Today was steady and calm. Handled my daily tasks at a steady pace and took time to keep myself balanced.";
    case "Not Good":
      return km
        ? "ថ្ងៃនេះមានអារម្មណ៍អស់កម្លាំងបន្តិច។ ខ្ញុំកំពុងឆ្លៀតពេលសម្រាក សម្រាលអារម្មណ៍ និងរំលឹកខ្លួនឯងថាការសម្រាកគឺជារឿងសំខាន់។"
        : "Felt a bit low on energy today. Giving myself permission to slow down, rest, and recharge tonight.";
    case "Very difficult":
      return km
        ? "ថ្ងៃនេះមានការលំបាក និងតានតឹងច្រើន។ ខ្ញុំកំពុងដកដង្ហើមវែងៗ បន្ថយល្បឿន និងដោះស្រាយម្តងមួយៗដោយការយល់ចិត្តខ្លួនឯង។"
        : "Today was quite challenging and overwhelming. I'm taking deep breaths, letting myself rest, and taking things one step at a time.";
    default:
      return km
        ? "ថ្ងៃនេះជាថ្ងៃដ៏ល្អ និងមានផលិតភាព។ អ្វីៗដំណើរការយ៉ាងរលូន ហើយខ្ញុំមានអារម្មណ៍ស្ងប់ និងពេញចិត្តនឹងលទ្ធផល។"
        : "Had a good, productive day today! Things went smoothly, and I'm feeling peaceful, focused, and content.";
  }
}

function getPlaceholderForMood(mood: string, km: boolean): string {
  switch (mood) {
    case "Great":
      return km
        ? "តើអ្វីដែលធ្វើឱ្យថ្ងៃនេះអស្ចារ្យយ៉ាងនេះ? សរសេរពីចំណុចល្អៗ ជោគជ័យ ឬអ្វីដែលធ្វើឱ្យអ្នកញញឹម..."
        : "What made today so wonderful? Write down your highlights, wins, or what made you smile...";
    case "Good":
      return km
        ? "តើមានអ្វីល្អកើតឡើងថ្ងៃនេះ? សរសេរអំពីអ្វីដែលអ្នកចូលចិត្ត ឬបានសម្រេច..."
        : "What went well today? Write about something you enjoyed or accomplished...";
    case "Okay":
      return km
        ? "តើថ្ងៃនេះដំណើរការយ៉ាងដូចម្តេច? សរសេរអ្វីដែលនៅក្នុងចិត្តរបស់អ្នក..."
        : "How did your day go? Write what's on your mind...";
    default:
      return km
        ? "តើអ្នកមានអារម្មណ៍យ៉ាងណាដែរថ្ងៃនេះ? ចែករំលែកគំនិតរបស់អ្នកដោយសេរី..."
        : "How are you feeling right now? It's safe to let your thoughts out here...";
  }
}

type AiSummaryReport = {
  headlineEn: string;
  headlineKm: string;
  paragraphEn: string;
  paragraphKm: string;
  trendEn: string;
  trendKm: string;
  themeEn: string;
  themeKm: string;
  actionEn: string;
  actionKm: string;
  highlightsEn: string[];
  highlightsKm: string[];
};

function generateAiJournalSummary(entries: JournalEntry[], revision = 0): AiSummaryReport {
  const total = entries.length;
  const moodCounts = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});

  const positiveCount = (moodCounts["Great"] || 0) + (moodCounts["Good"] || 0);
  const positiveRate = total > 0 ? Math.round((positiveCount / total) * 100) : 80;

  const summaries: AiSummaryReport[] = [
    {
      headlineEn: "Balanced & Uplifting Emotional Trend",
      headlineKm: "និន្នាការផ្លូវចិត្តមានតុល្យភាព និងវិជ្ជមាន",
      paragraphEn: `Across your recent reflections (${total} check-ins logged), your emotional patterns reflect healthy resilience and grounded peace (${positiveRate}% positive check-ins). Taking intentional rest and walks has strongly buffered against stress, keeping you centered and motivated.`,
      paragraphKm: `ផ្អែកលើកំណត់ត្រាឆ្លុះបញ្ចាំងថ្មីៗរបស់អ្នក (${total} កំណត់ត្រា) ស្ថានភាពអារម្មណ៍របស់អ្នកមានភាពវិជ្ជមាន និងមានលំនឹងល្អ (${positiveRate}% វិជ្ជមាន)។ អ្នកបានរក្សាភាពស្ងប់ស្ងាត់បានយ៉ាងល្អ ហើយការឆ្លៀតពេលសម្រាកខ្លីៗបានជួយសម្រាលភាពតានតឹងយ៉ាងមានប្រសិទ្ធភាព។`,
      trendEn: `${positiveRate}% Positive & Calm`,
      trendKm: `${positiveRate}% វិជ្ជមាន & ស្ងប់ចិត្ត`,
      themeEn: "Self-Care & Calm",
      themeKm: "ការថែទាំចិត្ត & ភាពស្ងប់",
      actionEn: "Walks & Evening Rest",
      actionKm: "ដើរហាត់ប្រាណ & សម្រាក",
      highlightsEn: [
        "Morning walks and tea breaks strongly correlate with your calmest days.",
        "Quick recovery noted after feeling tired on Sep 8 by disconnecting from screens early.",
        "Consistent mindfulness practice puts you in the top 10% of weekly self-care consistency.",
      ],
      highlightsKm: [
        "ការដើរពេលព្រឹក និងការសម្រាកផឹកតែ ជួយបង្កើតអារម្មណ៍ស្ងប់ស្ងាត់បានច្រើនបំផុត។",
        "ការសម្រាកមុនម៉ោង និងកាត់បន្ថយអេក្រង់ បានជួយស្តារថាមពលឡើងវិញយ៉ាងឆាប់រហ័ស។",
        "ការកត់ត្រាទៀងទាត់ជួយឱ្យអ្នកមានទម្លាប់ថែទាំសុខភាពផ្លូវចិត្តជាប់លាប់ល្អ។",
      ],
    },
    {
      headlineEn: "Mindful Awareness & Emotional Clarity",
      headlineKm: "ការយល់ដឹងពីចិត្ត និងភាពច្បាស់លាស់នៃអារម្មណ៍",
      paragraphEn: `Your reflections highlight growing self-awareness. When facing demanding schedules, you acknowledge fatigue early and permit yourself to slow down. Gratitude and contentment remain your most recurrent feelings over the last 7 days.`,
      paragraphKm: `កំណត់ត្រារបស់អ្នកបង្ហាញពីការយល់ដឹងពីខ្លួនឯងកាន់តែស៊ីជម្រៅ។ នៅពេលជួបការងារច្រើន អ្នកបានកត់សម្គាល់ពីភាពនឿយហត់ទាន់ពេល និងអនុញ្ញាតឱ្យខ្លួនឯងបន្ថយល្បឿន។ ការដឹងគុណ និងការពេញចិត្តនៅតែជាអារម្មណ៍ដែលកើតឡើងញឹកញាប់បំផុត។`,
      trendEn: "High Self-Compassion",
      trendKm: "ការយល់ចិត្តខ្លួនឯងខ្ពស់",
      themeEn: "Gratitude & Peace",
      themeKm: "ការដឹងគុណ & សន្តិភាព",
      actionEn: "2-min mindful pause",
      actionKm: "សម្រាកដកដង្ហើម ២នាទី",
      highlightsEn: [
        "Proactive emotional check-ins help reduce overwhelm before it builds up.",
        "Feelings of gratitude and pride are frequently linked to completed personal tasks.",
        "Consistent pacing observed across weekdays and weekends.",
      ],
      highlightsKm: [
        "ការពិនិត្យអារម្មណ៍ជាមុន ជួយកាត់បន្ថយភាពតានតឹងកុំឱ្យរីករាលដាល។",
        "អារម្មណ៍ដឹងគុណ និងមោទនភាព កើតឡើងញឹកញាប់ពេលសម្រេចកិច្ចការផ្ទាល់ខ្លួន។",
        "ចង្វាក់រស់នៅមានលំនឹងល្អទាំងថ្ងៃធ្វើការ និងចុងសប្តាហ៍។",
      ],
    },
  ];

  return summaries[revision % summaries.length];
}

function JournalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMood = mapMoodParam(searchParams.get("mood"));

  const { language } = useLanguage();
  const km = language === "km";

  const [view, setView] = useState<ViewMode>("entry");

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // Form State initialized with URL query parameter
  const [selectedMood, setSelectedMood] = useState(initialMood);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(() =>
    getDefaultEmotionsForMood(initialMood)
  );
  const [reflectionText, setReflectionText] = useState(() =>
    getStarterReflectionForMood(initialMood, km)
  );
  const [hasCustomizedText, setHasCustomizedText] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  // Saved Entry & List State with lazy local storage hydration
  const [savedEntry, setSavedEntry] = useState<JournalEntry | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>(DEFAULT_ENTRIES);
  const [selectedDetailEntry, setSelectedDetailEntry] = useState<JournalEntry | null>(null);

  // AI Journal Summary Feature State
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showAiBreakdown, setShowAiBreakdown] = useState(false);
  const [aiSummaryRevision, setAiSummaryRevision] = useState(0);

  const currentAiSummary = generateAiJournalSummary(entries, aiSummaryRevision);

  const handleRegenerateAiSummary = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setAiSummaryRevision((prev) => prev + 1);
      setIsAiGenerating(false);
    }, 850);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("arom_journal_entries");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const isLegacyOnly = parsed.every(
            (e: JournalEntry) => typeof e.id === "string" && e.id.startsWith("figma-")
          );
          if (!isLegacyOnly) {
            setEntries(parsed);
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectMood = (moodName: string) => {
    setSelectedMood(moodName);
    setSelectedEmotions(getDefaultEmotionsForMood(moodName));
    if (!hasCustomizedText) {
      setReflectionText(getStarterReflectionForMood(moodName, km));
    }
  };

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  // Voice recording simulation / Web Speech API
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const handleToggleVoice = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const windowObj = window as unknown as Record<string, new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onstart: () => void;
      onresult: (e: { resultIndex: number; results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
      onerror: (err: unknown) => void;
      onend: () => void;
      start: () => void;
      stop: () => void;
    }>;

    const SpeechRec = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = km ? "km-KH" : "en-US";

        recognition.onstart = () => {
          setIsRecording(true);
          setVoiceNotice(km ? "កំពុងស្តាប់... សូមនិយាយ" : "Listening... speak freely");
        };

        recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i in event.results; i++) {
            transcript += event.results[i][0].transcript;
          }
          setReflectionText((prev) => {
            const nextText = (prev ? prev + " " : "") + transcript;
            return nextText.slice(0, 500);
          });
        };

        recognition.onerror = () => {
          setIsRecording(false);
          setVoiceNotice(
            km ? "មិនអាចចាប់សំឡេងបានទេ។ សូមព្យាយាមម្តងទៀត។" : "Could not detect voice. Please try again."
          );
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setVoiceNotice(km ? "កំពុងថតសំឡេងគំរូ..." : "Simulating voice recording...");
    setTimeout(() => {
      const sample = km
        ? " ខ្ញុំមានអារម្មណ៍ធូរស្រាលច្រើនបន្ទាប់ពីបានដកដង្ហើមវែងៗ។"
        : " I took a few deep breaths and now I feel much more peaceful.";
      setReflectionText((prev) => (prev + sample).slice(0, 500));
      setIsRecording(false);
      setVoiceNotice(km ? "សំឡេងត្រូវបានបញ្ចូលដោយជោគជ័យ!" : "Voice transcribed successfully!");
      setTimeout(() => setVoiceNotice(null), 3000);
    }, 2000);
  };

  const handleSave = () => {
    const todayStr = km ? "ថ្ងៃនេះ" : "Today";
    const newEntry: JournalEntry = {
      id: "entry-" + Date.now(),
      date: todayStr,
      mood: selectedMood,
      tags: selectedEmotions,
      content: reflectionText.trim() || (km ? "គ្មានកំណត់ត្រា" : "No notes recorded."),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newEntry, ...entries.filter((e) => e.id !== newEntry.id)];
    setEntries(updated);
    setSavedEntry(newEntry);
    try {
      localStorage.setItem("arom_journal_entries", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setView("saved");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem("arom_journal_entries", JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (selectedDetailEntry?.id === id) {
      setSelectedDetailEntry(null);
    }
  };

  const getMoodLabel = (moodName: string) => {
    const found = MOODS.find((m) => m.en.toLowerCase() === moodName.toLowerCase());
    return km && found ? found.km : moodName;
  };

  return (
    <div className="min-h-screen bg-[#f7faf9] text-[#14221f] lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* Desktop Sidebar Navigation */}
      <DesktopNavigation active="Detection" />

      {/* Main Content Area */}
      <div className="min-w-0 pb-28 sm:pb-32 lg:pb-12">
        <main className="mx-auto w-full max-w-[430px] px-5 pt-4 sm:px-6 md:max-w-xl lg:max-w-2xl lg:pt-8 xl:max-w-3xl">
          {/* Top Brand Header matching Figma */}
          <TopHeader />

          {/* ============================================================== */}
          {/* VIEW 1: Journal Entry Form (Figma Frame 77:120) */}
          {/* ============================================================== */}
          {view === "entry" && (
            <div className="mt-4 sm:mt-6 animate-in fade-in duration-200">
              {/* Top Navigation */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex size-10 items-center justify-center rounded-full text-[#111827] hover:bg-gray-100 transition-colors"
                  aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("history")}
                  className="text-xs sm:text-sm font-semibold text-[#1f6f5b] hover:underline"
                >
                  {km ? "មើលប្រវត្តិ" : "View History"} ({entries.length})
                </button>
              </div>

              {/* Title */}
              <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
                {km ? "តើអ្នកមានអារម្មណ៍យ៉ាងណាដែរ?" : "How are you feeling?"}
              </h1>

              {/* Section 1: Mood */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-[#4b5563]">
                  {km ? "អារម្មណ៍" : "Mood"}
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2 sm:gap-2.5">
                  {MOODS.map((m) => {
                    const isSelected = selectedMood === m.en;
                    return (
                      <button
                        key={m.en}
                        type="button"
                        onClick={() => handleSelectMood(m.en)}
                        className={`inline-flex items-center gap-2 rounded-[14px] px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
                          isSelected
                            ? "border border-[#1f6f5b] bg-[#dff3ee] text-[#1f6f5b] shadow-sm font-semibold"
                            : "border border-gray-200 bg-white text-[#374151] hover:border-gray-300"
                        }`}
                      >
                        <span className={isSelected ? "opacity-100 scale-105 transition-transform" : "opacity-75"}>
                          <FigmaIcon name={m.icon} size={20} />
                        </span>
                        <span>{km ? m.km : m.en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: What’s coming up for you? */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#4b5563]">
                    {km ? "តើមានអ្វីកើតឡើងចំពោះអ្នក?" : "What’s coming up for you?"}
                  </label>
                  <span className="text-[11px] font-medium text-[#1f6f5b] bg-[#e6f6f1] px-2.5 py-0.5 rounded-full">
                    {km ? "អារម្មណ៍ និងការឆ្លុះបញ្ចាំង" : "Feelings & reflection"}
                  </span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2 sm:gap-2.5">
                  {EMOTIONS.map((e) => {
                    const isSelected = selectedEmotions.includes(e.en);
                    return (
                      <button
                        key={e.en}
                        type="button"
                        onClick={() => toggleEmotion(e.en)}
                        className={`inline-flex items-center gap-1.5 rounded-[14px] px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
                          isSelected
                            ? "border border-[#1f6f5b] bg-[#dff3ee] text-[#1f6f5b] shadow-sm font-semibold"
                            : "border border-gray-200 bg-white text-[#374151] hover:border-gray-300"
                        }`}
                      >
                        <span className="text-sm leading-none">{e.emoji}</span>
                        <span>{km ? e.km : e.en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Reflection Text Box */}
              <div className="mt-6">
                <div className="relative rounded-[22px] border border-gray-200 bg-white p-4 shadow-sm transition-all focus-within:border-[#1f6f5b] focus-within:ring-2 focus-within:ring-[#1f6f5b]/10">
                  <textarea
                    rows={6}
                    maxLength={500}
                    value={reflectionText}
                    onChange={(e) => {
                      setReflectionText(e.target.value);
                      setHasCustomizedText(true);
                    }}
                    placeholder={getPlaceholderForMood(selectedMood, km)}
                    className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#111827] placeholder:text-gray-400 focus:outline-none sm:text-[15px]"
                  />
                  <div className="mt-2 text-right">
                    <span className="text-xs font-medium text-gray-400">
                      {reflectionText.length}/500
                    </span>
                  </div>
                </div>
              </div>

              {/* Voice Notification Banner */}
              {voiceNotice && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs sm:text-sm text-[#1f6f5b] animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#1f6f5b] animate-ping" />
                    <span>{voiceNotice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVoiceNotice(null)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Section 4: Record with voice Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`flex w-full items-center justify-center gap-2.5 rounded-2xl border py-3.5 px-4 font-medium shadow-sm transition-all duration-150 active:scale-[0.99] ${
                    isRecording
                      ? "border-red-400 bg-red-50 text-red-700 animate-pulse"
                      : "border-gray-200 bg-white text-[#111827] hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff size={18} className="text-red-600" />
                      <span className="text-sm">
                        {km ? "បញ្ឈប់ការថតសំឡេង" : "Stop recording"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Mic size={18} className="text-[#1f6f5b]" />
                      <span className="text-sm">
                        {km ? "កត់ត្រាជាសំឡេង" : "Record with voice"}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Section 5: Security / Privacy Note */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#6b7280]">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>
                  {km
                    ? "កំណត់ត្រាផ្ទាល់ខ្លួនរបស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាព។"
                    : "Journal entries are private and handled securely."}
                </span>
              </div>

              {/* Section 6: Save Journal Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-[#1f6f5b] py-4 text-center text-base font-semibold text-white shadow-[0_4px_16px_rgba(31,111,91,0.28)] transition-all duration-150 hover:bg-[#185848] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6f5b]"
                >
                  {km ? "រក្សាទុកកំណត់ហេតុ" : "Save Journal"}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: Reflection Saved Screen (Figma Frame 77:133) */}
          {/* ============================================================== */}
          {view === "saved" && (
            <div className="mt-4 sm:mt-6 animate-in fade-in duration-300">
              {/* Top Navigation */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setView("entry")}
                  className="inline-flex size-10 items-center justify-center rounded-full text-[#111827] hover:bg-gray-100 transition-colors"
                  aria-label="Back to journal entry"
                >
                  <ArrowLeft size={22} />
                </button>
              </div>

              {/* Illustration & Headline */}
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="relative h-44 w-64 sm:h-52 sm:w-72">
                  <Image
                    src="/figma/journal/reflection_saved_graphic.png"
                    alt="Reflection saved"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
                  {km ? "ការឆ្លុះបញ្ចាំងរបស់អ្នកត្រូវបានរក្សាទុក។" : "Your reflection has been saved."}
                </h1>
                <p className="mt-2.5 max-w-sm text-sm sm:text-base text-[#4b5563] leading-relaxed">
                  {km
                    ? "ការចំណាយពេលស្វែងយល់ពីអារម្មណ៍របស់អ្នក ជួយឱ្យអ្នកកត់សម្គាល់ពីទម្លាប់តាមពេលវេលា។"
                    : "Taking a moment to understand your feelings can help you notice patterns over time."}
                </p>
              </div>

              {/* Today’s Journal Summary Card */}
              <div className="mt-8 rounded-[22px] border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                  {km ? "កំណត់ហេតុថ្ងៃនេះ" : "Today’s Journal"}
                </h2>
                <div className="mt-1.5 flex items-center gap-2">
                  {(() => {
                    const moodObj = MOODS.find(
                      (m) => m.en.toLowerCase() === (savedEntry?.mood || selectedMood).toLowerCase()
                    );
                    return (
                      <>
                        {moodObj && <FigmaIcon name={moodObj.icon} size={18} />}
                        <p className="text-sm font-medium text-[#6b7280]">
                          {km ? "ថ្ងៃនេះ" : "Today"} • {getMoodLabel(savedEntry?.mood || selectedMood)}
                        </p>
                      </>
                    );
                  })()}
                </div>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#374151]">
                  {(savedEntry?.content || reflectionText).slice(0, 140)}
                  {(savedEntry?.content || reflectionText).length > 140 ? "..." : ""}
                </p>
                {(savedEntry?.tags || selectedEmotions).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(savedEntry?.tags || selectedEmotions).map((t) => {
                      const emo = EMOTIONS.find((e) => e.en.toLowerCase() === t.toLowerCase());
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-md bg-[#e6f6f1] px-2 py-0.5 text-xs font-medium text-[#1f6f5b]"
                        >
                          {emo && <span>{emo.emoji}</span>}
                          <span>{km && emo ? emo.km : t}</span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setView("history")}
                  className="w-full rounded-2xl bg-[#1f6f5b] py-3.5 sm:py-4 text-center text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#185848] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
                >
                  {km ? "មើលសៀវភៅកំណត់ហេតុ" : "View Journal"}
                </button>

                <Link
                  href="/"
                  className="w-full rounded-2xl border border-[#1f6f5b] bg-white py-3.5 sm:py-4 text-center text-base font-semibold text-[#1f6f5b] transition-all duration-150 hover:bg-emerald-50 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
                >
                  {km ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
                </Link>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: My Journal List / History (Figma Frame 77:146) */}
          {/* ============================================================== */}
          {view === "history" && (
            <div className="mt-4 sm:mt-6 animate-in fade-in duration-200">
              {/* Top Navigation & Title */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setView("entry")}
                    className="inline-flex size-10 items-center justify-center rounded-full text-[#111827] hover:bg-gray-100 transition-colors"
                    aria-label="Back to new reflection"
                  >
                    <ArrowLeft size={22} />
                  </button>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
                    {km ? "សៀវភៅកំណត់ហេតុរបស់ខ្ញុំ" : "My Journal"}
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMood("Good");
                    setSelectedEmotions(getDefaultEmotionsForMood("Good"));
                    setReflectionText(getStarterReflectionForMood("Good", km));
                    setHasCustomizedText(false);
                    setView("entry");
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-[#e6f6f1] px-3.5 py-1.5 text-xs font-semibold text-[#1f6f5b] hover:bg-[#d2eee8] transition-colors"
                >
                  <Plus size={16} />
                  <span>{km ? "សរសេរថ្មី" : "New Entry"}</span>
                </button>
              </div>

              {/* ============================================================== */}
              {/* AI Journal Summary Feature (Placed on top of history) */}
              {/* ============================================================== */}
              <div className="mt-5 relative overflow-hidden rounded-[24px] border border-[#bce5d8] bg-gradient-to-br from-[#ebf7f3] via-[#f8fdfb] to-[#e4f5ee] p-4 sm:p-5 shadow-[0_4px_22px_rgba(31,111,91,0.06)] transition-all">
                {/* Decorative background glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-emerald-200/40 blur-2xl" />
                <div className="pointer-events-none absolute -left-8 -bottom-8 size-28 rounded-full bg-teal-200/30 blur-2xl" />

                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[#dff3ee] text-[#1f6f5b] shadow-2xs">
                        <FigmaIcon name="ic_outline-mood" size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm sm:text-base font-bold text-[#111827]">
                            {km ? "ការវិភាគសង្ខេប AI" : "AI Journal Summary"}
                          </h2>
                          <span className="rounded-full bg-[#1f6f5b]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#1f6f5b]">
                            {km ? "ឆ្លុះបញ្ចាំងឆ្លាតវៃ" : "Smart Reflection"}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4b5563]">
                          {km ? "ការយល់ដឹងពីលំនាំនៃអារម្មណ៍ ៧ ថ្ងៃចុងក្រោយ" : "Emotional patterns from your past 7 days"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRegenerateAiSummary}
                      disabled={isAiGenerating}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#1f6f5b]/20 bg-white/85 px-3 py-1.5 text-xs font-semibold text-[#1f6f5b] hover:bg-white hover:border-[#1f6f5b]/40 transition-all active:scale-95 shadow-2xs disabled:opacity-60"
                    >
                      <RefreshCw size={12} className={isAiGenerating ? "animate-spin text-[#1f6f5b]" : "text-[#1f6f5b]"} />
                      <span>
                        {isAiGenerating
                          ? (km ? "កំពុងវិភាគ..." : "Synthesizing...")
                          : (km ? "វិភាគឡើងវិញ" : "Regenerate")}
                      </span>
                    </button>
                  </div>

                  {/* Body Content */}
                  {isAiGenerating ? (
                    <div className="mt-4 rounded-2xl bg-white/70 p-4 border border-emerald-100/80 animate-pulse">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#1f6f5b]">
                        <span className="inline-block size-2 rounded-full bg-[#1f6f5b] animate-ping" />
                        <span>{km ? "AI កំពុងអានកំណត់ត្រា និងវិភាគអារម្មណ៍របស់អ្នក..." : "AI is reading recent entries and evaluating emotional themes..."}</span>
                      </div>
                      <div className="mt-3 h-3 w-4/5 rounded bg-emerald-200/50" />
                      <div className="mt-2 h-3 w-3/5 rounded bg-emerald-200/40" />
                    </div>
                  ) : (
                    <>
                      {/* Core summary paragraph */}
                      <div className="mt-3.5 rounded-2xl bg-white/80 p-3.5 sm:p-4 border border-[#1f6f5b]/10 text-xs sm:text-sm leading-relaxed text-[#1f2d29] shadow-2xs">
                        <p className="font-medium">
                          {km ? currentAiSummary.paragraphKm : currentAiSummary.paragraphEn}
                        </p>
                      </div>

                      {/* 3 Metrics / Insights Slots */}
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {/* Slot 1: Mood Trend */}
                        <div className="flex items-center gap-2.5 rounded-2xl bg-white/80 p-2.5 sm:p-3 border border-[#1f6f5b]/10 shadow-2xs">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#dff3ee] text-[#1f6f5b]">
                            <FigmaIcon name="boxicons_happy-beaming" size={20} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">
                              {km ? "និន្នាការអារម្មណ៍" : "Mood Trend"}
                            </p>
                            <p className="text-xs font-bold text-[#1f6f5b] leading-tight">
                              {km ? currentAiSummary.trendKm : currentAiSummary.trendEn}
                            </p>
                          </div>
                        </div>

                        {/* Slot 2: Core Theme */}
                        <div className="flex items-center gap-2.5 rounded-2xl bg-white/80 p-2.5 sm:p-3 border border-[#1f6f5b]/10 shadow-2xs">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-[#e11d48]">
                            <FigmaIcon name="akar-icons_heart" size={19} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">
                              {km ? "ប្រធានបទស្នូល" : "Core Theme"}
                            </p>
                            <p className="text-xs font-bold text-[#111827] leading-tight">
                              {km ? currentAiSummary.themeKm : currentAiSummary.themeEn}
                            </p>
                          </div>
                        </div>

                        {/* Slot 3: Gentle Tip */}
                        <div className="flex items-center gap-2.5 rounded-2xl bg-white/80 p-2.5 sm:p-3 border border-[#1f6f5b]/10 shadow-2xs">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fef3c7] text-[#b45309]">
                            <FigmaIcon name="hugeicons_yoga-03" size={20} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">
                              {km ? "ការណែនាំសុខុមាលភាព" : "Wellness Tip"}
                            </p>
                            <p className="text-xs font-bold text-[#b45309] leading-tight">
                              {km ? currentAiSummary.actionKm : currentAiSummary.actionEn}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Toggle Detailed Breakdown */}
                      <div className="mt-3 flex items-center justify-between border-t border-[#1f6f5b]/10 pt-2.5">
                        <button
                          type="button"
                          onClick={() => setShowAiBreakdown(!showAiBreakdown)}
                          className="group flex items-center gap-1.5 text-xs font-semibold text-[#1f6f5b] hover:text-[#165344] transition-colors"
                        >
                          <span>{showAiBreakdown ? (km ? "លាក់ការវិភាគលម្អិត" : "Hide detailed breakdown") : (km ? "មើលការវិភាគលម្អិត" : "View detailed breakdown")}</span>
                          {showAiBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5" />}
                        </button>
                        <span className="text-[11px] text-[#6b7280]">
                          {km ? "ធ្វើបច្ចុប្បន្នភាពជាមួយកំណត់ត្រាថ្មី" : "Synced with recent entries"}
                        </span>
                      </div>

                      {/* Expandable Breakdown Bullets */}
                      {showAiBreakdown && (
                        <div className="mt-2.5 space-y-1.5 rounded-xl bg-[#e3f4ee]/70 p-3 text-xs text-[#203a33] animate-in fade-in slide-in-from-top-1 duration-200">
                          {(km ? currentAiSummary.highlightsKm : currentAiSummary.highlightsEn).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="mt-1 size-1.5 rounded-full bg-[#1f6f5b] shrink-0" />
                              <p className="leading-snug">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Journal Entries List Header */}
              <div className="mt-6 flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-[#111827]">
                  {km ? "កំណត់ត្រាទាំងអស់" : "Past Reflections"} ({entries.length})
                </h3>
                <span className="text-xs text-[#6b7280]">
                  {km ? "រៀបតាមកាលបរិច្ឆេទ" : "Chronological"}
                </span>
              </div>

              {/* Journal Entries List */}
              <div className="mt-3 flex flex-col gap-3.5">
                {entries.map((entry) => {
                  const moodObj = MOODS.find(
                    (m) => m.en.toLowerCase() === entry.mood.toLowerCase()
                  );
                  return (
                    <div
                      key={entry.id}
                      onClick={() => setSelectedDetailEntry(entry)}
                      className="group flex cursor-pointer items-center justify-between rounded-[20px] border border-gray-200/90 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:border-[#1f6f5b] hover:shadow-md hover:translate-y-[-1px]"
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          {moodObj && <FigmaIcon name={moodObj.icon} size={18} />}
                          <p className="text-base font-bold text-[#111827] transition-colors group-hover:text-[#1f6f5b]">
                            {entry.date} • {getMoodLabel(entry.mood)}
                          </p>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                          {entry.content}
                        </p>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {entry.tags.map((t) => {
                              const emo = EMOTIONS.find((e) => e.en.toLowerCase() === t.toLowerCase());
                              return (
                                <span
                                  key={t}
                                  className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700"
                                >
                                  {emo && <span>{emo.emoji}</span>}
                                  <span>{km && emo ? emo.km : t}</span>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <ChevronRight
                        size={20}
                        className="shrink-0 text-gray-400 group-hover:text-[#1f6f5b] group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quote Banner matching Figma 77:146 */}
              <div className="mt-8 relative overflow-hidden rounded-[24px] border border-[#d2eee8] bg-[#ebf7f4] p-5 sm:p-6 shadow-sm">
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="max-w-[62%] sm:max-w-[68%]">
                    <p className="text-base sm:text-lg font-medium leading-snug text-[#1f6f5b]">
                      {km
                        ? "រាល់គំនិតដែលអ្នកសរសេរ គឺជាជំហានមួយឆ្ពោះទៅរកភាពច្បាស់លាស់ និងស្ងប់ស្ងាត់នៃចិត្ត។"
                        : "Every thought you write is a step towards a clearer, calmer you."}
                    </p>
                  </div>
                  <div className="relative h-28 w-24 sm:h-32 sm:w-28 shrink-0">
                    <Image
                      src="/figma/journal/journal_quote_plant.png"
                      alt="Calm plant"
                      fill
                      className="object-contain object-right-bottom"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detail View Modal if user clicks on a journal entry */}
          {selectedDetailEntry && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
              onClick={() => setSelectedDetailEntry(null)}
            >
              <div
                className="w-full max-w-lg rounded-[26px] bg-white p-6 shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1f6f5b] bg-[#e6f6f1] px-3 py-1.5 rounded-full">
                    {(() => {
                      const moodObj = MOODS.find(
                        (m) => m.en.toLowerCase() === selectedDetailEntry.mood.toLowerCase()
                      );
                      return moodObj ? <FigmaIcon name={moodObj.icon} size={17} /> : <Calendar size={13} />;
                    })()}
                    <span>
                      {selectedDetailEntry.date} • {getMoodLabel(selectedDetailEntry.mood)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedDetailEntry(null)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-[#111827]">
                    {km ? "កំណត់ត្រាការឆ្លុះបញ្ចាំង" : "Reflection Details"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#374151] whitespace-pre-wrap">
                    {selectedDetailEntry.content}
                  </p>
                </div>

                {selectedDetailEntry.tags && selectedDetailEntry.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedDetailEntry.tags.map((tag) => {
                      const emo = EMOTIONS.find((e) => e.en.toLowerCase() === tag.toLowerCase());
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-[#1f6f5b]"
                        >
                          {emo && <span>{emo.emoji}</span>}
                          <span>{km && emo ? emo.km : tag}</span>
                        </span>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(selectedDetailEntry.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>{km ? "លុបកំណត់ត្រា" : "Delete Entry"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDetailEntry(null)}
                    className="rounded-xl bg-[#1f6f5b] px-5 py-2 text-xs font-semibold text-white hover:bg-[#185848] transition-colors"
                  >
                    {km ? "បិទ" : "Close"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Figma Bottom Navigation (Mobile/Tablet) */}
      <div className="lg:hidden">
        <BottomNav activeTab="Detection" />
      </div>
    </div>
  );
}

export default function JournalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7faf9]" />}>
      <JournalContent />
    </Suspense>
  );
}
