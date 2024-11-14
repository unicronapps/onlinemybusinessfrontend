import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const CreateBusinessCard = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [primeBusinessLocation, setPrimeBusinessLocation] = useState("");

  const categories = ["Beauty", "Health", "Education", "Tech"];
  const subcategories = {
    Beauty: ["Salon", "Spa", "Makeup"],
    Health: ["Clinic", "Pharmacy", "Gym"],
    Education: ["School", "Tutoring", "College"],
    Tech: ["IT Services", "Software", "Hardware"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      setErrorMessage("Invalid phone number format");
      return;
    }
    setLoading(true);

    const businessData = {
      businessName,
      phoneNumber,
      email,
      category,
      subcategory,
      businessLocation,
      primeBusinessLocation:
        businessLocation === "City" ? primeBusinessLocation : "",
      headerImage:
        "https://i0.wp.com/bcomnotes.in/wp-content/uploads/2020/05/business.png?fit=985%2C699&ssl=1",
      mainImage:
        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=170667a&w=0&k=20&c=LPUo_WZjbXXNnF6ok4uQr8I_Zj6WUVnH_FpREg21qaY=",
      companyName: businessName,
      natureofBusiness: subcategory,
      companyDescription: "Welcome to our business!",
      whatsappQuick: { value: "", link: "" },
      instagramQuick: { value: "", link: "" },
      googleMapsQuick: { value: "", link: "" },
      socialLinks: [
        { platform: "Phone", value: "" },
        { platform: "Instagram", value: "" },
        { platform: "WhatsApp", value: "" },
        { platform: "LinkedIn", value: "" },
        { platform: "Facebook", value: "" },
        { platform: "Twitter", value: "" },
        { platform: "YouTube", value: "" },
        { platform: "Website", value: "" },
        { platform: "Email", value: "" },
      ],
      team: [
        { type: "Owners", people: [] },
        { type: "Employees", people: [] },
      ],
      aboutFields: {},
      branches: [
        {
          name: "Main Office",
          type: "Head Branch",
          streetAddress: "Enter Address Here",
          city: "City",
          state: "State",
          pinCode: "PIN CODE",
          photo1:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn04vv5T5Uca1LvzsCyag1nnjdoCkpCqeGFA&s",
          photo2:
            "https://media.istockphoto.com/id/1497169936/vector/storefront-cafe-flat-style.jpg?s=612x612&w=0&k=20&c=_-3RS-fIGKjPVbKOt1vg1fgtwd8GOAiFbZrS1FGfN_Q=",
          phone: "9999999999",
          googleMapsLink: "",
        },
      ],
      services: [
        {
          title: "Party Makeover",
          description: "Required for each party for someone special",
          image:
            "https://th.bing.com/th/id/OIP.fLmh0MCYQw8NRusW5kHYeQHaE8?rs=1&pid=ImgDetMain", // Replace with actual image URL
          price: "1500",
        },
      ],
      paymentData: {
        qrLinks: {
          PhonePe: "",
          Paytm: "",
          Other: "",
        },
        bankDetails: {
          accountHolder: "",
          accountNumber: "",
          ifsc: "",
          bankName: "",
        },
      },
      galleryImages: [],
      userId: user?.uid || "anonymous",
      dateCreated: serverTimestamp(),
      dateModified: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(
        collection(db, "businessCardsDraft"),
        businessData
      );
      navigate(`/view/${docRef.id}`);
    } catch (error) {
      console.error("Error adding business card:", error);
      setErrorMessage("Failed to create business card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Business Card</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Business Name</span>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Phone Number</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        {category && (
          <label className="block mb-2">
            <span className="text-gray-700">Subcategory</span>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select a subcategory</option>
              {subcategories[category].map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="block mb-2">
          <span className="text-gray-700">Business Location</span>
          <select
            value={businessLocation}
            onChange={(e) => setBusinessLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a location type</option>
            <option value="All India">All India</option>
            <option value="City">City</option>
          </select>
        </label>
        {businessLocation === "City" && (
          <label className="block mb-2">
            <span className="text-gray-700">
              Prime Business Location (City)
            </span>
            <input
              type="text"
              value={primeBusinessLocation}
              onChange={(e) => setPrimeBusinessLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Business Card"}
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessCard;
