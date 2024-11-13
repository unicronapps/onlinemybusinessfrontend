import React, { useEffect, useState } from "react";
import CompanyInfo from "../components/BusinessCard/CompanyInfo";
import SocialLinks from "../components/BusinessCard/SocialLinks";
import AboutUs from "../components/BusinessCard/AboutUs";
import QuickButtons from "../components/BusinessCard/QuickButtons";
import TeamSection from "../components/BusinessCard/TeamSection";
import Branches from "../components/BusinessCard/Branches";
import ServicesSection from "../components/BusinessCard/ServicesSection";
import GallerySection from "../components/BusinessCard/GallerySection";
import HeaderImage from "../components/BusinessCard/HeaderImage";
import FAQSection from "../components/BusinessCard/FAQSection";
import PaymentLink from "../components/BusinessCard/PaymentSection";
import PaymentSection from "../components/BusinessCard/PaymentSection";

const initialImages = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
  },
  {
    src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    thumbnail:
      "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
  },
  {
    src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    thumbnail:
      "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail:
      "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
  },
];

const BusinessCard = ({
  isEditable = false,
  businessData,
  onSave,
  isDraft,
}) => {
  console.log({ businessData });
  const [companyName, setCompanyName] = useState(
    businessData.companyName || ""
  );
  const [companyDescription, setCompanyDescription] = useState("");
  const [natureOfBusiness, setNatureOfBusiness] = useState("Beauty Makeover");
  const [whatsappQuick, setWhatsappQuick] = useState({ value: "", link: "" });
  const [instagramQuick, setInstagramQuick] = useState({
    value: "abc",
    link: "",
  });
  const [googleMapsQuick, setGoogleMapsQuick] = useState({
    value: "",
    link: "",
  });
  const [socialLinks, setSocialLinks] = useState([
    { platform: "Instagram", value: "@beautypoint" },
    { platform: "WhatsApp", value: "+918448804428" },
    { platform: "LinkedIn", value: "in/beautypoint" },
    { platform: "Facebook", value: "facebook.com/beautypoint" },
    { platform: "Twitter", value: "twitter.com/beautypoint" },
    { platform: "YouTube", value: "youtube.com/c/beautypoint" },
    { platform: "Pinterest", value: "pinterest.com/beautypoint" },
    { platform: "Snapchat", value: "snapchat.com/add/beautypoint" },
    { platform: "TikTok", value: "tiktok.com/@beautypoint" },
    { platform: "Website", value: "https://beautypoint.com" },
    { platform: "Email", value: "contact@beautypoint.com" },
    { platform: "Phone", value: "+918448804429" },
  ]);
  const [aboutUs, setAboutUs] = useState(
    `Create your Virtual Business Card within minutes...`
  );
  const [aboutFields, setAboutFields] = useState({});
  const [branches, setBranches] = useState([
    {
      name: "Main Office",
      type: "Head Branch",
      streetAddress: "H No 2134, First Floor, Near Kalyan Enclave",
      city: "Palwal",
      state: "Haryana",
      pinCode: "121102",
      photo1:
        "https://media-cdn.tripadvisor.com/media/photo-s/0c/41/55/4f/burger-hut-store-front.jpg",
      photo2:
        "https://content.jdmagicbox.com/comp/palwal/j6/9999p1275.1275.221017190926.l2j6/catalogue/big-boss-salon-palwal-city-palwal-salons-j1dhhny8u4-250.jpg",
      phone: "8448804428",
      googleMapsLink: "https://maps.google.com",
    },
    {
      name: "Other Office",
      type: "Head Branch",
      streetAddress: "H No 2134, First Floor, Near Kalyan Enclave",
      city: "Palwal",
      state: "Haryana",
      pinCode: "121102",
      phone: "8448804428",
      googleMapsLink: "https://maps.google.com",
    },
    {
      name: "Nearby Branch",
      type: "Head Branch",
      streetAddress: "H No 2134, First Floor, Near Kalyan Enclave",
      city: "Palwal",
      state: "Haryana",
      pinCode: "121102",
      phone: "8448804428",
      googleMapsLink: "https://maps.google.com",
    },
  ]);
  const [headerImage, setHeaderImage] = useState(
    "https://www.kalnirnay.com/wp-content/uploads/2017/01/waytomakeover.jpg" // Replace with actual URL or set to null for testing
  );
  const [mainImage, setMainImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/660/301/original/vector-beauty-salon-skin-care-logo.jpg" // Replace with actual URL or set to null for testing
  );
  const [team, setTeam] = useState(
    businessData.team || [{ type: "Owners", people: [] }]
  );
  const [services, setServices] = useState([
    {
      title: "Party Makeover",
      description: "Required for each party for someone special",
      image:
        "https://th.bing.com/th/id/OIP.fLmh0MCYQw8NRusW5kHYeQHaE8?rs=1&pid=ImgDetMain", // Replace with actual image URL
      price: "1500",
    },
    {
      title: "Bridal Makeup",
      description: "Required for weddings and special events",
      image:
        "https://dapperanddivinestudio.com/wp-content/uploads/2020/10/shutterstock_1701825745.jpg",
      price: "3000",
    },
  ]);
  const [galleryImages, setGalleryImages] = useState(initialImages);
  const [paymentData, setPaymentData] = useState({
    qrLinks: {
      PhonePe: "https://example.com/phonepe-qr", // Placeholder URL
      Paytm: "https://example.com/paytm-qr", // Placeholder URL
      Other: "https://example.com/other-qr", // Placeholder URL
    },
    bankDetails: {
      accountHolder: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
    },
  });
  useEffect(() => {
    if (businessData) {
      console.log(businessData.companyName);
      setCompanyName(businessData.companyName || "");
      setCompanyDescription(businessData.companyDescription || "");
      setNatureOfBusiness(businessData.industryType || "");
      setWhatsappQuick(businessData.whatsappQuick || { value: "", link: "" });
      setInstagramQuick(businessData.instagramQuick || { value: "", link: "" });
      setGoogleMapsQuick(
        businessData.googleMapsQuick || { value: "", link: "" }
      );
      setSocialLinks(businessData.socialLinks || []);
      setAboutUs(businessData.aboutUs || "");
      setAboutFields(businessData.aboutFields || {});
      setBranches(businessData.branches || []);
      setHeaderImage(businessData.headerImage || "");
      setMainImage(businessData.mainImage || "");
      setTeam(businessData.team || []);
      setServices(businessData.services || []);
      setGalleryImages(businessData.galleryImages || initialImages);
    }
  }, [businessData]);
  const handleSave = () => {
    const updatedData = {
      companyName,
      companyDescription,
      industryType: natureOfBusiness,
      whatsappQuick,
      instagramQuick,
      googleMapsQuick,
      socialLinks,
      aboutUs,
      aboutFields,
      branches,
      headerImage,
      mainImage,
      team,
      services,
      galleryImages,
    };
    onSave(updatedData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <HeaderImage
          headerImage={headerImage}
          mainImage={mainImage}
          setMainImage={setMainImage}
          setHeaderImage={setHeaderImage}
          isEditable={isEditable}
        />

        <CompanyInfo
          companyName={companyName}
          setCompanyName={setCompanyName}
          natureOfBusiness={natureOfBusiness}
          setNatureOfBusiness={setNatureOfBusiness}
          companyDescription={companyDescription}
          setCompanyDescription={setCompanyDescription}
          isEditable={isEditable}
        />

        <QuickButtons
          isEditable={isEditable}
          whatsappQuick={whatsappQuick}
          setWhatsappQuick={setWhatsappQuick}
          instagramQuick={instagramQuick}
          setInstagramQuick={setInstagramQuick}
          googleMapsQuick={googleMapsQuick}
          setGoogleMapsQuick={setGoogleMapsQuick}
        />
        <AboutUs
          aboutUs={aboutUs}
          setAboutUs={setAboutUs}
          isEditable={isEditable}
          aboutFields={aboutFields}
          setAboutFields={setAboutFields}
        />
        <SocialLinks
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          isEditable={isEditable}
        />

        <TeamSection isEditable={isEditable} team={team} setTeam={setTeam} />
        <Branches
          branches={branches}
          setBranches={setBranches}
          isEditable={isEditable}
        />

        {/* Services and Goods Section */}
        <ServicesSection
          isEditable={isEditable}
          services={services}
          setServices={setServices}
        />
        <PaymentSection
          paymentData={paymentData}
          setPaymentData={setPaymentData}
        />
        <GallerySection
          isEditable={isEditable}
          images={galleryImages}
          setImages={setGalleryImages}
        />
        <FAQSection isEditable={isEditable} />
        {isEditable && (
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
