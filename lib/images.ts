/**
 * Central image registry.
 *
 * To use the doctor's real photos:
 *   1. Place them in /public/doctor/ as 01.jpg .. 05.jpg
 *   2. Change the extensions below from .svg → .jpg
 *
 * The site ships with elegant SVG placeholders so the build never breaks.
 */
const ext = "jpg"; // change to "jpg" once real photos are in /public/doctor/

// Respect Next.js basePath so images work both locally ("") and on GitHub Pages ("/divine-psychiatry").
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const doctorImages = {
  primary: `${base}/doctor/02.${ext}`,
  opdConsult: `${base}/doctor/01.${ext}`,
  whiteCoat: `${base}/doctor/03.${ext}`,
  ruralOpd: `${base}/doctor/04.${ext}`,
  signage: `${base}/doctor/05.${ext}`
};
