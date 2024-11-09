import React from "react";
import EditableField from "./EditableField";

const SocialLinks = ({
  socialLinks,
  handleSocialChange,
  handleAddSocialLink,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Social Links</h2>
    {socialLinks.map((link, index) => (
      <div key={index} className="flex items-center mb-2">
        <EditableField
          value={link.platform}
          onSave={(value) => handleSocialChange(index, "platform", value)}
          placeholder="Platform"
        />
        <EditableField
          value={link.link}
          onSave={(value) => handleSocialChange(index, "link", value)}
          placeholder="Link"
          type="text"
        />
      </div>
    ))}
    <button
      className="text-blue-500 text-sm mt-2"
      onClick={handleAddSocialLink}
    >
      + Add Social Link
    </button>
  </div>
);

export default SocialLinks;
