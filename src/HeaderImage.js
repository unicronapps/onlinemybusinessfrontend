import React, { useState } from "react";
import ImagePopup from "./ImagePopup";

const HeaderImage = ({
  headerImage,
  mainImage,
  setHeaderImage,
  setMainImage,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState(null);

  const openPopup = (imageType) => {
    setSelectedImageType(imageType);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImageType(null);
  };

  const handleImageUpload = (url) => {
    if (selectedImageType === "header") {
      setHeaderImage(url);
    } else if (selectedImageType === "main") {
      setMainImage(url);
    }
    closePopup();
  };

  const handleDeleteImage = () => {
    if (selectedImageType === "header") {
      setHeaderImage(null);
    } else if (selectedImageType === "main") {
      setMainImage(null);
    }
    closePopup();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div
        onClick={() => openPopup("header")}
        className="w-full h-32 mb-2 bg-gray-200 flex items-center justify-center cursor-pointer"
      >
        {headerImage ? (
          <img
            src={headerImage}
            alt="Header Logo"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
      <div
        onClick={() => openPopup("main")}
        className="w-28 h-28 bg-gray-200 flex items-center justify-center rounded-full border-4 border-white -mt-12 cursor-pointer"
      >
        {mainImage ? (
          <img
            src={mainImage}
            alt="Main Logo"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {isPopupOpen && (
        <ImagePopup
          imageUrl={selectedImageType === "header" ? headerImage : mainImage}
          onClose={closePopup}
          onDelete={handleDeleteImage}
          onUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default HeaderImage;
