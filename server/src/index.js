import http from "node:http";
import { handleGetRoutine, handlePostRoutine } from "./routes/routes.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
  console.log(req.headers);
  try {
    if (req.url === "/api") {
      if (req.method === "GET") {
        return await handleGetRoutine(res);
      } else if (req.method === "POST") {
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
