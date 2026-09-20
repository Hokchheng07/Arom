"use client";

import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { MaskIcon, StressLightningIcon } from "./community-icons";
import { useLanguage } from "../../_components/language-provider";
import { SupportGroup } from "../community-data";

type CreatePostModalProps = {
  groups: SupportGroup[];
  selectedGroupId: string;
  onBack: () => void;
  onSubmitPost: (groupId: string, text: string, isAnonymous: boolean) => void;
};

export function CreatePostModal({
  groups,
  selectedGroupId,
  onBack,
  onSubmitPost,
}: CreatePostModalProps) {
  const { language } = useLanguage();
  const km = language === "km";

  const [groupId, setGroupId] = useState(selectedGroupId || groups[0]?.id || "");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showGroupSelect, setShowGroupSelect] = useState(false);
  const [showIdentitySelect, setShowIdentitySelect] = useState(false);

  const activeGroup = groups.find((g) => g.id === groupId) || groups[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitPost(groupId, content.trim(), isAnonymous);
  }

  return (
    <div className="w-full max-w-lg mx-auto pb-28 px-4 pt-3">
      {/* Top Bar matching Figma Screen 8 */}
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
          {km ? "បង្កើតការបង្ហោះ" : "Create a Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {/* Post To Dropdown matching Figma Screen 8 */}
        <div className="relative">
          <label className="block text-xs font-semibold text-[#4b5563] mb-1.5">
            {km ? "បង្ហោះទៅកាន់" : "Post to"}
          </label>
          <button
            type="button"
            onClick={() => setShowGroupSelect(!showGroupSelect)}
            className="flex w-full items-center justify-between rounded-[20px] border border-gray-200 bg-white p-3.5 shadow-sm hover:border-[#1f6f5b] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eaf5f1] text-[#1f6f5b]">
                <StressLightningIcon className="size-5" />
              </div>
              <span className="truncate text-sm font-bold text-[#1b5e4c]">
                {km ? activeGroup?.nameKm : activeGroup?.name}
              </span>
            </div>
            <ChevronDown size={20} className="text-gray-400 shrink-0" />
          </button>

          {showGroupSelect && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1.5 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95">
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setGroupId(g.id);
                    setShowGroupSelect(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    g.id === groupId
                      ? "bg-[#eaf5f1] text-[#1b5e4c] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="truncate">{km ? g.nameKm : g.name}</span>
                  {g.id === groupId && <span className="text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Textarea Card matching Figma Screen 8 */}
        <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm focus-within:border-[#1f6f5b] focus-within:ring-2 focus-within:ring-[#1f6f5b]/20 transition-all">
          <textarea
            rows={7}
            maxLength={500}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              km
                ? "ចែករំលែកគំនិតរបស់អ្នក សួរសំណួរ ឬចែករំលែកអ្វីដែលមានប្រយោជន៍...\n(សូមចងចាំថារក្សាការគោរព និងអនាមិក។)"
                : "Share your thoughts, ask a question, or share something helpful...\n(Remember to keep it respectful and anonymous.)"
            }
            className="w-full resize-none text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none leading-relaxed"
          />
          <div className="mt-2 text-right text-xs text-gray-400">
            {content.length}/500
          </div>
        </div>

        {/* Post As Row matching Figma Screen 8 */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 shadow-sm">
            {km ? "បង្ហោះជា" : "Post as"}
          </div>

          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowIdentitySelect(!showIdentitySelect)}
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#1b5e4c] shadow-sm hover:border-[#1f6f5b]"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#dff3ec]">
                  <MaskIcon className="size-3.5 text-[#1b5e4c]" />
                </div>
                <span>
                  {isAnonymous
                    ? km ? "អនាមិក (លំនាំដើម)" : "Anonymous (default)"
                    : "Panharith"}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400 shrink-0" />
            </button>

            {showIdentitySelect && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setIsAnonymous(true);
                    setShowIdentitySelect(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  <MaskIcon className="size-3.5 text-[#1b5e4c]" />
                  <span>{km ? "អនាមិក (លំនាំដើម)" : "Anonymous (default)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAnonymous(false);
                    setShowIdentitySelect(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="size-3.5 rounded-full bg-emerald-600 inline-block" />
                  <span>Panharith</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button matching Figma Screen 8 */}
        <div className="mt-4 pt-2">
          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full rounded-[18px] bg-[#1a5d4d] py-3.5 text-center text-base font-bold text-white shadow-lg shadow-[#1a5d4d]/25 transition-all duration-200 hover:bg-[#144b3e] disabled:opacity-50 active:scale-[0.99]"
          >
            {km ? "បង្ហោះ" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
