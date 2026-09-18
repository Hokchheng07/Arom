import type { Metadata } from "next";
import { TherapistDirectory } from "../_components/therapist-directory";

export const metadata: Metadata = {
  title: "Find a therapist",
  description: "Find professional mental health support through AROM.",
};

export default function TherapistPage() {
  return <TherapistDirectory />;
}
