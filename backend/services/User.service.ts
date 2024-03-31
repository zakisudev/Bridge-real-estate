import { Transaction } from "sequelize/types";
import { User } from "../models";
import { createTransaction } from "../utilities/database/sequelize";
import UserDal from "../dals/User.dal";
import { resolve } from "path";
import { hashPassword } from "../utilities/helper/helper";

/**
 * Service class for managing user operations.
 */
class UserService {
  /**
   * Creates a new user.
   * @param payload - The user data to be created.
   * @returns A Promise that resolves to an object containing the created user details, success status, and a message.
   * @throws If an error occurs during the creation process.
   */
  static create(payload: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const transaction = await createTransaction();
      try {
        const res = await UserDal.create(payload, transaction);
        await transaction.commit();
        resolve({
          user: {
            id: res.id,
            username: res.username,
            firstName: res.firstName,
            lastName: res.lastName,
            phone: res.phone,
            email: res.email,
            is_admin: res.is_admin,
          },
          success: true,
          message: "User created successfully.",
        });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

  /**
   * Retrieves all users based on the provided query.
   * @param query - The query object used to filter the users.
   * @returns A promise that resolves to an array of User objects.
   */
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

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns A Promise that resolves to the found user.
   */
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

  /**
   * Finds a user by email.
   * @param query - The query object containing the email.
   * @returns A promise that resolves with the user object if found, or rejects with an error.
   */
  public static findByEmail(query: any): Promise<User> {
    return new Promise((resolve, reject) => {
      UserDal.findByEmail(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new Error(error));
        });
    });
  }

  /**
   * Updates a user with the specified ID using the provided payload.
   * If the payload contains a password, it will be hashed before updating the user.
   * @param id - The ID of the user to update.
   * @param payload - The payload containing the updated user data.
   * @returns A Promise that resolves to an object with the updated user data.
   * @throws If an error occurs during the update process.
   */
  static async update(id: string, payload: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let query = { id: id || payload.id };
      const transaction = await createTransaction();
      try {
        const pwd = payload.password;
        if (pwd) {
          payload.password = await hashPassword(payload.password);
        }
        await UserDal.update(query, payload, transaction);
        await transaction.commit();
        resolve({
          success: true,
          data: {
            id: payload.id,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone,
            email: payload.email,
            is_admin: payload.is_admin,
          },
        });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

  /**
   * Retrieves a paged list of users along with the total count of users.
   * @param page - The page number.
   * @param limit - The maximum number of users per page.
   * @returns A promise that resolves to an object containing the paged list of users and the total count of users.
   */
  static async getPagedWithCount(
    page: number,
    limit: number
  ): Promise<{ user: User[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await UserDal.getPaged(page, limit);
        const count = await UserDal.getCount();
        resolve({ user: users, count: count });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to an object with a success flag and the deleted user's ID.
   */
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
