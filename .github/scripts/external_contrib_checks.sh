#!/usr/bin/env bash
set -euo pipefail

DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"
FINDINGS=0

git fetch origin "${DEFAULT_BRANCH}" --depth=1 >/dev/null 2>&1 || true
CHANGED=$(git diff --name-status "origin/${DEFAULT_BRANCH}...HEAD" || true)

echo "# External Contribution – Validation Summary"
echo ""

# --------------------------------------------------
# 1 — Changed files (always show, but compact)
# --------------------------------------------------
if [[ -n "${CHANGED}" ]]; then
  echo "**Changed files:**"
  echo '```'
  echo "${CHANGED}"
  echo '```'

  # Flag new files — these may duplicate existing assets
  NEW_FILES=$(echo "${CHANGED}" | grep -E '^A\s' || true)
  if [[ -n "${NEW_FILES}" ]]; then
    FINDINGS=$((FINDINGS + 1))
    echo ""
    echo "⚠️ **New files detected** — verify no similar asset already exists before merging."
  fi
  echo ""
else
  echo "No file changes detected compared to \`${DEFAULT_BRANCH}\`."
  echo ""
fi

# --------------------------------------------------
# 2 — Azure / Microsoft service references (only if found)
# --------------------------------------------------
AZURE_INDICATORS="azure|microsoft\.com|az\s|bicep|arm-template|azurerm|microsoft\.azure"
AZURE_HIT=$(echo "${CHANGED}" | grep -iE "${AZURE_INDICATORS}" || true)

if [[ -z "${AZURE_HIT}" ]]; then
  AZURE_HIT=$(git diff "origin/${DEFAULT_BRANCH}...HEAD" --unified=0 2>/dev/null \
    | grep -iE "${AZURE_INDICATORS}" | head -5 || true)
fi

if [[ -n "${AZURE_HIT}" ]]; then
  FINDINGS=$((FINDINGS + 1))
  echo "⚠️ **Azure / Microsoft service references detected** — verify against [Microsoft Learn](https://learn.microsoft.com)."
  echo '```'
  echo "${AZURE_HIT}" | head -10
  echo '```'
  echo ""
fi

# --------------------------------------------------
# 3 — Missing README (only if missing)
# --------------------------------------------------
if [[ ! -f "README.md" ]]; then
  FINDINGS=$((FINDINGS + 1))
  echo "⚠️ **README.md not found** — add one if this change affects usage or behavior."
  echo ""
fi

# --------------------------------------------------
# Summary
# --------------------------------------------------
if [[ ${FINDINGS} -eq 0 ]]; then
  echo "✅ No issues detected. This report is informational only and does not block merging."
else
  echo "---"
  echo "_${FINDINGS} item(s) flagged above. This report is informational only and does not block merging._"
fi