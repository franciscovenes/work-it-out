export async function parseJSONBody(req) {
  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk;
    }

    return JSON.parse(body);
  } catch (error) {
    if (error instanceof SyntaxError) {
      const jsonError = new Error(`Invalid JSON format: ${error.message}`);
      jsonError.code = "INVALID_JSON";
      throw jsonError;
    }

    throw error;
  }
}
