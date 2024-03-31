import { Sequelize, Model, DataTypes } from "sequelize";
import { hashPassword } from "../utilities/helper/helper";

export class User extends Model {
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public email!: string;
  public password!: string;
  public is_admin!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Represents a User model.
 */
export default (sequelize: Sequelize) => {
  /**
   * Represents the User class.
   */
  User.init(
    {
      /**
       * Represents the id of the user.
       */
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      /**
       * Represents the username of the user.
       */
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Represents the first name of the user.
       */
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Represents the last name of the user.
       */
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Represents the phone number of the user.
       */
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Represents the email address of the user.
       */
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      /**
       * Represents the password of the user.
       */
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Represents whether the user is an admin or not.
       */
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "user",
      hooks: {
        /**
         * Hook that is triggered before creating a user.
         * Hashes the user's password.
         * @param user - The user object being created.
         */
        beforeCreate: async (user: any) => {
          user.password = await hashPassword(user.password);
        },
      },
    }
  );
};
