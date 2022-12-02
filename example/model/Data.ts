// example
import { ORM } from "../../src";

export class Data extends ORM {
  constructor() {
    super("datas");
  }

  title: string;
  body: string;

  user() {
    return this.belongsTo("users", "user_id", "id");
  }
}
