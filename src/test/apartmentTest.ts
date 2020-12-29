import chai from 'chai';
import * as apartmentService from '../service/apartmentService';
import sinon from 'sinon';
import IApartamento from '../util/Apartamento';
import { Apartamento } from '../model/Apartamento';
import { app } from '../index';
import chaiHttp from 'chai-http';

const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);

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
        const stub = sinon.stub(apartmentService, 'getApartamentoByNumber');

        it('Should return ok status and data', () => {
            const fakeModel = Apartamento.build({ num_apt: '214', owner_name: 'x', password: 'y' });

            stub.withArgs('214').returns(Promise.resolve(fakeModel));

            chai.request(app)
                .get('/apartment/214')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.haveOwnProperty('data');
                    res.body.data.should.have.property('num_apt').eql('214');
                    res.body.data.should.have.property('owner_name').eql('x');
                    res.body.data.should.have.property('password').eql('y');
                })
        });

        it('Should return 404 status and error', () => {
            stub.withArgs('200').returns(Promise.resolve(null));

            chai.request(app)
                .get('/apartament/200')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.have.property('error');
                });
        });
    });

    describe('Save new apartment controller', () => {
        const stub = sinon.stub(apartmentService, 'saveApartamento');

        it('Should have status code 201 and data', () => {
            const fakeApartment: IApartamento = { num_apt: '214', owner_name: 'x', password: 'y' };
            const fakeModel = Apartamento.build({ num_apt: '214', owner_name: 'x', password: 'y' });

            stub.withArgs(fakeApartment).returns(Promise.resolve(fakeModel));

            chai.request(app)
                .post('/apartment')
                .send(fakeApartment)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('num_apt').eql('214');
                    res.body.data.should.have.property('owner_name').eql('x');
                    res.body.data.should.have.property('password').eql('y');
                });
        });

        it('Should have status code 400 and error data', () => {
            const fakeApartment = {};

            chai.request(app)
                .post('/apartment')
                .send(fakeApartment)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.have.property('error');
                });
        });
    });
});