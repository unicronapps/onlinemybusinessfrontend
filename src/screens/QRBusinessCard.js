// QRBusinessCard.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import { QRCodeCanvas as QRCode } from "qrcode.react";
import { FaDownload, FaLink } from "react-icons/fa";
import { db } from "../firebase";
import AttachLinkModal from "../components/QRBusinessCard/AttachLinkModal";

const QRBusinessCard = () => {
  const { id } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const docRef = doc(db, "businessCards", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBusinessData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching business details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR_${
      businessData?.businessName || "Business"
    }.png`;
    downloadLink.click();
  };

  const handleAttachQR = () => {
    setIsAttachModalOpen(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{businessData?.businessName}</h1>
      <p className="text-gray-600 mb-6">
        Generate and manage QR code for your business card.
      </p>

      {/* QR Code Display */}
      <div className="flex justify-center mb-4">
        <QRCode
          id="qrCode"
          value={`${window.location.origin}/view/${id}`}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>

      {/* Buttons for Download QR and Attach QR */}
      <div className="flex space-x-4">
        <button
          onClick={handleDownloadQR}
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaDownload className="mr-2" />
          Download QR
        </button>
        <button
          onClick={handleAttachQR}
          className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <FaLink className="mr-2" />
          Attach QR
        </button>
      </div>

      {/* Attach Link Modal */}
      {isAttachModalOpen && (
        <AttachLinkModal
          onClose={() => setIsAttachModalOpen(false)}
          businessId={id}
        />
      )}
    </div>
  );
};

export default QRBusinessCard;
