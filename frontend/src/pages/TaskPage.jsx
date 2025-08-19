import axios from "axios";
import { useEffect, useState } from "react";

import TaskForm from "../components/TaskFrom";
const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
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
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id)); // remove from UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Task creation form */}
      <TaskForm onTaskAdded={handleTaskAdded} />

      {/* Task list */}
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
    </div>
  );
};

export default TaskPage;
