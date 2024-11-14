import React from "react";
import EditableField from "./EditableField";

const CompanyInfo = ({
  companyName,
  setCompanyName,
  natureOfBusiness,
  setNatureOfBusiness,
  companyDescription,
  setCompanyDescription,
  isEditable = false,
}) => (
  <div className="flex flex-col items-center">
    <h1 className="text-3xl font-bold">
      <EditableField
        value={companyName}
        onSave={setCompanyName}
        placeholder="Company Name"
        isEditable={isEditable}
      />
    </h1>
    <p className="">
      <EditableField
        value={companyDescription}
        onSave={setCompanyDescription}
        placeholder="Add Description"
        multiline
        textAlign="center"
        isEditable={isEditable}
      />
    </p>
    <p>
      <strong>
        <EditableField
          value={natureOfBusiness}
          onSave={setNatureOfBusiness}
          placeholder="Nature of Business"
          isEditable={isEditable}
        />
      </strong>
    </p>
  </div>
);

export default CompanyInfo;
