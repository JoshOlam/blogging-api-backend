import React, { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogForm({ edit }) {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "", tags: "", body: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && id) {
      api.get(`/blogs/${id}`).then(res => {
        setForm({
          title: res.data.title,
          description: res.data.description,
          tags: res.data.tags?.join(",") || "",
          body: res.data.body
        });
      });
    }
  }, [edit, id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
      if (edit) {
        await api.put(`/blogs/${id}`, payload);
      } else {
        await api.post("/blogs", payload);
      }
      navigate(edit ? `/blogs/${id}` : "/my-blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{edit ? "Edit" : "Create"} Blog</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      <textarea name="body" placeholder="Body" value={form.body} onChange={handleChange} required />
      <button type="submit">{edit ? "Update" : "Create"}</button>
    </form>
  );
}