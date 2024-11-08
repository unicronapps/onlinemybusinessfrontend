import React from "react";
import AddressCard from "./AddressCard";

const LocationAndAddress = () => {
  const addressDetails = [
    {
      title: "1. Main Office",
      branch: "Head Branch",
      address:
        "H No 2134, First Floor, Near Kalyan Enclave\nPalwal, Haryana PIN 121102",
      phone: "8448804428",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799140978!2d-74.25986757286052!3d40.69767006385792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f4f3fdfb2c81%3A0xfdda0f5d2c9bdef0!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1637176825025!5m2!1sen!2sin", // Replace with your location URL
      directionsUrl: "https://maps.app.goo.gl/1XtseSRt1mvNLu9YA",
    },
    {
      title: "2. Other Office",
      branch: "Head Branch",
      address:
        "H No 2134, First Floor, Near Kalyan Enclave\nPalwal, Haryana PIN 121102",
      phone: "8448804428",
      mapUrl:
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyC8DX8T40jWeDHRlN-a2RmSDz54RMDK7l4&q=5848+4HC Palwalrural, Haryana",
      directionsUrl:
        "https://www.google.com/maps/place/Supplements+Villa,+Shop+No+611,Near+OBC+Bank,+Railway+Rd,+Palwal,+Haryana+121102/@28.139724,77.324879,15z/data=!4m12!1m5!3m4!2zMjjCsDA4JzIzLjAiTiA3N8KwMTknMjkuNiJF!8m2!3d28.139724!4d77.324879!3m5!1s0x390cd33f43fc54df:0x14e43511933a19fd!8m2!3d28.1427128!4d77.3286152!16s%2Fg%2F11f9v__b_s",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Location and Address</h1>
      {addressDetails.map((details, index) => (
        <AddressCard
          key={index}
          title={details.title}
          branch={details.branch}
          address={details.address}
          phone={details.phone}
          mapUrl={details.mapUrl}
          directionsUrl={details.directionsUrl}
        />
      ))}
    </div>
  );
};

export default LocationAndAddress;
