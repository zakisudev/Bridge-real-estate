import { Transaction } from "sequelize";
import { Property } from "../models";
import { User } from "../models/User";
import { title } from "process";
import { Op } from "sequelize";

/**
 * Data Access Layer for Property operations.
 */
class PropertyDal {
  /**
   * Creates a new property.
   *
   * @param payload - The property data to be created.
   * @param transaction - Optional transaction object for database operations.
   * @returns A Promise that resolves to the created property.
   */
  static async create(
    payload: Property,
    transaction?: Transaction
  ): Promise<Property> {
    return new Promise((resolve, reject) => {
      Property.create(
        {
          ...payload,
        },
        { transaction }
      )
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Retrieves all properties based on the provided query.
   * @param query - The query object used to filter the properties.
   * @returns A promise that resolves to an array of Property objects.
   */
  static async findAll(query: any): Promise<Property[]> {
    return new Promise((resolve, reject) => {
      Property.findAll({
        where: query,
        include: [
          {
            model: User,
            as: "user",
            attributes: [
              "id",
              "username",
              "firstName",
              "lastName",
              "email",
              "phone",
              "is_admin",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Finds a single property based on the provided query.
   * @param query - The query used to find the property.
   * @returns A promise that resolves to the found property.
   */
  static async findOne(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Property.findByPk(query, {
        include: [
          {
            model: User,
            as: "user",
            attributes: [
              "id",
              "username",
              "firstName",
              "lastName",
              "email",
              "phone",
              "is_admin",
            ],
          },
        ],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Updates a property with the specified ID.
   *
   * @param id - The ID of the property to update.
   * @param payload - The updated property data.
   * @param transaction - Optional transaction object for database operations.
   * @returns A promise that resolves to the updated property data.
   */
  static async update(
    id: string,
    payload: Property,
    transaction?: Transaction
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const updatedProperty = {
        title: payload.title,
        description: payload.description,
        address: payload.address,
        bathrooms: payload.bathrooms,
        bedrooms: payload.bedrooms,
        furnished: payload.furnished,
        parking: payload.parking,
        size: payload.size,
        discountedPrice: payload.discountedPrice,
        regularPrice: payload.regularPrice,
        type: payload.type,
        offer: payload.offer,
        imageUrls: payload.imageUrls,
      };
      Property.update(updatedProperty, {
        where: { id },
        returning: true,
        transaction,
      })
        .then((result) => {
          resolve({ success: true, data: payload });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Retrieves the count of properties.
   * @returns A Promise that resolves to the number of properties.
   */
  static async getCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      Property.count()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Retrieves a paged list of properties based on the provided parameters.
   * @param page - The page number to retrieve.
   * @param limit - The maximum number of properties to retrieve per page.
   * @param filter - (Optional) An object representing the filter criteria to apply.
   * @param search - (Optional) A string used for searching properties based on title, description, address, or type.
   * @returns A Promise that resolves to an array of Property objects.
   */
  static async getPaged(
    page: number,
    limit: number,
    filter?: any,
    search?: string
  ): Promise<Property[]> {
    return new Promise((resolve, reject) => {
      let whereClause = {};

      if (filter) {
        for (const key in filter) {
          if (filter[key] === "true") {
            filter[key] = true;
          } else if (filter[key] === "false") {
            filter[key] = false;
          } else if (filter[key] === "") {
            delete filter[key];
          }
        }

        whereClause = { ...filter };
      }

      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } },
            { type: { [Op.like]: `%${search}%` } },
          ],
        };
      }

      Property.findAll({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        limit: limit,
        offset: (page - 1) * limit,
        order: [["createdAt", "DESC"]],
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Deletes a property with the specified ID.
   * @param id - The ID of the property to delete.
   * @returns A Promise that resolves to an object with the success status and the deleted property ID.
   */
  static async delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Property.destroy({ where: { id } })
        .then((result) => {
          resolve({ success: true, id: id });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default PropertyDal;
