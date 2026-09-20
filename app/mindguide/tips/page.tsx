import type { Metadata } from "next";
import { TipsContainer } from "../../_components/tips/tips-container";

export const metadata: Metadata = {
  title: "MindGuide Tips | ARom",
  description:
    "Explore practical everyday psychological tips for stress control, sleep, and emotional balance.",
};

export default function MindGuideTipsPage() {
  return <TipsContainer initialMode="home" />;
}
