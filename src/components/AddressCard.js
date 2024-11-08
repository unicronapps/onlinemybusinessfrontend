import React from "react";

const AddressCard = ({
  title,
  branch,
  address,
  phone,
  mapUrl,
  directionsUrl,
}) => {
  const handleDirections = () => {
    window.location.href = directionsUrl;
  };
  console.log(directionsUrl);
  return (
    <div className="border p-4 mb-4 rounded-md shadow-lg">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-sm font-semibold">{branch}</p>
      <p className="text-sm whitespace-pre-line">{address}</p>
      <p className="font-bold">Ph: {phone}</p>
      <button
        onClick={handleDirections}
        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Get Directions
      </button>
    </div>
  );
};

export default AddressCard;
