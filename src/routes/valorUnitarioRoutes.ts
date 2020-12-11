import { Router } from 'express';
import * as valorUnitarioController from '../controller/valorUnitarioController';

const valorUnitarioRoutes = Router();

valorUnitarioRoutes.post('/', valorUnitarioController.saveValorUnitario);

valorUnitarioRoutes.get('/:billDate', valorUnitarioController.getValorUnitarioByBillDate);

export default valorUnitarioRoutes;