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
         
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Join our <span className="text-blue-600">news</span>letters
            </h3>
            
           
 
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

          
        </div>
      </div>
    </section>
  );
};
