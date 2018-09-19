import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import allOrders from '../datastore/orders';

chai.use(chaiHttp);

describe('Fetch order', () => {
  describe('/GET a specific order', () => {
    it('should get a specific order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal('true');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('order found');
          expect(res.body.order).to.be.an('object');
          done();
        });
    });
    it('should throw an error if param is a string', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
        price: 500,
        orderStatus: 'pending',
      };
      const wrongParam = 'a'
      chai.request(app)
        .get('/api/v1/orders/' + wrongParam)
        .send({ orderStatus: 'progress' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('hooops! params should be a number e.g /1 and not /a');
          done();
        });
    });
    it('should not fetch an order that doesnt exist', (done) => {
      chai.request(app)
        .get('/api/v1/orders/100')
        .send({ orderStatus: 'progress'})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('This order does not exist in the database');
          done();
        });
    });
  })
});