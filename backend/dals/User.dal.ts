import { Transaction } from "sequelize/types";
import { User } from "../models";

class UserDal {
  static async create(payload: User, transaction?: Transaction): Promise<User> {
    return new Promise((resolve, reject) => {
      User.create(
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

  static async findAll(query: any, options?: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: query,
        ...options,
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

export default UserDal;
