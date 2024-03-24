import { Transaction } from "sequelize";
import { Property } from "../models";
import { User } from "../models/User";

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
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

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
}

export default PropertyDal;
