import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import editableFunction from "../../utils/editableFunction";

const ServicesSection = ({ services, setServices, isEditable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);

  const openModalForNewService = () => {
    setEditingServiceIndex(null);
    setIsModalOpen(true);
  };

  const openModalForEditService = (index) => {
    setEditingServiceIndex(index);
    setIsModalOpen(true);
  };
  function handleServiceEdit(index) {
    editableFunction(
      isEditable,
      () => openModalForEditService(index),
      () => null
    );
  }

  const handleSaveService = (newService) => {
    const updatedServices = [...services];
    if (editingServiceIndex !== null) {
      // Edit existing service
      updatedServices[editingServiceIndex] = newService;
    } else {
      // Add new service
      updatedServices.push(newService);
    }
    setServices(updatedServices);
  };
  console.log(services);
  if (services.length === 0 && isEditable === false) {
    return <></>;
  }
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Our Services and Goods</h2>
        {isEditable && (
          <button
            onClick={openModalForNewService}
            className="text-blue-500 text-sm"
          >
            + Add Service
          </button>
        )}
      </div>
      {services.map((service, index) => (
        <div
          key={index}
          className="border-2 border-purple-300 p-3 mb-3 rounded-lg"
        >
          <div
            onClick={() => handleServiceEdit(index)}
            className="w-full h-40 mb-2 bg-gray-200 flex items-center justify-center cursor-pointer rounded-lg"
          >
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <h3 className="font-bold text-lg text-purple-800">{service.title}</h3>
          <p className="text-sm mb-1">{service.description}</p>
          <p className="text-sm font-semibold text-gray-700">
            Starting From: {service.price} /-{" "}
            {service.bookingRequired === "Yes" && (
              <span className="font-semibold">Booking Required</span>
            )}
          </p>
        </div>
      ))}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        service={
          editingServiceIndex !== null ? services[editingServiceIndex] : null
        }
      />
    </div>
  );
};

export default ServicesSection;
