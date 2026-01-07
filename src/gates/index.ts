import type { Gate } from "./types";
import { gitCleanGate } from "./gitClean";
import { alwaysPassGate } from "./alwaysPass";

export const defaultGates: Gate[] = [
  gitCleanGate,
  alwaysPassGate,
];

