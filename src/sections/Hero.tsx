'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import poster from "@/assets/images/poster.jpg";
import leaf from "@/assets/illustrations/leaf.png";
import hanger from "@/assets/illustrations/hanger.png";
import hat from "@/assets/illustrations/hat.png";
import needle from "@/assets/illustrations/needle.png";
import recycle from "@/assets/illustrations/recycle.png";
import { SearchBar } from "@/components/SearchBar";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setShowPoster(false);
      }
    }, 3000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  // Example category title to demonstrate conditional text coloring
  

  return (
    <section className="w-full h-auto lg:min-h-screen flex flex-col gap-5 lg:flex-row justify-center items-center bg-[#005A56] text-white text-center py-10 px-2 lg:px-20 relative overflow-hidden z-0">

    

      {/* Video */}
      <div className="w-[90%] max-w-4xl aspect-video rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-xl"
          muted
          loop
          playsInline
          poster={showPoster ? poster.src : undefined}
          preload="auto"
        >
          <source src="/video/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center justify-center w-full md:w-[80%]">
        <div className="text-center w-fit mx-auto text-white py-4 px-8 rounded-xl">
          <p className="text-3xl md:text-5xl text-inherit font-Thicccboi leading-none">
            What you wear
            <br />
         can change everything
            <br />
            <span className="block mt-3 text-2xl md:text-4xl text-[#E5D170]">
              Hi Threadies,
            </span>
          </p>

        
     

          <p className=" mt-[-8] text-md md:text-[1.05rem] text-inherit font-lato w-full md:w-2/4 text-center mx-auto">
            Look good. Do good.
          </p>
        </div>

        <SearchBar />
      </div>



      <Image
        src={hanger}
        alt="decoration"
        className="block absolute top-4 left-6 w-16 h-16  lg:top-14 lg:left-10 lg:w-24 lg:h-24 -translate-x-1/2 -translate-y-1/2 opacity-80 z-[-1] lg:z-[0]"
      />
      <Image
        src={hat}
        alt="decoration"
        className="block absolute top-50 right-10 w-16 h-16 translate-x-1/2 translate-y-1/2 opacity-80 z-[-1] lg:z-[0]"
      />
      <Image
        src={recycle}
        alt="decoration"
        className="block absolute bottom-8 left-2 w-16 h-16 translate-x-1/2 translate-y-1/2 opacity-80 z-[-1] lg:z-[0]"
      />
      <Image
        src={leaf}
        alt="decoration"
        className="block absolute bottom-14 right-10 w-16 h-16 translate-x-1/2 translate-y-1/2 opacity-80 z-[-1] lg:z-[0]"
      />
      <Image
        src={needle}
        alt="decoration"
        className="block absolute top-1/2 left-20 w-16 h-16 -translate-x-1/2 translate-y-1/2 opacity-80 z-[-1] lg:z-[0]"
      />


    </section>
  );
};

export default Hero;
