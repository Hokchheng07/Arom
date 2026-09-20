"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../_components/language-provider";

export function TopHeader() {
  const { language } = useLanguage();
  const km = language === "km";

  return (
    <header className="flex items-center justify-between gap-4 pt-2">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[26px] font-bold tracking-tight text-[#1f6f5b] leading-none">
            AROM
          </span>
          <Image
            src="/figma/arom-logo-mark.png"
            alt="AROM emblem"
            width={34}
            height={24}
            className="h-6 w-auto object-contain"
            priority
            unoptimized
          />
        </div>
        <p className="mt-1 text-xs font-medium text-black/80 leading-none">
          {km ? "ចិត្តស្ងប់ស្ងាត់ ជីវិតកាន់តែភ្លឺស្វាងសម្រាប់អ្នក" : "A calmer mind,a brighter for you"}
        </p>
      </div>

      <Link
        href="/profile"
        aria-label="Open profile"
        className="rounded-full ring-2 ring-white shadow-[0_4px_14px_rgba(31,111,91,0.18)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
      >
        <Image
          src="/figma/muoyly-avatar.png"
          alt="Muoyly"
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
          priority
          unoptimized
        />
      </Link>
    </header>
  );
}
