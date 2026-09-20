"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  GraduationCap,
  Info,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../language-provider";
import {
  getLessonProgress,
  isLessonBookmarked,
  toggleLessonBookmark,
  type Lesson,
} from "./learn-data";

type LessonDetailViewProps = {
  lesson: Lesson;
  onBack: () => void;
  onStartLesson: (startSection?: number) => void;
};

export function LessonDetailView({
  lesson,
  onBack,
  onStartLesson,
}: LessonDetailViewProps) {
  const { language } = useLanguage();
  const km = language === "km";
  const [bookmarked, setBookmarked] = useState(() => isLessonBookmarked(lesson.id));
  const [showReferences, setShowReferences] = useState(false);
  const progress = getLessonProgress(lesson.id);

  const handleBookmarkToggle = () => {
    const newState = toggleLessonBookmark(lesson.id);
    setBookmarked(newState);
  };

  const hasProgress = progress.completedSections > 0 && !progress.isComplete;
  const startSectionNumber = hasProgress
    ? Math.min(progress.completedSections + 1, lesson.totalSections)
    : 1;

  return (
    <div className="min-h-screen bg-canvas text-ink pb-24 lg:pb-12">
      {/* Top sticky bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-arom-border bg-white/95 px-4 py-3.5 backdrop-blur-xl sm:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back to Learn"}
          className="flex size-10 items-center justify-center rounded-full border border-arom-border bg-white text-arom shadow-sm transition-colors hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-arom"
        >
          <ArrowLeft size={19} />
        </button>

        <span className="text-xs font-semibold tracking-wider uppercase text-arom">
          {km ? "ទិដ្ឋភាពទូទៅនៃមេរៀន" : "Lesson Overview"}
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
                ? "ចំណាំមេរៀននេះ"
                : "Bookmark this lesson"
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
            src={lesson.heroImage || "/mindguide/managing-stress-hero.svg"}
            alt={lesson.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-arom-deep/80 via-transparent to-transparent" />

          {/* Badges on hero */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 sm:bottom-6 sm:left-6 sm:right-6">
            <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-arom shadow-sm backdrop-blur-md">
              {lesson.category} &amp; {km ? "សុខុមាលភាព" : "Well-being"}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-arom/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
              <Clock3 size={13} />
              {km ? lesson.kmDuration : lesson.duration}
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
              {lesson.category}
            </span>
            <span className="text-ink-muted/40">•</span>
            <span className="inline-flex items-center gap-1 text-ink-muted">
              <GraduationCap size={14} />
              {km ? lesson.kmDifficulty : lesson.difficulty}
            </span>
            <span className="text-ink-muted/40">•</span>
            <span className="inline-flex items-center gap-1 text-ink-muted">
              <BookOpen size={14} />
              {km ? lesson.kmFormat : lesson.format}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-arom sm:text-3xl lg:text-4xl">
            {km ? lesson.kmTitle : lesson.title}
          </h1>
          <p className="mt-1 text-base font-semibold text-arom-accent sm:text-lg">
            {km ? lesson.kmSubtitle : lesson.subtitle}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink sm:text-base">
            {km ? lesson.kmDescription : lesson.description}
          </p>

          {/* If progress exists */}
          {hasProgress && (
            <div className="mt-5 rounded-2xl border border-arom-border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-arom">
                <span>{km ? "ដំណើរការរៀនបច្ចុប្បន្ន" : "Current Progress"}</span>
                <span>
                  {progress.completedSections} {km ? "នៃ" : "of"}{" "}
                  {lesson.totalSections} {km ? "ផ្នែកបានបញ្ចប់" : "sections done"}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-arom-soft">
                <div
                  className="h-full rounded-full bg-arom transition-all duration-300"
                  style={{
                    width: `${(progress.completedSections / lesson.totalSections) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* What You'll Learn Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
          aria-labelledby="what-youll-learn-title"
          className="mt-8 rounded-[1.5rem] border border-arom/15 bg-arom-accent/8 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center gap-2 text-base font-bold text-arom sm:text-lg">
            <span className="flex size-7 items-center justify-center rounded-lg bg-arom text-white">
              <Zap size={16} />
            </span>
            <h2 id="what-youll-learn-title">
              {km ? "អ្វីដែលអ្នកនឹងរៀន" : "What You'll Learn"}
            </h2>
          </div>

          <ul className="mt-5 space-y-3.5">
            {lesson.outcomes.map((outcome, idx) => (
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

        {/* References Collapsible Section */}
        {lesson.references && lesson.references.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.18 }}
            className="mt-6 rounded-2xl border border-arom-border bg-white p-4 text-xs text-ink-muted shadow-sm"
          >
            <button
              type="button"
              onClick={() => setShowReferences(!showReferences)}
              className="flex w-full items-center justify-between font-semibold text-arom hover:text-arom-deep"
            >
              <span className="flex items-center gap-1.5">
                <Info size={14} />
                {km ? "ឯកសារយោងវេជ្ជសាស្ត្រ និងស្រាវជ្រាវ (References [1] - [6])" : "Clinical & Research References ([1] - [6])"}
              </span>
              <span>{showReferences ? "▲ " + (km ? "បិទ" : "Hide") : "▼ " + (km ? "មើលទាំងអស់" : "Show All")}</span>
            </button>

            {showReferences && (
              <ul className="mt-3 space-y-1.5 border-t border-arom-border pt-3 text-[0.78rem] leading-relaxed text-ink">
                {lesson.references.map((ref) => (
                  <li key={ref.id} className="flex items-baseline gap-2">
                    <span className="font-bold text-arom">{ref.citation}</span>
                    <span>{ref.title}</span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-arom underline hover:text-arom-deep"
                      >
                        <ExternalLink size={10} className="ml-0.5" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {/* Primary Start / Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.22 }}
          className="mt-8 sm:mt-10"
        >
          <button
            type="button"
            onClick={() => onStartLesson(startSectionNumber)}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-arom px-6 text-base font-bold text-white shadow-[0_12px_28px_rgba(31,111,91,0.2)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-arom-deep hover:shadow-[0_16px_36px_rgba(31,111,91,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            <span>
              {hasProgress
                ? km
                  ? `បន្តការរៀន (ផ្នែកទី ${startSectionNumber})`
                  : `Continue Learning (Section ${startSectionNumber})`
                : km
                  ? "ចាប់ផ្តើមរៀនឥឡូវនេះ"
                  : "Start Learning"}
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
