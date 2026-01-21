import React, { useState } from 'react';
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

const Steps = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: 'Langkah 1',
      description: 'Input data kunjungan (umur/BB/TB/gejala)'
    },
    {
      id: 2,
      title: 'Langkah 2',
      description: 'AI Triage risiko + red flags (low/medium/high)'
    },
    {
      id: 3,
      title: 'Langkah 3',
      description: 'Generate plan 7 hari + laporan siap kirim'
    }
  ];

  return (
    <div className=" flex items-center justify-center p-8 mt-15 sm:mt-20 md:mt-25 xl:mt-40">
      <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="max-w-3xl w-full">
        <div className='flex flex-col items-center mb-10'>
            <h1 className='text-4xl font-bold bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] bg-clip-text text-transparent'>Bagaimana Ini Bekerja</h1>
            <div className='bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] w-100 h-[4px] rounded-sm mt-2'></div>
        </div>
        
        <div className="space-y-4 pt-5">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative overflow-hidden rounded-xl  border-1 border-[#2ECCB7] cursor-pointer bg-white shadow-md hover:shadow-md transition-shadow duration-300"
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#0FA6A0] to-[#1F4E79] transition-transform duration-700 ease-in-out shadow-md ${
                  hoveredStep === step.id
                    ? 'translate-x-0'
                    : '-translate-x-full'
                }`}
              />
              
              <div className="relative z-10 flex items-center justify-between px-6 py-6">
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xl font-semibold transition-colors duration-300 ${
                      hoveredStep === step.id ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {step.title}
                  </span>
                  <svg
                    className={`w-7 h-7 transition-colors duration-300 ${
                      hoveredStep === step.id ? 'text-white' : 'text-gray-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                
                <span
                  className={`text-lg transition-colors duration-300 ${
                    hoveredStep === step.id ? 'text-white' : 'text-black'
                  }`}
                >
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;