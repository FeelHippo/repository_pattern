import postgres from "postgres";
import UserMapper from "@/data/mapper/user";
import {UserModel} from "@/data/entity/user";

export interface UserRepositoryAbstraction {
  readAll(): Promise<UserModel[]>;
  readById(id: number): Promise<UserModel | null>;
  create(user: UserModel): Promise<UserModel>;
  update(id: number, user: UserModel): Promise<UserModel | null>;
  delete(id: number): Promise<void>;
}

export default class UserRepository implements UserRepositoryAbstraction {
  constructor(userMapper: UserMapper) {
    this._userMapper = userMapper;
  }

  private readonly _userMapper: UserMapper;

  async readAll(): Promise<UserModel[]> {
    return this._userMapper.readAll();
  }

  async readById(id: number): Promise<UserModel | null> {
    return this._userMapper.readById(id);
  }

  async create(user: UserModel): Promise<UserModel> {
    return this._userMapper.create(user);
  }

  async update(id: number, user: UserModel): Promise<UserModel> {
    return this._userMapper.update(id, user);
  }

  async delete(id: number): Promise<void> {
    return this._userMapper.delete(id);
  }
}
