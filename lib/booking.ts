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
  /** Khmer date label, e.g. "17 កញ្ញា" */
  kmLabel: string;
  /** Khmer weekday, e.g. "អង្គារ" */
  kmWeekday: string;
  /** Khmer full date label, e.g. "17 កញ្ញា 2026" */
  kmLongLabel: string;
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

export const meetingTypes: {
  type: MeetingType;
  title: string;
  kmTitle: string;
  description: string;
  kmDescription: string;
  image: string;
}[] = [
  {
    type: "Online",
    title: "Online",
    kmTitle: "អនឡាញ (Online)",
    description: "Meet your therapist through a secure, private online session.",
    kmDescription: "ជួបពិគ្រោះជាមួយអ្នកជំនាញតាមរយៈវីដេអូប្រកបដោយសុវត្ថិភាព និងការសម្ងាត់ខ្ពស់។",
    image: "/booking/online-laptop.svg",
  },
  {
    type: "In-person",
    title: "In Person",
    kmTitle: "ជួបផ្ទាល់ (In Person)",
    description: "Visit the therapist at their clinic or hospital.",
    kmDescription: "ជួបពិគ្រោះផ្ទាល់ជាមួយអ្នកជំនាញនៅគ្លីនិក ឬមន្ទីរពេទ្យ។",
    image: "/booking/in-person.svg",
  },
];

export function getPeriodLabel(label: "Morning" | "Afternoon" | "Evening", km: boolean): string {
  if (km) {
    switch (label) {
      case "Morning":
        return "ពេលព្រឹក (Morning)";
      case "Afternoon":
        return "ពេលរសៀល (Afternoon)";
      case "Evening":
        return "ពេលល្ងាច (Evening)";
    }
  }
  return label;
}

export function getMeetingTypeLabel(type: MeetingType | null, km: boolean): string {
  if (!type) return "";
  if (km) {
    return type === "Online" ? "អនឡាញ (Online)" : "ជួបផ្ទាល់ (In Person)";
  }
  return type === "In-person" ? "In Person" : type;
}

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
    const formatEn = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(date);
    const formatKm = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat("km-KH", { timeZone: "UTC", ...options }).format(date);

    return {
      value: date.toISOString().slice(0, 10),
      label: formatEn({ month: "short", day: "numeric" }),
      weekday: formatEn({ weekday: "short" }),
      longLabel: formatEn({ month: "short", day: "numeric", year: "numeric" }),
      kmLabel: formatKm({ month: "short", day: "numeric" }),
      kmWeekday: formatKm({ weekday: "short" }),
      kmLongLabel: formatKm({ month: "short", day: "numeric", year: "numeric" }),
    };
  });
}
