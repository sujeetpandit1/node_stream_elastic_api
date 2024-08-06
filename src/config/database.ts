import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import { initializeProductModel } from "../models/product";

dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        // logging: console.log 
    }
);

async function connectDatabase(): Promise<void>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        initializeProductModel(sequelize);
    await sequelize.sync({ force: false }); // This creates the table if it doesn't exist
    console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export {sequelize, connectDatabase};