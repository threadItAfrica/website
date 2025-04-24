import { client } from "@/sanity/client";
import { Category } from "@/utils/interface";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";

const Footer = async () => {
  const categories: Category[] = await client.fetch(
    `*[_type == "category"]|order(_createdAt asc){
        _id,
        title,
        description,
        slug
      }`
  );

  return (
    <footer className="w-full bg-gray-900 text-white lg:py-16 py-8">
      <div className="w-full md:w-[90%] max-w-[2024px] mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-2 md:mb-8 lg:mb-0 lg:w-1/3">
            <Link href="/">
              {/* <div
                className={`w-[200px] transition-all duration-300 h-[50px]  bg-contain bg-center bg-no-repeat`}
                style={{ backgroundImage: `url('${logo.src}')` }}
              /> */}
              <p className="text-primary md:my-2 font-bold text-md md:text-2xl">
                Threadit
              </p>
            </Link>
            <p className="text-gray-400 w-full lg:max-w-[300px]">
              Your sustainable fashion guide.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-2 md:mb-8 lg:mb-0 lg:w-1/3">
            <h3 className="text-md md:text-xl font-bold mb-1 md:mb-2">
              Sections
            </h3>
            <ul className="text-gray-400">
              {categories.map((category) => (
                <li key={category._id} className="my-2">
                  <Link
                    href={`/postList/${category?.slug.current}`}
                    className="hover:underline"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
              <li className="my-1 md:my-2">
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:w-fit lg:w-1/3">
            <h3 className="text-md md:text-xl font-bold mb-1 md:mb-2">
              Contact Us
            </h3>
            <p className="text-gray-400 mb-1 md:my-2">
              Email: info@threadit.com
            </p>
            <p className="text-gray-400 mb-1 md:my-2">Phone: +123 456 7890</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-4">
          {/* Instagram */}
          <Link
            href="https://instagram.com/threaditng"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white rounded-full h-10 w-10 flex justify-center items-center transition-all duration-300"
          >
            <FaInstagram className="text-[1.2rem]" />
          </Link>

          {/* Twitter */}
          <Link
            href="https://x.com/threaditng"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:text-blue-600 text-white rounded-full h-10 w-10 flex justify-center items-center"
          >
            <FaXTwitter className="text-[1.2rem]" />
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://linkedin.com/company/threaditeco"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0E76A8] hover:text-blue-900 text-white rounded-full h-10 w-10 flex justify-center items-center"
          >
            <FaLinkedinIn className="text-[1.2rem]" />
          </Link>

          {/* Pinterest */}
          <Link
            href="https://www.pinterest.com/threaditlogin/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E60023] hover:text-red-700 text-white rounded-full h-10 w-10 flex justify-center items-center"
          >
            <FaPinterestP className="text-[1.2rem]" />
          </Link>
        </div>
      </div>
      <hr className="my-4 border-slate-600" />
      <div className="text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Thread It. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
