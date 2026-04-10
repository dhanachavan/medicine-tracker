#!/usr/bin/env bash
set -euo pipefail

DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"

echo "# External Contribution – Validation Summary"
echo ""
echo "_This report provides guidance only. It does not block merging._"
echo ""

# --------------------------------------------------
# Test 1 — Description quality guidance
# --------------------------------------------------
echo "## 1️⃣ Description Quality"
echo ""
echo "- Ensure the pull request description clearly explains:"
echo "  - **Problem / motivation**: what issue or gap is being addressed"
echo "  - **What changed**: high‑level summary of the solution"
echo "  - **How tested**: commands run and results observed"
echo "  - **Documentation impact**: README updates or diagrams (if applicable)"
echo ""
echo "- If any of these are missing, reviewers may request clarification."
echo ""

# --------------------------------------------------
# Test 2 — Existing asset check guidance
# --------------------------------------------------
echo "## 2️⃣ Existing Asset Check"
echo ""

git fetch origin "${DEFAULT_BRANCH}" --depth=1 >/dev/null 2>&1 || true
CHANGED=$(git diff --name-status "origin/${DEFAULT_BRANCH}...HEAD" || true)

if [[ -z "${CHANGED}" ]]; then
  echo "- No file changes detected compared to \`${DEFAULT_BRANCH}\`."
else
  echo "Changed files:"
  echo '```'
  echo "${CHANGED}"
  echo '```'
  echo ""
  echo "Guidance:"
  echo "- For **new files or components**, check whether a similar asset already exists."
  echo "- Prefer **reuse or extension** over introducing a parallel implementation."
  echo "- If creating a new asset is intentional, briefly justify why reuse is not appropriate."
fi
echo ""

# --------------------------------------------------
# Test 3 — Microsoft Learn sanity guidance
# --------------------------------------------------
echo "## 3️⃣ Microsoft Learn Sanity Check"
echo ""
echo "- If this change references **Azure or Microsoft services**, validate key claims against:"
echo "  - Microsoft Learn"
echo "  - Official product documentation"
echo ""
echo "Guidance:"
echo "- Ensure service names, SKUs, limits, and feature behavior are current."
echo "- Avoid relying on deprecated features or preview behavior unless explicitly stated."
echo ""

# --------------------------------------------------
# Test 4 — Documentation & Mermaid guidance
# --------------------------------------------------
echo "## 4️⃣ Documentation Expectations"
echo ""

if [[ -f "README.md" ]]; then
  echo "- ✅ README.md exists."
else
  echo "- ❌ README.md not found."
  echo "  - Add a README or update existing docs if this change affects usage or behavior."
fi

echo ""
echo "Guidance:"
echo "- If the change alters **externally observable behavior**, update documentation accordingly."
echo "- Include a **Mermaid sequence diagram** only when it improves clarity for reviewers."
echo "- Diagrams should focus on **new or changed interactions**, not the entire system."
echo ""

echo "---"
echo "_End of external contribution guidance report_"
```