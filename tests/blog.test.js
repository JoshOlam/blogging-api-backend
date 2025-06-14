const request = require('supertest');
const app = require('../server');

describe('Blog Tests', () => {
  it('should fetch published blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
