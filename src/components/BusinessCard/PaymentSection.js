import React, { useState } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import QRPaymentModal from "./QRPaymentModal";
import AccountEditModal from "./AccountEditModal";
import phonePeLogo from "../../assets/logos/phonepe-logo.png"; // Import partner logos
// import paytmLogo from "../../assets/logos/paytm-logo.png";
// import otherLogo from "../../assets/logos/upi-payment-logo.png";
import paytmLogo from "../../assets/logos/paytm-logo-.png";
import otherLogo from "../../assets/logos/upi-jpg.png";
import editableFunction from "../../utils/editableFunction";

const PaymentSection = ({ isEditable = true, paymentData, setPaymentData }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [currentQRLink, setCurrentQRLink] = useState("");
  const [expandedQR, setExpandedQR] = useState(null);

  const partnerLogos = {
    PhonePe: phonePeLogo,
    Paytm: paytmLogo,
    Other: otherLogo,
  };

  const openQRModal = (type) => {
    setSelectedPayment(type);
    setCurrentQRLink(paymentData.qrLinks[type] || "");
    setIsQRModalOpen(true);
  };

  const toggleQRSize = (type) => {
    setExpandedQR(expandedQR === type ? null : type);
  };

  const saveQRLink = (link) => {
    setPaymentData((prevData) => ({
      ...prevData,
      qrLinks: {
        ...prevData.qrLinks,
        [selectedPayment]: link,
      },
    }));
  };

  const handleSaveAccountDetails = (updatedAccountData) => {
    setPaymentData((prevData) => ({
      ...prevData,
      bankDetails: updatedAccountData,
    }));
    setIsAccountModalOpen(false);
  };
  function handleQrClick(type) {
    editableFunction(
      isEditable,
      () => openQRModal(type),
      () => paymentData.qrLinks[type] && toggleQRSize(type)
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Payment Options</h2>
      </div>

      {/* QR Payment Options */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">QR Code Payments</h3>
        {["PhonePe", "Paytm", "Other"].map((type) => (
          <div
            key={type}
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => handleQrClick(type)}
          >
            <span className="flex-1">{type}</span>
            {paymentData.qrLinks[type] ? (
              <div
                style={{
                  width: expandedQR === type ? 250 : 80,
                  height: expandedQR === type ? 250 : 80,
                  position: "relative",
                }}
              >
                <QRCode
                  value={paymentData.qrLinks[type]}
                  size={expandedQR === type ? 250 : 80}
                  renderAs="svg"
                  includeMargin={true}
                />
                <img
                  src={partnerLogos[type]}
                  alt={`${type} logo`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: expandedQR === type ? 40 : 40,
                    height: expandedQR === type ? 40 : 40,
                    borderRadius: "50%",
                  }}
                />
              </div>
            ) : (
              isEditable && (
                <button
                  onClick={() => openQRModal(type)}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add {type} QR
                </button>
              )
            )}
          </div>
        ))}
      </div>

      {/* Bank Account Details */}
      <div>
        <h3 className="text-md font-semibold mb-2">Bank Account Details</h3>
        <div className="space-y-2 cursor-pointer text-gray-700 hover:text-blue-500">
          <div onClick={() => setIsAccountModalOpen(true)}>
            <span className="font-medium">Account Holder:</span>{" "}
            {paymentData.bankDetails.accountHolder || "Not provided"}
          </div>
          <div onClick={() => setIsAccountModalOpen(true)}>
            <span className="font-medium">Account Number:</span>{" "}
            {paymentData.bankDetails.accountNumber || "Not provided"}
          </div>
          <div onClick={() => setIsAccountModalOpen(true)}>
            <span className="font-medium">IFSC Code:</span>{" "}
            {paymentData.bankDetails.ifsc || "Not provided"}
          </div>
          <div onClick={() => setIsAccountModalOpen(true)}>
            <span className="font-medium">Bank Name:</span>{" "}
            {paymentData.bankDetails.bankName || "Not provided"}
          </div>
        </div>
      </div>

      {/* Modals */}
      <QRPaymentModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onSave={saveQRLink}
        selectedPayment={selectedPayment}
        initialQRLink={currentQRLink}
      />
      <AccountEditModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        accountData={paymentData.bankDetails}
        onSave={handleSaveAccountDetails}
      />
    </div>
  );
};

export default PaymentSection;
