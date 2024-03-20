import { Sequelize } from "sequelize";
import UserFactory, { User } from "./User";
import PropertyFactory, { Property } from "./Property";

const MODEL = (sequelize: Sequelize) => {
  UserFactory(sequelize);
  PropertyFactory(sequelize);

  User.hasMany(Property, {
    foreignKey: "user_id",
  });
  Property.belongsTo(User, {
    foreignKey: "user_id",
  });
};

export { MODEL };

export { User, Property };
