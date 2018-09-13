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
        userId: '',
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
          expect(res.body.message).to.equal('unauthorized user, please sign up');
          done();
        });
    });
    it('should not post an order if userid does not exist in db', (done) => {
      const order = {
        id: 1,
        fullname: 'okoro nwafor',
        userId: '1000',
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
          expect(res.body.message).to.equal('unauthorized user, please sign up');
          done();
        });
    });
    it('should not post an order if userid is not a number', (done) => {
      const order = {
        id: 1,
        userId: 'www',
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
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user id should be a number');
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
        quantity: '',
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
    it('should not post an order if quantity is not a number', (done) => {
      const order = {
        id: 1,
        userId: 1,
        fullname: 'okoro nwafor',
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 'www',
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
          expect(res.body.message).to.equal('quantity input should be a number');
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
        price: '',
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
    it('should not post an order if price is not a number', (done) => {
      const order = {
        id: 1,
        userId: 1,
        fullname: 'okoro nwafor',
        userTelephone: '08138776199',
        address: '14 shomolu street, mushin, lagos',
        meal: 'fried rice',
        quantity: 1,
        price: 'fff',
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('price input should be a number');
          done();
        });
    });
  });
});
