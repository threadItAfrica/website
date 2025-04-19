"use client";
import * as React from 'react'
// import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import poster from "@/assets/images/poster.jpg";
import leaf from "@/assets/illustrations/leaf.png";
import hanger from "@/assets/illustrations/hanger.png";
import hat from "@/assets/illustrations/hat.png";
import needle from "@/assets/illustrations/needle.png";
import recycle from "@/assets/illustrations/recycle.png";
import { SearchBar } from "@/components/SearchBar";


const Hero = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setShowPoster(false);
      }
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-[2024px] mx-auto w-full h-[auto] lg:min-h-screen flex flex-col gap-5 lg:flex-row justify-center items-center text-white text-center py-6 px-2 lg:px-20 relative overflow-hidden">

      {/* Decorative illustrations */}
      <Image
        src={hanger}
        alt="decoration"
        className="block absolute top-4 left-6 w-16 h-16 lg:top-14 lg:left-10 lg:w-24 lg:h-24 -translate-x-1/2 -translate-y-1/2 opacity-80 z-[-1] lg:z-[0]"
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
        className="hidden md:block absolute top-1/2 left-20 w-20 h-20 -translate-x-1/2 translate-y-1/2 opacity-80"
      />
     
      <div className="w-[90%] max-w-5xl aspect-video rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] relative">
        {showPoster && (
          <div className="absolute inset-0 z-10 rounded-xl">
            <Image 
              src={poster} 
              alt="Video poster" 
              className="w-full h-full object-cover rounded-xl"
              priority
              layout="fill"
            />
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-xl"
          muted
          loop
          playsInline
          autoPlay={false}
        >
          <source src="/video/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-[80%]">
        <div className="tet-center w-fit mx-center text-white py-4 px-8 rounded-xl">
          <p className="text-2xl md:text-5xl text-inherit font-Thicccboi">
            What you wear<br />  can change everything - 
            <br /><span className="block mt-4 md:mt-6 text-2xl md:text-4xl text-[#E5D170]">Hi Threadies,</span>
          </p>

          <p className="text-md md:text-[1.05rem] text-inherit font-lato w-full md:w-2/4 text-center mx-auto">
            Look good. Do good.
          </p>
        </div>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;