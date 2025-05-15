// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "", re_password: "" });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/users/", form)
      .then(() => {
        setMsg("Registered successfully!");
        setSuccess(true);
      })
      .catch((err) => {
        setMsg("Registration failed: " + JSON.stringify(err.response.data));
        setSuccess(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setForm({ ...form, re_password: e.target.value })}
      />
      <button type="submit">Register</button>
      <p>{msg}</p>
      <p>Already Have an Account? <Link to="/login">Login Now</Link></p>
      {success && (
        <p>
          ✅ Registration complete. <Link to="/login">Click here to login</Link>
        </p>
      )}
    </form>
  );
}

export default Register;

