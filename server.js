require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const Message = require("./models/Message");

/* ---------------------- MIDDLEWARE MUST BE FIRST ---------------------- */

app.use(cors({
    origin: "https://murathanyilmaz.net", // allow your domain
}));
app.use(express.json());

/* ---------------------- DATABASE CONNECTION ---------------------- */

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // stops server if no DB
    }
}

/* ---------------------- ROUTES ---------------------- */

app.get("/", (req, res) => {
    res.json({ message: "Server working!" });
});

app.post("/message", async (req, res) => {
    try {
        const msg = await Message.create({ text: req.body.text });
        res.json({ success: true, message: msg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/messages", async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
});

app.get("/greet", (req, res) => {
    const name = req.query.name || "Guest";
    res.json({ message: `Hello, ${name}!` });
});

app.post("/echo", (req, res) => {
    console.log(req.body);
    res.json({ youSent: req.body });
});

/* ---------------------- SERVER START ---------------------- */

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});

/* ---------------------- ERROR HANDLING ---------------------- */

app.use((req, res) => res.status(404).json({ message: "Not Found" }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
});