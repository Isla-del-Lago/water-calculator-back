import { Router } from 'express';
import * as apartmentController from '../controller/apartmentController';

const apartmentRoutes = Router();

apartmentRoutes.get('/:aptNum', apartmentController.getApartmentoByNumber);

apartmentRoutes.post('/', apartmentController.saveApartamento);

export default apartmentRoutes;