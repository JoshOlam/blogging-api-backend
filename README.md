# Blogging API Backend

A full-featured Node.js backend for a blogging platform, built for the AltSchool Backend Engineering Second Semester Examination Project.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Docker & Deployment](#docker--deployment)
- [Swagger API Documentation](#swagger-api-documentation)
- [License](#license)

---

## Description

You are required to build a blogging api. The general idea here is that the api has a general endpoint that shows a list of articles that have been created by different people, and anybody that calls this endpoint, should be able to read a blog created by them or other users.

### Requirements

1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs.
    - The endpoint should be paginated
    - It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,
    - default it to 20 blogs per page.
    - It should also be searchable by author, title and tags.
    - It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints

Note:

The owner of the blog should be logged in to perform actions

Use the MVC pattern

### Database

Use MongoDB

### ​Data Models

---

User

– email is required and should be unique

– first_name and last_name is required

– password

Blog/Article

– title is required and unique

– description

– author

– state

– read_count

– reading_time

– tags

– body is required

– timestamp

Submission

---

– Push your code to GitHub

– Host it on PipeOps/Heroku/Render

---

## Features

- **User Authentication:** Register and login with JWT (1 hour expiry).
- **Blog Management:** Create, edit, publish, and delete blogs (draft/published states).
- **Public Blog Access:** Anyone can list and read published blogs.
- **User Blog Access:** Authenticated users can manage their own blogs.
- **Pagination, Filtering, Search, Ordering:** For published blogs.
- **Blog Fields:** Title, description, tags, author, timestamps, state, read count, reading time, body.
- **MongoDB Storage:** Uses Mongoose ODM.
- **MVC Architecture:** Clean separation of concerns.
- **Comprehensive Tests:** All endpoints covered with Jest and Supertest.
- **Swagger Documentation:** Interactive API docs at `/docs`.
- **Docker Support:** Multi-service Dockerfile and docker-compose for local development.

---

## Architecture

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local or Atlas)
- **Authentication:** JWT (JSON Web Token)
- **Documentation:** Swagger (OpenAPI 3.0)
- **Testing:** Jest, Supertest

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Blogs

- `GET /api/blogs` — List all published blogs (public, supports pagination, filtering, search, ordering)
- `GET /api/blogs/:id` — Get a single published blog (public)
- `POST /api/blogs` — Create a new blog (authenticated)
- `PUT /api/blogs/:id` — Update a blog (authenticated, owner only)
- `DELETE /api/blogs/:id` — Delete a blog (authenticated, owner only)
- `PATCH /api/blogs/:id/publish` — Publish a blog (authenticated, owner only)
- `GET /api/blogs/user/blogs` — List all blogs (draft and published) of the authenticated user

> **Full interactive documentation available at `/docs` (Swagger UI).**

---

## Setup & Installation

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

---

## Docker & Deployment

- **Docker:** Yes (see `Dockerfile` and `docker-compose.yml`)
- **Deployment:** Heroku

### Step-by-step Guide to Deploying to Heroku with Docker

This guide will help you deploy your blogging API backend to Heroku using Docker. Ensure you have the Heroku CLI installed and the application is ready for deployment.

#### Step 1: Install Heroku CLI and Log In

```bash
heroku login
heroku container:login
```

#### Step 3: Create a Heroku App

```bash
heroku create blogger-api-stage
```

#### Step 4: Set the Stack to container

```bash
heroku stack:set container -a blogger-api-stage
```

#### Step 5: Build the Docker Image Locally

```bash
docker build -t registry.heroku.com/blogger-api-stage/web .
```

#### Step 6: Push Your Docker Container to Heroku

```bash
heroku container:push web -a blogger-api-stage
heroku container:release web -a blogger-api-stage
```

#### Step 7: Configure ENV Variables

```bash
heroku config:set PORT=5001 -a blogger-api-stage
heroku config:set MONGODB_URI=<your-mongodb-uri> -a blogger-api-stage
heroku config:set JWT_SECRET=<your-jwt-secret> -a blogger-api-stage
```

#### Step 8: Access Your Application

Once the deployment is complete, you can run the command below to output the deployed URL of the application 

```bash
heroku apps:info -a blogger-api-stage
```

---

## Swagger API Documentation

- Access the interactive API documentation at `/docs` after starting the application.

---

## License

- This project is licensed under the MIT License. See the `LICENSE` file for details.
