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
      className={`w-full z-50 py-2 md:py-4 bg-[#fff9f3] sticky top-0 transition-all duration-300 ${
        isScrolled ? "shadow-lg py-1 md:py-2" : "py-2 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-2 md:py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div
              className={`w-[150px] md:w-[200px] transition-all duration-300 ${
                isScrolled ? "h-[40px] md:h-[50px]" : "h-[50px] md:h-[70px]"
              } bg-contain bg-center bg-no-repeat`}
              style={{ backgroundImage: `url('${logo.src}')` }}
            />
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Links */}
            {isScrolled ? (
              <div className="hidden md:flex lg:space-x-2 xl:space-x-4 gap-2 md:gap-4 items-center font-[600] mx-4 md:mx-10 text-sm lg:text-base">
                {sectionLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`hover:text-primary transition-all whitespace-nowrap ${
                      isScrolled ? "text-gray-800" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="hidden md:flex lg:space-x-2 xl:space-x-4 items-center font-[600] mx-4 md:mx-10 text-sm lg:text-base">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`hover:text-primary transition-all whitespace-nowrap ${
                      isScrolled ? "text-gray-800" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
            <div className="hidden md:block">
              <Button onClick={() => setIsOpen(true)} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            <Menu
              toggled={isOpen}
              toggle={setMenuOpen}
              color={"black"}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sticky md:hidden bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
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
