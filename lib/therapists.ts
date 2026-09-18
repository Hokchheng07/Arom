export type SessionOption = "Online" | "In-person" | "Both";

export type Therapist = {
  slug: string;
  name: string;
  role: string;
  specialties: string[];
  availability: string;
  image: string;
  imagePosition?: string;
  experience: string;
  rating: number;
  reviews: number;
  about: string;
  languages: string[];
  sessionOptions: SessionOption[];
};

export const supportAreas = [
  "Anxiety",
  "Depression",
  "Stress",
  "Sleep",
  "Relationships",
  "Burnout",
  "Life transitions",
  "Self-confidence",
  "Other",
] as const;

export const filterLanguages = ["English", "Khmer"] as const;

export type SessionFilter = "Online" | "In-person" | "Both";

export type TherapistFilters = {
  areas: string[];
  session: SessionFilter | null;
  availableNow: boolean;
  languages: string[];
};

export const emptyFilters: TherapistFilters = {
  areas: [],
  session: null,
  availableNow: false,
  languages: [],
};

export function countActiveFilters(filters: TherapistFilters) {
  return (
    filters.areas.length +
    (filters.session ? 1 : 0) +
    (filters.availableNow ? 1 : 0) +
    filters.languages.length
  );
}

const knownAreas: readonly string[] = supportAreas.filter((area) => area !== "Other");

export function matchesFilters(therapist: Therapist, filters: TherapistFilters) {
  if (filters.areas.length > 0) {
    const matchesArea = filters.areas.some((area) =>
      area === "Other"
        ? therapist.specialties.some((specialty) => !knownAreas.includes(specialty))
        : therapist.specialties.includes(area),
    );
    if (!matchesArea) return false;
  }

  if (filters.session) {
    const offersOnline = therapist.sessionOptions.includes("Online");
    const offersInPerson = therapist.sessionOptions.includes("In-person");
    if (filters.session === "Online" && !offersOnline) return false;
    if (filters.session === "In-person" && !offersInPerson) return false;
    if (filters.session === "Both" && !(offersOnline && offersInPerson)) return false;
  }

  if (filters.availableNow && therapist.availability !== "Available Now") return false;

  if (filters.languages.length > 0) {
    const speaksAll = filters.languages.every((language) => therapist.languages.includes(language));
    if (!speaksAll) return false;
  }

  return true;
}

export const therapists: Therapist[] = [
  {
    slug: "sopheap-chan",
    name: "Dr. Sopheap Chan",
    role: "Clinical Psychologist",
    specialties: ["Depression", "Anxiety", "Stress"],
    availability: "Available Now",
    image: "/therapists/sopheap-chan.jpg",
    imagePosition: "58% center",
    experience: "8+ years of experience",
    rating: 4.9,
    reviews: 127,
    about:
      "Dr. Chan has spent over eight years helping clients work through anxiety, depression, and everyday stress using an integrative, client-centered approach.",
    languages: ["Khmer", "English"],
    sessionOptions: ["Online", "In-person", "Both"],
  },
  {
    slug: "ratanak-pich",
    name: "Dr. Ratanak Pich",
    role: "Counselor",
    specialties: ["Anxiety", "Relationships", "Life transitions"],
    availability: "Available Today",
    image: "/therapists/ratanak-pich.jpg",
    imagePosition: "50% center",
    experience: "6+ years of experience",
    rating: 4.8,
    reviews: 94,
    about:
      "Dr. Pich supports individuals and couples navigating anxiety, communication challenges, and major life transitions with practical, compassionate counseling.",
    languages: ["Khmer", "English", "French"],
    sessionOptions: ["Online", "In-person", "Both"],
  },
  {
    slug: "malika-sok",
    name: "Dr. Malika Sok",
    role: "Psychiatrist",
    specialties: ["Sleep", "Burnout", "Stress", "Self-confidence"],
    availability: "Available Tomorrow",
    image: "/therapists/malika-sok.jpg",
    imagePosition: "50% center",
    experience: "9+ years of experience",
    rating: 4.9,
    reviews: 108,
    about:
      "Dr. Sok works with adults experiencing sleep difficulties, burnout, and chronic stress, combining careful assessment with clear, collaborative treatment plans.",
    languages: ["Khmer", "English"],
    sessionOptions: ["Online", "In-person"],
  },
];

export function getTherapist(slug: string) {
  return therapists.find((therapist) => therapist.slug === slug);
}
