import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import mongoose from "mongoose"


import cors from "cors"
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


app.get('/', (req, res) => {
  res.send('API is working 🚀');
});
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.log(err));

