import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../index';
import * as valorUnitarioService from '../service/valorUnitarioService';
import ValorUnitario from '../model/ValorUnitario';
import IValorUnitario from '../util/ValorUnitario';

const should = chai.should();

chai.use(chaiHttp);

describe('Valor unitario implementation', () => {
    const mock = sinon.mock(ValorUnitario);
    const fakeValorUnitario: IValorUnitario = {
        bill_date: '01/01/2020 - 02/28/2020',
        m3_rsd_bsc: 5,
        m3_rsd_bsc_sup: 10,
        disscounts: 523500,
        acue_fijo_resd: 5,
        acue_rsd_bsc: 10,
        acue_rsd_bsc_sup: 11,
        alc_fijo_resd: 5,
        alc_rsd_bsc: 10,
        alc_rsd_bsc_sup: 11,
        aseo_total: 135000
    }
    const fakeValorUnitarioModel = ValorUnitario.build(fakeValorUnitario);

    describe('Save valor unitario', () => {
        it('Should return status code 201 and and data', (done) => {
            mock.expects('create').withArgs(fakeValorUnitario).returns(Promise.resolve(fakeValorUnitarioModel));

            chai.request(app)
                .post('/valoresunitarios')
                .send(fakeValorUnitario)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('bill_date').eqls('01/01/2020 - 02/28/2020');
                    done();
                });

        });

        it('Should return status code 500 and error', (done) => {
            mock.expects('create').returns(Promise.reject(new Error('Error')));

            chai.request(app)
                .post('/valoresunitarios')
                .send(fakeValorUnitario)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.have.property('error');
                    done();
                });
        });
    });

    describe('Get valor unitario by bill date', () => {
        it('Should return status code 200 and data', (done) => {
            mock.expects('findAll').withArgs({ where: { bill_date: '01/01/2020 - 02/28/2020' } }).returns(Promise.resolve(fakeValorUnitarioModel));

            chai.request(app)
                .get('/valoresunitarios/' + encodeURIComponent('01/01/2020 - 02/28/2020'))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('bill_date').eqls('01/01/2020 - 02/28/2020');
                    done();
                });
        });

        it('Should return status code 500 and error', (done) => {
            mock.expects('findAll').returns(Promise.reject(new Error('Error')));

            chai.request(app)
                .get('/valoresunitarios/' + encodeURIComponent('01/01/2020 - 02/28/2020'))
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.have.property('error');
                    done();
                });
        });
    });
});