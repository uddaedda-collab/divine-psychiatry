"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right" | "bottom" | "depth";
  strong?: boolean;
};

export default function GlassPanel({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  strong = false
}: Props) {
  const reduce = useReducedMotion();

  const variants = {
    hidden:
      from === "left"
        ? { opacity: 0, x: -32 }
        : from === "right"
        ? { opacity: 0, x: 32 }
        : from === "depth"
        ? { opacity: 0, scale: 0.97 }
        : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }
    }
  };

  return (
    <motion.div
      variants={reduce ? undefined : variants}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className={`${strong ? "glass-strong" : "glass"} glass-shine ${className}`}
    >
      {children}
    </motion.div>
  );
}
