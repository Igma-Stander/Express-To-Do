import React from "react";

// Removed delete and edit functions to simplify
const TodoItem = ({ todo, onUpdate, onDelete }) => {
  return (
    <div>
      {/* Display task content */}
      <span>{todo.task}</span>
      <button className="buttons" onClick={onDelete}>
        Delete
      </button>
      <button className="buttons" onClick={onUpdate}>
        Update
      </button>
    </div>
  );
};

export default TodoItem;
