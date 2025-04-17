"use client";
import Button from "./Button";
import * as React from "react";
import { Spiral as Menu } from "hamburger-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import logo from "@/assets/images/logo.svg";

const Header = () => {
  const [isOpen, setMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { setIsOpen } = useModal();

  // Add scroll event listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!isOpen);

  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
  ];
  const sectionLinks = [
    { href: "/", title: "Home" },
    { href: "/postList/sustainability-for-fashion-brands", title: "Sustainability" },
    { href: "/postList/green-fashion-101", title: "Greeen Fashion" },
    { href: "/postList/african-fashion-history", title: "African Fashion" },
    { href: "/postList/eco-trends-and-innovations", title: "Eco Trends" },
    { href: "/about", title: "About" },
  ];
  return (
<nav
  className={`w-full z-50 px-10 transition-all duration-300 sticky top-0 ${
    isScrolled ? "bg-[#f3f4f6] shadow-lg py-1 md:py-2" : "bg-[#ffffff] py-2 md:py-4"
  }`}
>
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex justify-between items-center">
      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden">
        <Menu toggled={isOpen} toggle={setMenuOpen} color={"black"} />
      </button>

      {/* Logo and Links Wrapper */}
      <div
        className={`flex ${
          isScrolled ? "flex-row items-center" : "flex-col items-start"
        } w-full md:w-auto justify-start`}
      >
        {/* Logo */}
        <Link href="/">
          <div
            className={`w-[150px] md:w-[200px] transition-all duration-300 ${
              isScrolled ? "h-[40px] md:h-[50px]" : "h-[50px] md:h-[70px]"
            } bg-contain bg-center bg-no-repeat`}
            style={{ backgroundImage: `url('${logo.src}')` }}
          />
        </Link>

        {/* Navigation Links */}
        <div
          className={`flex flex-row flex-wrap ${
            isScrolled ? "space-x-1 md:space-x-2" : "space-x-2 md:space-x-4"
          } justify-start items-center ${isScrolled ? "ml-2 md:ml-4" : "mt-2 md:mt-0"}`}
        >
          {[
            { title: "SKIN", href: "/skin" },
            { title: "MAKEUP", href: "/makeup" },
            { title: "HAIR", href: "/hair" },
            { title: "NAILS", href: "/nails" },
            { title: "STYLE", href: "/style" },
            { title: "NEWS", href: "/news" },
            { title: "WHAT TO BUY", href: "/what-to-buy" },
            { title: "HEALTH AND WELLNESS", href: "/health-and-wellness" },
            { title: "ABOUT US", href: "/about-us" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`hover:text-primary transition-all whitespace-nowrap ${
                isScrolled ? "text-gray-800 text-xs md:text-sm px-1" : "text-gray-900 text-sm lg:text-base px-2"
              } inline-block py-1 md:py-0 font-[600]`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Button and Social Icons (Right Side) */}
      <div className="hidden md:flex items-center space-x-2">
        <div className="hidden md:block">
          <Button onClick={() => setIsOpen(true)} />
        </div>
        {/* Add social icons or other right-side elements if needed */}
      </div>
    </div>

    {/* Mobile Menu */}
    <div
      className={`sticky md:hidden bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
        isOpen ? "h-fit opacity-100 py-6" : "h-0 opacity-0"
      }`}
    >
      {[
        { title: "SKIN", href: "/skin" },
        { title: "MAKEUP", href: "/makeup" },
        { title: "HAIR", href: "/hair" },
        { title: "NAILS", href: "/nails" },
        { title: "STYLE", href: "/style" },
        { title: "NEWS", href: "/news" },
        { title: "WHAT TO BUY", href: "/what-to-buy" },
        { title: "HEALTH AND WELLNESS", href: "/health-and-wellness" },
        { title: "ABOUT US", href: "/about-us" },
      ].map((item, index) => (
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
