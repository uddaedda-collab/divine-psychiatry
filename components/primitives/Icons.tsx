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
  | "play";

const Wrap = ({ children }: { children: ReactNode }) => (
  <svg
    width="22"
    height="22"
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

export default function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "depression":
      return (
        <Wrap>
          <path d="M4 14c2-3 5-3 7 0s5 3 7 0" />
          <path d="M5 8c.6-2 2-3 4-3M19 8c-.6-2-2-3-4-3" />
        </Wrap>
      );
    case "anxiety":
      return (
        <Wrap>
          <path d="M3 12h3l2-5 4 10 2-5h2l2 3h3" />
        </Wrap>
      );
    case "ocd":
      return (
        <Wrap>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v3M12 16v3M5 12h3M16 12h3" />
          <circle cx="12" cy="12" r="2" />
        </Wrap>
      );
    case "bipolar":
      return (
        <Wrap>
          <path d="M3 17l5-10 4 6 4-9 5 13" />
        </Wrap>
      );
    case "sleep":
      return (
        <Wrap>
          <path d="M21 13.5A8.5 8.5 0 1110.5 3a7 7 0 0010.5 10.5z" />
          <path d="M14 6h4l-4 5h4" />
        </Wrap>
      );
    case "child":
      return (
        <Wrap>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21c1-4 4-6 7-6s6 2 7 6" />
        </Wrap>
      );
    case "addiction":
      return (
        <Wrap>
          <path d="M9 4l11 11-5 5L4 9z" />
          <path d="M9 4L4 9" />
        </Wrap>
      );
    case "counsel":
      return (
        <Wrap>
          <path d="M21 12a8 8 0 11-3-6.2L21 4v5h-5" />
        </Wrap>
      );
    case "geriatric":
      return (
        <Wrap>
          <path d="M9 21V11a3 3 0 016 0v10" />
          <circle cx="12" cy="6" r="2.2" />
          <path d="M3 21h18" />
        </Wrap>
      );
    case "brain":
      return (
        <Wrap>
          <path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6 3 3 0 003 3 3 3 0 006 0 3 3 0 003-3 3 3 0 000-6V7a3 3 0 00-6 0" />
        </Wrap>
      );
    case "heart":
      return (
        <Wrap>
          <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
        </Wrap>
      );
    case "shield":
      return (
        <Wrap>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </Wrap>
      );
    case "globe":
      return (
        <Wrap>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18" />
        </Wrap>
      );
    case "sparkle":
      return (
        <Wrap>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
          <path d="M19 16l.7 1.8L21 18l-1.3.4L19 20l-.7-1.6L17 18l1.3-.4z" />
        </Wrap>
      );
    case "bolt":
      return (
        <Wrap>
          <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
        </Wrap>
      );
    case "leaf":
      return (
        <Wrap>
          <path d="M5 21c0-9 6-15 15-15-1 9-6 15-15 15z" />
          <path d="M5 21c4-4 8-8 12-12" />
        </Wrap>
      );
    case "compass":
      return (
        <Wrap>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-2 5-5 2 2-5z" />
        </Wrap>
      );
    case "phone":
      return (
        <Wrap>
          <path d="M5 4h3l2 5-2 1a11 11 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
        </Wrap>
      );
    case "whatsapp":
      return (
        <Wrap>
          <path d="M3 21l1.5-4A8.5 8.5 0 1112 20.5L3 21z" />
          <path d="M8 11c.5 2 2 3.5 4 4l1.5-1.5L16 14v2.5c-3.5 0-7-3-7-7H11.5L10 7.5 8 9z" />
        </Wrap>
      );
    case "mail":
      return (
        <Wrap>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </Wrap>
      );
    case "pin":
      return (
        <Wrap>
          <path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </Wrap>
      );
    case "arrow":
      return (
        <Wrap>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </Wrap>
      );
    case "check":
      return (
        <Wrap>
          <path d="M5 12l5 5 9-11" />
        </Wrap>
      );
    case "star":
      return (
        <Wrap>
          <path d="M12 3l2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.8 6.5 20.3l1.1-6.3L3 9.6l6.3-.9z" />
        </Wrap>
      );
    case "play":
      return (
        <Wrap>
          <path d="M7 5l12 7-12 7z" />
        </Wrap>
      );
  }
}
