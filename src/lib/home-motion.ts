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
