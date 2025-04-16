"use client";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";


const CarouselControls = () => {
  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = document.querySelector(".overflow-x-auto");
    if (carousel) {
      const scrollAmount = carousel.clientWidth; // Scroll by the width of the container
      if (direction === "left") {
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="absolute top-1/2 -translate-y-1/2 left-0">
        <button
          className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          onClick={() => scrollCarousel("left")}
        >
        <FaChevronLeft />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0">
        <button
          className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          onClick={() => scrollCarousel("right")}
        >
        <FaChevronRight />
          
        </button>
      </div>
    </>
  );
};

export default CarouselControls;