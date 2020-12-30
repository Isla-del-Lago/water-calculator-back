import { Request, Response } from 'express';
import ValorUnitario from '../util/ValorUnitario';
import * as valorUnitarioService from '../service/valorUnitarioService';
import Error from '../util/Error';

/**
 * Save a new valor unitario.
 * @param req Request object.
 * @param res Response object.
 */
export const saveValorUnitario = async (req: Request, res: Response) => {
    const valorUnitario: ValorUnitario = req.body;

    try {
        const valorUnitarioResponse = await valorUnitarioService.saveValorUnitario(valorUnitario);

        res.status(201).json({ data: valorUnitarioResponse });
    } catch (error) {
        const errorMessage: Error = { message: 'Error saving Valor unitario', data: error };
        res.status(500).json({ error: errorMessage });
    }
}

/**
 * Get a valor unitario by the given bill date.
 * @param req Request object.
 * @param res Response object.
 */
export const getValorUnitarioByBillDate = async (req: Request, res: Response) => {
    const { billDate } = req.params;

    try {
        const valorUnitario = await valorUnitarioService.getValorUnitarioByBillDate(billDate);

        res.status(200).json({ data: valorUnitario });
    } catch (error) {
        const errorMessage: Error = { message: 'Error getting valor unitario', data: error }
        res.status(500).json({ error: errorMessage });
    }
}