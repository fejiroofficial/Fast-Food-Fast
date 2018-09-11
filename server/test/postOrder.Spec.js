import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import allOrders from '../datastore/orders';

chai.use(chaiHttp);

describe('Orders', () => {
  describe('/POST order', () => {
    it('should post an order', (done) => {
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
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal('true');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('you just ordered for a food');
          done();
        });
    });
    it('should not post an order if userid is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
        price: 500,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('unauthorized user');
          done();
        });
    });
    it('should not post an order if full name is not provided', (done) => {
      const order = {
        id: 1,
        userId: 1,
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
        price: 500,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your full name is required');
          done();
        });
    });
    it('should post an order if phone number is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
        price: 500,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your phone number is required');
          done();
        });
    });
    it('should post an order if address is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        userTelephone: '08138776199',
        meal: 'fried rice',
        quantity: 1,
        price: 500,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your location is required');
          done();
        });
    });
    it('should post an order if meal is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        quantity: 1,
        price: 500,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('you have to order for something');
          done();
        });
    });
    it('should post an order if quantity is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        price: 500,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please provide the quantity of items');
          done();
        });
    });
    it('should post an order if price is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: 1,
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please input a price for this item');
          done();
        });
    });
  });
});
