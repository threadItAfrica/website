"use client"; 
import Link from "next/link"; 
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";  

const Socials = ({ title, postUrl }: {postUrl: string, title: string }) => { 

  const shareLinks = {
    instagram: `https://www.instagram.com/share?url=${encodeURIComponent(
      postUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      postUrl
    )}&title=${encodeURIComponent(title)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      postUrl
    )}&description=${encodeURIComponent(title)}`,
  };

  return (
    <div className="flex md:flex-col gap-2 md:gap-4">
      {/* Instagram */}
      <Link
        href={shareLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-gray-400 text-white rounded-full h-8 w-8 flex justify-center items-center"
      >
        <FaInstagram className="text-[1.2rem]" />
      </Link>

      {/* Twitter */}
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:text-gray-400 text-white rounded-full h-8 w-8 flex justify-center items-center"
      >
        <FaXTwitter className="text-[1.2rem]" />
      </Link>

      {/* LinkedIn */}
      <Link
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0E76A8] hover:text-gray-400 text-white rounded-full h-8 w-8 flex justify-center items-center"
      >
        <FaLinkedinIn className="text-[1.2rem]" />
      </Link>

      {/* Pinterest */}
      <Link
        href={shareLinks.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E60023] hover:text-gray-400 text-white rounded-full h-8 w-8 flex justify-center items-center"
      >
        <FaPinterestP className="text-[1.2rem]" />
      </Link>
    </div>
  );
};

export default Socials;