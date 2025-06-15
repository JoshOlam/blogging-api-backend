const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');
const User = require('../models/User');
const readingTime = require('../utils/readingTime');

dotenv.config();

/**
 * Creates dummy users.
 * @param {number} count - Number of users to create.
 * @returns {Promise<Array>} - Array of created or found users.
 */
async function createDummyUsers(count) {
  const users = [];

  for (let i = 1; i <= count; i++) {
    const email = `user${i}@example.com`;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        first_name: `User${i}`,
        last_name: 'Demo',
        email,
        password: 'password123'
      });
    }

    users.push(user);
  }

  return users;
}

/**
 * Main script function.
 */
async function main() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Remove existing blogs
  await Blog.deleteMany({});

  // Number of users to create
  const USER_COUNT = 10;
  const TOTAL_BLOGS = 3000;

  const users = await createDummyUsers(USER_COUNT);

  // Create dummy blog posts
  const blogs = [];

  for (let i = 1; i <= TOTAL_BLOGS; i++) {
    const body = `This is the body of blog post number ${i}. `.repeat(10);
    const author = users[i % USER_COUNT]; // round-robin user assignment

    blogs.push({
      title: `Blog Post ${i}`,
      description: `Description for blog post ${i}`,
      author: author._id,
      state: i % 2 === 0 ? 'published' : 'draft',
      tags: ['test', 'demo'],
      body,
      reading_time: readingTime(body)
    });
  }

  await Blog.insertMany(blogs);

  console.log(`Database populated with ${TOTAL_BLOGS} blog entries for ${USER_COUNT} users.`);
  process.exit();
}

main().catch(err => {
  console.error('Error during database population:', err);
  process.exit(1);
});
