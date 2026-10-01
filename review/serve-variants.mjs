// Local-only QA of production files. No change to shipped assets or site routes.
// CSS and matchMedia are forced together so reduced motion also tests MP4 loading.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve("dist");
const mode = process.argv[2] || "dark";
const port = Number(process.argv[3] || 4323);
const dark = mode.includes("dark"),
  reduce = mode.includes("reduce"),
  nojs = mode.includes("nojs");
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon",
};
function css(text) {
  return text
    .replace(/prefers-color-scheme\s*:\s*(dark|light)/g, (_, v) =>
      v === (dark ? "dark" : "light") ? "min-width:0px" : "max-width:0px",
    )
    .replace(/prefers-reduced-motion\s*:\s*(reduce|no-preference)/g, (_, v) =>
      v === (reduce ? "reduce" : "no-preference")
        ? "min-width:0px"
        : "max-width:0px",
    );
}
const init = `<script>const realMatchMedia=window.matchMedia.bind(window);window.matchMedia=function(q){let m=realMatchMedia(q);if(q.includes('prefers-color-scheme'))Object.defineProperty(m,'matches',{value:q.includes('${dark ? "dark" : "light"}')});if(q.includes('prefers-reduced-motion'))Object.defineProperty(m,'matches',{value:q.includes('${reduce ? "reduce" : "no-preference"}')});return m;}</script>`;
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = resolve(root, "." + path);
    if (!file.startsWith(root + "/")) throw Error("Invalid path");
    if (!extname(file)) file += "/index.html";
    let data = await readFile(file);
    if (extname(file) === ".css") data = css(data.toString());
    if (extname(file) === ".html") {
      data = css(data.toString());
      if (nojs) data = data.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
      else data = data.replace("<head>", "<head>" + init);
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`QA ${mode}: http://localhost:${port}`),
);
