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
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden font-body">

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          onPlay={() => setShowPoster(false)}
        >
          <source src="/video/Hero.mp4" type="video/mp4" />
        </video>
        {showPoster && (
          <Image
            src={poster}
            alt="Video Poster"
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Discover Sustainable Fashion <br />
          <span className="text-primary">For a Better Tomorrow</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore eco-friendly fashion trends, sustainable practices, and innovative solutions
          for a more environmentally conscious wardrobe.
        </p>

        {/* Search Bar */}
        <div className="w-[500px] mx-auto">
          <SearchBar />
        </div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={leaf}
            alt="Leaf"
            className="absolute top-20 left-[10%] w-16 md:w-20 animate-float"
          />
          <Image
            src={hanger}
            alt="Hanger"
            className="absolute top-40 right-[15%] w-12 md:w-16 animate-float-delay-1"
          />
          <Image
            src={hat}
            alt="Hat"
            className="absolute bottom-32 left-[20%] w-14 md:w-18 animate-float-delay-2"
          />
          <Image
            src={needle}
            alt="Needle"
            className="absolute top-60 left-[80%] w-10 md:w-14 animate-float-delay-3"
          />
          <Image
            src={recycle}
            alt="Recycle"
            className="absolute bottom-40 right-[25%] w-12 md:w-16 animate-float-delay-4"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;