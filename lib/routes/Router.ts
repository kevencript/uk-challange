/**
 * lib/routes/Router.ts
 *
 * @description: Main router of the application
 *
 */

import * as express from "express";
import { Users } from "./users";
import { Auth } from "./auth";

export class Router {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public Users: Users = new Users();
  public Auth: Auth = new Auth();

  // Defining Routes
  public getRouter() {
    this.router.use("/users", this.Users.getRouter());
    this.router.use("/auth", this.Auth.getRouter());

    return this.router;
  }
}
