import { Transaction } from "sequelize";
import { Property } from "../models";

class PropertyDal {
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
}

export default PropertyDal;
