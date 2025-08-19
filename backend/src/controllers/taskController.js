import Task from "../models/Task.js";

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // fetch all tasks from DB
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message }); // server error
  }
};

// CREATE a new task
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body); // create new task from request body
    await newTask.save(); // save to DB
    res.status(201).json(newTask); // return created task
  } catch (error) {
    res.status(400).json({ error: error.message }); // bad request (invalid data)
  }
};

// UPDATE a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, // id from URL
      req.body,      // updated data
      { new: true }  // return updated doc
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
