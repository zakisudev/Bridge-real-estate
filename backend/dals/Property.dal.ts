import { Transaction } from "sequelize";
import { Property } from "../models";
import { User } from "../models/User";
import { title } from "process";

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
