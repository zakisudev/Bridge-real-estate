import config from "config";
import { Sequelize, Transaction } from "sequelize";
import logger from "../loggers/log";
import { MODEL } from "../../models";

export let sequelize: Sequelize;

export default async () => {
  let dbHost: string = config.get("production.host");
  let dbName: string = config.get("production.name");
  let dbUser: string = config.get("production.user");
  let dbPort: number = config.get("production.port");
  let dbPassword: string = process.env.DB_PASSWORD || "";

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    port: dbPort,
    dialectOptions: { decimalNumbers: true },
    logging: console.log,
  });

  MODEL(sequelize);

  sequelize
    .sync({ force: false, alter: false })
    .then((sequelize) => {
      logger.info("Database Connected Successfully");
    })
    .catch((err) => {
      logger.error("Database Connection Failed");
      logger.error(err);
    });
};

export const createTransaction = (): Promise<Transaction> => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaction = await sequelize.transaction();
      resolve(transaction);
    } catch (error) {
      reject(error);
    }
  });
};
