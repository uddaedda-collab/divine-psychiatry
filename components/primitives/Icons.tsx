import { ReactNode } from "react";

export type IconName =
  | "depression"
  | "anxiety"
  | "ocd"
  | "bipolar"
  | "sleep"
  | "child"
  | "addiction"
  | "counsel"
  | "geriatric"
  | "brain"
  | "heart"
  | "shield"
  | "globe"
  | "sparkle"
  | "bolt"
  | "leaf"
  | "compass"
  | "phone"
  | "whatsapp"
  | "mail"
  | "pin"
  | "arrow"
  | "check"
  | "star"
  | "play"
  | "calendar"
  | "clock"
  | "clipboard"
  | "pill"
  | "user"
  | "users"
  | "logout"
  | "grid"
  | "message"
  | "plus"
  | "file"
  | "settings"
  | "edit"
  | "x"
  | "search"
  | "bell"
  | "activity"
  | "lock"
  | "stethoscope"
  | "home"
  | "download"
  | "trash"
  | "chart"
  | "send"
  | "menu";

const Wrap = ({ children, size = 22 }: { children: ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

export default function Icon({ name, size }: { name: IconName; size?: number }) {
  switch (name) {
    case "depression":
      return (
        <Wrap size={size}>
          <path d="M4 14c2-3 5-3 7 0s5 3 7 0" />
          <path d="M5 8c.6-2 2-3 4-3M19 8c-.6-2-2-3-4-3" />
        </Wrap>
      );
    case "anxiety":
      return (
        <Wrap size={size}>
          <path d="M3 12h3l2-5 4 10 2-5h2l2 3h3" />
        </Wrap>
      );
    case "ocd":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v3M12 16v3M5 12h3M16 12h3" />
          <circle cx="12" cy="12" r="2" />
        </Wrap>
      );
    case "bipolar":
      return (
        <Wrap size={size}>
          <path d="M3 17l5-10 4 6 4-9 5 13" />
        </Wrap>
      );
    case "sleep":
      return (
        <Wrap size={size}>
          <path d="M21 13.5A8.5 8.5 0 1110.5 3a7 7 0 0010.5 10.5z" />
          <path d="M14 6h4l-4 5h4" />
        </Wrap>
      );
    case "child":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21c1-4 4-6 7-6s6 2 7 6" />
        </Wrap>
      );
    case "addiction":
      return (
        <Wrap size={size}>
          <path d="M9 4l11 11-5 5L4 9z" />
          <path d="M9 4L4 9" />
        </Wrap>
      );
    case "counsel":
      return (
        <Wrap size={size}>
          <path d="M21 12a8 8 0 11-3-6.2L21 4v5h-5" />
        </Wrap>
      );
    case "geriatric":
      return (
        <Wrap size={size}>
          <path d="M9 21V11a3 3 0 016 0v10" />
          <circle cx="12" cy="6" r="2.2" />
          <path d="M3 21h18" />
        </Wrap>
      );
    case "brain":
      return (
        <Wrap size={size}>
          <path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6 3 3 0 003 3 3 3 0 006 0 3 3 0 003-3 3 3 0 000-6V7a3 3 0 00-6 0" />
        </Wrap>
      );
    case "heart":
      return (
        <Wrap size={size}>
          <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
        </Wrap>
      );
    case "shield":
      return (
        <Wrap size={size}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </Wrap>
      );
    case "globe":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18" />
        </Wrap>
      );
    case "sparkle":
      return (
        <Wrap size={size}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
          <path d="M19 16l.7 1.8L21 18l-1.3.4L19 20l-.7-1.6L17 18l1.3-.4z" />
        </Wrap>
      );
    case "bolt":
      return (
        <Wrap size={size}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
        </Wrap>
      );
    case "leaf":
      return (
        <Wrap size={size}>
          <path d="M5 21c0-9 6-15 15-15-1 9-6 15-15 15z" />
          <path d="M5 21c4-4 8-8 12-12" />
        </Wrap>
      );
    case "compass":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-2 5-5 2 2-5z" />
        </Wrap>
      );
    case "phone":
      return (
        <Wrap size={size}>
          <path d="M5 4h3l2 5-2 1a11 11 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
        </Wrap>
      );
    case "whatsapp":
      return (
        <Wrap size={size}>
          <path d="M3 21l1.5-4A8.5 8.5 0 1112 20.5L3 21z" />
          <path d="M8 11c.5 2 2 3.5 4 4l1.5-1.5L16 14v2.5c-3.5 0-7-3-7-7H11.5L10 7.5 8 9z" />
        </Wrap>
      );
    case "mail":
      return (
        <Wrap size={size}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </Wrap>
      );
    case "pin":
      return (
        <Wrap size={size}>
          <path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </Wrap>
      );
    case "arrow":
      return (
        <Wrap size={size}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </Wrap>
      );
    case "check":
      return (
        <Wrap size={size}>
          <path d="M5 12l5 5 9-11" />
        </Wrap>
      );
    case "star":
      return (
        <Wrap size={size}>
          <path d="M12 3l2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.8 6.5 20.3l1.1-6.3L3 9.6l6.3-.9z" />
        </Wrap>
      );
    case "play":
      return (
        <Wrap size={size}>
          <path d="M7 5l12 7-12 7z" />
        </Wrap>
      );
    case "calendar":
      return (
        <Wrap size={size}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </Wrap>
      );
    case "clock":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </Wrap>
      );
    case "clipboard":
      return (
        <Wrap size={size}>
          <rect x="6" y="4" width="12" height="17" rx="2" />
          <path d="M9 4a3 3 0 016 0" />
          <path d="M9 11h6M9 15h4" />
        </Wrap>
      );
    case "pill":
      return (
        <Wrap size={size}>
          <rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(45 12 12)" />
          <path d="M9 9l6 6" />
        </Wrap>
      );
    case "user":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1-4 4-5 7-5s6 1 7 5" />
        </Wrap>
      );
    case "users":
      return (
        <Wrap size={size}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c.8-3.2 3-4.5 6-4.5s5.2 1.3 6 4.5" />
          <path d="M16 5.5a3 3 0 010 5.5M21 20c-.5-2.4-1.8-3.8-3.7-4.4" />
        </Wrap>
      );
    case "logout":
      return (
        <Wrap size={size}>
          <path d="M14 4h4a1 1 0 011 1v14a1 1 0 01-1 1h-4" />
          <path d="M3 12h11M11 8l-4 4 4 4" />
        </Wrap>
      );
    case "grid":
      return (
        <Wrap size={size}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </Wrap>
      );
    case "message":
      return (
        <Wrap size={size}>
          <path d="M4 5h16a1 1 0 011 1v9a1 1 0 01-1 1H9l-4 4V6a1 1 0 011-1z" />
          <path d="M8 9h8M8 12h5" />
        </Wrap>
      );
    case "plus":
      return (
        <Wrap size={size}>
          <path d="M12 5v14M5 12h14" />
        </Wrap>
      );
    case "file":
      return (
        <Wrap size={size}>
          <path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v4h4M8 13h8M8 17h6" />
        </Wrap>
      );
    case "settings":
      return (
        <Wrap size={size}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </Wrap>
      );
    case "edit":
      return (
        <Wrap size={size}>
          <path d="M4 20h4l10-10-4-4L4 16v4z" />
          <path d="M13.5 6.5l4 4" />
        </Wrap>
      );
    case "x":
      return (
        <Wrap size={size}>
          <path d="M6 6l12 12M18 6L6 18" />
        </Wrap>
      );
    case "search":
      return (
        <Wrap size={size}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </Wrap>
      );
    case "bell":
      return (
        <Wrap size={size}>
          <path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" />
          <path d="M10 20a2 2 0 004 0" />
        </Wrap>
      );
    case "activity":
      return (
        <Wrap size={size}>
          <path d="M3 12h4l3 8 4-16 3 8h4" />
        </Wrap>
      );
    case "lock":
      return (
        <Wrap size={size}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </Wrap>
      );
    case "stethoscope":
      return (
        <Wrap size={size}>
          <path d="M5 3v6a4 4 0 008 0V3" />
          <path d="M9 13v2a5 5 0 0010 0v-2" />
          <circle cx="19" cy="9" r="2" />
        </Wrap>
      );
    case "home":
      return (
        <Wrap size={size}>
          <path d="M4 11l8-7 8 7" />
          <path d="M6 10v10h12V10" />
        </Wrap>
      );
    case "download":
      return (
        <Wrap size={size}>
          <path d="M12 4v11M8 11l4 4 4-4" />
          <path d="M4 19h16" />
        </Wrap>
      );
    case "trash":
      return (
        <Wrap size={size}>
          <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13" />
        </Wrap>
      );
    case "chart":
      return (
        <Wrap size={size}>
          <path d="M4 20V4M4 20h16" />
          <path d="M8 16v-4M12 16V8M16 16v-6" />
        </Wrap>
      );
    case "send":
      return (
        <Wrap size={size}>
          <path d="M4 12l16-7-7 16-2-7-7-2z" />
        </Wrap>
      );
    case "menu":
      return (
        <Wrap size={size}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </Wrap>
      );
  }
}
