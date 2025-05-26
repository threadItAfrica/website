"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";

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
    <section className="bg-[#f8faff] py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-50 rounded-full"></div>
        <div className="absolute top-1/2 -left-12 w-24 h-24 bg-orange-50 rounded-full"></div>
        <div className="absolute bottom-12 right-12 w-12 h-12 bg-green-50 rounded-full"></div>
      </div>

      {/* Flying Mail Icons */}
      <div className="absolute top-20 right-[20%] transform rotate-12">
        <div className="text-blue-100 text-4xl">✉️</div>
      </div>
      <div className="absolute top-40 left-[15%] transform -rotate-12">
        <div className="text-blue-100 text-3xl">✈️</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Illustration */}
          <div className="relative hidden md:block">
            <Image
              src="/images/newsletter-illustration.jpg"
              alt="Newsletter illustration"
              width={500}
              height={400}
              className="rounded-lg"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100/50 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100/50 rounded-full -z-10"></div>
          </div>

          {/* Right: Newsletter Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            <div className="absolute -top-2 -right-2 transform rotate-12">
              <span className="text-4xl">✉️</span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Join Our Newsletter
              </h2>
              <p className="text-gray-600">
                Stay ahead with our weekly insights and updates. Join over our readers who trust our newsletter.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {status && (
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    status === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status === "success" ? (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Thank you for subscribing!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{status}</span>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600">Weekly Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600">Exclusive Content</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
