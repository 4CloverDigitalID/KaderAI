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
        <img src="img/Tujuan1.png" alt="" />
      )
    },
    {
      id: 2,
      title: 'Puskesmas',
      icon: (
        <img src="img/Tujuan2.png" alt="" />
      )
    },
    {
      id: 3,
      title: 'Orang Tua',
      icon: (
        <img src="img/Tujuan3.png" alt="" />
      )
    }
  ];

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="pt-25 sm:pt-25 md:pt-35 flex items-center justify-center p-8">
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
                <div className="flex items-center justify-center text-white">
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