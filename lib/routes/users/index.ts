/**
 * lib/routes/users/index.ts
 *
 * @description: This file contains all the requisiton handlers for users
 *
 */

import * as express from "express";
import { UsersController } from "./UsersController";
import authMiddleware from "../../middlewares/auth";

export class Users {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public UsersController: UsersController = new UsersController();

  // Defining Routes
  public getRouter() {
    /////////////////////////////////////
    // @route    POST /users           //
    // @desc     Register an new user  //
    /////////////////////////////////////
    this.router.post("/", authMiddleware, this.UsersController.signup);

    return this.router;
  }
}
