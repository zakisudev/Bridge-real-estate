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

  static async findOne(query: any, options?: any): Promise<User> {
    return new Promise((resolve, reject) => {
      User.findOne({
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

  static findByEmail(value: any) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: { email: value },
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  static findAuth(query: any): Promise<User | null> {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  static async update(
    query: any,
    payload: User,
    transaction?: Transaction
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      User.update(
        {
          ...payload,
        },
        {
          where: query,
          transaction,
        }
      )
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async delete(query: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      User.destroy({
        where: query,
        transaction,
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
