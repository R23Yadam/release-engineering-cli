import { execSync } from "node:child_process";
import type { Gate } from "./types";

export const gitCleanGate: Gate = {
  name: "git-clean",
  async run() {
    try {
      // If there are changes, this outputs text. Empty means clean.
      const out = execSync("git status --porcelain", { encoding: "utf8" }).trim();

      if (out.length > 0) {
        return { ok: false, message: "Uncommitted changes found. Commit or stash first." };
      }

      return { ok: true };
    } catch {
      return { ok: false, message: "Git not available or not a git repo." };
    }
  },
};

