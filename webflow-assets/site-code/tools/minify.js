// Minify a Webflow custom-code block: drop HTML comments, minify inline <style> and <script> with esbuild.
const fs = require('fs'), esbuild = require('esbuild');
const [src, out, header] = process.argv.slice(2);
const html = fs.readFileSync(src, 'utf8');
const re = /(<!--[\s\S]*?-->)|(<style([^>]*)>([\s\S]*?)<\/style>)|(<script([^>]*)>([\s\S]*?)<\/script>)|(<link[^>]*>|<meta[^>]*>|<noscript>[\s\S]*?<\/noscript>)/g;
let m, parts = [], last = 0, rest = '';
const report = [];
while ((m = re.exec(html))) {
  rest += html.slice(last, m.index); last = re.lastIndex;
  if (m[1]) { report.push(['comment', m[1].length, 0]); continue; }
  if (m[2]) {
    const css = esbuild.transformSync(m[4], { loader: 'css', minify: true, target: ['chrome100', 'safari15', 'firefox100', 'edge100'] }).code.trim();
    const o = `<style${m[3]}>${css}</style>`; parts.push(o); report.push(['style', m[2].length, o.length]); continue;
  }
  if (m[5]) {
    const attrs = m[6];
    if (/\bsrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs)) { parts.push(m[5]); report.push(['script-src/json', m[5].length, m[5].length]); continue; }
    const js = esbuild.transformSync(m[7], { loader: 'js', minify: true, target: 'es2017' }).code.trim();
    const o = `<script${attrs}>${js}</script>`; parts.push(o); report.push(['script', m[5].length, o.length]); continue;
  }
  parts.push(m[8]); report.push(['tag', m[8].length, m[8].length]);
}
rest += html.slice(last);
if (rest.trim()) { console.error('UNPARSED TEXT OUTSIDE BLOCKS:', JSON.stringify(rest.trim().slice(0, 300))); }
const result = (header ? `<!-- ${header} -->\n` : '') + parts.join('\n') + '\n';
fs.writeFileSync(out, result);
let a = 0, b = 0; report.forEach(r => { a += r[1]; b += r[2]; });
console.log(JSON.stringify({ in: html.length, out: result.length, blocks: report.length }));
report.forEach((r, i) => console.log(i, r[0], r[1], '->', r[2]));
