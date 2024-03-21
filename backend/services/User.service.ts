import { Transaction } from "sequelize/types";
import { User } from "../models";
import { createTransaction } from "../utilities/database/sequelize";
import UserDal from "../dals/User.dal";

class UserService {
  static async create(payload: User): Promise<any> {
    const transaction = await createTransaction();
    try {
      await UserDal.create(payload, transaction);
      await transaction.commit();
      return { success: true, message: "User created successfully." };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
}

export default UserService;
