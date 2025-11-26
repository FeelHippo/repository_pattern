import UserRepository from "@/repository/user";

export class UserModel {
  constructor(name: string, isDeleted: boolean, id?: number) {
    this.id = id;
    this.name = name;
    this.isDeleted = isDeleted;
  }

  id?: number;
  name: string;
  isDeleted: boolean;
}

export default class UserDomain {
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  private readonly _userRepository: UserRepository;

  async allUsers(): Promise<UserModel[]> {
    return this._userRepository.readAll();
  }

  async userById(id: number): Promise<UserModel | null> {
    return this._userRepository.readById(id);
  }

  async addUser(name: string, isDeleted: boolean = false): Promise<UserModel> {
    return this._userRepository.create(new UserModel(name, isDeleted));
  }

  async modifyUser(
    id: number,
    name: string,
    isDeleted: boolean,
  ): Promise<UserModel> {
    return this._userRepository.update(id, new UserModel(name, isDeleted));
  }

  async removeUser(id: number): Promise<void> {
    return this._userRepository.delete(id);
  }
}
