import React, { useState } from "react";
import EditFieldModal from "./EditFieldModal";
import AddFieldModal from "./AddFieldModal";
import editableFunction from "../../utils/editableFunction";
import { FaPlus } from "react-icons/fa";

const AboutUs = ({ isEditable = false, aboutFields, setAboutFields }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editField, setEditField] = useState(null);

  const onClickFxn = (key) => {
    editableFunction(
      isEditable,
      () => openEditModal(key),
      () => console.log("key")
    );
  };

  // Open edit modal for a specific field
  const openEditModal = (key) => {
    setEditField({ key, value: aboutFields[key] });
  };

  // Update a specific field's value
  const updateField = (key, value) => {
    setAboutFields({ ...aboutFields, [key]: value });
    setEditField(null);
  };

  // Delete a field
  const deleteField = (key) => {
    const updatedFields = { ...aboutFields };
    delete updatedFields[key];
    setAboutFields(updatedFields);
    setEditField(null);
  };

  // Open add field modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  console.log(aboutFields);
  // Add a new field
  const addField = (key, value) => {
    if (key && value && !aboutFields.hasOwnProperty(key)) {
      setAboutFields({ ...aboutFields, [key]: value });
    }
    setIsAddModalOpen(false);
  };
  const fieldLength = Object.keys(aboutFields).length;
  if (!fieldLength && isEditable === false) {
    return <></>;
  }
  return (
    <div className="bg-white shadow rounded-lg p-2 mt-2">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>

        {isEditable && (
          <button
            className="flex items-center space-x-2 text-blue-500 text-sm  hover:text-blue-900"
            onClick={openAddModal}
          >
            <FaPlus />
            <span>Add</span>
          </button>
        )}
      </div>
      {fieldLength === 0 && <p>No About Us Field</p>}
      {/* Display each key-value pair */}
      <div className="grid  gap-4">
        {Object.entries(aboutFields).map(([key, value]) => (
          <div
            key={key}
            onClick={() => onClickFxn(key)}
            className="flex justify-between  border-b pb-2"
          >
            <div>
              <span className="font-medium">{key}</span>
            </div>
            <div className="text-right">
              <span className=" text-right bg-re">{value}</span>
            </div>
            {/* <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => openEditModal(key)}
              >
                Edit
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* Conditionally render EditFieldModal */}
      {editField && (
        <EditFieldModal
          field={editField}
          onSave={(value) => updateField(editField.key, value)}
          onDelete={deleteField}
          onClose={() => setEditField(null)}
        />
      )}

      {/* Conditionally render AddFieldModal */}
      {isAddModalOpen && (
        <AddFieldModal
          onSave={addField}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AboutUs;
