import { Request } from "express";
import PropertyDal from "../dals/Property.dal";
import { Property } from "../models";
import { createTransaction } from "../utilities/database/sequelize";

class PropertyService {
  static async create(payload: Property, req?: Request): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const transaction = await createTransaction();
      try {
        const user: any = req?.user;
        if (!user) {
          throw new Error("User not found.");
        }
        payload.user_id = user.id;
        await PropertyDal.create(payload, transaction);
        await transaction.commit();
        resolve({ success: true, message: "Property created successfully." });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

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
}

export default PropertyService;
