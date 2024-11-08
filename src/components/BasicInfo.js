import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const BasicInfo = () => {
  return (
    <>
      <div className="bg-black p-2 rounded-t-lg">
        <img
          src="path_to_logo" // replace with the path to the black header logo
          alt="Beauty Point Logo"
          className="mx-auto h-12"
        />
      </div>

      {/* Profile Image */}
      <div className="mt-4">
        <img
          src="path_to_profile_image" // replace with the path to the round profile image
          alt="Beauty Point Makeover"
          className="w-24 h-24 mx-auto rounded-full border-4 border-pink-500"
        />
      </div>

      {/* Title and Slogan */}
      <h2 className="text-xl font-bold mt-4">
        Beauty Point Makeover and Cosmetics
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        The future belongs to those who believe in the beauty of their dreams
      </p>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mt-4 text-gray-700">
        <a
          href="https://instagram.com/beautypoint"
          className="text-2xl hover:text-pink-500"
        >
          <FaInstagram />
        </a>
        <a
          href="https://wa.me/918448804428"
          className="text-2xl hover:text-green-500"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://linkedin.com/in/beautypoint"
          className="text-2xl hover:text-blue-700"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Contact Information */}
      <div className="mt-4">
        <p className="font-medium">@beautypoint</p>
        <p className="font-medium">+918448804428</p>
        <p className="font-medium">in/beautypoint</p>
      </div>

      {/* About Section */}
      <div className="mt-6 text-left">
        <h3 className="font-bold text-lg">About Us</h3>
        <p className="text-sm">
          <strong>Company Name:</strong> Beauty Point <br />
          <strong>Year of Est.:</strong> 2023
        </p>
      </div>
    </>
  );
};

export default BasicInfo;
