import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { setAuthToken } from "./api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/BlogForm";
import MyBlogs from "./pages/MyBlogs";
import './App.css'

import AuthContext from "./AuthContext";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <nav>
          <Link to="/">Blogs</Link> |{" "}
          {token ? (
            <>
              <Link to="/my-blogs">My Blogs</Link> |{" "}
              <Link to="/create">Create Blog</Link> |{" "}
              <button onClick={() => setToken("")}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={token ? <BlogForm /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={token ? <BlogForm edit /> : <Navigate to="/login" />} />
          <Route path="/my-blogs" element={token ? <MyBlogs /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
