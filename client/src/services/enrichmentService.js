import axios from 'axios';
const API_BASE_URL = 'https://instagram-enrichment-tool-backend.onrender.com';

export const fetchEnrichmentPreview = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/api/enrichment/preview`, payload);
  return response.data;
};