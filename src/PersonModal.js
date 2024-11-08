import React, { useState, useEffect } from "react";

const PersonModal = ({ isOpen, onClose, onSave, person }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {
    if (person) {
      setName(person.name);
      setPosition(person.position);
      setDescription(person.description || "");
      setImage(person.image || "");
      setInstagram(person.socialLinks?.instagram || "");
      setFacebook(person.socialLinks?.facebook || "");
    } else {
      // Reset fields for new person
      setName("");
      setPosition("");
      setDescription("");
      setImage("");
      setInstagram("");
      setFacebook("");
    }
  }, [person]);

  const handleSave = () => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
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
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonModal;
