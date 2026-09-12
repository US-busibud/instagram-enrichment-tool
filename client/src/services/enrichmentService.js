import axios from 'axios';

export const fetchEnrichmentPreview = async (payload) => {
  const response = await axios.post('/api/enrichment/preview', payload);
  return response.data;
};