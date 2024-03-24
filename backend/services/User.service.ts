import { Transaction } from "sequelize/types";
import { User } from "../models";
import { createTransaction } from "../utilities/database/sequelize";
import UserDal from "../dals/User.dal";
import { resolve } from "path";

class UserService {
  static create(payload: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const transaction = await createTransaction();
      try {
        await UserDal.create(payload, transaction);
        await transaction.commit();
        resolve({ success: true, data: payload });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

  static async findAll(query: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
      UserDal.findAll(query)
        .then((result: User[]) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  static async findOne(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      let query = { id: id };
      UserDal.findOne(query)
        .then((result: User) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  public static findByEmail(query: any): Promise<User> {
    return new Promise((resolve, reject) => {
      UserDal.findByEmail(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new Error(error));
        });
    });
  }

  static async update(id: string, payload: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let query = { id: id || payload.id };
      const transaction = await createTransaction();
      try {
        await UserDal.update(query, payload, transaction);
        await transaction.commit();
        resolve({ success: true, data: payload });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

  static async delete(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let query = { id: id };
      const transaction = await createTransaction();
      try {
        await UserDal.delete(query, transaction);
        await transaction.commit();
        resolve({ success: true, id: id });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }
}

export default UserService;
