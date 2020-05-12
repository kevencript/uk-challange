/**
 * lib/routes/auth/controller.ts
 *
 * @description: This file contains all the control of auth
 *
 */

import { Request, Response } from "express";
import { AuthHelpers } from "./helpers";

export class AuthController {
  /////////////////////////////////////////////////////
  // @route    POST /auth                            //
  // @desc     Realize the login and return an token //
  /////////////////////////////////////////////////////
  public async login(req: Request, res: Response) {
    try {
      // Instancing new Helpers
      const authHelpers = new AuthHelpers();

      // Validating Body
      await authHelpers.validateBody(req.body);

      // Getting data from body
      const { email, password } = req.body;

      // Searching for existing user with comming e-mail
      const userInfos = await authHelpers.searchForExistingUser(email);

      // Comparing comming password to existing hashed password
      await authHelpers.comparePasswords(password, userInfos.hashed_password);

      // Authenticating user and returning Token
      const authorizedToken = await authHelpers.logIn(
        userInfos.id_user_profile
      );

      res.json({
        authorizedToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Server Error", callback: err.message }],
      });
    }
  }
}
