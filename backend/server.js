import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter)

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
  connectDB();
  console.log('Server connected: http://localhost:'+PORT);
})