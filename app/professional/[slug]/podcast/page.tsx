import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TherapistPodcastPageView } from "@/app/_components/therapist-podcast-page-view";
import { getTherapist, therapists } from "@/lib/therapists";

type PodcastPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return therapists.map((therapist) => ({ slug: therapist.slug }));
}

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const { slug } = await params;
  const therapist = getTherapist(slug);

  if (!therapist || !therapist.podcast) return {};

  return {
    title: `${therapist.podcast.title} · ${therapist.name}`,
    description: therapist.podcast.description,
  };
}

export default async function ProfessionalPodcastPage({ params }: PodcastPageProps) {
  const { slug } = await params;
  const therapist = getTherapist(slug);

  if (!therapist || !therapist.podcast) notFound();

  return <TherapistPodcastPageView therapist={therapist} />;
}
