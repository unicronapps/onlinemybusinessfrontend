import React, { useState } from "react";

// Sample Menu Data
const menu = [
  {
    category: "Hot Selling Items",
    items: [
      {
        name: "Choley Bhature",
        price: 184,
        description:
          "Haldiram's Chole Bhature is a beloved North Indian dish featuring crispy fried bhature bread with spiced chickpeas.",
        image: "https://via.placeholder.com/100",
        available: false,
      },
      {
        name: "Pao Bhaji",
        price: 184,
        description:
          "A popular Indian street food featuring a vegetable curry made with mashed potatoes, tomatoes, peas, and aromatic spices.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
      {
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
        name: "Aloo Tikki",
        price: 80,
        description:
          "Crispy fried patties made of mashed potatoes, served with chutney.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
      {
        name: "Samosa",
        price: 36,
        description: "Triangular savory pastry stuffed with spiced potatoes.",
        image: "https://via.placeholder.com/100",
        available: true,
      },
    ],
  },
];

const MenuWithSlider = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Combine all items under a single "All" category
  const allItems = menu.flatMap((category) => category.items);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Get the filtered items based on category and search query
  const filteredItems =
    selectedCategory === "All"
      ? allItems
      : menu.find((cat) => cat.category === selectedCategory)?.items || [];

  const displayedItems = filteredItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Items..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full shadow-md w-full max-w-md border focus:ring-2 focus:ring-teal-500"
        />
      </div>

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

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 transition-transform hover:scale-105"
          >
            {/* Item Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 rounded-lg object-cover"
            />
            {/* Item Details */}
            <div className="flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuWithSlider;
