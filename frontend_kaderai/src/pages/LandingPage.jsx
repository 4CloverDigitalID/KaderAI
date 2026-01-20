import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Kelebihan from '../components/Kelebihan'
import About from '../components/About'

const LandingPage = () => {
  return (
    <div className='h-[2000px]'>
      <Navbar />
      <Hero />
      <About />
      <Kelebihan />

    </div>
  )
}

export default LandingPage
