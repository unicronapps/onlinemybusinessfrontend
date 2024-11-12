import React, { useState, useEffect } from "react";

const GallerySection = ({ images, setImages }) => {
  const previewLimit = 5; // Number of images to show initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const isEditable = true;

  const handleAddImage = () => {
    setIsUploadModalOpen(true); // Open the upload modal
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadPreview(reader.result); // Show preview of uploaded image
      };
      reader.readAsDataURL(file); // Convert file to base64 URL
    }
  };

  const handleConfirmUpload = () => {
    if (uploadPreview) {
      const newImage = {
        src: uploadPreview,
        thumbnail: uploadPreview,
      };
      setImages([...images, newImage]);
      setUploadPreview(null); // Clear preview
      setIsUploadModalOpen(false); // Close upload modal
    }
  };

  const handleDeleteImage = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmed) {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    }
  };

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
    window.history.pushState({ modalOpen: true }, ""); // Push a state to track the modal open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
    if (window.history.state && window.history.state.modalOpen) {
      window.history.back(); // Ensure the history entry is removed
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isModalOpen]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Gallery</h2>
        {isEditable && (
          <button
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Image
          </button>
        )}
      </div>

      {/* Responsive Grid for Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.slice(0, previewLimit).map((image, index) => (
          <div key={index} className="relative">
            <img
              onClick={() => openModal(image)}
              src={image.thumbnail}
              alt={`Gallery image ${index + 1}`}
              className="w-full object-cover rounded-lg cursor-pointer h-28 sm:h-40 md:h-48"
              loading="lazy"
            />
            {isEditable && (
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                style={{ fontSize: "12px" }}
              >
                X
              </button>
            )}
          </div>
        ))}
        {images.length > previewLimit && (
          <div
            onClick={() => openModal(images[previewLimit])}
            className="relative flex items-center justify-center bg-gray-300 rounded-lg text-center cursor-pointer h-32 sm:h-40 md:h-48"
          >
            <span className="text-xl font-semibold">
              + {images.length - previewLimit} More
            </span>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal} // Close modal when clicking outside the image
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 left-2 bg-white text-black px-3 py-1 rounded-full"
            >
              Back
            </button>
            <img
              src={currentImage.src}
              alt="Selected"
              className="max-h-screen max-w-screen"
            />
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Upload Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            {uploadPreview && (
              <div className="mb-4">
                <img
                  src={uploadPreview}
                  alt="Upload preview"
                  className="max-h-48 max-w-full rounded-lg"
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={!uploadPreview}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
