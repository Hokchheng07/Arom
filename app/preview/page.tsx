"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Award,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Gem,
  Heart,
  HeartHandshake,
  Leaf,
  Lock,
  MessageSquare,
  Paperclip,
  SendHorizontal,
  ShieldCheck,
  Smartphone,
  Smile,
  Trophy,
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

// Cute Leafy Wellness Mascot (Duolingo Style)
function CuteWellnessMascot({ className = "size-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {/* Outer Glow / Shadow */}
      <ellipse cx="60" cy="110" rx="34" ry="7" fill="#46a302" fillOpacity="0.18" />
      {/* Little Feet */}
      <ellipse cx="44" cy="104" rx="10" ry="7" fill="#ff9600" />
      <ellipse cx="76" cy="104" rx="10" ry="7" fill="#ff9600" />
      {/* Body / Head in Duolingo Leaf Green */}
      <path
        d="M60 14 C32 14 20 40 20 68 C20 94 36 104 60 104 C84 104 100 94 100 68 C100 40 88 14 60 14 Z"
        fill="#58cc02"
      />
      {/* Top Leaf Sprout */}
      <path
        d="M60 18 C52 4 44 2 38 6 C32 10 38 22 50 22 Z"
        fill="#78d818"
      />
      <path
        d="M60 18 C68 4 76 2 82 6 C88 10 82 22 70 22 Z"
        fill="#78d818"
      />
      {/* Cheerful Big Eyes */}
      <ellipse cx="43" cy="56" rx="11" ry="14" fill="#ffffff" />
      <ellipse cx="77" cy="56" rx="11" ry="14" fill="#ffffff" />
      {/* Pupils looking happy */}
      <circle cx="45" cy="56" r="6.5" fill="#1b4d08" />
      <circle cx="75" cy="56" r="6.5" fill="#1b4d08" />
      <circle cx="47" cy="53" r="2.2" fill="#ffffff" />
      <circle cx="77" cy="53" r="2.2" fill="#ffffff" />
      {/* Beak / Cheerful Mouth */}
      <path
        d="M50 67 C50 67 60 76 70 67 C66 82 54 82 50 67 Z"
        fill="#ff9600"
      />
      <path d="M54 71 C56 77 64 77 66 71 Z" fill="#e05353" />
      {/* Rosy Cheeks */}
      <ellipse cx="31" cy="69" rx="5" ry="3" fill="#ff7da7" fillOpacity="0.75" />
      <ellipse cx="89" cy="69" rx="5" ry="3" fill="#ff7da7" fillOpacity="0.75" />
      {/* Belly Patch */}
      <path
        d="M42 78 C42 78 60 88 78 78 C78 94 68 100 60 100 C52 100 42 94 42 78 Z"
        fill="#78d818"
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
    text: "សូមស្វាគមន៍មកកាន់រង្វង់គាំទ្រ។ ការមានអារម្មណ៍បែបនេះគឺជារឿងធម្មជាតិទេ។ តើយើងអាចសាកល្បងលំហាត់ដកដង្ហើម ២ នាទីជាមួយគ្នាបានទេ? (Welcome to this safe space. It's completely valid to feel this way. Shall we do a quick 2-minute breathing reset together?)",
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
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);
  const [questCheerDone, setQuestCheerDone] = useState(false);
  const [gemCount, setGemCount] = useState(300);
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
    // Reward with +5 gems when chatting in Duolingo mode
    if (styleMode === "duolingo") {
      setGemCount((g) => g + 5);
    }
  }

  function toggleJoinActivity(id: string) {
    setJoinedActivities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleToggleQuest() {
    setQuestCheerDone((prev) => {
      const next = !prev;
      setGemCount((g) => (next ? g + 15 : g - 15));
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#f0f3f1] text-[#14221f] antialiased">
      {/* Top Floating Sandbox Control Bar */}
      <header className="sticky top-0 z-50 border-b border-[#e2e8e4] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#58cc02] text-white shadow-xs">
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
            {/* Style Selector: Duolingo vs Sanctuary */}
            <div className="flex rounded-full bg-[#e5ece7] p-0.5 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => setStyleMode("duolingo")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  styleMode === "duolingo"
                    ? "bg-[#58cc02] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#58cc02]"
                }`}
              >
                <span>🦉 Duolingo Style</span>
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
                {isKhmer ? "ទិដ្ឋភាពទូទៅ" : "Overview"}
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
                {isKhmer ? "ជជែកក្រុម" : "Chat"}
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setIsKhmer(!isKhmer)}
              className="rounded-full border-2 border-b-3 border-[#e5e5e5] bg-white px-2.5 py-1 text-xs font-extrabold text-gray-700 hover:bg-gray-50 active:translate-y-0.5 transition-all"
            >
              {isKhmer ? "🇰🇭 ខ្មែរ" : "🇺🇸 EN"}
            </button>

            {/* Mobile / Full Width Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              title="Toggle Mobile Screen Frame"
              className={`hidden size-8 items-center justify-center rounded-xl border-2 border-b-3 transition-all sm:flex ${
                isMobileFrame
                  ? "border-[#58cc02] bg-[#58cc02] text-white border-b-[#46a302]"
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

      {/* Main Sandbox Canvas */}
      <main className="py-6 px-3 sm:px-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            isMobileFrame
              ? styleMode === "duolingo"
                ? "max-w-[420px] rounded-[42px] border-[8px] border-[#58cc02] bg-[#f7f9f7] shadow-[0_24px_60px_rgba(88,204,2,0.22)] overflow-hidden min-h-[790px]"
                : "max-w-[420px] rounded-[36px] border-[6px] border-[#223d32] bg-[#fdfcf9] shadow-[0_24px_60px_rgba(20,40,30,0.18)] overflow-hidden min-h-[780px]"
              : "max-w-2xl rounded-3xl border-2 border-[#e5e5e5] bg-white shadow-md p-4 sm:p-6"
          }`}
        >
          {/* ======================================================== */}
          {/* STYLE A: DUOLINGO STYLE (Gamified, Bouncy 3D, Vibrant)   */}
          {/* ======================================================== */}
          {styleMode === "duolingo" && (
            <div className="pb-10 font-sans">
              {/* Duolingo Top Stats Header (Flames, Gems, Hearts) */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-5 py-3">
                {/* Flame Streak */}
                <div className="flex items-center gap-1.5 font-extrabold text-[#ff9600]">
                  <Flame size={20} className="fill-[#ff9600] animate-bounce" />
                  <span className="text-sm">37</span>
                </div>

                {/* Gems / Wellness Points */}
                <div className="flex items-center gap-1.5 font-extrabold text-[#1cb0f6]">
                  <Gem size={19} className="fill-[#1cb0f6]" />
                  <span className="text-sm">{gemCount}</span>
                </div>

                {/* Hearts / Compassion Energy */}
                <div className="flex items-center gap-1.5 font-extrabold text-[#ff4b4b]">
                  <Heart size={19} className="fill-[#ff4b4b]" />
                  <span className="text-sm">5</span>
                </div>
              </div>

              {activeView === "overview" && (
                <div className="px-4 pt-4 space-y-4">
                  {/* Duolingo Header Title */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-black tracking-tight text-[#111827]">
                        {isKhmer ? "សហគមន៍ (Community)" : "Community Circles"}
                      </h1>
                      <p className="text-xs font-bold text-[#777777]">
                        {isKhmer
                          ? "ចែករំលែក និងទទួលពិន្ទុលើកទឹកចិត្ត"
                          : "Level up your wellness with peer circles"}
                      </p>
                    </div>

                    <span className="rounded-2xl border-2 border-b-3 border-[#cce6b3] bg-[#eefae1] px-2.5 py-1 text-[11px] font-black text-[#58cc02]">
                      🔒 {isKhmer ? "អនាមិក" : "Anonymous"}
                    </span>
                  </div>

                  {/* Featured Card: Stress & Burnout Circle with Mascot */}
                  <div className="rounded-3xl border-2 border-b-4 border-[#e5e5e5] border-b-[#cfd2d0] bg-white p-5 shadow-xs transition-transform duration-150">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="rounded-lg bg-[#eefae1] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#58cc02]">
                          {isKhmer ? "ក្រុមសកម្មរបស់អ្នក" : "Your Active Circle"}
                        </span>
                        <h2 className="mt-1.5 text-lg font-black leading-tight text-[#111827]">
                          {isKhmer ? "ក្រុមគាំទ្រភាពតានតឹង" : "Stress & Burnout Circle"}
                        </h2>
                        <p className="mt-0.5 text-xs font-bold text-[#afafaf]">
                          {isKhmer ? "វគ្គហ្វឹកហាត់សតិប្រចាំថ្ងៃ" : "Daily Mindful Group"}
                        </p>
                      </div>

                      {/* Cute Duolingo-style Leaf Mascot */}
                      <div className="shrink-0 -mt-1 -mr-1">
                        <CuteWellnessMascot className="size-18 drop-shadow-sm" />
                      </div>
                    </div>

                    {/* Bubbly Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs font-black text-[#777777] mb-1">
                        <span>{isKhmer ? "វឌ្ឍនភាពសប្តាហ៍" : "Weekly Progress"}</span>
                        <span className="text-[#58cc02]">8 / 10 {isKhmer ? "សមាជិក" : "members"}</span>
                      </div>
                      <div className="relative h-4 w-full overflow-hidden rounded-full bg-[#e5e5e5]">
                        <div
                          className="h-full rounded-full bg-[#58cc02] transition-all duration-500"
                          style={{ width: "80%" }}
                        />
                        <div className="absolute top-0.5 right-1 size-3 rounded-full bg-white opacity-40" />
                      </div>
                    </div>

                    {/* Tactile 3D Duolingo Button */}
                    <button
                      type="button"
                      onClick={() => setActiveView("chat")}
                      className="mt-4 w-full rounded-2xl border-2 border-[#58cc02] border-b-4 border-b-[#46a302] bg-[#58cc02] py-3.5 text-center text-sm font-black uppercase tracking-wider text-white shadow-xs transition-all duration-100 hover:bg-[#61e002] active:translate-y-1 active:border-b-2 active:shadow-none"
                    >
                      {isKhmer ? "ចូលជជែកក្នុងក្រុម (START CHAT)" : "START CHAT"}
                    </button>
                  </div>

                  {/* Daily Community Quest Card (Checklist with Gems) */}
                  <div className="rounded-3xl border-2 border-b-4 border-[#e5e5e5] border-b-[#cfd2d0] bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-black text-[#111827]">
                        {isKhmer ? "បេសកកម្មសហគមន៍ប្រចាំថ្ងៃ" : "Daily Community Quests"}
                      </h3>
                      <span className="flex items-center gap-1 rounded-xl bg-[#fff3d4] px-2 py-0.5 text-xs font-black text-[#ff9600]">
                        <Trophy size={13} />
                        <span>{questCheerDone ? "3/3" : "2/3"}</span>
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs font-bold">
                      {/* Quest 1: Done */}
                      <div className="flex items-center justify-between rounded-2xl border-2 border-[#cce6b3] bg-[#f3faeb] p-3 text-[#245242]">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-5 items-center justify-center rounded-lg bg-[#58cc02] text-white">
                            <Check size={13} strokeWidth={3} />
                          </span>
                          <span>{isKhmer ? "ពិនិត្យអារម្មណ៍ប្រចាំថ្ងៃ (Mood Check-in)" : "Complete Daily Mood Check-in"}</span>
                        </div>
                        <span className="text-[11px] font-black text-[#58cc02]">+10 💎</span>
                      </div>

                      {/* Quest 2: Done */}
                      <div className="flex items-center justify-between rounded-2xl border-2 border-[#cce6b3] bg-[#f3faeb] p-3 text-[#245242]">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-5 items-center justify-center rounded-lg bg-[#58cc02] text-white">
                            <Check size={13} strokeWidth={3} />
                          </span>
                          <span>{isKhmer ? "ចូលមើលរង្វង់គាំទ្រ (Join a Circle)" : "Explore Peer Circles"}</span>
                        </div>
                        <span className="text-[11px] font-black text-[#58cc02]">+20 💎</span>
                      </div>

                      {/* Quest 3: Interactive Clickable Quest */}
                      <button
                        type="button"
                        onClick={handleToggleQuest}
                        className={`flex w-full items-center justify-between rounded-2xl border-2 border-b-3 p-3 transition-all active:translate-y-0.5 text-left ${
                          questCheerDone
                            ? "border-[#cce6b3] bg-[#f3faeb] text-[#245242]"
                            : "border-[#e5e5e5] border-b-[#cfd2d0] bg-white text-gray-700 hover:bg-[#fafafa]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex size-5 items-center justify-center rounded-lg border-2 transition-all ${
                              questCheerDone
                                ? "bg-[#58cc02] border-[#58cc02] text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {questCheerDone && <Check size={13} strokeWidth={3} />}
                          </span>
                          <span>{isKhmer ? "ផ្ញើពាក្យលើកទឹកចិត្ត ១ (Send 1 Cheer)" : "Send 1 Supportive Cheer"}</span>
                        </div>
                        <span className="text-[11px] font-black text-[#ff9600]">
                          {questCheerDone ? "✓ រួចរាល់" : "+15 💎"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Weekly Cheers Leaderboard (Duolingo Style) */}
                  <div className="rounded-3xl border-2 border-b-4 border-[#e5e5e5] border-b-[#cfd2d0] bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Award size={18} className="text-[#ff9600]" />
                        <h3 className="text-sm font-black text-[#111827]">
                          {isKhmer ? "តារាងពិន្ទុលើកទឹកចិត្ត (Cheers Leaderboard)" : "Weekly Cheers Leaderboard"}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold text-[#afafaf]">
                        {isKhmer ? "សប្តាហ៍នេះ" : "Top Supporters"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { rank: "🥇", name: "Panharith (បញ្ញារិទ្ធ)", score: "4,960", color: "bg-[#fff3d4] border-[#ffe299]" },
                        { rank: "🥈", name: "Seakkhim (សៀកឃីម)", score: "4,820", color: "bg-[#f2f4f5] border-[#e1e4e6]" },
                        { rank: "🥉", name: "MalaNy (ម៉ាឡានី)", score: "4,510", color: "bg-[#fbf0e4] border-[#eed5be]" },
                        { rank: "4", name: isKhmer ? "អ្នក (You / Anonymous)" : "You (Anonymous)", score: "3,950", color: "bg-[#eefae1] border-[#cce6b3]", isYou: true },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className={`flex items-center justify-between rounded-2xl border-2 p-2.5 text-xs font-black ${item.color}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-black w-5 text-center">{item.rank}</span>
                            <span className={item.isYou ? "text-[#58cc02]" : "text-[#111827]"}>
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[#777777] font-bold">{item.score} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Duolingo Style Chat Hub */}
              {activeView === "chat" && (
                <div className="flex flex-col h-[700px]">
                  {/* Chat Top Bar with 3D Back Button */}
                  <div className="flex items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveView("overview")}
                        className="flex size-9 items-center justify-center rounded-2xl border-2 border-b-3 border-[#e5e5e5] border-b-[#cfd2d0] bg-white text-gray-700 active:translate-y-0.5"
                        aria-label="Back"
                      >
                        <ArrowLeft size={18} strokeWidth={2.5} />
                      </button>
                      <div>
                        <h2 className="text-sm font-black text-[#111827]">
                          {isKhmer ? "រង្វង់ភាពតានតឹង" : "Stress & Burnout Circle"}
                        </h2>
                        <span className="text-[11px] font-bold text-[#58cc02]">
                          ● 8 {isKhmer ? "នាក់កំពុងចូលរួម" : "members online"}
                        </span>
                      </div>
                    </div>

                    <span className="rounded-xl border-2 border-[#cce6b3] bg-[#eefae1] px-2 py-0.5 text-[10px] font-black text-[#58cc02]">
                      🔒 {isKhmer ? "អនាមិក" : "Anonymous"}
                    </span>
                  </div>

                  {/* Pinned Kindness Reminder */}
                  <div className="p-3 bg-[#f7f9f7]">
                    <div className="rounded-2xl border-2 border-[#cce6b3] bg-[#f3faeb] p-3 text-xs font-bold text-[#245242]">
                      <div className="flex items-center gap-1.5 font-black text-[#58cc02] mb-1">
                        <ShieldCheck size={16} />
                        <span>{isKhmer ? "គោលការណ៍សហគមន៍" : "Circle Rules"}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {isKhmer
                          ? "ទីកន្លែងសុវត្ថិភាព គ្មានការរិះគន់។ គោរព និងលើកទឹកចិត្តគ្នាទៅវិញទៅមក។"
                          : "Kind, non-judgmental space. Respect and support one another."}
                      </p>
                    </div>
                  </div>

                  {/* Messages Stream with Duolingo style bubbles */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map((msg) => {
                      const isMentor = msg.role === "mentor";

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${msg.isSelf ? "items-end" : "items-start"}`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black text-[#afafaf]">
                            {!msg.isSelf && (
                              isMentor ? (
                                <span className="flex size-4 items-center justify-center rounded-full bg-[#58cc02] text-white">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              ) : (
                                <DominoMaskIcon className="size-3.5 text-gray-500" />
                              )
                            )}
                            <span>{msg.sender}</span>
                            {isMentor && (
                              <span className="rounded-md bg-[#58cc02] px-1.5 py-0.2 text-[9px] font-black text-white">
                                Mentor
                              </span>
                            )}
                          </div>

                          <div
                            className={`max-w-[85%] rounded-3xl p-3.5 text-xs font-bold leading-relaxed border-2 border-b-4 ${
                              msg.isSelf
                                ? "bg-[#58cc02] border-[#46a302] text-white rounded-br-xs"
                                : isMentor
                                ? "bg-[#1cb0f6] border-[#1899d6] text-white rounded-bl-xs"
                                : "bg-white border-[#e5e5e5] border-b-[#cfd2d0] text-gray-800 rounded-bl-xs"
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
                      { emoji: "❤️", label: isKhmer ? "លើកទឹកចិត្ត" : "Cheer" },
                      { emoji: "👏", label: isKhmer ? "អស្ចារ្យ" : "Proud" },
                      { emoji: "🌱", label: isKhmer ? "រីកចម្រើន" : "Grow" },
                      { emoji: "✨", label: isKhmer ? "សេចក្តីស្ងប់" : "Peace" },
                    ].map((item) => (
                      <button
                        key={item.emoji}
                        type="button"
                        onClick={() => {
                          setInputText((prev) => `${prev} ${item.emoji}`);
                        }}
                        className="rounded-full border-2 border-b-3 border-[#e5e5e5] bg-white px-2.5 py-1 text-xs font-black text-gray-700 active:translate-y-0.5 hover:bg-gray-50 shrink-0"
                      >
                        {item.emoji} {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Input Bar with 3D Green Send Button */}
                  <div className="p-3 bg-white border-t-2 border-[#e5e5e5]">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                          isKhmer
                            ? "សរសេរសារលើកទឹកចិត្ត... (+5 💎)"
                            : "Write a supportive cheer... (+5 💎)"
                        }
                        className="flex-1 rounded-2xl border-2 border-b-3 border-[#e5e5e5] border-b-[#cfd2d0] bg-[#f7f9f7] px-4 py-2.5 text-xs font-bold text-gray-800 placeholder:text-gray-400 focus:border-[#58cc02] focus:bg-white focus:outline-none"
                      />

                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="flex size-10 shrink-0 items-center justify-center rounded-2xl border-2 border-b-3 border-[#46a302] bg-[#58cc02] text-white disabled:opacity-40 transition-all active:translate-y-0.5 hover:bg-[#61e002]"
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
