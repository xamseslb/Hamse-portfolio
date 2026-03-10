/* ================================================
   HAMSE PORTFOLIO — main.js
   GSAP ScrollTrigger: hero cards flow into grid
   ================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------------------------------
   CARD FLOW ANIMATION
   Hero cards start stacked on the right side of the hero section.
   GSAP pins the hero while scrubbing each card from its stacked
   position to the exact pixel center of its matching grid card.
   At 85% progress the hero cards fade out and grid cards fade in.
   ---------------------------------------------------------------- */
window.addEventListener('load', function () {

  const wrap0 = document.getElementById('wrap-0');
  const wrap1 = document.getElementById('wrap-1');
  const wrap2 = document.getElementById('wrap-2');
  const gridCard0 = document.getElementById('grid-card-0');
  const gridCard1 = document.getElementById('grid-card-1');
  const gridCard2 = document.getElementById('grid-card-2');

  if (!wrap0 || !gridCard0) return;

  /* Grid cards start invisible – GSAP reveals them at landing moment */
  gsap.set([gridCard0, gridCard1, gridCard2], { opacity: 0, visibility: 'visible' });

  function getCenter(el) {
    const r = el.getBoundingClientRect();
    return {
      cx: r.left + window.scrollX + r.width / 2,
      cy: r.top + window.scrollY + r.height / 2,
      w: r.width,
    };
  }

  function buildAnimation() {
    if (window.innerWidth < 900) {
      /* Mobile: just show the grid cards immediately */
      gsap.set([gridCard0, gridCard1, gridCard2], { opacity: 1 });
      return;
    }

    const hero = document.getElementById('hero-pin');

    /* Snapshot positions BEFORE any transforms */
    const s0 = getCenter(wrap0);
    const s1 = getCenter(wrap1);
    const s2 = getCenter(wrap2);

    const g0 = getCenter(gridCard0);
    const g1 = getCenter(gridCard1);
    const g2 = getCenter(gridCard2);

    const sc = g0.w / s0.w;  /* scale so card fills the grid slot */

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=120%',
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
        onLeave: function () {
          /* Safety: ensure grid cards are visible after pin releases */
          gsap.set([gridCard0, gridCard1, gridCard2], { opacity: 1 });
          gsap.set([wrap0, wrap1, wrap2], { opacity: 0 });
        },
        onLeaveBack: function () {
          /* When scrolling back up into view, reset to stacked */
          gsap.set([gridCard0, gridCard1, gridCard2], { opacity: 0 });
        },
      }
    });

    /* 0 → 1: all three hero cards fly to their target grid slots */
    tl.to(wrap0, { x: g0.cx - s0.cx, y: g0.cy - s0.cy, rotation: 0, scale: sc, ease: 'power2.inOut' }, 0)
      .to(wrap1, { x: g1.cx - s1.cx, y: g1.cy - s1.cy, rotation: 0, scale: sc, ease: 'power2.inOut' }, 0)
      .to(wrap2, { x: g2.cx - s2.cx, y: g2.cy - s2.cy, rotation: 0, scale: sc, ease: 'power2.inOut' }, 0)
      /* At 85%: crossfade hero cards → grid cards */
      .to([wrap0, wrap1, wrap2], { opacity: 0 }, 0.85)
      .to([gridCard0, gridCard1, gridCard2], { opacity: 1 }, 0.85);
  }

  buildAnimation();

  let rz;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
      gsap.set([wrap0, wrap1, wrap2], { clearProps: 'all' });
      gsap.set([gridCard0, gridCard1, gridCard2], { opacity: 0 });
      buildAnimation();
    }, 300);
  });

});


/* ---- Footer Word Swap ---- */
(function initWordSwap() {
  const words = ['build', 'create', 'design', 'ship'];
  const container = document.getElementById('swap-word');
  if (!container) return;

  const dummy = document.createElement('span');
  dummy.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-weight:900;font-size:inherit;font-family:inherit;';
  document.body.appendChild(dummy);
  let maxWidth = 0;
  words.forEach(function (w) { dummy.textContent = w; maxWidth = Math.max(maxWidth, dummy.offsetWidth); });
  document.body.removeChild(dummy);
  container.style.width = maxWidth + 'px';

  let current = 0;
  function mk(text, active) {
    const el = document.createElement('span');
    el.className = 'swap-word' + (active ? ' active' : '');
    el.textContent = text;
    return el;
  }
  container.appendChild(mk(words[0], true));

  setInterval(function () {
    const prev = container.querySelector('.swap-word.active');
    if (prev) { prev.classList.remove('active'); prev.classList.add('exit'); setTimeout(function () { prev.remove(); }, 400); }
    current = (current + 1) % words.length;
    const next = mk(words[current], false);
    container.appendChild(next);
    requestAnimationFrame(function () { requestAnimationFrame(function () { next.classList.add('active'); }); });
  }, 2200);
})();


/* ---- Scroll Fade-In (skip grid cards since GSAP controls them) ---- */
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in:not(.project-card):not(#grid-card-0):not(#grid-card-1):not(#grid-card-2)');
  if (!els.length) return;
  const obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(function (el, i) { el.style.transitionDelay = (i * 0.06) + 's'; obs.observe(el); });
  setTimeout(function () {
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
    });
  }, 200);
})();


/* ---- Nav active state ---- */
(function initNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (path.endsWith(link.getAttribute('href'))) link.classList.add('active');
  });
})();
