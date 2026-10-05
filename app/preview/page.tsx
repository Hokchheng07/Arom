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
  Flame,
  Gem,
  Gift,
  Headphones,
  Heart,
  Leaf,
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
  Trophy,
  Unlock,
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

// Living Bonsai Lotus Sanctuary SVG (Grows & Blooms as you practice)
function LivingBonsaiLotusTree({
  bloomedCount = 1,
  className = "w-full h-56",
}: {
  bloomedCount?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 320 260" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="treeAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a6740" />
          <stop offset="50%" stopColor="#674127" />
          <stop offset="100%" stopColor="#3b2314" />
        </linearGradient>
        <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c4d3e" />
          <stop offset="50%" stopColor="#10362b" />
          <stop offset="100%" stopColor="#092019" />
        </linearGradient>
      </defs>

      {/* Aura background glow */}
      <circle cx="160" cy="110" r="105" fill="url(#treeAura)" />

      {/* Ground Shadow */}
      <ellipse cx="160" cy="228" rx="70" ry="12" fill="#03120d" opacity="0.5" />

      {/* Ceramic Pot with Golden Embellishment */}
      <path
        d="M98 208 C105 228 120 236 160 236 C200 236 215 228 222 208 Z"
        fill="url(#potGrad)"
        stroke="#d4af37"
        strokeWidth="2.5"
      />
      <ellipse cx="160" cy="208" rx="62" ry="8" fill="#2d1c12" />
      <ellipse cx="160" cy="208" rx="56" ry="6" fill="#428052" />

      {/* Curved Bonsai Trunk */}
      <path
        d="M160 206 C155 180 178 160 162 135 C150 115 128 110 112 105"
        stroke="url(#trunkGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M162 135 C176 124 196 114 212 110"
        stroke="url(#trunkGrad)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M162 135 C160 98 160 78 160 68"
        stroke="url(#trunkGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Lotus Pads / Leaves */}
      <ellipse cx="108" cy="100" rx="34" ry="16" fill="#296b48" />
      <ellipse cx="108" cy="98" rx="30" ry="13" fill="#429e6b" />
      <ellipse cx="215" cy="106" rx="32" ry="15" fill="#296b48" />
      <ellipse cx="215" cy="104" rx="28" ry="12" fill="#429e6b" />
      <ellipse cx="160" cy="62" rx="44" ry="18" fill="#21593c" />
      <ellipse cx="160" cy="60" rx="38" ry="15" fill="#3c9162" />

      {/* Center Grand Lotus Flower */}
      <g transform="translate(160, 48)">
        <path d="M0 0 C-18 -10 -24 -26 0 -36 C24 -26 18 -10 0 0 Z" fill="#ffd5df" />
        <path d="M0 0 C-26 -6 -32 -20 -10 -30 C-2 -18 0 -6 0 0 Z" fill="#ffbccc" />
        <path d="M0 0 C26 -6 32 -20 10 -30 C2 -18 0 -6 0 0 Z" fill="#ffbccc" />
        <circle cx="0" cy="-14" r="6.5" fill="#facc15" />
        <circle cx="0" cy="-14" r="3" fill="#eab308" />
      </g>

      {/* Flower 2: Left Lotus Flower */}
      {bloomedCount >= 2 && (
        <g transform="translate(105, 92)">
          <path d="M0 0 C-14 -6 -18 -18 0 -26 C18 -18 14 -6 0 0 Z" fill="#ffd5df" />
          <path d="M0 0 C-18 -4 -20 -14 -6 -20 C-1 -12 0 -4 0 0 Z" fill="#ffaec2" />
          <path d="M0 0 C18 -4 20 -14 6 -20 C1 -12 0 -4 0 0 Z" fill="#ffaec2" />
          <circle cx="0" cy="-10" r="4.5" fill="#facc15" />
        </g>
      )}

      {/* Flower 3: Right Lotus Flower */}
      {bloomedCount >= 3 && (
        <g transform="translate(220, 98)">
          <path d="M0 0 C-14 -6 -18 -18 0 -26 C18 -18 14 -6 0 0 Z" fill="#ffd5df" />
          <path d="M0 0 C-18 -4 -20 -14 -6 -20 C-1 -12 0 -4 0 0 Z" fill="#ffaec2" />
          <path d="M0 0 C18 -4 20 -14 6 -20 C1 -12 0 -4 0 0 Z" fill="#ffaec2" />
          <circle cx="0" cy="-10" r="4.5" fill="#facc15" />
        </g>
      )}

      {/* Floating Gentle Golden Spores */}
      <circle cx="90" cy="50" r="2.5" fill="#fde047" opacity="0.8" />
      <circle cx="230" cy="60" r="2" fill="#fde047" opacity="0.7" />
      <circle cx="160" cy="12" r="3" fill="#fde047" opacity="0.9" />
      <circle cx="135" cy="150" r="2" fill="#86efac" opacity="0.75" />
      <circle cx="195" cy="145" r="2.5" fill="#86efac" opacity="0.75" />
    </svg>
  );
}

export default function DesignSandboxPreviewPage() {
  const [designStyle, setDesignStyle] = useState<"gamified" | "editorial">("gamified");
  const [isKhmer, setIsKhmer] = useState(true);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Gamification Player State
  const [playerXP, setPlayerXP] = useState(420);
  const maxXP = 500;
  const playerLevel = 6;
  const streakDays = 14;
  const [gemsCount, setGemsCount] = useState(275);

  // Daily Quests State
  const [quest1Done, setQuest1Done] = useState(true); // Mood Check-in
  const [quest2Done, setQuest2Done] = useState(false); // 4-7-8 Breathing
  const [quest3Done, setQuest3Done] = useState(false); // Gratitude Journal
  const [chestOpened, setChestOpened] = useState(false);
  const [showXPToast, setShowXPToast] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Breathing Simulator State
  const [isPlayingBreath, setIsPlayingBreath] = useState(false);
  const [breathTimer, setBreathTimer] = useState(240);

  // Calculate bloomed flowers count
  const completedCount = (quest1Done ? 1 : 0) + (quest2Done ? 1 : 0) + (quest3Done ? 1 : 0);

  function triggerXP(amount: number, gemBonus: number, message: string) {
    setPlayerXP((xp) => Math.min(maxXP, xp + amount));
    setGemsCount((g) => g + gemBonus);
    setShowXPToast(`+${amount} XP  +${gemBonus} 💎 • ${message}`);
    setTimeout(() => setShowXPToast(null), 3500);
  }

  function handleCompleteQuest2() {
    if (quest2Done) return;
    setQuest2Done(true);
    triggerXP(35, 5, isKhmer ? "បានបញ្ចប់ការដកដង្ហើម ៤-៧-៨!" : "Completed 4-7-8 Breathing!");
  }

  function handleCompleteQuest3() {
    if (quest3Done) return;
    setQuest3Done(true);
    triggerXP(20, 3, isKhmer ? "បានកត់ត្រាការដឹងគុណ!" : "Completed Gratitude Journal!");
  }

  function handleOpenChest() {
    if (completedCount < 3 || chestOpened) return;
    setChestOpened(true);
    setShowRewardModal(true);
    setPlayerXP(maxXP);
    setGemsCount((g) => g + 25);
  }

  return (
    <div className="min-h-screen bg-[#071913] text-white antialiased">
      {/* Top Control Bar */}
      <header className="sticky top-0 z-50 border-b border-[#143d2f] bg-[#0c241c]/95 px-4 py-2.5 backdrop-blur-md shadow-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#10b981] text-black shadow-xs font-black">
              <Trophy size={15} />
            </span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#34d399]">
                AROM Gamified Studio
              </span>
              <span className="ml-2 hidden text-xs text-gray-400 sm:inline">
                (Zero Code Impact Sandbox)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Style Selector: Gamified vs Editorial */}
            <div className="flex rounded-full bg-[#133327] p-0.5 text-xs font-extrabold border border-[#1e4d3b]">
              <button
                type="button"
                onClick={() => setDesignStyle("gamified")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  designStyle === "gamified"
                    ? "bg-[#10b981] text-[#052016] shadow-sm font-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span>🎮 {isKhmer ? "គំរូហ្គេម (Gamified)" : "Gamified"}</span>
              </button>
              <button
                type="button"
                onClick={() => setDesignStyle("editorial")}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-all ${
                  designStyle === "editorial"
                    ? "bg-[#10b981] text-[#052016] shadow-sm font-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span>🌿 {isKhmer ? "គំរូស្ងប់ស្ងាត់ (Editorial)" : "Editorial"}</span>
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setIsKhmer(!isKhmer)}
              className="rounded-full border border-[#20513e] bg-[#0c241c] px-2.5 py-1 text-xs font-black text-[#34d399] hover:bg-[#143b2d] active:translate-y-0.5 transition-all shadow-2xs"
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
                  ? "border-[#10b981] bg-[#10b981] text-[#052016]"
                  : "border-[#20513e] bg-[#0c241c] text-gray-300 hover:bg-[#143b2d]"
              }`}
            >
              <Smartphone size={16} />
            </button>

            {/* Link back to Main Live Application */}
            <Link
              href="/"
              className="rounded-full bg-[#0c241c] border border-[#20513e] px-3 py-1 text-xs font-semibold text-gray-300 hover:bg-[#143b2d] transition-colors"
            >
              {isKhmer ? "← ត្រឡប់ទៅកម្មវិធីពិត" : "← Back to Live App"}
            </Link>
          </div>
        </div>
      </header>

      {/* Floating XP Reward Notification Toast */}
      {showXPToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-2xl border-2 border-[#f59e0b] bg-gradient-to-r from-[#1c4d3e] to-[#0f3328] px-5 py-2.5 text-xs font-black text-[#fef08a] shadow-[0_10px_30px_rgba(245,158,11,0.35)] animate-bounce flex items-center gap-2">
          <span>✨</span>
          <span>{showXPToast}</span>
        </div>
      )}

      {/* Mystery Chest Celebration Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[32px] border-3 border-[#f59e0b] bg-gradient-to-b from-[#134233] via-[#0b281e] to-[#061812] p-6 text-center shadow-[0_0_50px_rgba(245,158,11,0.5)]">
            <span className="text-5xl">🎁</span>
            <h3 className="mt-3 text-xl font-black text-[#fef08a]">
              {isKhmer ? "អបអរសាទរ! កញ្ចប់រង្វាន់សុខុមាលភាព" : "Congratulations! Mystery Chest"}
            </h3>
            <p className="mt-1 text-xs text-gray-300 leading-relaxed">
              {isKhmer
                ? "អ្នកបានបំពេញបេសកកម្មសតិទាំង ៣ ប្រចាំថ្ងៃដោយជោគជ័យ!"
                : "You completed all 3 daily mindful quests today!"}
            </p>

            <div className="mt-4 rounded-2xl border border-[#2a6850] bg-[#0c241c] p-3 text-left space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-gray-300">
                  {isKhmer ? "គ្រាប់ពូជឈូកមាស (Golden Lotus Seed)" : "Golden Lotus Seed"}
                </span>
                <span className="text-[#f59e0b]">Unlocks Rare Bloom</span>
              </div>
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-gray-300">
                  {isKhmer ? "ពិន្ទុបទពិសោធន៍ (Experience)" : "Bonus XP"}
                </span>
                <span className="text-[#34d399]">+100 XP</span>
              </div>
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-gray-300">
                  {isKhmer ? "ត្បូងសុខុមាលភាព (Gems)" : "Bonus Gems"}
                </span>
                <span className="text-[#38bdf8]">+25 💎</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowRewardModal(false)}
              className="mt-5 w-full rounded-2xl border-2 border-b-4 border-[#b45309] bg-gradient-to-r from-[#f59e0b] to-[#d97706] py-3 text-sm font-black uppercase text-black shadow-md active:translate-y-0.5"
            >
              {isKhmer ? "ទទួលយករង្វាន់ (CLAIM)" : "CLAIM REWARD"}
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Container */}
      <main className="py-6 px-3 sm:px-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            isMobileFrame
              ? "max-w-[420px] rounded-[44px] border-[8px] border-[#103326] bg-gradient-to-b from-[#0c281e] via-[#091f17] to-[#040f0b] shadow-[0_24px_80px_rgba(16,185,129,0.25)] overflow-hidden min-h-[820px]"
              : "max-w-3xl rounded-3xl border border-[#1a4a37] bg-gradient-to-b from-[#0c281e] to-[#05140f] shadow-2xl p-4 sm:p-8"
          }`}
        >
          {/* ========================================================================= */}
          {/* GAMIFIED SANCTUARY HOME PAGE DESIGN                                       */}
          {/* ========================================================================= */}
          {designStyle === "gamified" && (
            <div className="pb-12 text-white font-sans">
              {/* TOP HUD: PLAYER LEVEL, XP BAR, STREAK SHIELD & GEMS */}
              <div className="px-5 pt-6 pb-2">
                <div className="flex items-center justify-between gap-2">
                  {/* Player Crest & XP Bar */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#d4af37] bg-gradient-to-br from-[#1c4d3e] to-[#0a231b] shadow-md text-center">
                      <span className="text-xl">🧘</span>
                      <span className="absolute -bottom-1.5 rounded-full bg-[#f59e0b] px-1 text-[9px] font-black text-black">
                        XP
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-[#34d399] truncate">
                          {isKhmer ? `កម្រិត ${playerLevel}: Mindful Guardian` : `Level ${playerLevel}: Mindful Guardian`}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {playerXP}/{maxXP} XP
                        </span>
                      </div>

                      {/* Glowing XP Bar */}
                      <div className="mt-1 relative h-3 w-full overflow-hidden rounded-full bg-[#051610] border border-[#1b4333]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#f59e0b] transition-all duration-700"
                          style={{ width: `${(playerXP / maxXP) * 100}%` }}
                        />
                        <div className="absolute top-0.5 right-1 size-2 rounded-full bg-white opacity-40" />
                      </div>
                    </div>
                  </div>

                  {/* Streak Shield & Gems Counter */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Flame Shield */}
                    <div className="flex items-center gap-1 rounded-2xl border border-[#b45309] bg-gradient-to-r from-[#451a03] to-[#270e02] px-2.5 py-1.5 text-xs font-black text-[#fbbf24] shadow-xs">
                      <Flame size={15} className="fill-[#fbbf24] animate-pulse" />
                      <span>{streakDays}d</span>
                    </div>

                    {/* Gems */}
                    <div className="flex items-center gap-1 rounded-2xl border border-[#0284c7] bg-gradient-to-r from-[#082f49] to-[#031d30] px-2.5 py-1.5 text-xs font-black text-[#38bdf8] shadow-xs">
                      <Gem size={14} className="fill-[#38bdf8]" />
                      <span>{gemsCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVING BONSAI LOTUS SANCTUARY (CENTERPIECE) */}
              <div className="relative mt-2 px-5 text-center">
                <LivingBonsaiLotusTree bloomedCount={completedCount} />

                {/* Tree Status Label Pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#246349] bg-[#0c2e22]/90 px-3.5 py-1 text-xs font-black text-[#6ee7b7] shadow-lg backdrop-blur-sm -mt-2">
                  <Leaf size={13} className="text-[#34d399]" />
                  <span>
                    {isKhmer
                      ? `ដើមសតិរីកស្គុះស្គាយ (${completedCount}/3 ផ្កាឈូក)`
                      : `Mindful Bonsai (${completedCount}/3 Lotus Bloomed)`}
                  </span>
                </div>
              </div>

              {/* DAILY QUESTS BOARD (CARVED WOODEN FRAME) */}
              <div className="mt-5 px-4">
                <div className="rounded-[30px] border-2 border-[#5c3a21] bg-gradient-to-b from-[#2e1d11] via-[#1d120a] to-[#120b06] p-4 shadow-2xl">
                  {/* Header Title */}
                  <div className="text-center pb-3 border-b border-[#4d301c]">
                    <h2 className="text-base font-black tracking-wide text-[#fef3c7]">
                      {isKhmer ? "បេសកកម្មប្រចាំថ្ងៃ" : "Daily Quests"}
                    </h2>
                    <p className="text-[10px] font-bold text-[#b4987a]">
                      {isKhmer
                        ? "បំពេញបេសកកម្មដើម្បីស្រោចទឹកដើមសតិ និងដោះសោរង្វាន់"
                        : "Complete daily quests to bloom your tree and earn XP"}
                    </p>
                  </div>

                  {/* 3 Quest Cards in Grid */}
                  <div className="mt-3.5 grid gap-2.5">
                    {/* QUEST 1: Mood Check-in (Completed) */}
                    <div className="flex items-center justify-between rounded-2xl border-2 border-[#2b5941] bg-gradient-to-r from-[#0f2e21] to-[#0a1f16] p-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#10b981] text-black font-black">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white">
                              {isKhmer ? "ពិនិត្យអារម្មណ៍ (Mood Check-in)" : "Daily Mood Check-in"}
                            </span>
                            <span className="rounded-md bg-[#f59e0b]/20 px-1.5 py-0.2 text-[9px] font-black text-[#fbbf24]">
                              +20 XP
                            </span>
                            <span className="rounded-md bg-[#0284c7]/20 px-1.5 py-0.2 text-[9px] font-black text-[#38bdf8]">
                              +3 💎
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400">
                            {isKhmer ? "អារម្មណ៍ស្ងប់សុខបានកត់ត្រារួចរាល់" : "Calm reflection recorded"}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-xl border border-[#2b5941] bg-[#0c241a] px-2.5 py-1 text-[11px] font-black text-[#34d399]">
                        ✓ {isKhmer ? "រួចរាល់" : "Done"}
                      </span>
                    </div>

                    {/* QUEST 2: 4-7-8 Breathing Reset (Interactive) */}
                    <div
                      className={`flex items-center justify-between rounded-2xl border-2 p-3 text-left transition-all ${
                        quest2Done
                          ? "border-[#2b5941] bg-gradient-to-r from-[#0f2e21] to-[#0a1f16]"
                          : "border-[#4a3221] bg-gradient-to-r from-[#21150c] to-[#160e08] hover:border-[#f59e0b]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl font-black ${
                            quest2Done ? "bg-[#10b981] text-black" : "bg-[#f59e0b] text-black"
                          }`}
                        >
                          {quest2Done ? <Check size={20} strokeWidth={3} /> : <Wind size={20} />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-white truncate">
                              {isKhmer ? "ដកដង្ហើម 4-7-8" : "4-7-8 Breathing"}
                            </span>
                            <span className="rounded-md bg-[#f59e0b]/20 px-1.5 py-0.2 text-[9px] font-black text-[#fbbf24]">
                              +35 XP
                            </span>
                            <span className="rounded-md bg-[#0284c7]/20 px-1.5 py-0.2 text-[9px] font-black text-[#38bdf8]">
                              +5 💎
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400">
                            {quest2Done
                              ? isKhmer
                                ? "វគ្គដកដង្ហើមស្ងប់ចិត្ត ៤ នាទីរួចរាល់"
                                : "Mindful breathing completed"
                              : isKhmer
                              ? "ដកដង្ហើម ៤ នាទីដើម្បីស្ងប់ប្រព័ន្ធប្រសាទ"
                              : "Reset your nervous system"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCompleteQuest2}
                        disabled={quest2Done}
                        className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-black uppercase transition-all ${
                          quest2Done
                            ? "border border-[#2b5941] bg-[#0c241a] text-[#34d399]"
                            : "border-2 border-b-3 border-[#166534] bg-[#22c55e] text-black hover:bg-[#16a34a] active:translate-y-0.5 shadow-sm"
                        }`}
                      >
                        {quest2Done ? "✓ Done" : isKhmer ? "ហាត់ (+35)" : "Start (+35)"}
                      </button>
                    </div>

                    {/* QUEST 3: Gratitude Journal (Interactive) */}
                    <div
                      className={`flex items-center justify-between rounded-2xl border-2 p-3 text-left transition-all ${
                        quest3Done
                          ? "border-[#2b5941] bg-gradient-to-r from-[#0f2e21] to-[#0a1f16]"
                          : "border-[#4a3221] bg-gradient-to-r from-[#21150c] to-[#160e08] hover:border-[#f59e0b]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl font-black ${
                            quest3Done ? "bg-[#10b981] text-black" : "bg-[#f59e0b] text-black"
                          }`}
                        >
                          {quest3Done ? <Check size={20} strokeWidth={3} /> : <BookOpen size={20} />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-white truncate">
                              {isKhmer ? "កំណត់ត្រាដឹងគុណ" : "Gratitude Journal"}
                            </span>
                            <span className="rounded-md bg-[#f59e0b]/20 px-1.5 py-0.2 text-[9px] font-black text-[#fbbf24]">
                              +20 XP
                            </span>
                            <span className="rounded-md bg-[#0284c7]/20 px-1.5 py-0.2 text-[9px] font-black text-[#38bdf8]">
                              +3 💎
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400">
                            {quest3Done
                              ? isKhmer
                                ? "ការឆ្លុះបញ្ចាំងបានរក្សាទុក"
                                : "Reflection recorded"
                              : isKhmer
                              ? "កត់ត្រារឿងល្អ ១ ដែលបានកើតឡើង"
                              : "Record 1 moment of peace"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCompleteQuest3}
                        disabled={quest3Done}
                        className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-black uppercase transition-all ${
                          quest3Done
                            ? "border border-[#2b5941] bg-[#0c241a] text-[#34d399]"
                            : "border-2 border-b-3 border-[#166534] bg-[#22c55e] text-black hover:bg-[#16a34a] active:translate-y-0.5 shadow-sm"
                        }`}
                      >
                        {quest3Done ? "✓ Done" : isKhmer ? "សរសេរ (+20)" : "Write (+20)"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* MYSTERY WELLNESS CHEST UNLOCK CARD */}
              <div className="mt-5 px-4">
                <div
                  className={`rounded-[28px] border-2 p-5 text-center transition-all ${
                    completedCount === 3
                      ? "border-[#f59e0b] bg-gradient-to-b from-[#1b4d3d] via-[#10382b] to-[#071c15] shadow-[0_0_40px_rgba(245,158,11,0.35)]"
                      : "border-[#1b4333] bg-[#0a2118]/80 opacity-90"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-4xl animate-bounce">
                      {chestOpened ? "🎁" : completedCount === 3 ? "✨📦" : "🔒📦"}
                    </span>

                    <h3 className="mt-2 text-sm font-black text-[#fef08a]">
                      {isKhmer ? "កញ្ចប់រង្វាន់សុខុមាលភាព (Mystery Chest)" : "Mystery Wellness Chest"}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {completedCount === 3
                        ? isKhmer
                          ? "រួចរាល់ហើយ! ចុចដើម្បីដោះសោរង្វាន់ពិសេស"
                          : "Ready to unlock! Tap to claim rewards"
                        : isKhmer
                        ? `បំពេញ ${completedCount}/3 បេសកកម្មដើម្បីដោះសោ`
                        : `${completedCount}/3 Quests to Unlock`}
                    </p>

                    <button
                      type="button"
                      onClick={handleOpenChest}
                      disabled={completedCount < 3 || chestOpened}
                      className={`mt-3 rounded-2xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                        chestOpened
                          ? "border border-[#2b5941] bg-[#0f2e21] text-gray-400 cursor-not-allowed"
                          : completedCount === 3
                          ? "border-2 border-b-4 border-[#b45309] bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-lg hover:scale-103 active:translate-y-0.5"
                          : "border border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {chestOpened
                        ? isKhmer
                          ? "បានបើករួចរាល់ ✓"
                          : "Opened ✓"
                        : completedCount === 3
                        ? isKhmer
                          ? "បើកកញ្ចប់រង្វាន់ (OPEN CHEST)"
                          : "OPEN CHEST"
                        : isKhmer
                        ? "ជាប់សោរ (Locked)"
                        : "Locked"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* EDITORIAL SANCTUARY HOME PAGE DESIGN                                      */}
          {/* ========================================================================= */}
          {designStyle === "editorial" && (
            <div className="pb-12 text-[#14221f] font-sans bg-[#faf9f6] -m-4 sm:-m-8 p-4 sm:p-8 rounded-[36px]">
              {/* Top Greeting Header */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#245242] to-[#407e66] text-white font-extrabold shadow-sm ring-4 ring-[#e5f0ea]">
                    <span className="text-sm">ML</span>
                    <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[#52b788] ring-2 ring-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-black tracking-tight text-[#14221f]">
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

              {/* Mood Check-in Row */}
              <div className="mt-4 grid grid-cols-5 gap-2">
                {[
                  { id: "calm", label: isKhmer ? "ស្ងប់សុខ" : "Calm", icon: "🌿", bg: "bg-[#eaf4ed]" },
                  { id: "joyful", label: isKhmer ? "រីករាយ" : "Joyful", icon: "☀️", bg: "bg-[#fef8e7]" },
                  { id: "balanced", label: isKhmer ? "មានលំនឹង" : "Balanced", icon: "⚖️", bg: "bg-[#edf2ef]" },
                  { id: "anxious", label: isKhmer ? "ថប់បារម្ភ" : "Anxious", icon: "🌊", bg: "bg-[#fbf0ea]" },
                  { id: "tired", label: isKhmer ? "ហត់នឿយ" : "Tired", icon: "🌙", bg: "bg-[#f4eff8]" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center justify-center rounded-2xl p-2.5 text-center border border-gray-200 ${item.bg}`}
                  >
                    <span className="text-lg leading-none">{item.icon}</span>
                    <span className="mt-1 text-[11px] font-black text-gray-800">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Hero Breathing Card */}
              <div className="mt-5 rounded-[26px] bg-[#1b4332] p-5 text-white shadow-md text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-[#c8eedb]">
                  <Wind size={12} />
                  {isKhmer ? "វគ្គសតិប្រចាំព្រឹក" : "Morning Clarity Reset"}
                </span>
                <h3 className="mt-3 text-base font-extrabold text-white">
                  {isKhmer ? "លំហាត់ដកដង្ហើមស្ងប់ចិត្ត ៤ នាទី" : "4-Minute Mindful Reset"}
                </h3>
                <p className="mt-1 text-xs text-white/80">
                  {isKhmer ? "ស្រូបយកខ្យល់បរិសុទ្ធ បញ្ចេញភាពតានតឹង" : "Inhale calm, exhale tension"}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
