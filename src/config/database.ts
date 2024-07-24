import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

async function connectDatabase(): Promise<void>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export {sequelize, connectDatabase};