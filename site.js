/* Bipedal Press: site-wide script.

   1. Scroll reveal: sections fade in as you scroll (skipped for people who prefer reduced motion).
   2. GoatCounter: a free, cookie-free visitor counter. Your stats live at
      https://bipedalpress.goatcounter.com. The site code is set below; change it only
      if you rename your GoatCounter site. */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.reveal, .reveal-group');
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || calm) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      // reveal anything on screen, and anything the visitor already scrolled past
      if (en.isIntersecting || en.boundingClientRect.top < 0) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
});

(function () {
  var code = 'bipedalpress'; // your GoatCounter site code
  if (!code) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + code + '.goatcounter.com/count');
  document.head.appendChild(s);
})();
