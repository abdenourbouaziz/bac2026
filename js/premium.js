/* ============================================================
   Bac 2026 Algérie — premium layer (additive)
   GSAP ScrollTrigger + canvas-confetti + Lucide icons.
   Does NOT own app.js state — visual layer only.
   All animations disabled under prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Lucide icons ---- */
  function renderIcons() {
    if (window.lucide) {
      try { lucide.createIcons(); } catch (e) { /* non-fatal */ }
    }
  }
  renderIcons();

  /* ---- Sticky header: shadow + scroll progress ---- */
  var header = document.querySelector('[data-header]');
  var progress = document.querySelector('[data-progress]');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Card spotlight (mouse-tracked gold wash) ---- */
  if (!reduced) {
    document.querySelectorAll('[data-spotlight]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  /* ---- Celebration confetti volley (once, tasteful) ---- */
  function volley(opts) {
    if (!window.confetti || reduced) return;
    try {
      confetti(Object.assign({
        particleCount: 80,
        spread: 100,
        startVelocity: 32,
        gravity: 0.9,
        scalar: 1.05,
        ticks: 180,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#e8c05c', '#f0d9a0', '#3ea06a', '#b98a2f', '#f5f0e4'],
        disableForReducedMotion: true
      }, opts || {}));
    } catch (e) { /* non-fatal */ }
  }
  setTimeout(function () { volley(); }, 700);

  /* ---- Micro-burst on primary CTAs ---- */
  document.querySelectorAll('[data-burst]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      volley({ particleCount: 28, spread: 65, startVelocity: 26, ticks: 110, scalar: 0.9, origin: { x: 0.5, y: 0.55 } });
    });
  });

  /* ---- Roving tabindex for workspace tabs (arrow keys) ---- */
  var tablist = document.querySelector('.tabs[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    tablist.addEventListener('keydown', function (e) {
      var idx = tabs.indexOf(document.activeElement);
      if (idx < 0) return;
      var rtl = document.documentElement.getAttribute('dir') === 'rtl';
      var next = null;
      if (e.key === 'ArrowRight') next = rtl ? idx - 1 : idx + 1;
      else if (e.key === 'ArrowLeft') next = rtl ? idx + 1 : idx - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      next = (next + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  }

  /* ---- GSAP: hero entrance + scroll reveals ---- */
  if (!window.gsap || reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero elements rise in sequence
  var heroEls = gsap.utils.toArray('[data-hero]');
  if (heroEls.length) {
    gsap.from(heroEls, {
      opacity: 0,
      y: 26,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.15,
      clearProps: 'all'
    });
  }

  // Below-fold reveal-once
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });
})();
