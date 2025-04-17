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
    { title: "Green Fashion", href: "/skin" },
    { title: "Sustainability", href: "/makeup" },
    { title: "Eco Trends", href: "/hair" },
    { title: "African History", href: "/nails" },
    { title: "About", href: "/about" },
  ];

  return (
    <nav
      className={`w-full z-50 px-10 transition-all duration-300 sticky top-0 ${
        isScrolled ? "bg-[#f3f4f6] shadow-lg py-1 md:py-2" : "bg-white py-2 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo and Links Wrapper */}
          <div
            className={`flex ${
              isScrolled ? "flex-row items-center" : "flex-col items-start"
            } w-full 2xl:w-auto justify-start`}
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

            {/* Navigation Links - Hidden on Mobile, Visible on 2xl and Up */}
            <div
              className={`hidden 2xl:flex flex-row flex-wrap ${
                isScrolled ? "space-x-1 md:space-x-2" : "space-x-3 md:space-x-4"
              } justify-start items-center ${
                isScrolled ? "ml-2 md:ml-4" : "mt-2 md:mt-0"
              }`}
            >
              {sectionLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-[#E5D170] transition-all duration-200 hover:bg-[#005A56] hover:rounded-md hover:shadow-md transition-all whitespace-nowrap ${
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

          {/* Right Side: Hamburger Menu (Mobile) and Button (2xl and Up) */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Menu Button - Visible below 2xl */}
            <button onClick={toggleMenu} className="2xl:hidden">
              <Menu toggled={isOpen} toggle={setMenuOpen} color={"black"} />
            </button>

            {/* Right Button - Visible on 2xl and Up */}
            <div className="hidden 2xl:flex items-center space-x-2">
              <Button onClick={() => setIsOpen(true)} />
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Visible below 2xl */}
        <div
          className={`sticky 2xl:hidden bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            isOpen ? "h-fit opacity-100 py-6" : "h-0 opacity-0"
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