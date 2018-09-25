import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Get food menu', () => {
  it('should return an array of food menu', (done) => {
    const menu = [
      {
        id: 1,
        item_name: 'egusi soup',
        price: '600',
        food_image: 'http://google.jpg'
      }
    ]
    chai
      .request(app)
      .get('/api/v1/menu')
      .send(menu)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal('true');
        expect(res.body.menu).to.be.an('array');
        done();
      });
  })
});
