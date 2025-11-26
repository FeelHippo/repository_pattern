import UserDomain from "@/domain/user";
import http from "http";
import * as net from "node:net";

export default class Controllers {
  constructor(
    userDomain: UserDomain,
    bodyParser: (request: http.IncomingMessage) => Promise<string>,
  ) {
    this._request = new http.IncomingMessage(new net.Socket());
    this._response = new http.ServerResponse(this._request);
    this._userDomain = userDomain;
    this._url = new URL("localhost:8080");
    this._bodyParser = bodyParser;
  }

  _request: http.IncomingMessage;
  set request(request: http.IncomingMessage) {
    this._request = request;
  }
  _response: http.ServerResponse;
  set response(response: http.ServerResponse) {
    this._response = response;
  }
  private readonly _userDomain: UserDomain;
  _url: URL;
  set url(url: URL) {
    this._url = url;
  }
  private readonly _bodyParser: (
    request: http.IncomingMessage,
  ) => Promise<string>;

  async processGetRequest() {
    try {
      switch (this._url.pathname) {
        case "/all-users":
          const users = await this._userDomain.allUsers();
          this._response.writeHead(200, {
            "Content-Type": "application/json",
          });
          this._response.end(JSON.stringify({ users }));
          break;
        case "/user":
          const searchParams = this._url.searchParams;
          const id = searchParams.get("id");
          if (!id) {
            throw new Error();
          }
          const user = await this._userDomain.userById(parseInt(id));
          if (!user) {
            this._response.writeHead(404);
            this._response.end(JSON.stringify({ user: "User not found" }));
            break;
          }
          this._response.writeHead(200, {
            "Content-Type": "application/json",
          });
          this._response.end(JSON.stringify({ user }));
          break;
        default:
          this._response.writeHead(404);
          this._response.end();
          break;
      }
    } catch (error) {
      console.error(error);
      this._response.writeHead(500);
      this._response.end();
    }
  }

  async processPostRequest() {
    try {
      switch (this._url.pathname) {
        case "/user":
          const rawBody = await this._bodyParser(this._request);
          const parsedBody = JSON.parse(rawBody);
          const { name } = parsedBody;
          const user = await this._userDomain.addUser(name);
          if (!user) {
            this._response.writeHead(404);
            this._response.end(JSON.stringify({ user: "User not created" }));
            break;
          }
          this._response.writeHead(201, {
            "Content-Type": "application/json",
          });
          this._response.end(JSON.stringify({ user }));
          break;
        default:
          this._response.writeHead(404);
          this._response.end();
          break;
      }
    } catch (error) {
      console.error(error);
      this._response.writeHead(500);
      this._response.end();
    }
  }

  async processPutRequest() {
    try {
      switch (this._url.pathname) {
        case "/user":
          const searchParams = this._url.searchParams;
          const id = searchParams.get("id");
          if (!id) {
            throw new Error();
          }
          const rawBody = await this._bodyParser(this._request);
          const parsedBody = JSON.parse(rawBody);
          const { name, isDeleted } = parsedBody;
          const user = await this._userDomain.modifyUser(
            parseInt(id),
            name,
            isDeleted,
          );
          if (!user) {
            this._response.writeHead(404);
            this._response.end(JSON.stringify({ user: "User not updated" }));
            break;
          }
          this._response.writeHead(200, {
            "Content-Type": "application/json",
          });
          this._response.end(JSON.stringify({ user }));
          break;
        default:
          this._response.writeHead(404);
          this._response.end();
          break;
      }
    } catch (error) {
      console.error(error);
      this._response.writeHead(500);
      this._response.end();
    }
  }

  async processDeleteRequest() {
    try {
      switch (this._url.pathname) {
        case "/user":
          const searchParams = this._url.searchParams;
          const id = searchParams.get("id");
          if (!id) {
            throw new Error();
          }
          await this._userDomain.removeUser(parseInt(id));
          this._response.writeHead(204, {
            "Content-Type": "application/json",
          });
          this._response.end();
          break;
        default:
          this._response.writeHead(404);
          this._response.end();
          break;
      }
    } catch (error) {
      console.error(error);
      this._response.writeHead(500);
      this._response.end();
    }
  }

  async processOptionsRequest() {
    const { url, headers } = this._request;
    try {
      switch (url) {
        case "/preflight-request":
          this._response.writeHead(204, {
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
          this._response.end();
          break;
        default:
          this._response.writeHead(404);
          this._response.end();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
