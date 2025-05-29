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
    <footer className="w-full bg-gray-900 text-white lg:py-8 py-4 font-body">
      <div className="w-full md:w-[90%] max-w-[2024px] mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Logo and Description */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <Link href="/">
              <h2 className="text-2xl font-heading font-bold mb-4">Thread it</h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for sustainable fashion insights, eco-friendly tips,
              and the latest in environmentally conscious style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h3 className="text-lg font-heading font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/postList/${category.slug.current}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:w-1/4">
            <h3 className="text-lg font-heading font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterestP className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Thread it. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
