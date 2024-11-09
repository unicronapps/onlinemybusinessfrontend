import React, { useRef } from "react";
import axios from "axios";

const ImagePopup = ({ imageUrl, onClose, onDelete, onUpload }) => {
  const fileInputRef = useRef(null);

  const imgbbAPIKey = "1d39392fa44b5a475d88e6de829ec7f0"; // Replace with your ImgBB API key

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      const imageUrl = response.data.data.url;
      onUpload(imageUrl); // Pass the new URL back to the parent component
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <div className="flex flex-col items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-40 object-cover mb-4 rounded"
            />
          ) : (
            <p className="text-gray-500 mb-4">No Image Available</p>
          )}

          <button
            onClick={onDelete}
            className="mb-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Image
          </button>

          <button
            onClick={triggerFileInput}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload New Image
          </button>

          {/* Hidden file input for uploading images */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
