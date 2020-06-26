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
        const expectedStatusCode = 200;
        const response = await request(server).get('/users/' + userId).set({
          Authorization: token
        });
        expect(response.status).toEqual(expectedStatusCode);
      });

      it('should return the username and user id', async () => {
        const expectedUsername = "Nick";
        const expectedId = 1;
        const response = await request(server).get('/users/' + userId).set({
          Authorization: token
        });
        expect(response.body.username).toEqual(expectedUsername);
        expect(response.body.id).toEqual(expectedId);
      });

      it('should return 401 if no Authorization', async () => {
        const expectedStatusCode = 401;
        const expectedMessage = "Missing authorization header";
        const response = await request(server).get('/users/' + userId);
        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body.message).toEqual(expectedMessage);
      });

      it('should return 401 if bad Authorization', async () => {
        const expectedStatusCode = 401;
        const expectedMessage = "Invalid Credentials";
        const response = await request(server).get('/users/' + userId).set({
          Authorization: "wrong token"
        });
        expect(response.status).toEqual(expectedStatusCode);
        expect(response.body.message).toEqual(expectedMessage);
      });

    });

    describe('PUT /users/:id', () => {
      let userInfo = {
        username: "NickForPut",
        password: "123456"
      };
      let registerRes = null;
      let token = null;
      let putUserId = null;

      beforeAll(async () => {
        registerRes = await request(server).post('/auth/register').send(userInfo);
        token = registerRes.body.token;
        putUserId = registerRes.body.data.id;
      });

      it('should return an OK status code', async () => {
        const response = await request(server).put('/users/' + putUserId).set({
          Authorization: token
        }).send({
          phone_number: "555-5555"
        });
        expect(response.status).toEqual(200);
      });

      it('should return return the updated user', async () => {
        const response = await request(server).put('/users/' + putUserId).set({
          Authorization: token
        }).send({
          phone_number: "123-4567"
        });
        expect(response.body).toMatchObject({
          username: "NickForPut",
          phone_number: "123-4567"
        });
      });

      it('response should match the user in the db', async () => {
        const response = await request(server).put('/users/' + putUserId).set({
          Authorization: token
        }).send({
          phone_number: "987-6543"
        });
        const dbUser = await db('user').where({id: putUserId}).first();
        expect(response.body).toMatchObject(dbUser);
      });
    });

  });

  describe('plants', () => {
  });
});
