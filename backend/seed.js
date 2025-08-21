require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const connectDB = require('./config/db');

(async () => {
  try {
    const mongoUri = process.env.MONGO_URI || '';
    await connectDB(mongoUri);

    // remove existing test user email if exists
    await User.deleteMany({ email: 'test@example.com' });

    const hashed = await bcrypt.hash('password123', 10);
    const user = new User({ username: 'testuser', email: 'test@example.com', password: hashed });
    await user.save();
    console.log('Seed user created: test@example.com / password123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
