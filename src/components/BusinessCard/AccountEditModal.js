import React, { useState } from "react";

const AccountEditModal = ({ isOpen, onClose, accountData, onSave }) => {
  const [accountHolder, setAccountHolder] = useState(
    accountData.accountHolder || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    accountData.accountNumber || ""
  );
  const [ifsc, setIfsc] = useState(accountData.ifsc || "");
  const [bankName, setBankName] = useState(accountData.bankName || "");

  const handleSave = () => {
    onSave({
      accountHolder,
      accountNumber,
      ifsc,
      bankName,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Edit Account Details</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium">Account Holder</label>
          <input
            type="text"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">IFSC Code</label>
          <input
            type="text"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
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

export default AccountEditModal;
