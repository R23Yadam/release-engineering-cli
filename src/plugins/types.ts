import type { Gate } from "../gates/types";

export type Plugin = {
  name: string;
  gates: Gate[];
};

