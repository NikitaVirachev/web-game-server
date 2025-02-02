const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/authRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Body parser
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/login', authRouter);

module.exports = app;
