import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';

chai.use(chaiHTTP);

describe('PATCH /users/:id', () => {
  describe('User signup', () => {
    it('throw error if user does not exist in the database', (done) => {
      let user = {
        adminUser: 101,
      }
      
      chai
        .request(app)
        .patch('/api/v1/users/1000')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('User does not exist in the database')
          done();
        });
    });
    it('update should be successful if user is found', (done) => {
      let user = {
        adminUser: 101,
      }
      
      chai
        .request(app)
        .patch('/api/v1/users/1')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('successful! status modified by you')
          done();
        });
    });
    it('should throw an error if a value is not provided for update', (done) => {
      let user = {}
      
      chai
        .request(app)
        .patch('/api/v1/users/1')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('you must provide a value for adminUser')
          done();
        });
    });
    it('should throw an error if a value provided for update is not code', (done) => {
      let user = {
        adminUser: 400,
      }
      
      chai
        .request(app)
        .patch('/api/v1/users/1')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid admin status code')
          done();
        });
    });
    it('should throw an error if the value provided for param is not a number', (done) => {
      let user = {
        adminUser: 100,
      }
      
      chai
        .request(app)
        .patch('/api/v1/users/a')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid id, id should be a number')
          done();
        });
    });
  })
})    