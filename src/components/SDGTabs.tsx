"use client";
import * as React from 'react';
import sdg8 from '@/assets/images/sdg8.png'
import sdg13 from '@/assets/images/sdg14.png'
import sdg12 from '@/assets/images/sdg12.png'

export default function SDGTab() {
  const [activeTab, setActiveTab] = React.useState(0);
  
  // Tab data with images and content
  const tabs = [
    {
      id: 0,
      title: 'Sustainable Goal 8',
      icon: sdg8,
      content: 'Welcome to the home tab. This is the main dashboard area of our application.'
    },
    {
      id: 1,
      title: 'Sustainable Goal 12',
      icon: sdg12,
      content: 'This is your profile tab. Here you can update your personal information and preferences.'
    },
    {
      id: 2,
      title: 'Sustainable Goal 8',
      icon: sdg13,
      content: 'Adjust your application settings here. Configure notifications, privacy options, and more.'
    } 
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto space-x-2 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-t-lg transition-all duration-200 focus:outline-none ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <span className="text-xl mr-2">
            <div
                style={{ backgroundImage: `url(${tab.icon})` }}
                className="w-1/2 h-[500px] bg-contain bg-no-repeat bg-center rounded-xls hidden md:block"
              ></div>
            </span>
            <span className="font-medium">{tab.title}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="p-6 bg-white rounded-b-lg">
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            <h3 className="text-xl font-bold mb-4">{tab.title}</h3>
            <p className="text-gray-700">{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}