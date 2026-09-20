"use client";

import { MobileNavigation, NavigationLabel } from "../_components/app-navigation";

type BottomNavProps = {
  activeTab?: string;
  onOpenDetection?: () => void;
};

export function BottomNav({ activeTab = "Home", onOpenDetection }: BottomNavProps) {
  let normalizedActive: NavigationLabel = "Home";
  const lower = (activeTab || "").toLowerCase().trim();
  if (lower === "home") normalizedActive = "Home";
  else if (lower === "mindguide") normalizedActive = "MindGuide";
  else if (lower === "detection") normalizedActive = "Detection";
  else if (lower === "professional" || lower === "therapist") normalizedActive = "Professional";
  else if (lower === "community") normalizedActive = "Community";
  else if (lower === "profile") normalizedActive = "Profile";

  return <MobileNavigation active={normalizedActive} onOpenDetection={onOpenDetection} />;
}
