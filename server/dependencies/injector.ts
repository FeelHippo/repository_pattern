import Container from "@/dependencies/container";
import dbProvider from "@/providers/db";
import userRepositoryProvider from "@/providers/user_repository";
import userModelProvider from "@/providers/user_domain";
import UserDomain from "@/domain/user";

export default function () {
  let container = new Container();

  (dbProvider(container),
    userRepositoryProvider(container),
    userModelProvider(container));

  return container as Container & {
    userDomain: UserDomain;
  };
}
