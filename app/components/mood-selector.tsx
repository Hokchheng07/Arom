"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { FigmaIcon } from "./figma-icon";
import { useLanguage } from "../_components/language-provider";

type MoodItem = {
  id: string;
  label: string;
  labelKm: string;
  icon: string;
};

const moods: MoodItem[] = [
  {
    id: "very-low",
    label: "Very Low",
    labelKm: "ទាបខ្លាំង",
    icon: "boxicons_tired",
  },
  {
    id: "low",
    label: "low",
    labelKm: "ទាប",
    icon: "akar-icons_face-sad",
  },
  {
    id: "okay",
    label: "Okay",
    labelKm: "ធម្មតា",
    icon: "teenyicons_mood-flat-outline",
  },
  {
    id: "good",
    label: "Good",
    labelKm: "ល្អ",
    icon: "ic_outline-mood",
  },
  {
    id: "great",
    label: "Great",
    labelKm: "ល្អប្រសើរ",
    icon: "boxicons_happy-beaming",
  },
];

export function MoodSelector() {
  const { language } = useLanguage();
  const km = language === "km";
  const router = useRouter();

  const [selectedMood, setSelectedMood] = useState<string>("Good");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("arom_today_mood");
      if (stored) {
        setSelectedMood(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectMood = (moodLabel: string) => {
    setSelectedMood(moodLabel);
    try {
      localStorage.setItem("arom_today_mood", moodLabel);
    } catch {
      // ignore
    }
    // Connect directly to Journal with the chosen mood
    router.push(`/detection/journal?mood=${encodeURIComponent(moodLabel)}`);
  };

  return (
    <section id="mood-check-in" aria-labelledby="mood-heading" className="pt-1">
      <div className="flex items-center justify-between">
        <h2 id="mood-heading" className="text-sm font-medium text-[#1f6f5b] sm:text-base">
          {km ? "ថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងដូចម្តេច?" : "How are you Feeling today?"}
        </h2>
        <Link
          href={`/detection/journal?mood=${encodeURIComponent(selectedMood)}`}
          className="text-xs font-semibold text-[#1f6f5b] hover:underline"
        >
          {km ? "សៀវភៅកំណត់ហេតុ" : "Journal"} &rarr;
        </Link>
      </div>

      <div
        role="radiogroup"
        aria-label="Select your mood"
        className="mt-3.5 grid grid-cols-5 gap-1.5 sm:gap-3"
      >
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.label;
          return (
            <button
              key={mood.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelectMood(mood.label)}
              title={`${mood.label} - ${km ? "បើកសរសេរកំណត់ហេតុ" : "Open in Journal"}`}
              className="group flex flex-col items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6f5b] rounded-xl py-1 transition-transform active:scale-95"
            >
              <div
                className={`flex size-11 items-center justify-center rounded-full transition-all duration-200 sm:size-12 ${
                  isSelected
                    ? "bg-[#1f6f5b] shadow-[0_4px_12px_rgba(31,111,91,0.28)] ring-2 ring-[#23aa89]"
                    : "bg-[#e0f3ed] hover:bg-[#d0ece3]"
                }`}
              >
                <span className={isSelected ? "brightness-0 invert" : ""}>
                  <FigmaIcon name={mood.icon} size={24} />
                </span>
              </div>

              <span
                className={`text-[11px] sm:text-xs leading-tight transition-colors ${
                  isSelected ? "font-bold text-[#1f6f5b]" : "font-medium text-[#1f6f5b]/80"
                }`}
              >
                {km ? mood.labelKm : mood.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Direct Quick Link to write reflection in Journal */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
        <Link
          href={`/detection/journal?mood=${encodeURIComponent(selectedMood)}`}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#1f6f5b] hover:underline"
        >
          <BookOpen size={13} className="text-[#1f6f5b]" />
          <span>
            {km ? "កត់ត្រាការឆ្លុះបញ្ចាំងក្នុងកំណត់ហេតុ" : "Write reflection in Journal"}
          </span>
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
