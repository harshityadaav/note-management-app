const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/user.route');
const noteRoute = require('./routes/note.route');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/note', noteRoute);

// Database connection and server start
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');

    app.listen(process.env.PORT || 8000, () => {
      console.log('Server running on port', process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
  });
