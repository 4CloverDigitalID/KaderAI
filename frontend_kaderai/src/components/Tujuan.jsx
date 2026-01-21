import React, { useState } from 'react';
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

const TargetAudienceSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const audiences = [
    {
      id: 1,
      title: 'Kader Posyandu',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Puskesmas',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Orang Tua',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className='flex flex-col items-center mb-10'>
            <h1 className='text-4xl font-bold bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] bg-clip-text text-transparent'>Untuk siapa Website ini?</h1>
            <div className='bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] w-100 h-[4px] rounded-sm mt-2'></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
          {audiences.map((audience) => (
            <div
              key={audience.id}
              className={`rounded-2xl border-2 px-8 py-15 cursor-pointer transition-all duration-300 ${
                hoveredCard === audience.id
                  ? 'border-[#2ECCB7] shadow-[0_8px_30px_rgba(15,166,160,0.3)]'
                  : 'border-[#2ECCB7] shadow-sm hover:shadow-md'
              }`}
              onMouseEnter={() => setHoveredCard(audience.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon container */}
                <div className="w-16 h-16 bg-[#0FA6A0] rounded-xl flex items-center justify-center text-white">
                  {audience.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold ">
                  {audience.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TargetAudienceSection;