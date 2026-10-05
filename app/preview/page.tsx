"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Droplets,
  Headphones,
  Heart,
  Leaf,
  Lightbulb,
  Lock,
  MessageSquare,
  Moon,
  Pause,
  Play,
  RotateCcw,
  SendHorizontal,
  ShieldCheck,
  Smartphone,
  Smile,
  Sun,
  UserCheck,
  Users,
  Volume2,
  Wind,
} from "lucide-react";

// Safe SVG Mask for Anonymous Members
function DominoMaskIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 4.5C8.8 4.5 5.5 5.2 2 7.2c-.3.2-.5.5-.5.8v2.5c0 4.2 3.2 7.5 7.2 7.5 1.5 0 2.8-.5 3.3-1.4.5.9 1.8 1.4 3.3 1.4 4 0 7.2-3.3 7.2-7.5V8c0-.3-.2-.6-.5-.8-3.5-2-6.8-2.7-10-2.7zm-4 8.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm8 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
    </svg>
  );
}

// Minimalist Breathing Face Line Art
function BreathingLineArt({ className = "size-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      {/* Profile Outline */}
      <path
        d="M38 18 C46 18 52 24 52 32 C52 38 48 42 45 45 C48 48 54 49 56 53 C58 57 56 61 50 63 C52 66 51 70 48 74 C44 78 38 82 28 82"
        stroke="#245242"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gentle Inhale Waves */}
      <path
        d="M62 48 C68 44 76 44 82 48"
        stroke="#5a9c70"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M58 56 C66 52 74 52 84 56"
        stroke="#5a9c70"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M64 64 C70 60 76 60 82 64"
        stroke="#5a9c70"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type PreviewScreen = "home" | "community";
type MoodType = "calm" | "joyful" | "balanced" | "anxious" | "tired";

type Message = {
  id: string;
  sender: string;
  role?: "mentor" | "peer";
  text: string;
  time: string;
  isSelf?: boolean;
};

const initialMessages: Message[] = [
  {
    id: "msg-1",
    sender: "Anonymous 01",
    role: "peer",
    text: "សួស្តីអ្នកទាំងអស់គ្នា ថ្ងៃនេះខ្ញុំមានអារម្មណ៍ធុញថប់នឹងការងារច្រើនបន្តិច។ (Feeling quite overwhelmed with deadlines today.)",
    time: "10:15 AM",
  },
  {
    id: "msg-2",
    sender: "Mentor Tivea",
    role: "mentor",
    text: "សូមស្វាគមន៍មកកាន់រង្វង់គាំទ្រ។ ការមានអារម្មណ៍បែបនេះគឺជារឿងធម្មជាតិទេ។ តើយើងអាចសាកល្បងលំហាត់ដកដង្ហើម ២ នាទីជាមួយគ្នាបានទេ? (Welcome to this safe space. It is completely valid to feel this way. Shall we do a quick 2-minute breathing reset together?)",
    time: "10:16 AM",
  },
  {
    id: "msg-3",
    sender: "Anonymous 02",
    role: "peer",
    text: "ខ្ញុំទើបតែចូលរួម ឃើញបរិយាកាសស្ងប់ស្ងាត់បែបនេះមានអារម្មណ៍កក់ក្តៅខ្លាំងណាស់។ (Just joined, feeling really comforted by this calm circle.)",
    time: "10:19 AM",
  },
];

export default function DesignSandboxPreviewPage() {
  const [activeScreen, setActiveScreen] = useState<PreviewScreen>("home");
  const [isKhmer, setIsKhmer] = useState(true);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Home Screen Interactive State
  const [selectedMood, setSelectedMood] = useState<MoodType>("calm");
  const [isPlayingBreath, setIsPlayingBreath] = useState(false);
  const [breathTimer, setBreathTimer] = useState(240); // 4 mins in seconds
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [selectedSoundscape, setSelectedSoundscape] = useState<"rain" | "forest" | "bowl">("rain");
  const [journalInput, setJournalInput] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  // Community Sandbox State
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Breathing simulation loop
  useEffect(() => {
    if (!isPlayingBreath) return;

    const interval = setInterval(() => {
      setBreathTimer((prev) => (prev > 0 ? prev - 1 : 240));
    }, 1000);

    const phaseInterval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === "inhale") return "hold";
        if (prev === "hold") return "exhale";
        return "inhale";
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, [isPlayingBreath]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function handleSaveJournal(e: React.FormEvent) {
    e.preventDefault();
    if (!journalInput.trim()) return;
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 3000);
    setJournalInput("");
  }

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: isKhmer ? "អ្នក (You)" : "You (Anonymous)",
      role: "peer",
      text: inputText.trim(),
      time: "Just now",
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  }

  return (
    <div className="min-h-screen bg-[#f3f5f3] text-[#14221f] antialiased">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 border-b border-[#e1e7e3] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#245242] text-white shadow-xs">
              <Leaf size={15} />
            </span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#245242]">
                AROM Studio Preview
              </span>
              <span className="ml-2 hidden text-xs text-gray-500 sm:inline">
                (Zero Code Impact Sandbox)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Screen Selector: Home Redesign vs Community */}
            <div className="flex rounded-full bg-[#e8eee9] p-0.5 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => setActiveScreen("home")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  activeScreen === "home"
                    ? "bg-[#245242] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#245242]"
                }`}
              >
                <span>🏠 {isKhmer ? "គំរូទំព័រដើម (Home Sample)" : "Home Sample"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen("community")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  activeScreen === "community"
                    ? "bg-[#245242] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#245242]"
                }`}
              >
                <span>👥 {isKhmer ? "សហគមន៍ (Community)" : "Community"}</span>
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setIsKhmer(!isKhmer)}
              className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-black text-[#245242] hover:bg-gray-50 active:translate-y-0.5 transition-all shadow-2xs"
            >
              {isKhmer ? "🇰🇭 ខ្មែរ" : "🇺🇸 EN"}
            </button>

            {/* Mobile Frame Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              title="Toggle Mobile Screen Frame"
              className={`hidden size-8 items-center justify-center rounded-xl border transition-all sm:flex ${
                isMobileFrame
                  ? "border-[#245242] bg-[#245242] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Smartphone size={16} />
            </button>

            {/* Link back to Main Live Application */}
            <Link
              href="/"
              className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
            >
              {isKhmer ? "← ត្រឡប់ទៅកម្មវិធីពិត" : "← Back to Live App"}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sandbox Canvas */}
      <main className="py-6 px-3 sm:px-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            isMobileFrame
              ? "max-w-[420px] rounded-[42px] border-[8px] border-[#183a2f] bg-[#faf9f6] shadow-[0_24px_70px_rgba(20,50,40,0.2)] overflow-hidden min-h-[820px]"
              : "max-w-3xl rounded-3xl border border-[#e1e8e2] bg-[#faf9f6] shadow-md p-4 sm:p-8"
          }`}
        >
          {/* ========================================================================= */}
          {/* SCREEN 1: SERENE, EDITORIAL HOME PAGE REDESIGN                            */}
          {/* ========================================================================= */}
          {activeScreen === "home" && (
            <div className="pb-12 text-[#14221f] font-sans">
              {/* Top Greeting Header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-2">
                <div className="flex items-center gap-3">
                  {/* Avatar with Soft Calming Halo */}
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#245242] to-[#407e66] text-white font-extrabold shadow-sm ring-4 ring-[#e5f0ea]">
                    <span className="text-sm">ML</span>
                    <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[#52b788] ring-2 ring-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-black tracking-tight text-[#14221f] sm:text-xl">
                      {isKhmer ? "អរុណសួស្តី Muoyly!" : "Good morning Muoyly!"}
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                      {isKhmer ? "តើថ្ងៃនេះអារម្មណ៍របស់អ្នកយ៉ាងណាដែរ?" : "How is your mind feeling right now?"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#eef4f0] px-3 py-1 text-xs font-black text-[#245242]">
                  {isKhmer ? "ថ្ងៃច័ន្ទ, ០៥ តុលា" : "Mon, Oct 5"}
                </span>
              </div>

              {/* SECTION 1: ELEGANT MOOD CHECK-IN PEBBLES */}
              <section className="mt-5 px-5" aria-label="Mood Check-in">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                    {isKhmer ? "ការពិនិត្យអារម្មណ៍ (Mood Check-in)" : "Mood Check-in"}
                  </h2>
                  <span className="text-[11px] font-bold text-[#245242]">
                    {isKhmer ? "កត់ត្រាដោយស្ងប់ចិត្ត" : "Gentle reflection"}
                  </span>
                </div>

                {/* Horizontal Scroll / Flex Pebbles */}
                <div className="grid grid-cols-5 gap-2">
                  {[
                    {
                      id: "calm",
                      labelKhmer: "ស្ងប់សុខ",
                      labelEn: "Calm",
                      bg: "bg-[#eaf4ed]",
                      border: "border-[#b9dcbf]",
                      activeBorder: "border-[#245242] ring-2 ring-[#245242]/20",
                      textColor: "text-[#1d4436]",
                      icon: "🌿",
                    },
                    {
                      id: "joyful",
                      labelKhmer: "រីករាយ",
                      labelEn: "Joyful",
                      bg: "bg-[#fef8e7]",
                      border: "border-[#f7e09e]",
                      activeBorder: "border-[#d49726] ring-2 ring-[#d49726]/20",
                      textColor: "text-[#875d0f]",
                      icon: "☀️",
                    },
                    {
                      id: "balanced",
                      labelKhmer: "មានលំនឹង",
                      labelEn: "Balanced",
                      bg: "bg-[#edf2ef]",
                      border: "border-[#cbd9d1]",
                      activeBorder: "border-[#406856] ring-2 ring-[#406856]/20",
                      textColor: "text-[#2e4c3e]",
                      icon: "⚖️",
                    },
                    {
                      id: "anxious",
                      labelKhmer: "ថប់បារម្ភ",
                      labelEn: "Anxious",
                      bg: "bg-[#fbf0ea]",
                      border: "border-[#f3cfc0]",
                      activeBorder: "border-[#cb684c] ring-2 ring-[#cb684c]/20",
                      textColor: "text-[#8d3e26]",
                      icon: "🌊",
                    },
                    {
                      id: "tired",
                      labelKhmer: "ហត់នឿយ",
                      labelEn: "Tired",
                      bg: "bg-[#f4eff8]",
                      border: "border-[#ded0e8]",
                      activeBorder: "border-[#7e5c9b] ring-2 ring-[#7e5c9b]/20",
                      textColor: "text-[#543b6b]",
                      icon: "🌙",
                    },
                  ].map((mood) => {
                    const isSelected = selectedMood === mood.id;

                    return (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setSelectedMood(mood.id as MoodType)}
                        className={`flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition-all duration-200 border ${
                          mood.bg
                        } ${isSelected ? `${mood.activeBorder} scale-102 shadow-sm` : `${mood.border} hover:opacity-90`}`}
                      >
                        <span className="text-lg leading-none">{mood.icon}</span>
                        <span className={`mt-1.5 text-[11px] font-black leading-tight ${mood.textColor}`}>
                          {isKhmer ? mood.labelKhmer : mood.labelEn}
                        </span>
                        <span className="text-[9px] text-gray-500 font-medium">
                          {isKhmer ? `(${mood.labelEn})` : `(${mood.labelKhmer})`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Empathetic Insight Response Banner */}
                <div className="mt-3 rounded-2xl bg-white border border-[#e8eee9] p-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eef6f1] text-[#245242]">
                      <Heart size={14} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#14221f] leading-snug">
                        {selectedMood === "calm" &&
                          (isKhmer
                            ? "អារម្មណ៍ស្ងប់ជាមូលដ្ឋានគ្រឹះនៃសេចក្តីសុខផ្លូវចិត្ត។ រក្សាដង្ហើមវែងៗ និងរីករាយនឹងភាពស្ងប់នេះ។"
                            : "Calm is the peaceful foundation of wellness. Savor this mindful stillness.")}
                        {selectedMood === "joyful" &&
                          (isKhmer
                            ? "សូមអបអរសាទរថាមពលវិជ្ជមានរបស់អ្នកថ្ងៃនេះ! ចែករំលែកស្នាមញញឹមនេះជាមួយអ្នកជុំវិញខ្លួន។"
                            : "Celebrate your positive energy today! Let this warmth uplift your day.")}
                        {selectedMood === "balanced" &&
                          (isKhmer
                            ? "តុល្យភាពចិត្តជួយឱ្យអ្នកដោះស្រាយបញ្ហាប្រចាំថ្ងៃដោយភាពច្បាស់លាស់ និងគ្មានភាពប្រញាប់ប្រញាល់។"
                            : "Inner balance gives you clarity to navigate whatever comes your way.")}
                        {selectedMood === "anxious" &&
                          (isKhmer
                            ? "សូមដកដង្ហើមវែងៗមួយ។ ការមានអារម្មណ៍ថប់បារម្ភគឺជារឿងធម្មជាតិទេ។ អ្នកមានសុវត្ថិភាពនៅទីនេះ។"
                            : "Take a slow, deep breath. Your feelings are valid and you are completely safe.")}
                        {selectedMood === "tired" &&
                          (isKhmer
                            ? "ការសម្រាកមិនមែនជាការខ្ជះខ្ជាយពេលទេ តែជាការផ្តល់កម្លាំងថ្មីដល់ចិត្ត និងរាងកាយរបស់អ្នក។"
                            : "Rest is necessary medicine for the mind. Be gentle with yourself today.")}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: HERO MORNING CLARITY RESET WITH BREATHING SIMULATOR */}
              <section className="mt-5 px-5" aria-label="Morning Reset">
                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1b4332] via-[#245242] to-[#2f6753] p-5 text-white shadow-md">
                  {/* Subtle Background Pattern */}
                  <div className="absolute -top-12 -right-12 size-48 rounded-full bg-white/5 blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-[#c8eedb] backdrop-blur-md">
                        <Wind size={12} />
                        {isKhmer ? "វគ្គសតិប្រចាំព្រឹក" : "Morning Clarity Reset"}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-white/90">
                        <Volume2 size={12} />
                        <span>{formatTime(breathTimer)}</span>
                      </span>
                    </div>

                    <div className="mt-4 flex flex-col items-center justify-center text-center">
                      {/* Animated Breathing Circle */}
                      <div className="relative my-2 flex size-36 items-center justify-center">
                        {/* Outer Glow Ring */}
                        <div
                          className={`absolute inset-0 rounded-full bg-[#52b788]/20 transition-all duration-1000 ${
                            isPlayingBreath
                              ? breathPhase === "inhale"
                                ? "scale-110 opacity-80"
                                : breathPhase === "hold"
                                ? "scale-105 opacity-60"
                                : "scale-90 opacity-30"
                              : "scale-100 opacity-40"
                          }`}
                        />
                        {/* Middle Ring */}
                        <div
                          className={`absolute inset-3 rounded-full border border-[#52b788]/40 transition-all duration-1000 ${
                            isPlayingBreath
                              ? breathPhase === "inhale"
                                ? "scale-105"
                                : breathPhase === "hold"
                                ? "scale-100"
                                : "scale-95"
                              : "scale-100"
                          }`}
                        />
                        {/* Core Ripple Circle */}
                        <div className="relative z-10 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-[#3b7e65] to-[#1e4838] shadow-inner text-center">
                          {isPlayingBreath ? (
                            <div className="px-1 text-center">
                              <p className="text-[10px] font-black uppercase tracking-wider text-[#a7f3d0]">
                                {breathPhase === "inhale" && (isKhmer ? "ដកចូល" : "Inhale")}
                                {breathPhase === "hold" && (isKhmer ? "ទប់ចិត្ត" : "Hold")}
                                {breathPhase === "exhale" && (isKhmer ? "បញ្ចេញ" : "Exhale")}
                              </p>
                              <p className="text-xs font-extrabold text-white">4s</p>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsPlayingBreath(true)}
                              className="flex size-14 items-center justify-center rounded-full bg-white text-[#1b4332] shadow-md hover:scale-105 transition-transform"
                              aria-label="Start Morning Reset"
                            >
                              <Play size={20} className="ml-1 fill-[#1b4332]" />
                            </button>
                          )}
                        </div>
                      </div>

                      <h3 className="mt-1 text-base font-extrabold tracking-tight text-white">
                        {isKhmer
                          ? "លំហាត់ដកដង្ហើមស្ងប់ចិត្ត ៤ នាទី"
                          : "4-Minute Mindful Reset"}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/80 max-w-xs leading-relaxed">
                        {isKhmer
                          ? "ស្រូបយកខ្យល់បរិសុទ្ធ បញ្ចេញភាពតានតឹង និងចាប់ផ្តើមថ្ងៃថ្មីដោយភាពស្រស់ថ្លា។"
                          : "Inhale tranquility, exhale tension, and begin your day centered."}
                      </p>

                      {/* Control Bar & Soundscape Picker */}
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsPlayingBreath(!isPlayingBreath)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-black text-[#1b4332] shadow-sm hover:bg-[#f0f7f3] transition-colors"
                        >
                          {isPlayingBreath ? (
                            <>
                              <Pause size={13} className="fill-[#1b4332]" />
                              <span>{isKhmer ? "ផ្អាក" : "Pause"}</span>
                            </>
                          ) : (
                            <>
                              <Play size={13} className="fill-[#1b4332]" />
                              <span>{isKhmer ? "ចាប់ផ្តើមហាត់" : "Start Session"}</span>
                            </>
                          )}
                        </button>

                        {/* Soundscapes */}
                        <div className="flex items-center gap-1 rounded-full bg-white/10 p-0.5 text-[11px] font-bold backdrop-blur-xs">
                          {[
                            { id: "rain", label: isKhmer ? "ទឹកភ្លៀង" : "Rain" },
                            { id: "forest", label: isKhmer ? "ព្រៃព្រឹក្សា" : "Forest" },
                            { id: "bowl", label: isKhmer ? "កណ្តឹងសតិ" : "Bell" },
                          ].map((sound) => (
                            <button
                              key={sound.id}
                              type="button"
                              onClick={() => setSelectedSoundscape(sound.id as any)}
                              className={`rounded-full px-2.5 py-1 transition-all ${
                                selectedSoundscape === sound.id
                                  ? "bg-white text-[#1b4332] shadow-2xs font-black"
                                  : "text-white/80 hover:text-white"
                              }`}
                            >
                              {sound.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: TODAY'S MINDFUL PRACTICES (BENTO GRID) */}
              <section className="mt-6 px-5" aria-label="Today's Mindful Practices">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                    {isKhmer ? "លំហាត់សតិប្រចាំថ្ងៃ (Today's Practices)" : "Today's Practices"}
                  </h2>
                  <span className="text-[11px] font-bold text-[#245242]">
                    {isKhmer ? "វគ្គណែនាំខ្លីៗ" : "Curated sessions"}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Practice 1: 4-7-8 Breathing */}
                  <div className="group rounded-[22px] border border-[#e5ece7] bg-white p-4 shadow-2xs hover:border-[#245242]/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="rounded-md bg-[#eaf4ed] px-2 py-0.5 text-[10px] font-bold text-[#245242]">
                          {isKhmer ? "៥ នាទី • ដកដង្ហើម" : "5 mins • Breathing"}
                        </span>
                        <h3 className="mt-1.5 text-sm font-extrabold text-[#14221f]">
                          {isKhmer ? "ដកដង្ហើម 4-7-8" : "4-7-8 Relaxation Breath"}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-gray-500 leading-snug">
                          {isKhmer
                            ? "កាត់បន្ថយភាពតានតឹង និងជួយឱ្យប្រព័ន្ធប្រសាទស្ងប់។"
                            : "De-escalate stress and regulate your nervous system."}
                        </p>
                      </div>
                      <div className="shrink-0 -mt-1 ml-2">
                        <BreathingLineArt className="size-13 text-[#245242]" />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
                      <span className="text-[10px] font-bold text-gray-400">
                        {isKhmer ? "សតិប្រព័ន្ធប្រសាទ" : "Vagus reset"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsPlayingBreath(true)}
                        className="inline-flex items-center gap-1 text-xs font-black text-[#245242] hover:underline"
                      >
                        <span>{isKhmer ? "ហាត់ឥឡូវនេះ" : "Practice"}</span>
                        <ChevronRight size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Practice 2: Sleep Meditation */}
                  <div className="group rounded-[22px] border border-[#e5ece7] bg-white p-4 shadow-2xs hover:border-[#245242]/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="rounded-md bg-[#f2eef8] px-2 py-0.5 text-[10px] font-bold text-[#684b85]">
                          {isKhmer ? "១២ នាទី • ដំណេក" : "12 mins • Sleep"}
                        </span>
                        <h3 className="mt-1.5 text-sm font-extrabold text-[#14221f]">
                          {isKhmer ? "សមាធិមុនចូលគេង" : "Deep Sleep Wind Down"}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-gray-500 leading-snug">
                          {isKhmer
                            ? "រំសាយគំនិតដែលវិលវល់ សម្រាកសាច់ដុំដើម្បីដំណេកស្កប់។"
                            : "Unwind busy thoughts and drift into deep, restorative sleep."}
                        </p>
                      </div>
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#f2eef8] text-[#684b85] ml-2">
                        <Moon size={20} />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
                      <span className="text-[10px] font-bold text-gray-400">
                        {isKhmer ? "សំឡេងមគ្គុទ្ទេសក៍" : "Guided audio"}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-black text-[#684b85] hover:underline"
                      >
                        <span>{isKhmer ? "ស្តាប់ឥឡូវនេះ" : "Listen"}</span>
                        <ChevronRight size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Practice 3: Reflection Journal Card */}
                  <div className="group rounded-[22px] border border-[#e5ece7] bg-white p-4 shadow-2xs sm:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-[#fbf0ea] text-[#cb684c]">
                          <BookOpen size={15} />
                        </span>
                        <div>
                          <h3 className="text-xs font-black text-[#14221f]">
                            {isKhmer ? "កំណត់ត្រាដឹងគុណប្រចាំថ្ងៃ" : "Daily Reflection Prompt"}
                          </h3>
                          <p className="text-[10px] text-gray-500">
                            {isKhmer ? "តើអ្វីដែលបានធ្វើឱ្យចិត្តរបស់អ្នកស្ងប់ថ្ងៃនេះ?" : "What brought peace to your heart today?"}
                          </p>
                        </div>
                      </div>

                      {journalSaved && (
                        <span className="rounded-full bg-[#eaf4ed] px-2.5 py-0.5 text-[10px] font-black text-[#245242]">
                          ✓ {isKhmer ? "បានរក្សាទុក" : "Saved"}
                        </span>
                      )}
                    </div>

                    <form onSubmit={handleSaveJournal} className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={journalInput}
                        onChange={(e) => setJournalInput(e.target.value)}
                        placeholder={
                          isKhmer
                            ? "សរសេរការឆ្លុះបញ្ចាំងខ្លីមួយ... (ឧ. ពែងតែពេលព្រឹក)"
                            : "Write a short reflection... (e.g. peaceful morning tea)"
                        }
                        className="flex-1 rounded-xl border border-gray-200 bg-[#f9fbf9] px-3 py-2 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:border-[#245242] focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!journalInput.trim()}
                        className="rounded-xl bg-[#245242] px-3.5 py-2 text-xs font-black text-white disabled:opacity-40 hover:bg-[#1a3d31] transition-colors shrink-0"
                      >
                        {isKhmer ? "កត់ត្រា" : "Save"}
                      </button>
                    </form>
                  </div>
                </div>
              </section>

              {/* SECTION 4: WEEKLY EMOTIONAL BALANCE RHYTHM */}
              <section className="mt-6 px-5" aria-label="Weekly Emotional Rhythm">
                <div className="rounded-[24px] border border-[#e5ece7] bg-white p-5 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        {isKhmer ? "ស្ថិតិអារម្មណ៍សប្តាហ៍នេះ" : "Weekly Rhythm"}
                      </span>
                      <h3 className="text-sm font-black text-[#14221f]">
                        {isKhmer ? "តុល្យភាពអារម្មណ៍ប្រចាំសប្តាហ៍" : "Emotional Balance Rhythm"}
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#eaf4ed] px-2.5 py-1 text-xs font-black text-[#245242]">
                      76% {isKhmer ? "មានលំនឹងល្អ" : "Balanced"}
                    </span>
                  </div>

                  {/* Clean SVG Mood Rhythm Wave */}
                  <div className="relative pt-2 pb-1">
                    <svg viewBox="0 0 320 80" className="w-full h-20 overflow-visible" fill="none">
                      <defs>
                        <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#245242" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#245242" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path
                        d="M 10 55 Q 50 20 90 40 T 170 30 T 250 20 T 310 35 L 310 80 L 10 80 Z"
                        fill="url(#waveGradient)"
                      />

                      {/* Wave Line */}
                      <path
                        d="M 10 55 Q 50 20 90 40 T 170 30 T 250 20 T 310 35"
                        stroke="#245242"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Day Markers */}
                      {[
                        { cx: 10, cy: 55, day: isKhmer ? "ច" : "M" },
                        { cx: 60, cy: 28, day: isKhmer ? "អ" : "T" },
                        { cx: 110, cy: 42, day: isKhmer ? "ព" : "W" },
                        { cx: 160, cy: 32, day: isKhmer ? "ព្រ" : "T" },
                        { cx: 210, cy: 22, day: isKhmer ? "សុ" : "F" },
                        { cx: 260, cy: 24, day: isKhmer ? "ស" : "S" },
                        { cx: 310, cy: 35, day: isKhmer ? "អា" : "S" },
                      ].map((pt, i) => (
                        <g key={i}>
                          <circle cx={pt.cx} cy={pt.cy} r="4" fill="#ffffff" stroke="#245242" strokeWidth="2" />
                          <text
                            x={pt.cx}
                            y={78}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="bold"
                            fill="#8d9993"
                          >
                            {pt.day}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Compass size={14} className="text-[#245242]" />
                      <span>
                        {isKhmer ? "ការណែនាំពី MindGuide" : "MindGuide Clinical Note"}
                      </span>
                    </div>
                    <span className="font-bold text-[#245242]">
                      {isKhmer ? "ស្ថិរភាពល្អប្រសើរ +១២%" : "+12% Stability"}
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 5: THERAPIST CONSULTATION CALLOUT */}
              <section className="mt-6 px-5 pb-6" aria-label="Professional Support">
                <div className="rounded-[24px] border border-[#d6e5dc] bg-[#eef6f1] p-4.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#245242] text-white">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#14221f]">
                        {isKhmer ? "ត្រូវការការពិភាក្សាជាមួយអ្នកជំនាញ?" : "Need to speak with a therapist?"}
                      </h4>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {isKhmer
                          ? "កក់ការពិគ្រោះយោបល់អនឡាញជាមួយអ្នកចិត្តសាស្រ្តមានអាជ្ញាប័ណ្ណ។"
                          : "Confidential 1-on-1 sessions with licensed Cambodian counselors."}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/therapists"
                    className="shrink-0 rounded-xl bg-[#245242] px-3 py-2 text-xs font-black text-white hover:bg-[#1a3d31] transition-colors"
                  >
                    {isKhmer ? "កក់ការណាត់" : "Book"}
                  </Link>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 2: COMMUNITY REDESIGN SANCTUARY                                    */}
          {/* ========================================================================= */}
          {activeScreen === "community" && (
            <div className="pb-10 font-sans">
              {/* Organic Soft Sage Curved Arch Header */}
              <div className="relative overflow-hidden rounded-b-[36px] bg-gradient-to-br from-[#245242] via-[#2d6150] to-[#397260] px-5 pt-6 pb-8 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Lock size={12} className="text-[#a7f3d0]" />
                    {isKhmer ? "១០០% អនាមិក និងសុវត្ថិភាព" : "100% Anonymous Safe Space"}
                  </span>

                  <span className="text-xs text-white/80 font-medium">
                    {isKhmer ? "សហគមន៍ ARom" : "ARom Sanctuary"}
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
                  {isKhmer ? "សហគមន៍ (Community)" : "Peer Support Circles"}
                </h1>
                <p className="mt-1 text-xs text-white/85 leading-relaxed max-w-xs">
                  {isKhmer
                    ? "កន្លែងសុវត្ថិភាពដើម្បីចែករំលែក ទទួលការយល់ចិត្ត និងរីកចម្រើនជាមួយគ្នា។"
                    : "A safe, non-judgmental space to connect and heal together."}
                </p>
              </div>

              {/* Main Featured Active Circle Card */}
              <div className="px-4 -mt-5">
                <div className="rounded-[26px] border border-[#e4ede7] bg-white p-5 shadow-[0_8px_24px_rgba(25,50,40,0.06)]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#255243]">
                      <Users size={13} />
                      {isKhmer ? "ក្រុមគាំទ្រសកម្មរបស់អ្នក" : "Active Circle"}
                    </span>
                    <span className="rounded-full bg-[#e6f4ef] px-2.5 py-0.5 text-[11px] font-bold text-[#1f6f5b]">
                      8 / 10 {isKhmer ? "សមាជិក" : "members"}
                    </span>
                  </div>

                  <h2 className="mt-2 text-lg font-extrabold text-[#111827]">
                    {isKhmer
                      ? "ក្រុមគាំទ្រភាពតានតឹង (Stress & Burnout Support)"
                      : "Stress & Burnout Support"}
                  </h2>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7faf8] p-3 border border-[#edf3ef]">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#255243] text-white font-bold text-xs">
                        TV
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#111827]">Mentor Tivea</p>
                        <p className="text-[10px] text-gray-500">
                          {isKhmer ? "អ្នកសម្របសម្រួលសតិ" : "Certified Guide"}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/community"
                      className="inline-flex items-center gap-1 rounded-full bg-[#255243] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3d31]"
                    >
                      <span>{isKhmer ? "ចូលរង្វង់" : "Enter Circle"}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Kindness Guidelines Reminder */}
                <div className="mt-4 rounded-2xl border border-[#cfe2d7] bg-[#f0f7f2] p-4 text-xs text-[#245242]">
                  <div className="flex items-center gap-2 font-black mb-1">
                    <ShieldCheck size={16} />
                    <span>{isKhmer ? "គោលការណ៍សហគមន៍សុវត្ថិភាព" : "Safe Circle Guidelines"}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    {isKhmer
                      ? "ការរក្សាការសម្ងាត់ គ្មានការវិនិច្ឆ័យ និងការគោរពបទពិសោធន៍របស់សមាជិកគ្រប់រូប។"
                      : "Zero judgment, full confidentiality, and deep empathy for every member's lived experience."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
