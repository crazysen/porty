const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function docTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

type ParallaxItem = { el: HTMLElement; factor: number; center: number };

const progressBar = document.getElementById("scroll-progress");
const fades = [...document.querySelectorAll<HTMLElement>("[data-scroll-fade]")];
const timelines = [...document.querySelectorAll<HTMLElement>("[data-timeline]")];
const mouseItems = finePointer
  ? [...document.querySelectorAll<HTMLElement>("[data-mouse]")].map((el) => ({
      el,
      strength: Number(el.dataset.mouse) || 10,
    }))
  : [];

let parallax: ParallaxItem[] = [];
const pointer = { x: 0, y: 0 };
const eased = { x: 0, y: 0 };
let frame = 0;

function measure() {
  parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")].map((el) => ({
    el,
    factor: Number(el.dataset.parallax) || 0,
    center: docTop(el) + el.offsetHeight / 2,
  }));
}

function request() {
  if (!frame) frame = requestAnimationFrame(update);
}

function update() {
  frame = 0;
  const y = window.scrollY;
  const vh = window.innerHeight;

  if (progressBar) {
    const max = document.documentElement.scrollHeight - vh;
    progressBar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;
  }

  if (reduceMotion) return;

  for (const item of parallax) {
    const offset = (y + vh / 2 - item.center) * item.factor;
    item.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  }

  for (const el of fades) {
    const t = clamp(y / (vh * 0.9));
    el.style.opacity = String(1 - t * 0.85);
    el.style.transform = `translate3d(0, ${(t * 70).toFixed(1)}px, 0) scale(${(1 - t * 0.05).toFixed(3)})`;
  }

  for (const el of timelines) {
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--progress", clamp((vh * 0.7 - rect.top) / rect.height).toFixed(3));
  }

  if (mouseItems.length) {
    eased.x += (pointer.x - eased.x) * 0.08;
    eased.y += (pointer.y - eased.y) * 0.08;
    for (const { el, strength } of mouseItems) {
      el.style.transform = `translate3d(${(eased.x * strength).toFixed(2)}px, ${(eased.y * strength).toFixed(2)}px, 0)`;
    }
    if (Math.abs(pointer.x - eased.x) > 0.001 || Math.abs(pointer.y - eased.y) > 0.001) request();
  }
}

function animateCount(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.countFrom ?? 0);
  const start = performance.now();
  const duration = 1400;

  const step = (now: number) => {
    const t = clamp((now - start) / duration);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(from + (to - from) * ease));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function setupCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  if (reduceMotion || !counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        animateCount(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => {
    el.textContent = el.dataset.countFrom ?? "0";
    observer.observe(el);
  });
}

function setupMagnetic() {
  if (reduceMotion || !finePointer) return;

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    let shiftX = 0;
    let shiftY = 0;

    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left - shiftX + rect.width / 2);
      const dy = event.clientY - (rect.top - shiftY + rect.height / 2);
      shiftX = clamp(dx * 0.3, -12, 12);
      shiftY = clamp(dy * 0.4, -8, 8);
      el.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0)`;
    });

    el.addEventListener("pointerleave", () => {
      shiftX = 0;
      shiftY = 0;
      el.style.transform = "";
    });
  });
}

measure();
request();
setupCounters();
setupMagnetic();

window.addEventListener("scroll", request, { passive: true });
window.addEventListener("resize", () => {
  measure();
  request();
});
new ResizeObserver(() => {
  measure();
  request();
}).observe(document.body);

if (mouseItems.length && !reduceMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      request();
    },
    { passive: true },
  );
}
