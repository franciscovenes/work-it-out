import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function getData() {
  try {
    const pathJSON = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../data/routine.json",
    );

    const data = await fs.readFile(pathJSON, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}
