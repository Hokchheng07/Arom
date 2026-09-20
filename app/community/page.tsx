"use client";

import { useState } from "react";
import { DesktopNavigation } from "../_components/app-navigation";
import { BottomNav } from "../components/bottom-nav";
import { DetectionModal } from "../components/detection-modal";
import { CommunityHomeView } from "./components/community-home-view";
import { AllGroupsView } from "./components/all-groups-view";
import { GroupDetailView } from "./components/group-detail-view";
import { JoinedSuccessModal } from "./components/joined-success-modal";
import { GroupHubView } from "./components/group-hub-view";
import { CreatePostModal } from "./components/create-post-modal";
import { CommunityMenuModal } from "./components/community-menu-modal";
import {
  INITIAL_GROUPS,
  INITIAL_MESSAGES,
  INITIAL_ACTIVITIES,
  INITIAL_MEMBERS,
  SupportGroup,
  ChatMessage,
  GroupActivity,
  GroupMember,
} from "./community-data";

type CommunityView =
  | "home"
  | "all-groups"
  | "group-detail"
  | "joined-success"
  | "group-hub"
  | "create-post"
  | "menu";

export default function CommunityPage() {
  const [view, setView] = useState<CommunityView>("home");
  const [previousView, setPreviousView] = useState<CommunityView>("home");
  const [selectedGroupId, setSelectedGroupId] = useState("stress-burnout");

  // Groups state with localStorage persistence
  const [groups, setGroups] = useState<SupportGroup[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("arom_community_groups");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Merge with INITIAL_GROUPS so new groups like depression-support and updated rules are loaded
            const merged = INITIAL_GROUPS.map((initial) => {
              const existing = parsed.find((p: SupportGroup) => p.id === initial.id);
              if (!existing) return initial;
              return {
                ...initial,
                isJoined: existing.isJoined,
                membersCount: existing.membersCount ?? initial.membersCount,
              };
            });
            return merged;
          }
        }
      } catch {
        // ignore
      }
    }
    return INITIAL_GROUPS;
  });

  // Messages state with localStorage persistence
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("arom_community_messages");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return INITIAL_MESSAGES;
  });

  const [activities, setActivities] = useState<GroupActivity[]>(INITIAL_ACTIVITIES);
  const [members, setMembers] = useState<GroupMember[]>(INITIAL_MEMBERS);
  const [isDetectionOpen, setIsDetectionOpen] = useState(false);

  const activeGroup =
    groups.find((g) => g.id === selectedGroupId) || groups[0];
  const myGroup =
    groups.find((g) => g.isJoined) || groups[0];
  const recommendedGroup =
    groups.find((g) => g.id === "academic-stress") || groups[1] || groups[0];

  function handleSelectGroup(groupId: string) {
    setPreviousView(view === "group-detail" ? "home" : view);
    setSelectedGroupId(groupId);
    // As requested: user will read information about what this group is first, and touch join
    setView("group-detail");
  }

  function handleJoinGroup(groupId: string) {
    setGroups((prev) => {
      const updated = prev.map((g) =>
        g.id === groupId
          ? { ...g, isJoined: true, membersCount: Math.min(g.maxMembers, g.membersCount + 1) }
          : g
      );
      try {
        localStorage.setItem("arom_community_groups", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Add current user to members list
    setMembers((prev) => [
      ...prev,
      {
        id: `mem-${Date.now()}`,
        groupId,
        name: "Anonymous (You)",
        isAnonymous: true,
        avatarType: "mask",
      },
    ]);
    setView("joined-success");
  }

  function handleSendMessage(text: string, targetGroupId?: string) {
    const gid = targetGroupId || selectedGroupId || activeGroup.id;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      groupId: gid,
      senderName: "Anonymous (You)",
      isAnonymous: true,
      text,
      time: "Just now",
      avatarType: "mask",
    };
    setMessages((prev) => {
      const updated = [...prev, newMsg];
      try {
        localStorage.setItem("arom_community_messages", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }

  function handleToggleActivityJoin(activityId: string) {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId ? { ...a, isJoined: !a.isJoined } : a
      )
    );
  }

  function handleSubmitPost(groupId: string, text: string, isAnonymous: boolean) {
    setSelectedGroupId(groupId);
    const newMsg: ChatMessage = {
      id: `post-${Date.now()}`,
      groupId,
      senderName: isAnonymous ? "Anonymous (You)" : "Panharith",
      isAnonymous,
      text,
      time: "Just now",
      avatarType: isAnonymous ? "mask" : "user",
    };
    setMessages((prev) => {
      const updated = [...prev, newMsg];
      try {
        localStorage.setItem("arom_community_messages", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    setView("group-hub");
  }

  return (
    <div className="min-h-screen bg-[#f7faf9] text-[#14221f] lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* Desktop Sidebar Navigation */}
      <DesktopNavigation active="Community" />

      {/* Main Content Area */}
      <div className={`min-w-0 ${view === "group-hub" ? "pb-4" : "pb-20 lg:pb-12"}`}>
        <main className="mx-auto w-full max-w-[440px] md:max-w-xl lg:max-w-2xl lg:pt-6">
          {view === "home" && (
            <CommunityHomeView
              myGroup={myGroup}
              recommendedGroup={recommendedGroup}
              onSelectGroup={handleSelectGroup}
              onOpenAllGroups={() => setView("all-groups")}
              onOpenMenu={() => setView("menu")}
            />
          )}

          {view === "all-groups" && (
            <AllGroupsView
              groups={groups}
              onBack={() => setView("home")}
              onSelectGroup={handleSelectGroup}
            />
          )}

          {view === "group-detail" && (
            <GroupDetailView
              group={activeGroup}
              onBack={() => setView(previousView)}
              onJoinGroup={handleJoinGroup}
              onOpenGroupHub={(id) => {
                setSelectedGroupId(id);
                setView("group-hub");
              }}
            />
          )}

          {view === "joined-success" && (
            <JoinedSuccessModal
              group={activeGroup}
              onGoToGroup={(id) => {
                setSelectedGroupId(id);
                setView("group-hub");
              }}
              onExploreMore={() => setView("all-groups")}
              onBack={() => setView("home")}
            />
          )}

          {view === "group-hub" && (
            <GroupHubView
              group={activeGroup}
              messages={messages.filter((m) => m.groupId === selectedGroupId)}
              activities={activities.filter((a) => a.groupId === selectedGroupId)}
              members={members.filter((m) => m.groupId === selectedGroupId)}
              onBack={() => setView("home")}
              onSendMessage={handleSendMessage}
              onToggleActivityJoin={handleToggleActivityJoin}
              onOpenCreatePost={() => setView("create-post")}
            />
          )}

          {view === "create-post" && (
            <CreatePostModal
              groups={groups}
              selectedGroupId={selectedGroupId}
              onBack={() => setView("group-hub")}
              onSubmitPost={handleSubmitPost}
            />
          )}

          {view === "menu" && (
            <CommunityMenuModal
              groups={groups}
              onBack={() => setView("home")}
              onSelectGroup={(id) => {
                setSelectedGroupId(id);
                handleSelectGroup(id);
              }}
              onExploreAll={() => setView("all-groups")}
            />
          )}
        </main>
      </div>

      {/* Figma Bottom Navigation (Mobile/Tablet) - Hidden in Group Hub & Create Post matching Figma Screen 5 */}
      {view !== "group-hub" && view !== "create-post" && (
        <div className="lg:hidden">
          <BottomNav
            activeTab="Community"
            onOpenDetection={() => setIsDetectionOpen(true)}
          />
        </div>
      )}

      {/* Detection Modal */}
      <DetectionModal
        isOpen={isDetectionOpen}
        onClose={() => setIsDetectionOpen(false)}
      />
    </div>
  );
}
