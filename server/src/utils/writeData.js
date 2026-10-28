import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

export async function writeData(content) {
  try {
    const pathJSON = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../data/routine.json",
    );

    await fs.writeFile(pathJSON, JSON.stringify(content, null, 2));
  } catch (error) {
    throw error;
  }
}
