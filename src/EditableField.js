import React, { useState } from "react";
import editableFunction from "./utils/editableFunction";
import { FaPen } from "react-icons/fa"; // Import the pencil icon from react-icons

const EditableField = ({
  value,
  onSave,
  type = "text",
  placeholder,
  multiline = false,
  isEditable = true,
  textAlign,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onSave(currentValue);
  };

  let styleString = "";
  if (textAlign) {
    switch (textAlign) {
      case "left":
        styleString = styleString + "text-left";
        break;
      case "center":
        styleString = styleString + "text-center";
        break;
      case "rignt":
        styleString = styleString + "text-right";
        break;

      default:
        break;
    }
  }
  return (
    <div className="flex items-center">
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
          onClick={() => editableFunction(isEditable, () => setIsEditing(true))}
          className={` text-gray-700 hover:text-blue-500 ${styleString}`}
        >
          {isEditable ? currentValue || placeholder : currentValue}
        </span>
      )}
      {isEditable && !isEditing && (
        <FaPen
          onClick={() => setIsEditing(true)}
          className=" h-2 text-gray-500 hover:text-blue-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default EditableField;
