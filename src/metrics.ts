import fs from "node:fs";
import path from "node:path";

export type MetricRecord = {
  ts: string;               // ISO time
  service: string;
  dryRun: boolean;
  result: "success" | "fail";
  failedGate?: string;
  message?: string;
  durationMs: number;
};

export function appendMetric(rootDir: string, rec: MetricRecord): void {
  const file = path.join(rootDir, "metrics.jsonl");
  fs.appendFileSync(file, JSON.stringify(rec) + "\n", "utf8");
}

