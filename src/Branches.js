import React from "react";
import EditableField from "./EditableField";

const Branches = ({
  branches,
  handleBranchChange,
  handleAddBranch,
  handleDeleteBranch,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Location and Address</h2>
    {branches.map((branch, index) => (
      <div key={index} className="mb-4 border p-2 rounded">
        <h3 className="font-semibold">
          {index + 1}.{" "}
          <EditableField
            value={branch.name}
            onSave={(value) => handleBranchChange(index, "name", value)}
            placeholder="Branch Name"
          />
        </h3>
        <EditableField
          value={branch.type}
          onSave={(value) => handleBranchChange(index, "type", value)}
          placeholder="Branch Type"
        />
        <EditableField
          value={branch.address}
          onSave={(value) => handleBranchChange(index, "address", value)}
          placeholder="Branch Address"
          multiline
        />
        <EditableField
          value={branch.phone}
          onSave={(value) => handleBranchChange(index, "phone", value)}
          placeholder="Phone Number"
        />
        <a
          href={branch.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 flex items-center mt-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Google_Maps_Logo.svg"
            alt="Google Maps"
            className="w-5 h-5 mr-1"
          />
          Google Maps
        </a>
        <button
          className="text-red-500 text-sm mt-2"
          onClick={() => handleDeleteBranch(index)}
        >
          Delete
        </button>
      </div>
    ))}
    <button className="text-blue-500 text-sm mt-2" onClick={handleAddBranch}>
      + Add Branch
    </button>
  </div>
);

export default Branches;
