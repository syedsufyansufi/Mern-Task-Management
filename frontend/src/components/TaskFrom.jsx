import axios from "axios";
import { useState } from "react";

// API Base URL - Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-deployed-backend-url.com/api' // Replace with your deployed backend URL
  : 'http://localhost:5000/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty tasks

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/tasks`, { // Updated endpoint
        title: title.trim(),
        completed: false,
      });

      console.log("Task created:", response.data);

      if (onTaskAdded) {
        onTaskAdded(response.data); // ✅ send new task back to parent
      }

      setTitle(""); // Clear input after submission
    } catch (error) {
      console.error("Error creating task:", error);
      alert('Failed to create task');
    } finally {
      setLoading(false);
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
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;