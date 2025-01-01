import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa"; // Veg icon
import { GiChickenLeg } from "react-icons/gi"; // Non-Veg icon
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const RestaurantForm = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [menuJson, setMenuJson] = useState("");
  const [menuData, setMenuData] = useState(null);

  const handlePreview = () => {
    try {
      const parsedMenu = JSON.parse(menuJson);
      setMenuData(parsedMenu); // Save the parsed menu data for preview
    } catch (error) {
      alert("Invalid JSON format for menu!");
    }
  };

  const handleSave = async () => {
    if (!restaurantName || !address || !phoneNumber || !menuData) {
      alert("Please fill all fields and preview the menu before saving!");
      return;
    }

    try {
      await addDoc(collection(db, "restaurants"), {
        restaurantName,
        address,
        phoneNumber,
        menu: menuData,
      });
      alert("Restaurant and menu saved successfully!");
    } catch (error) {
      console.error("Error saving restaurant:", error);
      alert("Failed to save restaurant. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {/* Form Section */}
      <h1 className="text-2xl font-bold mb-4">Add Restaurant</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Restaurant Name</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter restaurant name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Menu JSON</label>
          <textarea
            value={menuJson}
            onChange={(e) => setMenuJson(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder='Enter menu as JSON, e.g., [{"category":"Hot Selling","items":[{"name":"Choley Bhature","price":184,"type":"Veg"}]}]'
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePreview}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Preview Menu
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save to Firestore
          </button>
        </div>
      </form>

      {/* Menu Preview Section */}
      {menuData && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Menu Preview</h2>
          {menuData.map((category, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-md rounded-lg p-4 flex gap-4"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    {/* Item Details */}
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-teal-600">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        {item.type === "Veg" ? (
                          <FaLeaf className="text-green-600 mr-2" />
                        ) : (
                          <GiChickenLeg className="text-red-600 mr-2" />
                        )}
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                      <div className="mt-2">
                        {item.available ? (
                          <span className="text-green-600 font-medium">
                            Available
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
