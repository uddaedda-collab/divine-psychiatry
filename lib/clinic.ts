/**
 * Clinic-wide constants shared by the marketing site and the portal app.
 * Editing these updates services, doctor profile and scheduling everywhere.
 */

export type ServiceKey =
  | "depression"
  | "anxiety"
  | "ocd"
  | "bipolar"
  | "sleep"
  | "child"
  | "addiction"
  | "counsel"
  | "geriatric"
  | "longevity"
  | "online";

export type Service = {
  key: ServiceKey;
  label: string;
  blurb: string;
  /** typical consult fee in INR (display only) */
  fee: number;
};

export const services: Service[] = [
  { key: "depression", label: "Depression", blurb: "Low mood, fatigue, loss of interest", fee: 800 },
  { key: "anxiety", label: "Anxiety & Panic", blurb: "Generalised anxiety, panic, social anxiety", fee: 800 },
  { key: "ocd", label: "OCD", blurb: "Obsessive thoughts & compulsions", fee: 900 },
  { key: "bipolar", label: "Bipolar Disorder", blurb: "Mood stabilisation & relapse prevention", fee: 1000 },
  { key: "sleep", label: "Sleep Disorders", blurb: "Insomnia & disrupted rhythms", fee: 700 },
  { key: "child", label: "Child Psychiatry", blurb: "Attention, behaviour, development", fee: 900 },
  { key: "addiction", label: "Addiction Recovery", blurb: "Confidential, family-inclusive care", fee: 1000 },
  { key: "counsel", label: "Counselling", blurb: "Stress, grief, relationships", fee: 700 },
  { key: "geriatric", label: "Geriatric Psychiatry", blurb: "Memory, mood & behaviour in older adults", fee: 900 },
  { key: "longevity", label: "Longevity & Healthy Ageing", blurb: "Brain health & preventive wellness", fee: 1200 },
  { key: "online", label: "Online / Global Consultation", blurb: "Secure scheduled video session", fee: 1500 }
];

export const serviceLabel = (key: string) =>
  services.find((s) => s.key === key)?.label ?? key;

export const doctorProfile = {
  name: "Dr. Sandeep Sharma",
  title: "Consultant Psychiatrist",
  qualifications: "MBBS, MD (Psychiatry)",
  regNo: "RMC / 2014 / 00000",
  experienceYears: 10,
  languages: ["English", "Hindi", "Punjabi"],
  about:
    "Psychiatrist focused on community mental health, addiction recovery and preventive wellness, with growing interest in longevity and healthy ageing medicine."
};

export const clinic = {
  name: "Divine Psychiatry Clinic",
  addressLine: "Divine Psychiatry Clinic, Civil Lines",
  city: "Sri Ganganagar",
  state: "Rajasthan",
  postalCode: "335001",
  country: "India",
  hoursLabel: "Mon — Sat · 10:00 — 18:00 IST",
  /** Working days: 1 = Mon … 6 = Sat (0 = Sun closed) */
  workingDays: [1, 2, 3, 4, 5, 6],
  openHour: 10,
  closeHour: 18,
  slotMinutes: 30
};

/** Generate consultation slots for the clinic working hours. */
export function daySlots(): string[] {
  const out: string[] = [];
  for (let h = clinic.openHour; h < clinic.closeHour; h++) {
    for (let m = 0; m < 60; m += clinic.slotMinutes) {
      out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return out;
}

export const consultModes = [
  { key: "in-clinic", label: "In-clinic" },
  { key: "online", label: "Online (Video)" }
] as const;
