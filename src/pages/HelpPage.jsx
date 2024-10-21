import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-700 overflow-hidden">
    <button
      className="w-full text-left py-4 px-6 focus:outline-none hover:bg-gray-800 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-200">{question}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-6 pt-0">
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  </div>
);

const HelpPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openFAQs, setOpenFAQs] = useState({});

  const faqs = [
    {
      question: "How do I request leave or report an absence?",
      answer:
        "To request leave or report an absence, write a formal letter to HR stating the dates and providing a valid reason for your absence. Send the letter to rezime.hr@gmail.com. Every absence must be justified with a proper reason.",
    },
    {
      question: "How can I access my payroll documents?",
      answer:
        "Send an email to rezime.hr@gmail.com with your employee ID. Make sure to include 'Request for Payroll Documents' in the subject line. HR will send your documents to you via email.",
    },
    {
      question: "How do I update my salary account details?",
      answer:
        "To update your salary account details, go to the Profile section on the Rezime portal and navigate to 'Financial Information'. If you encounter any issues or it's an emergency, contact HR at rezime.hr@gmail.com with your updated details.",
    },
    {
      question: "What should I do if I'm having technical issues with the Rezime portal?",
      answer:
        "If you're facing technical issues, try clearing your browser cache and cookies first. If the issue continues, contact our IT support team at rezime.it@gmail.com, including your employee ID and a detailed description of the problem.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQs((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleEmailHR = () => {
    window.location.href = "mailto:rezime.hr@gmail.com?subject=Help%20Request";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <main
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 transition-opacity duration-500 opacity-100">
              <h1 className="text-2xl font-bold mt-20">Help Center</h1>
            </header>

            <div className="bg-gray-800 rounded-lg shadow-sm mb-6 transform transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold p-6 border-b border-gray-700">
                Frequently Asked Questions
              </h2>
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQs[index]}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transform transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                  HR Department: rezime.hr@gmail.com
                </p>
                <p className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                  IT Support: rezime.it@gmail.com
                </p>
                <p className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                  General Inquiries: rezime.help@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-sm p-6 transform transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
              <p className="text-gray-400 mb-4">
                If you couldn't find the answer to your question, or if you need
                further assistance, please don't hesitate to contact our HR
                department.
              </p>
              <a
                href="mailto:rezime.hr@gmail.com?subject=Help%20Request"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                Email HR
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
