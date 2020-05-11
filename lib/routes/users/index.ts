/**
 * lib/routes/users/index.ts
 *
 * @description: This file contains all the requisiton handlers for users
 *
 */

import * as express from "express";
import { UsersController } from "./UsersController";

export class Users {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public UsersController: UsersController = new UsersController();

  // Defining Rou
  public getRouter() {
    // @route    POST /users/signup
    // @desc     Register an new user
    this.router.get("/", this.UsersController.signup);

    return this.router;
  }
}
