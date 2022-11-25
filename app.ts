import { Data } from "./model/Data";
import { Sorm } from "./src";

Sorm.config({
  driver: "mysql",
  connection: {
    databaseUrl: "mysql://root:@localhost:3306/demo",
  },
});

async function getData() {
  const data = new Data();
  data.title = "hello1";
  data.body = "body1";
  await data.save();

  const data2 = new Data();
  data2.title = "hello2";
  data2.body = "body2";
  await data2.save();

  const datas = await new Data().all();
  console.log(datas);
}
getData();
