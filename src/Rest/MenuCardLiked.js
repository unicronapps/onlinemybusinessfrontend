import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

// Sample Menu Data
const menu = [
  {
    category: "Hot Selling Items",
    items: [
      {
        id: 1,
        name: "Choley Bhature with chutney",
        price: 184,
        description:
          "Haldiram's Chole Bhature is a beloved North Indian dish featuring crispy fried bhature bread with spiced chickpeas.",
        image: "https://via.placeholder.com/100",
        available: false,
      },
      {
        id: 2,
        name: "Pao Bhaji",
        price: 184,
        description:
          "A popular Indian street food featuring a vegetable curry made with mashed potatoes, tomatoes, peas, and aromatic spices.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
      {
        id: 3,
        name: "Mattar Kulcha",
        price: 150,
        description:
          "Matar Kulcha is a spicy and tangy dish made with soft kulchas and boiled white peas cooked with spices.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
    ],
  },
  {
    category: "Street Food",
    items: [
      {
        id: 4,
        name: "Aloo Tikki",
        price: 80,
        description:
          "Crispy fried patties made of mashed potatoes, served with chutney.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
      {
        id: 5,
        name: "Samosa",
        price: 36,
        description: "Triangular savory pastry stuffed with spiced potatoes.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
    ],
  },
];

const MenuWithSavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Combine all items into one category for "All"
  const allItems = menu.flatMap((category) => category.items);

  // Handle saving an item
  const handleSaveItem = (item) => {
    if (!savedItems.find((saved) => saved.id === item.id)) {
      setSavedItems((prev) => [...prev, item]);
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter items by category
  const filteredItems =
    selectedCategory === "All"
      ? allItems
      : menu.find((cat) => cat.category === selectedCategory)?.items || [];

  return (
    <div className="p-4">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-teal-600">Menu</h1>
      </header>

      {/* Category Slider */}
      <div className="flex overflow-x-auto gap-4 pb-4 mb-6 border-b border-gray-300">
        <button
          onClick={() => handleCategoryClick("All")}
          className={`px-6 py-2 rounded-full ${
            selectedCategory === "All"
              ? "bg-teal-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          } whitespace-nowrap font-medium`}
        >
          All
        </button>
        {menu.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.category)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category.category
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700"
            } whitespace-nowrap font-medium`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Item List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-start"
          >
            {/* Item Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            {/* Item Details */}
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{item.name}</h3>

                <button
                  onClick={() => handleSaveItem(item)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  <AiOutlineHeart size={24} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <p className="text-lg font-bold text-teal-600 mt-4">
                ₹{item.price.toFixed(2)}
              </p>
              <div className="mt-4">
                {item.available ? (
                  <span className="text-green-600 font-medium">Available</span>
                ) : (
                  <span className="text-red-600 font-medium">Unavailable</span>
                )}
              </div>
            </div>
            {/* Save Button */}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <p className="text-gray-700">
          {savedItems.length} item{savedItems.length !== 1 && "s"} saved
        </p>
        <button
          onClick={() => alert(JSON.stringify(savedItems, null, 2))}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
          <AiOutlineShoppingCart size={20} />
          View Saved Items
        </button>
      </footer>
    </div>
  );
};

export default MenuWithSavedItems;
