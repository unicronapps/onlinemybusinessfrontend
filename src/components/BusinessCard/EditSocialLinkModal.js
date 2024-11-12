import React, { useState } from "react";

const EditSocialLinkModal = ({ linkData, onSave, onClose }) => {
  const [platform, setPlatform] = useState(linkData.platform);
  const [link, setLink] = useState(linkData.link);

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
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Save and Cancel buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => onSave(linkData.index, platform, link)}
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
