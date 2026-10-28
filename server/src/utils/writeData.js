import fs from "node:fs/promises";
import { resolveDataPath } from "./resolveDataPath.js";

export async function writeData(content) {
  try {
    const pathJSON = resolveDataPath();

    await fs.writeFile(pathJSON, JSON.stringify(content, null, 2));
  } catch (error) {
    throw error;
  }
}
