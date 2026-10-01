// A finite explanation of a fixed example, not a second timer product.
const ticket = document.querySelector<HTMLElement>("[data-shift-ticket]");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const saveData = Boolean(
  (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData,
);
let paused = document.documentElement.hasAttribute("data-demos-paused");
const arrivals = new Map<HTMLElement, Animation>();
const entranceEase = getComputedStyle(document.documentElement)
  .getPropertyValue("--ease-out")
  .trim();

if (ticket) {
  const fill = ticket.querySelector<HTMLElement>("[data-shift-fill]");
  const now = ticket.querySelector<HTMLElement>("[data-shift-now]");
  const left = ticket.querySelector<HTMLElement>("[data-shift-left]");
  const replay = ticket.querySelector<HTMLButtonElement>("[data-shift-replay]");
  const duration = 12000;
  let visible = false;
  let animation: Animation | null = null;
  let timer = 0;
  let finished = false;

  function clock(minutes: number) {
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }

  function paintTime() {
    if (!now || !left) return;
    const elapsed =
      typeof animation?.currentTime === "number" ? animation.currentTime : 0;
    const minutes = Math.min(240, Math.floor((elapsed / duration) * 240));
    now.textContent = clock(13 * 60 + minutes);
    left.textContent = clock(240 - minutes);
  }

  function tick() {
    window.clearTimeout(timer);
    paintTime();
    if (animation?.playState === "running")
      timer = window.setTimeout(tick, 500);
  }

  function staticDay() {
    window.clearTimeout(timer);
    animation?.cancel();
    animation = null;
    finished = false;
    if (fill) fill.style.transform = "scaleX(0.5)";
    if (now) now.textContent = "13:00";
    if (left) left.textContent = "04:00";
  }

  function sync() {
    const staticOnly =
      motion.matches || saveData || !fill || typeof fill.animate !== "function";
    if (replay) replay.hidden = staticOnly;
    if (staticOnly) {
      staticDay();
      return;
    }
    if (paused || !visible || document.hidden) {
      animation?.pause();
      window.clearTimeout(timer);
      if (animation) paintTime();
      return;
    }
    if (finished) return;
    if (!animation) {
      const run = fill.animate(
        [{ transform: "scaleX(0.5)" }, { transform: "scaleX(1)" }],
        { duration, easing: "linear", fill: "both" },
      );
      animation = run;
      run.onfinish = () => {
        if (animation !== run) return;
        finished = true;
        window.clearTimeout(timer);
        paintTime();
      };
    } else animation.play();
    tick();
  }

  replay?.addEventListener("click", () => {
    staticDay();
    sync();
  });
  document.addEventListener("doneat:media", (event) => {
    paused = (event as CustomEvent<{ paused: boolean }>).detail.paused;
    sync();
  });
  document.addEventListener("visibilitychange", sync);
  motion.addEventListener("change", sync);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        visible = Boolean(entries[0]?.isIntersecting);
        sync();
      },
      { threshold: 0.15 },
    ).observe(ticket);
  }
  // Without an observer the fixed example remains static.
  sync();
}

// Chapters are fully visible without JS. Motion adds one brief entrance;
// it never gates reading or keyboard access, and it never repeats on scroll.
if ("IntersectionObserver" in window) {
  const seen = new WeakSet<HTMLElement>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        const element = entry.target as HTMLElement;
        if (!entry.isIntersecting) {
          arrivals.get(element)?.finish();
          return;
        }
        if (seen.has(element)) return;
        seen.add(element);
        if (
          motion.matches ||
          saveData ||
          paused ||
          document.hidden ||
          typeof element.animate !== "function" ||
          !entranceEase
        ) {
          observer.unobserve(element);
          return;
        }
        const animation = element.animate(
          [
            { opacity: 0.5, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 600,
            delay: Math.min(index, 2) * 60,
            fill: "backwards",
            easing: entranceEase,
          },
        );
        arrivals.set(element, animation);
        animation.onfinish = () => {
          arrivals.delete(element);
          observer.unobserve(element);
        };
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
  );
  document
    .querySelectorAll<HTMLElement>("[data-story-reveal]")
    .forEach((element) => observer.observe(element));
}

function finishArrivals() {
  arrivals.forEach((animation) => animation.finish());
}
document.addEventListener("doneat:media", (event) => {
  paused = (event as CustomEvent<{ paused: boolean }>).detail.paused;
  if (paused) finishArrivals();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) finishArrivals();
});
motion.addEventListener("change", () => {
  if (motion.matches) finishArrivals();
});
document.addEventListener("focusin", (event) => {
  if (event.target instanceof Element) {
    const group = event.target.closest<HTMLElement>("[data-story-reveal]");
    if (group) arrivals.get(group)?.finish();
  }
});
