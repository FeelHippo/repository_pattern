import UserRepository from "@/repository/user";
import Container from "@/dependencies/container";
import UserMapper from "@/data/mapper/user";

export default function (container: Container & { userMapper: UserMapper }) {
  container.service("userRepository", new UserRepository(container.userMapper));
}
