import React, { useState, useEffect } from "react";

const LinkModal = ({ isOpen, onClose, onSave, initialLink, linkType }) => {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLink(initialLink || "");
    setError("");
  }, [initialLink]);

  const validateLink = () => {
    switch (linkType) {
      case "WhatsApp":
        if (!/^\d{10}$/.test(link)) {
          setError("Please enter a valid 10-digit phone number.");
          return false;
        }
        break;
      case "Instagram":
        // Extract username if it's a URL, or verify if it's a valid username
        const instaMatch = link.match(
          /^https:\/\/(www\.)?instagram\.com\/([^/?]+)/
        );
        if (instaMatch) {
          const username = instaMatch[2];
          setLink(username);
          setError("");
        } else if (/^[a-zA-Z0-9._]+$/.test(link)) {
          setError("");
        } else {
          setError("Please enter a valid Instagram profile link or username.");
          return false;
        }
        break;
      case "Google Maps":
        if (!/^https:\/\/www\.google\.[a-z.]+\/maps\/.+/.test(link)) {
          setError("Please enter a valid Google Maps link.");
          return false;
        }
        break;
      default:
        break;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validateLink()) {
      onSave(link);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Add {linkType} Link</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">{linkType} URL</label>
          <input
            type="text"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setError("");
            }}
            placeholder={`Enter ${linkType} link`}
            className={`w-full px-3 py-2 border rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!!error || !link}
            className={`px-4 py-2 rounded text-white ${
              error || !link
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
