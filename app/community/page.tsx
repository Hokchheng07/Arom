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
  const [selectedGroupId, setSelectedGroupId] = useState("stress-burnout");
  const [groups, setGroups] = useState<SupportGroup[]>(INITIAL_GROUPS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
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
    setSelectedGroupId(groupId);
    const grp = groups.find((g) => g.id === groupId);
    if (grp?.isJoined) {
      setView("group-hub");
    } else {
      setView("group-detail");
    }
  }

  function handleJoinGroup(groupId: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, isJoined: true, membersCount: Math.min(g.maxMembers, g.membersCount + 1) }
          : g
      )
    );
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

  function handleSendMessage(text: string) {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      groupId: selectedGroupId,
      senderName: "Anonymous (You)",
      isAnonymous: true,
      text,
      time: "Just now",
      avatarType: "mask",
    };
    setMessages((prev) => [...prev, newMsg]);
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
    setMessages((prev) => [...prev, newMsg]);
    setView("group-hub");
  }

  return (
    <div className="min-h-screen bg-[#f7faf9] text-[#14221f] lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* Desktop Sidebar Navigation */}
      <DesktopNavigation active="Community" />

      {/* Main Content Area */}
      <div className="min-w-0 pb-20 lg:pb-12">
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
              onBack={() => setView("home")}
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

      {/* Figma Bottom Navigation (Mobile/Tablet) */}
      <div className="lg:hidden">
        <BottomNav
          activeTab="Community"
          onOpenDetection={() => setIsDetectionOpen(true)}
        />
      </div>

      {/* Detection Modal */}
      <DetectionModal
        isOpen={isDetectionOpen}
        onClose={() => setIsDetectionOpen(false)}
      />
    </div>
  );
}
