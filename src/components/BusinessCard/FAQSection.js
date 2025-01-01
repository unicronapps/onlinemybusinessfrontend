import React, { useState } from "react";
import FAQModal from "./FAQModal"; // Import the modal component
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./FAQSection.css"; // Add some CSS for animation

const FAQSection = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What are Store Open timings?",
      answer: "The store is open from 10:00 AM to Midnight.",
      isOpen: false,
    },
    {
      question: "Is an appointment required for services?",
      answer: "Yes, appointments are recommended to ensure availability.",
      isOpen: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  const openModal = (faq = null) => {
    setCurrentFAQ(faq);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentFAQ(null);
    setIsModalOpen(false);
  };

  const saveFAQ = (newFAQ) => {
    if (currentFAQ) {
      setFaqs(faqs.map((faq) => (faq === currentFAQ ? newFAQ : faq)));
    } else {
      setFaqs([...faqs, newFAQ]);
    }
    closeModal();
  };

  const deleteFAQ = (faqToDelete) => {
    setFaqs(faqs.filter((faq) => faq !== faqToDelete));
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Asked Questions</h2>
      <TransitionGroup>
        {faqs.map((faq, index) => (
          <CSSTransition key={index} timeout={300} classNames="faq">
            <div className="border-b border-gray-300 mb-3">
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center p-3 cursor-pointer bg-gray-200 rounded-lg"
              >
                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-xl">{faq.isOpen ? "▴" : "▾"}</span>
              </div>
              {faq.isOpen && (
                <div className="p-3 bg-gray-100 text-gray-700">
                  {faq.answer}
                  <button
                    onClick={() => openModal(faq)}
                    className="text-blue-500 text-sm mt-2 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFAQ(faq)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <button
        onClick={() => openModal()}
        className="text-blue-500 text-sm mt-4"
      >
        + Add FAQ
      </button>

      {isModalOpen && (
        <FAQModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveFAQ}
          initialData={currentFAQ}
        />
      )}
    </div>
  );
};

export default FAQSection;
