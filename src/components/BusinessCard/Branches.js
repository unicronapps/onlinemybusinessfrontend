import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import BranchModal from "./BranchModal";
import googleMapsLogo from "../../assets/logos/google-maps.png";
import { FiMapPin } from "react-icons/fi";
import editableFunction from "../../utils/editableFunction";

const Branches = ({ branches, setBranches, isEditable = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [editingBranchIndex, setEditingBranchIndex] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      if (isImgModalOpen) {
        closeImgModal();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isImgModalOpen]);
  function handleEdit(index) {
    editableFunction(
      isEditable,
      () => openModal(index),
      () => null
    );
  }
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
  const openImgModal = (image) => {
    setCurrentImage(image);
    setIsImgModalOpen(true);
    window.history.pushState({ modalOpen: true }, ""); // Push a state to track the modal open
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
    setCurrentImage(null);
    if (window.history.state && window.history.state.modalOpen) {
      window.history.back(); // Ensure the history entry is removed
    }
  };
  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
        <span>Location and Address</span>
        {isEditable && (
          <button
            className="flex items-center space-x-2 text-blue-500 text-sm  hover:text-blue-600"
            onClick={() => openModal()}
          >
            <FaPlus />
            <span>Add</span>
          </button>
        )}
      </h2>
      {branches.map((branch, index) => {
        console.log(branch);
        return (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
            onClick={() => handleEdit(index)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">
                {index + 1}. {branch.name} ({branch.type})
              </h3>
              {isEditable ? (
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBranch(index);
                  }}
                >
                  <FaTrash />
                </button>
              ) : (
                <></>
              )}
            </div>
            <p>
              {branch.streetAddress}, {branch.city}, {branch.state},{" "}
              {branch.pinCode}
            </p>
            <p>Phone: {branch.phone}</p>
            <div className="flex">
              {branch.googleMapsLink ? (
                <a
                  href={branch.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg font-bold"
                >
                  <img
                    src={googleMapsLogo}
                    alt="Google Maps"
                    height={20}
                    width={20}
                  />
                  <span className="ml-2">View on Google Maps</span>
                </a>
              ) : (
                <></>
              )}

              {/* <button
              onClick={handleShare}
              className="flex items-center text-blue-500 ml-4 mt-2 hover:text-blue-600"
            >
              <FiMapPin className="mr-2" />{" "}
              <span>Share the location</span>
            </button> */}
            </div>
            <div className="flex space-x-2 mt-4">
              {branch.photo1 && (
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    openImgModal({ src: branch.photo1 });
                  }}
                  src={branch.photo1}
                  alt="Branch Photo 1"
                  className="w-24 h-24 rounded"
                />
              )}
              {branch.photo2 && (
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    openImgModal({ src: branch.photo2 });
                  }}
                  src={branch.photo2}
                  alt="Branch Photo 2"
                  className="w-24 h-24 rounded"
                />
              )}
            </div>
          </div>
        );
      })}
      {isEditable && (
        <button
          className="flex items-center space-x-2 text-blue-500 text-sm mt-4 hover:text-blue-600"
          onClick={() => openModal()}
        >
          <FaPlus />
          <span>Add Branch</span>
        </button>
      )}

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
      {isImgModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImgModal} // Close modal when clicking outside the image
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImgModal}
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
    </div>
  );
};

export default Branches;
