const appUrl = 'http://localhost:3000/api/v1'; // Replace with the actual URL of your deployed Express app
const request = require('supertest');
const casual = require('casual');
var sleep = require('sleep');

function generateRandomUserInfo() {
  const name = casual.full_name;
  const email = casual.email;
  const password = casual.password;

  return {
    name,
    email,
    password
  };
}

// Example usage to generate 3 userInfos
const usersInfo = Array.from({ length: 4 }, () => generateRandomUserInfo());

let userToken = "" // User token to be got from /auth and save for other tests.

// Make a sleep for sometime till the server is up.
sleep.sleep(5);

describe('Testing the mock-user API.', () => {
    it('POST /users 1', (done) => {
        request(appUrl)
        .post('/users')
        .send(usersInfo[0])
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    
    it('POST /users 2', (done) => {
        request(appUrl)
        .post('/users')
        .send(usersInfo[1])
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('POST /users 3', (done) => {
        request(appUrl)
        .post('/users')
        .send(usersInfo[2])
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('POST /auth', (done) => {
        request(appUrl)
        .post('/auth')
        .send({
                "email": usersInfo[0].email,
                "password": usersInfo[0].password
            })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            userToken = res.body.token;
            done();
        });
    });
    
    it('GET /users', (done) => {
        request(appUrl)
        .get('/users')
        .set('Authorization', userToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('PATCH /users', (done) => {
        request(appUrl)
        .patch('/users')
        .set('Authorization', userToken)
        .send(usersInfo[4])
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('DELETE /users', (done) => {
        request(appUrl)
        .delete('/users')
        .set('Authorization', userToken)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('DELETE /all-users', (done) => {
        request(appUrl)
        .delete('/all-users')
        .send({
            "key_admin": "keyadmin123"
          })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('POST /users with empty strings', (done) => {
        request(appUrl)
        .post('/users')
        .send({
            "name": "",
            "email": "",
            "password": ""
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('POST /users with invalid request (only password)', (done) => {
        request(appUrl)
        .post('/users')
        .send({
            "password": casual.password
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('POST /users with invalid request(only name)', (done) => {
        request(appUrl)
        .post('/users')
        .send({
            "name": casual.name
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('PATCH /users with invalid token value', (done) => {
        request(appUrl)
        .patch('/users')
        .set('Authorization', "invalidToken")
        .send(usersInfo[4])
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('POST /auth invalid email and password', (done) => {
        request(appUrl)
        .post('/auth')
        .send({
                "email": "7lbsa",
                "password": "7lbsa"
            })
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('POST /auth only email', (done) => {
        request(appUrl)
        .post('/auth')
        .send({
                "email": "0000007770"
            })
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('POST /auth only password', (done) => {
        request(appUrl)
        .post('/auth')
        .send({
                "password": "0000007770"
            })
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('DELETE /all-users with fake authentication', (done) => {
        request(appUrl)
        .delete('/all-users')
        .send({
            "key_admin": "omar"
          })
        .expect(403)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });

});