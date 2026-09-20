"use client";

import { useLanguage } from "../_components/language-provider";

export function GreetingSection() {
  const { language } = useLanguage();
  const km = language === "km";

  return (
    <section aria-label="Greeting" className="pt-2">
      <h1 className="text-xl font-bold tracking-tight text-[#1f6f5b] sm:text-2xl">
        {km ? "អរុណសួស្តី Muoyly!" : "Good morning Muoyly!"}
      </h1>
      <p className="mt-1 text-sm font-normal text-black/90 sm:text-base">
        {km ? "ថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងដូចម្តេច?" : "How are you feeling today?"}
      </p>
    </section>
  );
}
