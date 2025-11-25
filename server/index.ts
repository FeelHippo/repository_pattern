import * as http from "http";
import injector from "./dependencies/injector";
import Controllers from "@/controllers";
import Utils from "@/utils";

// inject dependencies
const dependencies = injector();
// instantiate controllers
const controllers = new Controllers(dependencies.userDomain, Utils.bodyParser);

/// https://github.com/FeelHippo/CORS_exploration/blob/main/server.js
http
  .createServer(async (request, response) => {
    controllers.request = request;
    controllers.response = response;
    controllers.url = new URL(`localhost:${request.url}`);
    switch (request.method) {
      case "GET":
        await controllers.processGetRequest();
        break;
      case "POST":
        await controllers.processPostRequest();
        break;
      case "PUT":
        await controllers.processPutRequest();
        break;
      case "DELETE":
        await controllers.processDeleteRequest();
        break;
      case "OPTIONS":
        await controllers.processOptionsRequest();
        break;
    }
  })
  .listen(8080, () => console.info("Server running on port 8080"));
