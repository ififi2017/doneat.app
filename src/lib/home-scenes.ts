// Scroll-driven scenes for the homepage. Writes a 0..1 progress variable on
// each [data-scene] and leaves the visuals to CSS (home-story.css):
//   exit   → --x: 0 while the element's top is at the viewport top, 1 once it
//             has scrolled fully past.
//   sticky → --p: 0 when the pinned stage starts, 1 when it releases.
//   pass   → --p: 0 when the element enters at the bottom, 1 when it leaves
//             at the top.
// Without this script, or with reduced motion, nothing is pinned and every
// scene shows its finished state.

const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;
const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
const near = new Set<HTMLElement>();
const last = new WeakMap<HTMLElement, number>();
let frame = 0;
let on = false;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function progress(scene: HTMLElement): number {
  const rect = scene.getBoundingClientRect();
  const viewport = window.innerHeight;
  switch (scene.dataset.scene) {
    case "exit":
      return clamp(-rect.top / Math.max(1, rect.height));
    case "sticky":
      return clamp(-rect.top / Math.max(1, rect.height - viewport));
    default:
      return clamp((viewport - rect.top) / (rect.height + viewport));
  }
}

// Statement words: split once into segments so they can light in order.
function splitWords(element: HTMLElement) {
  if (element.dataset.split) return;
  element.dataset.split = "1";
  const text = element.textContent ?? "";
  const lang = document.documentElement.lang || undefined;
  const Segmenter = (Intl as typeof Intl & { Segmenter?: typeof Intl.Segmenter }).Segmenter;
  const parts = Segmenter
    ? Array.from(new Segmenter(lang, { granularity: "word" }).segment(text), (s) => s.segment)
    : text.split(/(\s+)/);
  element.textContent = "";
  const whole = document.createElement("span");
  whole.className = "sr-only";
  whole.textContent = text;
  element.appendChild(whole);
  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      element.appendChild(document.createTextNode(part));
      continue;
    }
    const span = document.createElement("span");
    span.className = "w";
    span.setAttribute("aria-hidden", "true");
    span.textContent = part;
    element.appendChild(span);
  }
}

function paint(scene: HTMLElement) {
  const p = progress(scene);
  if (last.get(scene) === p) return;
  last.set(scene, p);
  scene.style.setProperty(scene.dataset.scene === "exit" ? "--x" : "--p", p.toFixed(4));

  // Words finish lighting a little before the pin releases.
  scene.querySelectorAll<HTMLElement>("[data-words]").forEach((element) => {
    const words = element.querySelectorAll<HTMLElement>(".w");
    const lit = Math.round(clamp((p - 0.08) / 0.7) * words.length);
    words.forEach((word, index) => word.classList.toggle("is-lit", index < lit));
  });

  // Steps advance after the device has settled.
  const steps = scene.querySelectorAll<HTMLElement>("[data-step]");
  if (steps.length) {
    const active = Math.min(steps.length - 1, Math.max(0, Math.floor(((p - 0.28) / 0.66) * steps.length)));
    steps.forEach((step, index) => step.classList.toggle("is-active", index === active));
  }
}

function tick() {
  frame = 0;
  near.forEach(paint);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

const observer =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const scene = entry.target as HTMLElement;
            if (entry.isIntersecting) near.add(scene);
            else {
              // Settle at the nearest end before going idle.
              paint(scene);
              near.delete(scene);
            }
          }
          schedule();
        },
        { rootMargin: "50% 0px" },
      )
    : null;

function enable() {
  if (on || !observer) return;
  on = true;
  root.classList.add("scenes-on");
  document.querySelectorAll<HTMLElement>("[data-words]").forEach(splitWords);
  scenes.forEach((scene) => {
    paint(scene);
    observer.observe(scene);
  });
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function disable() {
  if (!on) return;
  on = false;
  root.classList.remove("scenes-on");
  observer?.disconnect();
  near.clear();
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  scenes.forEach((scene) => {
    scene.style.removeProperty("--p");
    scene.style.removeProperty("--x");
    last.delete(scene);
    scene.querySelectorAll(".is-active").forEach((step) => step.classList.remove("is-active"));
  });
}

function sync() {
  if (reduce.matches) disable();
  else enable();
}

reduce.addEventListener("change", sync);
sync();
