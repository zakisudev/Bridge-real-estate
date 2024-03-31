import { Request } from "express";
import PropertyDal from "../dals/Property.dal";
import { Property } from "../models";
import { createTransaction } from "../utilities/database/sequelize";
import { Transaction } from "sequelize";

/**
 * Service class for managing properties.
 */
class PropertyService {
  /**
   * Creates a new property.
   * @param payload - The property data to be created.
   * @param req - The request object containing user information.
   * @returns A Promise that resolves to the created property.
   * @throws An error if the user is not found or if there is an error during the creation process.
   */
  static async create(payload: Property, req: Request): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const transaction = await createTransaction();
      try {
        const user: any = req?.user;
        if (!user) {
          throw new Error("User not found.");
        }
        payload.user_id = user.id;
        const prop = await PropertyDal.create(payload, transaction);
        await transaction.commit();
        resolve({ success: true, data: prop });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

  /**
   * Retrieves all properties based on the provided query.
   * @param query - The query object used to filter the properties.
   * @returns A promise that resolves to an array of Property objects.
   */
  static async findAll(query: any): Promise<Property[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const properties = await PropertyDal.findAll(query);
        resolve(properties);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Finds a property by its ID.
   * @param id - The ID of the property to find.
   * @returns A Promise that resolves to the found property.
   * @throws If an error occurs while finding the property.
   */
  static async findById(id: string): Promise<Property> {
    return new Promise(async (resolve, reject) => {
      try {
        const property = await PropertyDal.findOne(id);
        resolve(property);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Updates a property with the specified ID.
   * @param id - The ID of the property to update.
   * @param payload - The updated property data.
   * @param transaction - Optional transaction object for database operations.
   * @returns A Promise that resolves to the updated property.
   * @throws If the property with the specified ID is not found.
   */
  static async update(
    id: string,
    payload: Property,
    transaction?: Transaction
  ): Promise<Property> {
    return new Promise(async (resolve, reject) => {
      try {
        const propertyExist = await PropertyDal.findOne(id);
        if (!propertyExist) {
          throw new Error("Property not found.");
        }
        const property = await PropertyDal.update(id, payload, transaction);
        resolve(property);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Retrieves a paged list of properties along with the total count.
   * @param page - The page number.
   * @param limit - The maximum number of properties per page.
   * @param filter - (Optional) Additional filter criteria for the properties.
   * @param search - (Optional) Search keyword to filter properties by.
   * @returns A promise that resolves to an object containing the paged list of properties and the total count.
   */
  static async getPagedWithCount(
    page: number,
    limit: number,
    filter?: any,
    search?: string
  ): Promise<{ properties: Property[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const properties = await PropertyDal.getPaged(
          page,
          limit,
          filter,
          search
        );
        const count = await PropertyDal.getCount();
        resolve({ properties, count });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Deletes a property with the specified ID.
   * @param id - The ID of the property to delete.
   * @returns A promise that resolves to an object indicating the success of the operation and the deleted property ID.
   * @throws If the property does not exist.
   */
  static async delete(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const propertyExist = await PropertyDal.findOne(id);
        if (!propertyExist) {
          throw new Error("Property not found.");
        }
        await PropertyDal.delete(id);
        resolve({ success: true, id });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default PropertyService;
