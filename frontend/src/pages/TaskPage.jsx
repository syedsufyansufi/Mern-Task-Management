import axios from "axios";
import { useEffect, useState } from "react";

import TaskForm from "../components/TaskFrom";

// API Base URL - Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-deployed-backend-url.com/api' // Replace with your deployed backend URL
  : 'http://localhost:5000/api';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/tasks`); // Updated endpoint
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task to UI after creating
  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Delete task
  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`); // Updated endpoint
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert('Failed to delete task');
    }
  };

  if (loading) return <div className="p-6 max-w-lg mx-auto">Loading tasks...</div>;
  if (error) return <div className="p-6 max-w-lg mx-auto text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Task creation form */}
      <TaskForm onTaskAdded={handleTaskAdded} apiBaseUrl={API_BASE_URL} />

      {/* Task list */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks yet. Create your first task!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <span>
                {task.title} {task.completed ? "✅" : "❌"}
              </span>
              <button
                onClick={() => handleTaskDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskPage;