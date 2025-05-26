"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required") 
});

export const NewsletterSection = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string}) => {
    // console.log(data);
    // Handle form submission (e.g., send data to the server)
      try {
        setLoading(true);
        const response: Response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email, 
          }),
        });

        const responseData = await response.json();

      if (response.ok) {
        reset();
        setStatus("success");
        setTimeout(() => {
          setStatus("");
        }, 5000); // Clear status after 5 seconds
      } else {
        setStatus(responseData.error || "An error occurred");
          setTimeout(() => {
          setStatus("");
        }, 5000); 
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
      console.log(error);
        setTimeout(() => {
          setStatus("");
        }, 5000); 
    } finally {
      setLoading(false);
        setTimeout(() => {
          setStatus("");
        }, 5000); 
    }
  };

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header with back button */}
        <div className="p-4 border-b flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="ml-4 text-xl font-semibold">Daily Newsletters</h2>
        </div>

        {/* Newsletter content */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">Micke Hadi</h3>
              <p className="text-sm text-gray-500">362 followers</p>
            </div>
            <button className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              #3
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Join our <span className="text-blue-600">news</span>letters
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span>+10K User, @ Hot-Subscription feature for users</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              🔥 #1Health community
            </div>
          </div>

          {/* User interactions */}
          <div className="flex items-center mb-6">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
            </div>
            <div className="ml-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">Merry Rose</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">493 followers</p>
            </div>
            <button className="ml-auto bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              #2
            </button>
          </div>

          {/* Newsletter form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {loading ? "Subscribing..." : "Submit"}
            </button>

            {status && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  status === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status === "success"
                  ? "🎉 Thank you for subscribing!"
                  : `❌ ${status}`}
              </div>
            )}
          </form>

          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
