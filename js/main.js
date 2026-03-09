/* ================================================
   HAMSE PORTFOLIO — main.js
   ================================================ */

/* ---- Mockup Stack: Click + Scroll-to-Spread ---- */
(function initMockupSpread() {
  const stack = document.getElementById('mockup-stack');
  const projects = document.getElementById('projects');
  if (!stack) return;

  function spreadAndScrollToProjects() {
    stack.classList.add('spread');
    // Scroll to projects section after animation starts
    if (projects) {
      setTimeout(() => {
        projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  // Click on the stack: fan out + scroll down
  stack.addEventListener('click', spreadAndScrollToProjects);

  // Scroll-triggered: spread when projects section enters view
  if (projects) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            stack.classList.add('spread');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(projects);
  }

  // Also: progressive scroll-tilt as user scrolls down hero
  window.addEventListener('scroll', () => {
    if (stack.classList.contains('spread')) return;
    const progress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
    if (progress > 0.1) {
      const back = stack.querySelector('.mock-back');
      const mid = stack.querySelector('.mock-mid');
      const front = stack.querySelector('.mock-front');
      if (!back) return;
      back.style.transform = `rotate(${7 + progress * 9}deg)  translate(${progress * 60}px, ${progress * 20}px)`;
      mid.style.transform = `rotate(${2 - progress * 1}deg)  translateY(${progress * -15}px)`;
      front.style.transform = `rotate(${-4 - progress * 12}deg) translate(${progress * -60}px, ${progress * 20}px)`;
    }
  }, { passive: true });
})();

/* ---- Footer Word Swap Animation ---- */
(function initWordSwap() {
  const words = ['build', 'create', 'design', 'ship'];
  const container = document.getElementById('swap-word');
  if (!container) return;

  // Measure max width so container doesn't jump
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
    if (prev) {
      prev.classList.remove('active');
      prev.classList.add('exit');
      setTimeout(() => prev.remove(), 400);
    }
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
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });
  // Trigger visible for already-in-view items
  setTimeout(() => {
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
    });
  }, 100);
})();

/* ---- Nav active state ---- */
(function initNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (path.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
})();
