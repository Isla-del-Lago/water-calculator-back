import Consumo from '../model/Consumo';
import IConsumo from '../util/Consumo';

/**
 * Get apto consumos by the given apto number.
 * @param aptNumber Apartment number.
 */
export const getConsumosByAptNumber = async (aptNumber: string) => {
    const aptoConsumos = await Consumo.findAll({
        where: {
            num_apt: aptNumber
        }
    });

    return aptoConsumos;
}

/**
 * Get consumos by the given bill date.
 * @param billDate Bill date.
 */
export const getConsumosByBillDate = async (billDate: string) => {
    const consumosByBillDate = await Consumo.findAll({
        where: {
            bill_date: billDate
        }
    });

    return consumosByBillDate;
}

/**
 * Get consumos by the given apto number and bill date.
 * @param billDate Bill date.
 * @param aptNumber Apartment number.
 */
export const getConsumosByAptNumberAndBillDate = async (billDate: string, aptNumber: string) => {
    const consumosByBillDateAndAptNumber = await Consumo.findAll({
        where: {
            bill_date: billDate,
            apt_num: aptNumber
        }
    });

    return consumosByBillDateAndAptNumber;
}

/**
 * Save a new consumo.
 * @param consumo Consumo object.
 */
export const saveConsumo = async (consumo: IConsumo) => {
    const consumoResponse = await Consumo.create(consumo);

    return consumoResponse;
}