import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaLink,
} from "react-icons/fa";
import EditSocialLinkModal from "./EditSocialLinkModal";
import editableFunction from "../../utils/editableFunction";

const SocialLinks = ({ socialLinks, setSocialLinks, isEditable = false }) => {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleSocialChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  // Get the appropriate icon based on platform name
  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebook className="text-blue-600" />;
      case "twitter":
        return <FaTwitter className="text-blue-400" />;
      case "linkedin":
        return <FaLinkedin className="text-blue-700" />;
      case "instagram":
        return <FaInstagram className="text-pink-500" />;
      default:
        return <FaLink className="text-gray-500" />;
    }
  };

  // Generate the correct URL based on the platform and value
  const getRedirectLink = (platform, value) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return `https://facebook.com/${value}`;
      case "whatsapp":
        return `https://wa.me/${value.replace(/\D/g, "")}`;
      case "linkedin":
        return `https://linkedin.com/in/${value}`;
      case "instagram":
        return `https://instagram.com/${value}`;
      case "twitter":
        return `https://twitter.com/${value}`;
      case "youtube":
        return `https://youtube.com/c/${value}`;
      case "website":
        return value.includes("http") ? value : `https://${value}`;
      case "email":
        return `mailto:${value}`;
      case "phone":
        return `tel:${value.replace(/\D/g, "")}`;
      default:
        return value.includes("http") ? value : `https://${value}`;
    }
  };

  // Open the modal with selected link data
  const openEditModal = (link, index) => {
    setSelectedLink({ ...link, index });
  };

  // Handle saving changes in the modal
  const handleSave = (index, platform, value) => {
    handleSocialChange(index, "platform", platform);
    handleSocialChange(index, "value", value);
    setSelectedLink(null); // Close modal after saving
  };
  let isEmpty = false;
  socialLinks.forEach((element) => {
    if (element.value) isEmpty = true;
  });
  if (!isEmpty && !isEditable) return <></>;
  return (
    <div className="bg-white shadow rounded-lg p-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Social Links</h2>
      {/* Display each social link */}
      {socialLinks.map((link, index) => {
        if (!link.value && !isEditable) {
          return <></>;
        }

        return (
          <div
            key={index}
            className="flex items-center mb-4 space-x-3 cursor-pointer"
            onClick={() =>
              editableFunction(
                isEditable,
                () => openEditModal(link, index),
                () =>
                  window.open(
                    getRedirectLink(link.platform, link.value),
                    "_blank"
                  )
              )
            }
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {getIcon(link.platform)}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{link.platform}</span>
              <span className="text-gray-500">{link.value}</span>
            </div>
          </div>
        );
      })}

      {/* EditSocialLinkModal */}
      {selectedLink && (
        <EditSocialLinkModal
          linkData={selectedLink}
          onSave={handleSave}
          onClose={() => setSelectedLink(null)}
        />
      )}
    </div>
  );
};

export default SocialLinks;
