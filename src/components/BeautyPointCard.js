import React from "react";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import BasicInfo from "./BasicInfo";
import AddressCard from "./AddressCard";
import LocationAndAddress from "./LocationAndAddress";

const BeautyPointCard = () => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
      <BasicInfo />
      <LocationAndAddress />
    </div>
  );
};

export default BeautyPointCard;
