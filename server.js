const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://murathanyilmaz.net"
}));

app.get("/", (req, res) => {
  res.json({"message":"Server working!"});
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
