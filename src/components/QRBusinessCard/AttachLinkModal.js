// AttachLinkModal.js
import React, { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const AttachLinkModal = ({ onClose, businessId }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSaveLink = async () => {
    const sidMatch = url.match(/https:\/\/onlinemybusiness\.com\/s\/(\w+)/);
    if (!sidMatch) {
      setError(
        "Invalid link format. Please use the format: https://onlinemybusiness.com/s/{sid}"
      );
      return;
    }

    const sid = sidMatch[1];
    const originalLink = `https://onlinemybusiness.com/view/${businessId}`;

    try {
      await setDoc(doc(db, "s-short-link", sid), {
        sid: sid,
        link: originalLink,
        count: 0,
      });
      onClose();
    } catch (error) {
      console.error("Error saving short link:", error);
      setError("Failed to save link. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Attach QR Code Link</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://onlinemybusiness.com/s/{sid}"
          className="w-full px-3 py-2 border rounded mb-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveLink}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachLinkModal;
