import chai from 'chai';
import * as apartmentService from '../service/apartmentService';
import sinon from 'sinon';
import IApartamento from '../util/Apartamento';
import { Apartamento } from '../model/Apartamento';

const assert = chai.assert;

describe('Apartment service implementation', () => {
    describe('Get apartment by its number function', () => {
        const stub = sinon.stub(Apartamento, 'findOne');

        it('Should return null when apt doesn\'t exists', async () => {
            stub.withArgs({ where: { num_apt: '200' } }).returns(Promise.resolve(null));

            assert.equal(null, await apartmentService.getApartamentoByNumber('200'));
        });

        it('Should return an object when apartment does exists', async () => {
            const fakeModel = Apartamento.build({ num_apt: '214', owner_name: 'x', password: 'y' });

            stub.withArgs({ where: { num_apt: '214' } }).returns(Promise.resolve(fakeModel));

            assert.isNotNull(await apartmentService.getApartamentoByNumber('214'));
        });
    });

    describe('Save a new apartment function', () => {
        const stub = sinon.stub(Apartamento, 'create');

        it('Should return a model when the save is succesfull', async () => {
            const fakeApartment: IApartamento = { num_apt: '214', owner_name: 'x', password: 'y' };

            stub.withArgs(fakeApartment, { returning: false }).returns(Promise.resolve());

            assert.equal(null, await apartmentService.saveApartamento(fakeApartment));
        });
    });
});

describe('Apartment controller implementation', () => {
    describe('Get apartment by it\'s number controller', () => {

    });

    describe('Save new apartment controller', () => {

    });
});