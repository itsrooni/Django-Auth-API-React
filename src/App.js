// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import axios from "axios";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://127.0.0.1:8000/api/auth/users/me/", {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          setUsername(res.data.username);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUsername("");
        });
    } else {
      setIsAuthenticated(false);
      setUsername("");
    }
  }, [localStorage.getItem("token")]); // This line will not work as expected — see note below
  // 💡 React won't detect changes in localStorage like this.
  // We'll fix that by triggering the effect manually after login.

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccess={() => {
                // Trigger the same logic App.js uses
                const token = localStorage.getItem("token");
                if (token) {
                  axios.get("http://127.0.0.1:8000/api/auth/users/me/", {
                    headers: {
                      Authorization: `Token ${token}`
                    }
                  })
                    .then(res => {
                      setUsername(res.data.username);
                      setIsAuthenticated(true);
                    })
                    .catch(() => {
                      setIsAuthenticated(false);
                      setUsername("");
                    });
                }
              }}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home username={username} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

