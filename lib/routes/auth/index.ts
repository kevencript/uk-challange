/**
 * lib/routes/auth/index.ts
 *
 * @description: This file contains all the requisiton handlers for users
 *
 */

import * as express from "express";
import { AuthController } from "./AuthController";

export class Auth {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public AuthController: AuthController = new AuthController();

  // Defining Routes
  public getRouter() {
    /////////////////////////////////////////////////////
    // @route    POST /auth                            //
    // @desc     Realize the login and return an token //
    /////////////////////////////////////////////////////
    this.router.post("/", this.AuthController.login);

    return this.router;
  }
}
