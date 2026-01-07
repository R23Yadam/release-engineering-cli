import { enabledPlugins } from "./plugins";
import type { Gate } from "./gates/types";

export type ReleaseOptions = {
  service: string;
  dryRun: boolean;
};

export async function runRelease(opts: ReleaseOptions): Promise<void> {
  console.log("[release] start");
  console.log("[release] service:", opts.service);
  console.log("[release] dryRun:", opts.dryRun);

  const gates: Gate[] = enabledPlugins.flatMap(p => p.gates);

  for (const gate of gates) {
    console.log(`[gate] ${gate.name}...`);
    const res = await gate.run(opts);

    if (!res.ok) {
      console.log(`[gate] ${gate.name}: FAIL`);
      console.log("[release] stopped:", res.message);
      process.exitCode = 1;
      return;
    }

    console.log(`[gate] ${gate.name}: OK`);
  }

  console.log("[release] done");
}

