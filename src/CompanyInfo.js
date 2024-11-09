import React from "react";
import EditableField from "./EditableField";

const CompanyInfo = ({
  companyName,
  setCompanyName,
  yearOfEst,
  setYearOfEst,
  natureOfBusiness,
  setNatureOfBusiness,
  companyDescription,
  setCompanyDescription,
}) => (
  <div className="flex flex-col items-center">
    <h1 className="text-3xl font-bold">
      <EditableField
        value={companyName}
        onSave={setCompanyName}
        placeholder="Company Name"
      />
    </h1>
    <p className="">
      <EditableField
        value={companyDescription}
        onSave={setCompanyDescription}
        placeholder="Add Description"
        multiline
        textAlign="center"
      />
    </p>
    <p>
      {/* <strong>Nature of Business: </strong> */}
      <EditableField
        value={natureOfBusiness}
        onSave={setNatureOfBusiness}
        placeholder="Nature of Business"
      />
    </p>
  </div>
);

export default CompanyInfo;
