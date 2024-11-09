import React, { useState } from "react";

const AddFieldModal = ({ onSave, onClose }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  // Suggested field names
  const suggestions = [
    "Company Name",
    "Year of Establishment",
    "Industry Type",
    "CEO",
    "Headquarters",
    "Number of Employees",
    "Revenue",
    "Mission Statement",
    "Vision Statement",
  ];

  // Handle clicking a suggestion capsule
  const handleSuggestionClick = (suggestion) => {
    setKey(suggestion);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Field</h3>

        {/* Suggestions as Capsules */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-400 focus:outline-none ${
                key === suggestion ? "bg-gray-400" : ""
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input for Field Key */}
        <input
          type="text"
          placeholder="Field Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />

        {/* Input for Field Value */}
        <input
          type="text"
          placeholder="Field Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            onClick={() => onSave(key, value)}
          >
            Add
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

export default AddFieldModal;
