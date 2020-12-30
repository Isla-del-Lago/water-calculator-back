import chai from 'chai';
import * as apartmentService from '../service/apartmentService';
import sinon from 'sinon';
import IApartamento from '../util/Apartamento';
import { Apartamento } from '../model/Apartamento';
import { app } from '../index';
import chaiHttp from 'chai-http';
import { Model, ModelCtor } from 'sequelize/types';

const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);

describe('Apartment implementation', () => {
    describe('Get apartment by it\'s number', () => {
        const stub = sinon.stub(Apartamento, 'findOne');

        it('Should return ok status and data', (done) => {
            const fakeModel = Apartamento.build({ num_apt: '214', owner_name: 'x', password: 'y' });

            stub.withArgs({ where: { num_apt: '214' } }).returns(Promise.resolve(fakeModel));

            chai.request(app)
                .get('/apartment/214')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.haveOwnProperty('data');
                    res.body.data.should.have.property('num_apt').eql('214');
                    res.body.data.should.have.property('owner_name').eql('x');
                    res.body.data.should.have.property('password').eql('y');
                    done();
                });
        });

        it('Should return 404 status and error', (done) => {
            stub.withArgs({ where: { num_apt: '200' } }).returns(Promise.resolve(null));

            chai.request(app)
                .get('/apartment/200')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('Should return 500 status and error', (done) => {
            stub.withArgs({ where: { num_apt: '200' } }).returns(Promise.reject('Error'));

            chai.request(app)
                .get('/apartment/200')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('Save new apartment', () => {
        const mock = sinon.mock(Apartamento);

        it('Should have status code 201 and data', (done) => {
            const fakeApartment: IApartamento = { num_apt: '214', owner_name: 'x', password: 'y' };
            const fakeModel = Apartamento.build({ num_apt: '214', owner_name: 'x', password: 'y' });

            mock.expects('create').withArgs(fakeApartment).returns(Promise.resolve(fakeModel));

            chai.request(app)
                .post('/apartment')
                .send(fakeApartment)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it('Should have status code 400 and error data', (done) => {
            const fakeApartment = {};

            chai.request(app)
                .post('/apartment')
                .send(fakeApartment)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.have.property('error');
                    done();
                });
        });

        it('Should have status code 500 and error', (done) => {
            const fakeApartment: IApartamento = { num_apt: '214', owner_name: 'x', password: 'y' };
            mock.expects('create').withArgs(fakeApartment).returns(Promise.reject());

            chai.request(app)
                .post('/apartment')
                .send(fakeApartment)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});