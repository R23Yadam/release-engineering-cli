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
