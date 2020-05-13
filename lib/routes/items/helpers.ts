/**
 * lib/routes/items/helpers.ts
 *
 * @description: This file contains all the helpers of itemms
 *
 */

import { items } from "../../sequelize/models";
import { item_current_groups } from "../../sequelize/models";

export class ItemsHelpers {
  ///////////////////////////////
  // Returning Paginated Items //
  ///////////////////////////////
  public async paginateSelect(page, page_size) {
    try {
      // Config pagination
      const paginationConfig = {
        page: page,
        paginate: page_size,
        order: ["id_item"],
      };

      // Query with pagination
      const paginatedData = await items.paginate(paginationConfig);

      const objectToReturn = {
        docs: paginatedData.docs,
        total_pages: paginatedData.pages,
        total_items: paginatedData.total,
        current_page: +page,
      };

      return objectToReturn;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  /////////////////////////////
  // Add Item Validator      //
  /////////////////////////////
  public async validatorAddItem(body) {
    try {
      if (!body.name) {
        throw new Error("Name is required");
      }

      if (!body.groups) {
        throw new Error("Unless one group is required");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  /////////////////////////
  // Insert new Item     //
  /////////////////////////
  public async insertItem(name: string) {
    try {
      // Inserting data
      const createdItem = await items.create({ name });
      return createdItem.id_item;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  ///////////////////////////////
  // Inserting Group Array     //
  ///////////////////////////////
  public async insertGroupArray(groupIdArray, id_user) {
    try {
      // Iterating and Inserting
      groupIdArray.forEach((id_group) => {
        // Checking if already exist
        const alreadyExist = item_current_groups.findOne({
          where: {
            id_user_profile: id_user,
            id_group: id_group,
          },
        });

        if (!alreadyExist) {
          item_current_groups.create({
            id_user_profile: id_user,
            id_group: id_group,
          });
        }
      });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
