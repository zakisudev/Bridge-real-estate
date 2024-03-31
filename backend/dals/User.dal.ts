import { Transaction } from "sequelize/types";
import { User } from "../models";

/**
 * Data Access Layer for User operations.
 */
class UserDal {
  /**
   * Creates a new user.
   * @param payload - The user data to be created.
   * @param transaction - Optional transaction object for database operations.
   * @returns A Promise that resolves to the created user.
   */
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

  /**
   * Finds all users based on the provided query and options.
   * @param query - The query to filter the users.
   * @param options - Additional options for the query.
   * @returns A promise that resolves to an array of User objects.
   */
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

  /**
   * Finds a single user based on the provided query.
   * @param query - The query to filter the user.
   * @param options - Additional options for the query.
   * @returns A promise that resolves to the found user.
   */
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

  /**
   * Finds a user by their email.
   * @param value - The email value to search for.
   * @returns A Promise that resolves with the found user or rejects with an error.
   */
  static findByEmail(value: any) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: { email: value },
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Finds a user with the specified query for authentication.
   * @param query - The query object used to find the user.
   * @returns A promise that resolves to the found user or null if not found.
   */
  static findAuth(query: any): Promise<User | null> {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Updates a user record in the database.
   * @param query - The query to find the user record(s) to update.
   * @param payload - The updated user data.
   * @param transaction - Optional transaction object for performing the update within a transaction.
   * @returns A promise that resolves to the result of the update operation.
   */
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

  /**
   * Retrieves a paged list of users.
   * @param page The page number.
   * @param limit The maximum number of users to retrieve per page.
   * @returns A promise that resolves to an array of User objects.
   */
  static async getPaged(page: number, limit: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll({
        limit: limit,
        offset: (page - 1) * limit,
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

  /**
   * Retrieves the count of users.
   * @returns A Promise that resolves to the number of users.
   */
  static async getCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      User.count()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Deletes records from the User table based on the provided query.
   *
   * @param query - The query object specifying the conditions for deletion.
   * @param transaction - Optional transaction object for performing the deletion within a transaction.
   * @returns A Promise that resolves to the result of the deletion operation.
   */
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
