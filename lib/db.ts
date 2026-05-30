/**
 * Divine Psychiatry — client-side data layer.
 *
 * The marketing site is a static export (GitHub Pages), so the portal runs
 * entirely in the browser. This module is a tiny localStorage-backed "database"
 * with seed data, mock auth and CRUD helpers.
 *
 * NOTE: This is a front-end demo store. Passwords are stored in plain text for
 * demonstration only — do not use this pattern for a real production backend.
 */

export type Role = "patient" | "doctor";

export type User = {
  id: string;
  role: Role;
  name: string;
  email: string;
  phone: string;
  password: string;
  // patient profile extras
  dob?: string;
  gender?: string;
  address?: string;
  bloodGroup?: string;
  allergies?: string;
  emergencyContact?: string;
  createdAt: string;
};

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  service: string; // ServiceKey
  mode: "in-clinic" | "online";
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  reason: string;
  status: AppointmentStatus;
  notes?: string; // clinical notes added by doctor
  createdAt: string;
};

export type Medicine = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export type Prescription = {
  id: string;
  patientId: string;
  patientName: string;
  date: string; // YYYY-MM-DD
  diagnosis: string;
  medicines: Medicine[];
  advice: string;
  followUp?: string;
  doctor: string;
};

export type MedicalRecord = {
  id: string;
  patientId: string;
  title: string;
  type: "Lab Report" | "Clinical Note" | "Scan" | "Other";
  date: string;
  summary: string;
};

export type Message = {
  id: string;
  patientId: string; // thread is per patient
  from: Role;
  text: string;
  at: string; // ISO
  read: boolean;
};

type DB = {
  users: User[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  records: MedicalRecord[];
  messages: Message[];
};

const KEY = "dpc.db.v1";
const SESSION_KEY = "dpc.session.v1";

export const DEMO = {
  doctor: { email: "dr.sandeep@divinepsychiatry.in", password: "divine123" },
  patient: { email: "patient@demo.in", password: "demo1234" }
};

const isBrowser = () => typeof window !== "undefined";

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

function isoDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/* ----------------------------- seed ----------------------------- */

function seed(): DB {
  const doctorId = "user_doctor_sandeep";
  const p1 = "user_patient_aman";
  const p2 = "user_patient_pooja";
  const p3 = "user_patient_ravi";

  const users: User[] = [
    {
      id: doctorId,
      role: "doctor",
      name: "Dr. Sandeep Sharma",
      email: DEMO.doctor.email,
      phone: "+91 94145 25706",
      password: DEMO.doctor.password,
      createdAt: new Date().toISOString()
    },
    {
      id: p1,
      role: "patient",
      name: "Aman Verma",
      email: DEMO.patient.email,
      phone: "+91 90000 11111",
      password: DEMO.patient.password,
      dob: "1995-04-12",
      gender: "Male",
      address: "Ward 7, Sri Ganganagar, Rajasthan",
      bloodGroup: "B+",
      allergies: "None known",
      emergencyContact: "+91 90000 22222",
      createdAt: new Date().toISOString()
    },
    {
      id: p2,
      role: "patient",
      name: "Pooja Sharma",
      email: "pooja@demo.in",
      phone: "+91 90000 33333",
      password: "demo1234",
      dob: "1988-09-03",
      gender: "Female",
      address: "Jawahar Nagar, Sri Ganganagar",
      bloodGroup: "O+",
      allergies: "Sulfa drugs",
      emergencyContact: "+91 90000 44444",
      createdAt: new Date().toISOString()
    },
    {
      id: p3,
      role: "patient",
      name: "Ravi Kumar",
      email: "ravi@demo.in",
      phone: "+91 90000 55555",
      password: "demo1234",
      dob: "1979-01-22",
      gender: "Male",
      address: "Purani Abadi, Sri Ganganagar",
      bloodGroup: "A+",
      allergies: "None known",
      emergencyContact: "+91 90000 66666",
      createdAt: new Date().toISOString()
    }
  ];

  const appointments: Appointment[] = [
    {
      id: uid("apt"),
      patientId: p1,
      patientName: "Aman Verma",
      service: "anxiety",
      mode: "in-clinic",
      date: isoDate(1),
      time: "10:30",
      reason: "Follow-up for anxiety management",
      status: "confirmed",
      createdAt: new Date().toISOString()
    },
    {
      id: uid("apt"),
      patientId: p2,
      patientName: "Pooja Sharma",
      service: "counsel",
      mode: "online",
      date: isoDate(2),
      time: "15:00",
      reason: "Stress and sleep concerns",
      status: "pending",
      createdAt: new Date().toISOString()
    },
    {
      id: uid("apt"),
      patientId: p3,
      patientName: "Ravi Kumar",
      service: "addiction",
      mode: "in-clinic",
      date: isoDate(0),
      time: "11:30",
      reason: "Relapse-prevention review",
      status: "confirmed",
      createdAt: new Date().toISOString()
    },
    {
      id: uid("apt"),
      patientId: p1,
      patientName: "Aman Verma",
      service: "anxiety",
      mode: "in-clinic",
      date: isoDate(-14),
      time: "10:00",
      reason: "Initial assessment",
      status: "completed",
      notes: "GAD-7 elevated. Started low-dose SSRI, sleep hygiene plan, review in 2 weeks.",
      createdAt: new Date().toISOString()
    }
  ];

  const prescriptions: Prescription[] = [
    {
      id: uid("rx"),
      patientId: p1,
      patientName: "Aman Verma",
      date: isoDate(-14),
      diagnosis: "Generalised Anxiety Disorder (moderate)",
      medicines: [
        { name: "Escitalopram", dosage: "10 mg", frequency: "Once daily (morning)", duration: "4 weeks" },
        { name: "Propranolol", dosage: "20 mg", frequency: "As needed before stressful events", duration: "PRN" }
      ],
      advice: "Sleep hygiene, reduce caffeine after 4pm, daily 20-min walk. Avoid alcohol.",
      followUp: isoDate(0),
      doctor: "Dr. Sandeep Sharma"
    }
  ];

  const records: MedicalRecord[] = [
    {
      id: uid("rec"),
      patientId: p1,
      title: "Baseline blood panel (CBC, TSH)",
      type: "Lab Report",
      date: isoDate(-16),
      summary: "Within normal limits. TSH 2.1 mIU/L. No abnormality detected."
    },
    {
      id: uid("rec"),
      patientId: p1,
      title: "Intake clinical note",
      type: "Clinical Note",
      date: isoDate(-14),
      summary: "GAD-7 score 14. Sleep onset insomnia. No suicidal ideation. Good insight."
    }
  ];

  const messages: Message[] = [
    {
      id: uid("msg"),
      patientId: p1,
      from: "patient",
      text: "Doctor, the new medicine is helping but I feel slightly drowsy in the morning. Is that normal?",
      at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      read: true
    },
    {
      id: uid("msg"),
      patientId: p1,
      from: "doctor",
      text: "That can happen in the first week and usually settles. Take it after breakfast and let me know at the follow-up.",
      at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      read: true
    }
  ];

  return { users, appointments, prescriptions, records, messages };
}

/* ----------------------------- storage ----------------------------- */

function read(): DB {
  if (!isBrowser()) return { users: [], appointments: [], prescriptions: [], records: [], messages: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      const seeded = seed();
      window.localStorage.setItem(KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as DB;
  } catch {
    const seeded = seed();
    try {
      window.localStorage.setItem(KEY, JSON.stringify(seeded));
    } catch {
      /* ignore */
    }
    return seeded;
  }
}

function write(db: DB) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(db));
}

export function ensureSeed() {
  read();
}

export function resetDB() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem(SESSION_KEY);
  read();
}

/* ----------------------------- session ----------------------------- */

export function getSessionUserId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  const id = getSessionUserId();
  if (!id) return null;
  return read().users.find((u) => u.id === id) ?? null;
}

export function logout() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export type AuthResult = { ok: true; user: User } | { ok: false; error: string };

export function login(email: string, password: string, role: Role): AuthResult {
  const db = read();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.role === role
  );
  if (!user) return { ok: false, error: `No ${role} account found for that email.` };
  if (user.password !== password) return { ok: false, error: "Incorrect password." };
  window.localStorage.setItem(SESSION_KEY, user.id);
  return { ok: true, user };
}

export function register(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): AuthResult {
  const db = read();
  const exists = db.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase());
  if (exists) return { ok: false, error: "An account with that email already exists." };
  const user: User = {
    id: uid("user"),
    role: "patient",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    password: input.password,
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  write(db);
  window.localStorage.setItem(SESSION_KEY, user.id);
  return { ok: true, user };
}

export function updateUser(id: string, patch: Partial<User>) {
  const db = read();
  const i = db.users.findIndex((u) => u.id === id);
  if (i === -1) return;
  db.users[i] = { ...db.users[i], ...patch, id: db.users[i].id, role: db.users[i].role };
  write(db);
}

/* ----------------------------- queries ----------------------------- */

export function listPatients(): User[] {
  return read().users.filter((u) => u.role === "patient");
}

export function getUser(id: string): User | undefined {
  return read().users.find((u) => u.id === id);
}

export function listAppointments(filter?: { patientId?: string }): Appointment[] {
  let apts = read().appointments;
  if (filter?.patientId) apts = apts.filter((a) => a.patientId === filter.patientId);
  return apts.sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1));
}

export function createAppointment(
  input: Omit<Appointment, "id" | "status" | "createdAt">
): Appointment {
  const db = read();
  const apt: Appointment = {
    ...input,
    id: uid("apt"),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  db.appointments.push(apt);
  write(db);
  return apt;
}

export function updateAppointment(id: string, patch: Partial<Appointment>) {
  const db = read();
  const i = db.appointments.findIndex((a) => a.id === id);
  if (i === -1) return;
  db.appointments[i] = { ...db.appointments[i], ...patch, id };
  write(db);
}

export function isSlotTaken(date: string, time: string, ignoreId?: string): boolean {
  return read().appointments.some(
    (a) =>
      a.date === date &&
      a.time === time &&
      a.id !== ignoreId &&
      a.status !== "cancelled"
  );
}

export function listPrescriptions(filter?: { patientId?: string }): Prescription[] {
  let rx = read().prescriptions;
  if (filter?.patientId) rx = rx.filter((r) => r.patientId === filter.patientId);
  return rx.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function createPrescription(input: Omit<Prescription, "id">): Prescription {
  const db = read();
  const rx: Prescription = { ...input, id: uid("rx") };
  db.prescriptions.push(rx);
  write(db);
  return rx;
}

export function listRecords(filter?: { patientId?: string }): MedicalRecord[] {
  let recs = read().records;
  if (filter?.patientId) recs = recs.filter((r) => r.patientId === filter.patientId);
  return recs.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function createRecord(input: Omit<MedicalRecord, "id">): MedicalRecord {
  const db = read();
  const rec: MedicalRecord = { ...input, id: uid("rec") };
  db.records.push(rec);
  write(db);
  return rec;
}

export function deleteRecord(id: string) {
  const db = read();
  db.records = db.records.filter((r) => r.id !== id);
  write(db);
}

export function listMessages(patientId: string): Message[] {
  return read()
    .messages.filter((m) => m.patientId === patientId)
    .sort((a, b) => (a.at < b.at ? -1 : 1));
}

export function listMessageThreads(): { patientId: string; last: Message }[] {
  const msgs = read().messages;
  const byPatient = new Map<string, Message>();
  for (const m of msgs.sort((a, b) => (a.at < b.at ? -1 : 1))) {
    byPatient.set(m.patientId, m);
  }
  return Array.from(byPatient.entries())
    .map(([patientId, last]) => ({ patientId, last }))
    .sort((a, b) => (a.last.at < b.last.at ? 1 : -1));
}

export function sendMessage(patientId: string, from: Role, text: string): Message {
  const db = read();
  const msg: Message = {
    id: uid("msg"),
    patientId,
    from,
    text: text.trim(),
    at: new Date().toISOString(),
    read: false
  };
  db.messages.push(msg);
  write(db);
  return msg;
}

export function markThreadRead(patientId: string, reader: Role) {
  const db = read();
  let changed = false;
  for (const m of db.messages) {
    if (m.patientId === patientId && m.from !== reader && !m.read) {
      m.read = true;
      changed = true;
    }
  }
  if (changed) write(db);
}

export function unreadCountFor(reader: Role, patientId?: string): number {
  return read().messages.filter(
    (m) => m.from !== reader && !m.read && (!patientId || m.patientId === patientId)
  ).length;
}
