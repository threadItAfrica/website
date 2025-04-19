"use client";
import Button from "./Button";
import * as React from "react";
import { Spiral as Menu } from "hamburger-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import logo from "@/assets/images/logo.svg";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Header = () => {
  const [isOpen, setMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { setIsOpen: setModalOpen } = useModal();

  // Scroll event with debounce for better performance
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!isOpen);
  
  // Close menu when clicking a link
  const handleLinkClick = () => {
    if (isOpen) setMenuOpen(false);
  };

  const sectionLinks = [
    { title: "Green Fashion", href: "/postList/green-fashion-101" },
    { title: "Sustainability", href: "/postList/sustainability-for-fashion-brands" },
    { title: "Eco Trends", href: "/postList/eco-trends-and-innovations" },
    { title: "African History", href: "/postList/african-fashion-history" },
  ];

  const socialLinks = [
    { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
    { href: "https://facebook.com", icon: <FaFacebook />, label: "Facebook" },
    { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
  ];

  return (
    <nav
      className={`w-full z-50 px-3 md:px-4 transition-all duration-300 sticky top-0 ${
        isScrolled ? "bg-white shadow-lg py-1 md:py-2" : "bg-white py-2 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={handleLinkClick}>
            <div
              className={`transition-all duration-300 ${
                isScrolled 
                  ? "w-[100px] sm:w-[120px] md:w-[160px] h-[30px] sm:h-[35px] md:h-[40px]" 
                  : "w-[120px] sm:w-[150px] md:w-[200px] h-[40px] sm:h-[50px] md:h-[60px]"
              } bg-contain bg-left bg-no-repeat`}
              style={{ backgroundImage: `url('${logo.src}')` }}
              aria-label="Site Logo"
            />
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile, visible on lg and up */}
          <div className="hidden lg:flex items-center justify-between flex-grow ml-4 xl:ml-8">
            {/* Section Links */}
            <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 items-center">
              {sectionLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md whitespace-nowrap ${
                    isScrolled
                      ? "text-gray-800 text-xs md:text-sm px-2 py-1"
                      : "text-gray-900 text-sm px-3 py-2"
                  } font-semibold`}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* About Link */}
              <Link
                href="/about"
                className={`hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md whitespace-nowrap ${
                  isScrolled
                    ? "text-gray-800 text-xs md:text-sm px-2 py-1"
                    : "text-gray-900 text-sm px-3 py-2"
                } font-semibold`}
              >
                About
              </Link>
            </div>
            
            {/* Social Links and Newsletter Button */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Social Media Links */}
              <div className="hidden md:flex items-center gap-1 lg:gap-2">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md text-gray-900 p-2 text-lg"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
              
              {/* Newsletter Button */}
              <Button onClick={() => setModalOpen(true)} />
            </div>
          </div>
          
          {/* Mobile: Right side with Newsletter Button and Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Compact Newsletter Button for medium screens */}
            <div className="hidden sm:block md:block lg:hidden">
              <Button onClick={() => setModalOpen(true)} />
            </div>
            
            {/* Hamburger Menu */}
            <button 
              onClick={toggleMenu} 
              className="lg:hidden focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <Menu toggled={isOpen} toggle={setMenuOpen} color="black" size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col divide-y divide-gray-100">
            {/* Section Links */}
            {sectionLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={handleLinkClick}
                className="px-4 py-3 text-gray-800 hover:bg-green-50 font-medium"
              >
                {item.title}
              </Link>
            ))}
            
            {/* About Link */}
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="px-4 py-3 text-gray-800 hover:bg-green-50 font-medium"
            >
              About
            </Link>
            
            {/* Mobile-only Social Links */}
            <div className="flex items-center gap-4 px-4 py-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-800 hover:text-[#005A56] text-xl"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            
            {/* Newsletter Button for XS screens */}
            <div className="sm:hidden px-4 py-3">
              <Button onClick={() => {
                setModalOpen(true);
                handleLinkClick();
              }} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;