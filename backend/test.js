import express from "express";
const app = express();
const PORT = 5000;

app.get("/health", (req, res) => {
  res.json({ message: "Server is working!" });
});

console.log("Starting server...");
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}/health`);
});
console.log("After listen...");
