# Release Engineering CLI

A small internal developer platform (IDP)–style CLI that enforces safe releases using **plugin-based gates**, supports **batch releases**, and records **release metrics**.

This project was built to learn and practice real-world release engineering patterns.

---

## What This Tool Does

- Runs **release gates** (checks) before allowing a release
- Supports **single-service** and **batch (`--all`)** releases
- Uses a **plugin system** to group and enable gates
- **Stops immediately** on unsafe conditions (fail-fast)
- Logs simple **DORA-style metrics** to a JSONL file

---

## Core Concepts

### Gates
A **gate** is a check that must pass before a release can continue.

Examples:
- Git repository must be clean
- Tests must pass (future extension)

If any gate fails, the release is blocked.

---

### Plugins
A **plugin** is a named collection of gates.

This allows:
- clean organization
- enabling/disabling sets of checks
- future team- or service-specific policies

---

### Workspace
A `workspace.json` file defines which services exist:

```json
{
  "services": [
    { "name": "api", "path": "services/api" },
    { "name": "web", "path": "services/web" }
  ]
}

````md
## Usage

### Single service (dry run)
```bash
npx tsx src/index.ts release --service api --dry-run
````

### All services

```bash
npx tsx src/index.ts release --all --dry-run
```

---

## Demo

### Clean repository (success)

```bash
npx tsx src/index.ts release --all --dry-run
```

**Expected:**

* all gates pass
* each service completes
* metrics are recorded

---

### Dirty repository (fails fast)

```bash
echo x >> tmp.txt
npx tsx src/index.ts release --all --dry-run
rm tmp.txt
```

**Expected:**

* git-clean gate fails
* release stops immediately
* failure is logged to metrics

---

## Metrics

Each service release appends one line to `metrics.jsonl`:

```json
{
  "ts": "2026-01-07T17:10:56Z",
  "service": "api",
  "dryRun": true,
  "result": "success",
  "durationMs": 10
}
```

Failure records also include:

* `failedGate`
* failure message

---

## Project Structure

```
src/
├─ index.ts        # CLI parsing
├─ release.ts      # Release engine
├─ gates/          # Individual release checks
├─ plugins/        # Gate groupings
├─ workspace.ts    # Loads workspace.json
├─ metrics.ts      # Metrics logging
```

---

## Design Choice

Batch releases (`--all`) are fail-fast by default.
The first failing gate stops the entire run to prevent unsafe partial releases.

This mirrors common real-world release practices.

---

## Why This Exists

This project was built to:

* understand release engineering fundamentals
* practice TypeScript CLI development
* explore plugin-based architectures used in internal platforms

It is intentionally minimal but realistic.

---

## Possible Extensions

* Continue-on-error mode for batch releases
* CI integration
* Additional gates (tests, lint, security)
* Metrics aggregation
* Installable binary

---






