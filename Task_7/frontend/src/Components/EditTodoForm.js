// import React, { useState } from "react";
// import axios from "../axios";

// const EditTodoForm = ({ todo, onEdit, onCancel }) => {
//   const [editedTask, setEditedTask] = useState(todo.task);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send PUT request to update Todo at specific endpoint
//       await axios.put(
//         `/todos/${todo.id}`,
//         { task: editedTask },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // Call onEdit function with updated todo id and task
//       onEdit(todo.id, editedTask);
//       onCancel();
//     } catch (error) {
//       console.error("Error editing todo:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setEditedTask(e.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={editedTask}
//         onChange={handleChange}
//         placeholder="Edit task"
//         required
//       />
//       <button type="submit">Update</button>
//       <button type="button" onClick={onCancel}>
//         Cancel
//       </button>
//     </form>
//   );
// };

// export default EditTodoForm;
