import sql from "@/services/db";
import Container from "@/dependencies/container";

export default function (container: Container) {
  container.service("sql", sql);
}
