/*
Roberto López (zelopdotnet@proton.me)
*/

const request = require("supertest")
const main = require("../main.js")

// Users and policy extracted by hand from "DB". On a real life scenario we would use stable users from our mock database
// or just pick one at random from the DB.

const userId = "44e44268-dce8-4902-b662-1b34d2c10b8e"
const adminId = "a0ece5db-cd14-4f21-812f-966633e7be86"

const testUser = {
    "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
    "name": "Manning",
    "email": "manningblankenship@quotezart.com",
    "role": "admin"
}

const testPolicy = {  
    "id":"64cceef9-3a01-49ae-a23b-3761b604800b",
    "amountInsured":1825.89,
    "email":"inesblankenship@quotezart.com",
    "inceptionDate":"2016-06-01T03:33:32Z",
    "installmentPayment":true,
    "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
}

describe("Get /user/", () => {
    let app;

    beforeAll(async () => {
        app = await main();
    });

    // We are using the provided DB as testing data.
    // As the functions we are calling are only GETs
    // we don't have to worry about cleaning up after the texts
    // or using dummy entries.

    test("Check user restriction on /user/", (done) => {
        request(app)
            .get("/user/id/" + testUser.id)
            .set('Authorization', "Bearer ThisUserDoesNotExist")
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    }),

    test("Get user by id", (done) => {
        request(app)
            .get("/user/id/" + testUser.id)
            .set('Authorization', "Bearer " + userId)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect((res) => {
                    res.body.data[0] = testUser;
                })
                return done();
            });
    })

    test("Get user by username", (done) => {
        request(app)
            .get("/user/name/" + testUser.name)
            .set('Authorization', "Bearer " + userId)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect((res) => {
                    res.body.data[0] = testUser;
                })
                return done();
            });
    })
    test("Check user restriction on /policies", (done) => {
        request(app)
        .get("/policies/id/" + testPolicy.id)
            .set('Authorization', "Bearer ThisUserDoesNotExist")
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    }),

    test("Check non admin restriction on /policies", (done) => {
        request(app)
        .get("/policies/id/" + testPolicy.id)
            .set('Authorization', "Bearer " + userId)
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    }),

    test("Get user linked to policyid", (done) => {
        request(app)
            .get("/policies/getuser/" + testPolicy.id)
            .set('Authorization', "Bearer " + adminId)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect((res) => {
                    res.body.data[0].id = testPolicy.clientId;
                })
                return done();
            });
    })

    test("Get policies by username", (done) => {
        request(app)
            .get("/policies/username/" + testUser.name)
            .set('Authorization', "Bearer " + adminId)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    })
})