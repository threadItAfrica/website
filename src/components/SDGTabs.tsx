"use client";
import * as React from "react";
import sdg8 from "@/assets/images/sdg8.png";
import sdg13 from "@/assets/images/sdg13.png";
import sdg12 from "@/assets/images/sdg12.png";
import Link from "next/link";

export default function SDGTab() {
  const [activeTab, setActiveTab] = React.useState(0);

  // Tab data with images and content
  const tabs = [
    {
      id: 0,
      goal: "Sustainable Goal 8",
      title: "decent work and economic growth",
      subtitle:
        "Threadit is committed to ethical labor practices in fashion by highlighting brands that prioritize fair wages and safe working conditions. ",
      icon: sdg8,
      content: [
        { title: "A Commitment to Fair Work in Fashion", body: "As Threadit grows, we're committed to promoting ethical labor and inclusive economic growth across the fashion industry." },
        { title: "Spotlighting Ethical Brands and Local Creatives", body: "We highlight designers and brands that value fair wages, transparency, and safe working conditions. We hope to drive awareness and support for ethical fashion by featuring their stories." },
        { title: "Encouraging Conscious Consumption", body: "We believe conscious consumer choices can drive better outcomes for workers. As we build our platform, we aim to connect people with brands doing better for the planet and its people." },
        { title: "Building Awareness Through Storytelling", body: "We use our content to start conversations about labor rights, garment worker safety, and the people behind the clothes we wear, especially in African contexts where these stories are often left untold."},
      ],
      link: "https://sdgs.un.org/goals/goal8",
    },
    {
      id: 1,
      goal: "Sustainable Goal 12",
      title: "responsible consumption and production",
      subtitle:
        "Threadit highlights African-led sustainability initiatives and local solutions, while making responsible consumption accessible through practical tips and approachable content focused on small everyday changes.",
      icon: sdg12,
      content: [
        { title: "Promoting Responsible Fashion Habits", body: "As a media brand, we believe education is a powerful tool for change. Threadit is committed to reshaping the way we think about clothing—what we buy, how we wear it, and how long it lasts." },
        { title: "Encouraging Slow Fashion and Reuse", body: "We promote alternatives to fast fashion by celebrating secondhand style, upcycling, and intentional wardrobe choices." },
        { title: "Spotlighting African-Led Solutions", body: "From thrift culture to textile innovation, we highlight solutions that already exist across the continent, making sustainable fashion feel local and achievable." },
        { title: "Making Sustainability Practical", body: "Our goal is to make responsible consumption less intimidating and more relatable through tips, stories, and small everyday shifts."},
      ],
      link: "https://sdgs.un.org/goals/goal12",
    },
    {
      id: 2,
      goal: "Sustainable Goal 13",
      title: "climate action",
      subtitle: "Threadit addresses fashion's significant environmental impact by using storytelling to connect fashion choices with climate outcomes. ",
      icon: sdg13,
      content: [
        { title: "Taking Climate Action Through Fashion Awareness", body: "The fashion industry is a major contributor to global pollution and waste. While its environmental impact is significant, it also presents a powerful opportunity to drive real, lasting change." },
        { title: "Raising Awareness Through Content", body: "At Threadit, we use storytelling to connect the dots between fashion and climate. From overproduction to textile waste, we break down how everyday fashion habits contribute to environmental harm and what we can do differently." },
        { title: "Encouraging Low-Impact Habits", body: "We encourage small shifts like choosing secondhand, repairing what you already own, and washing less, to lower fashion's footprint. These small actions, when done consistently, reduce fashion's overall carbon footprint." },
        { title: "Highlighting Local Environmental Realities", body: "Through articles and community voices, we shed light on how fashion waste impacts African cities and ecosystems. By centering local stories, we make climate action feel closer to home and more urgent."},
      ],
      link: "https://sdgs.un.org/goals/goal13",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:max-w-[90%] lg:max-w-[80%] mx-auto bg-white rounded-xl mt-12 sm:mt-16 md:mt-[100px] py-6 sm:py-8">
      {/* Tab Navigation */}
      <div className="flex flex-col md:flex-row flex-wrap gap-3 sm:gap-4 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center sm:justify-start px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none ${
              activeTab === tab.id
                ? "bg-tertiary text-white shadow-md"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <span className="mr-2">
              <div
                style={{ backgroundImage: `url(${tab.icon.src})` }}
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-contain bg-no-repeat bg-center"
              ></div>
            </span>
            <span className="font-medium text-sm sm:text-base">{tab.goal}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4 sm:p-4 md:p-6 bg-white rounded-b-lg">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            {/* header */}
            <div className="w-full flex flex-col md:flex-row justify-start md:justify-between gap-6">
              {/* image */}
              <div
                style={{ backgroundImage: `url(${tab.icon.src})` }}
                className="w-full h-[200px] sm:h-[250px] md:w-[35%] lg:w-[30%] md:h-[200px] mx-auto bg-contain bg-no-repeat bg-center my-4 md:my-6"
              ></div>

              {/* header texts */}
              <div className="w-full md:w-[60%] lg:w-[65%]">
                {/* text */}
                <h1 className="text-[#005A56] font-[600] text-sm sm:text-md uppercase flex items-center gap-2 sm:gap-4 leading-relaxed mb-3 md:mb-4">
                  <span className="bg-[#005A56] w-[2rem] sm:w-[3rem] h-[2px]"></span>
                  {tab.title}
                </h1>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{tab.goal}</h3>
                <p className="text-sm sm:text-base text-gray-500">{tab.subtitle}</p>
                <Link
                  href={tab.link}
                  target="_blank"
                  className="text-white bg-tertiary py-1 px-3 sm:px-4 border-white border-[1px] rounded-full inline-block hover:bg-white hover:text-[#005A56] transition-all mt-3 sm:mt-4"
                >
                  <span className="text-sm sm:text-md md:text-lg font-[600] ">More Info</span>
                </Link>
              </div>
            </div>

            <div className="text-gray-700 mt-6 sm:mt-8 w-full md:w-[90%] lg:w-[85%] space-y-4 sm:space-y-6">
              {tab.content.map((item, index) => (
                <div key={index}>
                  {item.title && <p className="font-[600] text-sm sm:text-base mb-1 sm:mb-2">{item.title}</p>}
                  {item.body && <p className="text-sm sm:text-base">{item.body}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}