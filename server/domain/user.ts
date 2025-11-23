import { UserRepository } from "@/repository/user";

export class UserData {
  constructor(id: number, name: string, isDeleted: boolean) {
    this.id = id;
    this.name = name;
    this.isDeleted = isDeleted;
  }

  id: number;
  name: string;
  isDeleted: boolean;
}

export class UserDomain {
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  userRepository: UserRepository;

  async addUser(id: number, name: string, isDeleted: boolean) {
    await this.userRepository.create(new UserData(id, name, isDeleted));
  }

  // TODO: take it from here
}
