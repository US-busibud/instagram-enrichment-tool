import React, { useState } from 'react';
import EnrichmentModal from './components/modal/EnrichmentModal.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold">Sales Campaign Enrichment</h1>
        <p className="text-zinc-500 text-sm">
          Run automated Instagram profile & post scrapers directly into your campaign workflow.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition cursor-pointer"
        >
          Add Enrichment column
        </button>
      </div>

      <EnrichmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}