import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner, FaTrashAlt } from "react-icons/fa"; // Icons for spinner and delete

const PersonModal = ({ isOpen, onClose, onSave, onDelete, person }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const imgbbAPIKey = "1d39392fa44b5a475d88e6de829ec7f0"; // Replace with your actual ImgBB API key

  useEffect(() => {
    if (person) {
      setName(person.name);
      setPosition(person.position);
      setDescription(person.description || "");
      setImage(person.image || "");
      setInstagram(person.socialLinks?.instagram || "");
      setFacebook(person.socialLinks?.facebook || "");
    } else {
      // Reset fields for a new person
      setName("");
      setPosition("");
      setDescription("");
      setImage("");
      setInstagram("");
      setFacebook("");
    }
    setError("");
  }, [person]);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      setImage(response.data.data.url); // Set the uploaded image URL
      setError("");
    } catch (err) {
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!name || !position) {
      setError("Name and position are required.");
      return;
    }

    const newPerson = {
      name,
      position,
      description,
      image,
      socialLinks: { instagram, facebook },
    };
    onSave(newPerson);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    setIsDeleteConfirmOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        {/* Delete Icon in the top-right corner */}
        {person && (
          <button
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        )}
        <h2 className="text-lg font-semibold mb-4">
          {person ? "Edit Person" : "Add Person"}
        </h2>
        <div className="mb-2">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
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
          <label className="block text-sm font-medium">Image URL</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className={`w-full px-3 py-2 border rounded ${
                loading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                <FaSpinner className="animate-spin text-gray-600 text-xl" />
              </div>
            )}
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {image && !loading && (
            <img
              src={image}
              alt="Uploaded"
              className="w-16 h-16 rounded-full mt-2"
            />
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Instagram URL</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Facebook URL</label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
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
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <FaSpinner className="animate-spin mr-2" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-64 text-center">
              <p className="text-lg font-semibold mb-4">Confirm Deletion</p>
              <p className="text-sm mb-4">
                Are you sure you want to delete this person?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonModal;
