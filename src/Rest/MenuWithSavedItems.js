import React from "react";
import { useLocation } from "react-router-dom";

const MenuWithSavedItems = () => {
  const location = useLocation();
  const { menuData } = location.state || { menuData: [] };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu Preview</h1>
      {menuData.map((category, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <p className="text-lg font-bold text-teal-600">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuWithSavedItems;
