import React from "react";
import EditableField from "./EditableField";

const AboutUs = ({ aboutUs, setAboutUs }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">About Us</h2>
    <EditableField
      value={aboutUs}
      onSave={setAboutUs}
      placeholder="About Us"
      multiline
    />
  </div>
);

export default AboutUs;
