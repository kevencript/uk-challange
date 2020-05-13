/**
 * lib/routes/users/helpers.ts
 *
 * @description: This file contains all the helpers of users
 *
 */

import { user_profile } from "../../sequelize/models";
import * as bcrypt from "bcryptjs";

export class UsersHelpers {
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

      if (!body.password_confirmation) {
        throw new Error("Password confirmation is required");
      }

      const existingEmail = await user_profile.findOne({
        where: {
          email: body.email,
        },
      });

      if (existingEmail) {
        throw new Error("E-mail already in use");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  ///////////////////////
  // Compare passwords //
  ///////////////////////
  public async isPasswordEquals(
    password: string,
    password_confirmation: string
  ) {
    try {
      if (password !== password_confirmation) {
        throw new Error("Password does not match");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  ////////////
  // SignIn //
  ////////////
  public async signIn(email: string, password: string) {
    try {
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);

      const newUser = {
        email,
        hashed_password,
      };

      // Inserting data
      await user_profile.create(newUser);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
