import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_USER: string = process.env.DATABASE_USER!;
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD!;
const DATABASE_HOST: string = process.env.DATABASE_HOST!;
const DATABASE_NAME: string = process.env.DATABASE_NAME;

export const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql'
});
