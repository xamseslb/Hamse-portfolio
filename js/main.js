/* ================================================
   HAMSE PORTFOLIO — main.js
   Scroll-driven card animation (Austin Serb style)
   ================================================ */

/* ----------------------------------------------------------------
   SCROLL-DRIVEN MOCKUP SPREAD
   The hero-pin section is 220vh tall.
   The hero-sticky inside it stays fixed while you scroll.
   We calculate a [0…1] progress through the scroll zone and
   continuously interpolate each card's transform –
   exactly like Austin Serb's site.
   ---------------------------------------------------------------- */
(function initScrollCards() {
  const pin = document.getElementById('hero-pin');
  const back = document.querySelector('.mock-back');
  const mid = document.querySelector('.mock-mid');
  const front = document.querySelector('.mock-front');

  if (!pin || !back) return;

  /* Linear interpolation */
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* Smooth ease-in-out */
  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  /* Initial state (t = 0) — stacked/rotated */
  const init = {
    back: { rx: 7, tx: 0, ty: 0, scale: 1, opacity: 0.65 },
    mid: { rx: 2, tx: 0, ty: 0, scale: 1, opacity: 0.82 },
    front: { rx: -4, tx: 0, ty: 0, scale: 1, opacity: 1 }
  };

  /* End state (t = 1) — fanned-out / spreading toward grid */
  const end = {
    back: { rx: 18, tx: 200, ty: 160, scale: 0.88, opacity: 0.95 },
    mid: { rx: 0, tx: 0, ty: 200, scale: 0.95, opacity: 1 },
    front: { rx: -18, tx: -200, ty: 160, scale: 0.88, opacity: 0.95 }
  };

  function applyCard(el, s, e, t) {
    const p = ease(t);
    const rx = lerp(s.rx, e.rx, p);
    const tx = lerp(s.tx, e.tx, p);
    const ty = lerp(s.ty, e.ty, p);
    const sc = lerp(s.scale, e.scale, p);
    const op = lerp(s.opacity, e.opacity, p);
    el.style.transform = `rotate(${rx}deg) translate(${tx}px, ${ty}px) scale(${sc})`;
    el.style.opacity = op;
  }

  let ticking = false;
  let lastProgress = -1;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = pin.getBoundingClientRect();
        const pinHeight = pin.offsetHeight;
        const scrolled = Math.max(0, -rect.top);              // px scrolled into pin
        const zone = pinHeight - window.innerHeight;      // total scroll zone
        const raw = Math.min(1, scrolled / zone);

        if (Math.abs(raw - lastProgress) > 0.0005) {          // only update if changed
          lastProgress = raw;
          applyCard(back, init.back, end.back, raw);
          applyCard(mid, init.mid, end.mid, raw);
          applyCard(front, init.front, end.front, raw);
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ---- Footer Word Swap ---- */
(function initWordSwap() {
  const words = ['build', 'create', 'design', 'ship'];
  const container = document.getElementById('swap-word');
  if (!container) return;

  const dummy = document.createElement('span');
  dummy.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-weight:900;font-size:inherit;font-family:inherit;';
  document.body.appendChild(dummy);
  let maxWidth = 0;
  words.forEach(w => { dummy.textContent = w; maxWidth = Math.max(maxWidth, dummy.offsetWidth); });
  document.body.removeChild(dummy);
  container.style.width = maxWidth + 'px';

  let current = 0;

  function createWordEl(text, active) {
    const el = document.createElement('span');
    el.className = 'swap-word' + (active ? ' active' : '');
    el.textContent = text;
    return el;
  }

  container.appendChild(createWordEl(words[0], true));

  setInterval(() => {
    const prev = container.querySelector('.swap-word.active');
    if (prev) { prev.classList.remove('active'); prev.classList.add('exit'); setTimeout(() => prev.remove(), 400); }
    current = (current + 1) % words.length;
    const next = createWordEl(words[current], false);
    container.appendChild(next);
    requestAnimationFrame(() => requestAnimationFrame(() => next.classList.add('active')));
  }, 2200);
})();


/* ---- Scroll Fade-In ---- */
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el, i) => { el.style.transitionDelay = `${i * 0.06}s`; obs.observe(el); });
  setTimeout(() => els.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
  }), 100);
})();


/* ---- Nav active state ---- */
(function initNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (path.endsWith(link.getAttribute('href'))) link.classList.add('active');
  });
})();
