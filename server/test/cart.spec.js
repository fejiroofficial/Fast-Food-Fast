import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

describe('add to cart', () => {
  it('should return error if foodId is not provided', (done) => {
    const addToCart =
      {
        quantity: 2,
      }
    chai
      .request(app)
      .post('/api/v1/cart')
      .set('token', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(addToCart)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('please select a food item on the menu');
        done();
      });
  })
  it('should return error if quantity is not provided', (done) => {
    const addToCart =
      {
        foodId: 2,
      };
    chai
      .request(app)
      .post('/api/v1/cart')
      .set('token', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(addToCart)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('please provide the quantity for item');
        done();
      });
  })
  it('should return error if foodId is not a number', (done) => {
    const addToCart =
      {
        foodId: 't',
        quantity: 2,
      };
    chai
      .request(app)
      .post('/api/v1/cart')
      .set('token', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(addToCart)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('invalid food id');
        done();
      });
  })
  it('should return error if quantity is not a number', (done) => {
    const addToCart =
      {
        foodId: 2,
        quantity: 'tt',
      }
    chai
      .request(app)
      .post('/api/v1/cart')
      .set('token', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(addToCart)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('invalid quantity, quantity must be a number');
        done();
      });
  })
});