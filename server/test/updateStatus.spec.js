import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import allOrders from '../datastore/orders';

chai.use(chaiHttp);

describe('Order status', () => {
  describe('/PUT order status', () => {
    it('should update an order status', (done) => {
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
      chai.request(app)
        .put('/api/v1/orders/' + order.id)
        .send({ orderStatus: 'progress' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal('true');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('order status updated');
          done();
        });
    });
    it('should not update an order status if param is a string', (done) => {
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
        .put('/api/v1/orders/' + wrongParam)
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
    it('should not update an order status if it doesnt exist', (done) => {
      chai.request(app)
        .put('/api/v1/orders/100')
        .send({ orderStatus: 'progress'})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Cannot update status of an order that does not exist');
          done();
        });
    });
    it('should throw an error if order status is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
        price: 500,
      };
      chai.request(app)
        .put('/api/v1/orders/' + order.id)
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('order status is required');
          done();
        });
    });
    it('should throw an error if order status is a number', (done) => {
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
      chai.request(app)
        .put('/api/v1/orders/' + order.id)
        .send({orderStatus: 4})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('order status should not be a number');
          done();
        });
    });
    it('should throw an error if order status is not progress or delivered', (done) => {
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
      chai.request(app)
        .put('/api/v1/orders/' + order.id)
        .send({orderStatus: 'ttttt'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('order status should be a (progress) or a (delivered)');
          done();
        });
    });
  })
});