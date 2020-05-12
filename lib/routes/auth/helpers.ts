/**
 * lib/routes/auth/helpers.ts
 *
 * @description: This file contains all the helpers of users
 *
 */

import { user_profile } from "../../sequelize/models";
import * as config from "config";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthHelpers {
  ////////////////////////////////
  // Search for existing e-mail //
  ////////////////////////////////
  public async searchForExistingUser(email: string) {
    try {
      // Searching for existing user
      const existingUser = await user_profile.findOne({
        where: {
          email: email,
        },
      });

      // Validating if there's an real user
      if (!existingUser) {
        throw new Error("Incorrect e-mail or password");
      }

      return existingUser;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  //////////////////////
  // Validating Data //
  /////////////////////
  public async validateBody(body) {
    try {
      if (!body.password) {
        throw new Error("Password is required");
      }

      if (!body.email) {
        throw new Error("E-mail is required");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Compare hashed password with the password in wich user is trying to authenticate //
  //////////////////////////////////////////////////////////////////////////////////////
  public async comparePasswords(password: string, hashed_password: string) {
    try {
      // Verifying if passwords matches
      const isMatch = await bcrypt.compare(password, hashed_password);

      // If false, return error
      if (!isMatch) {
        throw new Error("Incorrect e-mail or password");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  ////////////////////
  // logIn an user //
  ////////////////////
  public async logIn(id: number) {
    try {
      // Creating the Payload object
      const payload = {
        user: {
          id_user_profile: id,
        },
      };

      // Creating token
      const authToken = await jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 360000,
      });

      return authToken;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
