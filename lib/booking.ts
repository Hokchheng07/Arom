export type MeetingType = "Online" | "In-person";

export type BookingDay = {
  /** Calendar date in YYYY-MM-DD, in the clinic time zone. */
  value: string;
  /** e.g. "Sep 17" */
  label: string;
  /** e.g. "Tue" */
  weekday: string;
  /** e.g. "Sep 17, 2026" */
  longLabel: string;
};

export type TimePeriod = {
  label: "Morning" | "Afternoon" | "Evening";
  times: string[];
};

export const clinicTimeZone = "Asia/Phnom_Penh";

export const timePeriods: TimePeriod[] = [
  { label: "Morning", times: ["9:00 AM", "10:00 AM", "11:00 AM"] },
  { label: "Afternoon", times: ["2:00 PM", "3:30 PM"] },
  { label: "Evening", times: ["6:00 PM", "7:30 PM"] },
];

export const meetingTypes: { type: MeetingType; title: string; description: string; image: string }[] = [
  {
    type: "Online",
    title: "Online",
    description: "Meet your therapist through a secure, private online session.",
    image: "/booking/online-laptop.svg",
  },
  {
    type: "In-person",
    title: "In Person",
    description: "Visit the therapist at their clinic or hospital.",
    image: "/booking/in-person.svg",
  },
];

/** Builds the next `count` bookable days, starting tomorrow in the clinic time zone. */
export function getBookingDays(now: Date, count = 5): BookingDay[] {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: clinicTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const today = Date.UTC(get("year"), get("month") - 1, get("day"));

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today + (index + 1) * 24 * 60 * 60 * 1000);
    const format = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(date);

    return {
      value: date.toISOString().slice(0, 10),
      label: format({ month: "short", day: "numeric" }),
      weekday: format({ weekday: "short" }),
      longLabel: format({ month: "short", day: "numeric", year: "numeric" }),
    };
  });
}
