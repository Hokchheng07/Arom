"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Wind,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../language-provider";
import {
  isPracticeBookmarked,
  togglePracticeBookmark,
  type PracticeItem,
} from "./practice-data";

type PracticeDetailViewProps = {
  practice: PracticeItem;
  onBack: () => void;
  onStartPractice: () => void;
};

export function PracticeDetailView({
  practice,
  onBack,
  onStartPractice,
}: PracticeDetailViewProps) {
  const { language } = useLanguage();
  const km = language === "km";
  const [bookmarked, setBookmarked] = useState(() =>
    isPracticeBookmarked(practice.id),
  );

  const handleBookmarkToggle = () => {
    const newState = togglePracticeBookmark(practice.id);
    setBookmarked(newState);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-24 lg:pb-12">
      {/* Top sticky bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-arom-border bg-white/95 px-4 py-3.5 backdrop-blur-xl sm:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back to Practice"}
          className="flex size-10 items-center justify-center rounded-full border border-arom-border bg-white text-arom shadow-sm transition-colors hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-arom"
        >
          <ArrowLeft size={19} />
        </button>

        <span className="text-xs font-semibold tracking-wider uppercase text-arom">
          {km ? "ទិដ្ឋភាពទូទៅនៃការអនុវត្ត" : "Practice Overview"}
        </span>

        <button
          type="button"
          onClick={handleBookmarkToggle}
          aria-label={
            bookmarked
              ? km
                ? "លុបចំណាំ"
                : "Remove bookmark"
              : km
                ? "ចំណាំការអនុវត្តនេះ"
                : "Bookmark this practice"
          }
          className={`flex size-10 items-center justify-center rounded-full border shadow-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-arom ${
            bookmarked
              ? "border-arom bg-arom-soft text-arom"
              : "border-arom-border bg-white text-ink-muted hover:bg-arom-wash hover:text-arom"
          }`}
        >
          <Bookmark
            size={18}
            className={bookmarked ? "fill-arom" : "fill-none"}
          />
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-6 sm:px-8 sm:pt-8">
        {/* Hero Visual Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative aspect-[16/8] w-full overflow-hidden rounded-[1.85rem] border border-arom-border bg-arom-soft shadow-card sm:aspect-[16/7]"
        >
          <Image
            src={practice.heroImage || "/mindguide/managing-stress-hero.svg"}
            alt={practice.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-arom-deep/80 via-transparent to-transparent" />

          {/* Badges on hero */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 sm:bottom-6 sm:left-6 sm:right-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-arom shadow-sm backdrop-blur-md">
              <Wind size={13} className="text-arom" />
              {practice.category}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-arom/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
              <Clock3 size={13} />
              {km ? practice.kmDuration : practice.duration}
            </span>
          </div>
        </motion.div>

        {/* Title and Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.06 }}
          className="mt-6 sm:mt-8"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-arom">
            <span>{km ? "ប្រភេទ៖" : "Category:"}</span>
            <span className="rounded-md bg-arom-soft px-2 py-0.5 text-arom">
              {practice.category}
            </span>
            <span className="text-ink-muted/40">•</span>
            <span className="inline-flex items-center gap-1 text-ink-muted">
              <GraduationCap size={14} />
              {km ? practice.kmDifficulty : practice.difficulty}
            </span>
            <span className="text-ink-muted/40">•</span>
            <span className="inline-flex items-center gap-1 text-ink-muted">
              <Wind size={14} />
              {km ? practice.kmFormat : practice.format}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-arom sm:text-3xl lg:text-4xl">
            {km ? practice.kmTitle : practice.title}
          </h1>
          <p className="mt-1 text-base font-semibold text-arom-accent sm:text-lg">
            {km ? practice.kmSubtitle : practice.subtitle}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink sm:text-base">
            {km ? practice.kmDescription : practice.description}
          </p>
        </motion.div>

        {/* What You Will Practice Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
          aria-labelledby="what-youll-practice-title"
          className="mt-8 rounded-[1.5rem] border border-arom/15 bg-arom-accent/8 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center gap-2 text-base font-bold text-arom sm:text-lg">
            <span className="flex size-7 items-center justify-center rounded-lg bg-arom text-white">
              <Zap size={16} />
            </span>
            <h2 id="what-youll-practice-title">
              {km ? "អ្វីដែលអ្នកនឹងអនុវត្ត" : "What You Will Practice"}
            </h2>
          </div>

          <ul className="mt-5 space-y-3.5">
            {practice.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-arom"
                />
                <span className="leading-snug">{km && outcome.km ? outcome.km : outcome.en}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Primary Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.18 }}
          className="mt-8 sm:mt-10"
        >
          <button
            type="button"
            onClick={onStartPractice}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-arom px-6 text-base font-bold text-white shadow-[0_12px_28px_rgba(31,111,91,0.2)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-arom-deep hover:shadow-[0_16px_36px_rgba(31,111,91,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            <span>
              {km ? "ចាប់ផ្តើមការដកដង្ហើមឥឡូវនេះ" : "Start Breathing Session"}
            </span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
