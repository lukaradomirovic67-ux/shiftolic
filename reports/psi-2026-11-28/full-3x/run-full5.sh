#!/bin/bash
# Full audit 27.11.2026 (after the green steps): 42 pages x 3 rounds, mobile + desktop. Rounds start at least 4 minutes apart (PageSpeed
# returns a cached copy when the same URL is asked again within about a minute). At the end every file must have its own
# fetchTime across the 3 rounds; copies are removed and measured again.
cd "$(dirname "$0")"
P=full5
for r in 1 2 3; do
  t0=$(date +%s)
  python3 -I run-psi.py all42.txt $P-r$r 8 >> $P-r$r.log 2>&1
  python3 -I run-psi.py all42.txt $P-r$r 4 >> $P-r$r.log 2>&1
  echo "round $r: $(ls $P-r$r | wc -l) files, fails: $(grep -c FAIL $P-r$r.log)"
  if [ $r -lt 3 ]; then w=$(( 240 - ($(date +%s) - t0) )); if [ $w -gt 0 ]; then sleep $w; fi; fi
done
for pass in 1 2; do
  n=$(python3 -I - "$P" <<'EOF'
import json, glob, os, sys
P = sys.argv[1]; removed = 0
for f in glob.glob(f'{P}-r1/*.json'):
    n = os.path.basename(f); seen = set()
    for r in (1, 2, 3):
        g = f'{P}-r{r}/{n}'
        if not os.path.exists(g): continue
        t = json.load(open(g)).get('lighthouseResult', {}).get('fetchTime')
        if t in seen: os.remove(g); removed += 1
        seen.add(t)
print(removed)
EOF
)
  echo "dedupe pass $pass: removed $n cached copies"
  [ "$n" = "0" ] && break
  sleep 70
  for r in 2 3; do python3 -I run-psi.py all42.txt $P-r$r 4 >> $P-r$r.log 2>&1; done
done
echo "final: $(ls $P-r1 | wc -l) / $(ls $P-r2 | wc -l) / $(ls $P-r3 | wc -l) files"
