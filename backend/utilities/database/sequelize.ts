import config from 'config';
import { Sequelize, Transaction } from 'sequelize';

export let sequelize: Sequelize;

export default async () => {
  let dbHost: string = config.get('database.host');
  let dbName: string = config.get('database.name');
  let dbUser: string = config.get('database.user');
  let dbPort: string = config.get('database.port');
  let dbPassword: string =
    process.env.DB_PASSWORD || config.get('database.password');

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    logging: console.log,
  });
  sequelize
    .sync({ force: false, alter: false })
    .then((sequelize) => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.log('Database connection failed', err);
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
