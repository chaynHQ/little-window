const test = require('tape');
const myApp = require('../app');
const request = require('supertest')(myApp);

test('check /usermessage is returning correct resources', (t) => {
    request
        .post('/usermessage')
        .expect(200)
        .send('divorce')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, res) => {
            t.error(err);
            t.deepEqual(res.body.resources, [{ text: 'Chayn Website', href: 'https://chayn.co' }], 'should return correct resources');
            t.end();
        });
});

test('check /potato returns 404', (t) => {
    request
        .get('/potato')
        .expect(404)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            t.error(err);
            t.equal(res.status, 404, 'should return 404 Status Code');
            t.end();
        });
});
