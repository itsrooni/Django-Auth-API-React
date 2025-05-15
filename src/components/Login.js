// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/token/login/", form)
      .then(res => {
        localStorage.setItem("token", res.data.auth_token);
        onLoginSuccess(); // triggers username fetch in App.js
        navigate("/");
      })
      .catch(() => setMsg("Login failed"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
      <p>{msg}</p>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;



