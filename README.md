# blogging-api-backend
Backend Engineering NodeJs Second Semester Examination Project - Blogging API

## Features

- User registration and login with JWT (1 hour expiry)
- Create, edit, publish, delete blogs (draft/published)
- Public endpoints for listing and reading published blogs
- Pagination, filtering, search, and ordering for blogs
- Blog fields: title, description, tags, author, timestamp, state, read_count, reading_time, body
- MongoDB for data storage
- MVC architecture
- Full API documentation at `/docs`
- Comprehensive tests for all endpoints

## API Usage

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- List published blogs: `GET /api/blogs`
- Get single published blog: `GET /api/blogs/:id`
- Create blog: `POST /api/blogs` (auth required)
- Update blog: `PUT /api/blogs/:id` (auth required)
- Delete blog: `DELETE /api/blogs/:id` (auth required)
- Publish blog: `PATCH /api/blogs/:id/publish` (auth required)
- List user blogs: `GET /api/blogs/user/blogs` (auth required)

See `/docs` for full Swagger documentation.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd blogging-api-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   Copy the example environment file and update the values as needed:

   ```bash
   cp .env.example .env
   ```

   Get a secure JWT secret key and add it to the `.env` file:

   ```bash
   openssl rand -hex 32
   ```

4. **Set up the database:**

   Ensure MongoDB is running and update the connection string in the `.env` file if necessary.

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Run the tests:**

   ```bash
   npm test
   ```

## Project Structure

blogging-api-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── blogController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Blog.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
├── tests/
│   ├── auth.test.js
│   └── blog.test.js
├── utils/
│   └── readingTime.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
