import postgres from "postgres";
import { UserData } from "@/domain/user";

export interface UserRepositoryAbstraction {
  findById(id: number): Promise<UserData | null>;
  findAll(): Promise<UserData[]>;
  create(user: UserData): Promise<UserData>;
  update(id: number, user: UserData): Promise<UserData | null>;
  delete(id: number): Promise<void>;
}

export class UserRepository implements UserRepositoryAbstraction {
  constructor(services: Record<string, postgres.Sql>) {
    this.db = services["sql"];
  }

  private readonly db: postgres.Sql;

  async findById(id: number): Promise<UserData | null> {
    const users = await this.db`
    select
      name,
      isDeleted
    from repository_test
    where id = ${id}
  `;
    return new UserData(id, users[0].name, users[0].isDeleted);
  }

  async findAll(): Promise<UserData[]> {
    const users = await this.db`
    select
      *
    from repository_test
  `;
    const usersData: UserData[] = [];
    for (const user of users) {
      usersData.push(new UserData(user.id, user.name, user.isDeleted));
    }
    return usersData;
  }

  async create(user: UserData): Promise<UserData> {
    const users = await this.db`
    insert into users
      (id, name, isDeleted)
    values
      (${user.id}, ${user.name}, ${user.isDeleted})
    returning name, age
  `;
    return new UserData(users[0].id, users[0].name, users[0].isDeleted);
  }

  async update(id: number, user: UserData): Promise<UserData | null> {
    const users = await this.db`
    update repository_test
    set name = ${user.name}, isDeleted = ${user.isDeleted}
    where id = ${id}
  `;
    return new UserData(id, users[0].name, users[0].isDeleted);
  }

  async delete(id: number): Promise<void> {
    await this.db`
    delete repository_test
    where id = ${id}
  `;
  }
}
