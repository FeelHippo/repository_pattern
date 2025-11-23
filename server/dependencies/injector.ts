import Container from "@/dependencies/container";
import dbProvider from "@/providers/db";

export default function () {
  let container = new Container();

  dbProvider(container);

  return container;
}
