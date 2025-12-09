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
