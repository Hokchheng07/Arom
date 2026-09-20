"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BookOpen,
  Heart,
  Home,
  Settings,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "./language-provider";

export type NavigationLabel =
  | "Home"
  | "MindGuide"
  | "Detection"
  | "Professional"
  | "Community"
  | "Profile";

type NavigationItem = {
  label: NavigationLabel;
  icon: LucideIcon;
  href: string;
  emphasized?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "MindGuide", icon: BookOpen, href: "/mindguide" },
  { label: "Detection", icon: Activity, href: "/detection", emphasized: true },
  { label: "Professional", icon: Heart, href: "/professional" },
  { label: "Community", icon: UsersRound, href: "/community" },
];

const khmerNavigation: Record<NavigationLabel, string> = {
  Home: "ទំព័រដើម",
  MindGuide: "មគ្គុទ្ទេសក៍ចិត្ត",
  Detection: "ពិនិត្យសុខភាព",
  Professional: "អ្នកជំនាញ",
  Community: "សហគមន៍",
  Profile: "ប្រវត្តិរូប",
};

export function AromBrand({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage();
  return (
    <Link
      href="/"
      aria-label="AROM home"
      className="flex w-fit items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
    >
      <Image
        src="/brand/arom-mark.svg"
        alt=""
        width={40}
        height={32}
        className="h-8 w-10 shrink-0"
        unoptimized
      />
      <span>
        <span className="block text-[1.45rem] font-bold leading-none tracking-[-0.04em] text-arom">
          AROM
        </span>
        {!compact && (
          <span className="mt-2 block text-xs font-medium tracking-[-0.01em] text-ink-muted">
            {language === "km" ? "ចិត្តស្ងប់ស្ងាត់ ជីវិតកាន់តែភ្លឺស្វាង" : "A calmer mind, a brighter you"}
          </span>
        )}
      </span>
    </Link>
  );
}

export function DesktopNavigation({ active }: { active: NavigationLabel }) {
  const { language } = useLanguage();
  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-arom-border bg-white px-5 py-8 lg:flex">
      <div className="px-2">
        <AromBrand compact />
      </div>

      <nav aria-label="Primary" className="mt-14 flex flex-col gap-2">
        {navigationItems.map(({ label, icon: Icon, href }) => {
          const isActive = active === label;
          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex min-h-12 items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom ${
                isActive
                  ? "bg-arom-soft text-arom"
                  : "text-ink-muted hover:bg-arom-wash hover:text-arom"
              }`}
            >
              <Icon aria-hidden="true" size={21} strokeWidth={isActive ? 2.4 : 2} />
              {language === "km" ? khmerNavigation[label] : label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <Link
          href="/profile"
          aria-label="Profile and Settings"
          className={`group flex items-center gap-3 rounded-2xl border p-2.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-arom ${
            active === "Profile"
              ? "border-arom/40 bg-arom-soft text-arom shadow-sm"
              : "border-arom-border bg-white text-ink hover:border-arom/30 hover:bg-arom-wash"
          }`}
        >
          <Image
            src="/brand/muoyly-avatar.svg"
            alt="Muoyly"
            width={38}
            height={38}
            className="size-9 rounded-full object-cover ring-2 ring-arom/20"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold leading-tight text-ink">Muoyly Seng</p>
            <p className="truncate text-[0.7rem] text-ink-muted">
              {language === "km" ? "ប្រវត្តិរូប និងការកំណត់" : "Profile & Settings"}
            </p>
          </div>
          <Settings aria-hidden="true" size={17} className="text-ink-muted transition-transform duration-150 group-hover:rotate-45 group-hover:text-arom" />
        </Link>

        <div className="rounded-3xl bg-arom p-5 text-white">
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-white/14">
            <Heart aria-hidden="true" size={20} />
          </div>
          <p className="text-sm font-semibold">
            {language === "km" ? "ទុកពេលឱ្យខ្លួនឯង។" : "Make space for yourself."}
          </p>
          <p className="mt-1 text-xs leading-5 text-white/70">
            {language === "km"
              ? "ការសួរសុខទុក្ខខ្លួនឯងបន្តិច អាចផ្លាស់ប្តូរថ្ងៃរបស់អ្នក។"
              : "A small check-in can change the shape of your day."}
          </p>
        </div>
      </div>
    </aside>
  );
}

export function MobileNavigation({
  active,
  onOpenDetection,
}: {
  active: NavigationLabel;
  onOpenDetection?: () => void;
}) {
  const { language } = useLanguage();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-arom-border bg-white/96 px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_35px_rgba(15,80,65,0.06)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {navigationItems.map(({ label, icon: Icon, href, emphasized }) => {
          const isActive = active === label;
          const content = (
            <>
              <span
                className={
                  emphasized
                    ? `absolute -top-6 flex size-12 items-center justify-center rounded-full bg-arom text-white shadow-[0_8px_22px_rgba(31,111,91,0.26)] ring-4 ring-white transition-transform duration-200 ${
                        isActive ? "scale-105 ring-arom/20" : "hover:scale-105"
                      }`
                    : "flex h-7 items-center justify-center"
                }
              >
                <Icon
                  aria-hidden="true"
                  size={emphasized ? 25 : 24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={!emphasized && isActive ? "text-arom" : ""}
                />
              </span>
              <span
                className={`transition-colors duration-150 ${
                  emphasized ? "mt-7" : ""
                } ${isActive ? "font-bold text-arom" : "font-medium text-ink/75"}`}
              >
                {language === "km" ? khmerNavigation[label] : label}
              </span>
            </>
          );

          if (emphasized && onOpenDetection) {
            return (
              <button
                key={label}
                type="button"
                onClick={onOpenDetection}
                aria-label={language === "km" ? khmerNavigation[label] : label}
                className="relative flex min-h-[52px] flex-col items-center justify-end gap-1 rounded-xl text-[0.66rem] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-arom"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className="relative flex min-h-[52px] flex-col items-center justify-end gap-1 rounded-xl text-[0.66rem] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-arom"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
