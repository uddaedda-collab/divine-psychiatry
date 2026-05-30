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
import { clinic, consultModes, daySlots, services, serviceLabel } from "@/lib/clinic";
import {
  type Appointment,
  type MedicalRecord,
  type Message,
  type Prescription,
  type User,
  createAppointment,
  createRecord,
  deleteRecord,
  ensureSeed,
  getCurrentUser,
  isSlotTaken,
  listAppointments,
  listMessages,
  listPrescriptions,
  listRecords,
  logout,
  markThreadRead,
  sendMessage,
  unreadCountFor,
  updateAppointment,
  updateUser
} from "@/lib/db";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function PatientPortal() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("overview");
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    ensureSeed();
    const u = getCurrentUser();
    if (!u || u.role !== "patient") {
      router.replace("/portal");
      return;
    }
    setUser(u);
    setReady(true);
  }, [router]);

  // re-read user when profile changes
  useEffect(() => {
    if (ready) setUser(getCurrentUser());
  }, [tick, ready]);

  const appts = useMemo(
    () => (user ? listAppointments({ patientId: user.id }) : []),
    [user, tick]
  );
  const rx = useMemo(() => (user ? listPrescriptions({ patientId: user.id }) : []), [user, tick]);
  const records = useMemo(() => (user ? listRecords({ patientId: user.id }) : []), [user, tick]);
  const unread = useMemo(() => (user ? unreadCountFor("patient", user.id) : 0), [user, tick]);

  if (!ready || !user) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="glass-strong rounded-2xl px-6 py-4 text-sm text-white/70">Loading…</div>
      </div>
    );
  }

  const upcoming = appts.filter(
    (a) => (a.status === "confirmed" || a.status === "pending") && a.date >= todayISO()
  );

  const nav: NavItem[] = [
    { id: "overview", label: "Dashboard", icon: "grid" },
    { id: "book", label: "Book appointment", icon: "calendar" },
    { id: "appointments", label: "My appointments", icon: "clipboard" },
    { id: "prescriptions", label: "Prescriptions", icon: "pill" },
    { id: "records", label: "Medical records", icon: "file" },
    { id: "messages", label: "Messages", icon: "message", badge: unread },
    { id: "profile", label: "Profile", icon: "user" }
  ];

  const titles: Record<string, { t: string; s: string }> = {
    overview: { t: `Hello, ${user.name.split(" ")[0]}`, s: "Here's a snapshot of your care" },
    book: { t: "Book an appointment", s: `${clinic.name} · ${clinic.hoursLabel}` },
    appointments: { t: "My appointments", s: "Upcoming and past visits" },
    prescriptions: { t: "Prescriptions", s: "Issued by your doctor" },
    records: { t: "Medical records", s: "Reports, notes & documents" },
    messages: { t: "Messages", s: "Secure chat with the clinic" },
    profile: { t: "My profile", s: "Personal & medical details" }
  };

  function doLogout() {
    logout();
    router.replace("/portal");
  }

  return (
    <>
      <PortalShell
        roleLabel="Patient"
        userName={user.name}
        nav={nav}
        active={active}
        onNavigate={setActive}
        onLogout={doLogout}
        title={titles[active].t}
        subtitle={titles[active].s}
        headerActions={
          active !== "book" ? (
            <Button variant="primary" onClick={() => setActive("book")}>
              <Icon name="plus" size={16} /> New appointment
            </Button>
          ) : undefined
        }
      >
        {active === "overview" && (
          <Overview
            user={user}
            upcoming={upcoming}
            rxCount={rx.length}
            unread={unread}
            onGo={setActive}
          />
        )}
        {active === "book" && (
          <BookAppointment
            user={user}
            onBooked={() => {
              refresh();
              setToast("Appointment request sent — pending confirmation.");
              setActive("appointments");
            }}
          />
        )}
        {active === "appointments" && (
          <Appointments appts={appts} onChange={() => { refresh(); setToast("Appointment updated."); }} />
        )}
        {active === "prescriptions" && <Prescriptions rx={rx} />}
        {active === "records" && (
          <Records
            records={records}
            patientId={user.id}
            onChange={() => { refresh(); setToast("Records updated."); }}
          />
        )}
        {active === "messages" && <Messages user={user} tick={tick} onChange={refresh} />}
        {active === "profile" && (
          <Profile user={user} onSaved={() => { refresh(); setToast("Profile saved."); }} />
        )}
      </PortalShell>
      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  );
}

/* ============================== Overview ============================== */

function Overview({
  user,
  upcoming,
  rxCount,
  unread,
  onGo
}: {
  user: User;
  upcoming: Appointment[];
  rxCount: number;
  unread: number;
  onGo: (id: string) => void;
}) {
  const next = upcoming[upcoming.length - 1];
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="calendar" label="Upcoming visits" value={upcoming.length} />
        <StatCard icon="pill" label="Prescriptions" value={rxCount} />
        <StatCard icon="message" label="Unread messages" value={unread} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Next appointment" className="lg:col-span-2">
          {next ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="glass-faint rounded-2xl p-4 text-center min-w-[110px]">
                <div className="font-display text-3xl text-gradient-cool">
                  {new Date(next.date + "T00:00:00").getDate()}
                </div>
                <div className="text-xs text-white/55 uppercase tracking-[0.15em]">
                  {new Date(next.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" })}
                </div>
                <div className="mt-1 text-sm text-white/80">{next.time}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white text-lg">{serviceLabel(next.service)}</h4>
                  <Badge tone={next.status}>{next.status}</Badge>
                </div>
                <p className="text-sm text-white/60 mt-1">{next.reason || "General consultation"}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="chip"><Icon name="pin" size={13} /> {next.mode === "online" ? "Online video" : "In-clinic"}</span>
                  <span className="chip"><Icon name="clock" size={13} /> {fmtDate(next.date)} · {next.time}</span>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon="calendar"
              title="No upcoming appointments"
              hint="Book a consultation with the clinic in a few taps."
              action={<Button variant="primary" onClick={() => onGo("book")}><Icon name="plus" size={16} /> Book now</Button>}
            />
          )}
        </Card>

        <Card title="Quick actions">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "book", icon: "calendar", t: "Book" },
              { id: "prescriptions", icon: "pill", t: "Rx" },
              { id: "records", icon: "file", t: "Records" },
              { id: "messages", icon: "message", t: "Message" }
            ].map((q) => (
              <button
                key={q.id}
                onClick={() => onGo(q.id)}
                className="glass-faint rounded-2xl p-4 text-left hover:border-white/20 border border-transparent transition"
              >
                <span className="text-teal-400"><Icon name={q.icon as any} size={20} /></span>
                <div className="mt-2 text-sm text-white/85">{q.t}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Care team">
        <div className="flex items-center gap-4">
          <Avatar name="Dr Sandeep Sharma" size={52} tone="from-brand-400 to-teal-400" />
          <div>
            <div className="text-white">Dr. Sandeep Sharma</div>
            <div className="text-sm text-white/55">Consultant Psychiatrist · {clinic.city}</div>
          </div>
          <div className="ml-auto hidden sm:flex gap-2">
            <span className="chip"><Icon name="check" size={13} /> Evidence-based</span>
            <span className="chip"><Icon name="heart" size={13} /> Compassionate</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ============================== Book ============================== */

function BookAppointment({ user, onBooked }: { user: User; onBooked: () => void }) {
  const [service, setService] = useState(services[0].key);
  const [mode, setMode] = useState<"in-clinic" | "online">("in-clinic");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const slots = useMemo(() => {
    const all = daySlots();
    const isToday = date === todayISO();
    const nowHM = new Date().toTimeString().slice(0, 5);
    return all.map((s) => ({
      value: s,
      taken: isSlotTaken(date, s) || (isToday && s <= nowHM)
    }));
  }, [date]);

  const dayOk = useMemo(() => {
    const d = new Date(date + "T00:00:00").getDay();
    return clinic.workingDays.includes(d);
  }, [date]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!dayOk) return setErr("The clinic is closed on the selected day. Please pick Mon–Sat.");
    if (!time) return setErr("Please choose an available time slot.");
    if (isSlotTaken(date, time)) return setErr("That slot was just taken — please pick another.");
    createAppointment({
      patientId: user.id,
      patientName: user.name,
      service,
      mode,
      date,
      time,
      reason
    });
    onBooked();
  }

  const fee = services.find((s) => s.key === service)?.fee ?? 0;

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2" title="Appointment details">
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Select
            label="Concern / service"
            name="service"
            value={service}
            onChange={(v) => setService(v as typeof service)}
            options={services.map((s) => ({ value: s.key, label: s.label }))}
          />
          <Select
            label="Mode"
            name="mode"
            value={mode}
            onChange={(v) => setMode(v as typeof mode)}
            options={consultModes.map((m) => ({ value: m.key, label: m.label }))}
          />
          <Field label="Preferred date" name="date" type="date" value={date} min={todayISO()} onChange={setDate} required />
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Time slot</span>
            <div className="mt-1.5 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-44 overflow-y-auto pr-1">
              {slots.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  disabled={s.taken}
                  onClick={() => setTime(s.value)}
                  className={`rounded-lg px-2 py-2 text-xs transition border ${
                    time === s.value
                      ? "btn-primary !rounded-lg border-transparent"
                      : s.taken
                      ? "glass-faint opacity-35 cursor-not-allowed border-transparent"
                      : "glass-faint hover:border-white/25 border-transparent text-white/80"
                  }`}
                >
                  {s.value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <TextArea
            label="Reason / notes (optional)"
            name="reason"
            value={reason}
            onChange={setReason}
            placeholder="Briefly describe what you'd like to discuss."
          />
        </div>

        {err && (
          <div className="mt-4 rounded-xl border border-rose-300/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {err}
          </div>
        )}
      </Card>

      <Card title="Summary">
        <div className="space-y-1">
          <Row label="Patient" value={user.name} />
          <Row label="Service" value={serviceLabel(service)} />
          <Row label="Mode" value={mode === "online" ? "Online (Video)" : "In-clinic"} />
          <Row label="Date" value={dayOk ? fmtDate(date) : <span className="text-rose-200">Closed day</span>} />
          <Row label="Time" value={time || "—"} />
          <Row label="Est. fee" value={`₹${fee}`} />
        </div>
        <Button type="submit" variant="primary" className="w-full justify-center mt-5 !py-3">
          Request appointment <Icon name="arrow" size={16} />
        </Button>
        <p className="mt-3 text-xs text-white/45">
          Requests are confirmed by the clinic. You'll see the status update under “My appointments”.
        </p>
      </Card>
    </form>
  );
}

/* ============================== Appointments ============================== */

function Appointments({ appts, onChange }: { appts: Appointment[]; onChange: () => void }) {
  if (appts.length === 0) {
    return <EmptyState icon="calendar" title="No appointments yet" hint="Your booked visits will appear here." />;
  }
  return (
    <div className="space-y-3.5">
      {appts.map((a) => (
        <Card key={a.id} className="!p-0">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="glass-faint rounded-2xl px-4 py-3 text-center min-w-[92px]">
              <div className="text-xs text-white/50">{new Date(a.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short" })}</div>
              <div className="font-display text-2xl text-gradient-cool">{new Date(a.date + "T00:00:00").getDate()}</div>
              <div className="text-xs text-white/55">{new Date(a.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" })}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-white">{serviceLabel(a.service)}</h4>
                <Badge tone={a.status}>{a.status}</Badge>
                <span className="chip !py-0.5"><Icon name="clock" size={12} /> {a.time}</span>
                <span className="chip !py-0.5"><Icon name="pin" size={12} /> {a.mode === "online" ? "Online" : "In-clinic"}</span>
              </div>
              {a.reason && <p className="text-sm text-white/60 mt-1.5">{a.reason}</p>}
              {a.notes && (
                <div className="mt-2 rounded-xl glass-faint p-3 text-sm text-white/70">
                  <span className="text-teal-300 text-xs uppercase tracking-[0.14em]">Doctor's note · </span>
                  {a.notes}
                </div>
              )}
            </div>
            {(a.status === "pending" || a.status === "confirmed") && a.date >= todayISO() && (
              <Button
                variant="danger"
                onClick={() => {
                  if (confirm("Cancel this appointment?")) {
                    updateAppointment(a.id, { status: "cancelled" });
                    onChange();
                  }
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ============================== Prescriptions ============================== */

function Prescriptions({ rx }: { rx: Prescription[] }) {
  if (rx.length === 0) {
    return <EmptyState icon="pill" title="No prescriptions yet" hint="Prescriptions issued by your doctor will appear here." />;
  }
  return (
    <div className="space-y-4">
      {rx.map((r) => (
        <Card key={r.id}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-teal-400"><Icon name="clipboard" size={18} /></span>
                <h4 className="text-white">{r.diagnosis}</h4>
              </div>
              <p className="text-xs text-white/45 mt-1">Issued {fmtDate(r.date)} · {r.doctor}</p>
            </div>
            <Badge tone="teal"><Icon name="check" size={12} /> Active</Badge>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-white/45">
                  <th className="py-2 pr-3 font-medium">Medicine</th>
                  <th className="py-2 pr-3 font-medium">Dosage</th>
                  <th className="py-2 pr-3 font-medium">Frequency</th>
                  <th className="py-2 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {r.medicines.map((m, i) => (
                  <tr key={i} className="border-t border-white/8">
                    <td className="py-2.5 pr-3 text-white/90">{m.name}</td>
                    <td className="py-2.5 pr-3 text-white/70">{m.dosage}</td>
                    <td className="py-2.5 pr-3 text-white/70">{m.frequency}</td>
                    <td className="py-2.5 text-white/70">{m.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {r.advice && (
            <p className="mt-4 text-sm text-white/70">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">Advice · </span>
              {r.advice}
            </p>
          )}
          {r.followUp && (
            <p className="mt-2 text-sm text-white/70">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">Follow-up · </span>
              {fmtDate(r.followUp)}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

/* ============================== Records ============================== */

function Records({
  records,
  patientId,
  onChange
}: {
  records: MedicalRecord[];
  patientId: string;
  onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MedicalRecord["type"]>("Lab Report");
  const [summary, setSummary] = useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    createRecord({ patientId, title, type, summary, date: todayISO() });
    setTitle("");
    setSummary("");
    setType("Lab Report");
    setOpen(false);
    onChange();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Icon name="plus" size={16} /> Add record
        </Button>
      </div>

      {records.length === 0 ? (
        <EmptyState icon="file" title="No records yet" hint="Add reports or notes you'd like the doctor to see." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {records.map((r) => (
            <Card key={r.id} className="!p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl glass-faint flex items-center justify-center text-teal-400 shrink-0">
                  <Icon name="file" size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-[15px] truncate">{r.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge tone="neutral">{r.type}</Badge>
                    <span className="text-xs text-white/45">{fmtDate(r.date)}</span>
                  </div>
                  {r.summary && <p className="text-sm text-white/65 mt-2 leading-relaxed">{r.summary}</p>}
                </div>
                <button
                  aria-label="Delete"
                  onClick={() => {
                    if (confirm("Delete this record?")) {
                      deleteRecord(r.id);
                      onChange();
                    }
                  }}
                  className="text-white/40 hover:text-rose-300"
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add medical record">
        <form onSubmit={add} className="space-y-3.5">
          <Field label="Title" name="title" value={title} onChange={setTitle} placeholder="e.g. Thyroid profile" required />
          <Select
            label="Type"
            name="type"
            value={type}
            onChange={(v) => setType(v as MedicalRecord["type"])}
            options={["Lab Report", "Clinical Note", "Scan", "Other"].map((t) => ({ value: t, label: t }))}
          />
          <TextArea label="Summary" name="summary" value={summary} onChange={setSummary} placeholder="Key findings or notes." />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================== Messages ============================== */

function Messages({ user, tick, onChange }: { user: User; tick: number; onChange: () => void }) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const msgs: Message[] = useMemo(() => listMessages(user.id), [user.id, tick]);

  useEffect(() => {
    markThreadRead(user.id, "patient");
    onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs.length]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(user.id, "patient", text);
    setText("");
    onChange();
  }

  return (
    <Card className="!p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/8 flex items-center gap-3">
        <Avatar name="Dr Sandeep Sharma" size={40} tone="from-brand-400 to-teal-400" />
        <div>
          <div className="text-white text-sm">Divine Psychiatry Clinic</div>
          <div className="text-xs text-white/45">Typically replies within a day</div>
        </div>
      </div>

      <div className="p-5 space-y-3 h-[52vh] overflow-y-auto">
        {msgs.length === 0 && (
          <p className="text-center text-sm text-white/45 mt-10">Start the conversation with the clinic.</p>
        )}
        {msgs.map((m) => {
          const mine = m.from === "patient";
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${
                  mine ? "btn-primary !rounded-2xl" : "glass-faint text-white/85"
                }`}
              >
                <p className={mine ? "text-ink-950" : ""}>{m.text}</p>
                <div className={`mt-1 text-[10px] ${mine ? "text-ink-950/60" : "text-white/40"}`}>
                  {fmtDateTime(m.at)}
                </div>
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
          placeholder="Type a message…"
          className="flex-1 glass-faint rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30"
        />
        <button type="submit" className="btn btn-primary !px-4 !py-3" aria-label="Send">
          <Icon name="send" size={18} />
        </button>
      </form>
    </Card>
  );
}

/* ============================== Profile ============================== */

function Profile({ user, onSaved }: { user: User; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    dob: user.dob ?? "",
    gender: user.gender ?? "",
    address: user.address ?? "",
    bloodGroup: user.bloodGroup ?? "",
    allergies: user.allergies ?? "",
    emergencyContact: user.emergencyContact ?? ""
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    updateUser(user.id, form);
    onSaved();
  }

  return (
    <form onSubmit={save} className="grid lg:grid-cols-3 gap-5">
      <Card title="Personal details" className="lg:col-span-2">
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="Full name" name="name" value={form.name} onChange={set("name")} required />
          <Field label="Phone" name="phone" value={form.phone} onChange={set("phone")} />
          <Field label="Date of birth" name="dob" type="date" value={form.dob} onChange={set("dob")} />
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={set("gender")}
            options={["", "Male", "Female", "Other", "Prefer not to say"].map((g) => ({ value: g, label: g || "Select…" }))}
          />
          <div className="sm:col-span-2">
            <Field label="Address" name="address" value={form.address} onChange={set("address")} placeholder="City, area" />
          </div>
        </div>
      </Card>

      <Card title="Medical">
        <div className="space-y-3.5">
          <Select
            label="Blood group"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={set("bloodGroup")}
            options={["", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => ({ value: b, label: b || "Select…" }))}
          />
          <Field label="Allergies" name="allergies" value={form.allergies} onChange={set("allergies")} placeholder="e.g. None known" />
          <Field label="Emergency contact" name="emergencyContact" value={form.emergencyContact} onChange={set("emergencyContact")} placeholder="+91" />
          <div className="rounded-xl glass-faint p-3 text-xs text-white/50">
            Email: <span className="text-white/75">{user.email}</span>
          </div>
        </div>
        <Button type="submit" variant="primary" className="w-full justify-center mt-4 !py-3">
          Save changes <Icon name="check" size={16} />
        </Button>
      </Card>
    </form>
  );
}
