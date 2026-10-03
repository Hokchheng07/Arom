"use client";

import { FigmaIcon } from "./figma-icon";
import { useLanguage } from "../_components/language-provider";

export function QuoteCard() {
  const { language } = useLanguage();
  const km = language === "km";

  return (
    <aside
      aria-label="Inspirational quote"
      className="flex items-center justify-between gap-3 rounded-[14px] bg-[#e0f3ed] px-4 py-3.5 text-[#1f6f5b] shadow-sm"
    >
      <div className="flex size-7 items-center justify-center shrink-0">
        <FigmaIcon name="boxicons_quote-left-alt-filled" size={24} />
      </div>

      <p className="flex-1 text-[13px] sm:text-sm font-normal leading-snug text-[#1f6f5b]">
        {km ? (
          <>
            ការបោះជំហានទៅមុខ ទោះជាតិចតួចក្តី
            <br />
            ក៏នៅតែជាការរីកចម្រើនដ៏មានតម្លៃ។
          </>
        ) : (
          "Progress is still progress, no matter how small."
        )}
      </p>

      <div className="flex size-7 items-center justify-center shrink-0">
        <FigmaIcon name="akar-icons_heart" size={22} />
      </div>
    </aside>
  );
}
