import React, { useState } from "react";
import { FaPlus, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import BranchModal from "./BranchModal";

const Branches = ({ branches, setBranches, isEditable = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranchIndex, setEditingBranchIndex] = useState(null);

  const openModal = (index = null) => {
    setEditingBranchIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBranchIndex(null);
  };

  const handleSaveBranch = (newBranch) => {
    if (editingBranchIndex !== null) {
      const updatedBranches = [...branches];
      updatedBranches[editingBranchIndex] = newBranch;
      setBranches(updatedBranches);
    } else {
      setBranches([...branches, newBranch]);
    }
    closeModal();
  };

  const handleDeleteBranch = (index) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    setBranches(updatedBranches);
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Location and Address
      </h2>
      {branches.map((branch, index) => (
        <div
          key={index}
          className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
          onClick={() => openModal(index)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">
              {index + 1}. {branch.name} ({branch.type})
            </h3>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBranch(index);
              }}
            >
              <FaTrash />
            </button>
          </div>
          <p>
            {branch.streetAddress}, {branch.city}, {branch.state},{" "}
            {branch.pinCode}
          </p>
          <p>Phone: {branch.phone}</p>
          <a
            href={branch.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 mt-2 hover:text-blue-600"
          >
            <FaMapMarkerAlt className="mr-1" />
            <span>Google Maps</span>
          </a>
          <div className="flex space-x-2 mt-4">
            {branch.photo1 && (
              <img
                src={branch.photo1}
                alt="Branch Photo 1"
                className="w-24 h-24 rounded"
              />
            )}
            {branch.photo2 && (
              <img
                src={branch.photo2}
                alt="Branch Photo 2"
                className="w-24 h-24 rounded"
              />
            )}
          </div>
        </div>
      ))}
      <button
        className="flex items-center space-x-2 text-blue-500 text-sm mt-4 hover:text-blue-600"
        onClick={() => openModal()}
      >
        <FaPlus />
        <span>Add Branch</span>
      </button>

      {/* Branch Modal */}
      {isModalOpen && (
        <BranchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveBranch}
          initialData={
            editingBranchIndex !== null ? branches[editingBranchIndex] : null
          }
        />
      )}
    </div>
  );
};

export default Branches;
