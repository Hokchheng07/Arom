import type { Metadata } from "next";
import { ProfileSettings } from "../_components/profile-settings";

export const metadata: Metadata = {
  title: "Profile & Settings",
  description: "Manage your AROM profile, language preferences, and wellness settings.",
};

export default function ProfilePage() {
  return <ProfileSettings />;
}
