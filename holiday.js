// Hides holiday items on or after the date in data-hide-after (local time).
(function () {
  var now = new Date();
  document.querySelectorAll('[data-hide-after]').forEach(function (el) {
    var p = el.getAttribute('data-hide-after').split('-');
    var end = new Date(+p[0], +p[1] - 1, +p[2]);
    if (now >= end) { el.hidden = true; }
  });
})();
