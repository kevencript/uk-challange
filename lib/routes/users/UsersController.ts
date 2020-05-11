/**
 * lib/routes/users/controller.ts
 *
 * @description: This file contains all the control of users
 *
 */

import { Request, Response } from "express";

export class UsersController {
  // @route    POST /users/signup
  // @desc     Register an new user
  public signup(req: Request, res: Response) {
    res.json({
      message: "Testing Initial Structure",
    });
  }
}
