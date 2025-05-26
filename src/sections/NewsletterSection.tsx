"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  firstName: yup.string(),
  lastName: yup.string()
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

  const onSubmit = async (data: { email: string, firstName?: string, lastName?: string }) => {
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
            firstName: data.firstName,
            lastName: data.lastName,
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
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white pt-8 py-[5rem] min-h-[20vh]">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Stay Updated!
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-600">
          Subscribe to our newsletter to get the latest updates and news.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:flex justify-center">
          <div className="w-full sm:max-w-xs">
            <input
             required
              type="text"
              {...register("firstName")}
              className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-full sm:max-w-xs">
            <input
              type="text"
              {...register("lastName")}
              className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
          <div className="w-full sm:max-w-xs">
            <input
             required
              type="email"
              {...register("email")}
              className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
           {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    status === "success"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {status === "success"
                    ? "🎉 Thank you for subscribing! Check your email for confirmation."
                    : `❌ ${status}`}
                </div>
              )}
        <p className="mt-3 text-sm text-gray-500">
          We care about your data in our <a href="#" className="font-medium text-gray-900 underline">privacy policy</a>.
        </p>
      </div>
    </section>
  );
};
