const request = require('supertest');
const server = require('./server.js');
const db = require('./data/db-config.js');

describe('server.js', () => {
  let userInfo = null;
  let registerRes = null;
  let token = null;
  let userId = null;

  beforeAll(async () => {
    userInfo = {
      username: "Nick",
      password: "123456"
    };
    registerRes = await request(server).post('/auth/register').send(userInfo);
    token = registerRes.body.token;
    userId = registerRes.body.data.id;
  });

  afterAll(async () => {
    await db('user').truncate();
    await db('plant').truncate();
  });

  describe('authentication', () => {
  });

  describe('users', () => {
    describe('GET /users/:id', () => {

      it('should return an OK status code', async () => {
        console.log('token in the test: ', token);
        const expectedStatusCode = 200;
        const response = await request(server).get('/users/' + userId).set({
          Authorization: token
        });
        expect(response.status).toEqual(expectedStatusCode);
      });

    });
  });

  describe('plants', () => {
  });
});
