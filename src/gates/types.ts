import type { ReleaseOptions } from "../release";

export type GateResult =
  | { ok: true }
  | { ok: false; message: string };

export type Gate = {
  name: string;
  run: (opts: ReleaseOptions) => Promise<GateResult>;
};

