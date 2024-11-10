import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage"; // Utility function for cropping
import axios from "axios";

const ImagePopup = ({
  imageUrl,
  onClose,
  onDelete,
  onUpload,
  imageRatio = 1,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const imgbbAPIKey = "1d39392fa44b5a475d88e6de829ec7f0"; // Replace with your ImgBB API key

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels);

      // Upload to ImgBB
      const formData = new FormData();
      formData.append("image", croppedImage);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      const uploadedUrl = response.data.data.url;
      onUpload(uploadedUrl);
      onClose();
    } catch (error) {
      console.error("Failed to crop and upload image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {loading && <p className="text-center text-white">Loading...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {selectedFile ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64 bg-gray-200 mb-4">
              <Cropper
                image={selectedFile}
                crop={crop}
                zoom={zoom}
                aspect={imageRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-between w-full px-4">
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-4 py-2 text-white rounded ${
                  loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">Choose an image to crop</p>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        )}

        {imageUrl && !selectedFile && (
          <div className="mt-4 text-center">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePopup;
