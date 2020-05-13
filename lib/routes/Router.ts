/**
 * lib/routes/Router.ts
 *
 * @description: Main router of the application
 *
 */

import * as express from "express";
import { Users } from "./users";
import { Auth } from "./auth";
import { Items } from "./items";

export class Router {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public Users: Users = new Users();
  public Auth: Auth = new Auth();
  public Items: Items = new Items();

  // Defining Routes
  public getRouter() {
    this.router.use("/users", this.Users.getRouter());
    this.router.use("/auth", this.Auth.getRouter());
    this.router.use("/items", this.Items.getRouter());

    return this.router;
  }
}
