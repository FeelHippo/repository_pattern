import UserDomain from "@/domain/user";
import http from "http";

export default class getController {
  constructor(response: http.ServerResponse, userDomain: UserDomain, url: URL) {
    this.response = response;
    this.userDomain = userDomain;
    this.url = url;
  }

  response: http.ServerResponse;
  userDomain: UserDomain;
  url: URL;

  async processRequest() {
    try {
      switch (this.url.pathname) {
        case "/all-users":
          const users = await this.userDomain.allUsers();
          this.response.writeHead(200, {
            "Content-Type": "application/json",
          });
          this.response.end(JSON.stringify({ users }));
          break;
        case "/user":
          const searchParams = this.url.searchParams;
          const id = searchParams.get("id");
          if (!id) {
            throw new Error();
          }
          const user = await this.userDomain.userById(parseInt(id));
          if (!user) {
            this.response.writeHead(404);
            this.response.end(JSON.stringify({ user: "User not found" }));
            break;
          }
          this.response.writeHead(200, {
            "Content-Type": "application/json",
          });
          this.response.end(JSON.stringify({ user }));
          break;
        default:
          this.response.writeHead(404);
          this.response.end();
          break;
      }
    } catch (error) {
      console.error(error);
      this.response.writeHead(500);
      this.response.end();
    }
  }
}
