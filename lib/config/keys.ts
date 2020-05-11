/**
 *
 * lib/config/keys.js
 *
 * @description:  Verificando ambientes e definindo as chaves
 *
 */

import prodKeys from "./prod";
import devKeys from "./dev";

var keysToReturn = {};

if (process.env.NODE_ENV === "production") {
  keysToReturn = prodKeys;
} else {
  // Dev Environment Keys
  // @caution! You should not commit this file to GitHub
  keysToReturn = devKeys;
}

export var keys = keysToReturn;
