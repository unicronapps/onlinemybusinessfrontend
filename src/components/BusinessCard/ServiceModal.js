import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceModal = ({ isOpen, onClose, onSave, service }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [bookingRequired, setBookingRequired] = useState("No"); // Default to "No"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description || "");
      setImage(service.image || "");
      setPrice(service.price || "");
      setBookingRequired(service.bookingRequired || "No");
    } else {
      // Reset fields for new service
      setTitle("");
      setDescription("");
      setImage("");
      setPrice("");
      setBookingRequired("No");
    }
  }, [service]);

  const handleSave = () => {
    const newService = {
      title,
      description,
      image,
      price,
      bookingRequired,
    };
    onSave(newService);
    onClose();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, // Replace with your actual API key
        formData
      );

      const uploadedUrl = response.data.data.url;
      setImage(uploadedUrl);
    } catch (error) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          {service ? "Edit Service" : "Add Service"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded"
          />
          {loading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {image && (
            <img
              src={image}
              alt="Service Preview"
              className="mt-2 w-full h-32 object-cover rounded"
            />
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Booking Required</label>
          <select
            value={bookingRequired}
            onChange={(e) => setBookingRequired(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
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

export default ServiceModal;
