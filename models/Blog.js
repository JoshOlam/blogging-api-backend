const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: { type: String, enum: ['draft', 'published'], default: 'draft' },
  read_count: { type: Number, default: 0 },
  reading_time: String,
  tags: [String],
  body: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
