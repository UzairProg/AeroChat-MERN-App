import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import connectDB from './lib/db.js';

const app = express();

app.use(cookieParser()); // it adds middleware to parse cookies from incoming requests.. so that we can access them via req.cookies


const PORT = process.env.PORT || 3000; // what it does is, it gets the port number from environment variables or defaults to 3000 if not set

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

app.use(express.json()); // what it does is, it adds middleware to parse incoming JSON requests.. for req.body to work

// req,res means request and response.. it does is, it handles incoming requests and sends back responses
app.get('/', (req, res) => { // what it does is, it defines a route for the root URL ('/') that responds with 'Hello World!' when accessed via a GET request
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => { // what it does is, it starts the server on port 3000.. and just listens for incoming requests
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});