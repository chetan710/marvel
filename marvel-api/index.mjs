// index.mjs
import express from 'express';
import cors from 'cors';
import marvelRoutes from './routes/routes.js';

const app = express();
const port = 3020;

app.use(cors());
app.use(express.json());

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use('/api', marvelRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
