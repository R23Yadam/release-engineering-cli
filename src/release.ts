import { defaultGates } from "./gates";

export type ReleaseOptions = {
  service: string;
  dryRun: boolean;
};

export async function runRelease(opts: ReleaseOptions): Promise<void> {
  console.log("[release] start");
  console.log("[release] service:", opts.service);
  console.log("[release] dryRun:", opts.dryRun);

  for (const gate of defaultGates) {
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

