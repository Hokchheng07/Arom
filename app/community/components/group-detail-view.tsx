"use client";

import Image from "next/image";
import { ChevronLeft, Check } from "lucide-react";
import { MaskIcon } from "./community-icons";
import { useLanguage } from "../../_components/language-provider";
import { SupportGroup } from "../community-data";

type GroupDetailViewProps = {
  group: SupportGroup;
  onBack: () => void;
  onJoinGroup: (groupId: string) => void;
  onOpenGroupHub: (groupId: string) => void;
};

export function GroupDetailView({
  group,
  onBack,
  onJoinGroup,
  onOpenGroupHub,
}: GroupDetailViewProps) {
  const { language } = useLanguage();
  const km = language === "km";

  const isJoined = group.isJoined;

  return (
    <div className="w-full max-w-lg mx-auto pb-28 px-4 pt-3">
      {/* Back Button matching Figma Screen 3 */}
      <div className="flex items-center py-2">
        <button
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full text-[#1f6f5b] hover:bg-[#eaf5f1] transition-colors"
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
        >
          <ChevronLeft size={28} />
        </button>
      </div>

      {/* Hero Illustration matching Figma Screen 3 */}
      <div className="relative mx-auto h-52 sm:h-56 w-full max-w-xs overflow-hidden">
        <Image
          src="/figma/community/group_guide_illustration.png"
          alt="Group Mentor Illustration"
          fill
          className="object-contain object-center"
          priority
          unoptimized
        />
      </div>

      {/* Group Title matching Figma */}
      <div className="mt-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827]">
          {km ? group.nameKm : group.name}
        </h1>

        {/* Badges matching Figma Screen 3 */}
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-xl bg-[#e3f4ef] px-3 py-1.5 text-xs font-semibold text-[#1e6f5a]">
            {group.membersCount}/{group.maxMembers}{" "}
            {km ? "សមាជិក" : "members"}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#e3f4ef] px-3 py-1.5 text-xs font-semibold text-[#1e6f5a]">
            <MaskIcon className="size-4 text-[#1e6f5a]" />
            {km ? "ក្រុមអនាមិក" : "Anonymous group"}
          </span>
        </div>
      </div>

      {/* About This Group */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-[#111827]">
          {km ? "អំពីក្រុមនេះ" : "About This Group"}
        </h2>
        <p className="mt-2 text-sm text-[#4b5563] leading-relaxed">
          {km ? group.aboutKm : group.about}
        </p>
      </div>

      {/* What You Can Expect matching Figma Screen 3 */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-[#111827]">
          {km ? "អ្វីដែលអ្នកអាចរំពឹងទុក" : "What You Can Expect"}
        </h2>

        <ul className="mt-3.5 space-y-3">
          {(km ? group.expectationsKm : group.expectations).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[#374151]">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1b5e4c] text-white shadow-sm">
                <Check size={13} strokeWidth={3} />
              </span>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button matching Figma Screen 3 */}
      <div className="mt-8 pt-2">
        {isJoined ? (
          <button
            onClick={() => onOpenGroupHub(group.id)}
            className="w-full rounded-[18px] bg-[#1a5d4d] py-3.5 text-center text-base font-bold text-white shadow-lg shadow-[#1a5d4d]/25 transition-all duration-200 hover:bg-[#144b3e] active:scale-[0.99]"
          >
            {km ? "ចូលទៅកាន់ក្រុម (បានចូលរួម)" : "Go to Group Hub"}
          </button>
        ) : (
          <button
            onClick={() => onJoinGroup(group.id)}
            className="w-full rounded-[18px] bg-[#1a5d4d] py-3.5 text-center text-base font-bold text-white shadow-lg shadow-[#1a5d4d]/25 transition-all duration-200 hover:bg-[#144b3e] active:scale-[0.99]"
          >
            {km ? "ចូលរួមក្រុម" : "Join Group"}
          </button>
        )}
      </div>
    </div>
  );
}
