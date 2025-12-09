import UserMapper from "@/data/mapper/user";
import Container from "@/dependencies/container";
import postgres from "postgres";

export default function (container: Container & { sql: postgres.Sql }) {
  container.service("userMapper", new UserMapper(container.sql));
}
