import { Router } from 'express';
import * as consumoController from '../controller/consumoController';

const consumoRoutes = Router();

consumoRoutes.get('/aptNumber/:aptNum', consumoController.getConsumosByAptNumber);

consumoRoutes.get('/billDate/:billDate', consumoController.getConsumosByBillDate);

consumoRoutes.get('/billDate/:billDate/aptNumber/:aptNum', consumoController.getConsumosByAptNumberAndBillDate);

consumoRoutes.post('/', consumoController.saveConsumo);

export default consumoRoutes;