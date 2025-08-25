import axios from "axios";
import { useState } from "react";

const TaskForm = ({ onTaskAdded, apiBaseUrl }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${apiBaseUrl}/tasks`, {
        title: title.trim(),
        completed: false,
      });

      console.log("✅ Task created:", response.data);

      if (onTaskAdded) {
        onTaskAdded(response.data);
      }

      setTitle("");
    } catch (error) {
      console.error("❌ Error creating task:", error.response?.data || error.message);
      alert("Failed to create task");
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
