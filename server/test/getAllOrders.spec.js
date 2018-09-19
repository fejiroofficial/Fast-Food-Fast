import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import allOrders from '../datastore/orders';

chai.use(chaiHttp);

describe('Order status', () => {
    describe('/GET a list of orders', () => {
        it('should get a list of orders', (done) => {
            chai.request(app)
              .get('/api/v1/orders/')
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal('true');
                expect(res.type).to.equal('application/json');
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('This is a list of all orders');
                expect(res.body.orders).to.be.an('array');
                done();
              });
          });
    })
})