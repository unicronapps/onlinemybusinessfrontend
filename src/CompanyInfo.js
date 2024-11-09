import React from "react";
import EditableField from "./EditableField";

const CompanyInfo = ({
  companyName,
  setCompanyName,
  yearOfEst,
  setYearOfEst,
  natureOfBusiness,
  setNatureOfBusiness,
}) => (
  <div>
    <h1 className="text-xl font-bold">
      <EditableField
        value={companyName}
        onSave={setCompanyName}
        placeholder="Company Name"
      />
    </h1>
    <p>
      <strong>Year of Est.: </strong>
      <EditableField
        value={yearOfEst}
        onSave={setYearOfEst}
        placeholder="Year of Est."
      />
    </p>
    <p>
      <strong>Nature of Business: </strong>
      <EditableField
        value={natureOfBusiness}
        onSave={setNatureOfBusiness}
        placeholder="Nature of Business"
      />
    </p>
  </div>
);

export default CompanyInfo;
