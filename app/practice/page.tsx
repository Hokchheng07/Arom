import type { Metadata } from "next";
import { PracticeContainer } from "../_components/practice/practice-container";

export const metadata: Metadata = {
  title: "Practice | ARom MindGuide",
  description:
    "Calm your mind and body through guided exercises, interactive breathing, and grounding sessions.",
};

export default function PracticePage() {
  return <PracticeContainer initialMode="home" />;
}
