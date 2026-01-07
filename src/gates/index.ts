import type { Gate } from "./types";
import { gitCleanGate } from "./gitClean";

export const defaultGates: Gate[] = [
  gitCleanGate,
];

