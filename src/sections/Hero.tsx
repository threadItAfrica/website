
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import leaf from "@/assets/illustrations/leaf.png";
import hanger from "@/assets/illustrations/hanger.png";
import hat from "@/assets/illustrations/hat.png";
import needle from "@/assets/illustrations/needle.png";
import recycle from "@/assets/illustrations/recycle.png";
import { SearchBar } from "@/components/SearchBar";

const Hero = async () => {
  return (
    <section className="w-full min-h-screen flex flex-row justify-center items-center bg-[#005A56] text-white text-center px-20 relative overflow-hidden">

      {/* Decorative illustrations */}
      <Image
        src={hanger}
        alt="decoration"
        className="hidden md:block absolute top-14 left-10 w-24 h-24 -translate-x-1/2 -translate-y-1/2 opacity-80"
      />
      <Image
        src={hat}
        alt="decoration"
        className="hidden md:block absolute top-44 right-10 w-24 h-24 translate-x-1/2 translate-y-1/2 opacity-80"
      />
      <Image
        src={recycle}
        alt="decoration"
        className="hidden md:block absolute bottom-8 left-10 w-18 h-18 translate-x-1/2 translate-y-1/2 opacity-80"
      />
      <Image
        src={leaf}
        alt="decoration"
        className="hidden md:block absolute bottom-14 right-10 w-20 h-20 translate-x-1/2 translate-y-1/2 opacity-80"
      />
      <Image
        src={needle}
        alt="decoration"
        className="hidden md:block absolute top-1/2 left-20 w-20 h-20 -translate-x-1/2 translate-y-1/2 opacity-80"
      />

      <div className="w-full md:w-[60%] mx-auto h-auto p-6  ">
        <video
 className="w-full h-full min-h-[60vh] object-cover rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
          autoPlay
          muted
          loop
          playsInline
          poster={logo.src}
        >
          <source src="/video/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-[60%] -mt-10">
        <div className=" tet-center w-fit mx-center text-white py-4 px-8 rounded-xl">
        <p className="text-md md:text-5xl text-inherit font-Thicccboi">
        What you wear can change everything - 
<br /><span className="block mt-4 md:mt-6 text-md md:text-4xl text-[#E5D170]">Hi Threadies,</span>

          </p>

          <p className="text-md md:text-[1.25rem] text-inherit font-lato w-full md:w-2/4 text-center mx-auto">
         Look good. do good. </p>

        </div>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;

// ${
//   category.title === "Sustainability for Fashion Brands"
//     ? "text-tertiary "
//     : category.title === "Eco Trends & Innovations"
//       ? "text-primary "
//       : category.title === "Green Fashion 101"
//         ? "text-secondary"
//         : ""
// }
