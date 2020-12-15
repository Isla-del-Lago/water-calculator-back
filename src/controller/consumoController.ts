import * as consumoService from '../service/consumoService';
import { Request, Response } from 'express';
import Error from '../util/Error';
import Consumo from '../util/Consumo';
import { createError } from '../util/util';

/**
 * Controller to get consumos by apt number.
 * @param req Request object.
 * @param res Response object.
 */
export const getConsumosByAptNumber = async (req: Request, res: Response): Promise<void> => {
    const { aptNum } = req.params;

    try {
        const aptoConsumos = await consumoService.getConsumosByAptNumber(aptNum);

        res.status(200).json({ data: aptoConsumos });
    } catch (error) {
        const errorMessage: Error = createError('Error getting consumos', error);
        res.status(500).json({ error: errorMessage });
    }
}

/**
 * Controller to get consumos by bill date.
 * @param req Request object.
 * @param res Response object.
 */
export const getConsumosByBillDate = async (req: Request, res: Response): Promise<void> => {
    const { billDate } = req.params;

    try {
        const billDateConsumos = await consumoService.getConsumosByBillDate(billDate);

        res.status(200).json({ data: billDateConsumos });
    } catch (error) {
        const errorMessage: Error = createError('Error getting consumos', error);
        res.status(500).json({ error: errorMessage });
    }
}

/**
 * Controller to get consumos by bill date and apt number.
 * @param req Request object.
 * @param res Response object.
 */
export const getConsumosByAptNumberAndBillDate = async (req: Request, res: Response): Promise<void> => {
    const { billDate, aptNumber } = req.params;

    try {
        const billDateAndAptNumberConsumos = await consumoService.getConsumosByAptNumberAndBillDate(billDate, aptNumber);

        res.status(200).json({ data: billDateAndAptNumberConsumos });
    } catch (error) {
        const errorMessage: Error = createError('Error getting consumos', error);
        res.status(500).json({ error: errorMessage });
    }
}

/**
 * Controller to save a new consumo.
 * @param req Request object.
 * @param res Response object.
 */
export const saveConsumo = async (req: Request, res: Response): Promise<void> => {
    const consumo: Consumo = req.body;

    try {
        const saveResponse = await consumoService.saveConsumo(consumo);

        res.status(201).json({ data: saveResponse });
    } catch (error) {
        const errorMessage: Error = createError('Error creating a new consumo', error);
        res.status(500).json({ error: errorMessage });
    }
}