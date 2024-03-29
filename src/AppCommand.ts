import fs from "fs/promises";
import fs_sync from "fs";
import { Command } from "./core";
import { StringHelper } from "./helper/StringHelper";

const controller_path = "app/controllers";
const model_path = "app/models";
/**
 * App console command. Reserved for app
 * @class AppCommand
 * @author Sojeb Sikder <sojebsikder@gmail.com>
 */
export class AppCommand {
  /**
   * parse file name from path
   * @param path
   * @returns
   */
  public static parseFileNameFromPath(path) {
    return path.split("/").pop();
  }

  /**
   * execute command
   */
  public static execute() {
    /**
     * Predefined Command
     */
    Command.set("ask", function () {
      Command.ask(function (rl) {
        rl.question("What is your name ", function (name) {
          Command.success(`Hello ${name}`);
          rl.question("what is your age ", function (age) {
            Command.success(`${name} You are ${age} years old`);
            rl.close();
          });
        });
      });
    })
      .describe("Example command")
      .usage("ask");

    /**
     * Display application version
     */
    Command.set("-v", function () {
      const pkg = require("../../package.json");
      Command.success(`Version: ${pkg.version}`);
    });

    /**
     * Create Controller and service together
     */
    Command.set("make:module", async function () {
      try {
        const name = Command.args(3);

        // create directory first
        if (!fs_sync.existsSync(`${controller_path}/${name}`)) {
          fs_sync.mkdirSync(`${controller_path}/${name}`, { recursive: true });
        }

        let filename = name.split("/").pop();

        // create controller file
        await fs.writeFile(
          `${controller_path}/${name}/${filename}.controller.ts`,
          AppCommand.createController(
            AppCommand.parseFileNameFromPath(filename)
          )
        );
        // create service file
        await fs.writeFile(
          `${controller_path}/${name}/${filename}.service.ts`,
          AppCommand.createService(AppCommand.parseFileNameFromPath(filename))
        );
        // response
        Command.success(
          `${AppCommand.parseFileNameFromPath(
            filename
          )} module created succesfully`
        );
      } catch (err) {
        Command.danger(err);
      }
    })
      .describe("Create Controller and service together")
      .usage("make:module [module_Name]");

    /**
     * Create eloqount Model
     */
    Command.set("make:model", async function () {
      try {
        const name = Command.args(3);

        // create directory first
        if (!fs_sync.existsSync(`${model_path}/${name}`)) {
          fs_sync.mkdirSync(`${model_path}/${name}`, { recursive: true });
        }

        let filename = name.split("/").pop();

        await fs.writeFile(
          // `${model_path}/${filename}.ts`,
          `${model_path}/${name}/${filename}.ts`,

          AppCommand.createModel(AppCommand.parseFileNameFromPath(filename))
        );
        Command.success(
          `${AppCommand.parseFileNameFromPath(
            filename
          )} model created succesfully`
        );
      } catch (err) {
        Command.danger(err);
      }
    })
      .describe("Create eloqount model")
      .usage("make:model [model_Name]");

    /**
     * Create Controller
     */
    Command.set("make:controller", async function () {
      try {
        const name = Command.args(3);

        // create directory first
        if (!fs_sync.existsSync(`${controller_path}/${name}`)) {
          fs_sync.mkdirSync(`${controller_path}/${name}`, { recursive: true });
        }

        let filename = name.split("/").pop();
        await fs.writeFile(
          `${controller_path}/${name}/${filename}.ts`,

          AppCommand.createController(
            AppCommand.parseFileNameFromPath(filename)
          )
        );
        Command.success(
          `${AppCommand.parseFileNameFromPath(
            filename
          )} controller created succesfully`
        );
      } catch (err) {
        Command.danger(err);
      }
    })
      .describe("Create controller")
      .usage("make:controller [controller_Name]");

    /**
     * Create Service
     */
    Command.set("make:service", async function () {
      try {
        const name = Command.args(3);
        // create directory first
        if (!fs_sync.existsSync(`${controller_path}/${name}`)) {
          fs_sync.mkdirSync(`${controller_path}/${name}`, { recursive: true });
        }

        let filename = name.split("/").pop();
        await fs.writeFile(
          `${controller_path}/${name}/${filename}.ts`,

          AppCommand.createService(AppCommand.parseFileNameFromPath(filename))
        );
        Command.success(
          `${AppCommand.parseFileNameFromPath(
            filename
          )} service created succesfully`
        );
      } catch (err) {
        Command.danger(err);
      }
    })
      .describe("Create service")
      .usage("make:service [service_name]");

    /**
     * list
     */
    Command.set("list", function () {
      const cmd = Command.customCmdArray;
      const desc = Command.description;
      const usage = Command.usageInfo;
      Command.comment("Available commands");

      let i = 0;
      for (const key in cmd) {
        i++;
        if (key in Command.description && key in Command.usage) {
          console.log(
            `${i}) ${key} ---------- ${Command.description[key]} ------ ${Command.usage[key]}\n`
          );
        } else if (key in Command.description) {
          console.log(`${i}) ${key} ---------- ${Command.description[key]}\n`);
        } else if (key in Command.usage) {
          console.log(`${i}) ${key} ------ ${Command.usage[key]} \n`);
        } else {
          console.log(`${i}) ${key}\n`);
        }
      }
    })
      .describe("Displays command list")
      .usage("list");

    /**
     * Display Help
     */
    if (process.argv[2]) {
      if (process.argv[2] == "help") {
        if (process.argv[3]) {
          Command.comment("Description:");
          console.log(`${Command.description[process.argv[3]]}\n`);
          Command.comment("Usage:");
          if (process.argv[3] in Command.usage) {
            console.log(`${Command.usage[process.argv[3]]}\n`);
          } else {
            console.log(`${process.argv[3]}\n`);
          }
        } else {
          Command.comment("Description:");
          console.log(`Diplays help for a command\n`);
          Command.comment("Usage:");
          console.log(`help [tropic]\n`);
        }
      }
    }
  }

  /**
   * create eloqount model command
   */
  public static createModel(modelName) {
    modelName = StringHelper.cfirst(`${modelName}`);
    const data = `import { ORM } from "bihongojs";

export class ${modelName} extends ORM{
  // define custom table name like this:
  // constructor() {
  //   super("table_name");
  // }
}
 
 `;
    return data;
  }

  /**
   * create controller command
   */
  public static createController(name) {
    const module = name;
    const controllerName = StringHelper.cfirst(`${name}Controller`);
    const serviceName = StringHelper.cfirst(`${name}Service`);
    const serviceNameUncap = StringHelper.ucfirst(`${name}Service`);

    const data = `import { Request, Response } from "express";
import { Dinjectable } from "bihongojs";
import { Controller, Delete, Get, Patch, Post } from "bihongojs";
import { ${serviceName} } from "./${module}.service";

@Dinjectable()
@Controller("/${module}/")
export class ${controllerName} {
  //
  constructor(private ${serviceNameUncap}: ${serviceName}) {}

  @Post()
  create(req: Request, res: Response) {
    res.send(this.${serviceNameUncap}.create(req.body));
  }

  @Get()
  findAll(req: Request, res: Response) {
    res.send(this.${serviceNameUncap}.findAll());
  }

  @Get(':id')
  findOne(req: Request, res: Response) {
    res.send(this.${serviceNameUncap}.findOne(req.params.id));
  }

  @Patch(':id')
  update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    res.send(this.${serviceNameUncap}.update(id, data));
  }

  @Delete(':id')
  remove(req: Request, res: Response) {
    res.send(this.${serviceNameUncap}.remove(req.params.id));
  }
}
 `;
    return data;
  }

  /**
   * create service command
   */
  public static createService(serviceName) {
    serviceName = StringHelper.cfirst(`${serviceName}Service`);
    const data = `import { Dinjectable } from "bihongojs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Dinjectable()
export class ${serviceName} {

  create(data: any){
    return 'This action adds a new user';
  }

  findAll() {
    return 'This action returns all user';
  }

  findOne(id: string) {
    return 'This action returns a {id} user';
  }

  update(id: string, data: any) {
    return 'This action updates a {id} user';
  }

  remove(id: string) {
    return 'This action removes a {id} user';
  }
}
 `;
    return data;
  }
}
