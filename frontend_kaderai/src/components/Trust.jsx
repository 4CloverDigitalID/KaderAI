import React from 'react';
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

const Trust = () => {
  const features = [
    'Bukan alat diagnosis',
    'Mendorong rujukan ketika red flags',
    'Berbasis pedoman (WHO/Kemenkes)',
    'Data privacy: minim data personal, bisa anonymize'
  ];

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="w-full px-4 py-12 md:py-16 mt-15 md:mt-30">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-r from-[#2bc1ad] to-[#1F4E79] rounded-4xl overflow-hidden shadow-2xl">
          <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12 lg:py-14">
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
              <img src="img/Frame 9.png" alt="" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                Trust and Safety
              </h2>
            </div>

            {/* Features List */}
            <div className="space-y-4 md:space-y-5 max-w-2xl pr-4 md:pr-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-9 h-9 mt-1">
                    <img src="img/ceklis.png" alt="" />
                  </div>
                  
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-65 xl:h-65 opacity-30 sm:opacity-100 md:opacity-100 pointer-events-none">
            <img 
              src="img/TrustRight.png" 
              alt="" 
              className="w-full h-full object-contain"
            />
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;