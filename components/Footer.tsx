import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 sm:px-6 pb-10 pt-24">
      <div className="mx-auto max-w-6xl glass-strong rounded-[28px] p-7 sm:p-10 overflow-hidden glass-shine">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Compassionate, evidence-based psychiatric care with a vision toward mental wellness,
              preventive health and healthy longevity.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">Ethical</span>
              <span className="chip">Confidential</span>
              <span className="chip">Evidence-Based</span>
            </div>
          </div>

          <div className="text-sm">
            <div className="text-white/45 uppercase tracking-[0.18em] text-[11px] mb-3">Clinic</div>
            <ul className="space-y-2 text-white/80">
              <li>{site.brand}</li>
              <li>By {site.doctor}</li>
              <li className="text-white/55">{site.city}</li>
              <li className="text-white/55">{site.hours}</li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="text-white/45 uppercase tracking-[0.18em] text-[11px] mb-3">Connect</div>
            <ul className="space-y-2">
              <li><a className="text-white/85 hover:text-white" href={site.phone}>{site.phoneDisplay}</a></li>
              <li><a className="text-white/85 hover:text-white" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a className="text-white/85 hover:text-white" href={site.email}>{site.emailDisplay}</a></li>
              <li><a className="text-white/85 hover:text-white" href={site.mapsQuery} target="_blank" rel="noopener">View on Maps</a></li>
            </ul>
          </div>
        </div>

        <div className="divider-line my-8" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
