import 'dotenv/config';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

// Обработка неизвестных маршрутов
app.use(notFoundHandler);

// Обработка ошибок валидации Celebrate
app.use(errors());

// Общий обработчик ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();