import React, { useState } from "react";
import isValidUrl from "../../utils/isValidURL";

const EditSocialLinkModal = ({ linkData, onSave, onClose }) => {
  const [platform, setPlatform] = useState(linkData.platform);
  const [link, setLink] = useState(linkData.value);
  const [error, setError] = useState("");

  const validateInput = () => {
    const trimmedLink = link.trim();

    switch (platform.toLowerCase()) {
      case "instagram":
      case "youtube":
      case "linkedin":
      case "twitter":
        // Ensure only the ID is entered, not a full URL
        if (trimmedLink.includes("http") || trimmedLink.includes("/")) {
          setError(`Only enter the ID or username for ${platform}`);
          return false;
        }
        break;
      case "phone":
        // Ensure the phone number is exactly 10 digits
        if (!/^\d{10}$/.test(trimmedLink)) {
          setError("Phone number must be exactly 10 digits");
          return false;
        }
        break;
      case "email":
        // Basic email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedLink)) {
          setError("Please enter a valid email address");
          return false;
        }
        break;
      case "website":
        // Basic URL format validation for websites
        if (isValidUrl(trimmedLink)) {
          setError("Please enter a valid URL");
          return false;
        }
        break;
      default:
        break;
    }

    setError("");
    return true;
  };

  const handleSaveClick = () => {
    if (validateInput()) {
      onSave(linkData.index, platform, link);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit Social Link</h3>

        {/* Platform input */}
        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />

        {/* Link input */}
        <input
          type="text"
          placeholder="Link or ID"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Save and Cancel buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSocialLinkModal;
