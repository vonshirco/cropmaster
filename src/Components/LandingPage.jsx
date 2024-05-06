import React from 'react'
import Navbar from './Landing-components/Navbar/Navbar'
import Hero from './Landing-components/Hero/Hero'
import About from './Landing-components/About/About'
import Features from './Landing-components/Features/Features'
import Benefits from './Landing-components/Benefits/Benetifs'
import Title from './Landing-components/Title/Title'
import Testimonials from './Landing-components/Testimonials/Testimonials'
import Contact from './Landing-components/Contact/Contact'
import Footer from './Landing-components/Footer/Footer'

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <About />
        {/* <Title subTitle='Our Services' title='What We Offer'/> */}
        <Features />
        <Title subTitle='' title='Why Should You Choose Us'/>
        <Benefits />
        <Title subTitle='' title='Testimonials'/>
        <Testimonials />
        <Title subTitle='' title='Get in Touch'/>
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage