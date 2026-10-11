/* Bipedal Press: site-wide script.
   The only thing this does is switch on GoatCounter, a free, cookie-free visitor counter.

   To turn it on:
   1. Sign up at https://www.goatcounter.com and choose a site code (for example "bipedalpress").
   2. Paste that code between the quotes below, then commit this file.
   Until then, this file does nothing. */
(function () {
  var code = ''; // <- your GoatCounter code goes here, e.g. 'bipedalpress'
  if (!code) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + code + '.goatcounter.com/count');
  document.head.appendChild(s);
})();
