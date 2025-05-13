import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectMongoDB from './config/db.js';
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import transactions from './routes/transactions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 5000;

connectMongoDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

app.use('/api/transactions', transactions);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Server Error" });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get("*", (req, res) =>
    res.sendFile(resolve(__dirname, "client", "build", "index.html"))
  );
}

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("SIGTERM", () => {
  console.log("Shutting down gracefully");
  server.close(() => process.exit(0));
});