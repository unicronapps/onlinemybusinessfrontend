import React, { useState } from "react";
import LinkModal from "./LinkModal";
import editableFunction from "../../utils/editableFunction";

const QuickButtons = ({
  isEditable = false,
  whatsappQuick,
  setWhatsappQuick,
  instagramQuick,
  setInstagramQuick,
  googleMapsQuick,
  setGoogleMapsQuick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLinkType, setCurrentLinkType] = useState("");

  const openLinkInNewTab = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Link not available. Please set the link first.");
    }
  };

  const onClickFxn = (linkType) => {
    editableFunction(
      isEditable,
      () => handleOpenModal(linkType),
      () => openLinkInNewTab(getLink(linkType).link)
    );
  };

  const handleOpenModal = (linkType) => {
    setCurrentLinkType(linkType);
    setIsModalOpen(true);
  };

  const handleSaveLink = (newLink) => {
    switch (currentLinkType) {
      case "whatsapp":
        if (/^\d{10}$/.test(newLink)) {
          const whatsappUrl = `https://wa.me/${newLink}?text=Hi`;
          setWhatsappQuick({ value: newLink, link: whatsappUrl });
        } else {
          alert("Please enter a valid 10-digit phone number.");
        }
        break;

      case "instagram":
        const instaIdMatch = newLink.match(
          /^https:\/\/www\.instagram\.com\/([^/]+)\/?$/
        );
        if (instaIdMatch) {
          const instaId = instaIdMatch[1];
          const instaUrl = `https://www.instagram.com/${instaId}`;
          setInstagramQuick({ value: newLink, link: instaUrl });
        } else {
          alert("Please enter a valid Instagram profile link.");
        }
        break;

      case "googleMaps":
        setGoogleMapsQuick({ value: newLink, link: newLink });
        break;

      default:
        break;
    }
    setIsModalOpen(false);
  };

  const getLink = (linkType) => {
    switch (linkType) {
      case "whatsapp":
        return whatsappQuick;
      case "instagram":
        return instagramQuick;
      case "googleMaps":
        return googleMapsQuick;
      default:
        return { value: "", link: "" };
    }
  };
  console.log(whatsappQuick, instagramQuick, googleMapsQuick);
  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {!(!isEditable && !whatsappQuick.value) && (
        <button
          onClick={() => onClickFxn("whatsapp")}
          className="w-60 py-3 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="mr-2 text-xl">📲</span>
          WhatsApp Order Now
        </button>
      )}
      {!(!isEditable && !instagramQuick.value) && (
        <button
          onClick={() => onClickFxn("instagram")}
          className="w-60 py-3 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="mr-2 text-xl">📸</span>
          Follow us on Instagram
        </button>
      )}
      {!(!isEditable && !googleMapsQuick.value) && (
        <button
          onClick={() => onClickFxn("googleMaps")}
          className="w-60 py-3 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="mr-2 text-xl">📍</span>
          Google Maps Direction
        </button>
      )}

      <LinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLink}
        initialLink={getLink(currentLinkType).value}
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
