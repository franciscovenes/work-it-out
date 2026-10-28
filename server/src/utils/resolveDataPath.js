import path from "node:path";
import { fileURLToPath } from "node:url";

export function resolveDataPath() {
  const dataFile = process.env.DATA_FILE;

  return dataFile
    ? dataFile
    : path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "../data/routine.json",
      );
}
