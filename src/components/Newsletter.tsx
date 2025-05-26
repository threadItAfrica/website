"use client";
import { useState } from "react";
import { useModal } from "@/context/ModalContext";

export const Newsletter = () => {
  const { isOpen, setIsOpen } = useModal();
  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail(""); 
         setTimeout(() => {
          setStatus("");
        }, 5000); //
      } else {
        setStatus(data.error || "An error occurred");
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
      setTimeout(() => {
          setStatus("");
        }, 5000); // Clear status after 5 seconds
      console.log(error);
    } finally {
      setLoading(false);
    }
    setIsOpen(false); // Close the modal after submission
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest news and trends!
            </p>
             {status && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    status === "success"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                 <p> {status === "success"
                    ? "🎉 Thank you for subscribing! Check your email for confirmation."
                    : `❌ ${status}`}</p>
                </div>
              )}
            <form onSubmit={handleSubmit}> 
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
             
            </form>
          </div>
        </div>
      )}
    </>
  );
};
