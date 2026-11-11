/* RIDESHARE page script.
   1. Opens and closes the pop-up windows (teaser, countdown, newsletter, glovebox, author).
   2. Runs the cover reveal countdown. The date lives in index.html, on the element with id="countdown",
      in the data-reveal attribute. Use this form: 2026-11-20T00:00:00-05:00 (date, time, then the time zone offset;
      -05:00 is Eastern standard time). Leave it empty and the window says "Date coming soon". */

(function () {
  var body = document.body;
  var dialogs = document.querySelectorAll('dialog.rs-dialog');

  function anyOpen() {
    for (var i = 0; i < dialogs.length; i++) { if (dialogs[i].open) return true; }
    return false;
  }

  function openDialog(id) {
    var d = document.getElementById(id);
    if (!d) return;
    var frame = d.querySelector('iframe[data-src]');
    if (frame && !frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
    if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); }
    else { d.setAttribute('open', ''); }
    body.classList.add('rs-lock');
  }

  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { openDialog(b.getAttribute('data-open')); });
  });

  dialogs.forEach(function (d) {
    d.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () { if (d.close) d.close(); else d.removeAttribute('open'); });
    });
    d.addEventListener('click', function (e) { if (e.target === d && d.close) d.close(); });   // click outside
    d.addEventListener('close', function () {
      d.querySelectorAll('video').forEach(function (v) { v.pause(); });
      if (!anyOpen()) body.classList.remove('rs-lock');
    });
  });

  // Links like /books/rideshare/#teaser open a window straight away.
  var byHash = { '#teaser': 'dlg-teaser', '#countdown': 'dlg-count', '#newsletter': 'dlg-news', '#glovebox': 'dlg-glove', '#author': 'dlg-author', '#review': 'dlg-review' };
  function fromHash() { if (byHash[location.hash]) openDialog(byHash[location.hash]); }
  fromHash();
  window.addEventListener('hashchange', fromHash);

  // Countdown
  var cd = document.getElementById('countdown');
  if (!cd) return;
  var target = Date.parse(cd.getAttribute('data-reveal') || '');
  if (isNaN(target)) return;                                  // no date yet: keep the "coming soon" text
  var note = document.getElementById('cd-date');
  var sr = document.getElementById('cd-sr');
  var units = {};
  cd.querySelectorAll('[data-u]').forEach(function (n) { units[n.getAttribute('data-u')] = n; });
  var timer;

  try {
    note.textContent = new Date(target).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
  } catch (e) { note.textContent = 'Counting down'; }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var s = Math.floor((target - Date.now()) / 1000);
    if (s <= 0) {
      Object.keys(units).forEach(function (k) { units[k].textContent = '00'; });
      note.textContent = 'It is reveal day.';
      if (sr) sr.textContent = 'It is reveal day.';
      clearInterval(timer);
      return;
    }
    units.d.textContent = pad(Math.floor(s / 86400));
    units.h.textContent = pad(Math.floor(s % 86400 / 3600));
    units.m.textContent = pad(Math.floor(s % 3600 / 60));
    units.s.textContent = pad(s % 60);
    if (sr) sr.textContent = Math.floor(s / 86400) + ' days, ' + Math.floor(s % 86400 / 3600) + ' hours, and ' + Math.floor(s % 3600 / 60) + ' minutes until the cover reveal.';
  }
  tick();
  timer = setInterval(tick, 1000);
})();
