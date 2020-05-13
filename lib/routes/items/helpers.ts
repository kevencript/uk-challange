/**
 * lib/routes/items/helpers.ts
 *
 * @description: This file contains all the helpers of itemms
 *
 */

import { items } from "../../sequelize/models";

export class ItemsHelpers {
  //////////////////////
  // Validating Data //
  /////////////////////
  public async paginateSelect(page, page_size) {
    try {
      // Config pagination
      const paginationConfig = {
        page: page,
        paginate: page_size,
        order: ["id_item"],
      };

      // Query with pagination
      const paginatedData = await items.paginate();

      return paginatedData;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
