"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FigmaIcon } from "./figma-icon";
import { useLanguage } from "../_components/language-provider";

type PlanActivity = {
  id: string;
  title: string;
  titleKm: string;
  subtitle: string;
  subtitleKm: string;
  icon: string;
  href: string;
  completed?: boolean;
};

const activities: PlanActivity[] = [
  {
    id: "mood",
    title: "Mood check in",
    titleKm: "ពិនិត្យអារម្មណ៍",
    subtitle: "Great Start",
    subtitleKm: "ការចាប់ផ្តើមដ៏ល្អ",
    icon: "mdi_check-circle",
    href: "#mood-check-in",
    completed: true,
  },
  {
    id: "mindguide",
    title: "MindGuide Lesson",
    titleKm: "មេរៀន MindGuide",
    subtitle: "Understanding Anxiety(5min)",
    subtitleKm: "ស្វែងយល់ពីការថប់បារម្ភ (៥នាទី)",
    icon: "ant-design_play-circle-filled",
    href: "/mindguide",
    completed: true,
  },
  {
    id: "meditation",
    title: "Guided Meditation",
    titleKm: "សមាធិដោយមានការណែនាំ",
    subtitle: "Relax and breathe (3min)",
    subtitleKm: "សម្រាក និងដកដង្ហើម (៣នាទី)",
    icon: "hugeicons_yoga-03",
    href: "/mindguide",
    completed: false,
  },
  {
    id: "mission",
    title: "Daily Mission",
    titleKm: "បេសកកម្មប្រចាំថ្ងៃ",
    subtitle: "Write one thing you’re grateful for",
    subtitleKm: "សរសេររឿងមួយដែលអ្នកដឹងគុណ",
    icon: "boxicons_note-filled",
    href: "#",
    completed: false,
  },
  {
    id: "community",
    title: "Explore Community",
    titleKm: "ស្វែងយល់ពីសហគមន៍",
    subtitle: "Share Each Others",
    subtitleKm: "ចែករំលែកជាមួយគ្នាទៅវិញទៅមក",
    icon: "fluent_people-community-32-filled",
    href: "#",
    completed: false,
  },
];

export function DailyPlanCard() {
  const { language } = useLanguage();
  const km = language === "km";

  return (
    <section
      aria-labelledby="daily-plan-heading"
      className="rounded-[20px] bg-[#1f6f5b] p-4 text-white shadow-[0_12px_36px_rgba(31,111,91,0.18)] sm:p-5"
    >
      <h2 id="daily-plan-heading" className="text-sm font-medium tracking-normal sm:text-base">
        {km ? "ផែនការរបស់អ្នកសម្រាប់ថ្ងៃនេះ" : "Your Plan For Today"}
      </h2>

      {/* 5-segment progress bar matching Figma: 2 mint, 3 white */}
      <div
        role="progressbar"
        aria-valuenow={2}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-label="Two of five tasks completed"
        className="mt-3 flex items-center gap-1.5"
      >
        <span className="h-1 flex-1 rounded-full bg-[#23aa89]" />
        <span className="h-1 flex-1 rounded-full bg-[#23aa89]" />
        <span className="h-1 flex-1 rounded-full bg-white" />
        <span className="h-1 flex-1 rounded-full bg-white" />
        <span className="h-1 flex-1 rounded-full bg-white" />
      </div>

      {/* 5 Activity items */}
      <div className="mt-3 divide-y divide-white/10">
        {activities.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex items-center gap-3 py-2.5 transition-colors duration-150 hover:bg-white/5 rounded-xl px-1.5 focus-visible:outline-2 focus-visible:outline-white"
          >
            <div className="flex size-7 items-center justify-center shrink-0">
              <FigmaIcon name={item.icon} size={22} className="text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium leading-tight text-white sm:text-[13px]">
                {km ? item.titleKm : item.title}
              </p>
              <p className="mt-0.5 text-[11px] font-light leading-tight text-white/80">
                {km ? item.subtitleKm : item.subtitle}
              </p>
            </div>

            <ChevronRight
              aria-hidden="true"
              className="size-4 shrink-0 text-white/90 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
