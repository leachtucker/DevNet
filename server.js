const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Configure & Connect DB
connectDB();

app.get('/', (req, res) => {
  res.send('API running');
});

// Listens on the port from env vars--if local, run on 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});