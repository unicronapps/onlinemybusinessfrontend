import React, { useState, useEffect } from "react";

const LinkModal = ({ isOpen, onClose, onSave, initialLink, linkType }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialLink) {
      setLink(initialLink);
    } else {
      setLink("");
    }
  }, [initialLink]);

  const handleSave = () => {
    onSave(link);
    onClose();
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
            onChange={(e) => setLink(e.target.value)}
            placeholder={`Enter ${linkType} link`}
            className="w-full px-3 py-2 border rounded"
          />
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
