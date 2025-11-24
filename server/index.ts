import * as http from "http";
import injector from "./dependencies/injector";
import getController from "@/controllers/get_controller";
import postController from "@/controllers/post_controller";

// inject dependencies
const dependencies = injector();

/// https://github.com/FeelHippo/CORS_exploration/blob/main/server.js
http
  .createServer(async (request, response) => {
    switch (request.method) {
      case "GET":
        await getHandler(request, response);
        break;
      case "POST":
        await postHandler(request, response);
        break;
      case "OPTIONS":
        await optionsHandler(request, response);
        break;
    }
  })
  .listen(8080, () => console.info("Server running on port 8080"));

async function getHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse,
) {
  await new getController(
    response,
    dependencies.userDomain,
    new URL(`localhost:${request.url}`),
  ).processRequest();
}

async function postHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
    await new postController(
        response,
        dependencies.userDomain,
        new URL(`localhost:${request.url}`),
        await bodyParser(request),
    ).processRequest();
}

async function optionsHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  const { url, headers } = request;
  try {
    switch (url) {
      case "/preflight-request":
        response.writeHead(204, {
          Date: new Date().toISOString(),
          "Access-Control-Allow-Origin": headers["origin"],
          "Access-Control-Allow-Methods":
            headers["access-control-request-method"],
          "Access-Control-Allow-Headers":
            headers["access-control-request-headers"],
          "Access-Control-Max-Age": 86400,
          "Content-Type": headers["accept"],
          Vary: "Accept-Encoding, Origin",
          "Keep-Alive": "timeout=2, max=100",
          Connection: "Keep-Alive",
        });
        response.end();
        break;
      default:
        response.writeHead(404);
        response.end();
    }
  } catch (error) {
    console.error(error);
  }
}

async function bodyParser(request: http.IncomingMessage) {
  return new Promise((resolve, _reject) => {
    let body = "";
    request.on("data", (data) => (body += data));
    request.on("end", () => resolve(body));
    request.on("error", console.error);
  });
}
