import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import { join } from "node:path";

const dir = "public/doctor";
const files = (await readdir(dir)).filter((f) => /^0\d\.jpg$/.test(f));

for (const f of files) {
  const src = join(dir, f);
  const tmp = join(dir, `_${f}`);
  const before = (await stat(src)).size;
  await sharp(src)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(tmp);
  await rename(tmp, src);
  const after = (await stat(src)).size;
  console.log(`${f}: ${(before / 1024).toFixed(0)}kB -> ${(after / 1024).toFixed(0)}kB`);
}
