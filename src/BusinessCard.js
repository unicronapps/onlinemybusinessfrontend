import React, { useState } from "react";
import CompanyInfo from "./CompanyInfo";
import SocialLinks from "./SocialLinks";
import AboutUs from "./AboutUs";
import QuickButtons from "./QuickButtons";
import TeamSection from "./TeamSection";
import Branches from "./Branches";
import ServicesSection from "./ServicesSection";
import GallerySection from "./GallerySection";
import ImagePopup from "./ImagePopup";
import EditableField from "./EditableField";
import HeaderImage from "./HeaderImage";
import FAQSection from "./FAQSection";

const BusinessCard = () => {
  const [companyName, setCompanyName] = useState("Beauty Point");
  const [yearOfEst, setYearOfEst] = useState("2023");
  const [natureOfBusiness, setNatureOfBusiness] = useState("Beauty Makeover");
  const [socialLinks, setSocialLinks] = useState([
    { platform: "Instagram", link: "@beautypoint" },
    { platform: "WhatsApp", link: "+918448804428" },
    { platform: "LinkedIn", link: "in/beautypoint" },
  ]);
  const [aboutUs, setAboutUs] = useState(
    `Create your Virtual Business Card within minutes...`
  );
  const [branches, setBranches] = useState([
    {
      name: "Main Office",
      type: "Head Branch",
      address:
        "H No 2134, First Floor, Near Kalyan Enclave, Palwal, Haryana PIN 121102",
      phone: "8448804428",
      googleMapsLink: "https://maps.google.com",
    },
    {
      name: "Other Office",
      type: "Head Branch",
      address:
        "H No 2134, First Floor, Near Kalyan Enclave, Palwal, Haryana PIN 121102",
      phone: "8448804428",
      googleMapsLink: "https://maps.google.com",
    },
    {
      name: "Nearby Branch",
      type: "Head Branch",
      address:
        "H No 2134, First Floor, Near Kalyan Enclave, Palwal, Haryana PIN 121102",
      phone: "8448804428",
      googleMapsLink: "https://maps.google.com",
    },
  ]);
  const [headerImage, setHeaderImage] = useState(
    "https://example.com/header-logo.png" // Replace with actual URL or set to null for testing
  );
  const [mainImage, setMainImage] = useState(
    "https://example.com/main-logo.png" // Replace with actual URL or set to null for testing
  );
  const [selectedImage, setSelectedImage] = useState(null); // Track which image is selected (header or main)
  const [services, setServices] = useState([
    {
      title: "Party Makeover",
      description: "Required for each party for someone special",
      price: "1500",
      image: "https://example.com/party-makeover.jpg", // Replace with actual image URL or leave as null for testing
    },
    {
      title: "Bridal Makeup",
      description: "Required for each party for someone special",
      price: "3000",
      image: "https://example.com/bridal-makeup.jpg", // Replace with actual image URL or leave as null for testing
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", link: "" }]);
  };

  const handleSocialChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const handleBranchChange = (index, field, value) => {
    const updatedBranches = [...branches];
    updatedBranches[index][field] = value;
    setBranches(updatedBranches);
  };

  const handleAddBranch = () => {
    setBranches([
      ...branches,
      {
        name: "",
        type: "",
        address: "",
        phone: "",
        googleMapsLink: "https://maps.google.com",
      },
    ]);
  };

  const handleDeleteBranch = (index) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    setBranches(updatedBranches);
  };
  const openPopup = (imageType) => {
    setSelectedImage(imageType);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const handleDeleteImage = () => {
    if (selectedImage === "header") setHeaderImage(null);
    if (selectedImage === "main") setMainImage(null);
    closePopup();
  };

  const handleChangeImage = () => {
    // Simulate image upload with a prompt (replace with actual upload in production)
    const newImage = prompt("Enter new image URL");
    if (newImage) {
      if (selectedImage === "header") setHeaderImage(newImage);
      if (selectedImage === "main") setMainImage(newImage);
    }
    closePopup();
  };
  const openImagePopup = (index) => {
    setSelectedServiceIndex(index);
    setIsPopupOpen(true);
  };

  const closeImagePopup = () => {
    setIsPopupOpen(false);
    setSelectedServiceIndex(null);
  };

  const handleDeleteServiceImage = () => {
    const updatedServices = [...services];
    updatedServices[selectedServiceIndex].image = null;
    setServices(updatedServices);
    closeImagePopup();
  };

  const handleChangeServiceImage = () => {
    const newImage = prompt("Enter new image URL");
    if (newImage) {
      const updatedServices = [...services];
      updatedServices[selectedServiceIndex].image = newImage;
      setServices(updatedServices);
    }
    closeImagePopup();
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        title: "",
        description: "",
        price: "",
        image: null,
      },
    ]);
  };
  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
      <HeaderImage
        headerImage={headerImage}
        mainImage={mainImage}
        setMainImage={setMainImage}
        setHeaderImage={setHeaderImage}
        openPopup={openPopup}
      />

      {/* <div className="flex flex-col items-center mb-6">
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
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-bold">
          <EditableField
            value={companyName}
            onSave={setCompanyName}
            placeholder="Company Name"
          />
        </h1>
      </div>
      <div className="mb-4">
        <p>
          <strong>Year of Est.: </strong>
          <EditableField
            value={yearOfEst}
            onSave={setYearOfEst}
            placeholder="Year of Est."
          />
        </p>
      </div>
      <div className="mb-4">
        <p>
          <strong>Nature of Business: </strong>
          <EditableField
            value={natureOfBusiness}
            onSave={setNatureOfBusiness}
            placeholder="Nature of Business"
          />
        </p>
      </div> */}
      <CompanyInfo
        companyName={companyName}
        setCompanyName={setCompanyName}
        yearOfEst={yearOfEst}
        setYearOfEst={setYearOfEst}
        natureOfBusiness={natureOfBusiness}
        setNatureOfBusiness={setNatureOfBusiness}
      />

      {/* <div className="mb-4">
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
      </div> */}

      <QuickButtons />
      <AboutUs aboutUs={aboutUs} setAboutUs={setAboutUs} />
      <SocialLinks
        socialLinks={socialLinks}
        handleSocialChange={handleSocialChange}
        handleAddSocialLink={handleAddSocialLink}
      />

      <TeamSection />
      <Branches
        branches={branches}
        handleBranchChange={handleBranchChange}
        handleAddBranch={handleAddBranch}
        handleDeleteBranch={handleDeleteBranch}
      />

      {/* Services and Goods Section */}
      <ServicesSection />
      <GallerySection />
      <FAQSection />
    </div>
  );
};

export default BusinessCard;
