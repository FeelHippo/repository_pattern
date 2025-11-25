import postgres from "postgres";
import { UserModel } from "@/domain/user";

export interface UserRepositoryAbstraction {
  readAll(): Promise<UserModel[]>;
  readById(id: number): Promise<UserModel | null>;
  create(user: UserModel): Promise<UserModel>;
  update(id: number, user: UserModel): Promise<UserModel | null>;
  delete(id: number): Promise<void>;
}

export default class UserRepository implements UserRepositoryAbstraction {
  constructor(sql: postgres.Sql) {
    this.db = sql;
  }

  private readonly db: postgres.Sql;

  async readAll(): Promise<UserModel[]> {
    const users = await this.db`
    select
      *
    from users
  `;
    const usersData: UserModel[] = [];
    for (const user of users) {
        const { name, is_deleted: isDeleted, id } = user;
      usersData.push(new UserModel(name, isDeleted, id));
    }
    return usersData;
  }

  async readById(id: number): Promise<UserModel | null> {
    const users = await this.db`
    select ${this.db("name", "isDeleted")}
    from users
    where id = ${id}
  `;
    if (!users.length) return null;
    const { name, is_deleted: isDeleted } = users[0];
    return new UserModel(name, isDeleted, id);
  }

  async create(user: UserModel): Promise<UserModel> {
    const users = await this.db`
    insert into users ${this.db([{ name: user.name, isDeleted: user.isDeleted }])}
    returning *
  `;
    const { name, is_deleted: isDeleted, id } = users[0];
    return new UserModel(name, isDeleted, id);
  }

  async update(id: number, user: UserModel): Promise<UserModel> {
    const users = await this.db`
    update users
    set ${this.db(user, "name", "isDeleted")}
    where id = ${id}
        returning *
  `;
    return new UserModel(users[0].name, users[0].isDeleted, id);
  }

  async delete(id: number): Promise<void> {
    await this.db`
    delete from users
    where id = ${id}
  `;
  }
}
