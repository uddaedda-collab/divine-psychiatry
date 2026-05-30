"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/primitives/Icons";
import PortalShell, { NavItem } from "@/components/portal/PortalShell";
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Modal,
  Row,
  Select,
  StatCard,
  TextArea,
  Toast,
  fmtDate,
  fmtDateTime
} from "@/components/portal/ui";
import { clinic, daySlots, doctorProfile, serviceLabel } from "@/lib/clinic";
import {
  type Appointment,
  type AppointmentStatus,
  type Medicine,
  type Prescription,
  type User,
  createPrescription,
  ensureSeed,
  getCurrentUser,
  listAppointments,
  listMessageThreads,
  listMessages,
  listPatients,
  listPrescriptions,
  listRecords,
  logout,
  markThreadRead,
  sendMessage,
  unreadCountFor,
  updateAppointment
} from "@/lib/db";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function DoctorPortal() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("overview");
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const refresh = useCallback(() => setTick((t) => t + 1), []);
  const notify = useCallback((m: string) => setToast(m), []);

  useEffect(() => {
    ensureSeed();
    const u = getCurrentUser();
    if (!u || u.role !== "doctor") {
      router.replace("/portal");
      return;
    }
    setUser(u);
    setReady(true);
  }, [router]);

  const appts = useMemo(() => listAppointments(), [tick]);
  const patients = useMemo(() => listPatients(), [tick]);
  const rx = useMemo(() => listPrescriptions(), [tick]);
  const unread = useMemo(() => unreadCountFor("doctor"), [tick]);
  const pending = appts.filter((a) => a.status === "pending").length;

  if (!ready || !user) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="glass-strong rounded-2xl px-6 py-4 text-sm text-white/70">Loading…</div>
      </div>
    );
  }

  const nav: NavItem[] = [
    { id: "overview", label: "Dashboard", icon: "grid" },
    { id: "appointments", label: "Appointments", icon: "calendar", badge: pending },
    { id: "patients", label: "Patients", icon: "users" },
    { id: "prescriptions", label: "Prescriptions", icon: "pill" },
    { id: "schedule", label: "Schedule", icon: "clock" },
    { id: "messages", label: "Messages", icon: "message", badge: unread }
  ];

  const titles: Record<string, { t: string; s: string }> = {
    overview: { t: "Practice dashboard", s: `${doctorProfile.name} · ${clinic.name}` },
    appointments: { t: "Appointments", s: "Confirm, complete or cancel requests" },
    patients: { t: "Patients", s: `${patients.length} registered` },
    prescriptions: { t: "Prescriptions", s: "Issued digital prescriptions" },
    schedule: { t: "Schedule", s: clinic.hoursLabel },
    messages: { t: "Messages", s: "Patient conversations" }
  };

  function doLogout() {
    logout();
    router.replace("/portal");
  }

  return (
    <>
      <PortalShell
        roleLabel="Doctor"
        userName={user.name}
        nav={nav}
        active={active}
        onNavigate={setActive}
        onLogout={doLogout}
        title={titles[active].t}
        subtitle={titles[active].s}
        headerActions={
          <Button variant="primary" onClick={() => setActive("prescriptions")}>
            <Icon name="edit" size={16} /> Write prescription
          </Button>
        }
      >
        {active === "overview" && <Dashboard appts={appts} patients={patients} rxCount={rx.length} onGo={setActive} />}
        {active === "appointments" && (
          <AppointmentsAdmin appts={appts} onChange={(m) => { refresh(); if (m) notify(m); }} />
        )}
        {active === "patients" && (
          <Patients patients={patients} onWriteRx={() => setActive("prescriptions")} />
        )}
        {active === "prescriptions" && (
          <PrescriptionsAdmin rx={rx} patients={patients} onChange={() => { refresh(); notify("Prescription issued."); }} />
        )}
        {active === "schedule" && <Schedule appts={appts} />}
        {active === "messages" && <MessagesAdmin patients={patients} tick={tick} onChange={refresh} />}
      </PortalShell>
      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  );
}

/* ============================== Dashboard ============================== */

function Dashboard({
  appts,
  patients,
  rxCount,
  onGo
}: {
  appts: Appointment[];
  patients: User[];
  rxCount: number;
  onGo: (id: string) => void;
}) {
  const today = todayISO();
  const todays = appts
    .filter((a) => a.date === today && a.status !== "cancelled")
    .sort((a, b) => (a.time < b.time ? -1 : 1));
  const pending = appts.filter((a) => a.status === "pending");

  // last 7 days bar chart
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().slice(0, 10);
    const count = appts.filter((a) => a.date === iso && a.status !== "cancelled").length;
    return { iso, label: d.toLocaleDateString("en-IN", { weekday: "short" }), count };
  });
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="calendar" label="Today's visits" value={todays.length} hint="Today" />
        <StatCard icon="bell" label="Pending requests" value={pending.length} />
        <StatCard icon="users" label="Total patients" value={patients.length} />
        <StatCard icon="pill" label="Prescriptions" value={rxCount} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Appointments · last 7 days" className="lg:col-span-2">
          <div className="flex items-end justify-between gap-2 sm:gap-4 h-44 pt-4">
            {days.map((d) => (
              <div key={d.iso} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-full">
                  <div
                    className="w-7 sm:w-9 rounded-t-lg bg-gradient-to-t from-brand-500/60 to-teal-400/80"
                    style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count ? 8 : 2 }}
                    title={`${d.count} appointments`}
                  />
                </div>
                <span className="text-[11px] text-white/50">{d.label}</span>
                <span className="text-[11px] text-white/70 -mt-1">{d.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Pending requests" action={<Badge tone="pending">{pending.length}</Badge>}>
          {pending.length === 0 ? (
            <p className="text-sm text-white/50 py-6 text-center">No pending requests 🎉</p>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {pending.slice(0, 6).map((a) => (
                <button
                  key={a.id}
                  onClick={() => onGo("appointments")}
                  className="w-full glass-faint rounded-xl p-3 flex items-center gap-3 text-left hover:border-white/20 border border-transparent"
                >
                  <Avatar name={a.patientName} size={34} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-white truncate">{a.patientName}</div>
                    <div className="text-xs text-white/45">{serviceLabel(a.service)} · {fmtDate(a.date)} {a.time}</div>
                  </div>
                  <Icon name="arrow" size={15} />
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Today's schedule" action={<span className="text-sm text-white/50">{fmtDate(today)}</span>}>
        {todays.length === 0 ? (
          <EmptyState icon="calendar" title="No appointments today" hint="Enjoy the calm, or review pending requests." />
        ) : (
          <div className="space-y-2.5">
            {todays.map((a) => (
              <div key={a.id} className="flex items-center gap-3 glass-faint rounded-xl p-3">
                <div className="text-sm text-teal-300 font-display w-14">{a.time}</div>
                <Avatar name={a.patientName} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white truncate">{a.patientName}</div>
                  <div className="text-xs text-white/45">{serviceLabel(a.service)} · {a.mode === "online" ? "Online" : "In-clinic"}</div>
                </div>
                <Badge tone={a.status}>{a.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ============================== Appointments admin ============================== */

const statusFilters: { key: AppointmentStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" }
];

function AppointmentsAdmin({
  appts,
  onChange
}: {
  appts: Appointment[];
  onChange: (msg?: string) => void;
}) {
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");
  const [completing, setCompleting] = useState<Appointment | null>(null);
  const [note, setNote] = useState("");

  const list = filter === "all" ? appts : appts.filter((a) => a.status === filter);

  function setStatus(a: Appointment, status: AppointmentStatus) {
    updateAppointment(a.id, { status });
    onChange(`Appointment ${status}.`);
  }

  function finishComplete() {
    if (!completing) return;
    updateAppointment(completing.id, { status: "completed", notes: note });
    setCompleting(null);
    setNote("");
    onChange("Appointment completed.");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs transition border ${
              filter === f.key ? "btn-primary !rounded-full border-transparent" : "glass-faint text-white/60 hover:text-white border-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState icon="calendar" title="Nothing here" hint="No appointments match this filter." />
      ) : (
        <div className="space-y-3">
          {list.map((a) => (
            <Card key={a.id} className="!p-0">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <Avatar name={a.patientName} size={44} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-white">{a.patientName}</h4>
                    <Badge tone={a.status}>{a.status}</Badge>
                  </div>
                  <div className="text-sm text-white/55 mt-1">
                    {serviceLabel(a.service)} · {fmtDate(a.date)} at {a.time} · {a.mode === "online" ? "Online" : "In-clinic"}
                  </div>
                  {a.reason && <p className="text-sm text-white/60 mt-1.5">“{a.reason}”</p>}
                  {a.notes && (
                    <div className="mt-2 rounded-xl glass-faint p-3 text-sm text-white/70">
                      <span className="text-teal-300 text-xs uppercase tracking-[0.14em]">Note · </span>{a.notes}
                    </div>
                  )}
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0">
                  {a.status === "pending" && (
                    <>
                      <Button variant="primary" onClick={() => setStatus(a, "confirmed")}>
                        <Icon name="check" size={15} /> Confirm
                      </Button>
                      <Button variant="danger" onClick={() => setStatus(a, "cancelled")}>Decline</Button>
                    </>
                  )}
                  {a.status === "confirmed" && (
                    <>
                      <Button variant="primary" onClick={() => { setCompleting(a); setNote(a.notes ?? ""); }}>
                        <Icon name="check" size={15} /> Complete
                      </Button>
                      <Button variant="danger" onClick={() => setStatus(a, "cancelled")}>Cancel</Button>
                    </>
                  )}
                  {(a.status === "completed" || a.status === "cancelled") && (
                    <span className="text-xs text-white/40 self-center">No actions</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!completing} onClose={() => setCompleting(null)} title="Complete appointment">
        {completing && (
          <div className="space-y-4">
            <div className="glass-faint rounded-xl p-3 text-sm">
              <div className="text-white">{completing.patientName}</div>
              <div className="text-white/50 text-xs mt-0.5">
                {serviceLabel(completing.service)} · {fmtDate(completing.date)} {completing.time}
              </div>
            </div>
            <TextArea
              label="Clinical note (visible to patient)"
              name="note"
              value={note}
              onChange={setNote}
              rows={5}
              placeholder="Assessment, plan, next steps…"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setCompleting(null)}>Cancel</Button>
              <Button variant="primary" onClick={finishComplete}>Mark completed</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ============================== Patients ============================== */

function Patients({ patients, onWriteRx }: { patients: User[]; onWriteRx: () => void }) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.email.toLowerCase().includes(q.toLowerCase()) ||
      p.phone.includes(q)
  );

  return (
    <div className="space-y-4">
      <div className="glass-faint rounded-2xl px-4 py-2.5 flex items-center gap-3 max-w-md">
        <Icon name="search" size={18} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patients…"
          className="bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none flex-1"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="users" title="No patients found" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <button key={p.id} onClick={() => setSelected(p)} className="glass glass-shine rounded-2xl p-5 text-left hover:border-white/20 border border-transparent transition">
              <div className="flex items-center gap-3">
                <Avatar name={p.name} size={46} />
                <div className="min-w-0">
                  <div className="text-white truncate">{p.name}</div>
                  <div className="text-xs text-white/45 truncate">{p.phone}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <span>{p.gender || "—"}{p.bloodGroup ? ` · ${p.bloodGroup}` : ""}</span>
                <span className="inline-flex items-center gap-1 text-teal-300">View <Icon name="arrow" size={13} /></span>
              </div>
            </button>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Patient profile" wide>
        {selected && <PatientDetail patient={selected} onWriteRx={() => { setSelected(null); onWriteRx(); }} />}
      </Modal>
    </div>
  );
}

function PatientDetail({ patient, onWriteRx }: { patient: User; onWriteRx: () => void }) {
  const appts = listAppointments({ patientId: patient.id });
  const rx = listPrescriptions({ patientId: patient.id });
  const recs = listRecords({ patientId: patient.id });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <Avatar name={patient.name} size={56} tone="from-brand-400 to-teal-400" />
        <div>
          <div className="text-lg text-white">{patient.name}</div>
          <div className="text-sm text-white/50">{patient.email} · {patient.phone}</div>
        </div>
        <Button variant="primary" className="ml-auto" onClick={onWriteRx}>
          <Icon name="edit" size={15} /> Prescribe
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-faint rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/45 mb-2">Details</div>
          <Row label="DOB" value={patient.dob ? fmtDate(patient.dob) : "—"} />
          <Row label="Gender" value={patient.gender || "—"} />
          <Row label="Blood group" value={patient.bloodGroup || "—"} />
          <Row label="Allergies" value={patient.allergies || "—"} />
          <Row label="Emergency" value={patient.emergencyContact || "—"} />
          <Row label="Address" value={patient.address || "—"} />
        </div>
        <div className="glass-faint rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/45 mb-2">Activity</div>
          <Row label="Appointments" value={appts.length} />
          <Row label="Prescriptions" value={rx.length} />
          <Row label="Records" value={recs.length} />
          <Row label="Last visit" value={appts.find((a) => a.status === "completed") ? fmtDate(appts.find((a) => a.status === "completed")!.date) : "—"} />
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-white/45 mb-2">Recent appointments</div>
        {appts.length === 0 ? (
          <p className="text-sm text-white/45">None yet.</p>
        ) : (
          <div className="space-y-2">
            {appts.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center gap-3 text-sm glass-faint rounded-xl p-3">
                <span className="text-teal-300 w-12 font-display">{a.time}</span>
                <span className="flex-1 text-white/80">{serviceLabel(a.service)} · {fmtDate(a.date)}</span>
                <Badge tone={a.status}>{a.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================== Prescriptions admin ============================== */

const emptyMed = (): Medicine => ({ name: "", dosage: "", frequency: "", duration: "" });

function PrescriptionsAdmin({
  rx,
  patients,
  onChange
}: {
  rx: Prescription[];
  patients: User[];
  onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "");
  const [diagnosis, setDiagnosis] = useState("");
  const [meds, setMeds] = useState<Medicine[]>([emptyMed()]);
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function reset() {
    setPatientId(patients[0]?.id ?? "");
    setDiagnosis("");
    setMeds([emptyMed()]);
    setAdvice("");
    setFollowUp("");
    setErr(null);
  }

  function setMed(i: number, key: keyof Medicine, v: string) {
    setMeds((arr) => arr.map((m, idx) => (idx === i ? { ...m, [key]: v } : m)));
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return setErr("Please select a patient.");
    if (!diagnosis.trim()) return setErr("Please enter a diagnosis.");
    const cleanMeds = meds.filter((m) => m.name.trim());
    if (cleanMeds.length === 0) return setErr("Add at least one medicine.");
    createPrescription({
      patientId: patient.id,
      patientName: patient.name,
      date: todayISO(),
      diagnosis,
      medicines: cleanMeds,
      advice,
      followUp: followUp || undefined,
      doctor: doctorProfile.name
    });
    setOpen(false);
    reset();
    onChange();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => { reset(); setOpen(true); }}>
          <Icon name="plus" size={16} /> New prescription
        </Button>
      </div>

      {rx.length === 0 ? (
        <EmptyState icon="pill" title="No prescriptions yet" hint="Issue a digital prescription to a patient." />
      ) : (
        <div className="space-y-3">
          {rx.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <Avatar name={r.patientName} size={40} />
                  <div>
                    <div className="text-white">{r.patientName}</div>
                    <div className="text-xs text-white/45">{r.diagnosis} · {fmtDate(r.date)}</div>
                  </div>
                </div>
                <Badge tone="teal">{r.medicines.length} medicine{r.medicines.length > 1 ? "s" : ""}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.medicines.map((m, i) => (
                  <span key={i} className="chip">
                    <Icon name="pill" size={13} /> {m.name} · {m.dosage}
                  </span>
                ))}
              </div>
              {r.followUp && <p className="mt-3 text-xs text-white/50">Follow-up: {fmtDate(r.followUp)}</p>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Write prescription" wide>
        <form onSubmit={save} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <Select
              label="Patient"
              name="patient"
              value={patientId}
              onChange={setPatientId}
              options={patients.map((p) => ({ value: p.id, label: p.name }))}
            />
            <Field label="Diagnosis" name="diagnosis" value={diagnosis} onChange={setDiagnosis} placeholder="e.g. GAD (moderate)" required />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Medicines</span>
              <button type="button" onClick={() => setMeds((m) => [...m, emptyMed()])} className="text-xs text-teal-300 inline-flex items-center gap-1">
                <Icon name="plus" size={14} /> Add row
              </button>
            </div>
            <div className="space-y-2">
              {meds.map((m, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <input value={m.name} onChange={(e) => setMed(i, "name", e.target.value)} placeholder="Medicine" className="col-span-4 glass-faint rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none" />
                  <input value={m.dosage} onChange={(e) => setMed(i, "dosage", e.target.value)} placeholder="Dosage" className="col-span-2 glass-faint rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none" />
                  <input value={m.frequency} onChange={(e) => setMed(i, "frequency", e.target.value)} placeholder="Frequency" className="col-span-3 glass-faint rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none" />
                  <input value={m.duration} onChange={(e) => setMed(i, "duration", e.target.value)} placeholder="Duration" className="col-span-2 glass-faint rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none" />
                  <button type="button" onClick={() => setMeds((arr) => (arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr))} className="col-span-1 text-white/40 hover:text-rose-300 flex justify-center" aria-label="Remove">
                    <Icon name="x" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <TextArea label="Advice" name="advice" value={advice} onChange={setAdvice} placeholder="Lifestyle advice, cautions…" />
          <Field label="Follow-up date (optional)" name="followUp" type="date" value={followUp} onChange={setFollowUp} />

          {err && <div className="rounded-xl border border-rose-300/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{err}</div>}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Issue prescription</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================== Schedule ============================== */

function Schedule({ appts }: { appts: Appointment[] }) {
  const [date, setDate] = useState(todayISO());
  const slots = daySlots();
  const dayAppts = appts.filter((a) => a.date === date && a.status !== "cancelled");
  const byTime = new Map(dayAppts.map((a) => [a.time, a]));
  const d = new Date(date + "T00:00:00");
  const closed = !clinic.workingDays.includes(d.getDay());

  function shift(days: number) {
    const nd = new Date(date + "T00:00:00");
    nd.setDate(nd.getDate() + days);
    setDate(nd.toISOString().slice(0, 10));
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => shift(-1)}><Icon name="arrow" size={15} /> Prev</Button>
          <div className="text-center">
            <div className="text-white font-display text-lg">
              {d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <div className="text-xs text-white/45">{closed ? "Clinic closed" : `${dayAppts.length} booked · ${clinic.hoursLabel}`}</div>
          </div>
          <Button variant="ghost" onClick={() => shift(1)}>Next <Icon name="arrow" size={15} /></Button>
        </div>
      </Card>

      {closed ? (
        <EmptyState icon="clock" title="Clinic closed on this day" hint="Working days are Monday to Saturday." />
      ) : (
        <Card title="Day timeline">
          <div className="grid sm:grid-cols-2 gap-2">
            {slots.map((s) => {
              const a = byTime.get(s);
              return (
                <div key={s} className={`rounded-xl p-3 flex items-center gap-3 border ${a ? "glass border-white/10" : "glass-faint border-transparent"}`}>
                  <span className={`font-display text-sm w-14 ${a ? "text-teal-300" : "text-white/40"}`}>{s}</span>
                  {a ? (
                    <div className="min-w-0 flex-1 flex items-center gap-2">
                      <Avatar name={a.patientName} size={28} />
                      <span className="text-sm text-white/85 truncate flex-1">{a.patientName}</span>
                      <Badge tone={a.status}>{a.status}</Badge>
                    </div>
                  ) : (
                    <span className="text-xs text-white/35">Available</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================== Messages admin ============================== */

function MessagesAdmin({
  patients,
  tick,
  onChange
}: {
  patients: User[];
  tick: number;
  onChange: () => void;
}) {
  const threads = useMemo(() => listMessageThreads(), [tick]);
  const [activeId, setActiveId] = useState<string | null>(threads[0]?.patientId ?? null);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const msgs = useMemo(() => (activeId ? listMessages(activeId) : []), [activeId, tick]);
  const activePatient = patients.find((p) => p.id === activeId);

  useEffect(() => {
    if (activeId) {
      markThreadRead(activeId, "doctor");
      onChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs.length]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !activeId) return;
    sendMessage(activeId, "doctor", text);
    setText("");
    onChange();
  }

  if (threads.length === 0) {
    return <EmptyState icon="message" title="No conversations yet" hint="Patient messages will appear here." />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="!p-0 lg:col-span-1 overflow-hidden">
        <div className="p-4 border-b border-white/8 text-[11px] uppercase tracking-[0.14em] text-white/45">Conversations</div>
        <div className="max-h-[60vh] overflow-y-auto">
          {threads.map((t) => {
            const p = patients.find((x) => x.id === t.patientId);
            return (
              <button
                key={t.patientId}
                onClick={() => setActiveId(t.patientId)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left border-l-2 transition ${
                  activeId === t.patientId ? "border-teal-400 bg-white/5" : "border-transparent hover:bg-white/5"
                }`}
              >
                <Avatar name={p?.name ?? "Patient"} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-white truncate">{p?.name ?? "Patient"}</div>
                  <div className="text-xs text-white/45 truncate">{t.last.text}</div>
                </div>
                {!t.last.read && t.last.from === "patient" && <span className="w-2 h-2 rounded-full bg-teal-400" />}
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="!p-0 lg:col-span-2 overflow-hidden flex flex-col">
        {activePatient ? (
          <>
            <div className="px-5 py-4 border-b border-white/8 flex items-center gap-3">
              <Avatar name={activePatient.name} size={38} />
              <div>
                <div className="text-white text-sm">{activePatient.name}</div>
                <div className="text-xs text-white/45">{activePatient.phone}</div>
              </div>
            </div>
            <div className="p-5 space-y-3 h-[46vh] overflow-y-auto">
              {msgs.map((m) => {
                const mine = m.from === "doctor";
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${mine ? "btn-primary !rounded-2xl" : "glass-faint text-white/85"}`}>
                      <p className={mine ? "text-ink-950" : ""}>{m.text}</p>
                      <div className={`mt-1 text-[10px] ${mine ? "text-ink-950/60" : "text-white/40"}`}>{fmtDateTime(m.at)}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>
            <form onSubmit={send} className="p-3 border-t border-white/8 flex items-center gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Reply to patient…"
                className="flex-1 glass-faint rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30"
              />
              <button type="submit" className="btn btn-primary !px-4 !py-3" aria-label="Send">
                <Icon name="send" size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-white/45">Select a conversation</div>
        )}
      </Card>
    </div>
  );
}
