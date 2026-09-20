import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TherapistDetail } from "../../_components/therapist-detail";
import { getTherapist, therapists } from "@/lib/therapists";

type ProfessionalPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return therapists.map((therapist) => ({ slug: therapist.slug }));
}

export async function generateMetadata({ params }: ProfessionalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const therapist = getTherapist(slug);

  if (!therapist) return {};

  return {
    title: therapist.name,
    description: `${therapist.role} supporting ${therapist.specialties.join(", ")}.`,
  };
}

export default async function ProfessionalProfilePage({ params }: ProfessionalPageProps) {
  const { slug } = await params;
  const therapist = getTherapist(slug);

  if (!therapist) notFound();

  return <TherapistDetail therapist={therapist} />;
}
