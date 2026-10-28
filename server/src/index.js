import http from "node:http";
import { handleGetRoutine, handlePostRoutine } from "./routes/routes.js";
import { sendError } from "./utils/sendError.js";
import { sendResponse } from "./utils/sendResponse.js";
import { parseJSONBody } from "./utils/parseJSONBody.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
  try {
    const { origin } = req.headers;

    if (origin === process.env.FRONTEND_URL) {
      res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    } else if (origin !== undefined) {
      return sendError(res, 403, "Forbidden origin");
    }

    if (req.url === "/api") {
      if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.statusCode = 204;
        return res.end();
      }

      if (req.method === "GET") {
        return await handleGetRoutine(res);
      }

      if (req.method === "POST") {
        return await handlePostRoutine(req, res);
      }
    }

    if (req.url !== "/api") {
      return sendError(res, 404, "Not Found");
    }

    return sendError(res, 405, "Method Not Allowed");
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return sendError(res, 500, "Internal Server Error");
    }
  }
});
server.listen(PORT, () => console.log(`Listening to server in PORT ${PORT}`));
