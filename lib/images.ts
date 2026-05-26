/**
 * Central image registry.
 *
 * To use the doctor's real photos:
 *   1. Place them in /public/doctor/ as 01.jpg .. 05.jpg
 *   2. Change the extensions below from .svg → .jpg
 *
 * The site ships with elegant SVG placeholders so the build never breaks.
 */
const ext = "svg"; // change to "jpg" once real photos are in /public/doctor/

export const doctorImages = {
  primary: `/doctor/02.${ext}`,
  opdConsult: `/doctor/01.${ext}`,
  whiteCoat: `/doctor/03.${ext}`,
  ruralOpd: `/doctor/04.${ext}`,
  signage: `/doctor/05.${ext}`
};
