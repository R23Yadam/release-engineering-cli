import type { Plugin } from "./types";
import { gitCleanGate } from "../gates/gitClean";
import { alwaysPassGate } from "../gates/alwaysPass";

export const corePlugin: Plugin = {
  name: "core",
  gates: [
    gitCleanGate,
    alwaysPassGate,
  ],
};

