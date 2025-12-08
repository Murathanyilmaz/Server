const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://murathanyilmaz.net"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({"message":"Server working!"});
});

app.get("/greet", (req, res) => {
  const name = req.query.name || "Guest";
  res.json({ message: `Hello, ${name}!` });
});

app.use((req, res, next) => {
  res.json({
    method: req.method,
    path: req.path,
    headers: req.headers
  });
});


//ERROR AND SERVER-SIDE LOGGING
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.use((req, res) => {
  console.log();
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
});
