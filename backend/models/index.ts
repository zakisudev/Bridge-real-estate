import { Sequelize } from "sequelize";
import UserFactory, { User } from "./User";

const MODEL = (sequelize: Sequelize) => {
  UserFactory(sequelize);
};

export { MODEL };

export { User };
