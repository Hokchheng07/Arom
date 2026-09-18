import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { TherapistBooking } from "../../../_components/therapist-booking";
import { getBookingDays } from "@/lib/booking";
import { getTherapist } from "@/lib/therapists";

type BookingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const therapist = getTherapist(slug);

  if (!therapist) return {};

  return {
    title: `Book with ${therapist.name}`,
    description: `Book an online or in-person session with ${therapist.name}.`,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;
  const therapist = getTherapist(slug);

  if (!therapist) notFound();

  // Dates depend on the current day, so render per request.
  await connection();
  const days = getBookingDays(new Date());

  return <TherapistBooking therapist={therapist} days={days} />;
}
