import React from 'react';
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

const Impact = () => {
  const metrics = [
    {
      id: 1,
      title: 'EFISIENSI LAPORAN',
      mainText: '15 menit',
      arrow: true,
      highlightText: '< 1 menit',
      description: 'Dengan input terstruktur dan rekap otomatis, laporan kunjungan dapat dibuat lebih cepat tanpa proses manual berulang.'
    },
    {
      id: 2,
      title: 'DETEKSI DINI RISIKO',
      mainText: 'Sering terlewat',
      arrow: true,
      highlightText: 'Red flags',
      description: 'Sistem menandai indikasi risiko untuk membantu kader mengenali kondisi yang perlu diperhatikan dan mendorong rujukan lebih cepat.'
    },
    {
      id: 3,
      title: 'KONSISTENSI EDUKASI',
      mainText: 'Tidak terjadwal',
      arrow: true,
      highlightText: 'Plan 7 hari',
      description: 'Materi edukasi disusun dalam rencana 7 hari agar pesan gizi lebih konsisten, mudah dipahami, dan bisa diterapkan di rumah.'
    }
  ];

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="w-full px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
            <div className='flex flex-col justify-center items-center'>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className='text-4xl font-bold bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] bg-clip-text text-transparent'>Impact Metrics</h1>
                <div className='bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] w-75 h-[4px] rounded-sm mt-2'></div>
            </div>
          <p className="text-gray-600 text-base md:text-lg mt-6 max-w-3xl mx-auto">
            Target implementasi sistem. Bukan klaim medis atau alat diagnosis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="shadow-xl rounded-2xl border-2 border-[#0FA6A0]/30 p-6 md:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(15,166,160,0.25)]"
            >
              {/* Card Header */}
              <h3 className="text-sm md:text-base font-bold text-gray-700 mb-6 tracking-wide">
                {metric.title}
              </h3>

              {/* Main Content - Before/After */}
              <div className="flex items-center gap-3 md:gap-4 mb-6">
                <span className="text-xl md:text-2xl font-semibold text-gray-800 whitespace-nowrap">
                  {metric.mainText}
                </span>
                
                {/* Arrow */}
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-gray-400 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                
                <span className="text-xl md:text-2xl font-bold text-[#0FA6A0] whitespace-nowrap">
                  {metric.highlightText}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impact;