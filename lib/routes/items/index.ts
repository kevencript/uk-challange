/**
 * lib/routes/items/index.ts
 *
 * @description: This file contains all the requisiton handlers for items
 *
 */

import * as express from "express";
import { ItemsController } from "./ItemsController";
import authMiddleware from "../../middlewares/auth";

export class Items {
  constructor() {
    this.router = express.Router();
  }

  // Instancing Modules
  public router: express.Router;
  public ItemsController: ItemsController = new ItemsController();

  // Defining Routes
  public getRouter() {
    /////////////////////////////////////
    // @route    GET /items            //
    // @desc     Return all items      //
    /////////////////////////////////////
    this.router.get("/", authMiddleware, this.ItemsController.returnItems);

    //////////////////////////////////////
    // @route    POST /items            //
    // @desc     Add new Item           //
    //////////////////////////////////////
    this.router.post("/", authMiddleware, this.ItemsController.addItem);

    return this.router;
  }
}
