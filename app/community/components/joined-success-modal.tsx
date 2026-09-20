"use client";

import Image from "next/image";
import { ChevronLeft, Check } from "lucide-react";
import { useLanguage } from "../../_components/language-provider";
import { SupportGroup } from "../community-data";

type JoinedSuccessModalProps = {
  group: SupportGroup;
  onGoToGroup: (groupId: string) => void;
  onExploreMore: () => void;
  onBack: () => void;
};

export function JoinedSuccessModal({
  group,
  onGoToGroup,
  onExploreMore,
  onBack,
}: JoinedSuccessModalProps) {
  const { language } = useLanguage();
  const km = language === "km";

  return (
    <div className="w-full max-w-lg mx-auto pb-28 px-4 pt-3">
      {/* Top Bar */}
      <div className="flex items-center py-2">
        <button
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full text-[#1f6f5b] hover:bg-[#eaf5f1] transition-colors"
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
        >
          <ChevronLeft size={28} />
        </button>
      </div>

      {/* Celebration Graphic matching Figma Screen 4 */}
      <div className="relative mx-auto mt-2 h-44 w-60 overflow-hidden">
        <Image
          src="/figma/community/joined_celebration_badge.png"
          alt="Celebration badge"
          fill
          className="object-contain object-center"
          priority
          unoptimized
        />
      </div>

      {/* Header Info matching Figma */}
      <div className="text-center mt-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">
          {km ? "អ្នកបានចូលរួមហើយ!" : "You’ve joined!"}
        </h1>
        <p className="mt-1 text-sm text-[#4b5563]">
          {km ? "សូមស្វាគមន៍មកកាន់" : "Welcome to"}
        </p>
        <h2 className="mt-0.5 text-2xl font-black text-[#111827]">
          {km ? group.nameKm : group.name}
        </h2>
      </div>

      {/* Privacy assurances Card matching Figma Screen 4 */}
      <div className="mt-6 rounded-[24px] bg-[#f9fafb] border border-gray-100/90 p-5 shadow-sm">
        <ul className="space-y-4 text-sm text-[#374151]">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1b5e4c] text-white shadow-sm">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="leading-snug">
              {km
                ? "អ្នកកំពុងចូលរួមជាសមាជិកអនាមិក។"
                : "You are joining as an anonymous member."}
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1b5e4c] text-white shadow-sm">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="leading-snug">
              {km
                ? "អត្តសញ្ញាណរបស់អ្នកត្រូវបានលាក់ពីសមាជិកដទៃ។"
                : "Your identity is hidden from other members."}
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1b5e4c] text-white shadow-sm">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="leading-snug">
              {km
                ? "អ្នកអាចផ្លាស់ប្តូរឈ្មោះបង្ហាញរបស់អ្នកគ្រប់ពេល។"
                : "You can change your display name anytime."}
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons matching Figma Screen 4 */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => onGoToGroup(group.id)}
          className="w-full rounded-[18px] bg-[#1a5d4d] py-3.5 text-center text-base font-bold text-white shadow-lg shadow-[#1a5d4d]/25 transition-all duration-200 hover:bg-[#144b3e] active:scale-[0.99]"
        >
          {km ? "ចូលទៅកាន់ក្រុម" : "Go to Group"}
        </button>

        <button
          onClick={onExploreMore}
          className="w-full rounded-[18px] border border-gray-300 bg-white py-3.5 text-center text-base font-bold text-[#111827] shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-[0.99]"
        >
          {km ? "រុករកក្រុមបន្ថែម" : "Explore More Groups"}
        </button>
      </div>
    </div>
  );
}
