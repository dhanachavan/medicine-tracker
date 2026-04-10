#!/usr/bin/env bash
set -euo pipefail

echo "== Test runner auto-detect (best-effort, safe mode) =="

have() { command -v "$1" >/dev/null 2>&1; }

# Run command but never fail the whole script (Option A)
run_step() {
  local name="$1"; shift
  echo ""
  echo "---- $name ----"
  echo "+ $*"
  set +e
  "$@"
  local rc=$?
  set -e
  if [[ $rc -ne 0 ]]; then
    echo "Result: $name => FAIL (exit $rc)"
  else
    echo "Result: $name => PASS"
  fi
  return 0
}

skip_step() {
  echo "Result: $1 => SKIP ($2)"
  return 0
}

# Limit number of projects to avoid runaway runtime in large monorepos
MAX_PROJECTS="${MAX_PROJECTS:-20}"

# Find candidate project directories (best-effort, common markers)
mapfile -t PROJECT_DIRS < <(
  {
    # Node
    find . -name package.json -not -path "*/node_modules/*" -print0 2>/dev/null | xargs -0 -n1 dirname
    # Python
    find . \( -name pyproject.toml -o -name requirements.txt -o -name setup.py \) -not -path "*/.venv/*" -print0 2>/dev/null | xargs -0 -n1 dirname
    # .NET
    find . \( -name "*.sln" -o -name "*.csproj" -o -name "*.fsproj" \) -print0 2>/dev/null | xargs -0 -n1 dirname
    # Java Maven / Gradle
    find . -name pom.xml -print0 2>/dev/null | xargs -0 -n1 dirname
    find . \( -name build.gradle -o -name build.gradle.kts -o -name gradlew \) -print0 2>/dev/null | xargs -0 -n1 dirname
    # Go
    find . -name go.mod -print0 2>/dev/null | xargs -0 -n1 dirname
    # Rust
    find . -name Cargo.toml -print0 2>/dev/null | xargs -0 -n1 dirname
    # Ruby
    find . -name Gemfile -print0 2>/dev/null | xargs -0 -n1 dirname
    # PHP
    find . -name composer.json -print0 2>/dev/null | xargs -0 -n1 dirname
    # PowerShell tests
    find . -name "*.Tests.ps1" -print0 2>/dev/null | xargs -0 -n1 dirname
  } | sed 's|^\./||' | sort -u | head -n "${MAX_PROJECTS}"
)

if [[ ${#PROJECT_DIRS[@]} -eq 0 ]]; then
  echo "No known project markers found. Skipping test execution."
  exit 0
fi

echo "Detected candidate project directories (max ${MAX_PROJECTS}):"
printf -- "- %s\n" "${PROJECT_DIRS[@]}"

for dir in "${PROJECT_DIRS[@]}"; do
  echo ""
  echo "=============================="
  echo "Project: ${dir:-.}"
  echo "=============================="

  pushd "${dir:-.}" >/dev/null || continue

  # --------------------------
  # Node.js / JavaScript / TypeScript
  # --------------------------
  if [[ -f "package.json" ]]; then
    echo "Detected: Node.js"
    if have node && (have npm || have pnpm || have yarn); then
      # Install deps safely (ignore lifecycle scripts)
      if [[ -f "package-lock.json" ]] && have npm; then
        run_step "npm ci (safe)" npm ci --ignore-scripts
      elif [[ -f "pnpm-lock.yaml" ]] && have pnpm; then
        run_step "pnpm install (safe)" pnpm install --frozen-lockfile --ignore-scripts
      elif [[ -f "yarn.lock" ]] && have yarn; then
        run_step "yarn install" yarn install --immutable
      elif have npm; then
        run_step "npm install (safe)" npm install --ignore-scripts
      else
        skip_step "node install" "no package manager found"
      fi

      # Run tests only if a test script exists
      if node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)"; then
        if have npm; then run_step "npm test" npm test --silent
        elif have pnpm; then run_step "pnpm test" pnpm test
        elif have yarn; then run_step "yarn test" yarn test
        fi
      else
        skip_step "node tests" "no test script in package.json"
      fi
    else
      skip_step "node tests" "node/package manager not available"
    fi
  fi

  # --------------------------
  # Python
  # --------------------------
  if [[ -f "pyproject.toml" || -f "requirements.txt" || -f "setup.py" ]]; then
    echo "Detected: Python"
    if have python3; then
      run_step "python version" python3 --version

      # Install only if explicit requirements exist; otherwise best-effort editable install
      if [[ -f "requirements.txt" ]]; then
        run_step "pip install -r requirements.txt" python3 -m pip install -r requirements.txt
      elif [[ -f "pyproject.toml" ]]; then
        run_step "pip install -e . (best-effort)" python3 -m pip install -e . || true
      fi

      # Prefer pytest if present, else fallback to unittest
      if [[ -d "tests" || -f "pytest.ini" || -f "pyproject.toml" ]]; then
        if python3 -c "import pytest" >/dev/null 2>&1; then
          run_step "pytest" python3 -m pytest -q
        else
          run_step "unittest (fallback)" python3 -m unittest discover -v || true
        fi
      else
        skip_step "python tests" "no tests/ or pytest config"
      fi
    else
      skip_step "python tests" "python3 not available"
    fi
  fi

  # --------------------------
  # .NET
  # --------------------------
  if compgen -G "*.sln" > /dev/null || compgen -G "*.csproj" > /dev/null || compgen -G "*.fsproj" > /dev/null; then
    echo "Detected: .NET"
    if have dotnet; then
      run_step "dotnet restore" dotnet restore
      run_step "dotnet test" dotnet test --configuration Release --verbosity minimal
    else
      skip_step "dotnet tests" "dotnet not available"
    fi
  fi

  # --------------------------
  # Java (Maven)
  # --------------------------
  if [[ -f "pom.xml" ]]; then
    echo "Detected: Maven"
    if have mvn; then
      run_step "mvn test" mvn -q -DskipITs=true test
    else
      skip_step "mvn test" "mvn not available"
    fi
  fi

  # --------------------------
  # Java (Gradle)
  # --------------------------
  if [[ -f "gradlew" || -f "build.gradle" || -f "build.gradle.kts" ]]; then
    echo "Detected: Gradle"
    if [[ -f "./gradlew" ]]; then
      chmod +x ./gradlew || true
      run_step "gradle test" ./gradlew test --no-daemon
    elif have gradle; then
      run_step "gradle test" gradle test --no-daemon
    else
      skip_step "gradle test" "gradle not available"
    fi
  fi

  # --------------------------
  # Go
  # --------------------------
  if [[ -f "go.mod" ]]; then
    echo "Detected: Go"
    if have go; then
      run_step "go test ./..." go test ./... -count=1
    else
      skip_step "go test" "go not available"
    fi
  fi

  # --------------------------
  # Rust
  # --------------------------
  if [[ -f "Cargo.toml" ]]; then
    echo "Detected: Rust"
    if have cargo; then
      run_step "cargo test" cargo test --all --quiet
    else
      skip_step "cargo test" "cargo not available"
    fi
  fi

  # --------------------------
  # Ruby
  # --------------------------
  if [[ -f "Gemfile" ]]; then
    echo "Detected: Ruby"
    if have ruby && have bundle; then
      run_step "bundle install" bundle install --jobs 4 --retry 3
      if [[ -d "spec" ]]; then
        run_step "rspec" bundle exec rspec
      elif [[ -d "test" ]]; then
        run_step "rake test" bundle exec rake test || true
      else
        skip_step "ruby tests" "no spec/ or test/"
      fi
    else
      skip_step "ruby tests" "ruby/bundle not available"
    fi
  fi

  # --------------------------
  # PHP
  # --------------------------
  if [[ -f "composer.json" ]]; then
    echo "Detected: PHP"
    if have php && have composer; then
      run_step "composer install" composer install --no-interaction --no-progress
      if [[ -f "phpunit.xml" || -f "phpunit.xml.dist" ]]; then
        run_step "phpunit" vendor/bin/phpunit || true
      else
        skip_step "phpunit" "no phpunit config"
      fi
    else
      skip_step "php tests" "php/composer not available"
    fi
  fi

  # --------------------------
  # PowerShell (Pester)
  # --------------------------
  if compgen -G "*.Tests.ps1" > /dev/null 2>&1; then
    echo "Detected: PowerShell tests"
    if have pwsh; then
      run_step "pester (if installed)" pwsh -NoProfile -Command "if (Get-Module -ListAvailable Pester) { Invoke-Pester -CI } else { Write-Host 'Pester not installed'; exit 0 }"
    else
      skip_step "pester" "pwsh not available"
    fi
  fi

  popd >/dev/null || true
done

echo ""
echo "== Test runner auto-detect finished (best-effort) =="
exit 0