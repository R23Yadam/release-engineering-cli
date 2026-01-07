import type { Gate } from "./types";

export const alwaysPassGate: Gate = {
  name: "always-pass",
  async run() {
    return { ok: true };
  },
};

