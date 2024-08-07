import React, { useState } from "react";

const AddTodoForm = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onAdd(task);

      // Clear task input after successful submission
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display input field */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        required
      />
      <button className="buttons" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
