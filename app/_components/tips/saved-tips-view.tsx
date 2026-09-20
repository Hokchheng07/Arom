"use client";

import Image from "next/image";
import { ArrowLeft, Bookmark, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "../language-provider";
import {
  STORAGE_TIPS_KEYS,
  TIP_CONTROL_STRESS,
  type TipItem,
} from "./tips-data";

type SavedTipsViewProps = {
  onBack: () => void;
  onSelectTip: (tip: TipItem) => void;
};

export function SavedTipsView({
  onBack,
  onSelectTip,
}: SavedTipsViewProps) {
  const { language } = useLanguage();
  const km = language === "km";

  const [savedIds, setSavedIds] = useState<string[]>(["how-to-control-stress"]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_TIPS_KEYS.BOOKMARKS);
      if (raw) {
        setSavedIds(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const next = prev.filter((item) => item !== id);
      try {
        window.localStorage.setItem(
          STORAGE_TIPS_KEYS.BOOKMARKS,
          JSON.stringify(next),
        );
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const isStressTipSaved = savedIds.includes("how-to-control-stress");

  return (
    <div className="min-h-screen bg-canvas text-ink pb-24 lg:pb-12">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-arom-border bg-white px-4 py-3.5 backdrop-blur-xl sm:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back to Tips"}
          className="flex size-10 items-center justify-center rounded-full border border-arom-border bg-white text-arom shadow-sm transition-colors hover:bg-arom-wash"
        >
          <ArrowLeft size={19} />
        </button>

        <h1 className="text-base font-bold text-arom sm:text-lg">
          {km ? "គន្លឹះដែលបានរក្សាទុក" : "Saved Tips"}
        </h1>

        <div className="size-10" />
      </header>

      <main className="mx-auto max-w-2xl px-4 pt-6 sm:px-8 sm:pt-8">
        {!isStressTipSaved ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-arom-border bg-white py-14 px-4 text-center shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-arom-soft text-arom">
              <Bookmark size={24} />
            </span>
            <p className="mt-4 text-sm font-bold text-arom">
              {km ? "គ្មានគន្លឹះដែលបានរក្សាទុកនៅឡើយទេ" : "No saved tips yet"}
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              {km
                ? "ចុចរូបសញ្ញាចំណាំដើម្បីរក្សាទុកសម្រាប់អានពេលក្រោយ"
                : "Bookmark any tip guide to return and read anytime."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => onSelectTip(TIP_CONTROL_STRESS)}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-arom-border bg-white p-3.5 shadow-[0_8px_24px_rgba(25,87,72,0.05)] transition-all hover:border-arom/40 hover:shadow-card sm:p-4"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-arom-soft sm:size-20 flex items-center justify-center">
                <Image
                  src={TIP_CONTROL_STRESS.image}
                  alt={TIP_CONTROL_STRESS.title}
                  width={38}
                  height={38}
                  className="size-8 object-contain sm:size-9"
                  unoptimized
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-md bg-arom-soft px-2 py-0.5 text-[0.68rem] font-semibold text-arom">
                  {TIP_CONTROL_STRESS.category}
                </span>
                <h3 className="mt-1 truncate text-sm font-bold text-ink sm:text-base">
                  {km && TIP_CONTROL_STRESS.kmTitle
                    ? TIP_CONTROL_STRESS.kmTitle
                    : TIP_CONTROL_STRESS.title}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  {km ? TIP_CONTROL_STRESS.kmDuration : TIP_CONTROL_STRESS.duration} • {km ? TIP_CONTROL_STRESS.kmDifficulty : TIP_CONTROL_STRESS.difficulty}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => handleRemove("how-to-control-stress", e)}
                aria-label="Remove bookmark"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-arom-border bg-white text-arom transition-colors hover:bg-arom-wash shadow-sm"
              >
                <Bookmark size={17} className="fill-arom" />
              </button>

              <ChevronRight
                size={18}
                className="shrink-0 text-arom transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
