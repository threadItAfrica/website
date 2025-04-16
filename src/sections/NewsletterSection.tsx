"use client";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
});

export const NewsletterSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
    // Handle form submission (e.g., send data to the server)
    reset();
  };

  return (
    <section className="bg-gray-100 pt-8 py-[5rem] min-h-[20vh]">
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
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-500">
          We care about your data in our <a href="#" className="font-medium text-gray-900 underline">privacy policy</a>.
        </p>
      </div>
    </section>
  );
};
