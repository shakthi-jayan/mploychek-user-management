import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());  
app.use('/api/users', router); 
const PORT = process.env.PORT || 5000;  
const mongoURI = process.env.MONGO_URI;
 
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));