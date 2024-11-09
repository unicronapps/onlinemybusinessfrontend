import React, { useState } from "react";

const ManageFieldsModal = ({ fields, updateFields, onClose }) => {
  const [fieldData, setFieldData] = useState({ ...fields });
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  // Field suggestions for the user
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

  // Handle field changes
  const handleFieldChange = (key, value) => {
    setFieldData({ ...fieldData, [key]: value });
  };

  // Add a new field
  const handleAddField = () => {
    if (newKey && newValue && !fieldData.hasOwnProperty(newKey)) {
      setFieldData({ ...fieldData, [newKey]: newValue });
      setNewKey("");
      setNewValue("");
    }
  };

  // Delete a field
  const handleDeleteField = (key) => {
    const updatedFields = { ...fieldData };
    delete updatedFields[key];
    setFieldData(updatedFields);
  };

  // Save changes and close modal
  const handleSave = () => {
    updateFields(fieldData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Manage Fields</h3>

        {/* Scrollable Content */}
        <div className="max-h-80 overflow-y-auto">
          {/* Existing Fields List */}
          {Object.entries(fieldData).map(([key, value]) => (
            <div key={key}>
              <div className="flex flex-col mb-2">
                <span className="font-medium">{key}:</span>

                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteField(key)}
                >
                  Delete
                </button>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            </div>
          ))}

          {/* Add New Field */}
          <h4 className="font-medium mt-4 mb-2">Add New Field</h4>
          <div className="flex items-center mb-4">
            <select
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l"
            >
              <option value="" disabled>
                Select Field
              </option>
              {suggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion}>
                  {suggestion}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Field Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-r"
            />
            <button
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddField}
            >
              Add
            </button>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={handleSave}
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

export default ManageFieldsModal;
