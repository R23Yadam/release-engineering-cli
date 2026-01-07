import { enabledPlugins } from "./plugins";
import type { Gate } from "./gates/types";
import { loadWorkspace } from "./workspace";
import { appendMetric } from "./metrics";
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
    const started = Date.now();

    console.log(`[release] start (${service})`);
    console.log("[release] dryRun:", opts.dryRun);

    const gates: Gate[] = enabledPlugins.flatMap(p => p.gates);

    for (const gate of gates) {
      console.log(`[gate] ${gate.name}...`);
      const res = await gate.run({ ...opts, service });

      if (!res.ok) {
        console.log(`[gate] ${gate.name}: FAIL`);
        console.log("[release] stopped:", res.message);

        appendMetric(rootDir, {
          ts: new Date().toISOString(),
          service,
          dryRun: opts.dryRun,
          result: "fail",
          failedGate: gate.name,
          message: res.message,
          durationMs: Date.now() - started,
        });

        process.exitCode = 1;
        return;
      }

      console.log(`[gate] ${gate.name}: OK`);
    }

    appendMetric(rootDir, {
      ts: new Date().toISOString(),
      service,
      dryRun: opts.dryRun,
      result: "success",
      durationMs: Date.now() - started,
    });

    console.log(`[release] done (${service})`);
  }
}

