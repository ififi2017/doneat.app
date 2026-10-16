/** Build-time switches. Vite inlines these public settings into client modules. */
const region = process.env.SITE_REGION || "global";
if (region !== "global" && region !== "cn") {
  throw new Error("SITE_REGION must be global or cn");
}
export const isChina = region === "cn";
export const defaultLocale = isChina ? "zh-CN" : "en";
export const siteOrigin = isChina
  ? (process.env.SITE_ORIGIN || "https://doneat.com.cn").replace(/\/$/, "")
  : "https://doneat.app";
const origin = new URL(siteOrigin);
if (origin.protocol !== "https:" || origin.pathname !== "/" || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error("SITE_ORIGIN must be an HTTPS origin without a path, query or credentials");
}
export const icpFilingNumber = isChina ? (process.env.ICP_FILING_NUMBER || "").trim() : "";
