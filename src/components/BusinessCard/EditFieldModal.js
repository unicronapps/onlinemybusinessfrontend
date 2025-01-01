import React, { useState } from "react";

const EditFieldModal = ({ field, onSave, onDelete, onClose }) => {
  const [value, setValue] = useState(field.value);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit {field.key}</h3>

        {/* Input to edit the field value */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Buttons for Save, Delete, and Cancel */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
            onClick={() => setIsConfirmingDelete(true)} // Show delete confirmation
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => onSave(value)}
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

      {/* Delete Confirmation Modal */}
      {isConfirmingDelete && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this field?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                onClick={() => onDelete(field.key)}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsConfirmingDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFieldModal;
