import { enabledPlugins } from "./plugins";
import type { Gate } from "./gates/types";
import path from "node:path";
import { loadWorkspace } from "./workspace";

export type ReleaseOptions = {
  service?: string;
  all: boolean;
  dryRun: boolean;
};

export async function runRelease(opts: ReleaseOptions): Promise<void> {
  const rootDir = process.cwd();
  const services: string[] = [];

  if (opts.all) {
    const ws = loadWorkspace(rootDir);
    services.push(...ws.services.map(s => s.name));
  } else {
    services.push(opts.service!);
  }

  for (const service of services) {
    console.log(`[release] start (${service})`);
    console.log("[release] dryRun:", opts.dryRun);

    const gates: Gate[] = enabledPlugins.flatMap(p => p.gates);

    for (const gate of gates) {
      console.log(`[gate] ${gate.name}...`);
      const res = await gate.run({ ...opts, service });

      if (!res.ok) {
        console.log(`[gate] ${gate.name}: FAIL`);
        console.log("[release] stopped:", res.message);
        process.exitCode = 1;
        return;
      }

      console.log(`[gate] ${gate.name}: OK`);
    }

    console.log(`[release] done (${service})`);
  }
}

