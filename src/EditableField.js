import React, { useState } from "react";

const EditableField = ({
  value,
  onSave,
  type = "text",
  placeholder,
  multiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onSave(currentValue);
  };

  return (
    <div>
      {isEditing ? (
        multiline ? (
          <textarea
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
            autoFocus
            className="border rounded p-1 w-full"
            placeholder={placeholder}
            rows={4}
          />
        ) : (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
            autoFocus
            className="border rounded p-1 w-full"
            placeholder={placeholder}
          />
        )
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="cursor-pointer text-gray-700 hover:text-blue-500"
        >
          {currentValue || placeholder}
        </span>
      )}
    </div>
  );
};

export default EditableField;
