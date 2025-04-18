"use client";
import Button from "./Button";
import * as React from "react";
import { Spiral as Menu } from "hamburger-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import logo from "@/assets/images/logo.svg";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"; // Import social media icons

const Header = () => {
  const [isOpen, setMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { setIsOpen } = useModal();

  // Scroll event
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!isOpen);

  const sectionLinks = [
    { title: "Green Fashion", href: "/postList/green-fashion-101" },
    { title: "Sustainability", href: "/postList/sustainability-for-fashion-brands" },
    { title: "Eco Trends", href: "/postList/eco-trends-and-innovations" },
    { title: "African History", href: "/postList/african-fashion-history" },
  ];

  // Social media links
  const socialLinks = [
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://facebook.com", icon: <FaFacebook /> },
    { href: "https://instagram.com", icon: <FaInstagram /> },
  ];

  return (
    <nav
      className={`w-full z-50 px-10 transition-all duration-300 sticky top-0 ${
        isScrolled ? "bg-white shadow-lg py-1 md:py-2" : "bg-white py-2 md:py-4"
      }`}
    >
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Links Wrapper */}
          <div
            className={`flex ${
              isScrolled ? "flex-row items-center" : "flex-col sm:flex-row items-start sm:items-center"
            } w-full lg:w-auto justify-start`}
          >
            {/* Logo */}
            <Link href="/">
              <div
                className={`w-[120px] sm:w-[150px] md:w-[200px] transition-all duration-300 ${
                  isScrolled ? "h-[30px] sm:h-[40px] md:h-[50px]" : "h-[40px] sm:h-[50px] md:h-[70px]"
                } bg-contain bg-center bg-no-repeat`}
                style={{ backgroundImage: `url('${logo.src}')` }}
              />
            </Link>

            {/* Navigation Links (excluding About) - Hidden on Mobile, Visible on 2xl and Up */}
            <div
              className={`hidden lg:flex flex-row flex-wrap ${
                isScrolled ? "space-x-1 md:space-x-2" : "space-x-2 md:space-x-4"
              } justify-start items-center ${
                isScrolled ? "ml-2 md:ml-4" : "mt-0 ml-2 md:ml-4"
              }`}
            >
              {sectionLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md whitespace-nowrap ${
                    isScrolled
                      ? "text-gray-800 text-xs md:text-sm px-1"
                      : "text-gray-900 text-sm px-2"
                  } inline-block py-1 md:py-0 font-[600]`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Hamburger Menu (Mobile), About Link, Social Links, and Newsletter Button */}
          <div className="flex items-center space-x-2">
            {/* About Link and Social Media Links - Visible on 2xl and Up, Hidden when scrolled */}
            <div
              className={`hidden items-center space-x-2 ${
                isScrolled ? "2xl:hidden" : "2xl:flex"
              }`}
            >
              {/* About Link */}
              <Link
                href="/about"
                className="flex items-center space-x-1 hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md whitespace-nowrap text-gray-900 text-sm px-2 inline-block py-1 md:py-0 font-[600]"
              >
                About
              </Link>

              {/* Social Media Links */}
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md text-gray-900 text-sm px-2 inline-block py-1 md:py-0"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            {/* Newsletter Button - Visible on 2xl and Up */}
            <div className="hidden 2xl:flex items-center">
              <Button onClick={() => setIsOpen(true)} />
            </div>

            {/* Hamburger Menu Button - Visible below 2xl */}
            <button onClick={toggleMenu} className="2xl:hidden">
              <Menu toggled={isOpen} toggle={setMenuOpen} color={"black"} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Visible below 2xl */}
        <div
          className={`lg:hidden bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100 py-3" : "max-h-0 opacity-0"
          }`}
        >
          {sectionLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={toggleMenu}
              className="block px-6 py-3 text-inherit hover:bg-green-50"
            >
              {item.title}
            </Link>
          ))}
          <div className="pl-4">
            <Button onClick={() => setIsOpen(true)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;