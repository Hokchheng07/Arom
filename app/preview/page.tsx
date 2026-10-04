"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  HeartHandshake,
  Leaf,
  Lock,
  Paperclip,
  SendHorizontal,
  ShieldCheck,
  Smartphone,
  Sparkles as _ForbiddenSparkles, // Included only to ensure lint or imports never touch it
  Users,
  X,
} from "lucide-react";

// Safe SVG Mask for Anonymous Members
function DominoMaskIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 4.5C8.8 4.5 5.5 5.2 2 7.2c-.3.2-.5.5-.5.8v2.5c0 4.2 3.2 7.5 7.2 7.5 1.5 0 2.8-.5 3.3-1.4.5.9 1.8 1.4 3.3 1.4 4 0 7.2-3.3 7.2-7.5V8c0-.3-.2-.6-.5-.8-3.5-2-6.8-2.7-10-2.7zm-4 8.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm8 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
    </svg>
  );
}

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
  const [activeView, setActiveView] = useState<SandboxView>("overview");
  const [isKhmer, setIsKhmer] = useState(true);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);
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
  }

  function toggleJoinActivity(id: string) {
    setJoinedActivities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f5f3] text-[#14221f] antialiased">
      {/* Top Floating Sandbox Control Bar */}
      <header className="sticky top-0 z-50 border-b border-[#e2e8e4] bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#255243] text-white">
              <Leaf size={15} />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#255243]">
                AROM Sandbox
              </span>
              <span className="ml-2 hidden text-xs text-gray-500 sm:inline">
                (Isolated Preview, No Code Modified)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex rounded-full bg-[#e8eee9] p-0.5 text-xs font-semibold text-gray-700">
              <button
                type="button"
                onClick={() => setActiveView("overview")}
                className={`rounded-full px-3 py-1 transition-all ${
                  activeView === "overview"
                    ? "bg-[#255243] text-white shadow-xs"
                    : "hover:text-[#255243]"
                }`}
              >
                {isKhmer ? "ទិដ្ឋភាពទូទៅ (Overview)" : "Sanctuary Overview"}
              </button>
              <button
                type="button"
                onClick={() => setActiveView("chat")}
                className={`rounded-full px-3 py-1 transition-all ${
                  activeView === "chat"
                    ? "bg-[#255243] text-white shadow-xs"
                    : "hover:text-[#255243]"
                }`}
              >
                {isKhmer ? "ការសន្ទនាក្រុម (Chat)" : "Circle Chat Hub"}
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setIsKhmer(!isKhmer)}
              className="rounded-full border border-[#c9d8ce] bg-white px-2.5 py-1 text-xs font-bold text-[#255243] hover:bg-[#f0f6f2] transition-colors"
            >
              {isKhmer ? "🇰🇭 ខ្មែរ" : "🇺🇸 EN"}
            </button>

            {/* Mobile / Full Width Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              title="Toggle Mobile Screen Frame"
              className={`hidden size-8 items-center justify-center rounded-lg border transition-colors sm:flex ${
                isMobileFrame
                  ? "border-[#255243] bg-[#255243] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
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
              ? "max-w-[420px] rounded-[36px] border-[6px] border-[#223d32] bg-[#fdfcf9] shadow-[0_24px_60px_rgba(20,40,30,0.18)] overflow-hidden min-h-[780px]"
              : "max-w-2xl rounded-3xl border border-[#dce5de] bg-[#fdfcf9] shadow-md p-4 sm:p-6"
          }`}
        >
          {/* ======================================================== */}
          {/* VIEW 1: SANCTUARY OVERVIEW (Home & Safe Circles)         */}
          {/* ======================================================== */}
          {activeView === "overview" && (
            <div className="pb-10">
              {/* Organic Soft Sage Curved Arch Header */}
              <div className="relative overflow-hidden rounded-b-[36px] bg-gradient-to-br from-[#245242] via-[#2d6150] to-[#397260] px-5 pt-6 pb-8 text-white shadow-sm">
                {/* Subtle Botanical Background Leaf Accents */}
                <div className="pointer-events-none absolute -right-6 -bottom-8 opacity-10 text-white">
                  <Leaf size={160} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                    <Lock size={12} className="text-[#a7f3d0]" />
                    {isKhmer ? "១០០% អនាមិក និងសុវត្ថិភាព" : "100% Anonymous Safe Space"}
                  </span>

                  <span className="text-xs text-white/80 font-medium">
                    {isKhmer ? "សហគមន៍ ARom" : "ARom Sanctuary"}
                  </span>
                </div>

                <h1 className="mt-4 text-2xl sm:text-[1.75rem] font-extrabold tracking-tight">
                  {isKhmer ? "សហគមន៍ (Community)" : "Peer Support Circles"}
                </h1>
                <p className="mt-1 text-xs text-white/85 leading-relaxed max-w-xs">
                  {isKhmer
                    ? "កន្លែងសុវត្ថិភាពដើម្បីចែករំលែក ទទួលការយល់ចិត្ត និងរីកចម្រើនជាមួយគ្នា។"
                    : "A safe, non-judgmental space to connect, share experiences, and heal together."}
                </p>
              </div>

              {/* Main Featured Active Circle Card */}
              <div className="px-4 -mt-5">
                <div className="rounded-[26px] border border-[#e4ede7] bg-white p-5 shadow-[0_8px_24px_rgba(25,50,40,0.06)] transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#255243]">
                      <Users size={13} />
                      {isKhmer ? "ក្រុមគាំទ្រសកម្មរបស់អ្នក" : "Your Active Support Circle"}
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
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    {isKhmer
                      ? "ចែករំលែកបទពិសោធន៍ដោះស្រាយភាពនឿយហត់ និងការអនុវត្តសតិប្រចាំសប្តាហ៍។"
                      : "Weekly check-ins, mindful grounding routines, and peer support."}
                  </p>

                  {/* Mentor Info Row */}
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7faf8] p-3 border border-[#edf3ef]">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#255243] text-white font-bold text-xs shadow-xs">
                        TV
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-[#111827]">Mentor Tivea</p>
                          <CheckCircle2 size={13} className="fill-[#1b5e4c] text-white" />
                        </div>
                        <p className="text-[10px] text-gray-500">
                          {isKhmer ? "អ្នកសម្របសម្រួលសតិ (Verified Mentor)" : "Certified Wellness Guide"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveView("chat")}
                      className="inline-flex items-center gap-1 rounded-full bg-[#255243] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1a3d31] active:scale-95"
                    >
                      <span>{isKhmer ? "ចូលរង្វង់" : "Enter Circle"}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Mindful Circles Section */}
              <div className="mt-7 px-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-tight text-[#111827]">
                    {isKhmer ? "សកម្មភាពខាងមុខ (Upcoming Mindful Circles)" : "Upcoming Mindful Circles"}
                  </h3>
                  <span className="text-xs font-semibold text-[#255243]">
                    {isKhmer ? "ប្រចាំសប្តាហ៍" : "This Week"}
                  </span>
                </div>

                <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {/* Activity 1: Breathing */}
                  <div className="min-w-[210px] shrink-0 rounded-2xl border border-[#d8ebe3] bg-[#eef7f3] p-4 shadow-2xs">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white text-[#255243] shadow-xs">
                      <Leaf size={18} />
                    </div>
                    <h4 className="mt-2.5 text-xs font-bold text-[#111827]">
                      {isKhmer ? "ការដកដង្ហើម ៥ នាទី" : "5-Min Breathing Circle"}
                    </h4>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-600">
                      <Clock size={11} className="text-[#255243]" />
                      <span>{isKhmer ? "ថ្ងៃនេះ ម៉ោង ៧:០០ យប់" : "Today, 7:00 PM"}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleJoinActivity("act-1")}
                      className={`mt-3 w-full rounded-xl py-1.5 text-center text-xs font-bold transition-all ${
                        joinedActivities.includes("act-1")
                          ? "bg-white text-[#255243] border border-[#255243]/30"
                          : "bg-[#255243] text-white shadow-xs hover:bg-[#1c3f33]"
                      }`}
                    >
                      {joinedActivities.includes("act-1")
                        ? isKhmer ? "បានចូលរួម ✓" : "Joined ✓"
                        : isKhmer ? "ចូលរួម (Join)" : "Join"}
                    </button>
                  </div>

                  {/* Activity 2: Gentle Sharing */}
                  <div className="min-w-[210px] shrink-0 rounded-2xl border border-[#f0e6d6] bg-[#fbf5eb] p-4 shadow-2xs">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white text-[#8c6239] shadow-xs">
                      <HeartHandshake size={18} />
                    </div>
                    <h4 className="mt-2.5 text-xs font-bold text-[#111827]">
                      {isKhmer ? "ជជែកចែករំលែកទន់ភ្លន់" : "Gentle Evening Sharing"}
                    </h4>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-600">
                      <Clock size={11} className="text-[#8c6239]" />
                      <span>{isKhmer ? "ស្អែក ម៉ោង ៨:០០ យប់" : "Tomorrow, 8:00 PM"}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleJoinActivity("act-2")}
                      className={`mt-3 w-full rounded-xl py-1.5 text-center text-xs font-bold transition-all ${
                        joinedActivities.includes("act-2")
                          ? "bg-white text-[#8c6239] border border-[#8c6239]/30"
                          : "bg-[#8c6239] text-white shadow-xs hover:bg-[#724e2c]"
                      }`}
                    >
                      {joinedActivities.includes("act-2")
                        ? isKhmer ? "បានចូលរួម ✓" : "Joined ✓"
                        : isKhmer ? "ចូលរួម (Join)" : "Join"}
                    </button>
                  </div>

                  {/* Activity 3: Anxiety Grounding */}
                  <div className="min-w-[210px] shrink-0 rounded-2xl border border-[#d6e5ed] bg-[#edf4f8] p-4 shadow-2xs">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white text-[#2a5b78] shadow-xs">
                      <ShieldCheck size={18} />
                    </div>
                    <h4 className="mt-2.5 text-xs font-bold text-[#111827]">
                      {isKhmer ? "ការទប់លំនឹងចិត្ត" : "Grounding Practice"}
                    </h4>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-600">
                      <Clock size={11} className="text-[#2a5b78]" />
                      <span>{isKhmer ? "ពុធ ម៉ោង ៦:៣០ ល្ងាច" : "Wed, 6:30 PM"}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleJoinActivity("act-3")}
                      className={`mt-3 w-full rounded-xl py-1.5 text-center text-xs font-bold transition-all ${
                        joinedActivities.includes("act-3")
                          ? "bg-white text-[#2a5b78] border border-[#2a5b78]/30"
                          : "bg-[#2a5b78] text-white shadow-xs hover:bg-[#1f455c]"
                      }`}
                    >
                      {joinedActivities.includes("act-3")
                        ? isKhmer ? "បានចូលរួម ✓" : "Joined ✓"
                        : isKhmer ? "ចូលរួម (Join)" : "Join"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Safe Topic Circles Section */}
              <div className="mt-7 px-4">
                <h3 className="text-sm font-bold tracking-tight text-[#111827]">
                  {isKhmer ? "ស្វែងរកប្រធានបទគាំទ្រ (Explore Topic Circles)" : "Explore Safe Topic Circles"}
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {[
                    {
                      title: isKhmer ? "ការថប់បារម្ភ (Anxiety)" : "Anxiety Circle",
                      members: "5/10",
                      badge: isKhmer ? "ស្ងប់អារម្មណ៍" : "Grounding",
                    },
                    {
                      title: isKhmer ? "ដំណេកស្ងប់ (Restful Sleep)" : "Restful Sleep",
                      members: "6/10",
                      badge: isKhmer ? "ការសម្រាក" : "Relaxation",
                    },
                    {
                      title: isKhmer ? "សម្ពាធការសិក្សា (Study)" : "Academic Balance",
                      members: "9/10",
                      badge: isKhmer ? "ការលើកទឹកចិត្ត" : "Student Life",
                    },
                    {
                      title: isKhmer ? "ការយល់ចិត្ត (Depression)" : "Gentle Compassion",
                      members: "8/10",
                      badge: isKhmer ? "ការស្តាប់" : "Empathetic",
                    },
                  ].map((circle) => (
                    <div
                      key={circle.title}
                      className="rounded-2xl border border-gray-100 bg-white p-3.5 shadow-2xs transition-all hover:border-[#255243]/30 hover:shadow-xs"
                    >
                      <span className="rounded-full bg-[#f1f5f2] px-2 py-0.5 text-[9px] font-bold text-[#255243]">
                        {circle.badge}
                      </span>
                      <h4 className="mt-2 text-xs font-bold text-[#111827] line-clamp-1">
                        {circle.title}
                      </h4>
                      <p className="mt-1 text-[10px] text-gray-500">
                        {circle.members} {isKhmer ? "សមាជិក" : "members"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: PEACEFUL CIRCLE CHAT (Inside Group Hub)          */}
          {/* ======================================================== */}
          {activeView === "chat" && (
            <div className="flex flex-col h-[740px]">
              {/* Top Chat Header */}
              <div className="flex items-center justify-between border-b border-[#e5ebe7] bg-white px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveView("overview")}
                    className="flex size-8 items-center justify-center rounded-full text-gray-600 hover:bg-[#eef3f0] hover:text-[#255243] transition-colors"
                    aria-label="Back to overview"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h2 className="text-sm font-bold text-[#111827]">
                      {isKhmer ? "ក្រុមគាំទ្រភាពតានតឹង" : "Stress & Burnout Support"}
                    </h2>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{isKhmer ? "សមាជិក ៨ នាក់កំពុងចូលរួម" : "8 members active"}</span>
                    </div>
                  </div>
                </div>

                <span className="rounded-full bg-[#e6f4ef] px-2.5 py-0.5 text-[10px] font-bold text-[#255243]">
                  {isKhmer ? "🔒 អនាមិក" : "🔒 Anonymous"}
                </span>
              </div>

              {/* Pinned Reassuring Guidelines Card */}
              <div className="p-3 bg-[#f8faf8]">
                <div className="flex items-start gap-2.5 rounded-2xl border border-[#cbe8dc] bg-[#eef7f3] p-3 text-xs text-[#1c483a] shadow-2xs">
                  <ShieldCheck size={16} className="shrink-0 mt-0.5 text-[#255243]" />
                  <div className="min-w-0">
                    <p className="font-bold text-[#255243]">
                      {isKhmer ? "គោលការណ៍ណែនាំរង្វង់គាំទ្រ (Circle Guidelines)" : "Circle Guidelines"}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#2c5c4d]">
                      {isKhmer
                        ? "សូមស្វាគមន៍មកកាន់ AROM។ នេះជាទីកន្លែងសុវត្ថិភាព ឯកជន និងគ្មានការរិះគន់។ សូមចែករំលែកដោយក្តីគោរព និងគាំទ្រគ្នាទៅវិញទៅមក។"
                        : "Welcome to AROM. Kind, private, non-judgmental safe space. Please share respectfully and support each other."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((msg) => {
                  const isMentor = msg.role === "mentor";

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${msg.isSelf ? "items-end" : "items-start"}`}
                    >
                      {/* Sender details */}
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-gray-500">
                        {!msg.isSelf && (
                          isMentor ? (
                            <span className="flex size-4 items-center justify-center rounded-full bg-[#255243] text-white">
                              <CheckCircle2 size={10} />
                            </span>
                          ) : (
                            <DominoMaskIcon className="size-3.5 text-[#255243]" />
                          )
                        )}
                        <span className="font-semibold text-gray-700">{msg.sender}</span>
                        {isMentor && (
                          <span className="rounded bg-[#255243] px-1.5 py-0.2 text-[9px] font-bold text-white">
                            {isKhmer ? "អ្នកណែនាំ" : "Mentor"}
                          </span>
                        )}
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>

                      {/* Bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                          msg.isSelf
                            ? "bg-[#255243] text-white rounded-br-xs"
                            : isMentor
                            ? "bg-[#255243] text-white rounded-bl-xs border border-[#1d4336]"
                            : "bg-[#fbf7f0] text-gray-800 border border-[#eee4d6] rounded-bl-xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Floating Bottom Input Bar */}
              <div className="p-3 bg-white border-t border-[#e5ebe7]">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 rounded-full border border-[#d6e2d9] bg-[#f8faf8] px-3.5 py-2 shadow-inner-xs focus-within:border-[#255243] focus-within:bg-white transition-all"
                >
                  <button
                    type="button"
                    className="flex size-7 items-center justify-center rounded-full text-gray-400 hover:text-[#255243] transition-colors"
                    title="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      isKhmer
                        ? "សរសេរសារគាំទ្ររបស់អ្នក... (Share a supportive thought...)"
                        : "Type a supportive message..."
                    }
                    className="flex-1 bg-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="flex size-7 items-center justify-center rounded-full bg-[#255243] text-white disabled:opacity-30 hover:bg-[#1a3d31] transition-all"
                  >
                    <SendHorizontal size={14} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
