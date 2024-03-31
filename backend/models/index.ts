import { Sequelize } from "sequelize";
import UserFactory, { User } from "./User";
import PropertyFactory, { Property } from "./Property";

/**
 * Initializes the models and associations for the Sequelize instance.
 *
 * @param sequelize - The Sequelize instance.
 */
const MODEL = (sequelize: Sequelize) => {
  UserFactory(sequelize);
  PropertyFactory(sequelize);

  User.hasMany(Property, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
  Property.belongsTo(User, {
    foreignKey: "user_id",
  });
};

export { MODEL };

export { User, Property };
