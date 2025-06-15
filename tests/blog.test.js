const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');

let token;
let blogId;

beforeAll(async () => {
  // Register and login a user to get a token
  await User.deleteMany({});
  await Blog.deleteMany({});
  await request(app)
    .post('/api/auth/register')
    .send({
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      password: 'password123'
    });
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123'
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Blog Endpoints', () => {
  it('should create a blog (draft)', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        description: 'A test blog',
        tags: ['test'],
        body: 'This is the body of the test blog.'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.state).toBe('draft');
    blogId = res.body._id;
  });

  it('should get published blogs (none yet)', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should publish the blog', async () => {
    const res = await request(app)
      .patch(`/api/blogs/${blogId}/publish`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.state).toBe('published');
  });

  it('should get published blogs (one now)', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it('should get a single published blog and increment read_count', async () => {
    const res1 = await request(app).get(`/api/blogs/${blogId}`);
    expect(res1.statusCode).toBe(200);
    expect(res1.body._id).toBe(blogId);
    const res2 = await request(app).get(`/api/blogs/${blogId}`);
    expect(res2.body.read_count).toBe(res1.body.read_count + 1);
  });

  it('should update the blog', async () => {
    const res = await request(app)
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Blog Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Blog Title');
  });

  it('should get user blogs', async () => {
    const res = await request(app)
      .get('/api/blogs/user/blogs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should delete the blog', async () => {
    const res = await request(app)
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Blog deleted');
  });

  it('should return 404 for deleted blog', async () => {
    const res = await request(app).get(`/api/blogs/${blogId}`);
    expect(res.statusCode).toBe(404);
  });
});
