const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Configure & Connect DB
connectDB();

// Define Routers
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => {
  res.send('API running');
});

// Listens on the port from env vars--if local, run on 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});