import fs from "node:fs";
import path from "node:path";

export type Service = {
  name: string;
  path: string;
};

export type Workspace = {
  services: Service[];
};

export function loadWorkspace(rootDir: string): Workspace {
  const file = path.join(rootDir, "workspace.json");

  if (!fs.existsSync(file)) {
    throw new Error("workspace.json not found");
  }

  const raw = fs.readFileSync(file, "utf8");
  const parsed = JSON.parse(raw) as Workspace;

  if (!Array.isArray(parsed.services)) {
    throw new Error("workspace.json must contain services[]");
  }

  return parsed;
}

