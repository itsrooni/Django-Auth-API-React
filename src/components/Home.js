// src/components/Home.js
import React from "react";

function Home({ username }) {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
