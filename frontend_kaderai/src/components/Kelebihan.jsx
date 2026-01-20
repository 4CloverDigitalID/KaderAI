import React from 'react'
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

const Kelebihan = () => {
  return (
    <div className='flex flex-col justify-center items-center p-30'>
        <div>
            <h1 className='text-4xl font-bold bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] bg-clip-text text-transparent'>Kenapa KaderAI Dibutuhkan?</h1>
            <div className='bg-linear-to-r from-[#0FA6A0] justify-start flex to-[#1F4E79] w-full h-[3px] rounded-sm mt-2'></div>
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className='flex flex-row gap-8 items-center mt-5'>
            <div className='flex flex-col gap-4 text-[#1F4E79] justify-center items-center mt-10 border-3 border-[#0FA6A0] px-6 py-9 rounded-xl shadow-xl'>
                <img className='w-45 h-45' src="img/Kebutuhan1.png" alt="" />
                <h3 className='text-xl font-semibold text-center'>Edukasi gizi sering <br /> tidak konsisten</h3>
            </div>
            <div className='flex flex-col gap-4 text-[#1F4E79] justify-center items-center mt-10 border-3 border-[#0FA6A0] px-6 py-9 rounded-xl shadow-xl'>
                <img src="img/Kebutuhan2.png" alt="" />
                <h3 className='text-xl font-semibold text-center'>Edukasi gizi sering <br /> tidak konsisten</h3>
            </div>
            <div className='flex flex-col gap-4 text-[#1F4E79] justify-center items-center mt-10 border-3 border-[#0FA6A0] px-6 py-9 rounded-xl shadow-xl'>
                <img src="img/Kebutuhan3.png" alt="" />
                <h3 className='text-xl font-semibold text-center'>Edukasi gizi sering <br /> tidak konsisten</h3>
            </div>
        </div>
    </div>
  )
}

export default Kelebihan
