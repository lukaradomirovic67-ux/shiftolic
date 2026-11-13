#!/bin/bash
# Lighthouse 13.6.0 audit 13.11.2026 (incl. Agentic Browsing): every public page, mobile and desktop, 1 run each, 2 lanes in parallel.
LH=/tmp/claude-0/-home-user-shiftolic/3e21adf4-9668-548d-ae08-4f83e596ee54/scratchpad/lh/node_modules/.bin/lighthouse
OUT=/home/user/shiftolic/reports/audit-2026-11-13/lighthouse
BASE=https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io
export CHROME_PATH=/opt/pw-browsers/chromium
mkdir -p "$OUT"
lane() { # $1 = form factor
  ff=$1
  while read -r p; do
    slug=$(echo "${p#/}" | sed 's#/#__#g'); [ -z "$slug" ] && slug=home
    f="$OUT/$slug--$ff.json"
    [ -s "$f.gz" ] && continue
    extra=""; [ "$ff" = desktop ] && extra="--preset=desktop"
    timeout 300 "$LH" "$BASE$p" --quiet $extra --chrome-flags="--headless=new --no-sandbox" \
      --only-categories=performance,accessibility,best-practices,seo,agentic-browsing --output=json --output-path="$f" >/dev/null 2>&1
    [ -s "$f" ] && gzip -f "$f"
    echo "$(date +%H:%M:%S) $ff $p $([ -s "$f.gz" ] && echo ok || echo FAIL)"
  done < /home/user/shiftolic/reports/audit-2026-11-13/urls.txt
}
lane mobile & lane desktop & wait
echo DONE
