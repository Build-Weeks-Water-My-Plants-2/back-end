const request = require("supertest");
const server = require("./server.js");
const db = require("./data/db-config.js");

describe("server.js", () => {
  let userInfo = null;
  let registerRes = null;
  let token = null;
  let userId = null;

  beforeAll(async () => {
    userInfo = {
      username: "Nick",
      password: "123456",
    };
    registerRes = await request(server).post("/auth/register").send(userInfo);
    token = registerRes.body.token;
    userId = registerRes.body.data.id;
  });

  afterAll(async () => {
    await db("user").truncate();
    await db("plant").truncate();
  });

  describe("authentication", () => {
    describe("POST /auth/register", () => {
      it("should return a Created status code", async () => {
        const response = await request(server).post("/auth/register").send({
          username: "registerTest",
          password: "123456",
        });
        expect(response.status).toEqual(201);
      });

      it("should return a user object", async () => {
        const response = await request(server).post("/auth/register").send({
          username: "registerTest2",
          password: "123456",
        });
        expect(response.body.data.username).toEqual("registerTest2");
      });

      it("should NOT return the password hash", async () => {
        const response = await request(server).post("/auth/register").send({
          username: "registerTest3",
          password: "123456",
        });
        expect(response.body.data.password).toBeUndefined();
      });


      it("should return a JWT", async () => {
        const response = await request(server).post("/auth/register").send({
          username: "registerTest4",
          password: "123456",
        });
        expect(typeof response.body.token).toEqual("string");
      });

      it("should return a 422 for blank username", async () => {
        const response = await request(server).post("/auth/register").send({
          username: "",
          password: "123456",
        });
        expect(response.status).toEqual(422);
      });

      it("should return a 400 for missing username", async () => {
        const response = await request(server).post("/auth/register").send({
          password: "123456",
        });
        expect(response.status).toEqual(400);
      });
    });

    describe("POST /auth/login", () => {
      it("should return a 200 status code", async () => {
        const response = await request(server).post("/auth/login").send({
          username: "Nick",
          password: "123456",
        });
        expect(response.status).toEqual(200);
      });

      it("should return a JWT", async () => {
        const response = await request(server).post("/auth/login").send({
          username: "Nick",
          password: "123456",
        });
        expect(typeof response.body.token).toEqual("string");
      });

      it("should return a 401 for the wrong password", async () => {
        const response = await request(server).post("/auth/login").send({
          username: "Nick",
          password: "Wrong password",
        });
        expect(response.status).toEqual(401);
      });

      it("should return a 422 for blank username", async () => {
        const response = await request(server).post("/auth/login").send({
          username: "",
          password: "123456",
        });
        expect(response.status).toEqual(422);
      });

      it("should return a 400 for missing username", async () => {
        const response = await request(server).post("/auth/login").send({
          password: "123456",
        });
        expect(response.status).toEqual(400);
      });
    });
  });

  describe("users", () => {
    describe("GET /users/:id", () => {
      it("should return an OK status code", async () => {
        const response = await request(server)
          .get("/users/" + userId)
          .set({
            Authorization: token,
          });
        expect(response.status).toEqual(200);
      });

      it("should return the username and user id", async () => {
        const response = await request(server)
          .get("/users/" + userId)
          .set({
            Authorization: token,
          });
        expect(response.body.username).toEqual("Nick");
        expect(response.body.id).toEqual(1);
      });

      it("should NOT return the password hash", async () => {
        const response = await request(server)
          .get("/users/" + userId)
          .set({
            Authorization: token,
          });
        expect(response.body.password).toBeUndefined();
      });

      it("should return 401 if no Authorization", async () => {
        const response = await request(server).get("/users/" + userId);
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual("Missing authorization header");
      });

      it("should return 401 if bad Authorization", async () => {
        const response = await request(server)
          .get("/users/" + userId)
          .set({
            Authorization: "wrong token",
          });
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual("Invalid Credentials");
      });
    });

    describe("PUT /users/:id", () => {
      let userInfo = {
        username: "NickForPut",
        password: "123456",
      };
      let registerRes = null;
      let token = null;
      let putUserId = null;

      beforeAll(async () => {
        registerRes = await request(server)
          .post("/auth/register")
          .send(userInfo);
        token = registerRes.body.token;
        putUserId = registerRes.body.data.id;
      });

      it("should return an OK status code", async () => {
        const response = await request(server)
          .put("/users/" + putUserId)
          .set({
            Authorization: token,
          })
          .send({
            phone_number: "555-5555",
          });
        expect(response.status).toEqual(200);
      });

      it("should return return the updated user", async () => {
        const response = await request(server)
          .put("/users/" + putUserId)
          .set({
            Authorization: token,
          })
          .send({
            phone_number: "123-4567",
          });
        expect(response.body).toMatchObject({
          username: "NickForPut",
          phone_number: "123-4567",
        });
      });

      it("should NOT return the password hash", async () => {
        const response = await request(server)
          .put("/users/" + putUserId)
          .set({
            Authorization: token,
          })
          .send({
            phone_number: "999-9999",
          });
        expect(response.body.password).toBeUndefined();
      });

      it("response should match the user in the db", async () => {
        const response = await request(server)
          .put("/users/" + putUserId)
          .set({
            Authorization: token,
          })
          .send({
            phone_number: "987-6543",
          });
        const dbUser = await db("user").where({ id: putUserId }).first();
        delete dbUser.password;
        expect(response.body).toMatchObject(dbUser);
      });
    });
  });

  describe("plants", () => {
    let plantResponse = null;
    let plantId = null;

    beforeAll(async () => {
      plantResponse = await request(server)
        .post("/plants")
        .set({
          Authorization: token,
        })
        .send({
          nickname: "planty",
          species: "something",
        });
      plantId = plantResponse.body.id;
    });
    //Test GET Plants
    describe("GET /plants/:id", () => {
      it("Should return OK status code 200", async () => {
        const expectedStatusCode = 200;
        const response = await request(server)
          .get("/plants/" + plantId)
          .set({
            Authorization: token,
          });
        expect(response.status).toEqual(expectedStatusCode);
      });
    });

    //PUT Update plants
    describe("PUT /plants/:id", () => {
      it("Should Update plants entry, code 201", async () => {
        const expectedStatusCode = 201;
        const response = await request(server)
          .put("/plants/" + plantId)
          .set({
            Authorization: token,
          })
          .send({
            nickname: "Sleepy Tea",
            species: "camomile",
          });
        expect(response.status).toEqual(expectedStatusCode);
      });
    });

    //DELETE plants
    describe("DELETE /plants/:id", () => {
      it("Should Delete plant entry, code 204", async () => {
        const expectedStatusCode = 204;
        const response = await request(server)
          .delete("/plants/" + plantId)
          .set({
            Authorization: token,
          });
        expect(response.status).toEqual(expectedStatusCode);
      });
    });
  });
});
