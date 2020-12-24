import { Apartamento } from '../model/Apartamento';
import IApartamento from '../util/Apartamento';

/**
 * Get apartment by the given number.
 * @param aptNumber 
 */
export const getApartamentoByNumber = async (aptNumber: string) => {
    const apartment = await Apartamento.findOne({
        where: {
            num_apt: aptNumber
        }
    });

    return apartment;
}

/**
 * Save the given apartamento.
 * @param apartamento Apartamento object.
 */
export const saveApartamento = async (apartamento: IApartamento) => {
    const apartamentoResponse = await Apartamento.create(apartamento);

    return apartamentoResponse;
}