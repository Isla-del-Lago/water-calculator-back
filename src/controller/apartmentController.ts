import * as apartamentService from '../service/apartmentService';
import { Request, Response } from 'express';
import { createError } from '../util/util';
import Error from '../util/Error';
import Apartamento from '../util/Apartamento';

/**
 * Controller to get an apartment by the given number.
 * @param req Request object.
 * @param res Response object.
 */
export const getApartmentoByNumber = async (req: Request, res: Response) => {
    const { aptNum } = req.params;

    try {
        const apartamento = await apartamentService.getApartamentoByNumber(aptNum);

        if (apartamento) {
            res.status(200).json({ data: apartamento });
        } else {
            const errorMessage: Error = createError('Apartamento not found', '');
            res.status(404).json({ error: errorMessage });
        }
    } catch (error) {
        const errorMessage: Error = createError('Error getting apartamento', error);
        res.status(500).json({ error: errorMessage });
    }
}

/**
 * Controller to save a new apartamento
 * @param req Request object.
 * @param res Response object.
 */
export const saveApartamento = async (req: Request, res: Response) => {
    const apartamento: Apartamento = req.body;

    try {
        if (apartamento.num_apt) {
            const apartamentoResponse = await apartamentService.saveApartamento(apartamento);

            res.status(201).json({ data: apartamentoResponse });
        } else {
            const errorMessage: Error = createError('Body request malformed', '');
            res.status(400).json({ error: errorMessage });
        }
    } catch (error) {
        const errorMessage: Error = createError('Error saving a new apartment', error);
        res.status(500).json({ error: errorMessage });
    }
}