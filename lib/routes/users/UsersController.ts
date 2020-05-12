/**
 * lib/routes/users/controller.ts
 *
 * @description: This file contains all the control of users
 *
 */

import { Request, Response } from "express";
import { UsersHelpers } from "./helpers";

export class UsersController {
  /////////////////////////////////////
  // @route    POST /users           //
  // @desc     Register an new user  //
  /////////////////////////////////////
  public async signup(req: Request, res: Response) {
    try {
      // Instancing new Helper
      const usersHelpers = new UsersHelpers();

      // Validating Body
      await usersHelpers.validateBody(req.body);

      // Getting data from body
      const { email, password, password_confirmation } = req.body;

      // Validating if passwords are equals
      await usersHelpers.isPasswordEquals(password, password_confirmation);

      // Hashing password and inserting new user
      await usersHelpers.signIn(email, password);

      res.json({
        successMessage: `User successfully created with e-mail '${email}'`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Server Error", callback: err.message }],
      });
    }
  }
}
