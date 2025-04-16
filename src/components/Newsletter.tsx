"use client";
import { useState } from "react";
import { useModal } from "@/context/ModalContext";

export const Newsletter = () => {
  const { isOpen, setIsOpen } = useModal();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setIsOpen(false); // Close the modal after submission
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest news and trends!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-primary text-white hover:bg-primary-dark"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
