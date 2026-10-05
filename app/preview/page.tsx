"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Check,
  ChevronRight,
  Clock,
  Droplets,
  Heart,
  Leaf,
  Lock,
  MessageSquare,
  SendHorizontal,
  ShieldCheck,
  Smartphone,
  Smile,
  Users,
} from "lucide-react";

// Safe SVG Mask for Anonymous Members
function DominoMaskIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 4.5C8.8 4.5 5.5 5.2 2 7.2c-.3.2-.5.5-.5.8v2.5c0 4.2 3.2 7.5 7.2 7.5 1.5 0 2.8-.5 3.3-1.4.5.9 1.8 1.4 3.3 1.4 4 0 7.2-3.3 7.2-7.5V8c0-.3-.2-.6-.5-.8-3.5-2-6.8-2.7-10-2.7zm-4 8.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm8 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
    </svg>
  );
}

// Cute Gentle Sprout Mascot "Aromi" (AROM's Empathetic Wellness Companion)
function AromiSproutMascot({ className = "size-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {/* Ground Soft Shadow */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#1b4d3d" fillOpacity="0.16" />
      {/* Tiny Rounded Feet */}
      <ellipse cx="46" cy="106" rx="8" ry="5" fill="#7ba88a" />
      <ellipse cx="74" cy="106" rx="8" ry="5" fill="#7ba88a" />
      {/* Plump Round Sprout Body in Calming Sage Matcha */}
      <path
        d="M60 26 C36 26 22 48 22 74 C22 98 38 106 60 106 C82 106 98 98 98 74 C98 48 84 26 60 26 Z"
        fill="#98caa4"
      />
      {/* Soft Belly Light Patch */}
      <ellipse cx="60" cy="80" rx="26" ry="18" fill="#b9e1c3" fillOpacity="0.6" />
      {/* Twin Sprout Leaves on Head */}
      <path
        d="M60 28 C56 12 44 8 36 12 C28 16 34 28 58 28 Z"
        fill="#5a9c70"
      />
      <path
        d="M60 28 C64 12 76 8 84 12 C92 16 86 28 62 28 Z"
        fill="#6fb085"
      />
      {/* Leaf Vein Details */}
      <path d="M50 22 C44 18 40 16 38 14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M70 22 C76 18 80 16 82 14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Cheerful Friendly Eyes */}
      <ellipse cx="45" cy="62" rx="5" ry="6.5" fill="#1a3d2e" />
      <ellipse cx="75" cy="62" rx="5" ry="6.5" fill="#1a3d2e" />
      {/* Catchlight Highlights */}
      <circle cx="47" cy="59.5" r="2.2" fill="#ffffff" />
      <circle cx="77" cy="59.5" r="2.2" fill="#ffffff" />
      <circle cx="43.5" cy="64" r="1.1" fill="#ffffff" />
      <circle cx="73.5" cy="64" r="1.1" fill="#ffffff" />
      {/* Sweet Peachy Cheeks */}
      <ellipse cx="34" cy="70" rx="6" ry="3.5" fill="#f09a82" fillOpacity="0.85" />
      <ellipse cx="86" cy="70" rx="6" ry="3.5" fill="#f09a82" fillOpacity="0.85" />
      {/* Empathetic Smile */}
      <path
        d="M53 69 Q60 76 67 69"
        stroke="#1a3d2e"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Welcoming Little Hands */}
      <path
        d="M24 68 C16 64 12 56 16 54 C20 52 24 60 26 66"
        fill="#85be93"
      />
      <path
        d="M96 68 C104 64 108 56 104 54 C100 52 96 60 94 66"
        fill="#85be93"
      />
    </svg>
  );
}

type StyleMode = "duolingo" | "sanctuary";
type SandboxView = "overview" | "chat";

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
  {
    id: "msg-4",
    sender: "Mentor Tivea",
    role: "mentor",
    text: "ពិតណាស់! សូមចាំថានៅទីនេះ យើងមិនវិនិច្ឆ័យគ្នាឡើយ។ សូមចំណាយពេលតាមសម្រួល។ (Remember that there is zero judgment here. Take all the time you need.)",
    time: "10:21 AM",
  },
];

export default function DesignSandboxPreviewPage() {
  const [styleMode, setStyleMode] = useState<StyleMode>("duolingo");
  const [activeView, setActiveView] = useState<SandboxView>("overview");
  const [isKhmer, setIsKhmer] = useState(true);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [kindnessDrops, setKindnessDrops] = useState(24);
  const [mindfulnessStreak] = useState(15);
  const [heartBlooms] = useState(10);
  const [gardenBloom, setGardenBloom] = useState(82);
  const [cheeredStep3, setCheeredStep3] = useState(false);
  const [showCheerToast, setShowCheerToast] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeView === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeView]);

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
    // Reward with +5 kindness drops when contributing in Duolingo concept
    if (styleMode === "duolingo") {
      setKindnessDrops((d) => d + 5);
      setGardenBloom((g) => Math.min(100, g + 2));
    }
  }

  function handleDropCheer() {
    if (!cheeredStep3) {
      setCheeredStep3(true);
      setKindnessDrops((d) => d + 5);
      setGardenBloom((g) => Math.min(100, g + 4));
      setShowCheerToast(true);
      setTimeout(() => setShowCheerToast(false), 3000);
    }
  }

  function handleWaterGarden() {
    setKindnessDrops((d) => d + 5);
    setGardenBloom((g) => Math.min(100, g + 5));
    setShowCheerToast(true);
    setTimeout(() => setShowCheerToast(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f3f6f3] text-[#14221f] antialiased">
      {/* Top Floating Sandbox Control Bar */}
      <header className="sticky top-0 z-50 border-b border-[#e2e8e4] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#245242] text-white shadow-xs">
              <Leaf size={15} />
            </span>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#245242]">
                AROM Sandbox
              </span>
              <span className="ml-2 hidden text-xs text-gray-500 sm:inline">
                (Isolated Preview, No Code Modified)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Style Selector: Duolingo Concept vs Sanctuary */}
            <div className="flex rounded-full bg-[#e8eee9] p-0.5 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => setStyleMode("duolingo")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  styleMode === "duolingo"
                    ? "bg-[#245242] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#245242]"
                }`}
              >
                <span>🌱 Duolingo Concept</span>
              </button>
              <button
                type="button"
                onClick={() => setStyleMode("sanctuary")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  styleMode === "sanctuary"
                    ? "bg-[#255243] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#255243]"
                }`}
              >
                <span>🌿 Calm Sanctuary</span>
              </button>
            </div>

            {/* View Switcher */}
            <div className="flex rounded-full bg-[#f2f4f2] border border-gray-200 p-0.5 text-xs font-semibold text-gray-700">
              <button
                type="button"
                onClick={() => setActiveView("overview")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  activeView === "overview"
                    ? "bg-white text-gray-900 shadow-xs font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                {isKhmer ? "ផ្លូវសតិ (Journey)" : "Journey"}
              </button>
              <button
                type="button"
                onClick={() => setActiveView("chat")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  activeView === "chat"
                    ? "bg-white text-gray-900 shadow-xs font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                {isKhmer ? "ជជែកក្រុម (Chat)" : "Chat"}
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setIsKhmer(!isKhmer)}
              className="rounded-full border-2 border-b-3 border-[#d0ded5] bg-white px-2.5 py-1 text-xs font-extrabold text-[#245242] hover:bg-gray-50 active:translate-y-0.5 transition-all"
            >
              {isKhmer ? "🇰🇭 ខ្មែរ" : "🇺🇸 EN"}
            </button>

            {/* Mobile Frame Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              title="Toggle Mobile Screen Frame"
              className={`hidden size-8 items-center justify-center rounded-xl border-2 border-b-3 transition-all sm:flex ${
                isMobileFrame
                  ? "border-[#245242] bg-[#245242] text-white border-b-[#143026]"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 border-b-[#d5d5d5]"
              }`}
            >
              <Smartphone size={16} />
            </button>

            {/* Link back to Main Live Application */}
            <Link
              href="/community"
              className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {isKhmer ? "← ត្រឡប់ទៅកម្មវិធីពិត" : "← Back to Live App"}
            </Link>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {showCheerToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-2xl border-2 border-[#a7d1b6] bg-[#eaf5ee] px-4 py-2 text-xs font-black text-[#1e4839] shadow-lg animate-bounce">
          💧 {isKhmer ? "បានបន្ថែម +5 តំណក់សេចក្តីល្អទៅកាន់សួនសហគមន៍!" : "+5 Kindness Drops added to Community Garden!"}
        </div>
      )}

      {/* Main Sandbox Canvas */}
      <main className="py-6 px-3 sm:px-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            isMobileFrame
              ? styleMode === "duolingo"
                ? "max-w-[420px] rounded-[42px] border-[8px] border-[#1e4436] bg-[#fbfcf9] shadow-[0_24px_60px_rgba(30,75,55,0.22)] overflow-hidden min-h-[790px]"
                : "max-w-[420px] rounded-[36px] border-[6px] border-[#223d32] bg-[#fdfcf9] shadow-[0_24px_60px_rgba(20,40,30,0.18)] overflow-hidden min-h-[780px]"
              : "max-w-2xl rounded-3xl border-2 border-[#e5e5e5] bg-white shadow-md p-4 sm:p-6"
          }`}
        >
          {/* ========================================================================= */}
          {/* STYLE A: DUOLINGO CONCEPT (Path Roadmap, Gentle Mascot, Tactile 3D Cards) */}
          {/* ========================================================================= */}
          {styleMode === "duolingo" && (
            <div className="pb-10 font-sans">
              {/* Soothing Wellness Counters (Duolingo Mechanics, AROM Palette) */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-[#e6ece7] bg-white/95 px-5 py-3 backdrop-blur-sm">
                {/* Mindfulness Streak */}
                <div
                  className="flex items-center gap-1.5 font-extrabold text-[#245242]"
                  title={isKhmer ? "សតិប្រចាំថ្ងៃ" : "Mindfulness Streak"}
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#eaf4ed] text-[#245242]">
                    <Leaf size={16} />
                  </span>
                  <div>
                    <span className="text-sm font-black">{mindfulnessStreak}</span>
                    <span className="text-[10px] text-gray-500 ml-1">{isKhmer ? "ថ្ងៃ" : "d"}</span>
                  </div>
                </div>

                {/* Kindness Drops */}
                <div
                  className="flex items-center gap-1.5 font-extrabold text-[#2a7b9b]"
                  title={isKhmer ? "តំណក់សេចក្តីល្អ" : "Kindness Drops"}
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#e8f4f8] text-[#2a7b9b]">
                    <Droplets size={16} />
                  </span>
                  <div>
                    <span className="text-sm font-black">{kindnessDrops}</span>
                    <span className="text-[10px] text-gray-500 ml-1">{isKhmer ? "តំណក់" : "pts"}</span>
                  </div>
                </div>

                {/* Heart Blooms / Inner Harmony */}
                <div
                  className="flex items-center gap-1.5 font-extrabold text-[#cb684c]"
                  title={isKhmer ? "ថាមពលចិត្ត" : "Heart Blooms"}
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#fbeee9] text-[#cb684c]">
                    <Heart size={16} />
                  </span>
                  <div>
                    <span className="text-sm font-black">{heartBlooms}</span>
                    <span className="text-[10px] text-gray-500 ml-1">{isKhmer ? "ផ្កា" : "blooms"}</span>
                  </div>
                </div>
              </div>

              {activeView === "overview" && (
                <div className="px-4 pt-4 space-y-4">
                  {/* Header Title Banner */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-black tracking-tight text-[#14221f]">
                        {isKhmer ? "ផ្លូវសតិសហគមន៍" : "Community Journey"}
                      </h1>
                      <p className="text-xs font-bold text-gray-500">
                        {isKhmer
                          ? "បោះជំហានសតិមួយៗជាមួយមិត្តភក្តិក្នុងសហគមន៍"
                          : "Take gentle mindful steps together"}
                      </p>
                    </div>

                    <span className="rounded-2xl border-2 border-b-3 border-[#cce0d4] bg-[#eef6f1] px-2.5 py-1 text-[11px] font-black text-[#245242]">
                      🔒 {isKhmer ? "អនាមិក" : "Anonymous"}
                    </span>
                  </div>

                  {/* DUOLINGO STEPPING STONES PATHWAY */}
                  <div className="relative py-4 px-2">
                    {/* Organic Connecting Curved S-Path Line */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 360 480"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 180 50 C 260 80, 270 120, 240 160 C 180 220, 90 220, 110 280 C 130 340, 240 340, 220 390 C 200 430, 180 430, 180 450"
                        stroke="#d5e5db"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="4 8"
                      />
                    </svg>

                    {/* NODE 1: Grounding Check-in (Completed) */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className="size-15 rounded-full border-2 border-b-4 border-[#5a9c70] border-b-[#427a55] bg-[#78b98e] flex items-center justify-center text-white shadow-xs">
                        <Check size={26} strokeWidth={3} />
                      </div>
                      <span className="mt-1.5 rounded-full bg-white/90 border border-[#cfe2d6] px-2 py-0.5 text-[10px] font-black text-[#2e573e] shadow-xs">
                        1. {isKhmer ? "ពិនិត្យអារម្មណ៍ (Check-in) ✓" : "Daily Check-in ✓"}
                      </span>
                    </div>

                    {/* NODE 2: Active Peer Circle with Mascot Aromi */}
                    <div className="mt-6 flex items-center justify-end pr-2 sm:pr-4 relative z-10">
                      {/* Aromi Mascot Speech Balloon Card */}
                      <div className="mr-2 flex items-center gap-2 max-w-[215px] rounded-2xl border-2 border-b-3 border-[#cde0d4] bg-white p-2.5 shadow-sm text-left">
                        <div className="shrink-0 -ml-1">
                          <AromiSproutMascot className="size-13 drop-shadow-xs" />
                        </div>
                        <div className="min-w-0">
                          <span className="rounded-md bg-[#eaf4ed] px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider text-[#245242]">
                            {isKhmer ? "រង្វង់សកម្ម" : "Active Circle"}
                          </span>
                          <p className="mt-0.5 text-xs font-black text-[#14221f] leading-tight">
                            {isKhmer ? "ក្រុមគាំទ្រភាពតានតឹង" : "Stress & Burnout"}
                          </p>
                          <button
                            type="button"
                            onClick={() => setActiveView("chat")}
                            className="mt-1.5 inline-flex items-center gap-1 rounded-xl border border-b-2 border-[#163629] border-b-[#0e231b] bg-[#245242] px-2.5 py-1 text-[10px] font-black uppercase text-white shadow-xs hover:bg-[#2c6350] active:translate-y-0.5"
                          >
                            <span>{isKhmer ? "ចូលជជែក" : "Enter Chat"}</span>
                            <ChevronRight size={11} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>

                      {/* Tactile Circle Node Button */}
                      <button
                        type="button"
                        onClick={() => setActiveView("chat")}
                        aria-label="Open Stress & Burnout Circle Chat"
                        className="relative size-17 rounded-full border-3 border-b-6 border-[#183d2e] border-b-[#0e241b] bg-[#245242] flex items-center justify-center text-white shadow-md hover:bg-[#2d6652] active:translate-y-1 active:border-b-3 transition-all shrink-0"
                      >
                        <MessageSquare size={24} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* NODE 3: Interactive Cheer Drop (Micro-Action) */}
                    <div className="mt-7 flex items-center justify-start pl-2 sm:pl-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleDropCheer}
                          aria-label="Drop 1 supportive cheer"
                          className={`size-16 rounded-full border-2 border-b-5 flex items-center justify-center transition-all active:translate-y-1 shrink-0 ${
                            cheeredStep3
                              ? "border-[#276e8e] border-b-[#1b4b60] bg-[#3a8ab2] text-white"
                              : "border-[#3f88a9] border-b-[#265e77] bg-[#5ba4c8] text-white hover:bg-[#4d97bb]"
                          }`}
                        >
                          <Droplets size={24} strokeWidth={2.5} />
                        </button>

                        <div className="rounded-2xl border-2 border-b-3 border-[#cde0d4] bg-white p-2.5 shadow-sm max-w-[190px]">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#2a7b9b]">
                            {isKhmer ? "ជំហានទី ៣ • មីក្រូសកម្មភាព" : "Step 3 • Micro Action"}
                          </span>
                          <p className="text-xs font-black text-[#14221f]">
                            {isKhmer ? "ផ្ញើតំណក់លើកទឹកចិត្ត ១" : "Drop 1 Cheer"}
                          </p>
                          <button
                            type="button"
                            onClick={handleDropCheer}
                            className={`mt-1 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-black transition-all ${
                              cheeredStep3
                                ? "bg-[#e8f4f8] text-[#2a7b9b]"
                                : "bg-[#2a7b9b] text-white active:translate-y-0.5"
                            }`}
                          >
                            {cheeredStep3
                              ? isKhmer
                                ? "✓ បានចែករំលែក (+5 💧)"
                                : "✓ Completed (+5 💧)"
                              : isKhmer
                              ? "ចុចដើម្បីផ្ញើ (+5 💧)"
                              : "Tap to Cheer (+5 💧)"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* NODE 4: Evening Decompress Circle (Scheduled tonight) */}
                    <div className="mt-7 flex items-center justify-end pr-8 sm:pr-12 relative z-10">
                      <div className="flex items-center gap-2.5 flex-row-reverse text-right">
                        <div className="size-14 rounded-full border-2 border-b-3 border-[#c8d4cd] border-b-[#aebfb6] bg-[#e2ebe5] flex items-center justify-center text-[#74877e] shrink-0">
                          <Lock size={17} strokeWidth={2.5} />
                        </div>
                        <div className="rounded-2xl border-2 border-b-3 border-[#e0e8e2] bg-white/80 p-2 shadow-2xs max-w-[160px]">
                          <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                            {isKhmer ? "ម៉ោង 8:00 យប់" : "8:00 PM Tonight"}
                          </span>
                          <p className="text-xs font-bold text-gray-700 leading-tight">
                            {isKhmer ? "រង្វង់ស្ងប់ចិត្តពេលយប់" : "Evening Calm"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* NODE 5: Wellness Harmony Milestone Gift */}
                    <div className="mt-7 flex flex-col items-center justify-center relative z-10">
                      <div className="size-15 rounded-full border-2 border-b-4 border-[#9e4a33] border-b-[#773322] bg-[#c86246] flex items-center justify-center text-white shadow-xs">
                        <Award size={24} strokeWidth={2.5} />
                      </div>
                      <span className="mt-1.5 rounded-full bg-white/90 border border-[#eed0c8] px-2.5 py-0.5 text-[10px] font-black text-[#873a26] shadow-xs">
                        {isKhmer ? "រង្វាន់សុខុមាលភាព (Harmony Seed)" : "Milestone Harmony Seed"}
                      </span>
                    </div>
                  </div>

                  {/* DUOLINGO "FRIENDS QUEST" CONCEPT: COMMUNITY KINDNESS GARDEN */}
                  <div className="rounded-3xl border-2 border-b-4 border-[#dce8e0] border-b-[#c4d6cb] bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-xl bg-[#eaf4ed] text-[#245242]">
                          <Leaf size={17} />
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-[#14221f]">
                            {isKhmer ? "សួនសេចក្តីល្អសហគមន៍" : "Community Kindness Garden"}
                          </h3>
                          <p className="text-[10px] font-bold text-gray-500">
                            {isKhmer
                              ? "ស្រោចទឹកសួនរួមគ្នាដោយការលើកទឹកចិត្ត"
                              : "Watering our collective wellness together"}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-xl border border-[#cbe0d3] bg-[#f0f7f2] px-2.5 py-1 text-xs font-black text-[#245242]">
                        {gardenBloom}% {isKhmer ? "រីកស្គុះស្គាយ" : "Bloomed"}
                      </span>
                    </div>

                    {/* Garden Bloom Progress Bar */}
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-[#e8efe9]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#78b98e] via-[#5a9c70] to-[#245242] transition-all duration-500"
                        style={{ width: `${gardenBloom}%` }}
                      />
                      <div className="absolute top-0.5 right-1 size-3 rounded-full bg-white opacity-40" />
                    </div>

                    {/* Peer Supporters & Water Action Button */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center -space-x-1.5">
                        {[
                          { name: "Bopha", bg: "bg-[#78b98e]" },
                          { name: "Virak", bg: "bg-[#5ba4c8]" },
                          { name: "Chann", bg: "bg-[#c86246]" },
                          { name: "You", bg: "bg-[#245242]" },
                        ].map((peer) => (
                          <div
                            key={peer.name}
                            title={peer.name}
                            className={`flex size-6 items-center justify-center rounded-full ${peer.bg} text-[9px] font-black text-white ring-2 ring-white`}
                          >
                            {peer.name[0]}
                          </div>
                        ))}
                        <span className="pl-3 text-[11px] font-bold text-gray-500">
                          {isKhmer ? "+32 នាក់បានស្រោចទឹក" : "+32 shared today"}
                        </span>
                      </div>

                      {/* Tactile Water Garden Button */}
                      <button
                        type="button"
                        onClick={handleWaterGarden}
                        className="rounded-xl border-2 border-b-3 border-[#205e7a] border-b-[#144256] bg-[#2a7b9b] px-3 py-1.5 text-xs font-black text-white shadow-xs active:translate-y-0.5 hover:bg-[#348ba9] transition-all shrink-0"
                      >
                        💧 {isKhmer ? "ស្រោចទឹក (+5)" : "Water (+5)"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* DUOLINGO CONCEPT: BUBBLY TACTILE CHAT HUB */}
              {activeView === "chat" && (
                <div className="flex flex-col h-[700px]">
                  {/* Chat Top Bar with 3D Back Button */}
                  <div className="flex items-center justify-between border-b-2 border-[#e5ece7] bg-white px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveView("overview")}
                        className="flex size-9 items-center justify-center rounded-2xl border-2 border-b-3 border-[#d0ded5] border-b-[#b8ccbf] bg-white text-[#245242] active:translate-y-0.5"
                        aria-label="Back"
                      >
                        <ArrowLeft size={18} strokeWidth={2.5} />
                      </button>
                      <div>
                        <h2 className="text-sm font-black text-[#14221f]">
                          {isKhmer ? "រង្វង់ភាពតានតឹង" : "Stress & Burnout Circle"}
                        </h2>
                        <span className="text-[11px] font-bold text-[#245242]">
                          ● 8 {isKhmer ? "នាក់កំពុងចូលរួម" : "members online"}
                        </span>
                      </div>
                    </div>

                    <span className="rounded-xl border-2 border-[#cce0d4] bg-[#eef6f1] px-2 py-0.5 text-[10px] font-black text-[#245242]">
                      🔒 {isKhmer ? "អនាមិក" : "Anonymous"}
                    </span>
                  </div>

                  {/* Pinned Kindness Guidelines */}
                  <div className="p-3 bg-[#f7f9f7]">
                    <div className="rounded-2xl border-2 border-[#cce0d4] bg-[#f0f7f2] p-3 text-xs font-bold text-[#245242]">
                      <div className="flex items-center gap-1.5 font-black text-[#245242] mb-1">
                        <ShieldCheck size={16} />
                        <span>{isKhmer ? "គោលការណ៍សហគមន៍" : "Circle Guidelines"}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {isKhmer
                          ? "ទីកន្លែងសុវត្ថិភាព គ្មានការរិះគន់។ គោរព និងលើកទឹកចិត្តគ្នាទៅវិញទៅមក។"
                          : "Kind, non-judgmental space. Respect and support one another."}
                      </p>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map((msg) => {
                      const isMentor = msg.role === "mentor";

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${msg.isSelf ? "items-end" : "items-start"}`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black text-gray-400">
                            {!msg.isSelf && (
                              isMentor ? (
                                <span className="flex size-4 items-center justify-center rounded-full bg-[#245242] text-white">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              ) : (
                                <DominoMaskIcon className="size-3.5 text-gray-500" />
                              )
                            )}
                            <span>{msg.sender}</span>
                            {isMentor && (
                              <span className="rounded-md bg-[#245242] px-1.5 py-0.2 text-[9px] font-black text-white">
                                Mentor
                              </span>
                            )}
                          </div>

                          <div
                            className={`max-w-[85%] rounded-3xl p-3.5 text-xs font-bold leading-relaxed border-2 border-b-4 ${
                              msg.isSelf
                                ? "bg-[#245242] border-[#163629] text-white rounded-br-xs"
                                : isMentor
                                ? "bg-[#eaf4ed] border-[#c0dcd1] text-[#14221f] rounded-bl-xs"
                                : "bg-white border-[#d8e5dc] border-b-[#c0d4c6] text-gray-800 rounded-bl-xs"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Cheer Reaction Bar */}
                  <div className="px-4 py-1.5 flex gap-2 overflow-x-auto bg-white border-t border-gray-100">
                    {[
                      { emoji: "💧", label: isKhmer ? "តំណក់ក្តីស្រលាញ់" : "Drop" },
                      { emoji: "🌱", label: isKhmer ? "រីកចម្រើន" : "Grow" },
                      { emoji: "❤️", label: isKhmer ? "លើកទឹកចិត្ត" : "Cheer" },
                      { emoji: "🙏", label: isKhmer ? "អរគុណ" : "Gratitude" },
                    ].map((item) => (
                      <button
                        key={item.emoji}
                        type="button"
                        onClick={() => {
                          setInputText((prev) => `${prev} ${item.emoji}`);
                        }}
                        className="rounded-full border-2 border-b-3 border-[#d0ded5] bg-white px-2.5 py-1 text-xs font-black text-[#245242] active:translate-y-0.5 hover:bg-[#f7faf8] shrink-0"
                      >
                        {item.emoji} {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Input Bar with Tactile Green Send Button */}
                  <div className="p-3 bg-white border-t-2 border-[#e5ece7]">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                          isKhmer
                            ? "សរសេរសារលើកទឹកចិត្ត... (+5 💧)"
                            : "Write a supportive cheer... (+5 💧)"
                        }
                        className="flex-1 rounded-2xl border-2 border-b-3 border-[#d0ded5] border-b-[#b8ccbf] bg-[#f7faf8] px-4 py-2.5 text-xs font-bold text-gray-800 placeholder:text-gray-400 focus:border-[#245242] focus:bg-white focus:outline-none"
                      />

                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="flex size-10 shrink-0 items-center justify-center rounded-2xl border-2 border-b-3 border-[#163629] bg-[#245242] text-white disabled:opacity-40 transition-all active:translate-y-0.5 hover:bg-[#2e6350]"
                      >
                        <SendHorizontal size={17} strokeWidth={2.5} />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* STYLE B: SANCTUARY STYLE (Calm, Soft Sage, Minimalist)    */}
          {/* ======================================================== */}
          {styleMode === "sanctuary" && (
            <div className="pb-10">
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

                    <button
                      type="button"
                      onClick={() => setActiveView("chat")}
                      className="inline-flex items-center gap-1 rounded-full bg-[#255243] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3d31]"
                    >
                      <span>{isKhmer ? "ចូលរង្វង់" : "Enter Circle"}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
