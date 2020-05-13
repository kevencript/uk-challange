/**
 * lib/routes/users/controller.ts
 *
 * @description: This file contains all the control of users
 *
 */

import { Request, Response } from "express";
import { ItemsHelpers } from "./helpers";

export class ItemsController {
  /////////////////////////////////////
  // @route    GET /items            //
  // @desc     Return all items      //
  /////////////////////////////////////
  public async returnItems(req: Request, res: Response) {
    try {
      // Instancing new Helper
      const itemsHelpers = new ItemsHelpers();

      // Config pagination or setting default
      const page = req.query.page ? req.query.page : 1;
      const page_size = req.query.page_size ? req.query.page_size : 10;

      // Returning paginated data
      var paginatedData = await itemsHelpers.paginateSelect(+page, +page_size);
      paginatedData.page = +page;

      res.json(paginatedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Server Error", callback: err.message }],
      });
    }
  }
}
