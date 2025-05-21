import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';

dotenv.config();

const PORT = process.env.PORT

const app = express();

app.use(express.json())

app.use('/api/products', productRoutes)

app.listen(PORT, ()=>{
  connectDB();
  console.log('Server running http://localhost:'+PORT);
})