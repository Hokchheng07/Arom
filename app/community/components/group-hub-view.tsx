"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Plus, UserCheck, Briefcase, CheckCircle2 } from "lucide-react";
import {
  MaskIcon,
  ShieldCheckIcon,
  PaperPlaneIcon,
} from "./community-icons";
import { useLanguage } from "../../_components/language-provider";
import {
  SupportGroup,
  ChatMessage,
  GroupActivity,
  GroupMember,
} from "../community-data";

type GroupHubViewProps = {
  group: SupportGroup;
  messages: ChatMessage[];
  activities: GroupActivity[];
  members: GroupMember[];
  onBack: () => void;
  onSendMessage: (text: string, groupId?: string) => void;
  onToggleActivityJoin: (activityId: string) => void;
  onOpenCreatePost: () => void;
};

export function GroupHubView({
  group,
  messages,
  activities,
  members,
  onBack,
  onSendMessage,
  onToggleActivityJoin,
  onOpenCreatePost,
}: GroupHubViewProps) {
  const { language } = useLanguage();
  const km = language === "km";

  const [activeTab, setActiveTab] = useState<"chat" | "activities" | "member">("chat");
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), group.id);
    setInputText("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const upcoming = activities.filter((a) => a.isUpcoming);
  const past = activities.filter((a) => !a.isUpcoming);

  return (
    <div className="w-full max-w-lg mx-auto pb-6 px-4 pt-3 flex flex-col min-h-screen">
      {/* Top Header matching Figma Screen 5 */}
      <div className="flex items-center gap-2 py-2">
        <button
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full text-[#1f6f5b] hover:bg-[#eaf5f1] transition-colors"
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
        >
          <ChevronLeft size={28} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl sm:text-2xl font-extrabold text-[#111827]">
            {km ? group.nameKm : group.name}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-[#6b7280]">
              {group.membersCount}/{group.maxMembers} {km ? "សមាជិក" : "members"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-[#e3f4ef] px-2 py-0.5 text-[11px] font-semibold text-[#1e6f5a]">
              <MaskIcon className="size-3 text-[#1e6f5a]" />
              {km ? "ក្រុមអនាមិក" : "Anonymous group"}
            </span>
          </div>
        </div>

        {/* Quick Create Post button */}
        <button
          onClick={onOpenCreatePost}
          className="flex items-center gap-1 rounded-xl bg-[#1b5e4c] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#144b3e] transition-colors shrink-0"
          title={km ? "បង្កើតការបង្ហោះ" : "Create Post"}
        >
          <Plus size={16} />
          <span className="hidden sm:inline">{km ? "បង្ហោះ" : "Post"}</span>
        </button>
      </div>

      {/* Segmented Control Tabs matching Figma */}
      <div className="mt-4 grid grid-cols-3 border-b border-gray-200 text-center">
        {(["chat", "activities", "member"] as const).map((tab) => {
          const isActive = activeTab === tab;
          const label =
            tab === "chat"
              ? km ? "ជជែក" : "Chat"
              : tab === "activities"
              ? km ? "សកម្មភាព" : "Activities"
              : km ? "សមាជិក" : "Member";

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 text-sm font-bold transition-all relative ${
                isActive
                  ? "text-[#111827]"
                  : "text-[#6b7280] hover:text-[#111827]"
              }`}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 inset-x-4 h-0.5 bg-[#111827] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-4 flex-1">
        {/* TAB 1: CHAT */}
        {activeTab === "chat" && (
          <div className="flex flex-col gap-4">
            {/* Pinned Group Guidelines Card matching Figma Screen 5 */}
            <div className="rounded-[22px] bg-[#dff3ec] p-4 text-[#1b4332] shadow-sm border border-[#cbebe1]">
              <div className="flex items-start gap-2.5">
                <ShieldCheckIcon className="size-6 text-[#1b5e4c] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold">
                    {km ? "គោលការណ៍ណែនាំក្រុម៖" : "Group Guideline:"}
                  </h3>
                  <ul className="mt-1.5 space-y-0.5 text-xs text-[#265d4c] leading-relaxed">
                    <li>• {km ? "មានចិត្តសប្បុរស និងការគោរពគ្នា។" : "Be kind and respectful."}</li>
                    <li>• {km ? "រក្សាការសន្ទនាជាសម្ងាត់។" : "Keep conversations private."}</li>
                    <li>• {km ? "គ្មានការវិនិច្ឆ័យ។" : "No judgement."}</li>
                    <li>• {km ? "មិនចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន។" : "No sharing of personal .information"}</li>
                    <li>• {km ? "គ្មានការធ្វើរោគវិនិច្ឆ័យ ឬដំបូន្មានវេជ្ជសាស្ត្រ។" : "No diagnosis or medical advice."}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Chat Stream matching Figma Screen 5 */}
            <div className="space-y-3.5 pt-1">
              {messages.map((msg) => {
                return (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-[0_1px_6px_rgba(0,0,0,0.03)] border border-gray-100/80"
                  >
                    {/* Avatar */}
                    {msg.isMentor ? (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1b5e4c] text-white shadow-sm">
                        <UserCheck size={20} />
                      </div>
                    ) : (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dff3ec] text-[#1b5e4c] shadow-sm">
                        <MaskIcon className="size-5 text-[#1b5e4c]" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-xs font-bold text-[#111827]">
                          {msg.senderName}
                          {msg.isMentor && (
                            <span className="ml-1.5 rounded bg-[#1b5e4c] px-1.5 py-0.2 text-[10px] font-semibold text-white">
                              Mentor
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-[11px] text-gray-400">
                          {msg.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-[#374151] leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar matching Figma Screen 5 */}
            <form
              onSubmit={handleSend}
              className="sticky bottom-3 z-30 mt-4 flex items-center gap-2.5 rounded-full border border-gray-200/90 bg-white/98 backdrop-blur-md px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={km ? "ចែករំលែកគំនិតរបស់អ្នក..." : "Share your thought..."}
                className="flex-1 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1b5e4c] text-white transition-all disabled:opacity-40 hover:bg-[#144b3e] active:scale-95 shadow-sm"
                aria-label={km ? "ផ្ញើ" : "Send"}
              >
                <PaperPlaneIcon className="size-5" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: ACTIVITIES */}
        {activeTab === "activities" && (
          <div className="flex flex-col gap-6">
            {/* Upcoming Activities matching Figma Screen 6 */}
            <div>
              <h2 className="text-base font-bold text-[#111827]">
                {km ? "សកម្មភាពខាងមុខ" : "Upcoming Activities"}
              </h2>

              <div className="mt-3 flex flex-col gap-3">
                {upcoming.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between rounded-[22px] border border-gray-100 bg-white p-3.5 shadow-sm"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#e6f4ef]">
                        {act.iconAsset ? (
                          <Image
                            src={act.iconAsset}
                            alt=""
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#111827]">
                          {km ? act.titleKm : act.title}
                        </h3>
                        <p className="truncate text-xs text-[#6b7280]">
                          {act.topic}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-[#1f6f5b]">
                          {act.dateStr}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleActivityJoin(act.id)}
                      className={`ml-2 shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                        act.isJoined
                          ? "bg-[#eaf5f1] text-[#1b5e4c] border border-[#1b5e4c]/30"
                          : "bg-[#1b5e4c] text-white hover:bg-[#144b3e]"
                      }`}
                    >
                      {act.isJoined
                        ? km ? "បានចូល ✓" : "Joined ✓"
                        : km ? "ចូលរួម" : "Join"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Activities matching Figma Screen 6 */}
            <div>
              <h2 className="text-base font-bold text-[#111827]">
                {km ? "សកម្មភាពកន្លងមក" : "Past Activities"}
              </h2>

              <div className="mt-3 flex flex-col gap-3">
                {past.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center gap-3.5 rounded-[22px] border border-gray-100 bg-white p-3.5 shadow-sm"
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#e6f4ef]">
                      {act.iconAsset ? (
                        <Image
                          src={act.iconAsset}
                          alt=""
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-[#111827]">
                        {km ? act.titleKm : act.title}
                      </h3>
                      <p className="text-xs text-[#9ca3af]">{act.dateStr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEMBER matching Figma Screen 7 with Mentor at the top */}
        {activeTab === "member" && (
          <div className="flex flex-col gap-5">
            {/* Mentor Section on top */}
            {group.mentor && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1b5e4c]">
                    {km ? "អ្នកណែនាំក្រុម" : "Group Mentor"}
                  </h2>
                  <span className="rounded-full bg-[#e3f4ef] px-2.5 py-0.5 text-[11px] font-bold text-[#1b5e4c]">
                    {km ? (group.mentor.badgeKm || "អ្នកណែនាំក្រុម") : (group.mentor.badge || "Group Mentor")}
                  </span>
                </div>

                <div className="rounded-[22px] border border-[#1b5e4c]/25 bg-gradient-to-br from-[#f2f9f6] via-white to-white p-4 shadow-[0_2px_12px_rgba(27,94,76,0.06)]">
                  <div className="flex items-center gap-3.5">
                    {/* Mentor Avatar */}
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1b5e4c]/20 bg-[#e3f4ef]">
                      {group.mentor.avatarUrl ? (
                        <Image
                          src={group.mentor.avatarUrl}
                          alt={group.mentor.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-[#1b5e4c]">
                          <UserCheck size={26} />
                        </div>
                      )}
                    </div>

                    {/* Mentor Details: Name, Role, Experience */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-base font-extrabold text-[#111827]">
                          {km ? group.mentor.nameKm : group.mentor.name}
                        </h3>
                        <span className="shrink-0 text-[#1b5e4c]" title="Verified Mentor">
                          <CheckCircle2 size={16} className="fill-[#1b5e4c] text-white" />
                        </span>
                      </div>

                      {/* Role */}
                      <p className="truncate text-xs font-bold text-[#1b5e4c] mt-0.5">
                        {km ? group.mentor.roleKm : group.mentor.role}
                      </p>

                      {/* Experience */}
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#4b5563]">
                        <Briefcase size={12} className="text-[#1b5e4c] shrink-0" />
                        <span className="font-semibold text-gray-700">
                          {km ? group.mentor.experienceKm : group.mentor.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mentor Bio / Note */}
                  {group.mentor.bio && (
                    <p className="mt-3 border-t border-gray-100/90 pt-2.5 text-xs text-[#4b5563] leading-relaxed">
                      {km ? group.mentor.bioKm : group.mentor.bio}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Group Members List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {km ? `សមាជិកក្រុម (${members.length})` : `Group Members (${members.length})`}
                </h2>
              </div>

              <div className="flex flex-col gap-2.5">
                {members.map((mem) => (
                  <div
                    key={mem.id}
                    className="flex items-center gap-3.5 rounded-[20px] border border-gray-100 bg-white px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {mem.avatarType === "mask" ? (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dff3ec] text-[#1b5e4c]">
                        <MaskIcon className="size-5" />
                      </div>
                    ) : (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e3f4ef] text-[#1b5e4c]">
                        <UserCheck size={18} />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-[#111827]">
                      {mem.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
