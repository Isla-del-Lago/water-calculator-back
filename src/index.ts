import Express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import valorUnitarioRoutes from './routes/valorUnitarioRoutes';
import consumoRoutes from './routes/consumoRoutes';
import apartmentRoutes from './routes/apartmentRoutes';

dotenv.config();

export const app = Express();

const SERVER_PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use('/valoresunitarios', valorUnitarioRoutes);
app.use('/consumos', consumoRoutes);
app.use('/apartment', apartmentRoutes);

app.listen(SERVER_PORT, () => {
    sequelize.authenticate()
        .then(() => {
            console.log('Database connection succesfull.');
            console.log(`Server listening on port ${SERVER_PORT}`);
        })
        .catch(console.log)
});