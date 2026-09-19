import type { Metadata } from "next";
import { MindGuideHome } from "../_components/mindguide-home";

export const metadata: Metadata = {
  title: "MindGuide",
  description: "Learn, practice, and take care of your mind with AROM.",
};

export default function MindGuidePage() {
  return <MindGuideHome />;
}
