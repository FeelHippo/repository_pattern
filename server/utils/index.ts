import http from "http";

export default class Utils {
  static async bodyParser(request: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, _reject) => {
      let body = "";
      request.on("data", (data) => (body += data));
      request.on("end", () => resolve(body));
      request.on("error", console.error);
    });
  }
}
