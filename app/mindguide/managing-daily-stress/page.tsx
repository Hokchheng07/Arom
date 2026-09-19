import type { Metadata } from "next";
import { ManagingDailyStress } from "../../_components/managing-daily-stress";

export const metadata: Metadata = {
  title: "Managing Daily Stress",
  description: "Learn what stress is and build healthy habits for managing it.",
};

export default function ManagingDailyStressPage() {
  return <ManagingDailyStress />;
}
