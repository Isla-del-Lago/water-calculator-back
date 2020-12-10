import Express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';

dotenv.config();

const app = Express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, () => {
    sequelize.authenticate()
        .then(() => {
            console.log('Database connection succesfull.');
            console.log(`Server listening on port ${SERVER_PORT}`);
        })
        .catch(console.log)
});
