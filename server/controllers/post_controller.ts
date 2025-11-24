import UserDomain from "@/domain/user";
import http from "http";

export default class postController {
    constructor(response: http.ServerResponse, userDomain: UserDomain, url: URL, body: any) {
        this.response = response;
        this.userDomain = userDomain;
        this.url = url;
        this.body = JSON.parse(body);
    }

    response: http.ServerResponse;
    userDomain: UserDomain;
    url: URL;
    body: any;

    async processRequest() {
        try {
            switch (this.url.pathname) {
                case "/user":
                    const { name } = this.body;
                    const user = await this.userDomain.addUser(name);
                    if (!user) {
                        this.response.writeHead(404);
                        this.response.end(JSON.stringify({ user: "User not created" }));
                        break;
                    }
                    this.response.writeHead(201, {
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
