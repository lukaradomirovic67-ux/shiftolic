/* Nues a11y fixes. Deployed as the registered site script "nuesA11yFixes" 1.0.1 (footer, all pages): the deployed copy is
   a11y-fixes.min.js (registered inline scripts are limited to 2000 characters). Fixes axe "nested-interactive":
   1. Navbar Services / Resources: the Webflow dropdown toggle (role=button) held the label link.
      Desktop with a mouse: the link is the only control. The toggle loses role=button, its aria attributes and its tab
      stop; the link gets aria-haspopup / aria-controls / aria-expanded (kept in sync with the toggle's w--open class).
      Enter on the link opens the page, Space opens the menu, Escape closes it, hover works as before.
      Mobile menu: the toggle stays the button (a tap on the label opens the menu, as before); the label, which does
      not navigate there, loses its href (kept in data-nh and put back on desktop) and gets role="none", so Lighthouse
      "Links are not crawlable" does not count it as a broken link (1.0.1; removed again on desktop).
   2. Home "Every project" gallery: the side screens were buttons inside the gallery button. They stay clickable with
      a mouse; keyboard users open the gallery and move between screens inside it.
   setAttribute only runs when the value changes and removeAttribute on a missing attribute records nothing, so the
   MutationObserver does not loop. */
(function () {
  var D = matchMedia('(min-width: 992px) and (hover: hover)'),
    R = ['aria-haspopup', 'aria-controls', 'aria-expanded'],
    g = (e, k) => e.getAttribute(k),
    s = (e, k, v) => { if (g(e, k) !== v) e.setAttribute(k, v); },
    x = (e, k) => e.removeAttribute(k);
  function N() {
    document.querySelectorAll('.navbar2_dropdwn-toggle.w-dropdown-toggle').forEach((t) => {
      var a = t.querySelector('.navbar2_toggle-link');
      if (!a) return;
      t._c = t._c || g(t, 'aria-controls');
      function P() {
        var o = t.classList.contains('w--open') ? 'true' : 'false';
        if (D.matches) {
          x(t, 'role'); s(t, 'tabindex', '-1'); R.forEach((k) => x(t, k)); x(a, 'role');
          if (!a.hasAttribute('href') && a.dataset.nh) s(a, 'href', a.dataset.nh);
          x(a, 'tabindex'); s(a, 'aria-haspopup', 'menu');
          if (t._c) s(a, 'aria-controls', t._c);
          s(a, 'aria-expanded', o);
        } else {
          s(t, 'role', 'button'); s(t, 'tabindex', '0'); s(t, 'aria-haspopup', 'menu');
          if (t._c) s(t, 'aria-controls', t._c);
          s(t, 'aria-expanded', o);
          R.forEach((k) => x(a, k));
          if (a.hasAttribute('href')) { a.dataset.nh = g(a, 'href'); x(a, 'href'); }
          s(a, 'role', 'none');
          x(a, 'tabindex');
        }
      }
      P();
      if (!t._a) {
        t._a = 1;
        new MutationObserver(P).observe(t, { attributes: true, attributeFilter: ['role', 'tabindex', 'class'].concat(R) });
        t.addEventListener('focus', () => { if (D.matches) a.focus({ preventScroll: true }); });
      }
    });
  }
  function G() {
    document.querySelectorAll('[data-project-gallery] .home-projects_screen-frame[role="button"]')
      .forEach((f) => ['role', 'tabindex', 'aria-label'].forEach((k) => x(f, k)));
  }
  function U() { N(); G(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(U, 0));
  else setTimeout(U, 0);
  addEventListener('load', U);
  if (D.addEventListener) D.addEventListener('change', U);
})();
