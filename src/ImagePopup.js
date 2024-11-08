import React from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai"; // Example for upload/change

const ImagePopup = ({ image, onClose, onDelete, onChange }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        {image ? (
          <img
            src={image}
            alt="Selected"
            className="w-full h-48 object-cover mb-4 rounded"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={onChange}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            <AiOutlineCloudUpload className="mr-2" /> Change Image
          </button>
          <button
            onClick={onDelete}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            <FiTrash2 className="mr-2" /> Delete Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
