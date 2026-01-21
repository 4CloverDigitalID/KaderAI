import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Kelebihan from '../components/Kelebihan'
import About from '../components/About'
import Steps from '../components/Steps'
import Tujuan from '../components/Tujuan'
import Trust from '../components/Trust'
import Impact from '../components/Impact'

const LandingPage = () => {
  return (
    <div className='h-[5000px]'>
      <Navbar />
      <Hero />
      <About />
      <Kelebihan />
      <Steps />
      <Tujuan />
      <Trust />
      <Impact />
    </div>
  )
}

export default LandingPage
