import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import TodoList from "./Components/TodoList";
import AddTodoForm from "./Components/AddTodoForm";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const navigate = useNavigate();

  //used in button to navigate to register page
  function handleRegister() {
    navigate("/register");
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <button className="buttons" onClick={handleRegister}>
                Register
              </button>
            </>
          }
        />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/login" element={<LoginForm />} />

        {/* fixed routing problem */}
        <Route
          path="/todos/*"
          element={<PrivateRoute element={<TodoList />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
