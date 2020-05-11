/**
 * lib/routes/Router.ts
 *
 * @description: Main router of the application
 *
 */

import * as express from "express";
import { Users } from "./users";

export class Router {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public Users: Users = new Users();

  // Defining Routes
  public getRouter() {
    this.router.use("/users", this.Users.getRouter());

    return this.router;
  }
}
