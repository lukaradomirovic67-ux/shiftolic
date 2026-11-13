// Compare browser-normalized CSS rules of two custom-code blocks (JS disabled).
const { chromium } = require('playwright'); const fs = require('fs');
const [a, b] = process.argv.slice(2);
(async () => {
  const br = await chromium.launch();
  async function rules(file) {
    const ctx = await br.newContext({ javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.setContent('<!doctype html><html><head>' + fs.readFileSync(file, 'utf8') + '</head><body></body></html>');
    const r = await p.evaluate(() => {
      const out = [];
      function walk(list, pre) { for (const r of list) { if (r.cssRules && !(r instanceof CSSStyleRule)) { walk(r.cssRules, pre + (r.conditionText || r.name || r.type) + ' | '); } else out.push(pre + r.cssText); } }
      for (const s of document.styleSheets) walk(s.cssRules, '');
      return out;
    });
    await ctx.close(); return r;
  }
  const A = await rules(a), B = await rules(b);
  console.log('rules original', A.length, 'minified', B.length);
  let diffs = 0;
  const n = Math.max(A.length, B.length);
  for (let i = 0; i < n; i++) if (A[i] !== B[i]) { if (diffs < 15) console.log('DIFF', i, '\n  A:', (A[i]||'').slice(250, 700), '\n  B:', (B[i]||'').slice(250, 700)); diffs++; }
  console.log('total diffs', diffs);
  const sa = new Set(A), sb = new Set(B);
  console.log('only in original:', [...sa].filter(x => !sb.has(x)).length, ' only in minified:', [...sb].filter(x => !sa.has(x)).length);
  await br.close();
})();
