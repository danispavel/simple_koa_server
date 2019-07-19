process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const Ideas = require('../models/ideas');
const Server = require('../core/Server');
const App = require('../core/App');
const config = require('../config');
require('mocha-ctx');

chai.should();

chai.use(chaiHttp);
let Cookies;
describe('Application', async () => {
  let api;
  before(async () => {
    await App.init();
    const server = new Server(App);
    api = await server.start(config.appPort);
    Ideas.destroy({ where: {} });
  });
  after(() => {
    // api.close();
  });

  describe('Autorization:', () => {
    it('should be authorize', (done) => {
      chai
        .request(api).post('/login')
        .send({
          username: 'danis',
          password: 'danis',
        })
        .end((err, res) => {
          Cookies = res.headers['set-cookie']
            .map(r => r.replace('; path=/; httponly', '')).join('; ');
          done();
        });
      describe('/POST /ideas', () => {
        it('it should POST object idea response', (done) => {
          const req = chai.request(api).post('/ideas').send({
            title: 'test 1',
            description: 'test 1 test 1 test 1 test 1 test 1',
          });
          req.set('Cookie', Cookies);
          req
            .end((err, res) => {
              res.should.have.status(200);

              res.body.should.have.property('title', 'test 1');
              res.body.should.have.property('description', 'test 1 test 1 test 1 test 1 test 1');

              done();
            });
        });
        it('it shouldn`t POST object idea response and return status 400', (done) => {
          const req = chai.request(api).post('/ideas').send({
            title: 'te',
            description: 'test 1 test 1',
          });
          req.set('Cookie', Cookies);
          req
            .end((err, res) => {
              res.should.have.status(400);
              res.error.should.have.property('text', 'No correct data');
              done();
            });
        });
      });
    });
  });

  describe('/GET ping', () => {
    it('it should GET pong response', (done) => {
      chai
        .request(api)
        .get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('text', 'pong');
          done();
        });
    });
  });
});
