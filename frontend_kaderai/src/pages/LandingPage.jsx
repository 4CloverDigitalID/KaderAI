import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Kelebihan from '../components/Kelebihan'
import About from '../components/About'
import Steps from '../components/Steps'
import Tujuan from '../components/Tujuan'

const LandingPage = () => {
  return (
    <div className='h-[2000px]'>
      <Navbar />
      <Hero />
      <About />
      <Kelebihan />
      <Steps />
      <Tujuan />
    </div>
  )
}

export default LandingPage
