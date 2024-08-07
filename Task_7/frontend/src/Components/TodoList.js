import React, { useState, useEffect } from "react";
import axios from "../axios";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // useEffect hook to fetch todos when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send GET request to fetch todos from API endpoint
        const response = await axios.get("/todos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Update todos state
        setTodos(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Fetch todos error:", error);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, [todos]);

  // Function to delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to handle editing of an item
  const handleEdit = async (id) => {
    //can't style the prompt
    const updatedTask = prompt("Edit todo:");
    try {
      await axios.put(
        `/todos/${id}`,
        { task: updatedTask },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, task: updatedTask };
          }
          return todo;
        })
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Function to handle adding a new item
  const handleAdd = async (task) => {
    try {
      const response = await axios.post(
        "/todos",
        { task },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } // eslint-disable-next-line no-restricted-globals
    // location.reload();
  };

  return (
    <div>
      <h2 className="heading">Todo List</h2>
      <AddTodoForm onAdd={handleAdd} />
      <ul>
        {todos.map((todo, id) => (
          <li className="content" key={id}>
            <TodoItem
              todo={todo}
              //Passing expected arguments
              onUpdate={() => {
                handleEdit(todo.id);
              }}
              onDelete={() => {
                handleDelete(id);
              }}
              // order of id's seem to not be correct when deleting a task...maybe something with the addTodo function in userController.js
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
