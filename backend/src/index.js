// backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- In-Memory "Database" (for testing) ---
// This replaces MongoDB for now, so your app works immediately.
let users = [];
let tasks = [];
let taskId = 1;
let userId = 1;

// --- Routes ---

// 1. Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Task Manager API is running!" });
});

// 2. Register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = { id: userId++, name, email, password };
  users.push(user);
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: "fake-token-" + Date.now()
  });
});

// 3. Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: "fake-token-" + Date.now()
  });
});

// 4. Get Tasks (Protected - requires token)
app.get("/api/tasks", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }
  res.json(tasks);
});

// 5. Create Task (Protected - requires token)
app.post("/api/tasks", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { title, description, priority, dueDate } = req.body;
  if (!title || !dueDate) {
    return res.status(400).json({ message: "Please add title and due date" });
  }
  const task = {
    _id: taskId++,
    title,
    description,
    priority: priority || "Medium",
    dueDate,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// 6. Toggle Task Status (Protected - requires token)
app.patch("/api/tasks/:id/toggle", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t._id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.status = task.status === "completed" ? "pending" : "completed";
  res.json(task);
});

// 7. Delete Task (Protected - requires token)
app.delete("/api/tasks/:id", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t._id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(index, 1);
  res.json({ message: "Task removed" });
});

// 8. Get Task Stats (Protected - requires token)
app.get("/api/tasks/stats", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  res.json({
    total,
    completed,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 http://localhost:${PORT}/health`);
  console.log(`⚠️  Using in-memory storage (no MongoDB required!)`);
});