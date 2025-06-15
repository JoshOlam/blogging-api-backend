import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState({ page: 1, limit: 10, title: "", author: "", tags: "", order_by: "" });
  const [loading, setLoading] = useState(false);

  const fetchBlogs = React.useCallback(async () => {
    setLoading(true);
    const params = { ...query };
    Object.keys(params).forEach(k => !params[k] && delete params[k]);
    const res = await api.get("/blogs", { params });
    setBlogs(res.data);
    setLoading(false);
  }, [query]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  return (
    <div>
      <h2>Published Blogs</h2>
      <div>
        <input placeholder="Title" value={query.title} onChange={e => setQuery(q => ({ ...q, title: e.target.value }))} />
        <input placeholder="Author" value={query.author} onChange={e => setQuery(q => ({ ...q, author: e.target.value }))} />
        <input placeholder="Tags (comma)" value={query.tags} onChange={e => setQuery(q => ({ ...q, tags: e.target.value }))} />
        <select value={query.order_by} onChange={e => setQuery(q => ({ ...q, order_by: e.target.value }))}>
          <option value="">Sort by</option>
          <option value="read_count:desc">Read Count ↓</option>
          <option value="read_count:asc">Read Count ↑</option>
          <option value="reading_time:desc">Reading Time ↓</option>
          <option value="reading_time:asc">Reading Time ↑</option>
          <option value="createdAt:desc">Newest</option>
          <option value="createdAt:asc">Oldest</option>
        </select>
        <button onClick={() => setQuery(q => ({ ...q, page: Math.max(1, q.page - 1) }))}>Prev</button>
        <span> Page {query.page} </span>
        <button onClick={() => setQuery(q => ({ ...q, page: q.page + 1 }))}>Next</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : blogs.length === 0 ? (
        <div>No published blogs found.</div>
      ) : (
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link> by {blog.author?.first_name} {blog.author?.last_name} | {blog.reading_time} | {blog.read_count} reads
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}