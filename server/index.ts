import * as http from "http";
import injector from "./dependencies/injector";

// inject dependencies
const dependencies = injector();

/// https://github.com/FeelHippo/CORS_exploration/blob/main/server.js
http
  .createServer(async (request, response) => {
    switch (request.method) {
      case "POST":
        await postHandler(request, response);
        break;
      case "OPTIONS":
        await optionsHandler(request, response);
        break;
    }
  })
  .listen(8080, () => console.info("Server running on port 8080"));

async function postHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  const { url, headers } = request;
  const body = await bodyParser(request);
  try {
    switch (url) {
      case "/main-request":
        response.writeHead(200, {
          Date: new Date().toISOString(),
          "Access-Control-Allow-Origin": headers["origin"],
          "Content-Type": "text/plain",
          Vary: "Accept-Encoding, Origin",
          "Content-Encoding": "gzip",
          "Keep-Alive": "timeout=2, max=100",
          Connection: "Keep-Alive",
        });
        response.end(
          JSON.stringify({
            headers: headers,
            body: body,
          }),
        );
        break;
      default:
        response.writeHead(404);
        response.end();
    }
  } catch (error) {
    console.error(error);
  }
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
