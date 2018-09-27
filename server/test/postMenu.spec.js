import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);


describe('POST /menu', () => {
  describe('posting a menu endpoint', () => {
    it('it should successfully post a meal if user is an admin', (done) => {
        const newMeal = {
            itemName: 'chinese rice',
            price: 600,
            foodImage: 'https://cdad5c1a.jpg',
          };
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
        .send(newMeal)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal('true');
          expect(res.body.food).to.be.an('object')
          expect(res.body.message).to.equal('meal has been added in successfully')
          done();
        });
    });
    it('it should not post a meal if user is not admin', (done) => {
        const newMeal = {
            id: 1,
            itemName: 'Egusi soup',
            price: 600,
            foodImage: 'https://cdad5c1a.jpg'
          };
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
        .send(newMeal)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('user unauthorized to add a meal')
          done();
        });
    });
    it('it should not post a meal if token is invalid', (done) => {
        const newMeal = {
            id: 1,
            itemName: 'Egusi soup',
            price: 600,
            foodImage: 'https://cdad5c1a.jpg'
          };
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({id: 1000 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
        .send(newMeal)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Invalid user authorization token')
          done();
        });
    });
    it('it should not post a meal if item name is not provided', (done) => {
        const newMeal = {
            id: 1,
            price: 600,
            foodImage: 'https://cdad5c1a.jpg'
          };
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
        .send(newMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('you must input a name for the food item')
          done();
        });
    });
    it('it should not post a meal if item price is not provided', (done) => {
        const newMeal = {
            id: 1,
            itemName: 'Egusi soup',
            foodImage: 'https://cdad5c1a.jpg'
          };
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
        .send(newMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('please provide the price for the food item')
          done();
        });
    });
    it('it should not post a meal if item price is not a number', (done) => {
        const newMeal = {
            id: 1,
            itemName: 'Egusi soup',
            price: 500,
            foodImage: 'https://cdad5c1a.jpg'
          };
        const priceNan = { ...newMeal,
        price: 'gfgfg' 
        }  
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
        .send(priceNan)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('food item price must be a number')
          done();
        });
    });
    it('it should not post a meal if image URL is not provided', (done) => {
        const newMeal = {
            id: 1,
            itemName: 'Egusi soup',
            price: 500,
          };  
      chai
        .request(app)
        .post('/api/v1/menu')
        .set('token', `${jwt.sign({id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
        .send(newMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('please provide the image address for the food item')
          done();
        });
    });
    it('it should not post a meal if image URL is invalid', (done) => {
      const newMeal = {
          id: 1,
          itemName: 'Egusi soup',
          price: 500,
          foodImage: 'tps://cdad5c1a.jpg'
        };  
    chai
      .request(app)
      .post('/api/v1/menu')
      .set('token', `${jwt.sign({id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(newMeal)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('URL is not valid')
        done();
      });
  });
  })
})  
