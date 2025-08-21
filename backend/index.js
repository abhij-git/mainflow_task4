require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect DB
connectDB(process.env.MONGO_URI || '');

app.use('/api', authRoutes);

app.get('/', (req, res) => res.send('MERN Login Backend'));

app.listen(PORT, () => console.log(`Server running on por
