// Mask the phone's own status-bar icons (VPN, ringer, Do Not Disturb…) on a
// Pixel 10 Pro capture, as the product repo's Play composer does
// (scripts/marketing-shots/android/compose.mjs): between the demo clock and
// the battery, each row is filled with its own background colour. App
// content is untouched. Usage: node scripts/mask-android-status.mjs in.png out.png
import sharp from "sharp";

const STATUS_BAR = { bottom: 150, from: 215, to: 1105, sample: 600 };
const [source, target] = process.argv.slice(2);
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
if (info.width !== 1280) throw new Error(`Expected a 1280-wide Pixel 10 Pro capture, got ${info.width}`);
for (let y = 0; y < STATUS_BAR.bottom; y++) {
  const row = y * info.width * 3;
  const sample = row + STATUS_BAR.sample * 3;
  for (let x = STATUS_BAR.from; x < STATUS_BAR.to; x++) data.copy(data, row + x * 3, sample, sample + 3);
}
await sharp(data, { raw: info }).png().toFile(target);
