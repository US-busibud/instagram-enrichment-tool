import React, { useState } from 'react';
import { X, ArrowLeft, Sparkles } from 'lucide-react';
import { fetchEnrichmentPreview } from '../../services/enrichmentService.js';

export default function EnrichmentModal({ isOpen, onClose }) {
  const [step, setStep] = useState('TOOLS'); 
  const [enrichmentType, setEnrichmentType] = useState('profile'); 
  const [searchBy, setSearchBy] = useState('profile_url'); // ADDED: 'profile_url' | 'full_name'
  const [targetUrl, setTargetUrl] = useState('https://www.instagram.com/nasa');
  const [resultLimit, setResultLimit] = useState(20);
  const [newerThanDays, setNewerThanDays] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  if (!isOpen) return null;

  const toolsList = [
    'Instagram scraper', 'Google maps', 'Google search', 'Apollo',
    'Crunchbase', 'Website scraper', 'Linkdin', 'Similar web',
    'Google Ads', 'Trustpilot', 'Use AI'
  ];

  const handleGeneratePreview = async () => {
    setIsLoading(true);
    try {
      const payload = {
        enrichmentType,
        targetUrl,
        searchBy, // Passing this to backend if needed future me
        config: {
          resultLimit,
          newerThanDays: enrichmentType === 'post' ? newerThanDays : null,
        },
      };

      const result = await fetchEnrichmentPreview(payload);
      if (result.success) {
        setPreviewData(result.data);
        setStep('PREVIEW');
      }
    } catch (err) {
      alert('Error fetching preview: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-xl text-gray-900">
            Add Enrichment column
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 h-[550px] overflow-y-auto flex flex-col">
          
          {/* STEP 1: TOOL EXPLORER */}
          {step === 'TOOLS' && (
             /* ... (Same as previous code) ... */
             <div className="flex flex-col h-full">
              <button className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-6 hover:underline w-fit">
                <ArrowLeft size={16} />
                Back to pre-built enrichment outputs
              </button>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 pr-4 flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-3 px-3">Tools</h3>
                  <ul className="space-y-1 overflow-y-auto flex-1 pb-4">
                    {toolsList.map(tool => (
                      <li key={tool}>
                        <button
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                            tool === 'Instagram scraper' 
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {tool}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-2/3 pl-6 border-l border-gray-100 flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-3">Tool Details</h3>
                  <div className="border border-gray-200 rounded-xl p-6 flex-1 relative flex flex-col">
                    <h4 className="font-bold text-gray-900 text-lg">Instagram scraper</h4>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      Description:<br/>
                      Finds the profile details, such as username, bio, profile picture, followers count, following count, and all publicly available posts and related insights.
                    </p>
                    <div className="mt-5">
                      <h5 className="text-xs text-gray-500 mb-2.5">Input required</h5>
                      <div className="flex flex-wrap gap-2">
                        {['Instagram profile url', 'Full name', 'Hashtags', 'Place name'].map(badge => (
                          <span key={badge} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50/50">{badge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 mb-16">
                      <h5 className="text-xs text-gray-500 mb-2.5">Enrichment outputs</h5>
                      <div className="flex flex-wrap gap-2">
                        {['Username', 'Full name', 'Biography', 'Followers count', 'Following count', 'Post count', 'Verified status', 'Account type', 'Likes count', 'Comments count'].map(badge => (
                          <span key={badge} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50/50">{badge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <button onClick={() => setStep('CONFIG')} className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition shadow-lg shadow-black/10">
                        Try Instagram scraper
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONFIGURATION RECIPE */}
          {step === 'CONFIG' && (
            <div className="space-y-6 max-w-2xl mx-auto w-full">
              <button 
                onClick={() => setStep('TOOLS')}
                className="flex items-center gap-2 text-gray-900 font-medium text-sm mb-4 hover:underline w-fit"
              >
                <ArrowLeft size={16} />
                Back to tools
              </button>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-900 block mb-2">Select enrichment output</label>
                  <select 
                    value={enrichmentType} 
                    onChange={(e) => setEnrichmentType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="profile">Enrich Instagram profile</option>
                    <option value="post">Enrich Instagram post</option>
                  </select>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">Instagram</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                      <Sparkles size={12}/> 1
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 flex items-center gap-1">
                     <Sparkles size={12}/> Using: lighteningly credits account
                  </div>
                </div>

                {/* UPDATED SECTION: Required fields for Instagram */}
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
                  <h4 className="font-bold text-gray-900 text-sm mb-4">Required fields for Instagram</h4>
                  
                  <label className="text-xs font-semibold text-gray-900 block mb-4">Choose the required fields to search by</label>
                  
                  <div className="space-y-4 mb-6">
                    {/* Radio Option 1: Profile URL */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="searchBy" 
                        value="profile_url"
                        checked={searchBy === 'profile_url'}
                        onChange={() => setSearchBy('profile_url')}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900 block mb-0.5">Instagram profile url</span>
                        <span className="text-xs text-gray-500 italic">Finds the profile details, such as username, bio, profile picture, follower count, following count, and all publicly available posts and related insights.</span>
                      </div>
                    </label>

                    {/* Radio Option 2: Full Name */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="searchBy" 
                        value="full_name"
                        checked={searchBy === 'full_name'}
                        onChange={() => setSearchBy('full_name')}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900 block mb-0.5">Full name</span>
                        <span className="text-xs text-gray-500 italic">Finds the profile details, such as profile url, bio, profile picture, follower count, following count, and all publicly available posts and related insights.</span>
                      </div>
                    </label>
                  </div>

                  {/* Dynamic Input Field based on Radio Selection */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="font-medium text-gray-700">
                        {searchBy === 'profile_url' ? 'Instagram Profile URL' : 'Full Name'}
                      </span>
                      <span>For: Instagram</span>
                    </div>
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder={searchBy === 'profile_url' ? 'Value of {Profile url}' : 'Value of {Full name}'}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
                  <h4 className="font-bold text-gray-900 text-sm mb-4">Optional input fields for Instagram</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-2">Result Limit</label>
                      <input
                        type="number"
                        value={resultLimit}
                        onChange={(e) => setResultLimit(Number(e.target.value))}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none"
                      />
                    </div>

                    {enrichmentType === 'post' && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-2">Only post newer than (Days)</label>
                        <input
                          type="number"
                          value={newerThanDays}
                          onChange={(e) => setNewerThanDays(Number(e.target.value))}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleGeneratePreview}
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                  >
                    {isLoading ? 'Fetching...' : 'Generate preview ✨ 1'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PREVIEW DATA */}
          {step === 'PREVIEW' && previewData && (
             /* ... (Same as previous code) ... */
             <div className="space-y-6 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between">
                 <button 
                   onClick={() => setStep('CONFIG')}
                   className="flex items-center gap-2 text-gray-900 font-medium text-sm hover:underline"
                 >
                   <ArrowLeft size={16} />
                   Back to tools
                 </button>
                 <span className="bg-black text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    Preview generated ✨ 1
                 </span>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <h4 className="font-bold text-gray-900 text-sm mb-4">Preview generated for Row 11:</h4>
                
                <h5 className="text-xs font-semibold text-gray-500 mb-2">Input columns used:</h5>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <table className="w-full text-sm text-left text-gray-700">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 bg-gray-50 w-1/2">
                          {searchBy === 'profile_url' ? 'Instagram Profile URL' : 'Full Name'}
                        </td>
                        <td className="px-4 py-2">{targetUrl}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 bg-gray-50 w-1/2">Result Limit</td>
                        <td className="px-4 py-2">{resultLimit}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 className="text-xs font-semibold text-gray-500 mb-2">Generated value for row 11:</h5>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-blue-600 mb-1 block">1st degree data</span>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                       <table className="w-full text-sm text-left text-gray-700">
                         <tbody className="divide-y divide-gray-200">
                           <tr>
                             <td className="px-4 py-2 bg-gray-50 w-1/2">{previewData.firstDegree.label}</td>
                             <td className="px-4 py-2">Yes</td>
                           </tr>
                         </tbody>
                       </table>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-blue-600 mb-1 block">2nd degree data ⓘ</span>
                    <p className="text-xs text-gray-500 mb-2">
                       Sample of a single data row added to a new subsheet.
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                       <table className="w-full text-sm text-left text-gray-700">
                         <tbody className="divide-y divide-gray-200">
                           {Object.entries(previewData.secondDegree).map(([key, val]) => (
                             <tr key={key}>
                               <td className="px-4 py-2.5 bg-gray-50 w-1/3 font-medium">{key}</td>
                               <td className="px-4 py-2.5 max-w-[200px] truncate">{String(val)}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-4 pt-2">
                 <span className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                   <Sparkles size={14}/> Might use 1/row
                 </span>
                 <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
                   Add
                 </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}