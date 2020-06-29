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

  describe("authentication", () => {});

  describe("users", () => {
    describe("GET /users/:id", () => {
      it("should return an OK status code", async () => {
        console.log("token in the test: ", token);
        const expectedStatusCode = 200;
        const response = await request(server)
          .get("/users/" + userId)
          .set({
            Authorization: token,
          });
        expect(response.status).toEqual(expectedStatusCode);
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
        console.log(plantId);
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
