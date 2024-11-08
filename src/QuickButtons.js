import React, { useState } from "react";
import LinkModal from "./LinkModal";

const QuickButtons = () => {
  const [links, setLinks] = useState({
    whatsapp: "",
    instagram: "",
    googleMaps: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLinkType, setCurrentLinkType] = useState("");

  const handleOpenModal = (linkType) => {
    setCurrentLinkType(linkType);
    setIsModalOpen(true);
  };

  const handleSaveLink = (newLink) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      [currentLinkType]: newLink,
    }));
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      <button
        onClick={() => handleOpenModal("whatsapp")}
        className="w-60 py-3 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="mr-2 text-xl">📲</span>
        WhatsApp Order Now
      </button>
      <button
        onClick={() => handleOpenModal("instagram")}
        className="w-60 py-3 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="mr-2 text-xl">📸</span>
        Follow us on Instagram
      </button>
      <button
        onClick={() => handleOpenModal("googleMaps")}
        className="w-60 py-3 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="mr-2 text-xl">📍</span>
        Google Maps Direction
      </button>

      <LinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLink}
        initialLink={links[currentLinkType]}
        linkType={
          currentLinkType === "whatsapp"
            ? "WhatsApp"
            : currentLinkType === "instagram"
            ? "Instagram"
            : "Google Maps"
        }
      />
    </div>
  );
};

export default QuickButtons;
