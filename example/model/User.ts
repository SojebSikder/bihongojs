import { ORM } from "../../src";

export class User extends ORM {
  constructor() {
    super("users");
  }

  name: string;

  datas() {
    return this.belongsTo("datas", "id", "user_id");
  }
  notes() {
    return this.belongsTo("note", "id", "user_id");
  }
}
