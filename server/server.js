import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enrichmentRoutes from './src/routes/enrichmentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/enrichment', enrichmentRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running with ES Modules' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});