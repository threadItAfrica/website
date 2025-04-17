"use client";
import * as React from "react";
import sdg8 from "@/assets/images/sdg8.png";
import sdg13 from "@/assets/images/sdg13.png";
import sdg12 from "@/assets/images/sdg12.png";

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
        { title: "A Commitment to Fair Work in Fashion", body: "As Threadit grows, we’re committed to promoting ethical labor and inclusive economic growth across the fashion industry." },
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
      title: "",
      subtitle: "",
      icon: sdg13,
      content: [
        { title: "A Commitment to Fair Work in Fashion", body: "As Threadit grows, we’re committed to promoting ethical labor and inclusive economic growth across the fashion industry." },
        { title: "Spotlighting Ethical Brands and Local Creatives", body: "We highlight designers and brands that value fair wages, transparency, and safe working conditions. We hope to drive awareness and support for ethical fashion by featuring their stories." },
        { title: "Encouraging Conscious Consumption", body: "We believe conscious consumer choices can drive better outcomes for workers. As we build our platform, we aim to connect people with brands doing better for the planet and its people." },
        { title: "Building Awareness Through Storytelling", body: "We use our content to start conversations about labor rights, garment worker safety, and the people behind the clothes we wear, especially in African contexts where these stories are often left untold."},

      ],
      link: "https://sdgs.un.org/goals/goal13",
    },
  ];

  return (
    <div className="w-full max-w-[80%] mx-auto p-4 bg-white rounded-xl mt-[100px] py-8">
      {/* Tab Navigation */}
      <div className="flex justify-center gap-2  space-x-2 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none ${
              activeTab === tab.id
                ? "bg-tertiary text-white shadow-md"
                : " hover:bg-gray-200 text-gray-700"
            }`}
          >
            <span className="text-xl mr-2">
              <div
                style={{ backgroundImage: `url(${tab.icon.src})` }}
                className="w-[50px] h-[50px] bg-contain bg-no-repeat bg-center rounded-xls"
              ></div>
            </span>
            <span className="font-medium">{tab.goal}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-white rounded-b-lg">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            {/* header */}
            <div className="w-full flex flex-row justify-between">
              {/* image */}
              <div
                style={{ backgroundImage: `url(${tab.icon.src})` }}
                className="w-full md:w-[40%] h-[200px] mx-auto bg-contain bg-no-repeat bg-center rounded-xls"
              ></div>

              {/* header texts */}
              <div className="w-full md:w-[70%]">
                {/* text */}
                <h1 className="text-[#005A56] font-[600] text-md uppercase flex items-center gap-4 leading-relaxed md:mb-8">
                  <span className="bg-[#005A56] w-[3rem] h-[2px]"></span>
                  {tab.title}
                </h1>
                <h3 className="text-xl font-bold mb-4">{tab.goal}</h3>
                <p>{tab.subtitle}</p>
              </div>
            </div>

            <div className="text-gray-700 mt-8 w-full md:w-[90%]">
              {tab.content.map((item, index) => (
                <div key={index}>
                  {item.title && <p className="my-4 font-[600]">{item.title}</p>}
                  {item.body && <p>{item.body}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
