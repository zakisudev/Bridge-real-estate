import config from "config";
import { Sequelize, Transaction } from "sequelize";
import logger from "../loggers/log";
import { MODEL } from "../../models";

export let sequelize: Sequelize;

/**
 * Initializes and connects to the database using Sequelize.
 * @returns {Promise<void>} A promise that resolves when the database is connected successfully or rejects with an error if the connection fails.
 */
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

/**
 * Creates a transaction using Sequelize.
 * @returns {Promise<Transaction>} A promise that resolves to the created transaction.
 */
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
