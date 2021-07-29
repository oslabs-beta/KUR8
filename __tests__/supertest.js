const { response } = require('express');
const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
  describe('/structure', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/structure')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
  describe('/metrics', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/metrics')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
  describe('/custom', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/custom')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
  describe('/alerts', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () =>
        request(server)
          .get('/alerts')
          .expect('Content-Type', /text\/html/)
          .expect(200));
    });
  });
  // describe('/login', () => {
  //   describe('POST', () => {
  //     it('login should return true when successful, user must exist in database', () => request(server)
  //       .post('/login')
  //       .send({ username: 'jimmy', password: 'jimmy' })
  //       .set('Accept', 'application/json')
  //       .expect((res) => {
  //         res.body = true
  //       })
  //       .expect(200)
  //     );
  //   });
  // });
});
