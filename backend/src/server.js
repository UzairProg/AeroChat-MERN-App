import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000; // what it does is, it gets the port number from environment variables or defaults to 3000 if not set

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

app.use(express.json()); // what it does is, it adds middleware to parse incoming JSON requests

// req,res means request and response.. it does is, it handles incoming requests and sends back responses
app.get('/', (req, res) => { // what it does is, it defines a route for the root URL ('/') that responds with 'Hello World!' when accessed via a GET request
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => { // what it does is, it starts the server on port 3000.. and just listens for incoming requests
  console.log(`Server is running on port ${PORT}`);
});