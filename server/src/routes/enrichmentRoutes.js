import express from 'express';
import { generatePreview } from '../controllers/scraperController.js';

const router = express.Router();

// POST /api/enrichment/preview
router.post('/preview', generatePreview);

export default router;