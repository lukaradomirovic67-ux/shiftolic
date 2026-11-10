#!/bin/bash
# Lighthouse 13.6.0 baseline: every main page + one item per CMS template, mobile and desktop, 3 runs each.
# Raw reports are gzipped into the repo (reports/baseline/lighthouse/); a summary is built afterwards by summarise.py.
LH=/tmp/claude-0/-home-user-shiftolic/3e21adf4-9668-548d-ae08-4f83e596ee54/scratchpad/lh/node_modules/.bin/lighthouse
OUT=${OUT:-/home/user/shiftolic/reports/baseline/lighthouse}
BASE=https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io
export CHROME_PATH=/opt/pw-browsers/chromium
mkdir -p "$OUT"
PAGES="/ /about /services /services/design-development /services/webflow-development /services/seo-aeo /services/growth /our-work /pricing /lets-talk /careers /blog /resources /webflow-integrations /privacy-policy /terms-of-service /our-work/ballerine /blog/aeo-tools-in-2026-what-you-actually-need-to-optimize-for-ai-search"
for ff in mobile desktop; do
  for p in $PAGES; do
    slug=$(echo "${p#/}" | sed 's#/#__#g'); [ -z "$slug" ] && slug=home
    for run in 1 2 3; do
      f="$OUT/$slug--$ff--$run.json"
      [ -s "$f.gz" ] && continue
      extra=""; [ "$ff" = desktop ] && extra="--preset=desktop"
      timeout 300 "$LH" "$BASE$p" --quiet $extra --chrome-flags="--headless=new --no-sandbox" \
        --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$f" >/dev/null 2>&1
      [ -s "$f" ] && gzip -f "$f"
      echo "$(date +%H:%M:%S) $ff $p run$run $([ -s "$f.gz" ] && echo ok || echo FAIL)"
    done
  done
done
echo DONE
