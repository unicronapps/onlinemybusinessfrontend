import React, { useState } from "react";

const QRPaymentModal = ({
  isOpen,
  onClose,
  onSave,
  selectedPayment,
  initialQRLink,
}) => {
  const [qrLink, setQrLink] = useState(initialQRLink || "");
  const [error, setError] = useState("");

  // Function to validate if the link is a valid URL
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSave = () => {
    if (isValidURL(qrLink)) {
      setError(""); // Clear any previous error
      onSave(qrLink);
      onClose();
    } else {
      setError("Please enter a valid URL.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          Add {selectedPayment} QR Link
        </h2>
        <input
          type="text"
          value={qrLink}
          onChange={(e) => setQrLink(e.target.value)}
          placeholder="Enter QR code link"
          className="w-full px-3 py-2 border rounded mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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

export default QRPaymentModal;
