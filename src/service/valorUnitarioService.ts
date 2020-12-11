import ValorUnitario from '../model/ValorUnitario';
import IValorUnitario from '../util/ValorUnitario';

/**
 * Get valor unitario by bill date from Model.
 * @param billDate Bill date.
 */
export const getValorUnitarioByBillDate = async (billDate: string) => {
    const valorUnitario = await ValorUnitario.findAll({
        where: {
            bill_date: billDate
        }
    });

    return valorUnitario
}

/**
 * 
 * @param valorUnitario 
 */
export const saveValorUnitario = async (valorUnitario: IValorUnitario) => {
    const valorUnitarioResponse = await ValorUnitario.create(valorUnitario);

    return valorUnitarioResponse;
}