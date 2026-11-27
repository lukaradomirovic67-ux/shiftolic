#!/bin/bash
# Rounds are at least 4 minutes apart: PSI returns a cached copy when the same URL is asked again within about a minute.
cd "$(dirname "$0")"
for r in 1 2 3; do
  t0=$(date +%s)
  python3 -I run-psi.py g1.txt g1-r$r 8 >> g1-r$r.log 2>&1
  python3 -I run-psi.py g1.txt g1-r$r 4 >> g1-r$r.log 2>&1
  echo "round $r: $(ls g1-r$r | wc -l) files, fails: $(grep -c FAIL g1-r$r.log)"
  if [ $r -lt 3 ]; then sleep $(( 240 - ($(date +%s) - t0) > 0 ? 240 - ($(date +%s) - t0) : 0 )); fi
done
