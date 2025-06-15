import React, { useState, useEffect, useContext } from "react";
import { api } from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(() => setError("Blog not found"));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    await api.delete(`/blogs/${id}`);
    navigate("/my-blogs");
  };

  const handlePublish = async () => {
    await api.patch(`/blogs/${id}/publish`);
    window.location.reload();
  };

  if (error) return <div>{error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>By {blog.author?.first_name} {blog.author?.last_name} ({blog.author?.email})</div>
      <div>{blog.reading_time} | {blog.read_count} reads</div>
      <div>{blog.body}</div>
      {token && (
        <>
          <Link to={`/edit/${blog._id}`}>Edit</Link>{" "}
          <button onClick={handleDelete}>Delete</button>{" "}
          {blog.state === "draft" && <button onClick={handlePublish}>Publish</button>}
        </>
      )}
    </div>
  );
}