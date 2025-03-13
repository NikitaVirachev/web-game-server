const express = require('express');
const path = require('path');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Body parser
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) Static files
const frontendDir = process.env.FRONTEND_DIR;
app.use(express.static(frontendDir));

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// 3) Routes
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
