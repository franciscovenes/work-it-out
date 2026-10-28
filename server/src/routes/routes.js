import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { sendError } from "../utils/sendError.js";
import { validateRoutine } from "../utils/validateRoutine.js";
import { writeData } from "../utils/writeData.js";

export async function handleGetRoutine(res) {
  const data = await getData();
  const responseContent = JSON.stringify(data);

  sendResponse(res, 200, "application/json; charset=utf-8", responseContent);
}

export async function handlePostRoutine(req, res) {
  try {
    const parsedBody = await parseJSONBody(req);

    const validation = validateRoutine(parsedBody);

    if (validation) {
      await writeData(parsedBody);
      sendResponse(
        res,
        201,
        "application/json; charset=utf-8",
        JSON.stringify(parsedBody),
      );
      return;
    }

    sendError(res, 400, "Routine validation failed");
  } catch (error) {
    if (error.code === "INVALID_JSON") {
      return sendError(res, 400, error.message);
    }

    return sendError(res, 500, "Internal server error");
  }
}
