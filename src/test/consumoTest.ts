import chai from 'chai';
import sinon, { mock } from 'sinon';
import chaiHttp from 'chai-http';
import Consumo from '../model/Consumo';
import IConsumo from '../util/Consumo';
import { app } from '../index';

const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);

describe('Consumo implementation', () => {
    const mock = sinon.mock(Consumo);

    const fakeConsumo: IConsumo = {
        num_apt: '214',
        bill_date: '01/01/2020 - 02/28/2020',
        consumption_price: 20000,
        m3_rsd_bsc: 12,
        m3_rsd_bsc_sup: 10,
        counter_value: 123123
    };

    const fakeConsumoModel = Consumo.build(fakeConsumo);

    describe('Get consumo by apt number', () => {
        it('Should return status code 200 and data', (done) => {
            mock.expects('findAll').withArgs({ where: { num_apt: '214' } }).returns(Promise.resolve([fakeConsumoModel]));

            chai.request(app)
                .get('/consumos/aptNumber/214')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.length(1);
                    res.body.data[0].should.have.property('num_apt').eqls('214');
                    res.body.data[0].should.have.property('bill_date').eqls('01/01/2020 - 02/28/2020');
                    res.body.data[0].should.have.property('consumption_price').eqls(20000);
                    res.body.data[0].should.have.property('m3_rsd_bsc').eqls(12);
                    res.body.data[0].should.have.property('m3_rsd_bsc').eqls(12);
                    res.body.data[0].should.have.property('m3_rsd_bsc_sup').eqls(10);
                    res.body.data[0].should.have.property('counter_value').eqls(123123);
                    done();
                });
        });

        it('Should return status code 500 and error', (done) => {
            mock.expects('findAll').returns(Promise.reject(new Error('Error')));

            chai.request(app)
                .get('/consumos/aptNumber/214')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.have.property('error');
                    done();
                });
        });
    });

    describe('Get consumo by bill date', () => {
        it('Should return status code 200 and data', (done) => {
            mock.expects('findAll')
                .withArgs({ where: { bill_date: '01/01/2020 - 02/28/2020' } })
                .returns(Promise.resolve([fakeConsumoModel]));

            chai.request(app)
                .get(`/consumos/billDate/${encodeURIComponent('01/01/2020 - 02/28/2020')}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.length(1);
                    res.body.data[0].should.have.property('num_apt').eqls('214');
                    res.body.data[0].should.have.property('bill_date').eqls('01/01/2020 - 02/28/2020');
                    res.body.data[0].should.have.property('consumption_price').eqls(20000);
                    res.body.data[0].should.have.property('m3_rsd_bsc').eqls(12);
                    res.body.data[0].should.have.property('m3_rsd_bsc').eqls(12);
                    res.body.data[0].should.have.property('m3_rsd_bsc_sup').eqls(10);
                    res.body.data[0].should.have.property('counter_value').eqls(123123);
                    done();
                });
        });

        it('Should return status code 500 and error', (done) => {
            mock.expects('findAll').returns(Promise.reject(new Error('Error')));

            chai.request(app)
                .get(`/consumos/billDate/${encodeURIComponent('01/01/2020 - 02/28/2020')}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.have.property('error');
                    done();
                });
        });
    });

    describe('Get consumo by apt number and bill date', () => {
        it('Should return status code 200 and data', (done) => {
            mock.expects('findAll')
                .withArgs({ where: { bill_date: '01/01/2020 - 02/28/2020', num_apt: '214' } })
                .returns(Promise.resolve([fakeConsumoModel]));

            chai.request(app)
                .get(`/consumos/billDate/${encodeURIComponent('01/01/2020 - 02/28/2020')}/aptNumber/214`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.length(1);
                    res.body.data[0].should.have.property('num_apt').eqls('214');
                    res.body.data[0].should.have.property('bill_date').eqls('01/01/2020 - 02/28/2020');
                    res.body.data[0].should.have.property('consumption_price').eqls(20000);
                    res.body.data[0].should.have.property('m3_rsd_bsc').eqls(12);
                    res.body.data[0].should.have.property('m3_rsd_bsc').eqls(12);
                    res.body.data[0].should.have.property('m3_rsd_bsc_sup').eqls(10);
                    res.body.data[0].should.have.property('counter_value').eqls(123123);
                    done();
                });
        });

        it('Should return status code 500 and error', (done) => {
            mock.expects('findAll').returns(Promise.reject(new Error('Error')));

            chai.request(app)
                .get(`/consumos/billDate/${encodeURIComponent('01/01/2020 - 02/28/2020')}/aptNumber/214`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.have.property('error');
                    done();
                })
        });
    });

    describe('Save consumo', () => {
        it('Should return status code 201 and data', (done) => {
            mock.expects('create').withArgs(fakeConsumo).returns(Promise.resolve(fakeConsumoModel));

            chai.request(app)
                .post('/consumos')
                .send(fakeConsumo)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('num_apt').eqls('214');
                    done();
                });
        });

        it('Should return status code 500 and error', (done) => {
            mock.expects('create').returns(Promise.reject(new Error('error')));

            chai.request(app)
                .post('/consumos')
                .send(fakeConsumo)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.have.property('error');
                    done();
                });
        });
    });
});