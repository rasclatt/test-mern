import dotenv from 'dotenv';
dotenv.config();

export const environment = {
    mongoDbHost: process.env.MONGO_DB_HOST as string,
    mongoDbPort: process.env.MONGO_DB_PORT as string,
    mongoDbName: process.env.MONGO_DB_NAME as string,
};