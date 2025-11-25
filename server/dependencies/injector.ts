import Container from "@/dependencies/container";
import dbProvider from "@/providers/db";
import userRepositoryProvider from "@/providers/user_repository";
import userModelProvider from "@/providers/user_domain";
import UserDomain from "@/domain/user";
import { Sql } from "postgres";
import UserRepository from "@/repository/user";

export default function () {
  let container = new Container();

  (dbProvider(container),
    userRepositoryProvider(container as Container & { sql: Sql }),
    userModelProvider(
      container as Container & {
        userRepository: UserRepository;
      },
    ));

  return container as Container & {
    userDomain: UserDomain;
  };
}
