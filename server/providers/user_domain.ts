import UserDomain from "@/domain/user";
import Container from "@/dependencies/container";
import UserRepository from "@/repository/user";
import postgres from "postgres";

export default function (
  container: Container & { userRepository: UserRepository },
) {
  container.service("userDomain", new UserDomain(container.userRepository));
}
