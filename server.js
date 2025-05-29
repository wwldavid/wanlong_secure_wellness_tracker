// The fs module is used to read the SSL key and certificate files from the file system.
const fs = require("fs");

// The https module allows us to create a secure server that supports HTTPS connections.
const https = require("https");

// Express is used to handle HTTP requests, and Helmet helps secure the app by setting various HTTP headers.
const express = require("express");
const helmet = require("helmet");

const app = express();
app.use(helmet());

app.use("/", (req, res) => {
  res.send("Welcome to Wanlong Secure Wellness Tracker. ");
});

const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};

app.get("/moods", (req, res) => {
  res.set("Cache-Control", "public, mac-age=300, stale-while-revalidate=60");
  res.json({ mood: "Anxious", date: "2025-05-26" });
});

app.get("/goals/:id", (req, res) => {
  res.set("Cache-Control", "private, max-age=300");
  res.json({ goal: "Meditate 10 mins", id: req.params.id });
});

https.createServer(options, app).listen(3000, () => {
  console.log("Secure server is running at https://localhost:3000");
});
