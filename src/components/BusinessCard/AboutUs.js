import React, { useState } from "react";
import EditFieldModal from "./EditFieldModal";
import AddFieldModal from "./AddFieldModal";
import editableFunction from "../../utils/editableFunction";

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

  // Add a new field
  const addField = (key, value) => {
    if (key && value && !aboutFields.hasOwnProperty(key)) {
      setAboutFields({ ...aboutFields, [key]: value });
    }
    setIsAddModalOpen(false);
  };
  if (!aboutFields.length) {
    return <div></div>;
  }
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">About Us</h2>

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

      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={openAddModal}
      >
        Add Field
      </button>

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
