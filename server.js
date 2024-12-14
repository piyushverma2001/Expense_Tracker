import { resolve, dirname } from "path";
import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { fileURLToPath } from "url";
import transactions from './routes/transactions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(json());

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(resolve(__dirname, 'client', 'public', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
