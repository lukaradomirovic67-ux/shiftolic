/* Nues: values that come from other Our Works fields (fields removed 7.11.).
   Website domain = Website link without https://, www. and the end slash:
   Home Every project gallery caption (data-gallery-domain) and the Our Work slider address bar (.ow-browser_host).
   Quote signature = first name + initial of Quote author ("Or Moshkovitz" -> "Or M.") on the case page. */
(function () {
  function host(u) { return (u || '').trim().replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, ''); }
  function run() {
    document.querySelectorAll('[data-gallery-domain]').forEach(function (e) { e.setAttribute('data-gallery-domain', host(e.getAttribute('data-gallery-domain'))); });
    document.querySelectorAll('.ow-browser_host').forEach(function (e) { e.textContent = host(e.textContent); });
    document.querySelectorAll('.cs-quote_sig').forEach(function (e) {
      var w = e.textContent.trim().split(/\s+/);
      if (w[0]) e.textContent = w.length > 1 ? w[0] + ' ' + w[w.length - 1].charAt(0) + '.' : w[0];
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();