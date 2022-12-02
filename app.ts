import { Data } from "./model/Data";
import { Express } from "express";
import { Bihongo, Controller, Get, Module, RouterResolver, Sorm } from "./src";
import { User } from "./model/User";
import { Sorm } from "./src";

Sorm.config({
  driver: "mysql",
  connection: {
    databaseUrl: "mysql://root:@localhost:3306/demo",
  },
});

async function getData() {
  // const data = new Data();
  // data.title = "hello1";
  // data.body = "body1";
  // await data.save();

  // const data2 = new Data();
  // data2.title = "hello2";
  // data2.body = "body2";
  // await data2.save();

  const datas = await new Data().get();
  console.log(datas);
}
// getData();

@Controller("/")
class AppController {
  @Get()
  hello(req, res, next) {
    res.send("Hello world");
  }
  @Get("hello")
  say(req, res, next) {
    res.send("say Hello world");
    next();
  }
}
@Module({
  controllers: [AppController],
})
class AppModule {}

const app = Bihongo.app({
  boot: (app) => {},
  routes: (app: Express) => {
    // Initialize modules
    new AppModule();
    // Initialize router
    RouterResolver.resolve(app);
  },
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
