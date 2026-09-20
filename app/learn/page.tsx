import type { Metadata } from "next";
import { LearnContainer } from "../_components/learn/learn-container";

export const metadata: Metadata = {
  title: "Learn | ARom MindGuide",
  description:
    "Understand your mind, one step at a time. Explore evidence-based mental health topics, interactive lessons, and stress recovery tools.",
};

export default function LearnPage() {
  return <LearnContainer initialMode="home" />;
}
