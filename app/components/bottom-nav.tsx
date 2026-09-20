"use client";

import Link from "next/link";
import { FigmaIcon } from "./figma-icon";
import { useLanguage } from "../_components/language-provider";

type BottomNavProps = {
  activeTab?: string;
  onOpenDetection: () => void;
};

export function BottomNav({ activeTab = "Home", onOpenDetection }: BottomNavProps) {
  const { language } = useLanguage();
  const km = language === "km";

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200/80 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex max-w-lg items-end justify-around px-2 pb-2 pt-1.5 sm:px-4">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-2 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
            activeTab === "Home" ? "text-[#1f6f5b]" : "text-black/80 hover:text-[#1f6f5b]"
          }`}
        >
          <FigmaIcon name="ant-design_home-filled" size={24} />
          <span className="text-[11px] sm:text-xs font-medium leading-none">
            {km ? "ទំព័រដើម" : "Home"}
          </span>
        </Link>

        {/* MindGuide */}
        <Link
          href="/mindguide"
          className={`flex flex-col items-center gap-1 py-1 px-2 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
            activeTab === "MindGuide" ? "text-[#1f6f5b]" : "text-black/80 hover:text-[#1f6f5b]"
          }`}
        >
          <FigmaIcon name="akar-icons_book" size={22} />
          <span className="text-[11px] sm:text-xs font-medium leading-none">
            {km ? "MindGuide" : "MindGuide"}
          </span>
        </Link>

        {/* Center Floating Detection Button (Component 72) */}
        <button
          type="button"
          onClick={onOpenDetection}
          aria-label="Track your mind and symptom detection"
          className="group -mt-6 flex flex-col items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f6f5b]"
        >
          <div className="flex size-[52px] items-center justify-center rounded-full bg-[#1f6f5b] text-white shadow-[0_6px_18px_rgba(31,111,91,0.35)] ring-4 ring-white transition-all duration-200 group-hover:scale-105 group-active:scale-95">
            <FigmaIcon name="cuida_heart-rate-outline" size={28} className="brightness-0 invert" />
          </div>
          <span className="text-[11px] sm:text-xs font-medium leading-none text-[#1f6f5b]">
            {km ? "ការរកឃើញ" : "Detection"}
          </span>
        </button>

        {/* Therapist */}
        <Link
          href="/professional"
          className={`flex flex-col items-center gap-1 py-1 px-2 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
            activeTab === "Therapist" ? "text-[#1f6f5b]" : "text-black/80 hover:text-[#1f6f5b]"
          }`}
        >
          <FigmaIcon name="akar-icons_heart" size={22} />
          <span className="text-[11px] sm:text-xs font-medium leading-none">
            {km ? "អ្នកជំនាញ" : "Therapist"}
          </span>
        </Link>

        {/* Community */}
        <Link
          href="/community"
          className={`flex flex-col items-center gap-1 py-1 px-2 focus-visible:outline-2 focus-visible:outline-[#1f6f5b] ${
            activeTab === "Community" ? "text-[#1f6f5b]" : "text-black/80 hover:text-[#1f6f5b]"
          }`}
        >
          <FigmaIcon name="boxicons_community-filled" size={23} />
          <span className="text-[11px] sm:text-xs font-medium leading-none">
            {km ? "សហគមន៍" : "community"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
