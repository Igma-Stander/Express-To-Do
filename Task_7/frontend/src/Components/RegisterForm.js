import React, { useState } from "react";
//importing axios from js file
import axios from "../axios";
import { useNavigate } from "react-router-dom";

//same as LoginForm.js
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        username,
        password,
      });

      window.alert("Registration successful");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <h2 className="heading">Register</h2>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
