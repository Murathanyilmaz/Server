const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}


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

app.post("/echo", (req, res) => {
  console.log(req.body);
  res.json({ youSent: req.body });
});

/*app.use((req, res, next) => {
  res.json({
    method: req.method,
    path: req.path,
    headers: req.headers
  });
});*/


//ERROR AND SERVER-SIDE LOGGING

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT} & Mongo is connected`);
  });
});

app.use((req, res) => {
  console.log();
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
});
