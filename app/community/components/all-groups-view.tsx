"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  GraduationCapIcon,
  StressLightningIcon,
  SadFaceIcon,
} from "./community-icons";
import { useLanguage } from "../../_components/language-provider";
import { SupportGroup } from "../community-data";

type AllGroupsViewProps = {
  groups: SupportGroup[];
  onBack: () => void;
  onSelectGroup: (groupId: string) => void;
};

export function AllGroupsView({
  groups,
  onBack,
  onSelectGroup,
}: AllGroupsViewProps) {
  const { language } = useLanguage();
  const km = language === "km";
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = groups.filter((g) => {
    const q = searchQuery.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.nameKm.toLowerCase().includes(q) ||
      g.about.toLowerCase().includes(q)
    );
  });

  function renderGroupIcon(type: SupportGroup["iconType"]) {
    switch (type) {
      case "academic":
        return <GraduationCapIcon className="size-7 text-[#1b5e4c]" />;
      case "stress":
        return <StressLightningIcon className="size-7 text-[#1b5e4c]" />;
      case "anxiety":
        return <SadFaceIcon className="size-7 text-[#1b5e4c]" />;
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto pb-28 px-4 pt-3">
      {/* Top Navigation */}
      <div className="flex items-center gap-2 py-2">
        <button
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full text-[#1f6f5b] hover:bg-[#eaf5f1] transition-colors"
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
        >
          <ChevronLeft size={28} />
        </button>
      </div>

      {/* Title */}
      <div className="mt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827]">
          {km ? "ក្រុមគាំទ្រទាំងអស់" : "All Support Groups"}
        </h1>
      </div>

      {/* Search Input matching Figma Screen 2 */}
      <div className="mt-5 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={km ? "ស្វែងរកក្រុម..." : "Search Groups ..."}
          className="w-full rounded-[22px] border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#1f6f5b] focus:outline-none focus:ring-2 focus:ring-[#1f6f5b]/20"
        />
      </div>

      {/* Groups List */}
      <div className="mt-6 flex flex-col gap-3.5">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
            {km ? "រកមិនឃើញក្រុមដែលត្រូវគ្នាទេ" : "No matching groups found."}
          </div>
        ) : (
          filtered.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className="group flex cursor-pointer items-center justify-between rounded-[22px] border border-gray-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#1f6f5b]/40 hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-[#e6f4ef] text-[#1f6f5b] transition-transform group-hover:scale-105">
                  {renderGroupIcon(group.iconType)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#111827] group-hover:text-[#1f6f5b] transition-colors">
                    {km ? group.nameKm : group.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#6b7280]">
                    {group.membersCount}/{group.maxMembers}{" "}
                    {km ? "សមាជិក" : "Members"}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={22}
                className="shrink-0 text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#1f6f5b] transition-all"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
