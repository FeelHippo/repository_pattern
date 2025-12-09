import Container from "@/dependencies/container";
import dbProvider from "@/providers/db";
import userDataMapperProvider from "@/providers/user_data_mapper";
import userRepositoryProvider from "@/providers/user_repository";
import userModelProvider from "@/providers/user_domain";
import UserDomain from "@/domain/user";
import { Sql } from "postgres";
import UserRepository from "@/repository/user";
import UserMapper from "@/data/mapper/user";

export default function () {
  let container = new Container();

  (dbProvider(container),
    userDataMapperProvider(container as Container & { sql: Sql }),
    userRepositoryProvider(container as Container & { userMapper: UserMapper }),
    userModelProvider(
      container as Container & {
        userRepository: UserRepository;
      },
    ));

  return container as Container & {
    userDomain: UserDomain;
  };
}
