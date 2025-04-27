import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './config/db.js';
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import transactions from './routes/transactions.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./config/config.env" });
const __dirname = dirname(fileURLToPath(import.meta.url));

connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

app.use('/api/v1/transactions', transactions);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(
    {
      success: false,
      error: "Server Error"
    });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get("*", (req, res) =>
    res.sendFile(resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => process.exit(0));
});