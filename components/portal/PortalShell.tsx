"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";
import Icon, { IconName } from "@/components/primitives/Icons";
import { Avatar } from "@/components/portal/ui";

export type NavItem = { id: string; label: string; icon: IconName; badge?: number };

export default function PortalShell({
  roleLabel,
  userName,
  nav,
  active,
  onNavigate,
  onLogout,
  title,
  subtitle,
  headerActions,
  children
}: {
  roleLabel: string;
  userName: string;
  nav: NavItem[];
  active: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
  title: string;
  subtitle?: string;
  headerActions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const NavList = ({ onPick }: { onPick?: () => void }) => (
    <nav className="flex flex-col gap-1">
      {nav.map((n) => {
        const isActive = n.id === active;
        return (
          <button
            key={n.id}
            onClick={() => {
              onNavigate(n.id);
              onPick?.();
            }}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
              isActive
                ? "glass-faint text-white border border-white/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className={isActive ? "text-teal-400" : "text-white/45 group-hover:text-white/80"}>
              <Icon name={n.icon} size={19} />
            </span>
            <span className="flex-1">{n.label}</span>
            {!!n.badge && n.badge > 0 && (
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-teal-400/20 text-teal-200 text-[11px] flex items-center justify-center">
                {n.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  const UserCard = (
    <div className="glass-faint rounded-2xl p-3.5 flex items-center gap-3">
      <Avatar name={userName} size={38} />
      <div className="min-w-0 flex-1">
        <div className="text-sm text-white truncate">{userName}</div>
        <div className="text-[11px] text-white/45">{roleLabel}</div>
      </div>
      <button
        aria-label="Log out"
        onClick={onLogout}
        className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white"
        title="Log out"
      >
        <Icon name="logout" size={18} />
      </button>
    </div>
  );

  return (
    <div className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 py-4 lg:py-6 flex gap-5">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-[256px] shrink-0 flex-col">
          <div className="glass-strong rounded-3xl p-4 sticky top-6 flex flex-col gap-4">
            <Link href="/" className="flex items-center px-1.5 pt-1.5" aria-label="Home">
              <Logo />
            </Link>
            <div className="chip !text-[10px] self-start">
              <Icon name="stethoscope" size={13} /> {roleLabel} Portal
            </div>
            <NavList />
            <div className="mt-2">{UserCard}</div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="glass-strong rounded-3xl px-4 sm:px-6 py-4 flex items-center gap-4">
            <button
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 rounded-xl glass-faint flex items-center justify-center text-white/80"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" size={20} />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-xl sm:text-2xl text-gradient leading-tight truncate">
                {title}
              </h1>
              {subtitle && <p className="text-xs sm:text-sm text-white/50 mt-0.5 truncate">{subtitle}</p>}
            </div>
            {headerActions && <div className="hidden sm:flex items-center gap-2">{headerActions}</div>}
          </header>

          {headerActions && <div className="sm:hidden mt-3 flex flex-wrap gap-2">{headerActions}</div>}

          <main className="mt-4 lg:mt-5 pb-16">{children}</main>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden fixed inset-0 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className="absolute left-0 top-0 bottom-0 w-[280px] glass-strong p-4 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-white/70"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>
              <div className="chip !text-[10px] self-start">
                <Icon name="stethoscope" size={13} /> {roleLabel} Portal
              </div>
              <NavList onPick={() => setOpen(false)} />
              <div className="mt-auto">{UserCard}</div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
