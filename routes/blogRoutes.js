const express = require('express');
const router = express.Router();
const {
  createBlog,
  getPublishedBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
  publishBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all published blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of published blogs
 */
router.get('/', getPublishedBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog data
 *       404:
 *         description: Blog not found
 */
router.get('/:id', getBlogById);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               body:
 *                 type: string
 *             required:
 *               - title
 *               - body
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/', protect, createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Blog not found
 */
router.put('/:id', protect, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete('/:id', protect, deleteBlog);

/**
 * @swagger
 * /api/blogs/user/blogs:
 *   get:
 *     summary: Get blogs of the authenticated user
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of user's blogs
 */
router.get('/user/blogs', protect, getUserBlogs);

/**
 * @swagger
 * /api/blogs/{id}/publish:
 *   patch:
 *     summary: Publish a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog published successfully
 *       404:
 *         description: Blog not found
 */
router.patch('/:id/publish', protect, publishBlog);

module.exports = router;
