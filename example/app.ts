// simple example here
import { Data } from "./model/Data";
import { Bihongo, Controller, Dinjectable, Get, Module, Sorm } from "../src";
import { User } from "./model/User";

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

// service
@Dinjectable()
class AppService {
  hello() {
    return "hello world";
  }
}
// controller
@Dinjectable()
@Controller("/")
class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  hello(req, res, next) {
    res.send(this.appService.hello());
  }
}
// app module
@Module({
  controllers: [AppController],
})
class AppModule {}

const app = Bihongo.app({
  routes: (app) => {
    // Initialize modules
    new AppModule();
  },
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
