import type { Metadata } from "next";
import { TipsContainer } from "../_components/tips/tips-container";

export const metadata: Metadata = {
  title: "Tips | ARom MindGuide",
  description:
    "Explore practical everyday psychological tips for stress control, sleep, and emotional balance.",
};

export default function TipsPage() {
  return <TipsContainer initialMode="home" />;
}
