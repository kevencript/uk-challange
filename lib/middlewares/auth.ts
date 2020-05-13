/**
 * lib/middlewares/auth.ts
 *
 * @description: Auth middleware
 *
 */

import * as jwt from "jsonwebtoken";
import * as config from "config";

export default async function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    res.status(401).json({
      errors: [{ msg: "Not Authorized", callback: "Token is required" }],
    });
  }

  // Verify token
  try {
    const decoded = await (<any>jwt.verify(token, config.get("jwtSecret")));

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      errors: [{ msg: "Not Authorized", callback: err.message }],
    });
  }
}
