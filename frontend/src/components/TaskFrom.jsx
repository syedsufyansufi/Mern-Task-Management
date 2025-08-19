import axios from "axios";
import { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty tasks

    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        title,
        completed: false,
      });

      console.log("Task created:", response.data);

      if (onTaskAdded) {
        onTaskAdded(response.data); // ✅ send new task back to parent
      }

      setTitle(""); // Clear input after submission
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task..."
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
