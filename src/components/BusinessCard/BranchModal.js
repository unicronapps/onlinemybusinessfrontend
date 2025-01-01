import React, { useState, useEffect } from "react";
import axios from "axios";

const BranchModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [branch, setBranch] = useState({
    name: "",
    type: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    googleMapsLink: "",
    photo1: null,
    photo2: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setBranch(initialData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setBranch((prev) => ({ ...prev, [field]: value }));
  };

  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSave = () => {
    if (!validatePhoneNumber(branch.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }
    onSave(branch);
    onClose();
  };

  const handleFileChange = async (event, photoField) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=1d39392fa44b5a475d88e6de829ec7f0`,
        formData
      );

      const uploadedUrl = response.data.data.url;
      setBranch((prev) => ({ ...prev, [photoField]: uploadedUrl }));
    } catch (error) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 relative overflow-y-auto max-h-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {initialData ? "Edit Branch" : "Add Branch"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Branch Name"
            value={branch.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Branch Type"
            value={branch.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={branch.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={branch.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={branch.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Pin Code"
            value={branch.pinCode}
            onChange={(e) => handleChange("pinCode", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={branch.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Google Maps Link"
            value={branch.googleMapsLink}
            onChange={(e) => handleChange("googleMapsLink", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Photo 1:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo1")}
                disabled={loading}
                className="w-full"
              />
              {branch.photo1 && (
                <img
                  src={branch.photo1}
                  alt="Branch Photo 1"
                  className="mt-2 w-full h-24 object-cover rounded"
                />
              )}
            </div>
            <div>
              <label className="block mb-1">Photo 2:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo2")}
                disabled={loading}
                className="w-full"
              />
              {branch.photo2 && (
                <img
                  src={branch.photo2}
                  alt="Branch Photo 2"
                  className="mt-2 w-full h-24 object-cover rounded"
                />
              )}
            </div>
          </div>
          {loading && <p className="text-blue-500 text-center">Uploading...</p>}
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
  ) : null;
};

export default BranchModal;
