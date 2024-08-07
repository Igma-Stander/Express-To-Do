import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //use for error handling
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login endpoint with username and password
      const response = await axios.post("/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      //testing
      console.log(response.data.token);

      navigate("/todos");

      //getting this error after a minute or so after pressing login
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password. Please try again");
    }
  };

  return (
    <div>
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginRight: "8px" }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="buttons" type="submit">
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
