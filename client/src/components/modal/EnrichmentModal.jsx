import React, { useState } from "react";
import {
  X,
  ArrowLeft,
  Sparkles,
  ChevronDown,
  Trash2,
  Plus,
  Info,
  Loader2,
  CircleCheck,
} from "lucide-react";
import { fetchEnrichmentPreview } from "../../services/enrichmentService.js";

export default function EnrichmentModal({ isOpen, onClose }) {
  const [step, setStep] = useState("TOOLS");
  const [enrichmentType, setEnrichmentType] = useState("profile");
  const [searchBy, setSearchBy] = useState("profile_url");
  const [targetUrl, setTargetUrl] = useState("https://www.instagram.com/nasa");
  const [resultLimit, setResultLimit] = useState(20);
  const [newerThanDays, setNewerThanDays] = useState(20);
  const [newerThanUnit, setNewerThanUnit] = useState("Days");
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [addMessage, setAddMessage] = useState("");
  const [addMessageType, setAddMessageType] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const toolsList = [
    "Instagram scraper",
    "Google maps",
    "Google search",
    "Apollo",
    "Crunchbase",
    "Website scraper",
    "Linkdin",
    "Similar web",
    "Google Ads",
    "Trustpilot",
    "Use AI",
  ];

  const handleGeneratePreview = async () => {
    setIsLoading(true);
    try {
      const payload = {
        enrichmentType,
        targetUrl,
        searchBy,
        config: {
          resultLimit,
          newerThanDays: enrichmentType === "post" ? newerThanDays : null,
        },
      };

      const result = await fetchEnrichmentPreview(payload);
      if (result.success) {
        setPreviewData(result.data);
        setStep("PREVIEW");
      }
    } catch (err) {
      alert(
        "Error fetching preview: " +
          (err.response?.data?.message || err.message),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-[50vw] h-[70vh] min-w-[700px] overflow-hidden shadow-xl border border-gray-200 font-sans flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#f3f3f3] border-b border-gray-200 shrink-0">
          <div className="flex flex-col">
            <h2
              className={`font-semibold text-[17px] ${
                step === "TOOLS" ? "text-gray-900" : "text-blue-600"
              }`}
            >
              Add Enrichment column
            </h2>

            {(step === "CONFIG" || step === "PREVIEW") && (
              <button
                onClick={() => setStep("TOOLS")}
                className="flex items-center gap-1.5 font-medium text-[11px] mt-1.5 w-fit hover:text-blue-700"
              >
                <ArrowLeft size={13} />
                Back to tools
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#dedede] flex items-center justify-center text-gray-600 hover:bg-[#d3d3d3]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body with Larger Proportional Padding */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* STEP 1: TOOL EXPLORER */}
          {step === "TOOLS" && (
            <div className="flex flex-col h-full min-h-0 px-5 py-4">
              <button className="flex items-center gap-2 text-blue-600 font-semibold text-[14px] mb-4 w-fit">
                <ArrowLeft size={17} />
                Back to pre-built enrichment outputs
              </button>

              <div className="flex gap-4 flex-1 min-h-0">
                {/* LEFT */}
                <div className="w-[180px] shrink-0 flex flex-col min-h-0">
                  <h3 className="font-semibold text-[12px] mb-2">Tools</h3>

                  <ul className="space-y-0.5 overflow-y-auto pr-1">
                    {toolsList.map((tool) => (
                      <li key={tool}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-[12px] font-medium transition ${
                            tool === "Instagram scraper"
                              ? "bg-blue-600 text-white"
                              : "text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {tool}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                  <h3 className="font-semibold text-[12px] mb-2">
                    Tool Details
                  </h3>

                  <div className="border border-gray-200 rounded-md p-4 flex flex-col flex-1 min-h-0 bg-white overflow-y-auto">
                    <h4 className="font-semibold text-[14px] text-gray-900 mb-2">
                      Instagram scraper
                    </h4>

                    <p className="text-[12px] text-gray-700 leading-[17px]">
                      <span className="font-medium text-gray-900">
                        Description:
                      </span>
                      <br />
                      Finds the profile details, such as username, bio, profile
                      picture, followers count, following count, and all
                      publicly available posts and related insights.
                    </p>

                    <div className="mt-4">
                      <h5 className="text-[11px] font-semibold text-gray-500 mb-2">
                        Input required
                      </h5>

                      <div className="flex flex-wrap gap-2">
                        {[
                          "Instagram profile url",
                          "Full name",
                          "Hashtags",
                          "Place name",
                        ].map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 border border-gray-200 rounded-md text-[10px] bg-gray-50"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-[11px] font-semibold text-gray-500 mb-2">
                        Enrichment outputs
                      </h5>

                      <div className="flex flex-wrap gap-2">
                        {[
                          "Username",
                          "Full name",
                          "Biography",
                          "Followers count",
                          "Following count",
                          "Post count",
                          "Verified status",
                          "Account type",
                          "Likes count",
                          "Comments count",
                        ].map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 border border-gray-200 rounded-md text-[10px] bg-gray-50"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <button
                        onClick={() => setStep("CONFIG")}
                        className="px-4 py-2 bg-black hover:bg-gray-900 text-white text-[11px] font-semibold rounded-md"
                      >
                        Try Instagram scraper
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* STEP 2: CONFIGURATION RECIPE */}
          {(step === "CONFIG" || step === "PREVIEW") && (
            <div className="flex flex-col">
              {/* SCROLLABLE CONTENT */}
              <div className="px-5 py-4">
                <h3 className="font-semibold text-[15px] text-gray-900">
                  All Instagram Data
                </h3>

                <p className="text-[12px] leading-[16px] text-gray-800 mt-1 mb-3">
                  Enrich this record with publicly available Instagram details
                  such as bio, followers, following, posts, likes count,
                  comments count, engagement metrics, and contact information.
                </p>

                {/* SELECT OUTPUT */}
                <div className="border border-gray-300 rounded-md px-3 py-2">
                  <label className="block font-medium text-[13px] mb-2">
                    Select enrichment output
                  </label>

                  <div className="relative">
                    <select
                      value={enrichmentType}
                      onChange={(e) => setEnrichmentType(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-[12px] bg-white appearance-none outline-none"
                    >
                      <option value="">Select output</option>
                      <option value="profile">Enrich Instagram profile</option>
                      <option value="post">Enrich Instagram post</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-3 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>

                {/* WATERFALL */}
                <h4 className="font-semibold text-[14px] mt-3 mb-2">
                  Waterfall action sequence
                </h4>

                <div className="border border-gray-200 bg-gray-50 p-3">
                  <div className="border border-gray-300 bg-white rounded-md overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between px-2 py-1.5">
                          <span className="text-[12px]">Instagram</span>

                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[11px]">
                              <Sparkles size={12} />1
                            </span>

                            <ChevronDown size={14} />
                          </div>
                        </div>

                        <div className="border-t border-gray-200 px-2 py-1.5 text-[11px] text-blue-600 flex items-center gap-1">
                          <Sparkles size={12} />
                          Using: lighteningly credits account
                        </div>
                      </div>
                      <button
                        className="px-2 text-red-500 hover:text-red-600 transition"
                        title="Remove tool"
                      >
                        <Trash2 size={15} strokeWidth={2} />
                      </button>{" "}
                    </div>
                  </div>

                  <button className="w-full mt-2 border border-dashed border-blue-500 py-1.5 text-blue-600 text-[11px] flex justify-center items-center gap-1">
                    <span className="bg-blue-600 text-white w-4 h-4 rounded-sm flex items-center justify-center">
                      <Plus size={12} strokeWidth={2} />
                    </span>
                    Add tool
                  </button>
                </div>

                {/* REQUIRED */}
                <h4 className="font-semibold text-[14px] mt-3 mb-2">
                  Required fields for Instagram
                </h4>

                <div className="border border-gray-200 bg-gray-50 p-3">
                  <p className="font-medium text-[12px] mb-3">
                    Choose the required fields to search by
                  </p>

                  <label className="flex gap-2 items-start mb-3 cursor-pointer">
                    <input
                      type="radio"
                      name="searchBy"
                      checked={searchBy === "profile_url"}
                      onChange={() => setSearchBy("profile_url")}
                      className="mt-1"
                    />

                    <div>
                      <div className="font-medium text-[12px]">
                        Instagram profile url
                      </div>

                      <div className="text-[11px] italic text-gray-500">
                        Finds the profile details, such as username, bio,
                        profile picture, follower count, following count, and
                        all publicly available posts and related insights.
                      </div>
                    </div>
                  </label>

                  <label className="flex gap-2 items-start cursor-pointer">
                    <input
                      type="radio"
                      name="searchBy"
                      checked={searchBy === "full_name"}
                      onChange={() => setSearchBy("full_name")}
                      className="mt-1"
                    />

                    <div>
                      <div className="font-medium text-[12px]">Full name</div>

                      <div className="text-[11px] italic text-gray-500">
                        Finds the profile details using the provided full name.
                      </div>
                    </div>
                  </label>

                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>
                        {searchBy === "profile_url"
                          ? "Instagram Profile URL"
                          : "Full Name"}
                      </span>

                      <span>For: Instagram</span>
                    </div>

                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-[12px] outline-none"
                    />
                  </div>
                </div>

                {/* OPTIONAL INPUT FIELDS */}
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <h4 className="font-semibold text-[16px] text-gray-900 mb-4">
                    Optional input fields for Instagram
                  </h4>

                  <div className="space-y-4">
                    {/* RESULT LIMIT */}
                    <div>
                      <label className="text-[13px] font-semibold text-gray-500 block mb-1.5">
                        Result Limit
                      </label>

                      <input
                        type="number"
                        value={resultLimit}
                        onChange={(e) => setResultLimit(Number(e.target.value))}
                        className="w-[80px] bg-white border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* ONLY POST NEWER THAN - POST ONLY */}
                    {enrichmentType === "post" && (
                      <div>
                        <label className="text-[13px] font-semibold text-gray-500 block mb-1.5">
                          Only post newer than
                        </label>

                        <div className="flex items-center gap-2">
                          {/* NUMBER */}
                          <input
                            type="number"
                            value={newerThanDays}
                            onChange={(e) =>
                              setNewerThanDays(Number(e.target.value))
                            }
                            className="w-[70px] bg-white border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:border-blue-500"
                          />

                          {/* UNIT */}
                          <div className="relative">
                            <select
                              value={newerThanUnit}
                              onChange={(e) => setNewerThanUnit(e.target.value)}
                              className="w-[110px] appearance-none bg-white border border-gray-300 rounded-md px-3 py-2.5 pr-8 text-[14px] text-gray-700 focus:outline-none focus:border-blue-500"
                            >
                              <option value="Days">Days</option>
                              <option value="Months">Months</option>
                              <option value="Years">Years</option>
                            </select>

                            <ChevronDown
                              size={15}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Generate Preview */}
                <div className="flex justify-end pt-3 pb-2">
                  <button
                    onClick={handleGeneratePreview}
                    disabled={isLoading}
                    className="px-5 py-2 bg-black hover:bg-gray-900 text-white text-[11px] font-semibold rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        Generating...
                      </>
                    ) : previewData ? (
                      <>
                        Preview generated
                        <Sparkles size={13} />
                        <span>1</span>
                      </>
                    ) : (
                      <>
                        Generate preview
                        <Sparkles size={13} />
                        <span>1</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* STEP 3: PREVIEW DATA */}
          {step === "PREVIEW" && previewData && (
            <div className="px-5 py-4">
              {/* TOP ROW */}

              <h3 className="text-[14px] font-semibold text-gray-900 mb-2">
                Preview :
              </h3>

              <div className="border border-gray-200 rounded-md bg-white p-3">
                <h4 className="font-semibold text-[12px] text-gray-900 mb-2">
                  Preview generated for Row 11:
                </h4>

                {/* Input columns */}
                <div className="mb-3">
                  <h5 className="text-[10px] font-semibold text-gray-600 mb-1.5">
                    Input columns used:
                  </h5>

                  {/* Main card */}
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full text-[11px] text-left">
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2 bg-gray-50 w-1/2 font-semibold">
                            {searchBy === "profile_url"
                              ? "Full Name"
                              : "Full Name"}
                          </td>

                          <td className="px-3 py-2">{targetUrl}</td>
                        </tr>

                        <tr>
                          <td className="px-3 py-2 bg-gray-50 w-1/2 font-semibold">
                            Result Limit
                          </td>

                          <td className="px-3 py-2">{resultLimit}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Generated value */}
                <div>
                  <h5 className="text-[10px] font-semibold text-gray-600 mb-1.5">
                    Generated value for row 11:
                  </h5>

                  {/* 1st degree */}
                  <div className="mb-3">
                    <span className="text-[11px] font-semibold text-blue-600 block mb-1.5">
                      1st degree data
                    </span>

                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <table className="w-full text-[11px] text-left">
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-3 py-2 bg-gray-50 w-1/2 font-semibold">
                              {previewData.firstDegree.label}
                            </td>

                            <td className="px-3 py-2 font-medium">Yes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 2nd degree */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[11px] font-semibold text-blue-600">
                        2nd degree data
                      </span>
                      <Info
                        size={12}
                        strokeWidth={2}
                        className="text-gray-500"
                      />{" "}
                    </div>

                    <p className="text-[10px] text-gray-500 leading-[15px] mb-2">
                      Sample of a single data row added to a new subsheet.
                    </p>

                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <table className="w-full text-[11px] text-left">
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(previewData.secondDegree).map(
                            ([key, val]) => (
                              <tr key={key}>
                                <td className="px-3 py-2 bg-gray-50 w-1/3 font-semibold">
                                  {key}
                                </td>

                                <td className="px-3 py-2 break-words">
                                  {String(val)}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success message */}
        {isAdded && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 bg-white border border-green-200 shadow-lg rounded-md px-4 py-2.5 text-[13px] font-medium text-green-700">
              <CircleCheck size={16} />
              Data added to worksheet
            </div>
          </div>
        )}

        {/* COMMON FOOTER */}
        {(step === "CONFIG" || step === "PREVIEW") && (
          <div className="border-t border-gray-200 bg-white px-5 py-3 flex items-center justify-between shrink-0">
            {/* MESSAGE */}
            <div className="min-h-[20px]">
              {addMessage && (
                <div
                  className={`flex items-center gap-2 text-[13px] font-medium ${
                    addMessageType === "success"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {addMessageType === "success" ? (
                    <CircleCheck size={16} />
                  ) : (
                    <Info size={16} />
                  )}

                  {addMessage}
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              <span className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5">
                <Sparkles size={13} />
                Might use 1/row
              </span>

              <button
                onClick={() => {
                  if (!previewData) {
                    setAddMessage("Please generate enriched data first");
                    setAddMessageType("error");

                    setTimeout(() => {
                      setAddMessage("");
                    }, 2500);

                    return;
                  }

                  setAddMessage("Data added successfully");
                  setAddMessageType("success");

                  setTimeout(() => {
                    setAddMessage("");
                  }, 2500);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold rounded-md transition"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
