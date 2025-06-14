const Blog = require('../models/Blog');
const readingTime = require('../utils/readingTime');

exports.createBlog = async (req, res, next) => {
  try {
    const { title, description, tags, body } = req.body;
    const blog = await Blog.create({
      title,
      description,
      author: req.user._id,
      tags,
      body,
      reading_time: readingTime(body)
    });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.getPublishedBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, author, title, tags, order_by } = req.query;
    const filter = { state: 'published' };
    if (author) filter.author = author;
    if (title) filter.title = new RegExp(title, 'i');
    if (tags) filter.tags = { $in: tags.split(',') };

    const sort = {};
    if (order_by) {
      order_by.split(',').forEach(field => {
        const [key, dir] = field.split(':');
        sort[key] = dir === 'asc' ? 1 : -1;
      });
    }

    const blogs = await Blog.find(filter)
      .populate('author', 'first_name last_name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'first_name last_name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // If the blog is published, anyone can view it
    if (blog.state === 'published') {
      blog.read_count += 1;
      await blog.save();
      return res.json(blog);
    }

    // If the blog is draft, only the owner can view it
    // Check for JWT and user match
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const token = req.headers.authorization.split(' ')[1];
      const jwt = require('jsonwebtoken');
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
      if (blog.author._id.toString() === decoded.id) {
        return res.json(blog);
      }
    }

    // Otherwise, not allowed
    return res.status(404).json({ message: 'Blog not found' });
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized or blog not found' });
    }

    Object.assign(blog, req.body);
    if (req.body.body) {
      blog.reading_time = readingTime(req.body.body);
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized or blog not found' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getUserBlogs = async (req, res, next) => {
  try {
    const { state, page = 1, limit = 20 } = req.query;
    const filter = { author: req.user._id };
    if (state) filter.state = state;

    const blogs = await Blog.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.publishBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized or blog not found' });
    }

    blog.state = 'published';
    await blog.save();
    res.json(blog);
  } catch (err) {
    next(err);
  }
};
