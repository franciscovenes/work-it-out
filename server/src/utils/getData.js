import fs from "node:fs/promises";
import { resolveDataPath } from "./resolveDataPath.js";

export async function getData() {
  try {
    const pathJSON = resolveDataPath();

    const data = await fs.readFile(pathJSON, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}
