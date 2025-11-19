import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import cameraRoutes from './routes/camera.js';
import teddyRoutes from './routes/teddy.js';
import furnitureRoutes from './routes/furniture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/images', express.static(join(__dirname, 'images')));

app.use(express.json());

app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

export default app;
