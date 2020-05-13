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
      var paginatedData = await itemsHelpers.paginateSelect(page, page_size);

      res.json(paginatedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Server Error", callback: err.message }],
      });
    }
  }

  //////////////////////////////////////
  // @route    POST /items            //
  // @desc     Add new Item           //
  //////////////////////////////////////
  public async addItem(req: Request, res: Response) {
    try {
      // Instancing new Helper
      const itemsHelpers = new ItemsHelpers();

      // Validating data and returning they padronized
      await itemsHelpers.validatorAddItem(req.body);

      // Inserting item
      const createdItemId = await itemsHelpers.insertItem(req.body.name);

      // Insering Multiple Groups
      await itemsHelpers.insertGroupArray(req.body.groups, createdItemId);

      res.json({
        successMessage: "Item created!",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Server Error", callback: err.message }],
      });
    }
  }
}
