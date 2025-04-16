"use client"; 
import Link from "next/link"; 
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";  

const Socials = ({ title, postUrl }: {postUrl: string, title: string }) => { 

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}&text=${encodeURIComponent(title)}`,
    
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      postUrl
    )}&title=${encodeURIComponent(title)}`,
     
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Facebook */}
      <Link
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#3b5998] hover:text-blue-800"
      >
        <FaFacebook className="text-[1.2rem]" />
      </Link>

      {/* Twitter */}
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-blue-600"
      >
        <FaXTwitter className="text-[1.2rem]" />
      </Link>

      {/* LinkedIn */}
      <Link
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0E76A8] hover:text-blue-900"
      >
        <FaLinkedinIn className="text-[1.2rem]" />
      </Link>

      {/* WhatsApp */}
      {/* <Link
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700"
      >
        < className="w-6 h-6" />
      </Link> */}
    </div>
  );
};

export default Socials;