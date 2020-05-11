/**
 *
 * lib/config/prod.js
 *
 * @description: Prod Environment Keys
 *
 */

export default {
  jwtSecret: process.env.JWT_SECRET,
  database: process.env.DATABASE,
  db_username: process.env.DATABASE_USERNAME,
  db_passsword: process.env.DATABASE_PASSWORD,
  db_host: process.env.DATABASE_HOST,
};
