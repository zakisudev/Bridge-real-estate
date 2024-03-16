require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', (req, res) => {
  res.send('API is running ...');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
