import UserRepository from "@/repository/user";
import Container from "@/dependencies/container";
import postgres from "postgres";

export default function (container: Container & { sql: postgres.Sql }) {
  container.service("userRepository", new UserRepository(container.sql));
}
