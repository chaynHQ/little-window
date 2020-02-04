const test = require('tape');
const request = require('supertest');
const app = require('../app');


test('check /usermessage is returning correct resources', (t) => {
  request(app)
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
  request(app)
    .get('/potato')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.status, 404, 'should return 404 Status Code');
      t.end();
    });
});
