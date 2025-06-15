import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await api.get("/blogs/user/blogs");
    setBlogs(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePublish = async (id) => {
    await api.patch(`/blogs/${id}/publish`);
    fetchBlogs();
  };

  return (
    <div>
      <h2>My Blogs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link> ({blog.state})
              {blog.state === "draft" && (
                <button style={{ marginLeft: 8 }} onClick={() => handlePublish(blog._id)}>
                  Publish
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}