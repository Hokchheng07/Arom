"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  HeartHandshake,
  Home,
  MoonStar,
  Search,
  Sparkles,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AromBrand, DesktopNavigation, MobileNavigation } from "./app-navigation";
import { useLanguage } from "./language-provider";

const easeOut = [0.23, 1, 0.32, 1] as const;

const categories = [
  { label: "Learn", khmer: "សិក្សា", icon: "/mindguide/icon-10.svg" },
  { label: "Practice", khmer: "អនុវត្ត", icon: "/mindguide/icon-11.svg" },
  { label: "Tips", khmer: "គន្លឹះ", icon: "/mindguide/icon-7.svg" },
  { label: "Podcast", khmer: "ផតខាស", icon: "/mindguide/icon-9.svg" },
];

const lessons = [
  {
    title: "Managing Stress",
    khmer: "ការគ្រប់គ្រងភាពតានតឹង",
    duration: "5 mins",
    khmerDuration: "៥ នាទី",
    image: "/mindguide/stress.png",
    href: "/mindguide/managing-daily-stress",
  },
  {
    title: "Sleep well",
    khmer: "គេងឱ្យបានស្កប់ស្កល់",
    duration: "4 mins",
    khmerDuration: "៤ នាទី",
    image: "/mindguide/sleep.png",
    href: "#",
  },
  {
    title: "Strategies",
    khmer: "យុទ្ធសាស្ត្រ",
    duration: "10 mins",
    khmerDuration: "១០ នាទី",
    image: "/mindguide/strategies.png",
    href: "#",
  },
];

type LearnItem = {
  title: string;
  khmer: string;
  description: string;
  khmerDescription: string;
  duration: string;
  khmerDuration: string;
  icon: LucideIcon;
};

const learnItems: LearnItem[] = [
  {
    title: "Understanding your mind",
    khmer: "ស្វែងយល់ពីចិត្តរបស់អ្នក",
    description: "A gentle introduction to mental wellbeing.",
    khmerDescription: "ការណែនាំដ៏សាមញ្ញអំពីសុខភាពផ្លូវចិត្ត។",
    duration: "5 mins",
    khmerDuration: "៥ នាទី",
    icon: BrainCircuit,
  },
  {
    title: "Recognising anxious thoughts",
    khmer: "ស្គាល់គំនិតថប់បារម្ភ",
    description: "Notice patterns without judging yourself.",
    khmerDescription: "សម្គាល់លំនាំគំនិតដោយមិនវិនិច្ឆ័យខ្លួនឯង។",
    duration: "7 mins",
    khmerDuration: "៧ នាទី",
    icon: Sparkles,
  },
  {
    title: "Building self-compassion",
    khmer: "បង្កើតការអាណិតអាសូរខ្លួនឯង",
    description: "Practice speaking to yourself with care.",
    khmerDescription: "ហាត់និយាយជាមួយខ្លួនឯងដោយក្តីមេត្តា។",
    duration: "6 mins",
    khmerDuration: "៦ នាទី",
    icon: HeartHandshake,
  },
  {
    title: "Rest and better sleep",
    khmer: "សម្រាក និងគេងឱ្យបានល្អ",
    description: "Small habits for a calmer evening.",
    khmerDescription: "ទម្លាប់តូចៗសម្រាប់ពេលល្ងាចដ៏ស្ងប់ស្ងាត់។",
    duration: "6 mins",
    khmerDuration: "៦ នាទី",
    icon: MoonStar,
  },
];

function LearnPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const km = language === "km";
  const panelNavigation = [
    { label: km ? "ទំព័រដើម" : "Home", icon: Home, href: "/" },
    { label: km ? "មគ្គុទ្ទេសក៍ចិត្ត" : "MindGuide", icon: BookOpen, href: "/mindguide", active: true },
    { label: km ? "សហគមន៍" : "Community", icon: UsersRound, href: "#" },
    { label: km ? "ប្រវត្តិរូប" : "Profile", icon: UserRound, href: "/profile" },
  ];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => searchRef.current?.focus(), 0);

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label={km ? "បិទផ្ទាំងសិក្សា" : "Close learning panel"}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: easeOut }}
            className="fixed inset-0 z-50 cursor-default bg-ink/28 backdrop-blur-[2px]"
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="learn-panel-title"
            onKeyDown={trapFocus}
            initial={{
              opacity: 0,
              transform: shouldReduceMotion ? "translateX(0)" : "translateX(100%)",
            }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            exit={{
              opacity: 0,
              transform: shouldReduceMotion ? "translateX(0)" : "translateX(100%)",
            }}
            transition={{ duration: 0.24, ease: easeOut }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full flex-col bg-canvas shadow-[-24px_0_60px_rgba(20,68,57,0.16)] sm:max-w-[29rem]"
          >
            <header className="relative flex min-h-[4.5rem] items-center justify-center border-b border-arom-border bg-white px-5 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
                className="absolute left-4 flex size-11 items-center justify-center rounded-full text-arom transition-colors duration-150 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom sm:left-5"
              >
                <ArrowLeft aria-hidden="true" size={25} />
              </button>
              <h2 id="learn-panel-title" className="text-xl font-bold tracking-[-0.02em] text-arom">
                {km ? "សិក្សា" : "Learn"}
              </h2>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-4 sm:px-6">
              <label className="relative block">
                <span className="sr-only">{km ? "ស្វែងរកមេរៀន" : "Search lessons"}</span>
                <Search aria-hidden="true" size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder={km ? "ស្វែងរកប្រធានបទ..." : "Search topics..."}
                  className="h-12 w-full rounded-2xl border border-arom-border bg-white pl-11 pr-4 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-muted/70 focus:border-arom focus:ring-4 focus:ring-arom/10"
                />
              </label>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label={km ? "ប្រធានបទ" : "Topics"}>
                {[
                  km ? "ទាំងអស់" : "All",
                  km ? "ការថប់បារម្ភ" : "Anxiety",
                  km ? "តម្លៃខ្លួនឯង" : "Self-Esteem",
                  km ? "ការគេង" : "Sleep",
                  km ? "អារម្មណ៍" : "Emotions",
                ].map((topic, index) => (
                  <button
                    key={topic}
                    type="button"
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom ${
                      index === 0 ? "bg-arom text-white" : "border border-arom-border bg-white text-ink-muted hover:bg-arom-wash hover:text-arom"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-ink">
                  {km ? "មូលដ្ឋានសុខភាពផ្លូវចិត្ត" : "Mental health basics"}
                </h3>
                <Link
                  href="/learn"
                  className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-arom focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
                >
                  {km ? "មើលទាំងអស់" : "See all"}
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {learnItems.map(({ title, khmer, description, khmerDescription, duration, khmerDuration, icon: Icon }) => (
                  <button
                    key={title}
                    type="button"
                    className="group flex min-h-[6.4rem] w-full items-center gap-4 rounded-2xl border border-arom-border bg-white p-3 text-left shadow-[0_8px_24px_rgba(25,87,72,0.05)] transition-[border-color,box-shadow] duration-150 hover:border-arom/35 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
                  >
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-arom-soft text-arom sm:size-[4.5rem]">
                      <Icon aria-hidden="true" size={34} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-5 text-arom">{km ? khmer : title}</span>
                      <span className="mt-0.5 block line-clamp-2 text-xs leading-[1.1rem] text-ink-muted">
                        {km ? khmerDescription : description}
                      </span>
                      <span className="mt-1 block text-[0.68rem] font-medium text-ink">{km ? khmerDuration : duration}</span>
                    </span>
                    <ChevronRight aria-hidden="true" size={20} className="shrink-0 text-arom transition-transform duration-150 group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>

            <nav aria-label={km ? "ការរុករកផ្ទាំងសិក្សា" : "Learn navigation"} className="shrink-0 border-t border-arom-border bg-white px-2 pb-[calc(0.45rem+env(safe-area-inset-bottom))] pt-2">
              <div className="grid grid-cols-5 items-end">
                {panelNavigation.slice(0, 2).map(({ label, icon: Icon, href, active }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 flex-col items-center justify-end gap-1 rounded-xl text-[0.62rem] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-arom ${active ? "text-arom" : "text-ink-muted hover:text-arom"}`}
                  >
                    <Icon aria-hidden="true" size={24} strokeWidth={active ? 2.5 : 2} />
                    <span className="max-w-full truncate px-1">{label}</span>
                  </Link>
                ))}

                <button type="button" aria-label={km ? "ថែទាំចិត្ត" : "Mindful moment"} className="flex min-h-14 items-start justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-arom">
                  <span className="-mt-5 flex size-14 items-center justify-center rounded-full bg-arom text-white shadow-[0_8px_22px_rgba(31,111,91,0.26)] ring-4 ring-white">
                    <Image src="/mindguide/icon-11.svg" alt="" width={34} height={34} className="size-[2.15rem] brightness-0 invert" unoptimized />
                  </span>
                </button>

                {panelNavigation.slice(2).map(({ label, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex min-h-14 flex-col items-center justify-end gap-1 rounded-xl text-[0.62rem] font-medium text-ink-muted transition-colors duration-150 hover:text-arom focus-visible:outline-2 focus-visible:outline-arom"
                  >
                    <Icon aria-hidden="true" size={24} strokeWidth={2} />
                    <span className="max-w-full truncate px-1">{label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function MindGuideHome() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const learnTriggerRef = useRef<HTMLButtonElement>(null);
  const km = language === "km";

  const item = {
    hidden: {
      opacity: 0,
      transform: shouldReduceMotion ? "translateY(0)" : "translateY(8px)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0)",
      transition: { duration: shouldReduceMotion ? 0.16 : 0.24, ease: easeOut },
    },
  };

  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <DesktopNavigation active="MindGuide" />

      <motion.main
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.055 }}
        className="min-w-0 px-5 pb-28 pt-5 sm:px-8 sm:pt-7 lg:px-10 lg:pb-12 lg:pt-8 xl:px-12"
      >
        <div className="mx-auto w-full max-w-[70rem]">
          <motion.header variants={item} className="flex items-center justify-between gap-4 lg:hidden">
            <AromBrand />
            <Link
              href="/profile"
              aria-label="Open profile and settings"
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-arom"
            >
              <Image
                src="/brand/muoyly-avatar.svg"
                alt="Muoyly"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover ring-2 ring-white shadow-[0_5px_18px_rgba(20,75,63,0.15)]"
                unoptimized
              />
            </Link>
          </motion.header>

          <motion.section
            variants={item}
            aria-labelledby="mindguide-title"
            className="relative mt-8 aspect-[356/132] min-h-[132px] overflow-hidden rounded-[1.85rem] bg-[#dcf5ee] shadow-[0_16px_40px_rgba(31,111,91,0.08)] sm:mt-9 lg:mt-0 lg:min-h-[260px] lg:rounded-[2rem]"
          >
            <Image
              src="/traced/arom-design.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 70vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e8faf5]/96 via-[#e8faf5]/65 to-transparent lg:via-[#e8faf5]/35" />
            <div className="relative z-10 flex h-full max-w-[66%] flex-col justify-center px-4 py-5 sm:px-7 lg:max-w-[48%] lg:px-12">
              <p className="hidden text-xs font-semibold uppercase tracking-[0.15em] text-arom-accent lg:block">
                {km ? "ស្វែងយល់ និងអនុវត្ត" : "Learn and practice"}
              </p>
              <h1 id="mindguide-title" className="text-[1.35rem] font-semibold leading-tight text-arom sm:text-2xl lg:mt-2 lg:text-[2.75rem]">
                MindGuide
              </h1>
              <p className="mt-1 max-w-[14rem] text-[0.78rem] leading-[1.15rem] text-ink sm:max-w-sm sm:text-sm sm:leading-6 lg:mt-3 lg:text-base">
                {km
                  ? "រៀន អនុវត្ត និងថែរក្សាសុខភាពផ្លូវចិត្តរបស់អ្នក។"
                  : "Learn, practice, and take care of your mind."}
              </p>
            </div>
          </motion.section>

          <motion.nav variants={item} aria-label="MindGuide categories" className="mt-6 grid grid-cols-4 gap-2 sm:mx-auto sm:max-w-2xl sm:gap-6 lg:mt-9">
            {categories.map((category) => {
              const categoryContent = (
                <>
                <span className="flex size-14 items-center justify-center rounded-full bg-arom-accent/20 transition-transform duration-150 group-hover:-translate-y-0.5 sm:size-16">
                  <Image src={category.icon} alt="" width={37} height={37} className="size-8 object-contain sm:size-9" unoptimized />
                </span>
                <span className="mt-2 truncate text-[0.7rem] font-medium text-arom sm:text-sm">
                  {km ? category.khmer : category.label}
                </span>
                </>
              );

              if (category.label === "Learn") {
                return (
                  <Link
                    key={category.label}
                    href="/learn"
                    className="group flex min-w-0 flex-col items-center rounded-2xl py-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
                  >
                    {categoryContent}
                  </Link>
                );
              }

              if (category.label === "Practice") {
                return (
                  <Link
                    key={category.label}
                    href="/practice"
                    className="group flex min-w-0 flex-col items-center rounded-2xl py-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
                  >
                    {categoryContent}
                  </Link>
                );
              }

              return (
                <a
                  key={category.label}
                  href="#today"
                  className="group flex min-w-0 flex-col items-center rounded-2xl py-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
                >
                  {categoryContent}
                </a>
              );
            })}
          </motion.nav>

          <motion.section variants={item} id="today" aria-labelledby="today-title" className="mt-9 lg:mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="hidden text-xs font-semibold uppercase tracking-[0.15em] text-arom-accent lg:block">
                  {km ? "ការណែនាំប្រចាំថ្ងៃ" : "Daily recommendations"}
                </p>
                <h2 id="today-title" className="text-2xl font-semibold text-arom lg:mt-1.5 lg:text-3xl">
                  {km ? "សម្រាប់ថ្ងៃនេះ" : "For Today"}
                </h2>
              </div>
              <span className="hidden rounded-full bg-arom-soft px-3 py-1 text-xs font-medium text-arom sm:block">
                {km ? "៣ មេរៀន" : "3 lessons"}
              </span>
            </div>

            <div className="mt-4 grid gap-2 lg:grid-cols-3 lg:gap-5">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.title}
                  href={lesson.href}
                  className="group flex min-h-[53px] items-center rounded-xl border-2 border-arom bg-arom/[0.07] px-2.5 py-1.5 transition-[background-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:bg-arom-soft hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom lg:min-h-[84px] lg:rounded-2xl lg:px-4"
                >
                  <Image
                    src={lesson.image}
                    alt=""
                    width={42}
                    height={42}
                    className="size-10 shrink-0 rounded-full object-cover lg:size-12"
                  />
                  <span className="ml-4 min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-arom lg:text-base">
                      {km ? lesson.khmer : lesson.title}
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] text-ink lg:text-xs">
                      {km ? lesson.khmerDuration : lesson.duration}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" size={22} strokeWidth={2.5} className="ml-2 shrink-0 text-arom transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.main>

      <MobileNavigation active="MindGuide" />
      <LearnPanel
        open={isLearnOpen}
        onClose={() => {
          setIsLearnOpen(false);
          window.setTimeout(() => learnTriggerRef.current?.focus(), 0);
        }}
      />
    </div>
  );
}
