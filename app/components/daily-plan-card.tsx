"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FigmaIcon } from "./figma-icon";
import { useLanguage } from "../_components/language-provider";
import {
  getPlanTryNowItems,
  togglePlanTryNowComplete,
  type PlanTryNowItem,
} from "../_components/tips/tips-data";

type PlanActivity = {
  id: string;
  title: string;
  titleKm: string;
  subtitle: string;
  subtitleKm: string;
  icon: string;
  href: string;
  completed?: boolean;
  isTryNow?: boolean;
  stepNumber?: number;
};

const baseActivities: PlanActivity[] = [
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
    subtitle: "Understanding Anxiety (5min)",
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
    href: "/practice",
    completed: false,
  },
  {
    id: "community",
    title: "Explore Community",
    titleKm: "ស្វែងយល់ពីសហគមន៍",
    subtitle: "Share Each Other",
    subtitleKm: "ចែករំលែកជាមួយគ្នាទៅវិញទៅមក",
    icon: "fluent_people-community-32-filled",
    href: "/community",
    completed: false,
  },
];

export function DailyPlanCard() {
  const { language } = useLanguage();
  const km = language === "km";
  const [tryNowItems, setTryNowItems] = useState<PlanTryNowItem[]>([]);

  useEffect(() => {
    setTryNowItems(getPlanTryNowItems());

    const handleUpdate = () => {
      setTryNowItems(getPlanTryNowItems());
    };

    window.addEventListener("arom_plan_updated", handleUpdate);
    return () => window.removeEventListener("arom_plan_updated", handleUpdate);
  }, []);

  const handleToggleTryNow = (e: React.MouseEvent, stepNumber: number) => {
    e.preventDefault();
    e.stopPropagation();
    togglePlanTryNowComplete(stepNumber);
  };

  // Convert try now items into plan activities
  const tryNowActivities: PlanActivity[] =
    tryNowItems.length > 0
      ? tryNowItems.map((item) => ({
          id: item.id,
          title: item.title,
          titleKm: item.kmTitle,
          subtitle: item.subtitle,
          subtitleKm: item.kmSubtitle,
          icon: item.completed ? "mdi_check-circle" : "boxicons_note-filled",
          href: "/tips",
          completed: item.completed,
          isTryNow: true,
          stepNumber: item.stepNumber,
        }))
      : [
          {
            id: "default-try-now",
            title: "Try now: Cut what you control",
            titleKm: "សាកល្បង៖ កាត់បន្ថយអ្វីដែលអ្នកគ្រប់គ្រង",
            subtitle: "drop or delay ONE thing this week.",
            subtitleKm: "លុបចោល ឬពន្យារពេលរឿងមួយក្នុងសប្តាហ៍នេះ។",
            icon: "boxicons_note-filled",
            href: "/tips",
            completed: false,
            isTryNow: true,
            stepNumber: 1,
          },
        ];

  // Merge base activities and try now activities (placing Try Now in position 4)
  const allActivities: PlanActivity[] = [
    baseActivities[0],
    baseActivities[1],
    baseActivities[2],
    ...tryNowActivities,
    baseActivities[3],
  ];

  const totalTasks = allActivities.length;
  const completedTasks = allActivities.filter((a) => a.completed).length;

  return (
    <section
      aria-labelledby="daily-plan-heading"
      className="rounded-[20px] bg-[#1f6f5b] p-4 text-white shadow-[0_12px_36px_rgba(31,111,91,0.18)] sm:p-5"
    >
      <div className="flex items-center justify-between">
        <h2 id="daily-plan-heading" className="text-sm font-medium tracking-normal sm:text-base">
          {km ? "ផែនការរបស់អ្នកសម្រាប់ថ្ងៃនេះ" : "Your Plan For Today"}
        </h2>
        <span className="text-xs font-semibold text-[#83dfca]">
          {completedTasks}/{totalTasks} {km ? "បានបញ្ចប់" : "done"}
        </span>
      </div>

      {/* Dynamic segment progress bar */}
      <div
        role="progressbar"
        aria-valuenow={completedTasks}
        aria-valuemin={0}
        aria-valuemax={totalTasks}
        aria-label={`${completedTasks} of ${totalTasks} tasks completed`}
        className="mt-3 flex items-center gap-1.5"
      >
        {allActivities.map((task, idx) => (
          <span
            key={task.id || idx}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              task.completed ? "bg-[#23aa89]" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Plan Activity items */}
      <div className="mt-3 divide-y divide-white/10">
        {allActivities.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex items-center gap-3 py-2.5 transition-colors duration-150 hover:bg-white/5 rounded-xl px-1.5 focus-visible:outline-2 focus-visible:outline-white"
          >
            {item.isTryNow && item.stepNumber !== undefined ? (
              <button
                type="button"
                onClick={(e) => handleToggleTryNow(e, item.stepNumber!)}
                aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                className={`flex size-7 items-center justify-center rounded-full shrink-0 border transition-colors ${
                  item.completed
                    ? "border-[#23aa89] bg-[#23aa89] text-white shadow-sm"
                    : "border-white/40 bg-white/10 text-white/60 hover:border-white hover:text-white"
                }`}
              >
                {item.completed ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : (
                  <FigmaIcon name="boxicons_note-filled" size={16} className="text-white" />
                )}
              </button>
            ) : (
              <div className="flex size-7 items-center justify-center shrink-0">
                <FigmaIcon name={item.icon} size={22} className="text-white" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-medium leading-tight text-white sm:text-[13px]">
                  {km ? item.titleKm : item.title}
                </p>
                {item.isTryNow && (
                  <span className="rounded bg-[#23aa89]/30 px-1.5 py-0.5 text-[0.62rem] font-semibold text-[#a3edd9]">
                    {km ? "សាកល្បង" : "Try Now"}
                  </span>
                )}
              </div>
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
