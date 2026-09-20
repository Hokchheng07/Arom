"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Mic,
  MicOff,
  Plus,
  ShieldCheck,
  X,
  Calendar,
  Trash2,
} from "lucide-react";
import { DesktopNavigation } from "../../_components/app-navigation";
import { BottomNav } from "../../components/bottom-nav";
import { TopHeader } from "../../components/top-header";
import { useLanguage } from "../../_components/language-provider";
import { DetectionModal } from "../../components/detection-modal";

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
    mood: "Okay",
    tags: ["Stressed"],
    content:
      "Today was a bit stressful, I had a lot of assignment to do, but i managed to finish some of it. Feeling tired but also proud of myself.",
    createdAt: "2026-09-20",
  },
  {
    id: "figma-2",
    date: "Sep 12",
    mood: "Okay",
    tags: ["Calm"],
    content:
      "Today was better than yesterday. I managed to focus on my assignment without getting overwhelmed.",
    createdAt: "2026-09-12",
  },
  {
    id: "figma-3",
    date: "Sep 10",
    mood: "Sad",
    tags: ["Sad", "Lonely"],
    content:
      "I had a difficult conversation with a friend and it's been sitting heavy on my heart today.",
    createdAt: "2026-09-10",
  },
  {
    id: "figma-4",
    date: "Sep 8",
    mood: "Good",
    tags: ["Calm"],
    content:
      "Had a productive day! Completed my assignment and felt more confident in my work.",
    createdAt: "2026-09-08",
  },
  {
    id: "figma-5",
    date: "Sep 5",
    mood: "Stressed",
    tags: ["Stressed", "Anxious"],
    content:
      "Feeling stressed about upcoming exams. Need to plan my time better and get enough rest.",
    createdAt: "2026-09-05",
  },
];

const MOODS = [
  { en: "Great", km: "អស្ចារ្យ" },
  { en: "Good", km: "ល្អ" },
  { en: "Okay", km: "ធម្មតា" },
  { en: "Not Good", km: "មិនល្អ" },
  { en: "Very difficult", km: "ពិបាកខ្លាំង" },
];

const EMOTIONS = [
  { en: "Anxious", km: "ថប់បារម្ភ" },
  { en: "Sad", km: "កើតទុក្ខ" },
  { en: "Stressed", km: "តានតឹង" },
  { en: "Angry", km: "ខឹង" },
  { en: "Lonely", km: "ឯកោ" },
  { en: "Tired", km: "អស់កម្លាំង" },
  { en: "Calm", km: "ស្ងប់ស្ងាត់" },
  { en: "Overwhelmed", km: "លើសលប់" },
];

function mapMoodParam(param: string | null): string {
  if (!param) return "Okay";
  const lower = param.toLowerCase().trim();
  if (lower === "great") return "Great";
  if (lower === "good") return "Good";
  if (lower === "okay") return "Okay";
  if (lower === "low" || lower === "not good") return "Not Good";
  if (lower === "very low" || lower === "very difficult") return "Very difficult";
  return "Okay";
}

function getDefaultEmotionsForMood(mood: string): string[] {
  if (mood === "Great" || mood === "Good") return ["Calm"];
  if (mood === "Not Good") return ["Sad", "Tired"];
  if (mood === "Very difficult") return ["Stressed", "Overwhelmed"];
  return ["Stressed"];
}

function JournalContent() {
  const searchParams = useSearchParams();
  const initialMood = mapMoodParam(searchParams.get("mood"));

  const { language } = useLanguage();
  const km = language === "km";

  const [view, setView] = useState<ViewMode>("entry");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State initialized with URL query parameter
  const [selectedMood, setSelectedMood] = useState(initialMood);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(() =>
    getDefaultEmotionsForMood(initialMood)
  );
  const [reflectionText, setReflectionText] = useState(
    "Today was a bit stressful: I had a lot of assignment to do, but I managed to finish some of it. Feeling tired but also proud of myself."
  );
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  // Saved Entry & List State with lazy local storage hydration
  const [savedEntry, setSavedEntry] = useState<JournalEntry | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("arom_journal_entries");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_ENTRIES;
  });
  const [selectedDetailEntry, setSelectedDetailEntry] = useState<JournalEntry | null>(null);

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
                <Link
                  href="/detection"
                  className="inline-flex size-10 items-center justify-center rounded-full text-[#111827] hover:bg-gray-100 transition-colors"
                  aria-label="Back to detection"
                >
                  <ArrowLeft size={22} />
                </Link>
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
                        onClick={() => setSelectedMood(m.en)}
                        className={`rounded-[14px] px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
                          isSelected
                            ? "border border-[#1f6f5b] bg-[#dff3ee] text-[#1f6f5b] shadow-sm font-semibold"
                            : "border border-gray-200 bg-white text-[#374151] hover:border-gray-300"
                        }`}
                      >
                        {km ? m.km : m.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: What’s coming up for you? */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-[#4b5563]">
                  {km ? "តើមានអ្វីកើតឡើងចំពោះអ្នក?" : "What’s coming up for you?"}
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2 sm:gap-2.5">
                  {EMOTIONS.map((e) => {
                    const isSelected = selectedEmotions.includes(e.en);
                    return (
                      <button
                        key={e.en}
                        type="button"
                        onClick={() => toggleEmotion(e.en)}
                        className={`rounded-[14px] px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
                          isSelected
                            ? "border border-[#1f6f5b] bg-[#dff3ee] text-[#1f6f5b] shadow-sm font-semibold"
                            : "border border-gray-200 bg-white text-[#374151] hover:border-gray-300"
                        }`}
                      >
                        {km ? e.km : e.en}
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
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder={
                      km ? "សរសេរអ្វីដែលនៅក្នុងចិត្តរបស់អ្នក..." : "Write what's on your mind..."
                    }
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
                <p className="mt-1 text-sm font-medium text-[#6b7280]">
                  {km ? "ថ្ងៃនេះ" : "Today"} • {getMoodLabel(savedEntry?.mood || selectedMood)}
                </p>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#374151]">
                  {(savedEntry?.content || reflectionText).slice(0, 140)}
                  {(savedEntry?.content || reflectionText).length > 140 ? "..." : ""}
                </p>
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
                    setReflectionText("");
                    setSelectedMood("Okay");
                    setSelectedEmotions([]);
                    setView("entry");
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-[#e6f6f1] px-3.5 py-1.5 text-xs font-semibold text-[#1f6f5b] hover:bg-[#d2eee8] transition-colors"
                >
                  <Plus size={16} />
                  <span>{km ? "សរសេរថ្មី" : "New Entry"}</span>
                </button>
              </div>

              {/* Journal Entries List */}
              <div className="mt-6 flex flex-col gap-3.5">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => setSelectedDetailEntry(entry)}
                    className="group flex cursor-pointer items-center justify-between rounded-[20px] border border-gray-200/90 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:border-[#1f6f5b] hover:shadow-md hover:translate-y-[-1px]"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="text-base font-bold text-[#111827] transition-colors group-hover:text-[#1f6f5b]">
                        {entry.date} • {getMoodLabel(entry.mood)}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                        {entry.content}
                      </p>
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {entry.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronRight
                      size={20}
                      className="shrink-0 text-gray-400 group-hover:text-[#1f6f5b] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                ))}
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
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1f6f5b] bg-[#e6f6f1] px-3 py-1 rounded-full">
                    <Calendar size={13} />
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
                    {selectedDetailEntry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-[#1f6f5b]"
                      >
                        {tag}
                      </span>
                    ))}
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
        <BottomNav
          activeTab="Detection"
          onOpenDetection={() => setIsModalOpen(true)}
        />
      </div>

      {/* Detection Modal Sheet */}
      <DetectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
